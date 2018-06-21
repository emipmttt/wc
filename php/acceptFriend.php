<?php 

	include 'conn.php';

	

	$idNotification = $_POST['idNotification'];
	$uidSen = $_POST['uidSen'];
	$uidRes = $_POST['uidRes'];

	$consFriend = 'SELECT * FROM profiles WHERE uid = "'.$uidSen.'" ';
	$resultFriend = $conn->query($consFriend);
	$rowFriend = $resultFriend->fetch_assoc();

	$friend = json_decode($rowFriend['friends']);
	$friend->$uidRes = $uidRes;
	$friends = json_encode($friend);

	$sql = "UPDATE profiles SET friends='".$friends."' WHERE uid='".$uidSen."' ";
	if ($conn->query($sql) === TRUE) {
		$sql = "UPDATE post SET viewers='".$friends."' WHERE uid='".$uidSen."'";
		if ($conn->query($sql) === TRUE) {
		    



	$consFriend = 'SELECT * FROM profiles WHERE uid = "'.$uidRes.'" ';
	$resultFriend = $conn->query($consFriend);
	$rowFriend = $resultFriend->fetch_assoc();

	$friend = json_decode($rowFriend['friends']);
	$friend->$uidSen = $uidSen;
	$friends = json_encode($friend);

	$sql = "UPDATE profiles SET friends='".$friends."' WHERE uid='".$uidRes."' ";
	if ($conn->query($sql) === TRUE) {
		$sql = "UPDATE post SET viewers='".$friends."' WHERE uid='".$uidRes."'";
		if ($conn->query($sql) === TRUE) {
		    	$sql = "DELETE FROM notifications WHERE id='".$idNotification."'";
				if ($conn->query($sql) === TRUE) {
					echo 1;
				} else {
				    echo "Error deleting record: " . $conn->error;
				}
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	} else {
	    echo "Error updating record: " . $conn->error;
	}

		} else {
		    echo "Error updating record: " . $conn->error;
		}
	} else {
	    echo "Error updating record: " . $conn->error;
	}






?>