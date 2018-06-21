<?php 

include 'conn.php';

$idPost = $_POST['idPost'];

$titleArticle = $_POST['titleArticle'];
$textArticle = $_POST['textArticle'];

$sql = "UPDATE post SET titleArticle='".$titleArticle."',text='".$textArticle."' WHERE id='".$idPost."' ";
if ($conn->query($sql) === TRUE) {	
	echo 1;
} else {
    echo "Error updating record: " . $conn->error;
}			

 ?>