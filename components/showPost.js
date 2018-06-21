function showPost (r) {
  $.ajax({
  data: {"uid":uData.uid,"r":r},
  url:   'php/showPost.php',
  type:  'post',
  beforeSend: function () {
    $("#showPost").html(`
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
    $("#showPost").html(response);
      //M.textareaAutoResize($('.articleText'));
    }
  });
}

var shm = 0;

function showMorePost () {
      $.ajax({
      data: {"uid":uData.uid,"r":r},
      url:   'php/showPost.php',
      type:  'post',
      success:  function (response) {
        shm++;
        $("#showMorePost").attr('id', `before${shm}`);
        $("#before"+shm).after('<div id="showMorePost"></div>')
        $("#showMorePost").html(response);
          //M.textareaAutoResize($('.articleText'));

        }
      });
}


function showPostProfile (uidProfile,r) {
  $.ajax({
  data: {"uid":uData.uid,"r":r,"uidProfile":uidProfile},
  url:   'php/showPostProfile.php',
  type:  'post',
  beforeSend: function () {
    $("#showPost").html(`
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
    $("#showPost").html(response);
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
    }
  });
}

var shm = 0;

function showMorePostProfile (uidProfile) {
      $.ajax({
      data: {"uid":uData.uid,"r":r,"uidProfile":uidProfile},
      url:   'php/showPostProfile.php',
      type:  'post',
      success:  function (response) {
        shm++;
        $("#showMorePost").attr('id', `before${shm}`);
        $("#before"+shm).after('<div id="showMorePost"></div>')
        $("#showMorePost").html(response);
          $(document).ready(function(){
            $('.materialboxed').materialbox();
          });

        }
      });
}

function likeThis(id,uid) {
  var datos = {"uid":uid,"id":id};
    $.ajax({
    data: datos,
    url:   'php/likeThis.php',
    type:  'post',
    success:  function (response) {
      if (response == 1) {
        $("#like"+id).attr('class', 'red-text fa fa-heart');
        var likesId = $("#likesPost"+id);
        likesId.html( parseInt(likesId.html()) + 1 );
      }else if (response == 2) {
        $("#like"+id).attr('class', 'blue-text fa fa-heart-o');
        var likesId = $("#likesPost"+id);
        likesId.html( parseInt(likesId.html()) - 1 );

      }else{
        console.log(response);
      }

    }
  });
}

function showLikes(id) {
    var datos = {"id":id};
    $.ajax({
    data: datos,
    url:   'php/showLikes.php',
    type:  'post',
    success:  function (response) {

      $("#listProfilesLikes").html(response);

    }
  });
}

function showPostModal(id) {

    var datos = {"id":id,"uid":uData.uid,"page":page};
    $.ajax({
    data: datos,
    url:   'php/showPostModal.php',
    type:  'post',
    success:  function (response) {

      $("#postModalCont").html(response);
      M.textareaAutoResize($('.articleText'));

    }
  });
}

function sendNewComment(id) {
    var text = $("#addComent").val();
    var datos = {"id":id,"uid":uData.uid,"text":text};
    $.ajax({
    data: datos,
    url:   'php/sendNewComment.php',
    type:  'post',
    success:  function (response) {

      if (response == 1) {
        $("addComent").val("");
        showPostModal(id);
      }else{
        console.log(response);
      }

    }
  });
}

