function showNotifications() {

    var datos = {"uid":uData.uid};
    $.ajax({
    data: datos,
    url:   'php/showNotifications.php',
    type:  'post',
    success:  function (response) {

      $("#notificationsModalCont").html(response);

    }
  });
}

function showAllNotifications() {

    var datos = {"uid":uData.uid};
    $.ajax({
    data: datos,
    url:   'php/showAllNotifications.php',
    type:  'post',
    success:  function (response) {

      $("#notificationsModalCont").html(response);

    }
  });
}

function viewed(ide) {

    var datos = {"ide":ide};
    $.ajax({
    data: datos,
    url:   'php/notificationViewed.php',
    type:  'post',
    success:  function (response) {
    	console.log(response);
    }
  });
}