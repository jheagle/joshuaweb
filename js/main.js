$(document).ready(function () {
//    var $cnTower = $('#cn-tower');
//    var $foreBuildings = $('#fore-buildings');
//    var $midBuildings = $('#mid-buildings');
//    var $boat = $('#boat');
//    var $bushes = $('#bushes');
    var lastId, lastHref = '#', topMenu = $(".menu"), menuItems = topMenu.find("a"), scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });
    menuItems.click(function (e) {
        e.preventDefault();
        var index = $(this).parent().index() - 1;
        var mainHeight = $('#intro').outerHeight();
        var href = $(this).attr('href');
        var offset = 0;
        offset = mainHeight * index;
        $('html, body').stop().animate({
            scrollTop: offset
        }, 550);
    });

    var lastOpacity = 0;

    $('html,body').scroll(function () {
        var mainHeight = $('#intro').outerHeight();
        var fromTop = $(this).scrollTop() + 10, cur = scrollItems.map(function () {
            var index = $(this).index() - 2;
            var offset = mainHeight * index;
            if (offset < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
//        if (id === 'intro' || id === 'profile') {
//            var opacity = 0;
//            var bushesPos = 33, boatPos = 40, foreBuildPos = 20, midBuildPos = 13, cnPos = 7;
//            if (fromTop < mainHeight) {
//                opacity = fromTop / mainHeight;
//            }
//            if (fromTop >= mainHeight && fromTop <= mainHeight) {
//                opacity = 1;
//            }
//            if (fromTop > mainHeight) {
//                opacity = 1 - ((fromTop - mainHeight) / mainHeight);
//            }
//            if (opacity !== lastOpacity) {
//                lastOpacity = opacity;
//                cnPos *= opacity;
//                foreBuildPos *= opacity;
//                midBuildPos *= opacity;
//                boatPos *= opacity;
//                bushesPos *= opacity;
//
//                $('#profile').find('.content').css('opacity', opacity);
//                $cnTower.css('left', '-' + cnPos + '%');
//                $foreBuildings.css('left', '-' + foreBuildPos + '%');
//                $midBuildings.css('left', '-' + midBuildPos + '%');
//                $boat.css('left', '-' + boatPos + '%');
//                $bushes.css('left', '-' + bushesPos + '%');
//            }
//        }
        if (lastId !== id) {
            lastId = id;
            menuItems.parent().removeClass("current").end().filter("[href=#" + id + "]").parent().addClass("current");
        }
    });
});