<?php 
	$conn = new mysqli("localhost", "root", "", "winecommunity");
	if ($conn->connect_errno) {
	    printf("Conexión fallida: %s\n", $conexion->connect_error);
	    exit();
	}
 ?>