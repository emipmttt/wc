
function verifyUser(uid,email,photoURL) {
  $.ajax({
    data:  {"uid":uid},
    url:   'php/verifyUser.php',
    type:  'post',
    beforeSend: function () {
      $("#resultado").html("Procesando, espere por favor...");
    },
    success:  function (response) {
      if (response == 1) {
      } else {
        location.href="set.html";
      }
    }
  });
}

function templateAddUser(uid,email,photoURL) {
 $("main").html(`

  <div class="card">
    <div class="card-content">
      <span class="card-title">Completa tu perfil</span>
      <p>Es importante que tu perfil este completo, así tus amigos podrán encontrarte más facilmente.</p>
      <div class="input-field">
        <i class="material-icons prefix">person</i>
        <input id="displayName" type="text" class="validate" maxlength="200">
        <label for="displayName">Nombre</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">person</i>
        <input id="description" type="text" class="validate" maxlength="2000" value="wine 4 ever">
        <label for="description">Sobre ti</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">public</i>
        <input id="country" type="text" class="validate"  maxlength="50">
        <label for="country">País</label>
      </div>
      <i class="fa fa-venus-mars" style="font-size:27px"></i> Genero:
        <label>
          <input id="m" name="gender" type="radio" />
          <span>Masculino</span>
        </label>
        <label>
          <input id="f" name="gender" type="radio" />
          <span>Femenino</span>
        </label>
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
    </div>
    <div class="card-action">
      <button id="saveProfile" class=" btn blue">Guardar Perfil</button> 
      <div id="notice"></div>
    </div>
  </div>
  `);

    var gender;
    $("#m").click(function() {gender = "Masculino"});
    $("#f").click(function() {gender = "Femenino"});

$("#saveProfile").click(function() {
    var displayName = $("#displayName").val();
    var description = $("#description").val();
    var country = $("#country").val();
    var day = $("#day").val();
    var month = $("#month").val();
    var year = $("#year").val();

    $.ajax({
        data:  {"uid":uid,"email":email,"photoURL":photoURL,"displayName":displayName,"description":description,"country":country,"gender":gender,"day":day,"month":month,"year":year},
        url:   'php/createProfile.php',
        type:  'post',
        beforeSend: function () {
          $("#notice").html(`
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
          `);
        },
        success:  function (response) {
          console.log(response);
          if (response == 1) {
            //location.href="index.html";
          }
        }
      });
    });
}

var uData;

function getProfile(uid) {
  $.ajax({
    data:  {"uid":uid},
    url:   'php/getProfile.php',
    type:  'post',
    success:  function (response) {
      a = response;
      b = JSON.parse(response);
      c = JSON.stringify(b);
      localStorage.uData = c;
    }
  });
}

uData = JSON.parse(localStorage.uData);


function setSidenavData(uData) {
  $("#displayNameSn").html(`<div class='valign-wrapper'><div style='background: url(${uData.photoURL}); width:30px; height:30px; display:inline-block; border-radius:30px;background-size: 100%; margin: 0 25px 0 0;'></div> ${uData.displayName}</div>`);
}

function deleteMyAccount() {
var myUserName = $("#myUserName").val();
 $.ajax({
   url: 'php/deleteMyAccount.php',
   type: 'post',
   data: {"displayName": uData.displayName,"myUserName":myUserName,"uid":uData.uid},
   success : function (response) {
      if (response == 1) {
        closeSession();
      } else {
        console.log(response);
      }
   }
 });
 
}