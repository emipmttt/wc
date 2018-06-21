function showTextPost() {
  $("#contPosts").html(`

    <div id="newPost">
        <div class="input-field">
          <i class="material-icons prefix">short_text</i> 
          <textarea id="inputText" class="materialize-textarea" maxlength="2000"></textarea>
          <label for="inputText">Comparte con el mundo</label>
        </div>
    <div id="sendPost" class="btn blue">Publicar</div>
    <p id="notice" style="display:none"></p>
    </div>
  `).slideDown('slow/400/fast');

  $("#sendPost").click(function() { 
    sendPostText();
  });

  M.textareaAutoResize($('#inputText'));
}

function sendPostText() {
    var inputText = $("#inputText").val();
    var datos = {"uid":uData.uid,"text":inputText,"datePost":datePost,"type":"text"};
      $.ajax({
      data: datos,
      url:   'php/newPost.php',
      type:  'post',
      beforeSend: function () {
           $("#notice").html(`
  <div class="progress">
      <div class="indeterminate"></div>
  </div>`);
      },
      success:  function (response) {
       if (response == 1) {
         $("#notice").css('display', 'none').html(`<div class="card-panel green white-text">Gracias por compartir</div>`).slideDown('slow');
        setTimeout(function() {location.href="home.html"},1000)
        }else if (response == 2){
          $("#notice").css('display','none').html(`<div class="card-panel yellow black-text">Primero debes llenar todos los campos.</div>`).slideDown('slow');
        }else{
          console.log(response);
        }
       }
      });
}

function showPhotoPost() {
  $("#contPosts").html(`
    <div id="newPost">

  <div class="progress">
      <div id="uploader" class="determinate" style="width:0%"></div>
  </div>
    <input style='display:none' type="file" value="upload" id="fileButton" accept="image/*"/>
        <div class="input-field">
          <i class="material-icons prefix">short_text</i>
          <textarea id="inputText" class="materialize-textarea" maxlength="2000"></textarea>
          <label for="inputText">Comparte con el mundo</label>
        </div>
    <label for='fileButton' class="btn pur"><i class='material-icons'>camera_alt</i></label>
    <div id="sendPost" class="btn blue">Publicar</div>
    <p id="notice" style="display:none"></p>
    </div>
  `).slideDown('slow/400/fast');

  var fileName;
  var downURL;
  var uploader = document.getElementById("uploader");
  document.getElementById("fileButton").addEventListener('change',function (e) {
    var file = e.target.files[0];
    fileName = idDate+uData.uid+file.name;
    var storageRef = firebase.storage().ref('photoPost/'+fileName);
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

  $("#sendPost").click(function() { 
    sendPostPhoto(fileName,downURL);
  });

  M.textareaAutoResize($('#inputText'));
}

function sendPostPhoto(fileName,downURL) {
    var inputText = $("#inputText").val();
    var datos = {"uid":uData.uid,"text":inputText,"datePost":datePost,"type":"photo","fileName":fileName,"downURL":downURL};
      $.ajax({
      data: datos,
      url:   'php/newPost.php',
      type:  'post',
      beforeSend: function () {
        $("#notice").html(`
  <div class="progress">
      <div class="indeterminate"></div>
  </div>`);
      },
      success:  function (response) {
       if (response == 1) {
         $("#notice").css('display', 'none').html(`<div class="card-panel green white-text">Gracias por compartir</div>`).slideDown('slow');
        setTimeout(function() {location.href="home.html"},1000);
        }else if (response == 2){
          $("#notice").css('display','none').html(`<div class="card-panel yellow black-text">Primero debes llenar todos los campos.</div>`).slideDown('slow');
        }else{
          console.log(response);
        }
        console.log(response)
       }
      });
}


function showVideoPost() {
  $("#contPosts").html(`
    <div id="newPost">

  <div class="progress">
      <div id="uploader" class="determinate" style="width:0%"></div>
  </div>
    <input style='display:none' type="file" value="upload" id="fileButton" accept="video/*"/>
        <div class="input-field">
          <i class="material-icons prefix">short_text</i>
          <textarea id="inputText" class="materialize-textarea" maxlength="2000"></textarea>
          <label for="inputText">Comparte con el mundo</label>
        </div>
    <label for='fileButton' class="btn pur"><i class='material-icons'>videocam</i></label>
    <div id="sendPost" class="btn blue">Publicar</div>
    <p id="notice" style="display:none"></p>
    </div>
  `).slideDown('slow');

  var fileName;
  var downURL;
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

  $("#sendPost").click(function() { 
    sendPostVideo (fileName,downURL);
  });

  M.textareaAutoResize($('#inputText'));
}

function sendPostVideo(fileName,downURL) {
    var inputText = $("#inputText").val();
    var datos = {"uid":uData.uid,"text":inputText,"datePost":datePost,"type":"video","fileName":fileName,"downURL":downURL};
      $.ajax({
      data: datos,
      url:   'php/newPost.php',
      type:  'post',
      beforeSend: function () {
        $("#notice").html(`
  <div class="progress">
      <div class="indeterminate"></div>
  </div>`);
      },
      success:  function (response) {
       if (response == 1) {
         $("#notice").css('display', 'none').html(`<div class="card-panel green white-text">Gracias por compartir</div>`).slideDown('slow');
        setTimeout(function() {location.href="home.html"},1000);
        }else if (response == 2){
          $("#notice").css('display','none').html(`<div class="card-panel yellow black-text">Primero debes llenar todos los campos.</div>`).slideDown('slow');
        }else{
          console.log(response);
        }
        console.log(response)
       }
      });
}


function showArticlePost() {
  $("#contPosts").html(`

    <div id="newPost">

 <div class="progress">
      <div id="uploader" class="determinate" style="width:0%"></div>
  </div>

        <div class="input-field">
          <i class="material-icons prefix">title</i>
          <input id="titleArticle" type="text" class="validate" maxlength="500">
          <label for="titleArticle">Título</label>
        </div>
    <input style='display:none' type="file" value="upload" id="fileButton" accept="image/*"/>
        <div class="input-field">
          <i class="material-icons prefix">short_text</i>
          <textarea id="inputText" class="materialize-textarea" maxlength="10000"></textarea>
          <label for="inputText">¡Redacta un artículo increíble!</label>
        </div>
    <label for='fileButton' class="btn pur"><i class='material-icons'>camera_alt</i></label>

    <div id="sendPost" class="btn blue">Publicar</div>    
    <p id="notice" style="display:none"></p>
    </div>
  `).slideDown('slow');

   var fileName;
  var downURL;
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

  $("#sendPost").click(function() { 
    sendPostArticle(fileName,downURL);
  });

  M.textareaAutoResize($('#inputText'));
}

function sendPostArticle(fileName,downURL) {
    var inputText = $("#inputText").val();
    var titleArticle = $("#titleArticle").val();
    var datos = {"uid":uData.uid,"text":inputText,"titleArticle":titleArticle,"datePost":datePost,"type":"article","fileName":fileName,"downURL":downURL};
      $.ajax({
      data: datos,
      url:   'php/newPost.php',
      type:  'post',
      beforeSend: function () {
           $("#notice").html(`
  <div class="progress">
      <div class="indeterminate"></div>
  </div>`);
      },
      success:  function (response) {
       if (response == 1) {
         $("#notice").css('display', 'none').html(`<div class="card-panel green white-text">Gracias por compartir</div>`).slideDown('slow');
        setTimeout(function() {location.href="home.html"},1000)
        }else if (response == 2){
          $("#notice").css('display','none').html(`<div class="card-panel yellow black-text">Primero debes llenar todos los campos.</div>`).slideDown('slow');
        }else{
          console.log(response);
        }
       }
      });
}

// recomendar lugares

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
        })}


var grade;

function showPlacePost() {
  $("#scriptMaps").html("<script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBsYpSYWNipgP78b2QkKkUK7uco4y0_-TQ&libraries=places&callback=initMap'></script>");

  $("#contPosts").html(`

    <div id="newPost">
    <div class="progress">
      <div id="uploader" class="determinate" style="width:0%"></div>
    </div>
      <div>
      <p>Califica el sitio.</p>
        <a id='grade1' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade2' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade3' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade4' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade5' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
      </div>
        <div class="input-field">
          <i class="material-icons prefix">short_text</i> 
          <textarea id="inputText" class="materialize-textarea" maxlength="2000"></textarea>
          <label for="inputText">Comparte con el mundo</label>
        </div>
    <p id="notice" style="display:none"></p>
    </div>
  <input id="pac-input" type="text" class="white" placeholder="Busca un lugar" maxlength="500">
        <div id="map" style="height:40vh"></div>
    <input style='display:none' type="file" value="upload" id="fileButton" accept="image/*"/>

    <label for='fileButton' class="btn pur"><i class='material-icons'>camera_alt</i></label>

    <div id="sendPost" class="btn blue">Publicar</div>


  `).slideDown('slow/400/fast');

  var fileName;
  var downURL;
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

//grade

$("#grade1").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade3").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade4").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 1;
});

$("#grade2").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade4").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 2;
});

$("#grade3").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade4").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 3;
});

$("#grade4").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade4").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 4;
});

$("#grade5").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade4").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade5").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
grade = 5;
});


//

  $("#sendPost").click(function() { 
    sendPostPlace(downURL,fileName);
  });

  M.textareaAutoResize($('#inputText'));
}

function sendPostPlace(downURL,fileName) {
    var inputText = $("#inputText").val();
    var place = $("#pac-input").val();

    var datos = {"uid":uData.uid,"text":inputText,"datePost":datePost,"place":place,"type":"place","grade":grade,"fileName":fileName,"downURL":downURL};
      $.ajax({
      data: datos,
      url:   'php/newPost.php',
      type:  'post',
      beforeSend: function () {
           $("#notice").html(`
  <div class="progress">
      <div class="indeterminate"></div>
  </div>`);
      },
      success:  function (response) {
       if (response == 1) {
         $("#notice").css('display', 'none').html(`<div class="card-panel green white-text">Gracias por compartir</div>`).slideDown('slow');
        setTimeout(function() {location.href="home.html"},1000)
        }else if (response == 2){
          $("#notice").css('display','none').html(`<div class="card-panel yellow black-text">Primero debes llenar todos los campos.</div>`).slideDown('slow');
        }else{
          console.log(response);
        }
       }
      });
}

var grade;

function showTastePost() {
  $("#contPosts").html(`
    <div id="newPost">

  <div class="progress">
      <div id="uploader" class="determinate" style="width:0%"></div>
  </div>
  <div>
      <p>Califica el vino.</p>
        <a id='grade1' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade2' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade3' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade4' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
        <a id='grade5' href="#" class='grey-text text-lighten-1'><i class='material-icons'>grade</i></a>
      </div>
    <input style='display:none' type="file" value="upload" id="fileButton" accept="image/*"/>
        <div class="input-field">
          <i class="material-icons prefix">short_text</i>
          <textarea id="inputText" class="materialize-textarea" maxlength="2000"></textarea>
          <label for="inputText">Comparte con el mundo</label>
        </div>
    <label for='fileButton' class="btn pur"><i class='material-icons'>camera_alt</i></label>
    <div id="sendPost" class="btn blue">Publicar</div>
    <p id="notice" style="display:none"></p>
    </div>
  `).slideDown('slow/400/fast');

  var fileName;
  var downURL;
  var uploader = document.getElementById("uploader");
  document.getElementById("fileButton").addEventListener('change',function (e) {
    var file = e.target.files[0];
    fileName = idDate+uData.uid+file.name;
    var storageRef = firebase.storage().ref('photoPost/'+fileName);
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

//grade

$("#grade1").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade3").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade4").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 1;
});

$("#grade2").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade4").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 2;
});

$("#grade3").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade4").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 3;
});

$("#grade4").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade4").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade5").addClass('grey-text text-lighten-2').removeClass('deep-purple-text text-lighten-2');
grade = 4;
});

$("#grade5").click(function(event) {
$("#grade1").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade2").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade3").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade4").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
$("#grade5").addClass('deep-purple-text text-lighten-2').removeClass('grey-text text-lighten-2');
grade = 5;
});


//
  $("#sendPost").click(function() { 
    sendPostTaste(fileName,downURL);
  });

  M.textareaAutoResize($('#inputText'));
}

function sendPostTaste(fileName,downURL) {
    var inputText = $("#inputText").val();
    var datos = {"uid":uData.uid,"text":inputText,"datePost":datePost,"type":"taste","fileName":fileName,"downURL":downURL,"grade":grade};
      $.ajax({
      data: datos,
      url:   'php/newPost.php',
      type:  'post',
      beforeSend: function () {
        $("#notice").html(`
  <div class="progress">
      <div class="indeterminate"></div>
  </div>`);
      },
      success:  function (response) {
       if (response == 1) {
         $("#notice").css('display', 'none').html(`<div class="card-panel green white-text">Gracias por compartir</div>`).slideDown('slow');
        setTimeout(function() {location.href="home.html"},1000);
        }else if (response == 2){
          $("#notice").css('display','none').html(`<div class="card-panel yellow black-text">Primero debes llenar todos los campos.</div>`).slideDown('slow');
        }else{
          console.log(response);
        }
        console.log(response)
       }
      });
}


