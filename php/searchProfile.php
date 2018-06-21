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
         <div style='background:url({$row['photoURL']}); no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:40px; width:40px; height:40px;'></div>
        <div style='display:inline-block'>
              {$row['displayName']}<br>
              <b>{$row['country']}</b>
            </div>  
          </a>
            <div onclick='setChat(\"{$uid}\")' style='display:inline-block; float:right;margin:15px;cursor:pointer'>
                <i class='material-icons right' style='float:right'>chat_bubble_outline</i>
            </div>
          </div>
        ";
    }
      }


} else {
	echo "<div align='center' style='width:100%'>Usuario no encontrado :/</div>";
}

 ?>