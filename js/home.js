(function($) {
  var lastId, topMenu = $(".menu"),
    menuItems = topMenu.find("a"),
    menuItemsTemp = [];
  $.each(menuItems, function(i, data) {
    if (i !== 3) {
      menuItemsTemp.push(data);
    }
  });
  menuItemsTemp = $(menuItemsTemp);
  var scrollItems = menuItemsTemp.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });
  menuItemsTemp = null;
  menuItems.click(function(e) {
    var href = $(this).attr("href"),
      offset = href === "#" ? 0 : $(href).offset().top + 1;
    $('html, body').stop().animate({
        scrollTop: offset
      },
      550,
      function() {
        if (location.hash !== href)
          adjustMain(href);
        window.location.hash = href;
      });
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
      adjustMain(id);
      menuItems.parent().removeClass("current").end().filter("[href=#" + id + "]").parent().addClass("current");
    }
  });

  function adjustMain(href) {
    if (href === 'intro') {
      $('#main').css({
        position: 'fixed'
      });
    } else {
      $('#main').css({
        position: 'absolute'
      });
    }
  }

  $('header').on('click', '.menu-btn', function() {
    $(this).parent().toggleClass('hover');
    $('header').toggleClass('hover');
  });

  var $form = $('.form');
  $form.submit(function() {
    $('.success-status').removeClass('success-status');
    $('.error-status').removeClass('error-status');
    $(".error-msg").remove();
    var error = false,
      phoneError = "",
      tel = 0;
    if ($("#name").val() === "") {
      error = true;
      $("#name").addClass("error-status");
      $("#name").parent().append("<ul class='error-msg'><li>Please enter your name.</li></ul>");
    } else {
      $("#name").addClass("success-status");
    }

    if ($("#email").val() === "") {
      error = true;
      $("#email").addClass("error-status");
      $("#email").parent().append("<ul class='error-msg'><li>Please enter your email address.</li></ul>");
    } else if (($("#email").val().match(/.+@.+\..+/i) || []).length < 1) {
      error = true;
      $("#email").addClass("error-status");
      $("#email").parent().append("<ul class='error-msg'><li>The email address must match similar format to 'name@domain.com'.</li></ul>");
    } else {
      $("#email").addClass("success-status");
    }

    if ($("#phone").val() !== "") {
      if ($("#phone").val().length < 10) {
        phoneError += "<li>The phone number must be at least ten (10) digits</li>";
      }

      var num = $('#phone').val().replace(/\D/g, '');
      if (!$.isNumeric(num)) {
        phoneError += "<li>The phone number can only contain numbers.</li>";
      }

      if (phoneError.length > 0) {
        error = true;
        $("#phone").addClass("error-status");
        $("#phone").parent().append("<ul class='error-msg'>" + phoneError + "</ul>");
      } else {
        $("#phone").addClass("success-status");
      }
    }

    if ($("#message").val().trim() === "") {
      error = true;
      $("#message").addClass("error-status");
      $("#message").parent().append("<ul class='error-msg'><li>Please describe your request.</li></ul>");
    } else {
      $("#message").addClass("success-status");
    }

    if (!error) {
      var formDiv = $form.parent();
      $.post($(this).attr('action'), $(this).serialize(), function(response) {
        // on success
      }, 'json');
      $form.fadeOut(1000, function() {
        formDiv.append("<div class='request-sent'><p>Thank you for contacting me. I look forward to working together</p></div>");
      });
    }

    return false;
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
