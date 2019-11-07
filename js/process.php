<?php
header("Content-type: application/json; charset=utf-8");
require_once '../master/dbconnect.php'; // CONNECT TO THE DATABASE

/* ------------------------ */
/* FUNCTION */
/* ------------------------ */

// Load all the data from a single row
function LoadAll($conn, $FILEMAKER_IMAGE_URL){
        
	$select = "SELECT * FROM main WHERE maker like '%almar%'";
	$result = mysqli_query($conn, $select);

	$rows = array();
    
	if(mysqli_num_rows($result) > 0) {
		// output now
		while($row = mysqli_fetch_assoc($result)){
            // Set up the images
			if($row["thumb"] == ""){
				$thumb = "";
			} else {
				$thumb = "background-image: url(".$FILEMAKER_IMAGE_URL.$row["thumb"].")";
			}
            
            // ------------------------------------------------------------------------------
            // get the bairitsu data
            $currentPrice = 0; // the current price list price
			$currentPricelistName = "NO PRICE";
			$currentColor = "#000000";
            $productId = $row["productId"];
            
            $sth = mysqli_query($conn, "SELECT 
                sp_plcurrent.plCurrent,
                sp_plcurrent.sp_disc_rate_id,
                sp_disc_rate.rate,
                sp_disc_rate.percent,
                sp_disc_rate.discount,
                sp_disc_rate.currency,
                sp_disc_rate.colorId,
                sp_disc_rate.year,
                sp_disc_rate.memo AS sp_disc_rate_memo
             FROM sp_plcurrent
             INNER JOIN sp_disc_rate ON sp_plcurrent.sp_disc_rate_id = sp_disc_rate.id
             WHERE 
                sp_plcurrent.productId = '$productId'
             ");
             
            
            if(mysqli_num_rows($sth) > 0) {
                // output now
                while($rowSth = mysqli_fetch_assoc($sth)){
                    
                    $currentPrice = $rowSth['plCurrent'];
					$currentPricelistName = $rowSth['sp_disc_rate_memo'];
					$currentColor = $rowSth['colorId'];
                    
                }
            }
            
            // ------------------------------------------------------------------------------
			// get the history information if there is any.
			$historyPrice = 0;
			$historyPriceListName = "NO HISTORY";
			$historyColor = "#000000";
           
			$historyQuery = mysqli_query($conn, "
				SELECT 
					sp_history.plCurrent,
					sp_history.sp_disc_rate_id,
					sp_disc_rate.rate,
					sp_disc_rate.colorId,
					sp_disc_rate.year,
					sp_disc_rate.memo AS sp_disc_rate_memo
				FROM 
					sp_history
				INNER JOIN
					sp_disc_rate ON sp_history.sp_disc_rate_id = sp_disc_rate.id
				WHERE
					sp_history.productId = '$productId'
			");
            
			if(mysqli_num_rows($historyQuery) > 1){
				// grab the output if ther eis any
				$x = 0;
				while($rowHistory = mysqli_fetch_assoc($historyQuery)){
					$x += 1;
					if($x == (mysqli_num_rows($historyQuery) - 1)){
						$historyPrice = $rowHistory['plCurrent'];
						$historyPriceListName = $rowHistory['sp_disc_rate_memo'];
						$historyColor = $rowHistory['colorId'];
					}
				}
				
			}
            
			// ------------------------------------------------------------------------------
			// get the temp_table price that match the productId
			$tempPrice = 0;
			$tempPrice_priceListTitle = "NO TEMP PRICE";
            
			$tempQuery = mysqli_query($conn, "
				SELECT * FROM
					temp_pricelist
				WHERE
					productId = '$productId'
			");
			
			if(mysqli_num_rows($tempQuery) > 0){
				while($rowTemp = mysqli_fetch_assoc($tempQuery)){
					$tempPrice = $rowTemp['newPrice'];
					if($rowTemp['sp_disc_rate_id'] == 0){
						$tempPrice_priceListTitle = "割引所件設定必要";
					} else {
						$tempPrice_priceListTitle = $rowTemp['sp_disc_rate_id'];
					}
				}
			}
			
            // ------------------------------------------------------------------------------
			
			$rows[] = array(
				"id" => $row["id"],
				"productId" => $row["productId"],
				"tformNo" => $row["tformNo"],
				"type" => $row["type"],
				"maker" => $row["maker"],
				"series" => $row["series"],
				"makerNo" => $row["makerNo"],
				"orderNo" => $row["orderNo"],
				"productSize" => $row["productSize"],
				"tformPriceNoTax" => $row["tformPriceNoTax"],
				"setMatchedProductId" => $row["setMatchedProductId"],
				"setProductId" => $row["setProductId"],
				"set" => $row["set"],
				"img" => $row["img"],
				"thumb" => $thumb,
				"memo" => $row["memo"],
				"web" => $row["web"],
				"webVariation" => $row["webVariation"],
				"cancelMaker" => $row["cancelMaker"],
				"cancelTform" => $row["cancelTform"],
				"cancelSelling" => $row["cancelSelling"],
				"productColor" => $row["productColor"],
				"actualQuantity" => $row["actualQuantity"],
				"possibleQuantity" => $row["possibleQuantity"],
				"orderNoId" => $row["orderNoId"],
				"expectedImportDate" => $row["expectedImportDate"],
				"orderAmount" => $row["orderAmount"],
				"created" => $row["created"],
				"modified" => $row["modified"],
                "sp_plCurrent" => $currentPrice,
				"sp_disc_rate_memo" => $currentPricelistName,
				"sp_plCurrent_color" => $currentColor,
				"sp_history_price" => $historyPrice,
				"sp_history_memo" => $historyPriceListName,
				"sp_history_color" => $historyColor,
				"temp_price" => $tempPrice,
				"temp_priceListTitle" => $tempPrice_priceListTitle
			);
		}
		echo json_encode($rows);
        
	} else {
        
		echo json_encode("hmm");
        
    }
}

// Load the current price and discount rates from SP_PLCURRENT
function GetCurrentPrice($conn, $productId){
	
	$query = "SELECT * FROM sp_plcurrent WHERE productId = '$productId'";
	$result = mysqli_query($conn, $query);
	
	//$rows = array();
	
	if(mysqli_num_rows($result) > 0) {
	
		// output now
		while($row = mysqli_fetch_assoc($result)){
			$rows[] = array(
				"id" => $row['id'],
				"id" => $row['productId'],
				"id" => $row['tformNo'],
				"id" => $row['sp_disc_rate_id'],
				"id" => $row['plCurrent'],
				"id" => $row['tformPriceNoTax'],
				"id" => $row['created'],
				"id" => $row['modified']
			);
		}
		
	}
	
	return $rows;
	
}

// Save the price to the temp pricelist table
function SaveToTemp($conn, $productId, $price){
	
	$isSuccess = false; // check for if the insert or update had an error
	
	$query = "SELECT 
				productId 
			FROM
				temp_pricelist
			WHERE
				productId = '$productId'
			";
	$result = mysqli_query($conn, $query);
	
	if(mysqli_num_rows($result) > 0){
		
		// update the row with the matching productId
		$updateQuery = "UPDATE
							temp_pricelist
						SET 
							newPrice = '$price'
						WHERE
							productId = '$productId'
						";
		if(!mysqli_query($conn, $updateQuery)) {
			$isSuccess = false;
		}
	} else {
		
		//insert into the table
		$insertQuery = "INSERT INTO
							temp_pricelist
							(productId, newPrice)
						VALUES
							('$productId','$price')
						";
		if(!mysqli_query($conn, $insertQuery)){
			$isSuccess = true;
		}
	}
	
	// check if the insert or update was as success or failure and
	// send the appropriate response to the front end
	if($isSuccess){
		echo json_encode("SUCCESS");
	} else {
		echo json_encode("FAILURE");
	}
}

// get the action
if(isset($_POST["action"])){
	$action = mysqli_real_escape_string($conn, $_POST["action"]);
} else {
	$action = "ERROR";
}

// grab the product id
if(isset($_POST["productId"])){
	$productId = mysqli_real_escape_string($conn, $_POST["productId"]);
} else {
	$productId = "";
}

// check if a new price has been set
if(isset($_POST["price"])){
	$price = mysqli_real_escape_string($conn, $_POST["price"]);
} else {
	$price = "";
}

// CHECK WHICH ACTION TO TAKE
switch($action){
	case "LoadAll":
		LoadAll($conn, $FILEMAKER_IMAGE_URL);
	break;
	case "SaveToTemp":
		SaveToTemp($conn, $productId, $price);
	break;
	default:
	break;
}

?>