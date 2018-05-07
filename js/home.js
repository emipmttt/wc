
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
                                      año: null,
                                      mes: null,
                                      dia: null
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


$("#secCenter").html(`

  <br />
  <div class="card" align="center">
  Crea una publicación
  <br />
    <div name="buttonsPosts" style="display:inline-block">
      <div onclick="showTextPost()" class="btnPostLumi">
        <i class="fa fa-comment"></i>
      </div>
      <div onclick="showPhotoPost()" class="btnPostLumi">
        <i class="fa fa-image"></i>
      </div>
      <div onclick="showVideoPost()" class="btnPostLumi">
        <i class="fa fa-film"></i>
      </div>
      <div onclick="showArticlePost()" class="btnPostLumi">
        <i class="fa fa-newspaper-o"></i>
      </div>
      <div onclick="showPlacePost()" class="btnPostLumi">
        <i class="fa fa-map-marker"></i>
      </div>
    </div>
    <div id="contPosts" style="display:none" align="center"></div>
  </div> 
  <div id="showPost" class="mt10"></div>
  `);

function showTextPost () {

  var postTemplate = `

  <textarea id="inputText" class="inputText" style="font-size:15px" rows="2" placeholder="Comparte con el mundo."></textarea>
  <div id="sendPost" class="btn capri">Publicar</div>
  <p id="notice" style="display:none;padding:10px"></p>
  <br />
  `;

  $("#contPosts").html(postTemplate).slideDown("slow");

  $("#sendPost").click(function () {

    var text = $("#inputText").val();

    db.collection("post").doc(uid+idDate).set({
        idDate,
        uid,
        text,
        datePost,
        type:"text"
    })
    .then(function() {
        $("#notice").text("¡Gracias por compartir!").slideDown("fast");
        setTimeout(function() {location.href=""},500);
    })
    .catch(function(error) {
        $("#notice").text("Ha ocurrido un error: ", error).slideDown("fast");
    });
  });
}

function deleteTextPost(iden) {
  db.collection("post").doc(iden).delete().then(function() {
      var ideP = `#${iden}`;
      $(ideP).slideUp("slow");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

function showPhotoPost () {


  var postTemplate = `
    <progress max="100" value="0" id="uploader"></progress>
    <br />
    <input type="file" value="upload" id="fileButton" accept="image/*"/>
    <textarea id="inputText" class="inputText" style="font-size:15px" rows="2" placeholder="Hablanos sobre esta fotografía."></textarea>
    <div id="sendPost" class="btn capri">Publicar</div>
    <p id="notice" style="display:none;padding:10px"></p>
    <br />
  `;
  
  $("#contPosts").html(postTemplate).slideDown("slow");
  var fileName;
  var uploader = document.getElementById("uploader");
  document.getElementById("fileButton").addEventListener('change',function (e) {
    //get File
    var file = e.target.files[0];
    fileName = idDate+uid+file.name; //file Name
    //ref file
    var storageRef = firebase.storage().ref('photoPost/'+fileName);
    //upload file
    var task = storageRef.put(file);
    //update bar
    task.on('state_changed', 
    function progress(snapshot) {
      var procentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = procentage;
    },
    function error(err) {

    },
    function complete() {
      
    }
    );
  });

  $("#sendPost").click(function() {
    var text = $("#inputText").val();
      db.collection("post").doc(uid+idDate).set({
        idDate,
        uid,
        text,
        datePost,
        fileName,
        type:"photo"
      })
      .then(function() {
        $("#notice").text("¡Gracias por compartir!").slideDown("fast");
        setTimeout(function() {location.href=""},500);
      })
      .catch(function(error) {
        $("#notice").text("Ha ocurrido un error: ", error).slideDown("fast");
      });
  }); 
}

function deletePhotoPost(iden,file) {

  firebase.storage().ref(file).delete().then(function () {
    db.collection("post").doc(iden).delete().then(function() {
        var ideP = `#${iden}`;
        $(ideP).slideUp("slow");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }).catch(function(error) {

  })

}

function showVideoPost () {


  var postTemplate = `
    <progress max="100" value="0" id="uploader"></progress>
    <br />
    <input type="file" value="upload" id="fileButton" accept="video/*"/>
    <textarea id="inputText" class="inputText" style="font-size:15px" rows="2" placeholder="Hablanos sobre este video."></textarea>
    <div id="sendPost" class="btn capri">Publicar</div>
    <p id="notice" style="display:none;padding:10px"></p>
    <br />
  `;
  
  $("#contPosts").html(postTemplate).slideDown("slow");
  var fileName;
  var uploader = document.getElementById("uploader");
  document.getElementById("fileButton").addEventListener('change',function (e) {
    //get File
    var file = e.target.files[0];
    fileName = idDate+uid+file.name; //file Name
    //ref file
    var storageRef = firebase.storage().ref('videoPost/'+fileName);
    //upload file
    var task = storageRef.put(file);
    //update bar
    task.on('state_changed', 
    function progress(snapshot) {
      var procentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = procentage;
    },
    function error(err) {

    },
    function complete() {
      
    }
    );
  });

  $("#sendPost").click(function() {
    var text = $("#inputText").val();
      db.collection("post").doc(uid+idDate).set({
        idDate,
        uid,
        text,
        datePost,
        fileName,
        type:"video"
      })
      .then(function() {
        $("#notice").text("¡Gracias por compartir!").slideDown("fast");
        setTimeout(function() {location.href=""},500);
      })
      .catch(function(error) {
        $("#notice").text("Ha ocurrido un error: ", error).slideDown("fast");
      });
  }); 
}

function deleteVideoPost(iden,file) {

  firebase.storage().ref(file).delete().then(function () {
    db.collection("post").doc(iden).delete().then(function() {
        var ideP = `#${iden}`;
        $(ideP).slideUp("slow");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }).catch(function(error) {

  })

}
///////////////////////////////////////
      function initMap() {
         var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13
        });
        var input = /** @type {!HTMLInputElement} */(
            document.getElementById('pac-input'));

        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '');
          infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);
      }

function showPlacePost () {


  var postTemplate = `
<input id="pac-input" class="inputTextMap" type="text"
        placeholder="Busca un lugar">
        <div id="map" style="height:70vh"></div>

    <textarea id="inputText" class="inputText" style="font-size:15px" rows="2" placeholder="Hablanos sobre este sitio."></textarea>
    <div id="sendPost" class="btn capri">Publicar</div>
    <p id="notice" style="display:none;padding:10px"></p>
    <br />
  `;


  $("#contPosts").html(postTemplate).slideDown("slow");
  $("#scriptMaps").html("<script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBsYpSYWNipgP78b2QkKkUK7uco4y0_-TQ&libraries=places&callback=initMap'></script>");
  $

  $("#sendPost").click(function() {
    var text = $("#inputText").val();
    var place = $("#pac-input").val();
      db.collection("post").doc(uid+idDate).set({
        idDate,
        uid,
        text,
        place,
        datePost,
        type:"place"
      })
      .then(function() {
        $("#notice").text("¡Gracias por compartir!").slideDown("fast");
        setTimeout(function() {location.href=""},500);
      })
      .catch(function(error) {
        $("#notice").text("Ha ocurrido un error: ", error).slideDown("fast");
      });
  });   
  
}

function deletePlacePost(iden) {

   db.collection("post").doc(iden).delete().then(function() {
      var ideP = `#${iden}`;
      $(ideP).slideUp("slow");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

}
////////////////////

function showArticlePost () {


  var postTemplate = `
    <progress max="100" value="0" id="uploader"></progress>
    <input id="urlArticleImg" type="text" class="inputText" placeholder="Url de imagen (Opcional)"/>
    <input id="articleHead" type="text" class="inputText" placeholder="Encabezado"/>
    <textarea id="inputText" class="inputText" style="font-size:15px" rows="2" placeholder="Redacta un artículo increíble."></textarea>
    <div id="sendPost" class="btn capri">Publicar</div> 
    <p id="notice" style="display:none;padding:10px"></p>
    <br />
  `;
  
  $("#contPosts").html(postTemplate).slideDown("slow");
    $("#sendPost").click(function() {
    var urlArticleImg = $("#urlArticleImg").val();
    var text = $("#inputText").val();
    var articleHead = $("#articleHead").val();
      db.collection("post").doc(uid+idDate).set({
        idDate,
        uid,
        articleHead,
        text,
        datePost,
        urlArticleImg,
        type:"article"
      })
      .then(function() {
        $("#notice").text("¡Gracias por compartir!").slideDown("fast");
        setTimeout(function() {location.href=""},500);
      })
      .catch(function(error) {
        $("#notice").text("Ha ocurrido un error: ", error).slideDown("fast");
      });
  }); 
}

function deleteArticlePost(iden) {

    db.collection("post").doc(iden).delete().then(function() {
        var ideP = `#${iden}`;
        $(ideP).slideUp("slow");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}
    
    var first = db.collection("post").limit(5);
    var lastVisible;

function showPost () {


  $(document).ready(function () {

  $("#showMorePost").click(function() {setTimeout(showPost,1000)});
  
      return first.get().then(function(documentSnapshots) {

            lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            console.log("last", lastVisible.data().type );
            first = db.collection("post").startAfter(lastVisible).limit(5);



          documentSnapshots.forEach(function(doc) {

              var ideDoc = doc.id;
              var dataPost = doc.data(); 
              var datePost = dataPost.datePost;

              if (dataPost.type == "text") {
                var deletePostTextButton ;
                if (dataPost.uid == uid) {
                    deletePostTextButton = `
                          <i class="fa fa-trash-o btnPost"  ondblclick="deleteTextPost('${doc.id}')" style="float:right;margin-top:23px"></i>
                  `;
                }else{
                  deletePostTextButton = "";
                }
                showPostTemplate = `
                  <div id="${ideDoc}" class="card mt10">
                    <div class="container">
                      <div id="profileData${doc.id}">
                        ${deletePostTextButton}
                      </div>
                      <textarea id="textAreaPost${doc.id}" class="textPost" style="height:auto;rows:auto" disabled>${dataPost.text}</textarea>
                      <div align="right" style="padding:10px;">
                        <i class="fa fa-heart btnPost btnImg"></i>
                      </div>
                    </div>                    
                  </div>
                `;
                document.getElementById("showPost").innerHTML += showPostTemplate;
                dataJustify(dataPost.uid);
              } else if (dataPost.type == "place") {
                var deletePostTextButton;
                if (dataPost.uid == uid) {
                    deletePostTextButton = `
                    <i class="fa fa-trash-o btnPost"  ondblclick="deletePlacePost('${doc.id}')" style="float:right;margin-top:23px"></i>
                  `;
                }else{
                  deletePostTextButton = "";
                }
                showPostTemplate = `
                  <div id="${ideDoc}" class="card mt10">
                    <div class="container">
                      <div id="profileData${doc.id}">
                        ${deletePostTextButton}
                      </div>
                      <p style="font-size:17px;">Recomiendo <strong>${dataPost.place}</strong></p>
                      <textarea id="textAreaPost${doc.id}" class="textPost" style="height:auto;rows:auto" disabled>${dataPost.text}</textarea>
                      <a href="https://www.google.com/maps/search/${dataPost.place}" target="_blank">Ver en Google Maps</a>
                      <div align="right" style="padding:10px;">
                        <i class="fa fa-heart btnPost btnImg"></i>
                      </div>
                    </div>                    
                  </div>
                `;
                document.getElementById("showPost").innerHTML += showPostTemplate;
                dataJustify(dataPost.uid);

              } else if (dataPost.type == "photo") {
                var deletePostPhotoButton;
                if (dataPost.uid == uid) {
                    deletePostPhotoButton = `
                              <i class="  fa fa-trash-o btnPost" ondblclick="deletePhotoPost('${doc.id}','photoPost/${dataPost.fileName}')"></i>
                  `;
                }else{
                  deletePostPhotoButton = "";
                }
                  showPostTemplate = `
                    <div id="${ideDoc}" class="card mt10">
                      <div id="photoComplete${doc.id}" onclick="closeImg('${doc.id}')" class="photoComplete">
                        <img id="imgComplete${doc.id}" src=""/>
                      </div>
                      <div class="imgPost" id="img${doc.id}">
                        <div class="divImgOptions" onclick="apleaImg('${doc.id}')"></div>
                        <div class="imageOptions">
                          <div class="container">
                            <div style="float:left" id="profileData${doc.id}"></div>
                            <div style="float:right; margin-top:23px">
                              <a id="linkExternalImg${doc.id}" href="" class="btnImageOptions" target="_blank"><i class="fa fa-external-link"></i></a>
                              ${deletePostPhotoButton}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="container">
                        <textarea id="textAreaPost${doc.id}" class="textPost" style="height:auto;rows:auto" disabled>${dataPost.text}</textarea>
                        <div align="right" style="padding:10px;">
                          <i class="fa fa-heart btnPost btnImg"></i>
                        </div>
                      </div>                    
                    </div>
                  `;

                document.getElementById("showPost").innerHTML += showPostTemplate;  
                dataJustify(dataPost.uid);
                  firebase.storage().ref('photoPost/'+dataPost.fileName).getDownloadURL().then(function(url) { //obteniendo url de la imagen
                    $(`#img${doc.id}`).css({
                      "background" : `url('${url}')`,
                      "background-size":"cover",
                      "background-position":"center",
                      "width":"100%",
                      "height":"65vh",
                      "background-repeat":"no-repeat",
                      "max-height": "65vh"
                    });
                    $(`#imgComplete${doc.id}`).attr("src",url);
                    $(`#linkExternalImg${doc.id}`).attr("href",url);
                  }).catch(function(error) {
                  
                  });

                } else if (dataPost.type == "video") {
                  var deletePostVideoButton;
                if (dataPost.uid == uid) {
                    deletePostVideoButton = `
                        <i class="fa fa-trash-o btnPost" style="float:right" ondblclick="deleteVideoPost('${doc.id}','videoPost/${dataPost.fileName}')"></i>
                  `;
                }else{
                  deletePostVideoButton = "";
                }
                  showPostTemplate = `
                  <div id="${ideDoc}" class="card mt10">
                    <video id="video${doc.id}" src="" style="width:100%" controls></video>
                    <div class="container">
                      <div id="profileData${doc.id}">
                        ${deletePostVideoButton}
                      </div>
                      <textarea id="textAreaPost${doc.id}" class="textPost" style="height:auto;rows:auto" disabled>${dataPost.text}</textarea>
                      <div align="right" style="padding:10px;">
                        <i class="fa fa-heart btnPost btnImg"></i>
                      </div>
                    </div>                    
                  </div>
                  `;

                document.getElementById("showPost").innerHTML += showPostTemplate;  
                dataJustify(dataPost.uid);
                  firebase.storage().ref('videoPost/'+dataPost.fileName).getDownloadURL().then(function(url) { //obteniendo url de la imagen
                    $(`#video${doc.id}`).attr("src",url);
                  }).catch(function(error) {
                  
                  });

                } else if (dataPost.type == "article") {

                  var deletePostArticleButton;
                if (dataPost.uid == uid) {
                    deletePostArticleButton = `
                    <i class="  fa fa-trash-o btnPost" ondblclick="deleteArticlePost('${doc.id}')"></i>
                  `;
                }else{
                  deletePostArticleButton = "";
                }
                  showPostTemplate = `
                  <div id="${ideDoc}" class="card mt10">
                      <div id="photoComplete${doc.id}" onclick="closeImg('${doc.id}')" class="photoComplete">
                        <img src="${dataPost.urlArticleImg}"/>
                      </div>
                      <div class="imgPost" id="img${doc.id}">
                        <div class="divImgOptions" onclick="apleaImg('${doc.id}')"></div>
                        <div class="imageOptions">
                          <div class="container">
                            <div style="float:left" id="profileData${doc.id}"></div>
                            <div style="float:right; margin-top:23px">
                              <a id="linkExternalImg${doc.id}" href="" class="btnImageOptions" target="_blank"><i class="fa fa-external-link"></i></a>
                              ${deletePostArticleButton}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="container">
                        <p style="font-size:25px;font-weight:bold">${dataPost.articleHead}</p>
                        <textarea id="textAreaPost${doc.id}" class="textPost" style="height:auto;rows:auto" disabled >${dataPost.text}</textarea>
                        <div align="right" style="padding:10px;">
                          <i class="fa fa-heart btnPost btnImg"></i>
                        </div>
                      </div>                    
                    </div>
                `;
                document.getElementById("showPost").innerHTML += showPostTemplate;
                dataJustify(dataPost.uid);
                $(`#img${doc.id}`).css({
                  "background" : `url('${dataPost.urlArticleImg}')`,
                  "background-size":"cover",
                  "background-position":"center",
                  "width":"100%",
                  "height":"65vh",
                  "background-repeat":"no-repeat",
                  "max-height": "45vh"
                });
                $(`#linkExternalImg${doc.id}`).attr("href",dataPost.urlArticleImg);


                }

            function dataJustify(ide) {



                  var txtareaid = "#textAreaPost"+doc.id; // scroll auto height
                  var txtareaidcont = $(txtareaid); 
                  txtareaidcont.height('auto');
                  txtareaidcont.height(txtareaidcont.prop('scrollHeight'));

                  var docRef = db.collection("profiles").doc(ide);

                  docRef.get().then(function(doc) {
                      if (doc.exists) {

                        var profileTemplate = `
                          <a href="user.html?uid=${doc.id}" class="lumiText">
                            <table>
                              <tr>
                                <td width="50px"><img src="${doc.data().photoURL}" class="imgProfile mt10" style="width:40px !important; height:40px  !important; backgraund-size:contain;" /></td>
                                <td>${doc.data().displayName} <br /> <span style="color:grey;font-size:12px">${datePost}</span></td>
                              </tr>
                            </table>
                          </a>
                        `;

                          $(`#profileData${ideDoc}`).prepend(profileTemplate);
                      } else {
                          console.log("No such document!");
                      }
                  }).catch(function(error) {
                      console.log("Error getting document:", error);
                  });
            }
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  });


}


                function apleaImg(ide){$(`#photoComplete${ide}`).css("display","inline-block")}
                function closeImg(ide){$(`#photoComplete${ide}`).css("display","none")}

showPost();


