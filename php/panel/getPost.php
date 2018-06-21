<?php 

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

	include '../conn.php';

	$uid = $_POST["uid"];

	//Número de usuarios

	$cons = "SELECT * FROM post WHERE type='article' AND dest = '1' ";
	$result = $conn->query($cons);
	while ($row = $result->fetch_assoc()) {

	$idPost = $row['id'];
	$typePost = $row['type'];
	$titlePost = $row['titleArticle'];
	$destPost = $row['visible'];
	$categoryPost = $row['category'];

	if ($destPost == 0) {
		$togglePost = "
       		<i class='material-icons' onclick='togglePost(\"{$idPost}\")'>check</i>
		";
	}else {
		$togglePost = "
			<i class='material-icons' onclick='togglePost(\"{$idPost}\")'>clear</i>
		";
	}

	echo "

        <li class='collection-item'>
        	<div>
        		<a href='post.html?p={$idPost}'>{$titlePost}</a>

  <div class='row'>
    <div class='col s10'>
           <div class='row'>
        <div class='input-field col s12'>
          <i class='material-icons prefix'>textsms</i>
          <input type='text' id='autocomplete-input{$idPost}' class='autocomplete' value='{$categoryPost}'>
          <label for='autocomplete-input{$idPost}'>Autocomplete</label>
        </div>
      </div>
    </div>
    <div class='col s2'>
    	<a href='#!' class='secondary-content'>
        	{$togglePost}
        </a>
    </div>
  </div>

        	</div>
        </li>

	";
	}

 ?>