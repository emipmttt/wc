<?php 

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

	include '../conn.php';

	$category = $_POST["category"];

	//Número de usuarios

	$cons = "SELECT * FROM post WHERE category='".$category."' AND visible=1 ";
	$result = $conn->query($cons);
	while ($row = $result->fetch_assoc()) {

	$idPost = $row['id'];
	$typePost = $row['type'];
	$titlePost = $row['titleArticle'];
	$destPost = $row['visible'];
	$downURLPost = $row['downURL'];
	$categoryPost = $row['category'];
	echo "

    <div class='col s12 m3'>
      <div class='card'>
        <div class='card-image'>
          <img src='{$downURLPost}'>
          <span class='card-title'>{$titlePost}</span>
        </div>
        <div class='card-content'>
        </div>
        <div class='card-action'>
          <a href='{$categoryPost}/{$titlePost}'>leer artículo</a>
        </div>
      </div>
    </div>
           
	";
	}

 ?>