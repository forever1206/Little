
$(document).ready(function() {
	var  index= 0,siz= 0;

    var time=500,//切换时间
    ntime=500//nav变换时间；
	var flag=true,
	    flag1=true;
	var le=$('#content li').length,
        hi=$(window).height();
    var nav = navigator,
        ua = nav.userAgent,
        platform = nav.platform,
        isInIOS;
    var OLi=$("#content li"),
        Ofoo=$("#footer");
        OLi.height(hi);
        Ofoo.height(Math.round(hi/3)+"px");
        $("#content").height(hi*(le-1)+Ofoo.height()+"px");

    isInIOS = (/iphone/i.test(ua) || /ipad/i.test(ua)) && (/iphone/i.test(platform) || /ipad/i.test(platform));

    //初始化
    $('html,body').stop().animate({scrollTop:0},function  () {
        flag1=true;
    })

    if(!isInIOS){
        //鼠标滚动事件
        var scrollFunc=function(e){
            e=e || window.event;
            var delta= e.wheelDelta || -e.detail;//IE\chrome\safari浏览器wheelDelta的值为120（+120为向下滚动），FF为detail的值为3（-3为向下滚动）
                if (delta<0&&flag) {
                    topl=index>=5?-(hi*5+$("#footer").height())+"px":-hi*(index+1)+"px";
                    $('#content').stop().animate({top:parseInt(topl)},time,function() {
                        flag=true;
                        if(index<5){
                            index++;
                        }
                    })
                    if(index<6){
                        $("#con li.red").removeClass("red");
                        $("#con li").eq(index+1).addClass("red");
                    }
                }else{
                    if (flag) {
                        flag=false;
                        alert(index);
                        topl=index==5?-hi*5+"px":-hi*(index)+"px";
                        $('#content').stop().animate({top:parseInt(topl)},time,function() {
                            flag=true;
                            if(index>0){
                                index--;
                            }
                        })
                        $("#con li.red").removeClass("red");
                        $("#con li").eq(index).addClass("red");
                    }
            }
            return false;
        }
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',scrollFunc,false);
        }//W3C
        window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari

        //键盘按下事件
        $('html,body').keydown(function  (event) {
            if(event.keyCode==40&&flag){
                flag=false;
                siz=$(window).scrollTop()>hi*(le-1)?hi*(le-1):hi+$(window).scrollTop();

                $('html,body').stop().animate({scrollTop:siz},time,function  () {
                    flag=true;
                })
            }else if(event.keyCode==38&&flag) {
                if (flag) {
                    flag=false;
                    siz=$(window).scrollTop()<hi*2?0:$(window).scrollTop()-hi;
                    $('html,body').stop().animate({scrollTop:siz},time,function  () {
                        flag=true;
                    })
                }
            }
            return false;
        })

        //窗口大小改变事件
        $(window).resize(function  () {
            hi=$(window).height();
            OLi.height(hi);
            Ofoo.height(Math.round(hi/3)+"px");
            $("#content").height(hi*(le-1)+Ofoo.height()+"px");
            $('#content').css("top",-hi*index+'px');
        })

        //滚动导航事件
        $("#con li a").each(function(index){
            $(this).mouseover(function(){
                siz=hi*(index);
                $("#con li.red").removeClass("red");
                $("#con li").eq(index).addClass("red");

                $('html,body').stop().animate({scrollTop:siz},time,function(){
                    flag=true;
                })
            }).click(function(){
                siz=hi*(index);
                $('html,body').stop().animate({scrollTop:siz},time,function(){
                    flag=true;
                })
            })
        })

        //跳到顶部事件
        $(window).scroll(function  () {
            if ($(window).scrollTop()>0&&flag1) {
                flag1=false;
                $('#back').show().hover(function  () {
                    $(this).css({background:'none'})
                },function  () {
                    $(this).css({background:'#ccc'})
                }).stop().animate({borderRadius:'50%',opacity:1},1000).click(function  () {
                        $('html,body').stop().animate({scrollTop:0},1000,function  () {
                            flag1=true;
                        })
                    });
            }else {
                if ($(window).scrollTop()==0) {
                    $('#back').stop().animate({opacity:0},500,function  () {
                        flag1=true;
                        $('#back').css({borderRadius:0}).hide();
                    })
                }
            }
        })
    }else{
        $("#con").hide();
        //触屏滑动事件
        var touchstart={},
            touchend={};
        document.addEventListener("touchstart",function(e){
            var touch = e.touches[0];
            touchstart.x = touch.clientX;
            touchstart.y = touch.clientY;
        },false);
        document.addEventListener("touchmove",function(e){
            e.preventDefault();
        },false);
        document.addEventListener("touchend",function(e){
            var touch= e.changedTouches[0];
                touchend.x = touch.clientX;
                touchend.y = touch.clientY;
            var moveList = touchend.y-touchstart.y;

            if(moveList<0){
                topl=index>=5?-(hi*5+$("#footer").height())+"px":-hi*(index+1)+"px";
                $('#content').stop().animate({top:parseInt(topl)},time,function() {
                    flag=true;
                    if(index<5){
                        index++;
                    }
                })
            }else{
                if (flag) {
                    flag=false;
                    topl=index==5?-hi*5+"px":-hi*(index)+"px";
                    $('#content').stop().animate({top:parseInt(topl)},time,function() {
                        flag=true;
                        if(index>0){
                            index--;
                        }
                    })
                }
            }
        },false)
        //窗口大小改变事件
            $(window).resize(function  () {
                hi=$(window).height();
                OLi.height(hi);
                Ofoo.height(Math.round(hi/3)+"px");
                $("#content").height(hi*(le-1)+Ofoo.height()+"px");
                $('#content').css("top",-hi*index+'px');
            })
            window.onorientationchange=function  () {
                hi=$(window).height();
                OLi.height(hi);
                Ofoo.height(Math.round(hi/3)+"px");
                $("#content").height(hi*(le-1)+Ofoo.height()+"px");
                $('#content').css("top",-hi*index+'px');
            }
    }

})
