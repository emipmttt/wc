<?php 

include '../conn.php';

$uid = $_POST['uid'];
$myuid = $_POST['myUid'];

    	
	$sql = "SELECT * FROM profiles WHERE uid='".$uid."'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    $row = $result->fetch_assoc();
    	echo "{\"displayName\":\"".$row['displayName']."\",\"country\":\"".$row['country']."\",\"photoURL\":\"".$row['photoURL']."\",\"uid\":\"".$row['uid']."\"}";
	        
	}
    

 ?>