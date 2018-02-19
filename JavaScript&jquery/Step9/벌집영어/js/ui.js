$(document).ready(function () {
    //GNB
    $("a.one_dep").hover(function () {
        $("a.one_dep").removeClass('on');
        $(this).addClass('on');
        $(this).parent().find("ol.two_depth").stop().slideDown('normal').show();
        $(this).parent().hover(function () {
        }, function () {
            $(this).parent().find("ol.two_depth").stop().slideUp('fast');
        });
    });
    $("ul.one_depth").hover(function () {
        $("a.one_dep").removeClass('on');
    });
    //Quick
    var quick_menu = $(".quick");
    var quick_top = 190;
    quick_menu.css('top', $(window).height());
    $(document).ready(function () {
        quick_menu.animate({ "top": $(document).scrollTop() + quick_top + "px" }, 100);
        $(window).scroll(function () {
            quick_menu.stop();
            quick_menu.animate({ "top": $(document).scrollTop() + quick_top + "px" }, 500);
        });
    });
    $('.quick a.top_btn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
        return false;
    });
	//Main Banner
    $('.main_banner').flexslider({
        animation: "",
        pauseOnAction: false,
        pauseOnHover: true,
        animationSpeed: 1000,
        slideshowSpeed: 5000,
    });
});