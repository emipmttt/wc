function sendReqFriend(myUid,uidProfile) {
  $.ajax({
  data: {"myUid":myUid,"uidProfile":uidProfile},
  url:   'php/sendReqFriend.php',
  type:  'post',
  success:  function (response) {
  		if (response == 1) {
  			$("#friendsButton").attr({
  				onclick: '',
  				class: 'btn blue'
  			}).html("Solicitud Enviada");
  		}else {
  			console.log(response);
  		}
    }
  });
}

function acceptFriend(idNotification,uidSen,uidRes) {
  $.ajax({
  data: {"idNotification":idNotification,"uidSen":uidSen,"uidRes":uidRes},
  url:   'php/acceptFriend.php',
  type:  'post',
  success:  function (response) {
  		if (response == 1) {
  			$("#friendsButton").attr({
  				onclick: '',
  				class: 'btn amber'
  			}).html("Solicitud Aceptada");
  		}else {
  			console.log(response);
  		}
    }
  });
}

function deleteFriend(uid1,uid2) {
  $.ajax({
  data: {"uid1":uid1,"uid2":uid2},
  url:   'php/deleteFriend.php',
  type:  'post',
  success:  function (response) {
  		if (response == 1) {
			location.href = "";
  		}else {
  			console.log(response);
  		}
    }
  });
}

function toggleBF(uidProfile,type) {
  $.ajax({
    url: 'php/toggleBF.php',
    type: 'post',
    data: {"uidProfile":uidProfile,"type":type,"uid":uData.uid},
    success: function(response) {
      if (response == 1) {
         location.href='';
      } else { 

        console.log(response);  

      }
    }
  });
  
}