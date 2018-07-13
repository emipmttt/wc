
		function initWineEmoji (emojiInputName,emojiButtonName,emojiBoxName,emojis,emojiCloseCont) {		
			var emojiButton = document.getElementById(emojiButtonName);
			var emojiBox = document.getElementById(emojiBoxName);
			var emojiInput = document.getElementById(emojiInputName);
			emojiButton.addEventListener("click",function() {
				emojiBox.style.display="inline-block";

				emojiBox.innerHTML = "";

				emojiBox.innerHTML += `<div onclick=emojiClose('${emojiBoxName}') align="right" style="margin-right:20px">${emojiCloseCont}</div>` ;

				$.each(emojis, function(key, value){
					emojiBox.innerHTML += "<img alt='"+key+"' src='"+ emojis[key][1] + "' class='emoji' onclick=addEmoji('"+emojis[key][0]+"','"+emojiInputName+"')>";
				});


			},false);

			function setEmojis() {
				//set emojis
					
					$.each(emojis, function(key, value){
						var emojisHere = document.getElementById("emojisHere").innerHTML;
						emojisHereStr = String(emojisHere);
						var str1 = String(emojis[key][0]);
						var re = new RegExp(str1, "g");
						var emojisNow = emojisHere.replace(re, `<img src="${emojis[key][1]}" style="width:20px">`);
						document.getElementById("emojisHere").innerHTML = emojisNow;
					});
			}

			setEmojis();

		}

				


		function addEmoji(emoji,emojiInputName) {
			var emojiInput = document.getElementById(emojiInputName);
			emojiInput.value += emoji;
			emojiInput.focus();
		}

		function emojiClose(emojiBoxName) {
			document.getElementById(emojiBoxName).style.display="none";
		}




/*

    var emojises = {
      smile : [":smile:","img/emojis/smile.png"],
      sad : [":sad:","img/emojis/sad.png"],
      cry : [":cry:","img/emojis/cry.png"]
    }
    initWineEmoji("input","emojiButton","emojiBox",emojises,"X");



*/