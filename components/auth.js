firebase.auth().useDeviceLanguage();

function newProfile(email,password,notice) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function() {
		notice.html("Bienvenido a Wine Community").addClass('green').slideDown('slow');
		location.href="set.html";
	})
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		notice.html(errorMessage);
	});
}

function login(email,password,notice) {
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function() {
		notice.html("Bienvenido a Wine Community").addClass('green').slideDown('slow');
		location.href="set.html";
	})
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		notice.html(errorMessage);
	});
}

function loginGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	var token = result.credential.accessToken;
	var user = result.user;
	location.href="set.html";
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
}

function loginFacebook() {
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
		location.href="set.html"
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
}


firebase.auth().getRedirectResult().then(function(result) {
  	if (result.credential) {
  		var token = result.credential.accessToken;
  	}
  	var user = result.user;
}).catch(function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	var email = error.email;
	var credential = error.credential;
});

function closeSession() {
	firebase.auth().signOut().then(function() {
   		localStorage.uData = "";
   		location.href("index.html");
	}).catch(function(error) {
	});
}


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(function() {
	return firebase.auth().signInWithEmailAndPassword(email, password);
})
	.catch(function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
});

function listenerAuth() {
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;

	    
	    getProfile(uid);
		setSidenavData(uData);
		if (page == "panel") {
	    	getProfile(uid);
		}else

	    if (page == "set") {
	    	verifyUserSet(uid,email,photoURL);
	    	getProfile(uid);
			setSidenavData(uData);

	    } else

	    if (page == "home") {
	    	verifyUser(uid,email,photoURL);
			showPost(0);
			getProfile(uid);
			setSidenavData(uData);
	    } else

	   	if (page == "profile") {
	    	verifyUser(uid,email,photoURL);
			showPostProfile(getVar("u"),0);
			showProfileData(getVar("u"));
			getProfile(uid);
			setSidenavData(uData);
	    } else

	    if (page == "post") {
	    	verifyUser(uid,email,photoURL);
			showPostModal(getVar("p"));	
			setSidenavData(uData);
	    } else

		if (page == "index") {
			
		}else{

		}
	  	

	  	} else {
	  	if (page == "index") {} else{location.href="index.html"}
	  }
	});
}