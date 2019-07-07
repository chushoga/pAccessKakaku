<?php
header("Content-type: application/json; charset=utf-8");
require_once '../master/dbconnect.php'; // CONNECT TO THE DATABASE

/* ------------------------ */
/* FUNCTION */
/* ------------------------ */

function LoadAll($conn, $FILEMAKER_IMAGE_URL){
        
	$select = "SELECT * FROM main WHERE maker LIKE '%almar%'";
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
            $currentPrice = 0;
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
                sp_disc_rate.memo
             FROM sp_plcurrent
             INNER JOIN sp_disc_rate ON sp_plcurrent.sp_disc_rate_id = sp_disc_rate.id
             WHERE 
                sp_plcurrent.productId = '$productId'
             ");
            
            if(mysqli_num_rows($sth) > 0) {
                // output now
                while($rowSth = mysqli_fetch_assoc($sth)){
                    $currentPrice = $rowSth['plCurrent'];
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
                "sp_plCurrent" => $currentPrice
			);
		}
		echo json_encode($rows);
        
	} else {
        
		echo json_encode("hmm");
        
    }
}


// action
if(isset($_POST["action"])){
	$action = $_POST["action"];
} else {
	$action = "ERROR";
}

switch($action){
	case "loadAll":
		LoadAll($conn, $FILEMAKER_IMAGE_URL);
	break;
}

?>