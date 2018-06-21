<?php 

	include '../conn.php';

	$id = $_POST['id'];
	$category = $_POST['category'];


	$cons = "SELECT * FROM post WHERE id = '".$id."' AND dest ='1' ";
	$result = $conn->query($cons);
	if ($result->num_rows > 0) {	
	$row = $result->fetch_assoc();

	$dest = $row['visible'];

	if ($dest == 0) {
		$sql = "UPDATE post SET visible='1',category='".$category."' WHERE id='".$id."' ";
		if ($conn->query($sql) === TRUE) {
			echo 1;
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	} else {
		$sql = "UPDATE post SET visible='0',category='".$category."' WHERE id='".$id."' ";
		if ($conn->query($sql) === TRUE) {
			echo 1;
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	}



}

 ?>