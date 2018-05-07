$("header").html(`
	<div class="navbar">
		<div class="container">
			<div class="logoNavbar">${templateDataProyect.title}</div>
			<div class="btnsNavbar">
				<div class="btnNavbar" id="home"><i class="fa fa-compass"></i></div>
				<div class="btnNavbar"><i class="fa fa-bell-o"></i></div>
				<div class="btnNavbar"><i class="fa fa-comments-o"></i></div>
				
				<div id="showMenu" class="btnNavbar visibleOnlyMobile"><i class="fa fa-bars"></i></div>
			</div>
		</div>
	</div>
<div class="menu" id="menu" align="right">
			<br />
				<div class="btnF" id="user"><i class="fa fa-user-o"></i> Mi perfil</div>
				<div class="btnF" id="signOut"><i class="fa fa-sign-out"></i> Cerrar Sesión</div>
			</div>

`);

$("#showMenu").click(function() {$("#menu").slideToggle("fast")})
$("#home").click(function() { location.href = "home.html"});
$("#user").click(function() { location.href = "user.html?uid="+user.uid});
$("#signOut").click(function() {closeSession()});

$("main").html(`

	<div class="rowHome" style="width:100%">
	
		<div class="colLeft" id="secLeft">
		</div>
		<div class="colCenter"  id="secCenter">
			<div class="loader" id="loader"></div>
		</div>
		<div class="colRight" id="secRight" >
			
		</div>

	</div>

`);
