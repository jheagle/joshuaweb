$(document).ready(function () {
    var lastId, topMenu = $(".menu"), menuItems = topMenu.find("a"), scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });
    menuItems.click(function (e) {
        var href = $(this).attr("href"), offset = href === "#" ? 0 : $(href).offset().top + 1;
        $('html, body').stop().animate({
            scrollTop: offset
        }, 550);
        menuItems.parent().removeClass("current");
        $(this).parent().addClass("current");
        e.preventDefault();
    });

    $(window).scroll(function () {
        var fromTop = $(this).scrollTop() + 10, cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            if (location.hash !== '#' + id)
                window.location.hash = id;
            menuItems.parent().removeClass("current").end().filter("[href=#" + id + "]").parent().addClass("current");
        }
    });
});