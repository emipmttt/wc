$("main").html(`

<div class="cont">

  <div class="row">
    <div class="col s12">
      <ul class="tabs" style='background:none'>
        <li class="tab col s3"><a class="active" href="#test1">Amigos</a></li>
        <li class="tab col s3"><a href="#test2">Mejores Amigos</a></li>
      </ul>
    </div>
    <div id="test1" class="col s12">
    	<ul class="collection" id='friends'></ul>
    </div>
    <div id="test2" class="col s12">
    	<ul class="collection" id='bf'></ul>
    </div>

  </div>

	

</div>

	`);

$(document).ready(function() {
	$.ajax({
		url: 'php/getFriends.php',
		type: 'post',
		data: {"uid":uData.uid,"type":1},
		success: function (response) {
			$("#friends").html(response);
			$('.tooltipped').tooltip();
			$('.tabs').tabs();
		}
	});
		$.ajax({
		url: 'php/getFriends.php',
		type: 'post',
		data: {"uid":uData.uid,"type":2},
		success: function (response) {
			$("#bf").html(response);
			$('.tooltipped').tooltip();
			$('.tabs').tabs();
		}
	});
})