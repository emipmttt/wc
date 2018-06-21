
$.ajax({
    data: {"uid":uData.uid},
    url:   'php/panel/verifyAccount.php',
    type:  'post',
    success: function (response) {
	    if (response == 1) {
	    } else {
	     	location.href='index.html';
	    }
	}
});

var dataChart;
var template1;

$.ajax({
    data: {"uid":uData.uid},
    url:   'php/panel/getDataChart.php',
    type:  'post',
    success: function (response) {

    	console.log(response);
    	dataChart = JSON.parse(response);
    	console.log(dataChart);
    	//
    	template1 = `
<div class="container">

	<div class="row">
			<div class="col s12">
				<div class='purple lighten-2 card-panel white-text'>
					<b>¿Qué se publica?</b>
					<br /><br />
					<div class="row">
						<div class="col s6 l2" style='font-size:25px'>
							<i class="fa fa-comment"></i> ${dataChart.numPostText}
						</div>
						<div class="col s6 l2" style='font-size:25px'>
							<i class="fa fa-image"></i> ${dataChart.numPostPhoto}
						</div>
						<div class="col s6 l2" style='font-size:25px'>
							<i class="fa fa-film"></i> ${dataChart.numPostVideo}
						</div>
						<div class="col s6 l2" style='font-size:25px'>
							<i class="fa fa-newspaper-o"></i> ${dataChart.numPostArticle}
						</div>
						<div class="col s6 l2" style='font-size:25px'>
							<i class="fa fa-cutlery"></i> ${dataChart.numPostPlace}
						</div>
						<div class="col s6 l2" style='font-size:25px'>
							<i class="fa fa-glass"></i> ${dataChart.numPostTaste}
						</div>
					</div>
				</div>
			</div>	
		</div>
		<div class="row">
			<div id="posts" style='height:200px;width:100%'></div>
		</div>
		<div class="row">
			<div class="col s12 l3">
				<div class='deep-orange lighten-2 card-panel white-text'>
					<div class='valign-wrapper'><i class='material-icons'>group</i> Usuarios registrados</div>
					<div class="titleChart">${dataChart.numUsers}</div>
				</div>
			</div>
			<div class="col s12 l3">
				<div class='purple lighten-2  card-panel white-text'>
					<b>Publicaciones</b>
					<div class="titleChart">${dataChart.numPost}</div>
				</div>
			</div>
			<div class="col s12 l3">
				<div class='green lighten-2 card-panel white-text'>
					<div style='display-inline-block'>
						<b>Mujeres registradas</b>
						<div class="titleChart">${dataChart.numUsersWoman}</div>
					</div>
					<div style='display-inline-block'>
						<b>Hombres registrados</b>
						<div class="titleChart">${dataChart.numUsersMan}</div>
					</div>

				</div>
			</div>
			<div class="col s12 l3">
				
				<div id="gender" style="height: 250px;"></div>
					
			</div>
		</div>
</div>	

`;

var template2 = `
<div class="container">
<br />
	<nav class='blue'>
		<div class="nav-wrapper">
	      <form>
	        <div class="input-field">
	          <input id="search" type="search" autocomplete='off' placeholder="Busca personas">
	          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
	          <i class="material-icons" onclick="$('#search').val('');$('#resSearch').html('')">close</i>
	        </div>
	      </form>
	    </div>
	</nav>
    <div id="resSearch" align="left" class="left left-align" style='width:100%'></div>
</div>   

	<div id="modal1" class="modal">
	    <div class="modal-content" id='adminCont'>
	      
	    </div>
	    <div class="modal-footer">
	      <a onclick='saveAdmin()' class="modal-close waves-effect waves-green btn-flat">guardar</a>
	    </div>
	  </div>

   `;

var template3 = `

<div class="container" >

 <ul id='contPost' class="collection">
	
 </ul>


</div>

`;

var template4 = `

<div class="container" >

<div class="row">
    <div class="progress">
      <div id="uploader" class="determinate" style="width:0%"></div>
    </div>
      <div class="row">
        <div class="input-field col s12 m3">
          <input placeholder="Placeholder" id="url" type="text" class="validate" maxlenght='1500'>
          <label for="url">URL del anuncio</label>
        </div>
        <div class="input-field col s12 m3">
          <input placeholder="Placeholder" id="title" type="text" class="validate" maxlenght='50'>
          <label for="title">Título</label>
        </div>

        <div class="col s12 m3">
        <br />
	        <input style='display:none' type="file" value="upload" id="fileButton" accept="image/*"/>

    		<label for='fileButton' class="btn pur"><i class='material-icons'>camera_alt</i></label>

			<div class="btn blue" onclick='saveAd()'>guardar</div>
        </div>

      </div>

</div>


      <table class='striped responsive-table'>
        <thead>
          <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Url</th>
              <th>Imagen</th>
              <th>Eliminar</th>
          </tr>
        </thead>

        <tbody id='contAds'>
          	
        </tbody>
      </table>


</div>

`;


$("main").html(`

  <nav class="nav-extended">
    <div class="nav-wrapper purple lighten-2">
      <a href="#" class="brand-logo">Panel de Control</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="home.html">Inicio</a></li>
        <li><a href="#" id='closeSession'>Cerrar Sesión</a></li>
      </ul>
    </div>
    <div class="nav-content purple lighten-2">
      <ul class="tabs tabs-transparent">
        <li class="tab"><a class="active" href="#test1">Estadísticas</a></li>
        <li class="tab"><a href="#test2">Permisos</a></li>
        <li class="tab"><a href="#test3" onclick='showPostArticles()'>Publicaciones</a></li>
        <li class="tab"><a href="#test4" onclick='showAds()'>Anuncios</a></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
        <li><a href="home.html">Inicio</a></li>
        <li><a href="#" id='closeSession'>Cerrar Sesión</a></li>
  </ul>

  <div id="test1" class="col s12">

	${template1}

  </div>
  <div id="test2" class="col s12">

	${template2}
	
  </div>
  <div id="test3" class="col s12">

	${template3}

  </div>
  <div id="test4" class="col s12">
	
	${template4}

  </div>

`);

$("#closeSession").click(closeSession);


  $(document).ready(function(){
    $('.tabs').tabs();
    $('.modal').modal();

new Morris.Bar({
  // ID of the element in which to draw the chart.
  element: 'posts',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { type: 'Texto', value: dataChart.numPostText },
    { type: 'Fotos', value: dataChart.numPostPhoto },
    { type: 'Video', value: dataChart.numPostVideo },
    { type: 'Artículos', value: dataChart.numPostArticle },
    { type: 'Recomendaciones', value: dataChart.numPostPlace },
    { type: 'Cata', value: dataChart.numPostTaste },

  ],
  // The name of the data record attribute that contains x-values.
  xkey: 'type',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Cantidad']
});

Morris.Donut({
  element: 'gender',
  data: [
    {label: "Hombres", value: dataChart.numUsersMan},
    {label: "Mujeres", value: dataChart.numUsersWoman},
  ]
});

$("#search").keyup(function(event) {
  var search = $("#search").val();
  $.ajax({
    data:  {"search":search,"myUid":uData.uid},
    url:   'php/searchProfileAdmin.php',
    type:  'post',
    success:  function (response) {
      $("#resSearch").html(response);
    }
  }); 
});


  });

//
	}
})




function setAdmin(uid) {
	$.ajax({
		data:  {"uid":uid},
		url:   'php/setAdmin.php',
		type:  'post',
		success:  function (response) {
			$("#adminCont").html(response);
			  $(document).ready(function(){
			    $('select').formSelect();
			  });
		}
	}); 

}

function saveAdmin() {
	var selectAdmin = $("#selectAdmin").val();
	var uidInput = $("#uidInput").val();

	$.ajax({
		data:  {"uidInput":uidInput,"selectAdmin":selectAdmin},
		url:   'php/panel/saveAdmin.php',
		type:  'post',
		success:  function (response) {
	if (response == 1) {

  	M.toast({html: 'Cambios guardados'})
	}else{
		console.log(response);
		}
	}
	});

}

function showPostArticles () {
	$.ajax({
    data: {"uid":uData.uid},
    url:   'php/panel/getPost.php',
    type:  'post',
    success: function (response) {
    	$("#contPost").html(response);
		$('select').formSelect();


  $(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "eventos": null,
        "cursodevino": null,
        "notasdecata": null,
        "noticias": null,
        "enoturismo": null
      },
    });
  });



    }
});

}

function togglePost(ide) {

var category = $("#autocomplete-input"+ide).val();

		$.ajax({

	    data: {"id":ide,"category":category},
	    url:   'php/panel/togglePost.php',
	    type:  'post',
	    success: function (response) {
	    	if (response == 1) {
	    		showPostArticles();
	    	}else{
	    		console.log(response);
	    	}
	    }
	});
}

  var fileName;
  var downURL;

function showAds() {

		$.ajax({

	    data: {},
	    url:   'php/panel/showAds.php',
	    type:  'post',
	    success: function (response) {
	    		$("#contAds").html(response);




  var uploader = document.getElementById("uploader");
  document.getElementById("fileButton").addEventListener('change',function (e) {
    var file = e.target.files[0];
    fileName = idDate+uData.uid+file.name;
    var storageRef = firebase.storage().ref('videoPost/'+fileName);
    var task = storageRef.put(file);
    task.on('state_changed', function(snapshot) {
        var porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.style.width = porcentage + "%";
      },function(error) {},function() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        downURL = downloadURL;
        });
      });
  });

	    }
	});
}







function saveAd() {
var url = $("#url").val();
	var title = $("#title").val();
		$.ajax({

	    data: {"img":downURL,"title":title,"url":url},
	    url:   'php/panel/saveAds.php',
	    type:  'post',
	    success: function (response) {
	    	if (response == 1) {
	    		showAds()
	    	}else{
	    		console.log(response);
	    	}
	    }
	});
}


function deleteAd(ide) {
		$.ajax({

	    data: {"id":ide},
	    url:   'php/panel/deleteAds.php',
	    type:  'post',
	    success: function (response) {
	    	if (response == 1) {
	    		showAds();
	    	}else{
	    		console.log(response);
	    	}
	    }
	});
}
