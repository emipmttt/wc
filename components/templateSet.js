
$("header").html(`

<div class="navbar-fixed" style="z-index:1000">
  <nav>
    <div class="nav-wrapper white">
      <div class="container">
        <a href="home.html" class="brand-logo hide-on-small-only " style="font-size:20px;"><img src="img/LOGO-WC-HOME.png" style="width:200px;margin-top:15px" /></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger red-text lighten-text-1"><i class="material-icons">menu</i></a>
      
      </div>
    </div>
  </nav>
</div>

<ul class="sidenav sidenav-fixed" id="mobile-demo">
<br /><br /><br />  
  <li><a href="#" id="closeSession"><i class="fa fa-sign-out" style="font-size:20px" ></i> Cerrar Sesión</a></li>
  <div class="divider"></div>
   <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input id="search" type="search" placeholder="Busca personas">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" onclick="$('#search').val('');$('#resSearch').html('')">close</i>
        </div>
      </form>
    </div>
    <div id="resSearch" align="left" class="left left-align">
    </div>
</ul>
  `);

$("#closeSession").click(closeSession);

$("#search").keyup(function(event) {
  var search = $("#search").val();
  $.ajax({
    data:  {"search":search},
    url:   'php/searchProfile.php',
    type:  'post',
    success:  function (response) {
      $("#resSearch").html(response)
    }
  }); 
});

