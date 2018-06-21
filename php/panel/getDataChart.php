<?php 

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

	include '../conn.php';

	$uid = $_POST["uid"];

	//Número de usuarios

	$consNumUsers = "SELECT * FROM profiles";
	$resultNumUsers = $conn->query($consNumUsers);
	$rowNumUsers = $resultNumUsers->fetch_assoc();

	$data->numUsers = $resultNumUsers->num_rows;

	//Usuarios Mujeres y Hombres

	$consnumUsersWoman = "SELECT * FROM profiles WHERE gender = 'Femenino'";
	$resultnumUsersWoman = $conn->query($consnumUsersWoman);
	$rownumUsersWoman = $resultnumUsersWoman->fetch_assoc();

	$data->numUsersWoman = $resultnumUsersWoman->num_rows;

	$consnumUsersMan = "SELECT * FROM profiles WHERE gender = 'Masculino'";
	$resultnumUsersMan = $conn->query($consnumUsersMan);
	$rownumUsersMan = $resultnumUsersMan->fetch_assoc();

	$data->numUsersMan = $resultnumUsersMan->num_rows;

	//publicaciones

	$consnumPost = "SELECT * FROM post ";
	$resultnumPost = $conn->query($consnumPost);
	$rownumPost = $resultnumPost->fetch_assoc();

	$data->numPost = $resultnumPost->num_rows;

	$consnumPostText = "SELECT * FROM post WHERE type = 'text' ";
	$resultnumPostText = $conn->query($consnumPostText);
	$rownumPostText = $resultnumPostText->fetch_assoc();

	$data->numPostText = $resultnumPostText->num_rows;

	$consnumPostPhoto = "SELECT * FROM post WHERE type = 'photo' ";
	$resultnumPostPhoto = $conn->query($consnumPostPhoto);
	$rownumPostPhoto = $resultnumPostPhoto->fetch_assoc();

	$data->numPostPhoto = $resultnumPostPhoto->num_rows;

	$consnumPostPhoto = "SELECT * FROM post WHERE type = 'video' ";
	$resultnumPostPhoto = $conn->query($consnumPostPhoto);
	$rownumPostPhoto = $resultnumPostPhoto->fetch_assoc();

	$data->numPostVideo = $resultnumPostPhoto->num_rows;

	$consnumPostPhoto = "SELECT * FROM post WHERE type = 'article' ";
	$resultnumPostPhoto = $conn->query($consnumPostPhoto);
	$rownumPostPhoto = $resultnumPostPhoto->fetch_assoc();

	$data->numPostArticle = $resultnumPostPhoto->num_rows;

	$consnumPostPhoto = "SELECT * FROM post WHERE type = 'taste' ";
	$resultnumPostPhoto = $conn->query($consnumPostPhoto);
	$rownumPostPhoto = $resultnumPostPhoto->fetch_assoc();

	$data->numPostTaste = $resultnumPostPhoto->num_rows;

	$consnumPostPhoto = "SELECT * FROM post WHERE type = 'place' ";
	$resultnumPostPhoto = $conn->query($consnumPostPhoto);
	$rownumPostPhoto = $resultnumPostPhoto->fetch_assoc();

	$data->numPostPlace = $resultnumPostPhoto->num_rows;

	echo json_encode($data);



 ?>