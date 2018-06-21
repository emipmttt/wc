
$("main").html(`
  <div class="" id="main">
    <div class="cont">
      <div id="profileData"></div>
        <div id='showPost' align='center'></div>
        <div id='showMorePost' align='center'></div>
        <div onclick='showMorePost()' style='width:100%' class='btn purple lighten-2 waves-effect waves-light'>Mostrar más</div>

    </div>
  </div>

`);

function showProfileData (uidProfile) {
  $.ajax({
  data: {"uidProfile":uidProfile,"uid":uData.uid},
  url:   'php/showProfileData.php',
  type:  'post',
  beforeSend: function () {
    $("#profileData").html(`
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>`);
  },
  success:  function (response) {
    $("#profileData").html(response);
    $(document).ready(function(){
      $('.materialboxed').materialbox();
      $('ul.tabs').tabs();
      $('.dropdown-trigger').dropdown();
      $('.tooltipped').tooltip();
    });
    }
  });
}

