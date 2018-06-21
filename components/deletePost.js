function deletePostText(id) {
  $.ajax({
    data:  {"id":id,"type":"text"},
    url:   'php/deletePost.php',
    type:  'post',
    success:  function (response) {
			if (response == 1) {
    		$(`#post${id}`).slideUp("slow");
			}
    }
  });
}

function deletePostPhoto(id,fileName) {
	var photoRef = storageRef.child(`photoPost/${fileName}`);
	photoRef.delete().then(function() {
	  $.ajax({
	    data:  {"id":id,"type":"photo"},
	    url:   'php/deletePost.php',
	    type:  'post',
	    success:  function (response) {
				if (response == 1) {
	    		$(`#post${id}`).slideUp("slow");
				}
	    }
	  });
	}).catch(function(error) {
		console.log(error)
	});
}

function deletePostVideo(id,fileName) {
	var photoRef = storageRef.child(`videoPost/${fileName}`);
	photoRef.delete().then(function() {
	  $.ajax({
	    data:  {"id":id,"type":"video"},
	    url:   'php/deletePost.php',
	    type:  'post',
	    success:  function (response) {
				if (response == 1) {
	    		$(`#post${id}`).slideUp("slow");
				}
	    }
	  });
	}).catch(function(error) {
		console.log(error)
	});
}

function deletePostArticle(id) {
  $.ajax({
    data:  {"id":id,"type":"article"},
    url:   'php/deletePost.php',
    type:  'post',
    success:  function (response) {
			if (response == 1) {
    		$(`#post${id}`).slideUp("slow");
			}
    }
  });
}

function deletePostTaste(id,fileName) {
	var photoRef = storageRef.child(`photoPost/${fileName}`);
	photoRef.delete().then(function() {
	  $.ajax({
	    data:  {"id":id,"type":"taste"},
	    url:   'php/deletePost.php',
	    type:  'post',
	    success:  function (response) {
				if (response == 1) {
	    		$(`#post${id}`).slideUp("slow");
				}
	    }
	  });
	}).catch(function(error) {
		console.log(error)
	});
}

function deleteComment(id) {
  $.ajax({
    data:  {"id":id,"type":"comment"},
    url:   'php/deletePost.php',
    type:  'post',
    success:  function (response) {
			if (response == 1) {
    		$(`#comment${id}`).slideUp("slow");
			}
    }
  });
}