$(document).ready(function(){
	$.fn.audioPlayer = function(){
		var object = $(this),
			currentAudio = 0,
			allAudio = $("ul>li>a", object),
			myAudio,
			currentHref,
			pauseState = false,
			format = ".wav",
			MSIE8 = ($.browser.msie) && ($.browser.version <= 8);
			MSIE = ($.browser.msie);
			
			if(!MSIE8){
				init()
			}else{
				object.css({display:"none"})
			}
			function init(){
				if(MSIE){
					format = ".mp3"
				}
				myAudio = new Audio()
				myAudio.addEventListener("timeupdate",timeUpdate);
				
				$("#nextSound",object).click(nextAudio);
				$("#playSound",object).click(playAudio);
				$("#stopSound",object).click(stopAudio);
				$("#tracerLine",object).click(changeTime);
				$("#volumeInd",object).click(changeVolume);
                

                $("#playSound",object).find("img").eq(0).css({display:'none'});
                
				changeAudio();
				
    			object.unselectable = "on"; 
       			object.css({'-moz-user-select': 'none', '-khtml-user-select': 'none', '-webkit-user-select': 'none', '-o-user-select': 'none', 'user-select': 'none'});
		          
                  setTimeout(
                        function(){
                            $("#playSound",object).trigger('click');
                        }, 300
                  )
                
        	};
			
			function changeAudio(){
				myAudio.pause();
				currentHref = allAudio.eq(currentAudio).attr("href").substring(allAudio.eq(currentAudio).attr("href").lastIndexOf('.'), allAudio.eq(currentAudio).attr("href").lenght)+format;
				myAudio.setAttribute("src", currentHref);
				myAudio.setAttribute("preload", "auto");
				if(!pauseState){
					myAudio.play();
				}
                var num_txt = '0'+(currentAudio+1);
                $("#track_num > span",object).html(num_txt)
			}
			function changeVolume(e){
				var changeVolumePercent = (e.pageX-$(this).offset().left)/($(this).width())*100;
				myAudio.volume=1*changeVolumePercent/100;
                
                var vol_state = e.pageX-$(this).offset().left;
                if(vol_state < 8){vol_state = 8}
                
				$("#volume",object).stop(true, true).animate({width:vol_state}, 500, "easeOutCubic");
			}
			function changeTime (e){
				var changePercent = (e.pageX-$(this).offset().left)/($(this).width())*100;
				myAudio.currentTime=myAudio.duration*changePercent/100;
				
			}
			function timeUpdate (){
				$("#timeLine",object).stop(true).animate({width:this.currentTime/this.duration*100}, 500, "easeOutExpo");
				if(this.currentTime>=this.duration){
					nextAudio();
				}
			}
			function playAudio(){
				if(!pauseState){
					pauseState = true;
					myAudio.pause();
					$(this).find("img").eq(1).css({display:'none'});
					$(this).find("img").eq(0).css({display:'block'});
				}else{
					pauseState = false;
					myAudio.play();
					$(this).find("img").eq(1).css({display:'block'});
					$(this).find("img").eq(0).css({display:'none'});
				}
				return false;
			}
			function stopAudio(){
				pauseState = true;
				myAudio.pause();
				myAudio.currentTime=0;
				$("#playSound",object).find("img").eq(1).stop(true, true).animate({opacity:0}, 300, "easeInOutCubic");
				return false;
			}
			function nextAudio(){
				currentAudio++
				if(currentAudio>allAudio.length-1){
					currentAudio=0;
				}
				changeAudio();
				return false;
			}
			

			
	}
})