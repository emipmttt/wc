<?php 

$type = $_POST['type'];
$uidProfile = $_POST['uidProfile'];
$uid = $_POST['uid'];

include 'conn.php';

if ($type == 1) {
	$consFriend = 'SELECT * FROM profiles WHERE uid = "'.$uid.'" ';
	$resultFriend = $conn->query($consFriend);
	$rowFriend = $resultFriend->fetch_assoc();

	$friend = json_decode($rowFriend['bf']);
	$friend->$uidProfile = $uidProfile;
	$friends = json_encode($friend);

	$sql = "UPDATE profiles SET bf='".$friends."' WHERE uid='".$uid."' ";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	}else{echo "Error updating record: " . $conn->error;}
} elseif ($type == 2) {
	$consFriend = 'SELECT * FROM profiles WHERE uid = "'.$uid.'" ';
	$resultFriend = $conn->query($consFriend);
	$rowFriend = $resultFriend->fetch_assoc();
	
	$friend = json_decode($rowFriend['bf']);
	unset($friend->$uidProfile);
	$newfriends = json_encode($friend);


	$sql = "UPDATE profiles SET bf='".$newfriends."' WHERE uid='".$uid."' ";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	}else{echo "Error updating record: " . $conn->error;}
}

 ?>