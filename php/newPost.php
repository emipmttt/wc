<?php

	error_reporting(E_ALL ^ E_NOTICE);	

	include 'conn.php';
	$type = $_POST["type"];
	$uid = $_POST["uid"];
	$text = $_POST["text"];
	$datePost = $_POST["datePost"];
	$fileName = $_POST["fileName"];
	$downURL = $_POST["downURL"];
	$titleArticle = $_POST["titleArticle"];
	$place = $_POST["place"];
	$grade = $_POST["grade"];

	if ($text != "") {
			if ($type == "text") {
	
		$cons = "SELECT * FROM profiles WHERE uid = '".$uid."'";

		$result = $conn->query($cons);

		while ($row = $result->fetch_assoc()) {
			$sql = "INSERT INTO post (datePost,text,type,uid,viewers) 
			VALUES ('".$datePost."','".$text."','".$type."','".$uid."','".$row['friends']."')";

			if ($conn->query($sql) === TRUE) {
			  echo 1;
			} else {
				echo "Error: " . $sql . " " . $conn->error;
			}	
		}
		
	} elseif ($type == "photo") {

		$cons = "SELECT * FROM profiles WHERE uid = '".$uid."'";

		$result = $conn->query($cons);

		while ($row = $result->fetch_assoc()) {
			$sql = "INSERT INTO post (datePost,text,type,uid,viewers,downURL,fileName) 
			VALUES ('".$datePost."','".$text."','".$type."','".$uid."','".$row['friends']."','".$downURL."','".$fileName."')";
			if ($fileName == "") {
				echo 2;
			} else {
				if ($conn->query($sql) === TRUE) {
				  echo 1;
				} else {
					echo "Error: " . $sql . " " . $conn->error;
				}	
			}
		}
				
	} elseif ($type == "video") {

		$cons = "SELECT * FROM profiles WHERE uid = '".$uid."'";

		$result = $conn->query($cons);

		while ($row = $result->fetch_assoc()) {
			$sql = "INSERT INTO post (datePost,text,type,uid,viewers,downURL,fileName) 
			VALUES ('".$datePost."','".$text."','".$type."','".$uid."','".$row['friends']."','".$downURL."','".$fileName."')";
			if ($fileName == "") {
				echo 2;
			} else {
				if ($conn->query($sql) === TRUE) {
				  echo 1;
				} else {
					echo "Error: " . $sql . " " . $conn->error;
				}	
			}
		}
				
	} elseif ($type == "article") {

		$cons = "SELECT * FROM profiles WHERE uid = '".$uid."'";

		$result = $conn->query($cons);

		while ($row = $result->fetch_assoc()) {

			if ($row['type'] == 1) {
				$dest = 1;
			} else {
				$dest = 0;
			}

			$sql = "INSERT INTO post (dest,datePost,text,type,uid,viewers,downURL,fileName,titleArticle) 
			VALUES ('".$dest."','".$datePost."','".$text."','".$type."','".$uid."','".$row['friends']."','".$downURL."','".$fileName."','".$titleArticle."')";
			if ($fileName == "") {
				echo 2;
			} else {
				if ($conn->query($sql) === TRUE) {
				  echo 1;
				} else {
					echo "Error: " . $sql . " " . $conn->error;
				}	
			}	
		}
				
	} elseif ($type == "place") {

		$cons = "SELECT * FROM profiles WHERE uid = '".$uid."'";

		$result = $conn->query($cons);

		while ($row = $result->fetch_assoc()) {
			$sql = "INSERT INTO post (datePost,text,type,uid,viewers,place,grade,downURL,fileName) 
			VALUES ('".$datePost."','".$text."','".$type."','".$uid."','".$row['friends']."','".$place."','".$grade."','".$downURL."','".$fileName."')";
			if ($place == "") {
				echo 2;
			} else {
				if ($conn->query($sql) === TRUE) {
				  echo 1;
				} else {
					echo "Error: " . $sql . " " . $conn->error;
				}	
			}
		}
				
	} elseif ($type == "taste") {

		$cons = "SELECT * FROM profiles WHERE uid = '".$uid."'";

		$result = $conn->query($cons);

		while ($row = $result->fetch_assoc()) {
			$sql = "INSERT INTO post (datePost,text,type,uid,viewers,downURL,fileName,grade) 
			VALUES ('".$datePost."','".$text."','".$type."','".$uid."','".$row['friends']."','".$downURL."','".$fileName."','".$grade."')";
			if ($fileName == "") {
				echo 2;
			} else {
				if ($conn->query($sql) === TRUE) {
				  echo 1;
				} else {
					echo "Error: " . $sql . " " . $conn->error;
				}	
			}
		}
				
	}

	} else {
		echo 2;
	}

?>