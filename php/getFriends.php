<?php 

$uid = $_POST['uid'];
$type = $_POST['type'];

include 'conn.php';

if ($type == 1) {

	$sql = "SELECT * FROM profiles WHERE uid = '".$uid."' ";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();

	$obj = json_decode($row['friends']);
	foreach ($obj as &$valor) {
		$sql = "SELECT * FROM profiles WHERE uid = '".$valor."' ";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();

		echo "

		<li class='collection-item avatar'>
			<a href='profile.html?u={$row['uid']}'>
				<div>
        		<div style='background:url({$row['photoURL']}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$row['displayName']}<br>
	        		<b>{$row['country']}</b>
        		</div>	
					
				</div>
	    	</a>
		</li>
	    ";
	}
} elseif ($type == 2) {

	$sql = "SELECT * FROM profiles WHERE uid = '".$uid."' ";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();

	$obj = json_decode($row['bf']);
	foreach ($obj as &$valor) {
		$sql = "SELECT * FROM profiles WHERE uid = '".$valor."' ";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();

		echo "

		<li class='collection-item avatar'>
			<a href='profile.html?u={$row['uid']}'>
				<div>
        		<div style='background:url({$row['photoURL']}); no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$row['displayName']}<br>
	        		<b>{$row['country']}</b>
        		</div>	
					
				</div>
	    	</a>
		</li>
	    ";
	}
}


 ?>