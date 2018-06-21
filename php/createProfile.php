<?php 	

	include 'conn.php';

	$uid = $_POST['uid'];
	$photoURL = $_POST['photoURL'];
	$email = $_POST['email'];
	$displayName = $_POST['displayName'];
	$description = $_POST['description'];
	$country = $_POST['country'];
	$gender = $_POST['gender'];
	$day = $_POST['day'];
	$month = $_POST['month'];
	$year = $_POST['year'];
	$friends = '{"'.$uid.'":"'.$uid.'"}';
	$bf = '{"'.$uid.'":"'.$uid.'"}';
	$sql = "INSERT INTO profiles (uid,email,displayName,description,country,gender,bDay,bMonth,bYear,friends,bf,photoURL) 
	VALUES ('".$uid."','".$email."','".$displayName."','".$description."','".$country."','".$gender."','".$day."','".$month."','".$year."','".$friends."','".$bf."','".$photoURL."')";
	if ($conn->query($sql) === TRUE) {
	  echo 1;
	} else {
		echo "Error: " . $sql . " " . $conn->error;
	}
 ?>