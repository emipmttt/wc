<?php 

	include 'conn.php';

	$uidProfile = $_POST['uidProfile'];
	$uid = $_POST['uid'];

	$consProfile = 'SELECT * FROM profiles WHERE uid = "'. $uidProfile .'" ';

	$resultProfile = $conn->query($consProfile);
	$rowProfile = $resultProfile->fetch_assoc();

	$photoURLProfile = $rowProfile['photoURL'];
	$displayNameProfile = htmlentities($rowProfile['displayName']);
	$descriptionProfile = htmlentities($rowProfile['description']);
	$countryProfile = htmlentities($rowProfile['country']);

// edad

$dia=date("j");
$mes=date("n");
$ano=date("Y");
$dianaz= $rowProfile['bDay'];
$mesnaz= $rowProfile['bMonth'];
$anonaz= $rowProfile['bYear'];
if (($mesnaz == $mes) && ($dianaz > $dia)) {
$ano=($ano-1); }
if ($mesnaz > $mes) {
$ano=($ano-1);}
$edad=($ano-$anonaz);

if ( $uid == $uidProfile ) {
	$friends = "<a href='editmyprofile.html' class='btn purple waves-effect waves-light'><i class='material-icons' style='font-size:14px' >mode_edit</i> Editar mi perfil</a>";
	$bf ="";

} else {

	$sqlP = "SELECT * FROM profiles WHERE uid = '".$uidProfile."' AND friends LIKE '%".$uid."%'";
	$resultP = $conn->query($sqlP);

	if ($resultP->num_rows > 0) {


		$friends = "<div id='friendsButton' onclick='deleteFriend(\"{$uid}\",\"{$uidProfile}\")' class='btn-flat waves-effect waves-red red-text'>eliminar de mis amigos</div>";

		$sql = "SELECT * FROM profiles WHERE bf LIKE '%".$uidProfile."%' AND uid = '".$uid."' ";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		$bf = " 
	      	      <a href='#!' onclick='toggleBF(\"$uidProfile\",\"2\")' data-position='left' data-tooltip='Eliminar de mis mejores amigos' class='tooltipped'><i class='material-icons blue-text'>grade</i></a>
	      ";
		}else{
			$bf = " 
			<a href='#'  data-position='left' data-tooltip='Agregar a mis mejores amigos' class='tooltipped'><i class='material-icons grey-text text-darken-2' onclick=toggleBF(\"$uidProfile\",\"1\")>grade</i></a>

	      ";
		}




	} else {
		$bf ="";

		$friends = "<div id='friendsButton' onclick='sendReqFriend(\"{$uid}\",\"{$uidProfile}\")' class='btn waves-effect waves-light green'><i class='fa fa-user-plus'></i> Añadir a mis amigos</div>";	   
	} 


	$sqlStateFr = "SELECT * FROM notifications WHERE uidSen = '" . $uid . "' AND uidRes = '" . $uidProfile . "' AND type = 'friend' ";
	$resultStateFr = $conn->query($sqlStateFr);
	$rowStateFr = $resultStateFr->fetch_assoc();
	if ($resultStateFr ->num_rows > 0) {
		$friends = "<div id='friendsButton' class='btn blue'><i class='fa fa-user-plus'></i> Solicitud Enviada</div>";
	}


	$sqlStateFr = "SELECT * FROM notifications WHERE uidRes = '" . $uid . "' AND uidSen = '" . $uidProfile . "' AND type = 'friend' ";
	$resultStateFr = $conn->query($sqlStateFr);
	$rowStateFr = $resultStateFr->fetch_assoc();
	$idNotification = $rowStateFr['id'];
	$uidSen = $rowStateFr['uidSen'];
	$uidRes = $rowStateFr['uidRes'];
	if ($resultStateFr ->num_rows > 0) {
		$friends = "<div id='friendsButton' onclick='acceptFriend(\"{$idNotification}\",\"{$uidSen}\",\"{$uidRes}\")' class='btn blue'><i class='fa fa-user-plus'></i> Aceptar solicitud</div>";
	}



}


	echo "
		
	    <div class='row'>
		    <br>
		    
		    <div class='right'>
				{$bf}
		    </div>
			<div class='col s12 m6 l6 xl5 ' align='center'><div style='background:url({$photoURLProfile}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:200px; width:200px; height:200px;'></div></div>
			<div class='col s12 m6 l6 xl7'>
				<a href=''><h4>{$displayNameProfile}</h4></a>{$friends}
				<p>{$descriptionProfile}</p>
				<b><i class='fa fa-calendar'></i> {$edad} Años</b>
				<br>
				<b><i class='fa fa-flag'></i> {$countryProfile}</b>
				<br>
			</div>


        </div>
        ";
 ?>