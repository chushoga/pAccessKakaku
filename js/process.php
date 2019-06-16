<?php
header("Content-type: application/json; charset=utf-8");
require_once '../master/dbconnect.php'; // CONNECT TO THE DATABASE

/* ------------------------ */
/* FUNCTION */
/* ------------------------ */

function LoadAll($conn, $FILEMAKER_IMAGE_URL){
	$select = "SELECT * FROM main WHERE maker LIKE '%KALDEWEI%'";
	$result = mysqli_query($conn, $select);

	$rows = array();
    
	if(mysqli_num_rows($result) > 0) {
		// output now
		while($row = mysqli_fetch_assoc($result)){
			
			if($row["thumb"] == ""){
				$thumb = "";
			} else {
				$thumb = "background-image: url(".$FILEMAKER_IMAGE_URL.$row["thumb"].")";
			}
			
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
				"modified" => $row["modified"]
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