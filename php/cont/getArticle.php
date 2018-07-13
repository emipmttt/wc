<?php 

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

	include '../conn.php';

	$category = $_POST["category"];

	//Número de usuarios

	$cons = "SELECT * FROM post WHERE titleArticle='".$category."' AND visible=1 ";
	$result = $conn->query($cons);

	while ($row = $result->fetch_assoc()) {
		$uid = $row['uid'];

		$consP = "SELECT * FROM profiles WHERE uid='".$uid."' ";
		$resultP = $conn->query($consP);
		$rowP = $resultP->fetch_assoc();

	$idPost = $row['id'];
	$typePost = $row['type'];
	$titlePost = $row['titleArticle'];
	$destPost = $row['visible'];
	$text = nl2br($row['text']);
	$downURLPost = $row['downURL'];
	$categoryPost = $row['category'];
	$displayName = $rowP['displayName'];

	echo "{\"downURL\":\"{$downURL}\",\"titleArticle\":\"{$category}\",\"displayName\":\"{$displayName}\",\"text\":\"{$text}\"}";	
	
	}


 ?>