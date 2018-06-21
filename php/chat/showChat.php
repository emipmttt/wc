<?php 
header("Content-Type: text/html;charset=utf-8");
$uid = $_POST['uid'];


include '../conn.php';


	$consLike = 'SELECT DISTINCT uid1, uid2 FROM messages WHERE (uid2 = "'.$uid.'") ORDER BY id desc ';
	$resultLike = $conn->query($consLike);
	while ($row = $resultLike->fetch_assoc()) {

		$uid1 = $row['uid1'];
		$uid2 = $row['uid2'];

		if ($uid1 == $uid) {
			$loc = $uid2;
		} elseif ($uid2 == $uid) {
			$loc = $uid1;
		}

		$consUser = 'SELECT * FROM profiles WHERE uid = "'.$loc.'" ';
		$resultUser = $conn->query($consUser);
		$rowUser = $resultUser->fetch_assoc();
		$photoURL = $rowUser['photoURL'];
		$displayName = $rowUser['displayName'];
		$uidProfile = $rowUser['uid'];

		echo "
	
			<div class='valign-wrapper hoverChat modal-close' id='{$uid}' onclick='setChat(\"{$uidProfile}\");showMobileChat()'>
				<div style='display:inline-block'><img src='{$photoURL}' style='width:50px;height:50px;' class='circle'></div>
				<div style='display:inline-block; font-size:20px;margin-left:20px'><b>{$displayName}</b></div>
			</div>

		";

	}
	
 ?>	