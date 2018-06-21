<?php 

include 'conn.php';

$idPost = $_POST['idPost'];

$sql = "SELECT * FROM post WHERE id = '".$idPost."' ";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$titleArticle = $row['titleArticle'];
$text = $row['text'];

echo " 

<div class='row'>
	<div class='input-field col s12'>
		<input id='titleArticle' type='text' class='validate' value='{$titleArticle}'>
		<label for='titleArticle' class='active'>Título del artículo</label>
	</div>
</div>

<div class='row'>
	<div class='input-field col s12'>
		<textarea id='textArticle' class='materialize-textarea'>{$text}</textarea>
		<label for='textArticle' class='active'>Artículo</label>
	</div>
</div>


 ";

 ?>