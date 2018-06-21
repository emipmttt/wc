<?php 

include 'conn.php';

$displayName = $_POST['displayName'];
$myUserName = $_POST['myUserName'];
$uid = $_POST['uid'];

if ($displayName == $myUserName) {
	$sql = "DELETE FROM profiles WHERE uid='".$uid."'";
	if ($conn->query($sql) === TRUE) {
		$sql = "DELETE FROM post WHERE dest='0' AND uid='".$uid."'";
		if ($conn->query($sql) === TRUE) {
			$sql = "DELETE FROM comments WHERE uid='".$uid."'";
			if ($conn->query($sql) === TRUE) {
				echo 1;
			} else {
			    echo "Error deleting record: " . $conn->error;
			}
		} else {
		    echo "Error deleting record: " . $conn->error;
		}
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
}

 ?>