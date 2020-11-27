const { log , dir } = console;
window.addEventListener("load",()=>{
    $(".sub").hide();
    $("#main > li").hover(
        e => {
            $(e.currentTarget).children("ul").stop().slideDown();
        },
        e => {
            $(e.currentTarget).children("ul").stop().slideUp();
        }
    )

    $(".slider > img").css({ "left" : "100%" }).eq(0).css({left : 0});

    let idx = 0;
    setInterval(() => {
        let nextIdx = (idx+1) % 3;
        $(".slider > img").eq(nextIdx).css({"left":"100%"}).animate({ "left" : 0 } , 800);
        $(".slider  > img").eq(idx).css({"left":0}).animate({ "left" : "-100%" } , 800);
        idx = nextIdx;
    }, 3000);
});