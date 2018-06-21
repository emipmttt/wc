<?php 

	include 'conn.php';

	$uid1 = $_POST['uid1'];
	$uid2 = $_POST['uid2'];

	$consFriend = 'SELECT * FROM profiles WHERE uid = "'.$uid1.'" ';
	$resultFriend = $conn->query($consFriend);
	$rowFriend = $resultFriend->fetch_assoc();

	$friend = json_decode($rowFriend['friends']);

	unset($friend->$uid2);

	$newfriends = json_encode($friend);

	$sql = "UPDATE profiles SET friends='".$newfriends."' WHERE uid='".$uid1."' ";
	if ($conn->query($sql) === TRUE) {	

		$consFriend = 'SELECT * FROM profiles WHERE uid = "'.$uid2.'" ';
		$resultFriend = $conn->query($consFriend);
		$rowFriend = $resultFriend->fetch_assoc();

		$friend = json_decode($rowFriend['friends']);

		unset($friend->$uid1);

		$newfriends2 = json_encode($friend);

		$sql = "UPDATE profiles SET friends='".$newfriends2."' WHERE uid='".$uid2."' ";
		if ($conn->query($sql) === TRUE) {	

			


		$sql = "UPDATE post SET viewers='".$newfriends2."' WHERE uid='".$uid2."' ";
		if ($conn->query($sql) === TRUE) {	
			$sql = "UPDATE post SET viewers='".$newfriends."' WHERE uid='".$uid1."' ";
			if ($conn->query($sql) === TRUE) {	
				echo 1;
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