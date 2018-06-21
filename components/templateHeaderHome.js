var panel;

if (uData.type == 1) {
  panel = "<li><a href='panel.html'><i class='material-icons'>poll</i>Panel de Control</a></li>"
}else{
  panel = "";
}
var postBF; 
if (page == "home") {
  postBF = '<li><a href="filterpost.html"><i class="material-icons">grade</i>Filtrar Publicaciones</a></li>';
}else{
  postBF ="";
}

$("header").html(`

<div class="navbar-fixed" style="z-index:1000">
  <nav>
    <div class="nav-wrapper white">
      <div class="container">
        <a href="index.html" class="brand-logo hide-on-small-only " style="font-size:20px;"><img src="img/LOGO-WC-HOME.png" style="width:200px;margin-top:15px" /></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger purple-text text-lighten-2"><i class="material-icons">menu</i></a>
        <ul class="right">
          <li><a href="home.html" class="purple-text text-lighten-2"><i class="material-icons">explore</i></a></li>
          <li><a id="showChat" href="#chatModal" class="purple-text text-lighten-2 modal-trigger"><i class="material-icons">chat_bubble_outline</i></a></li>
          <li><a id="showNotifications" href='#notificationsModal' class="purple-text text-lighten-2 modal-trigger"><i class="material-icons">notifications_none</i></a></li>
        </ul>
      </div>
    </div>
  </nav>
</div>

<ul class="sidenav sidenav-fixed" id="mobile-demo">
  <br /><br /><br />  
  <li class="purple lighten-2"><a id="displayNameSn" href='profile.html?u=${uData.uid}' class="white-text"></a></li>
  ${postBF}
  <li><a href="friends.html"><i class="material-icons">people_outline</i>Amigos</a></li>
  ${panel}
  <li><a href="#" id="closeSession"><i class="fa fa-sign-out" style="font-size:20px" ></i> Cerrar Sesión</a></li>
  <div class="divider"></div>
   <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input id="search" type="search" autocomplete='off' placeholder="Busca personas">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" onclick="$('#search').val('');$('#resSearch').html('')">close</i>
        </div>
      </form>
    </div>
    <div id="resSearch" align="left" class="left left-align" style='width:100%'>
    </div>
</ul>


  <div id="modalLikes" class="modal bottom-sheet">
    <b>Esta publicación le gusta a:</b>
    <div id="listProfilesLikes"></div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
    </div>
  </div>
  <div id="postModal" class="modal modal-fixed-footer">
    <div class="modal-content" id="postModalCont">
    </div>
    <div class="modal-footer" style='position:fixed'>
      <a href="#!" class="modal-close waves-effect waves-red btn-flat">cerrar</a>
    </div>
  </div>
  <div id="notificationsModal" class="modal modal-fixed-footer">
    <div class="modal-content" id="notificationsModalCont">
    </div>
    <div class="modal-footer" style='position:fixed'>
      <a href="#!" id='showAllNotifications' class="waves-effect waves-green btn-flat">ver todo</a>
      <a href="#!" class="modal-close waves-effect waves-red btn-flat">cerrar</a>
    </div>
  </div>  
  <div id="chatModal" class="modal modal-fixed-footer">
    <div class="modal-content" id="chatModalCont">
    </div>
    <div class="modal-footer" style='position:fixed'>
      <a href="#!" class="modal-close waves-effect waves-red btn-flat">cerrar</a>
    </div>
  </div>  


  <div id='chatCont'></div>
  `);

$("#closeSession").click(closeSession);

$("#search").keyup(function(event) {
  var search = $("#search").val();
  $.ajax({
    data:  {"search":search,"myUid":uData.uid},
    url:   'php/searchProfile.php',
    type:  'post',
    success:  function (response) {
      $("#resSearch").html(response);
    }
  }); 
});

$("#showNotifications").click(function () {showNotifications()});
$("#showAllNotifications").click(function () {showAllNotifications()});
$("#showChat").click(function () {showChat()});

    $.ajax({
    data:  {"uid":uData.uid},
    url:   'php/verifyNotifications.php',
    type:  'post',
    success:  function (response) {
      if (response == 1) {
        $("#showNotifications").addClass('red').addClass('lighten-4');
      } else if (response == 2) {
      } else {
        console.log(response);
      }
    }
  }); 

