$("header").html(`

<div class="navbar-fixed">

  <nav>
    <div class="nav-wrapper purple lighten-1">
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="../eventos">Eventos</a></li>
        <li><a href="../cursodevino">Curso de vino</a></li>
        <li><a href="../notasdecata">Notas de cata</a></li>
        <li><a href="../noticias">Noticias</a></li>
        <li><a href="../enoturismo">Enoturismo</a></li>
      </ul>
    </div>
  </nav>
</div>
  <ul class="sidenav" id="mobile-demo">
    <li><a href="../eventos">Eventos</a></li>
    <li><a href="../cursodevino">Curso de vino</a></li>
    <li><a href="../notasdecata">Notas de cata</a></li>
    <li><a href="../noticias">Noticias</a></li>
    <li><a href="../enoturismo">Enoturismo</a></li>
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
var data;
  $.ajax({
    url: '../php/cont/getArticle.php',
    type: 'post',
    data: {"category": categor1 },
    success: function(response) {
      console.log(response);
      data = JSON.parse(response);
      $("#posts").html(`

    <div class='col s12 '>
      <div class='card'>
        <div class='card-image'>
          <img src='${data.downURL}'>
          <span class='card-title'>${data.titleArticle}</span>
          <span> por <b>${data.displayName}</b></span>
        </div>
        <div class='card-content'>
        
      <textarea id='textarea1' disabled class='materialize-textarea black-text'>${data.text}</textarea>

        </div>

      </div>
    </div>

        `);

setTimeout(function() {  $('#textarea1').val(data.text);
  M.textareaAutoResize($('#textarea1'));},500)
      }

  });  

});

