(function($) {
  var lastId, topMenu = $(".menu"),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function() {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });
  menuItems.click(function(e) {
    var href = $(this).attr("href"),
      offset = href === "#" ? 0 : $(href).offset().top + 1;
    $('html, body').stop().animate({
      scrollTop: offset
    }, 550);
    menuItems.parent().removeClass("current");
    $(this).parent().addClass("current");
    e.preventDefault();
  });

  $(window).scroll(function() {
    var fromTop = $(this).scrollTop() + 10,
      cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop)
          return this;
      });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    if (lastId !== id) {
      lastId = id;
      menuItems.parent().removeClass("current").end().filter("[href=#" + id + "]").parent().addClass("current");
    }
  });
})(jQuery);
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isIE = /*@cc_on!@*/ false;
var isFirefox = typeof InstallTrigger !== 'undefined';
var camTitle = document.getElementById('cam-title');
if (!isSafari && !isIE && !isFirefox) {
  var camera = Math.floor(Math.random() * 12);
  switch (camera) {
    case 0:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=41');} </style>");
      camTitle.innerHTML = "Albert &amp; Lyon";
      break;
    case 1:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=42');} </style>");
      camTitle.innerHTML = "Albert &amp; O'Connor";
      break;
    case 2:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=123');} </style>");
      camTitle.innerHTML = "Bank &amp; Laurier";
      break;
    case 3:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=64');} </style>");
      camTitle.innerHTML = "Bank &amp; Somerset";
      break;
    case 4:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=34');} </style>");
      camTitle.innerHTML = "Elgin &amp; Queen";
      break;
    case 5:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=157');} </style>");
      camTitle.innerHTML = "Bay &amp; Laurier";
      break;
    case 6:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=184');} </style>");
      camTitle.innerHTML = "Besserer &amp; Waller";
      break;
    case 7:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=4');} </style>");
      camTitle.innerHTML = "Bronson &amp; Carling";
      break;
    case 8:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=185');} </style>");
      camTitle.innerHTML = "Dalhousie &amp; Murray";
      break;
    case 9:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=107');} </style>");
      camTitle.innerHTML = "Dalhousie &amp; Rideau";
      break;
    case 10:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=46');} </style>");
      camTitle.innerHTML = "Kent &amp; Slater";
      break;
    default:
      document.write("<style>#live-cam { background: url('http://traffic.ottawa.ca/map/camera?id=189');} </style>");
      camTitle.innerHTML = "Bank &amp; Fifth";
  }
}
