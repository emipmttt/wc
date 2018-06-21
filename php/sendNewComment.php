<?php 
	$id = $_POST["id"];
	$uid = $_POST["uid"];
	$text = $_POST["text"];

	include 'conn.php';

		$sql = "INSERT INTO comments (idPost,uid,text) VALUES ('".$id."','".$uid."','".$text."')";
		if ($conn->query($sql) === TRUE) {


			$sqlPost = "SELECT * FROM post WHERE id = '" . $id . "' ";
			$resultPost = $conn->query($sqlPost);
			$rowPost = $resultPost->fetch_assoc();

			$uidPoste =  $rowPost['uid'];

			$sql = "INSERT INTO notifications (uidSen,uidRes,type,viewed,url) VALUES ('".$uid."','".$uidPoste."','comment','0','post.html?p=".$id."')";
			if ($conn->query($sql) === TRUE) {
				echo 1;
			} else {
				echo "Error: " . $sql . " " . $conn->error;
			}
		} else {
			echo "Error: " . $sql . " " . $conn->error;
		}	
 ?>