<?php 

include 'conn.php';

$type = $_POST['type'];
$txt = $_POST['txt'];
$uid = $_POST['uid'];

if ($type == "displayName") {
	
	$sql = "UPDATE profiles SET displayName='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

} elseif ($type == "description") {
	
	$sql = "UPDATE profiles SET description='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

} elseif ($type == "country") {
	
	$sql = "UPDATE profiles SET country='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

} elseif ($type == "day") {
	
	$sql = "UPDATE profiles SET bDay='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 2;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

} elseif ($type == "month") {
	
	$sql = "UPDATE profiles SET bMonth='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 2;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

} elseif ($type == "year") {
	
	$sql = "UPDATE profiles SET bYear='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 2;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

} elseif ($type == "photo") {
	
	$sql = "UPDATE profiles SET photoURL='".$txt."' WHERE uid='".$uid."'";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

}
 ?>