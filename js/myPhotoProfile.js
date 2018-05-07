
var db;
var displayName, emailVerified, email,photoURL,isAnonymous,uid,providerData;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  	window.user = user;

    // User is signed in.
    displayName = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;
    photoURL = user.photoURL;
    isAnonymous = user.isAnonymous;
    uid = user.uid;
    providerData = user.providerData;
    
  	//verificar que la cuenta este en base de datos
		db = firebase.firestore();

  	var docRef = db.collection("profiles").doc(uid);  //obtener datos del usuario logueado en base de datos

		docRef.get().then(function(doc) {
	    if (doc.exists) {
        console.log("cuenta almacenada en base de datos");
	    } else {
        console.log("usuario no almacenado!");
        // añadir datos del usuario logueado a la base de datos
        db.collection("profiles").doc(uid).set({
				  displayName,
				  email,
				  photoURL,   
          description: "Wine 4 ever",
          country: "sin definir",
          gender: "sin definir",
          año: 0,
          mes: 0,
          dia: 0
				})
				.then(function() {
				  console.log("Usuario almacenado");
				})
				.catch(function(error) {
				  console.error("Error writing document: ", error);
				});
	    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
		});

  } else {
      location.href = "index.html";
  }
});



//photo profile script	
	$("#secCenter").html(`
	<br />	
		<div class=" card">
		<progress id="prog" max="100" value="0" /> 

			<div class="container" align="center">
				<input type="file" id="campoarchivo" accept="image/*" style="display:none">
				<h1>Nueva foto de perfil</h1>

			  <div id="controles">
			  <br />
			    <div class="btnF lumiText inline" id="pausar"> <i class=" 	fa fa-pause"></i> </div>
			    <div class="btnF lumiText inline" id="reanudar"> <i class=" 	fa fa-play"></i> </div>
			    <div class="btnF lumiText inline" id="cancelar"> <i class=" 	fa fa-stop"></i> </div>
			    <div id="check" ></div>    
			  </div>
			</div>
			<br />
			<img src=""  id="img-destino" width="100%" />
			<div class="container">
				<div id="fileSelect" class="btn capri"><i class=" 	fa fa-search"></i> foto de perfil</div>
	<br />
			</div>
		</div>

		`);

	var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("campoarchivo");

	fileSelect.addEventListener("click", function (e) {
	  if (fileElem) {

	    fileElem.click();
	  }
	}, false);

	 // Servicios de APIs Firebase
    var storageService = firebase.storage();

    window.onload = function() {


      //manejador de evento para el input file
      document.getElementById('campoarchivo').addEventListener('change', function(evento){
        evento.preventDefault();
        var archivo  = evento.target.files[0];

//mostrar imagen 
					showImage(fileElem);
	        subirArchivo(archivo);
      });

      //manejadores de eventos para los botones de control de la subida
      document.getElementById('pausar').addEventListener('click', function() {
        if(uploadTask && uploadTask.snapshot.state == 'running') {
          uploadTask.pause();
          console.log('pausada');    
        }
      });
      document.getElementById('reanudar').addEventListener('click', function() {
        if(uploadTask && uploadTask.snapshot.state == 'paused') {
          uploadTask.resume();
          console.log('reanudada');    
        }
      });
      document.getElementById('cancelar').addEventListener('click', function() {
        if(uploadTask && (uploadTask.snapshot.state == 'paused' || uploadTask.snapshot.state == 'running')) {
          if(uploadTask.snapshot.state == 'paused') {
            uploadTask.resume();
          }
          uploadTask.cancel();
          console.log('cancelada');   
        };
      });
    
    };

    // defino el uploadTask como variable global, porque lo voy a necesitar
    var uploadTask;
    function subirArchivo(archivo) {
    	var altNum = Math.floor(Math.random()*394)+79;
			var child = uid+altNum+archivo.name;
      var refStorage = storageService.ref('photoProfile').child(child);
      uploadTask = refStorage.put(archivo);

      // El evento donde comienza el control del estado de la subida
      uploadTask.on('state_changed', registrandoEstadoSubida,errorSubida, finSubida);

      //Callbacks para controlar los distintos instantes de la subida
      function registrandoEstadoSubida(uploadSnapshot) {

        var calculoPorcentaje = (uploadSnapshot.bytesTransferred / uploadSnapshot.totalBytes) * 100;
        calculoPorcentaje = Math.round(calculoPorcentaje);
        registrarPorcentaje (calculoPorcentaje);
      }
      function errorSubida(err) {
        console.log('Error al subir el archivo', err);
      }
      function finSubida(){
        console.log('Subida completada');
        console.log('el archivo está subido. Su ruta: ', uploadTask.snapshot.downloadURL);
        var urlp = uploadTask.snapshot.downloadURL;

				return db.collection("profiles").doc(uid).update({ //modificar photoURL
				   photoURL : urlp
				})
				.then(function() {

				    console.log("Document successfully updated!");
				    var nameDoc = uid+archivo.name;
						db.collection("userGalery").doc(nameDoc).set({ //agregar foto a la galería del usuario
							uid,
							url : photoURL,
							description : "",
							album : "Fotos de perfil"

						})
						.then(function() {
						  console.log("Foto almacenada en galería del usuario");

						  	document.getElementById("check").innerHTML = "<i class=' 	fa fa-check greenText'></i>"

								location.href="user.html?uid=" + uid;
						})
						.catch(function(error) {
						  console.error("Error writing document: ", error);
						});

				})
				.catch(function(error) {
				    // The document probably doesn't exist.
				    console.error("Error updating document: ", error);
				});
      }

    }

    // mostramos el porcentaje en cada instante de la subida
    function registrarPorcentaje(porcentaje) {
      var progress = document.getElementById('prog');
      progress.value = porcentaje;
    }


    //mostrar imagen 

       
    function showImage(input) {
		 if (input.files && input.files[0]) {
		  var reader = new FileReader();
		  reader.onload = function (e) {
		   $('#img-destino').attr('src', e.target.result);
		  }
		  reader.readAsDataURL(input.files[0]);
		 }
		}
		 

