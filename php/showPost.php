<?php 
	$uid = $_POST["uid"];

	$offset = $_POST["r"];
	$limit = 20;

	include 'conn.php';

	$cons = 'SELECT * FROM post WHERE viewers LIKE "%'.$uid.'%" ORDER BY id desc LIMIT '.$limit.' OFFSET '.$offset.' ';

	$result = $conn->query($cons);

	$r = $offset;

	function getComments($row,$id,$conn) {	
	
		if ($row > 0) {
			$consCommentsPre = 'SELECT * FROM comments WHERE idPost = "'.$id.'" LIMIT 4';
			$resultCommentsPre = $conn->query($consCommentsPre);
			while ($rowCommentsPre = $resultCommentsPre->fetch_assoc()) {

				$uidComment = $rowCommentsPre['uid'];
				$textComment = $rowCommentsPre['text'];

				$consProfilePre = 'SELECT * FROM profiles WHERE uid = "'.$uidComment.'" LIMIT 4';
				$resultProfilePre = $conn->query($consProfilePre);
				$rowProfilePre = $resultProfilePre->fetch_assoc();

				$photoURLComment = $rowProfilePre['photoURL'];
				$displayNameComment = $rowProfilePre['displayName'];

				echo  "
	<div style='padding:10px'>
       	<div class='valign-wrapper'>
       		<div style='background:url({$photoURLComment}); background-size:100%; background-position:center; display:inline-block; border-radius:40px; width:30px; height:30px; margin: 0px 20px;'></div> <b>{$displayNameComment}</b>: {$textComment}
       	</div>
    </div>
    <div class='divider'></div>
    ";
			}
		} else {
			
		}

}

	while ($row = $result->fetch_assoc()) {


	$consUser = 'SELECT * FROM profiles WHERE uid = "'.$row["uid"].'" ';
	$resultUser = $conn->query($consUser);
	$rowUser = $resultUser->fetch_assoc();



	$displayName = $rowUser["displayName"];
	$photoURL = $rowUser["photoURL"];
	$text = htmlentities($row["text"]);
	$titleArticle = htmlentities($row["titleArticle"]);
	$place = htmlentities($row["place"]);
	$fileName = $row["fileName"];
	$grade = $row["grade"];
	$downURL = $row["downURL"];
	$datePost = $row["datePost"];
	$type = $row["type"];
	$id = $row["id"];
	$uidPost = $row["uid"];

	$consLike = 'SELECT * FROM likes WHERE idPost = "'.$id.'" ';
	$resultLike = $conn->query($consLike);
	$rowsLike = $resultLike->num_rows;


	$consMyLike = 'SELECT * FROM likes WHERE idPost = "'.$id.'" AND uid = "'.$uid.'"';
	$resultMyLike = $conn->query($consMyLike);
	$rowsMyLike = $resultMyLike->num_rows;
	if ($rowsMyLike > 0) {
		$colorLike = "red-text fa fa-heart";
	} else {
		$colorLike = "purple-text text-lighten-2 fa fa-heart-o";
	}

	$consComments = 'SELECT * FROM comments WHERE idPost = "'.$id.'" ';
	$resultComments = $conn->query($consComments);
	$rowsComments = $resultComments->num_rows;



	


if ($type == "text") {

	if ($uidPost == $uid) {
		$deletePostTemplate = "<div ondblclick='deletePostText({$id})' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
	} else {
		$deletePostTemplate = "";
	}

		echo "
		
		<div id='post{$id}' class='card darken-1 left-align'>
      <div class='card-content'>

        		<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		<a href='profile.html?u={$uidPost}'>{$displayName}</a><br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
        <p>{$text}</p>
      </div>
      <div class='card-action'>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
        <a href='#postModal' onclick='showPostModal({$id})' class='purple-text text-lighten-2 btn-flat modal-trigger'><i class='material-icons' style='font-size:25px'>comment</i><div style='font-size:20px;margin-bottom:15px;display:inline-block'>{$rowsComments}</div></a>
				{$deletePostTemplate}
      </div>
      <div class='grey lighten-3'>";

      getComments($rowsComments,$id,$conn);

      echo "</div>
    </div>
		";
	
} elseif ($type == "photo") {
	if ($uidPost == $uid) {
		$deletePostTemplate = "        <div ondblclick='deletePostPhoto({$id},\"{$fileName}\")' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
	}else {
		$deletePostTemplate = "";
	}
		echo "
		<div id='post{$id}' class='card darken-1 left-align'>
			<div class='card-image' style='background: #e9e9e9 url(\"{$downURL}\") no-repeat;height:60vh;background-size:100%;background-position:center'>
			</div>
      <div class='card-content'>
        		<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		<a href='profile.html?u={$uidPost}'>{$displayName}</a><br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>
        		<br>
        <p>{$text}</p>
      </div>
      <div class='card-action'>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
        <a href='#postModal' onclick='showPostModal({$id})' class='purple-text text-lighten-2 btn-flat modal-trigger'><i class='material-icons' style='font-size:25px'>comment</i><div style='font-size:20px;margin-bottom:15px;display:inline-block'>{$rowsComments}</div></a>
        {$deletePostTemplate}
      </div>
      <div class='grey lighten-3'>";
      getComments($rowsComments,$id,$conn);


      echo "</div>
    </div>
		";
	
} elseif ($type == "video") {

		if ($uidPost == $uid) {
		$deletePostTemplate = "        <div ondblclick='deletePostVideo({$id},\"{$fileName}\")' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
	}else {
		$deletePostTemplate = "";
	}

		echo "
		<div id='post{$id}' class='card darken-1 left-align'>
			<video controls src='{$downURL}' class='responsive-video'></video>
      <div class='card-content'>
        		<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		<a href='profile.html?u={$uidPost}'>{$displayName}</a><br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>
        <p>{$text}</p>
      </div>
      <div class='card-action'>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
        <a href='#postModal' onclick='showPostModal({$id})' class='purple-text text-lighten-2 btn-flat modal-trigger'><i class='material-icons' style='font-size:25px'>comment</i><div style='font-size:20px;margin-bottom:15px;display:inline-block'>{$rowsComments}</div></a>
				{$deletePostTemplate}
      </div>
      <div class='grey lighten-3'>";
      getComments($rowsComments,$id,$conn);


      echo "</div>
    </div>
		";
	
} elseif ($type == "article") {
			if ($uidPost == $uid) {
		$deletePostTemplate = " <div ondblclick='deletePostArticle({$id})' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
	}else {
		$deletePostTemplate = "";
	}
		echo "
		<div id='post{$id}' class='card darken-1 left-align'>
			<div class='card-image' style='background: #e9e9e9 url(\"{$downURL}\") no-repeat;height:30vh;background-size:100%;background-position:center'>
			</div>
      <div class='card-content'>
        		<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		<a href='profile.html?u={$uidPost}'>{$displayName}</a><br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>
        		<br>
		<h3>{$titleArticle}</h3>
		<span>por <b>{$displayName}</b></span>
		<br>
		<a href='post.html?p={$id}'>Leer artículo</a>
      </div>
      <div class='card-action'>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
        	<a href='#postModal' onclick='showPostModal({$id})' class='purple-text text-lighten-2 btn-flat modal-trigger'><i class='material-icons' style='font-size:25px'>comment</i><div style='font-size:20px;margin-bottom:15px;display:inline-block'>{$rowsComments}</div></a>
		{$deletePostTemplate}
      </div>
      <div class='grey lighten-3'>";

      getComments($rowsComments,$id,$conn);

      echo "</div>
    </div>
		";
	
} elseif ($type == "place") {

	if ($grade == 0) {
		$tempGrade = "
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
		";
	} elseif ($grade == 1) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 2) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 3) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 4) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 5) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			";
	}

	if ($fileName == "") {
		$imgPlace = "";
	} else {
		$imgPlace = "

		<div class='card-image'>
			<img src='{$downURL}'>
        </div>
		";
	}

	if ($uidPost == $uid) {
		
		if ($imgPlace = "") {
			$deletePostTemplate = "<div ondblclick='deletePostArticle({$id})' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
		} else {
		$deletePostTemplate = " <div ondblclick='deletePostPhoto({$id},\"{$fileName}\")' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
		}
	}else {
		$deletePostTemplate = "";
	}
		echo "
		<div id='post{$id}' class='card darken-1 left-align'>
		{$imgPlace}
      <div class='card-content'>
        		<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		<a href='profile.html?u={$uidPost}'>{$displayName}</a><br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>
        		<br>
				<h5><a href='https://www.google.com/maps/search/{$place}' target='_blank'>{$place}</a></h5>
					<i class='material-icons'>restaurant</i> {$tempGrade}
        <p>{$text}</p>
      </div>
      <div class='card-action'>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
        <a href='#postModal' onclick='showPostModal({$id})' class='purple-text text-lighten-2 btn-flat modal-trigger'><i class='material-icons' style='font-size:25px'>comment</i><div style='font-size:20px;margin-bottom:15px;display:inline-block'>{$rowsComments}</div></a>
        {$deletePostTemplate}
      </div>
      <div class='grey lighten-3'>";

      getComments($rowsComments,$id,$conn);

      echo "</div>
    </div>
		";
	
} elseif ($type == "taste") {
	if ($uidPost == $uid) {
		$deletePostTemplate = "<div ondblclick='deletePostTaste({$id},\"{$fileName}\")' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
	}else {
		$deletePostTemplate = "";
	}

	if ($grade == 0) {
		$tempGrade = "
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
		";
	} elseif ($grade == 1) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 2) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 3) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 4) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text text-lighten-2'>grade</i>
			";
	}elseif ($grade == 5) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			";
	}
		echo "
		<div id='post{$id}' class='card darken-1 left-align'>
			<div class='card-image' style='background: #e9e9e9 url(\"{$downURL}\") no-repeat;height:60vh;background-size:100%;background-position:center'>
			</div>
      <div class='card-content'>
        		<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		<a href='profile.html?u={$uidPost}'>{$displayName}</a><br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>
        		<br>
        <i class='material-icons'>local_bar</i> {$tempGrade}
        <p>{$text}</p>
      </div>
      <div class='card-action'>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
        <a href='#postModal' onclick='showPostModal({$id})' class='purple-text text-lighten-2 btn-flat modal-trigger'><i class='material-icons' style='font-size:25px'>comment</i><div style='font-size:20px;margin-bottom:15px;display:inline-block'>{$rowsComments}</div></a>
        {$deletePostTemplate}
      </div>
      <div class='grey lighten-3'>";

      getComments($rowsComments,$id,$conn);

      echo "</div>
    </div>
		";
	
}

		$r++;
			echo "<script> r = {$r} 
	
			var test = '".$cons."';

			</script>";



}

		 

 ?>