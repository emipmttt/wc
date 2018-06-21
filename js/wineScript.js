
	var datee =  new Date();
	var idDateYear = datee.getFullYear();
	var idDateMonth = datee.getMonth();
	var idDateDay = datee.getDate();
	var idDateHour = datee.getHours();
	var idDateMinutes = datee.getMinutes();
	var idDateSeconds = datee.getSeconds();
	var idDateMillseconds = datee.getMilliseconds();

	var datePost = `${idDateDay} / ${idDateMonth+1} / ${idDateYear} - ${idDateHour}:${idDateMinutes}`;
	var idDate =parseInt(`${idDateYear}${idDateMonth}${idDateDay}${idDateHour}${idDateMinutes}${idDateSeconds}${idDateMillseconds}`);

	function getIdDate() {

	var datee =  new Date();
	var idDateYear = datee.getFullYear();
	var idDateMonth = datee.getMonth();
	var idDateDay = datee.getDate();
	var idDateHour = datee.getHours();
	var idDateMinutes = datee.getMinutes();
	var idDateSeconds = datee.getSeconds();
	var idDateMillseconds = datee.getMilliseconds();

	return parseInt(`${idDateYear}${idDateMonth}${idDateDay}${idDateHour}${idDateMinutes}${idDateSeconds}${idDateMillseconds}`);
	}

	function readCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}

	function getVar(variable) {
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0; i < vars.length; i++) {
	       var pair = vars[i].split("=");
	       if(pair[0] == variable) {
	           return pair[1];
	       }
	   }
	   return false;
	}

function autoScrollChat() {
	/*var height = 0;
	$('#messages div').each(function(i, value){
	    height += parseInt($(this).height());
	});

	height += '';

	$('#messages').animate({scrollTop: height});
*/
var messages=document.getElementById('messages');
messages.scrollTop = messages.scrollHeight;
}

