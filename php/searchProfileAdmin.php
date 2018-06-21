<?php 

include 'conn.php';

$displayName = $_POST['search'];
$myUid = $_POST['myUid'];
$sql = "SELECT displayName, photoURL,country, uid FROM profiles WHERE displayName LIKE '%".$displayName."%' LIMIT 30";
$result = $conn->query($sql);

if ($result->num_rows > 0) {  
   
    while($row = $result->fetch_assoc()) {
    	$photoURL = $row['photoURL'];
      $displayName = $row['displayName'];
      $country = $row['country'];
    	$uid = $row['uid'];

      if ($uid == $myUid) {
      
      } else {
        echo "  <br>
        
          <div style='width:100%'>
          <a href='profile.html?u={$uid}'>
            <div style='display:inline-block'><div style='background:url({$photoURL}); background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px; margin 0 20;'></div>
            </div> 
            
            <div style='display:inline-block'>
              {$displayName}
              <br>
              <b>{$country}</b>
            </div>
          </a>
            <a onclick='setAdmin(\"{$uid}\")' class='modal-trigger' href='#modal1' style='display:inline-block; float:right;margin:15px;cursor:pointer'>
                <i class='material-icons right ' style='float:right'>add</i> 
            </a>
          </div>
        ";
    }
      }


} else {
	echo "<div align='center' style='width:100%'>Usuario no encontrado :/</div>";
}

 ?>