<?php 

$id = $_POST['id'];

include 'conn.php';


	$consLike = 'SELECT * FROM likes WHERE idPost = "'.$id.'" ';
	$resultLike = $conn->query($consLike);
	while ($row = $resultLike->fetch_assoc()) {
		$consUser = 'SELECT * FROM profiles WHERE uid = "'.$row['uid'].'" ';
		$resultUser = $conn->query($consUser);
		$rowUser = $resultUser->fetch_assoc();
		$photoURL = $rowUser['photoURL'];
		$displayName = $rowUser['displayName'];
		$uid = $rowUser['uid'];

		echo "
	<a href='profile.html?u={$uid}'>	
		<div class='valign-wrapper'>
       		 <div style='display:inline-block'><div style='background:url({$photoURL}); background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px; margin 0 20;'></div> {$displayName} 
       	</div>
    </a>
       	<br>";
	}
	
 ?>