window.onload = function(){
    $(".sub").hide();

    $("#main > li").hover(
        function(){
            $(this).children("ul").stop().slideDown();
        },
        function(){
            $(this).children("ul").stop().slideUp();
        }
    );

    $(".slider > img").css({ "left" : "100%" });
    $(".slider > img").eq(0).css({ "left" : 0 });

    $(".tabContent > div").eq(0).fadeIn();
    $('#tabMenu > li').on("click", e =>{
       $("#tabMenu > li.on").removeClass("on");
       $(e.currentTarget).addClass("on");
       $(".tabContent > div").hide().eq($(e.currentTarget).index()).fadeIn();
    });

    let idx = 0;
    setInterval(function(){
        //오류 나서 변경했음
        let next = (idx + 1) % 3;
        $(".slider > img").eq(next).css({"left":"100%"}).animate({"left":0}, 800);
        $(".slider > img").eq(idx).animate({"left":"-100%"}, 800);
        idx = next;
    }, 2000);
}