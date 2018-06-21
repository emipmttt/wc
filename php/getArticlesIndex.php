<?php 

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

	include 'conn.php';

  echo '
    <div class="col s12 m4 l3 mobileViewCardArticle center-align hide-on-med-and-up">
      <img src="img/LOGO-WINE-HORZ.png" width="220px" />
    </div>
    ';

$cons = "SELECT * FROM ads ORDER BY RAND() LIMIT 0, 1";
$result = $conn->query($cons);
$row = $result->fetch_assoc();

$img = $row['img'];
$url = $row['url'];
$title = $row['title'];

	echo "

    <div class='col s12 m4 l3 mobileViewCardArticle'>
      <div class='card'>
        <div class='card-image' style='overflow:hidden;max-height:200px !important'>
          <img src='{$img}'>
          <span class='card-title'>{$title}</span>
        </div>
        <div class='card-action'>
          <a href='{$url}' class='purple-text'>Ir al Sitio</a>
        </div>
      </div>
    </div>
           
	";


	$cons = "SELECT * FROM post WHERE visible='1' ORDER BY id DESC LIMIT 5";
	$result = $conn->query($cons);
	while ($row = $result->fetch_assoc()) {

	$idPost = $row['id'];
	$typePost = $row['type'];
	$titlePost = $row['titleArticle'];
	$destPost = $row['visible'];
	$downURLPost = $row['downURL'];
	$categoryPost = $row['category'];
	echo "

    <div class='col s12 m4 l3 mobileViewCardArticle '>
      <div class='card' style='max-height:100px !important'>
        <div class='card-image' style='overflow:hidden;max-height:200px !important'>
          <img src='{$downURLPost}'>
          <span class='card-title'>{$titlePost}</span>
        </div>
        <div class='card-action'>
          <a href='{$categoryPost}/{$titlePost}' class='purple-text'>leer artículo</a>
        </div>
      </div>
    </div>
           
	";
	}

 ?>