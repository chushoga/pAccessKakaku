<?php
/*-------------------------------------------------------*/
/* CONNECT TO THE DATABASE */

$servername = "localhost";
$username = "admin";
$password = "pass";
$dbname = "tanka";

// create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// check connection
if(!$conn){
    die("Connection Failed: ".$conn->connect_error);
}

/* change character set to utf8 */
  if (!$conn->set_charset("utf8")) {
      printf("Error loading character set utf8: %s\n", $mysqli->error);
  }
/*-------------------------------------------------------*/

// filemaker image location
$FILEMAKER_IMAGE_URL = "https://www.aqualabo.com/db_img/";
	
?>