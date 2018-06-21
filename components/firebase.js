  var config = {
    apiKey: "AIzaSyC0iLJlX1asY40J-omNnEH3bUgrigXCPbk",
    authDomain: "wine-community.firebaseapp.com",
    databaseURL: "https://wine-community.firebaseio.com",
    projectId: "wine-community",
    storageBucket: "wine-community.appspot.com",
    messagingSenderId: "909626113684"
  };
  firebase.initializeApp(config);
var storageRef = firebase.storage().ref();