<?php 

include 'conn.php';

$uid = $_POST['uid'];

	$cons = "SELECT * FROM profiles WHERE uid = '".$uid."' ";
	$result = $conn->query($cons);
	$row = $result->fetch_assoc();

	$displayName = $row['displayName'];
	echo "

		<input type='text' id='uidInput' value='{$uid}' style='display:none'>

		<h2>{$displayName}</h2>

		<br>
		<br>
		<br>
		<br>

	  <div class='input-field col s12'>
	    <select id='selectAdmin'>
	      <option value='0' selected>Usuario</option>
	      <option value='1'>Administrador</option>
	      <option value='2'>Creador de Contenidos</option>
	    </select>
	    <label>Permisos</label>
	  </div>

	";

?>