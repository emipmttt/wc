<?php 

	$idPoste = $_POST['id'];
	$uid = $_POST['uid'];
	$page = $_POST['page'];

	include 'conn.php';



	$consComments = 'SELECT * FROM comments WHERE idPost = "'.$idPoste.'"';
	$resultComments = $conn->query($consComments);

	$commentsArray = array();

	while ($rowComments = $resultComments->fetch_assoc()) {

		$uidPoste = $rowComments['uid'];
		$cons = 'SELECT * FROM profiles WHERE uid = "'.$uidPoste.'"';
		$result = $conn->query($cons);
		$row = $result->fetch_assoc();
		$photoURLComment = $row['photoURL'];
		$displayNameComment = htmlentities($row['displayName']);
		$text = htmlentities($rowComments['text']);
		$idPosted = $rowComments['id'];

		if ($uidPoste == $uid) {
		$deleteCommentTemplate = "<div ondblclick='deleteComment({$idPosted})' href='#' class='red-text btn-flat right'><i class='fa fa-trash-o' style='font-size:25px'></i></div>";
		}else {
			$deleteCommentTemplate = "";
		}


array_push($commentsArray, "
	<div id='comment{$idPosted}'>
			<br>
       	<div class='valign-wrapper'>
       		<img src='{$photoURLComment}' class='circle' style='width:40px;height:40px; margin: 0 20px'> {$displayNameComment}  <br> {$text}
       	</div>
       	<div class='right'>{$deleteCommentTemplate}</div>
       	<br>
       	<div class='divider'></div>
    </div>
");
}
		
	


	$cons = 'SELECT * FROM post WHERE id = "'.$idPoste.'"';
	$result = $conn->query($cons);
	$row = $result->fetch_assoc();
	$consUser = 'SELECT * FROM profiles WHERE uid = "'.$row["uid"].'" ';
	$resultUser = $conn->query($consUser);
	$rowUser = $resultUser->fetch_assoc();

	$displayName = htmlentities($rowUser["displayName"]);
	$photoURL = $rowUser["photoURL"];
	$text = nl2br(htmlentities($row["text"]));
	$titleArticle = htmlentities($row["titleArticle"]);
		$grade = $row["grade"];
	$place = htmlentities($row["place"]);
	$fileName = $row["fileName"];
	$downURL = $row["downURL"];
	$datePost = $row["datePost"];
	$type = $row["type"];
	$id = $row["id"];

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

if ($type == "text") {
		echo "
		
		<div id='post{$id}' class='darken-1 left-align'>
      <div>
<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$displayName}<br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
        <p>{$text}</p>
      </div>
      <div>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='margin-left:10px; font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>       
        <br>

        <div class='input-field'>
		<input id='addComent' type='text'>
		<label for='addComent'>Comentario</label>
        </div>

		
		<div onclick='sendNewComment(\"{$id}\")' class='btn purple waves-effect waves-light'>Comentar</div>
<br>		
<br>	
        <b>Comentarios</b>
        <div class='divider'></div>
<div id='comments{$id}'>

";

$arrlength = count($commentsArray);

for($x = 0; $x < $arrlength; $x++) {
    echo $commentsArray[$x];

}

echo "</div>


      </div>
    </div>
		";
} elseif ($type == "photo") {
		echo "
		<div id='post{$id}' class='darken-1 left-align'>
			<img src='{$downURL}' width='100%'> 
      <div>
<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$displayName}<br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
        <p>{$text}</p>
      </div>
      <div>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='margin-left:10px; font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>

        <div class='input-field'>
		<input id='addComent' type='text'>
		<label for='addComent'>Comentario</label>
        </div>

		<div onclick='sendNewComment(\"{$id}\")' class='btn purple waves-effect waves-light'>Comentar</div>
<br>		
   <br>
        <b>Comentarios</b>
        <div class='divider'></div>
<div id='comments{$id}'>";

$arrlength = count($commentsArray);

for($x = 0; $x < $arrlength; $x++) {
    echo $commentsArray[$x];

}

echo "</div>
			



      </div>
    </div>
		";

} elseif ($type == "video") {
		echo "
		<div id='post{$id}' class='darken-1 left-align'>
			<video controls src='{$downURL}' class='responsive-video'></video>
      <div>
<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$displayName}<br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
        <p>{$text}</p>
      </div>
      <div>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='margin-left:10px; font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
  		<br>

        <div class='input-field'>
		<input id='addComent' type='text'>
		<label for='addComent'>Comentario</label>
        </div>

		<div onclick='sendNewComment(\"{$id}\")' class='btn purple waves-effect waves-light'>Comentar</div>
<br>		
   <br>
        <b>Comentarios</b>
        <div class='divider'></div>
<div id='comments{$id}'>";

$arrlength = count($commentsArray);

for($x = 0; $x < $arrlength; $x++) {
    echo $commentsArray[$x];

}

echo "</div>
			



      </div>
    </div>
		";
} elseif ($type == "article") {

	if ($row['uid'] == $uid) {

		if ($page == "post") {
			$editArticle = "

				<a href='#editModal' onclick='editArticle(\"{$idPoste}\")' class='modal-trigger waves-effect btn-flat cyan-text right'> <i class='material-icons left'>edit</i> Editar</a>
			";		
		}else {
			$editArticle = "";
		}

	} else {
		$editArticle = "";

	}

		echo "
		<div id='post{$id}' class='darken-1 left-align'>
			<div class='card-image' style='background: #e9e9e9 url(\"{$downURL}\") no-repeat;height:30vh;background-size:100%;background-position:center'>
			</div>
      	<div>
      <br>
<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$displayName}<br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
				<h3>{$titleArticle}</h3>
		<span>Por <b>{$displayName}</b></span>
		<br>
        <div class='articleText black-text'>{$text}</div>
      </div>
      <div>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='margin-left:10px; font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
  		<br>

        <div class='input-field'>
		<input id='addComent' type='text'>
		<label for='addComent'>Comentario</label>
        </div>

		<div onclick='sendNewComment(\"{$id}\")' class='btn purple waves-effect waves-light'>Comentar</div>
<br>		
   <br>
        <b>Comentarios</b>
        <div class='divider'></div>
<div id='comments{$id}'>";

$arrlength = count($commentsArray);

for($x = 0; $x < $arrlength; $x++) {
    echo $commentsArray[$x];

}

echo "</div>
			



      </div>
    </div>
		";

} elseif ($type == "place") {
		if ($grade == 0) {
		$tempGrade = "
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
		";
	} elseif ($grade == 1) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			";
	}elseif ($grade == 2) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			";
	}elseif ($grade == 3) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			";
	}elseif ($grade == 4) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
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
		<div id='post{$id}' class='darken-1 left-align'>
      <div>
<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$displayName}<br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
				<h5> <a href='https://www.google.com/maps/search/{$place}' target='_blank'>{$place}</a></h5>
				<i class='material-icons'>restaurant</i> {$tempGrade}
        <p>{$text}</p>
      </div>
      <div>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='margin-left:10px; font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
  		<br>

        <div class='input-field'>
		<input id='addComent' type='text'>
		<label for='addComent'>Comentario</label>
        </div>

		<div onclick='sendNewComment(\"{$id}\")' class='btn purple waves-effect waves-light'>Comentar</div>
<br>		
   <br>
        <b>Comentarios</b>
        <div class='divider'></div>
<div id='comments{$id}'>";

$arrlength = count($commentsArray);

for($x = 0; $x < $arrlength; $x++) {
    echo $commentsArray[$x];

}

echo "</div>
			



      </div>
    </div>
		";

} elseif ($type == "taste") {
		if ($grade == 0) {
		$tempGrade = "
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
		";
	} elseif ($grade == 1) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			";
	}elseif ($grade == 2) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			";
	}elseif ($grade == 3) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			<i class='material-icons grey-text'>grade</i>
			";
	}elseif ($grade == 4) {
		$tempGrade = "
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons purple-text text-lighten-2'>grade</i>
			<i class='material-icons grey-text'>grade</i>
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
		<div id='post{$id}' class='darken-1 left-align'>
				<img src='{$downURL}' width='100%'> 
      <div>
<div style='background:url({$photoURL}) no-repeat; background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px;'></div>
				<div style='display:inline-block'>
	        		{$displayName}<br>
	        		<a href='post.html?p={$id}'><div class='grey-text' style='font-size:15px'>{$datePost}</div></a>
        		</div>	
        		<br>
                <i class='material-icons'>local_bar</i> {$tempGrade}
        <p>{$text}</p>
      </div>
      <div>
        <div href='#' class='purple-text text-lighten-2 btn-flat'><i onclick='likeThis(\"{$id}\",\"{$uid}\")' id='like{$id}' class=' {$colorLike} ' style='font-size:25px'></i> <a href='#modalLikes' class='purple-text text-lighten-2 modal-trigger'><b style='margin-left:10px; font-size:20px' id='likesPost{$id}' onclick='showLikes(\"{$id}\")' >{$rowsLike}</b></a> </div>
  		<br>

        <div class='input-field'>
		<input id='addComent' type='text'>
		<label for='addComent'>Comentario</label>
        </div>

		<div onclick='sendNewComment(\"{$id}\")' class='btn purple waves-effect waves-light'>Comentar</div>
<br>		
   <br>
        <b>Comentarios</b>
        <div class='divider'></div>
<div id='comments{$id}'>";

$arrlength = count($commentsArray);

for($x = 0; $x < $arrlength; $x++) {
    echo $commentsArray[$x];

}

echo "</div>
			



      </div>
    </div>
		";
}
		 

 ?>