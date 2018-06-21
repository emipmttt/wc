<?php 
	$id = $_POST["id"];
	$uid = $_POST["uid"];

	include 'conn.php';

	$cons = "SELECT * FROM likes WHERE uid = '".$uid."' AND idPost = '".$id."' ";

	$result = $conn->query($cons);


	if ($result->num_rows > 0) {
		$sql = "DELETE FROM likes WHERE idPost='".$id."' AND uid = '".$uid."'";
		if ($conn->query($sql) === TRUE) {
			echo 2;
		} else {
		    echo "Error deleting record: " . $conn->error;
		}
	} else {
		$sql = "INSERT INTO likes (idPost,uid) VALUES ('".$id."','".$uid."')";
		if ($conn->query($sql) === TRUE) {


			$cons = "SELECT * FROM post WHERE id = '".$id."' ";
			$result = $conn->query($cons);
			$row = $result->fetch_assoc();

			$uidRes = $row['uid'];

			$sql = "INSERT INTO notifications (uidSen,uidRes,type,viewed,url) 
			VALUES ('".$uid."','".$uidRes."','like','0','post.html?p=".$id."')";
			if ($conn->query($sql) === TRUE) {
				echo 1;
			} else {
				echo "Error: " . $sql . " " . $conn->error;
			}	
			
		} else {
			echo "Error: " . $sql . " " . $conn->error;
		}	
	}
 ?>