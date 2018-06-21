<?php 

$id = $_POST["id"];
$type = $_POST["type"];
include 'conn.php';


if ($type == "text") {
	$sql = "DELETE FROM post WHERE id='".$id."'";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
} elseif ($type == "photo") {
	$sql = "DELETE FROM post WHERE id='".$id."'";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
}
elseif ($type == "video") {
	$sql = "DELETE FROM post WHERE id='".$id."'";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
}elseif ($type == "article") {
	$sql = "DELETE FROM post WHERE id='".$id."'";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
} elseif ($type == "taste") {
	$sql = "DELETE FROM post WHERE id='".$id."'";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
} elseif ($type == "comment") {
	$sql = "DELETE FROM comments WHERE id='".$id."'";
	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}
}

	$sqlDelCom = "DELETE FROM comments WHERE idPost='".$id."'";
	if ($conn->query($sqlDelCom) === TRUE) {
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

	$sqlDelLike = "DELETE FROM likes WHERE idPost='".$id."'";
	if ($conn->query($sqlDelLike) === TRUE) {
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

 ?>