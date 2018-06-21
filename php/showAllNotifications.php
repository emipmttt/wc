<?php 

$uid = $_POST['uid'];

include 'conn.php';


	$consLike = 'SELECT * FROM notifications WHERE uidRes = "'.$uid.'" ORDER BY id desc ';
	$resultLike = $conn->query($consLike);
	while ($row = $resultLike->fetch_assoc()) {
		$consUser = 'SELECT * FROM profiles WHERE uid = "'.$row['uidSen'].'" ';
		$type = $row['type'];
		$url = $row['url'];
		$id = $row['id'];
		$resultUser = $conn->query($consUser);
		$rowUser = $resultUser->fetch_assoc();
		$photoURL = $rowUser['photoURL'];
		$displayName = $rowUser['displayName'];

		if ($type == "comment") {
		echo "
			<a onclick='viewed(\"{$id}\")' href='{$url}'>
			<br>
			<div class='valign-wrapper'>
	       		 <div style='display:inline-block'><div style='background:url({$photoURL}); background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px; margin 0 20;'></div> <i class='fa fa-comment-o' style='font-size:20px'></i>  {$displayName} ha comentado tu publicación.
	       	</div>
	       	<br>
	       	<div class='divider'></div>
	       	";
		} elseif ($type == "friend") {
		echo "
			<a onclick='viewed(\"{$id}\")' href='{$url}'>
			<br>
			<div class='valign-wrapper'>
	       		 <div style='display:inline-block'><div style='background:url({$photoURL}); background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px; margin 0 20;'></div><i class='fa fa-user-plus' style='font-size:20px'></i> {$displayName} quiere ser tu amigo.
	       		<br>
	       	</div>
	       	<br>
	       	<div class='divider'></div>
	       	";			
		} elseif ($type == "like") {
		echo "
			<a onclick='viewed(\"{$id}\")' href='{$url}'>
			<br>
			<div class='valign-wrapper'>
	       		 <div style='display:inline-block'><div style='background:url({$photoURL}); background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px; margin 0 20;'></div> <i class='fa fa-heart-o' style='font-size:20px'></i> A {$displayName} le ha gustado tu publicación.
	       		<br>
	       	</div>
	       	<br>
	       	<div class='divider'></div>
	       	";			
		}
	}
	
 ?>