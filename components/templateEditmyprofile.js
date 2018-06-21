$("main").html(`
<div class='cont'>
    <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">person</i>Nombre de usuario</div>
      <div class="collapsible-body">

        <div class="input-field">
        <input id='displayName' type="text" class='validate' />
        <label for="displayName">Nombre de Usuario</label>
        </div>
        <div id='saveDisplayName' class="btn green">Guardar</div>

      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">photo</i>Foto del perfil</div>
      <div class="collapsible-body">
        <div class="progress">
            <div id="uploader" class="determinate" style="width:0%"></div>
        </div>
          <input type="file" value="upload" id="fileButton" accept="image/*"/>

        <div id='savePhoto' class="btn green">Guardar</div>          

      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">person</i>Sobre ti</div>
      <div class="collapsible-body">

        <div class="input-field">
        <input id='description' type="text" class='validate' value='${uData.description}' />
        <label for="description">Sobre ti</label>
        </div>
        <div id='saveDescription' class="btn green">Guardar</div>

      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">public</i>País</div>
      <div class="collapsible-body">

        <div class="input-field">
        <input id='country' type="text" class='validate' />
        <label for="country">País</label>
        </div>
        <div id='saveCountry' class="btn green">Guardar</div>

      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="fa fa-calendar" style='font-size:20px'></i>Fecha de nacimiento</div>
      <div class="collapsible-body">

        <div class="row">
          <div class="col s4">
            <div class="input-field">
              <i class="fa fa-calendar prefix"></i>
              <input id="day" type="text" class="validate" maxlength="2">
              <label for="day">Día DD</label>
            </div>
          </div>
          <div class="col s4">
            <div class="input-field">
              <input id="month" type="text" class="validate" maxlength="2">
              <label for="month">Mes MM</label>
            </div>
          </div>
          <div class="col s4">
            <div class="input-field">
              <input id="year" type="text" class="validate" maxlength="4">
              <label for="year">Año YYYY</label>
            </div>
          </div>
        </div>
        <div id='saveDate' class="btn green">Guardar</div>

      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="fa fa-trash" style='font-size:20px'></i>Eliminar mi cuenta</div>
      <div class="collapsible-body">

        <div class="row">
          <div class="col s12">
            <div class="input-field">
              <i class="material-icons prefix">person</i>
              <input id="myUserName" type="text" class="validate">
              <label for="day">Nombre de usuario</label>
            </div>
            <p>Para elíminar tu cuenta, escribe tu nombre de usuario y haz click en Eliminar mi cuenta</p>
            <p class='yellow'>Se eliminarán todos los rastros de que alguna vez exististe en Wine Community, piensalo con cuidado.</p>

          </div>
        </div>
        <div id='saveDate' class="btn red" onclick='deleteMyAccount()'>Eliminar mi cuenta</div>

      </div>
    </li>
  </ul>
</div>
    `);

$("#saveDisplayName").click(function() {
  var txt = $("#displayName").val();
  editMyProfileText("displayName",txt);
});

$("#saveDescription").click(function() {
  var txt = $("#description").val();
  editMyProfileText("description",txt);
});

$("#saveCountry").click(function() {
  var txt = $("#country").val();
  editMyProfileText("country",txt);
});

$("#saveDate").click(function() {
  var day = $("#day").val();
  editMyProfileText("day",day);
  var year = $("#year").val();
  editMyProfileText("year",year);
  var month = $("#month").val();
  editMyProfileText("month",month);
});

function editMyProfileText(type,txt) {
  $.ajax({
    url: 'php/editMyProfile.php',
    type: 'post',
    data: {"type":type,"txt":txt,"uid":uData.uid},
    success:  function (response) {

      if (response == 1) {
        location.href="profile.html?u="+uData.uid;
      } else if (response == 2) {
      } else {
        console.log(response);
      }

    }
  });
}

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

  $("#savePhoto").click(function() { 
    sendPhoto(fileName,downURL);
  });


function sendPhoto(fileName,downURL) {
    var inputText = $("#inputText").val();
    var datos = {"type":"photo","uid":uData.uid,"txt":downURL};
      $.ajax({
      data: datos,
      url:   'php/editMyProfile.php',
      type:  'post',

      success:  function (response) {
        if (response == 1) {
          location.href="profile.html?u="+uData.uid;
        } else {
          console.log(response);
        }
      }
      });
}