var tempLog = `
 <div id="modalLogin" class="modal">
    <div class="modal-content" id="modalContent">
     
     <div class="col s12 l3">

     <div style="font-size:30px" align="center">Acceder </div>
    <div class="input-field">
      <i class="material-icons prefix">email</i>
      <input autofocus id="email" type="email" class="validate">
      <label for="email">Correo Electrónico</label>
    </div>
    <div class="input-field">
      <i class="material-icons prefix">lock_outline</i>
      <input id="password" type="password" class="validate">
      <label for="password">Contraseña</label>
    </div>
    <div>
      <a id="loginGoogle" class="waves-effect waves-light btn-small" style="background:#ea4335"><i class="fa fa-google"></i></a>
      <a id="loginFacebook" class="waves-effect waves-light btn-small" style="background:#3b5998"><i class="fa fa-facebook-f"></i></a>
      <a id="registepurple" class="waves-effect waves-light btn-small">Registrate</a>
      <a id="login" class="waves-effect waves-teal btn-flat">Entrar</a>

    </div>
    <br />
    <div id="notice"></div> 
    
    </div>

    </div>
  </div>
  `;

var tempReg = `
  <div style="font-size:30px" align="center">Registrate </div>
    <div class="input-field">
      <i class="material-icons prefix">email</i>
      <input autofocus id="email" type="email" class="validate">
      <label for="email">Nuevo Correo Electrónico</label>
    </div>
    <div class="input-field">
      <i class="material-icons prefix">lock_outline</i>
      <input id="password" type="password" class="validate">
      <label for="password">Nueva Contraseña</label>
    </div>
    <div>
      <div class='right-align'>
      </div>
    <br />
      <a id="loginGoogle" class="waves-effect waves-light btn-small" style="background:#ea4335"><i class="fa fa-google"></i></a>
      <a id="loginFacebook" class="waves-effect waves-light btn-small" style="background:#3b5998"><i class="fa fa-facebook-f"></i></a>
      <a id="register" class="waves-effect waves-light btn-small">Registrate</a>
  </div>
`;

if (uData == null) {
  $("header").html(`

<div class="navbar-fixed">

  <nav>
    <div class="nav-wrapper purple lighten-1">
      <a href="index.html" class="brand-logo hide-on-small-only " style="font-size:20px;"><img src="img/LOGO-WC-HOME-NEG.png" style="width:200px;margin-top:15px" /></a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

      <ul class="right hide-on-med-and-down">
        <li><a href="eventos">Eventos</a></li>
        <li><a href="cursodevino">Curso de vino</a></li>
        <li><a href="notasdecata">Notas de cata</a></li>
        <li><a href="noticias">Noticias</a></li>
        <li><a href="enoturismo">Enoturismo</a></li>
        <li><a class='show-on-small waves-effect waves-light white purple-text btn modal-trigger' href="#modalLogin">Acceder</a></li>
      </ul>
    </div>
  </nav>

</div>
  <ul class="sidenav" id="mobile-demo">
    <li><a href="eventos">Eventos</a></li>
    <li><a href="cursodevino">Curso de vino</a></li>
    <li><a href="notasdecata">Notas de cata</a></li>
    <li><a href="noticias">Noticias</a></li>
    <li><a href="enoturismo">Enoturismo</a></li>
  </ul>




  `);



$("main").html(`
<div class='center-align'>
  <br />
  <a class='hide-on-large-only waves-effect waves-light white-text purple  lighten-1 btn modal-trigger' href="#modalLogin" style='width:90%'>Acceder</a>
  <br />
</div>
<div class="row">
  <div class="col s12 l9">
    
      <div id="carrusel"></div>

  </div>
</div>
<br />

  <div class='center-align'>
    <h4>La red social perfecta para compartir lo que más te gusta.</h4>
    <h5>Comparte con todos, tu gusto por el vino.</h5>
  </div>

${tempLog}

  `); 
console.log("dede");

$("#registepurple").click(function(event) {
  $("#modalContent").html(tempReg);
});

var notice = $("#notice");
notice.css({display: 'none',padding:'10px'});

$("#register").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();
  if ((email == "") || (password == "")) {
    notice.html(`¡Completa el formulario y haz click en REGISTRATE!`).addClass('amber').slideDown('slow');
  }else {
    newProfile(email,password,notice);
  }
});

$("#login").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();
  if ((email == "") || (password == "")) {
    notice.html(`¡Completa el formulario y haz click Entrar!`).addClass('amber').slideDown('slow');
  }else {
    login(email,password,notice);
  }
});

$("#loginFacebook").click(loginFacebook);
$("#loginGoogle").click(loginGoogle);


    var datos = {};
    $.ajax({
    data: datos,
    url:   'php/getArticlesIndex.php',
    type:  'post',
    success:  function (response) {

      $("#carrusel").html(response);

    }
  });

} else {

  $("header").html(`

<div class="navbar-fixed">

  <nav>
    <div class="nav-wrapper white">
    <a href="index.html" class="brand-logo hide-on-small-only " style="font-size:20px;"><img src="img/LOGO-WC-HOME.png" style="width:200px;margin-top:15px" /></a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons purple-text">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="eventos" class='purple-text'>Eventos</a></li>
        <li><a href="cursodevino" class='purple-text'>Curso de vino</a></li>
        <li><a href="notasdecata" class='purple-text'>Notas de cata</a></li>
        <li><a href="noticias" class='purple-text'>Noticias</a></li>
        <li><a href="enoturismo" class='purple-text'>Enoturismo</a></li>
        <li><a class='show-on-small waves-effect waves-light white-text purple lighten-1 btn modal-trigger' href="home.html">${uData.displayName}</a></li>
      </ul>
    </div>
  </nav>

</div>
  <ul class="sidenav" id="mobile-demo">
    <li><a href="eventos">Eventos</a></li>
    <li><a href="cursodevino">Curso de vino</a></li>
    <li><a href="notasdecata">Notas de cata</a></li>
    <li><a href="noticias">Noticias</a></li>
    <li><a href="enoturismo">Enoturismo</a></li>
  </ul>
  `);

$("main").html(`

<div class="row">
  <div class="col s12 l9">
    
      <div id="carrusel"></div>

  </div>
</div>

  `); 


var notice = $("#notice");
notice.css({display: 'none',padding:'10px'});

$("#register").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();
  if ((email == "") || (password == "")) {
    notice.html(`¡Completa el formulario y haz click en REGISTRATE!`).addClass('amber').slideDown('slow');
  }else {
    newProfile(email,password,notice);
  }
});

$("#login").click(function() {
  var email = $("#email").val();
  var password = $("#password").val();
  if ((email == "") || (password == "")) {
    notice.html(`¡Completa el formulario y haz click Entrar!`).addClass('amber').slideDown('slow');
  }else {
    login(email,password,notice);
  }
});

$("#loginFacebook").click(loginFacebook);
$("#loginGoogle").click(loginGoogle);


    var datos = {};
    $.ajax({
    data: datos,
    url:   'php/getArticlesIndex.php',
    type:  'post',
    success:  function (response) {

      $("#carrusel").html(response);

    }
  });

console.log("perrfwwfo");

}