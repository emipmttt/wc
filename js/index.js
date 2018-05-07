function printIndexTemplate() {


$("main").html(`
		<div>
			<div class="row">
<br><br>
				<div class="col whiteText vh" style="text-shadow: 0px 1px 5px rgba(0,0,0,.5)" align="center">
					<br>
					<h1>${templateDataProyect.title}</h1>
					<h1>${templateDataProyect.description}</h1>
					<h3>${templateDataProyect.secondDescription}</h3>
						
				</div>
				<div class="col vh">
					<div class="container" align="center">
					<br />
						<h3><i class="fa fa-user-o"></i> CUENTA DE USUARIO</h3>
						<input id="email" type="email" class="inputText" placeholder="Correo Electrónico">
						<input id="password" type="password" class="inputText" placeholder="Contraseña">
						<p id="notice"></p>

						<div class="row">
							<div class="col">
								<div class="btn lumi" id="login"><i class="fa fa-user" style="color:white"></i> Iniciar Sesión</div>
							</div>
							<div class="col">
								<div class="btn lumi" id="createAccount"><i class="fa fa-user-plus" style="color:white"></i> registrate</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div class="btn" id="loginGoogle" style="background:#ea4335"><i class="fa fa-google" style="color:white"></i> acceder</div>
							</div>
							<div class="col">
								<div class="btn" id="loginFacebook" style="background:#3b5998"><i class="fa fa-facebook-square" style="color:white"></i> acceder</div>
							</div>
						</div>
						<br />
						<p >Completa el formulario y haz click en <strong>REGISTRATE</strong>.</p>	
					</div>
						<br />
						
					</div>
				</div>
				
			</div>
		

	`);

$("#login").click(function() {login()});
$("#createAccount").click(function() {createAccount()});
$("#loginGoogle").click(function() {loginGoogle()});
$("#loginFacebook").click(function() {loginFacebook()});

$("footer").html(`

	<div class=" whiteText">
		<div class="row">
			<div class="col">${templateDataProyect.title} 2018</div>
			<div class="col"> <a href="privacy-policy.html">Política de privacidad</a></div>
		</div>
	</div>

	`);
}

		printIndexTemplate();

//observador del estado Auth

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
    //redirecciónar al home si esta logueado.
    
    location.href = "home.html";
    

  } else {
    
  }
});

