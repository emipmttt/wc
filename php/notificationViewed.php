<?php 

	include 'conn.php';
	$ide = $_POST['ide'];

	$sql = "UPDATE notifications SET viewed = '1' WHERE id = '".$ide."' ";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error updating record: " . $conn->error;
	}

 ?>