


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
 

    // ****************************************************************************++

  } else {

      location.href = "index.html";

  }
});

// user scripts


var userData;
var editProfileTemplate;
var userTemplate;
var menuUserTemplate;
var edad;
var gender;
var menuEditProfileTemplate;


function findUser(uide) {
	  	var docRef = db.collection("profiles").doc(uide);  //obtener datos del usuario logueado en base de datos
			docRef.get().then(function(doc) {
		    if (doc.exists) {
	        console.log("Usuario:", doc.data());
	        userData = doc.data();
	        edad = getOld(userData.dia,userData.mes,userData.año);
	        if (userData.gender == "hombre") {
	        	gender = " 	fa fa-mars";
	        }else if (userData.gender == "mujer") {
	        	gender = " 	fa fa-venus";
	        }

	        	userTemplate = `
							<header class="headerProfile backHeader">
								<div class="backHeaderCont">
									<div class="row">
										<div class="col">
											<div class="imgProfile" style="background:url(${userData.photoURL});	background-size: contain; 	background-position: center;	background-repeat: no-repeat;"></div>
											<div class="titlesProfile" style="  vertical-align: top;  "> 
												<div class="nameProfile capriText">${userData.displayName}  </div>
												<span> <i style="font-size:15px !important" class="fa fa-calendar"></i> ${edad} años </span>
												<span> <i style="font-size:15px !important" class="fa fa-flag"></i> ${userData.country}</span>

												<div><i style="font-size:15px !important" class="${gender}"></i></div>
											</div>
										</div>
										<div class="col table">
											<div class="cell" align="center"><p>${userData.description}</p></div>
										</div>
									</div>
								</div>						
							</header>
						<br /><br /><br /><br /><br /><br />
						<div class="card">
							<div class="container">
								
							</div>
						</div>
						`;

					if (doc.id == uid) {
						console.log("Este es tu perfil .");

						menuUserTemplate =`
							<br />
							<div class="container" id="menuLeft">
								<div class="btnF lumiText" id="editProfile" ><i class=" 	fa fa-address-card-o"></i> Editar Perfil</div>
							</div>

							`;
					} else {
						menuUserTemplate =`

							<div class="container">
								<br />
							</div>

							`;
					}

	        function printUser() {
						$("#secCenter").html(userTemplate);
						$("#menu").html(menuUserTemplate);
	        }

	        printUser();

					editProfileTemplate = `
						<header class="backHeader">
							<div class="backHeaderCont">
								<div class="btnBackHeader inline" id="#backProfile"><a href="" class="blackText"><i class="fa fa-arrow-left"></i></a> Ver perfil</div>
								<div id="saveChangesProfile" class="inline btnF lumiText" style="float:right">Guardar</div>
							</div>
						</header>
						<br /><br /><br />
						<div class="card">
							<div class="container">
							<br /><br />
							<h1><i class=" 	fa fa-address-card-o"></i> Editar Perfil</h1>
							<br /><br />
								<label for="displayName"><i class=" 	fa fa-user-o"></i> Nombre de usuario</label>
								<input id="displayName" type="text" class="inputText" placeholder="Nuevo nombre de usuario" value="${userData.displayName}" />
								<br /><br />
								<label for="gender"><i class=" 	fa fa-venus-mars"></i> Genero</label>
								<br /><br />
								<select id="gender" class="inputText"	>
								  <option value="indefinido">Indefinido</option>
								  <option value="hombre">Hombre</option>
								  <option value="mujer">Mujer</option>
								</select>
								<br /><br />
								<label for="description"><i class="fa fa-align-left"></i> Sobre ti</label>
								<textarea id="description" class="inputText" rows="5">${userData.description}</textarea>
								<br /><br />
								<label for="country"><i class=" 	fa fa-flag"></i> País de recidencia</label>
								<input id="country" type="text" class="inputText" placeholder="País" value="${userData.country}" />
								<br /><br />
								<label for="date"> <i class=" 	fa fa-calendar"></i> Fecha de nacimiento</label>
								<div class="inputText" id="date">
									<input id="año" class="inputNone" style="width:40px" placeholder="AAAA" maxlength="4" value="${userData.año}" />	/
									<input id="mes" class="inputNone" style="width:40px" placeholder="MM" maxlength="2" value="${userData.mes}" />	/
									<input id="dia" class="inputNone" style="width:40px" placeholder="DD" maxlength="2" value="${userData.dia}" />	
								</div>
								<br /><br />
							</div>
						</div>
					`;

					menuEditProfileTemplate = `
								<a href="my-photo-profile.html"><div class="btnF lumiText"><i class="fa fa-camera"></i> Foto de perfil</div></a>
					`;

		$("#editProfile").click(function () {
			document.getElementById("menuLeft").innerHTML += menuEditProfileTemplate;
			$("#secCenter").html(editProfileTemplate);
			function saveChangesProfile() {
				var displayName = $("#displayName").val();
				var gender = $("#gender").val();
				var description = $("#description").val();
				var country = $("#country").val();
				var año = $("#año").val();
				var mes = $("#mes").val();
				var dia = $("#dia").val();

				return db.collection("profiles").doc(uid).update({
				    displayName,
				    description,
				    country,
				    gender,
				    año,
				    mes,
				    dia
				})
				.then(function() {
				    console.log("Document successfully updated!");
						location.href="";

				})
				.catch(function(error) {
				    // The document probably doesn't exist.
				    console.error("Error updating document: ", error);
				});


			}

			$("#saveChangesProfile").click(function() {
				saveChangesProfile();
			});


		});
		    } else {
	        $("log").text("Esta cuenta de usuario no se pudo encontrar </3");
		    }
			}).catch(function(error) {
			    $("log").text("Error al buscar al usuario:", error);
			});
}

findUser(getQueryVariable("uid"));

	