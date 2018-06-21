$(document).ready(function (){
	setTimeout(function () {	
		$("#chatCont").html(`
			<section class='chatCont'>	
				<div id="profileCont"></div>
				<div id="messages"></div>
				<div id="inputChat">
					<input placeholder='Mensaje' autocomplete='off' id='sendMessage' type="text" class='sM z-depth-3 white' /> 
  					<a id='sendButton' class="btn-floating btn-medium waves-effect waves-light purple"><i class="tiny material-icons" style='font-size:15px'>send</i></a>
				</div>
			</section>
		`);   
	},1000);
});

var timer;
var uidToSendMessage;

function setChat(uid) {

	$("#sendButton").css('display', 'inline-block');
	$("#chatCont").css('display', 'inline-block');


	$.ajax({
		data: {"uid":uid,"myUid":uData.uid},
		url:   'php/chat/setViewed.php',
		type:  'post',
		success: function (response) {
			if (response == 1) {

			} else {
			 	console.log(response);
			}
		}
	});

	uidToSendMessage = null;
	uidToSendMessage = uid;

	$("#sendMessage").css('display', 'inline-block');

	clearInterval(timer);
	timer = setInterval(function () {getMessagesF(uid)},3000);

	$.ajax({
		url: 'php/chat/getMessages.php',
		type: 'post',
		data: {'uid': uid,'myUid':uData.uid},
		success: function(response) {

		var obj = JSON.parse(response);

				$("#profileCont").html(`
					<div class="card  white-text purple lighten-2 m0" >
						<div style='display:inline-block' class='card-content'>
							<a href='profile.html?u=${obj.uid}'>
								<div style="background:url(${obj.photoURL}); background-size:100%; background-position:center; display:inline-block; border-radius:50px; width:50px; height:50px"></div>
							</a>
							<div style='display:inline-block'>
								${obj.displayName} <i onclick='closeChat()' class='material-icons' style='position:fixed;right:10px;z-index:100;cursor:pointer'>clear</i><br>
								<b> ${obj.country}</b>
							</div>
						</div>
					</div>	
				`);

				getMessagesF(uidToSendMessage);

				$("#sendMessage").keyup(function(e) { 
				var code = (e.keyCode ? e.keyCode : e.which); 
				if(code == 13){ 
					var message = $("#sendMessage");
					if ((message.val() == "")||(message.val() == " ")) {

					}else{
						sendMessageF(message.val(),uidToSendMessage);
						message.val("");
					}
				}else {

				}
			});

			$("#sendButton").click(function() {
				var message = $("#sendMessage");
					if ((message.val() == "")||(message.val() == " ")) {

					}else{
						sendMessageF(message.val(),uidToSendMessage);
						message.val("");
					}
			});


		}

	});
					setTimeout(autoScrollChat,1000);
}



function sendMessageF (message,uid) {
	$.ajax({
		url: 'php/chat/sendMessages.php',
		type: 'post',
		data: {"message":message,"myUid":uData.uid,"uidP":uid},
		success:function(response) {
			getMessagesF(uidToSendMessage);
			setTimeout(autoScrollChat,1000);	

		}
	});
}

function getMessagesF (uid) {
						$.ajax({
						url: 'php/chat/getM.php',
						type: 'post',
						data: {"myUid":uData.uid,"uidP":uid},
						success: function(response) {
							if (response == 0) {
								document.getElementById("messages").innerHTML ="";
							}else{
								document.getElementById("messages").innerHTML ="";

								$("#messages").html(response);
							
								$("."+uData.uid).addClass('purple message');
								$("."+uid).addClass('message black-text');

							}
						}
					});

}

function showChat () {
    var datos = {"uid":uData.uid};
    $.ajax({
	    data: datos,
	    url:   'php/chat/showChat.php',
	    type:  'post',
	    success:  function (response) {
	      $("#chatModalCont").html(response);
		  }
	  });
}


function verifyChat () {
		$.ajax({
		url: 'php/chat/verifyChat.php',
		type: 'post',
		data: {"uid":uData.uid},
		success: function(response) {
			if (response == 1) {
				$("#showChat").addClass('red lighten-4');
			} else {
				$("#showChat").addClass('white').removeClass('red');

			}
		}
	});
}

setInterval(verifyChat,2000);

function showMobileChat() {
	$(".chatCont").css('display', 'inline-block');
}

function closeChat() {
	$("#chatCont").css('display', 'none');
	clearInterval(timer);

}
/*
1|12
2|10
3|11*/