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
  <div class='container'>
    <div  id="posts" class="row">

    </div>
  </div>`);

$(document).ready(function() {

  categor = location.href.split("/");
  categor1 = categor.pop ();

  $.ajax({
    url: 'php/cont/getCont.php',
    type: 'post',
    data: {"category": categor1 },
    success: function(response) {
      $("#posts").html(response);
      }

  });  
});
