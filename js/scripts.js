include('js/jquery.easing.1.3.js');
include('js/jquery.color.js');
include('js/mathUtils.js');
include('js/superfish.js');
include('js/switcher.js');
include('js/jquery.mousewheel.js');
include('js/sprites.js');
include('js/hoverSprite.js');
include('js/spin.js');
include('js/googleMap.js');
include('js/forms.js');
include('js/bgStretch.js');
include('js/audioPlayer.js');

include('js/jquery.fancybox-1.3.4.pack.js');
include('js/jcarousellite_1.0.1.min.js');
//----Include-Function----
function include(url){ 
  document.write('<script src="'+ url + '" type="text/javascript"></script>'); 
}
//--------global-------------
var isSplash = true, isAnim = false, isFirst = true, spinner, mapSpinner;
var id = [];
var MSIE = ($.browser.msie) && ($.browser.version <= 8)
//------DocReady-------------
$(document).ready(function(){ 
    if(location.hash.length == 0){
        location.hash="!/"+$('#content > ul > li:first-child').attr('id');
    }
///////////////////////////////////////////////////////////////////
loaderInit();
function loaderInit(){
        var opts = {
              lines: 11,
              length: 10, 
              width: 5, 
              radius: 20, 
              rotate: 0, 
              color: '#fff', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target = $(".page_spinner > span");
        spinner = new Spinner(opts).spin();
        target.append(spinner.el) 
        ///////////////////////////////////////    
            var opts2 = {
              lines: 8,
              length: 0, 
              width: 8, 
              radius: 12, 
              rotate: 10, 
              color: '#000', 
              speed: 1.3, 
              trail: 60, 
              shadow: false,
              hwaccel: false, 
              className: 'spinner', 
              zIndex: 2e9, 
              top: 'auto', 
              left: 'auto' 
        };
        var target2 = $(".google_map > span");
        mapSpinner = new Spinner(opts2).spin();
        target2.append(mapSpinner.el)  
     
} 
///////////////////////////////////////////////////////////////////

     $('ul#menu').superfish({
          delay:       500,
          animation:   {height:'show'},
          speed:       300,
          autoArrows:  false,
         dropShadows: false,
         	onInit: function(){
  				$("#menu > li > a").each(function(index){
  					var conText = $(this).find('.mText').text();
                    $(this).append("<div class='_area'></div><div class='_overPl'></div><div class='mText_over'>"+conText+"</div>");   
  				})
  	 		}
        });
    
});
  
 //------WinLoad-------------  
$(window).load(function(){  
$('.page_spinner').fadeOut();
spinner.stop();
$('body').css({overflow:'auto', 'min-height':'800px'})
$('.menu > ul >li').eq(0).css({'display':'none'});

$('.close_btn').hoverSprite({onLoadWebSite:false})
$('.btnHolder1 > a').hoverSprite({onLoadWebSite:false})
    
    
//////////////////////////////////////////////////////

$("#audioPlayer").audioPlayer();

  $('#bgStretch').bgStretch({
        align:'leftTop',
        navs:$('.navGall').navs()
        })
         
 $("#jcarousel_1").jCarouselLite({
            btnNext: ".btnHolder1 > .nextBtn",
            btnPrev: ".btnHolder1 > .prevBtn",
            speed: 800,
            visible: 3,
            mouseWheel:true
        }); 
                
$('.pic').fancybox({'titlePosition': 'inside', 'overlayColor':'#000'}); 
$('.zoomSp').fadeTo(500, 0)
$('.zoomSp').hover(function(){ $(this).stop().fadeTo(500, 0.7)}, function(){$(this).stop().fadeTo(500, 0)})        
  
  
 $('.splash_list > li > a').hover(
    function(){
        $("._icon", this).stop(true).animate({top:'150px'}, 400, 'easeOutCubic');
        $("._sText", this).stop(true).animate({top:'40px'}, 400, 'easeOutCubic');
    },
    function(){
         $("._icon", this).stop(true).animate({top:'0px'}, 400, 'easeOutCubic');
        $("._sText", this).stop(true).animate({top:'-70px'}, 400, 'easeOutCubic');
    }
 ) 
         
         
    
    initMenu();
    function initMenu(){
        $('.extra_menu >span').on('mouseenter',showMenu);
     
        $('.menuHolder')
        .on('mouseleave', hideMenu)
        .on('mouseenter', showMenu)
        .find('.menu > #menu >li a').click(function (){
            setTimeout(function (){ showMenu()},500)
        })
    }
    
    function showMenu(){    
        for (var i = 0;i<id.length;i++){
            clearTimeout(id[i]);
        }
        $('.extra_menu').stop(true).animate({'top':'-80px'},500,'easeInOutCubic')
        $('.menuHolder').stop(true).delay(500).animate({'top':'-15px'},500,'easeInOutCubic');
        
    }
    function hideMenu(){    
        id.push(setTimeout(function (){
            animation = true;
            $('.menuHolder').stop(true).animate({'top':'-500px'},500,'easeInOutCubic')
            $('.extra_menu').stop(true).delay(500).animate({'top':'-18px'},500,'easeInOutCubic');
        },600))

    }
    
    
    
    


///////////////////////////////////////////////
    var navItems = $('.menu > ul >li');

   
	var content=$('#content'),
		nav=$('.menu');

    	$('#content').tabs({
		preFu:function(_){
			_.li.css({left:"-1700px",'display':'none'});
			
		}
		,actFu:function(_){			
			if(_.curr){
				_.curr.css({left:'-1700px', 'display':'block'}).stop().delay(100).animate({left:"0px"}, 1000, 'easeOutCubic');
			
                cont_resize(_.n);
                if ((_.n == 0) && ((_.pren>0) || (_.pren==undefined))){splashMode();}
                if (((_.pren == 0) || (_.pren == undefined)) && (_.n>0) ){contentMode(); }
            }
			if(_.prev){
			     _.prev.stop().animate({left:'1700px'}, 600,'easeInCubic',function(){_.prev.css({'display':'none'});});
	
             }
		}
	})
    
var _delay;
    function splashMode(){
        isSplash = true;


    }
    
    function contentMode(){  
        isSplash = false;
       
    }
    
    function cont_resize(_page){
        var li_W = $('#content > ul > li').eq(_page).find('.containerContent').innerHeight();
    }		
    
    
	nav.navs({
			useHash:true,
             hoverIn:function(li){
                        $(".mText", li).stop(true).animate({top:'40px'}, 400, 'easeOutCubic');
                        $(".mText_over", li).stop(true).animate({top:'0px'}, 400, 'easeOutCubic');
                        $("._overPl", li).stop(true).animate({top:'0px'}, 400, 'easeInOutCubic');
             },
                hoverOut:function(li){
                    if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                        $(".mText", li).stop(true).animate({top:'0px'}, 400, 'easeInOutCubic');
                        $(".mText_over", li).stop(true).animate({top:'-40px'}, 400, 'easeOutCubic');
                        $("._overPl", li).stop(true).animate({top:'40px'}, 400, 'easeInOutCubic');
                    } 
                } 
		}).navs(function(n){			
			$('#content').tabs(n);
		})
        
//////////////////////////////////////////
   	var h_cont;
	function centrRepos() {
         h_cont = $('.center').height();
        // $('body').animate({'min-height':h_cont+'px'},400)
		var wh=$('body').height();
			m_top = ~~(wh-h_cont)/2;
			h_new = wh;
		$('.center').stop().animate({'margin-top':m_top},600,'easeOutCubic');
	}
	centrRepos();
    ///////////Window resize///////
	$(window).resize(function(){
        centrRepos();
        }
    );

    } //window function
) //window load
