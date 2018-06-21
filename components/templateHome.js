
$("main").html(`
  <div class="cont" id="main">
    <div>
      <div align="center">
        <div name="buttonsPosts" style="display:inline-block">
          <div onclick="showTextPost()" class="btnPostLumi">
            <i class="fa fa-comment"></i>
          </div>
          <div onclick="showPhotoPost()" class="btnPostLumi">
            <i class="fa fa-image"></i>
          </div>
          <div onclick="showVideoPost()" class="btnPostLumi">
            <i class="fa fa-film"></i>
          </div>
          <div onclick="showArticlePost()" class="btnPostLumi">
            <i class="fa fa-newspaper-o"></i>
          </div>
          <div onclick="showPlacePost()" class="btnPostLumi">
            <i class="fa fa-cutlery"></i>
          </div>
          <div onclick="showTastePost()" class="btnPostLumi">
            <i class="fa fa-glass"></i>
          </div>
        </div>
        <div id="contPosts" style="display:none" align="center"></div>
      </div> 
      <div id="showPost" align="center"></div>
      <div id="showMorePost" align="center"></div>
      <div onclick='showMorePost()' style="width:100%" class='btn purple lighten-2 waves-effect waves-light'>Mostrar más</div>
      <br />
      <br />
    </div>
  </div>

`);

