// Created by Joshua Web Strategy

/*********************************************
Title Switcher: to imitate typing and switch to
different titles based on DOM.
Requires titles to be listed as elements
inside a div, one of the title elements
needs to have class "displayTitle".
**********************************************/
var currentClass = 'displayTitle';
var titles = [];
var TitleSwitcher = function (currentClass, titlesContainer) {
  this.currentClass = currentClass;
  this.titlesContainer = titlesContainer;
  this.titles = titlesContainer.children();
  this.typeSurface = {};
  this.startTitles = function (isRandom) {
    var typeSurface = 'typeSurface';
    var currentTitle = this.titlesContainer.find('.' + this.currentClass);
    var $self = this;
    this.titles.eq(0).clone().prependTo(this.titlesContainer).addClass(typeSurface);
    this.typeSurface = this.titlesContainer.find('.' + typeSurface).removeClass(this.currentClass).empty().show();
    this.titles.hide();
    //$self.typingEffect(currentTitle, switchTitle, this);
    $self.typingEffect(currentTitle);
  };
  this.cursorBlink = function (blinkOn, self) { // display cursor effect
    var $self = self || this;
    if (blinkOn){
      $self.typeSurface.text($self.typeSurface.text().replace('|', ''));
      $self.typeSurface.html($self.typeSurface.text() + '<span style="font-weight: normal">&#124;</span>');
    }else{
      $self.typeSurface.text($self.typeSurface.text().replace('|', ''));
    };
  };
  this.typingEffect = function (domObject, callBackFunction, self) {
    var $self = self || this;
    var domObject = domObject || $self.titlesContainer.find('.' + $self.currentClass);
    var callBackFunction = callBackFunction || $self.typingEffect;
    var blinkOn = true;
    var numBlinks = 5;
    $self.typeSurface.empty();

    for (var i = 0; i < numBlinks; ++i){
      setTimeout(function () {
        $self.cursorBlink(blinkOn, $self);
        blinkOn = !blinkOn;
      }, i*400);
    }
    setTimeout(function () {
      $self.typeSurface.empty();
      $self.typeSurface.html($self.typeSurface.html() + '<span style="font-weight: normal">&#124;</span>');
      $.each(domObject.text().split(''), function (i, letter) {
        setTimeout(function () {
          $self.typeSurface.html($self.typeSurface.text().replace('|', '') + letter + '<span style="font-weight: normal">&#124;</span>');
          // Replace html with old html on last letter
          if (domObject.text() + '|' === $self.typeSurface.text()) {
            $self.typeSurface.html(domObject.html() + '<span style="font-weight: normal">&#124;</span>');
            setTimeout(function () {
              callBackFunction(domObject, callBackFunction, $self);
            }, 200 * domObject.text().split('').length * 2);
          }
        }, i*200);
      });
    }, numBlinks*400);
  };
}
$('.' + currentClass).each(function(i, titleClass){
  var title = new TitleSwitcher(currentClass, $(titleClass).parent());
  titles.push(title);
});
$.each(titles, function(i, title){
  title.startTitles(true);
});
// var TitleSwitcher = function (currentClass, titlesContainer) {
//   this.isSwitching = false, // flag for click to pause / switch -- don't change!
//   this.currentClass = currentClass,
//   this.titlesContainer = titlesContainer,
//   this.titles = this.titlesContainer.children(),
//   this.typeSurface = {}, // name for class to type into
//   this.currentTitle = {}, // name for class to type into
//   this.blinkOn = true,
//   startTitles: function (isRandom) {
//     var typeSurface = 'typeSurface';
//     this.titles.eq(0).clone().prependTo(this.titlesContainer).addClass(typeSurface);
//     this.typeSurface = this.titlesContainer.find('.' + typeSurface);
//     this.currentTitle = this.titlesContainer.find('.' + this.currentClass);
//     this.typeSurface.removeClass(this.currentClass).empty();
//
//     if (isRandom || false) {
//       this.switchTitle(isRandom);
//     } else {
//       this.runTitles(isRandom);
//     }
//   },
//   clickTitle: function () {
//     if (!this.isSwitching) {
//       this.titlesContainer.find('.' + typeSurface).hide();
//       this.titlesContainer.find('.' + currentTitle).show();
//       this.isSwitching = true;
//     } else {
//       this.titlesContainer.find.switchTitle(false);
//     }
//   },
//   displayCursor: function () { // display cursor effect
//     if ($(this).blinkOn){
//       this.typeSurface.html(this.typeSurface.html() + '<span style="font-weight: normal">&#124;</span>');
//     }else{
//       if ($.browser.msie){
//         this.typeSurface.html(this.typeSurface.html().slice(0, -43));
//       }
//     }else{
//       this.typeSurface.html(this.typeSurface.html().slice(0, -42));
//     }
//     this.blinkOn = !this.blinkOn;
//   },
//   typeImitator = function (opts) { // Imitate typing effect
//     defaults = {
//       textTypeDelay: 50
//     },
//     settings = $.extend(defaults, opts),
//     count = 0;
//
//     blinkOn = true;
//     var cursorBlink = setInterval('this.displayCursor()', 600);
//
//     if (!this.isSwitching) {
//       this.typeSurface.empty();
//       for (var i = 1; i <= this.titles.length; ++i) {
//         this.titles.eq(i).hide();
//       }
//       this.typeSurface.show();
//       setTimeout(function () {
//         clearInterval(cursorBlink);
//         this.typeSurface.empty();
//         this.typeSurface.html(this.typeSurface.html() + '<span style="font-weight: normal">&#124;</span>');
//         $.each(settings.text.split(''), function (i, letter) {
//           setTimeout(function () {
//             if ($.browser.msie)
//             this.typeSurface.html(this.typeSurface.html().slice(0, -43));
//             else
//             this.typeSurface.html(this.typeSurface.html().slice(0, -42));
//             this.typeSurface.html(this.typeSurface.html() + letter + '<span style="font-weight: normal">&#124;</span>');
//             // Replace html with old html on last letter
//             if (i >= settings.text.split('').length - 1) {
//               this.typeSurface.html(this.currentTitle.html());
//               // The below code is intended to continue the blinking cursor at the end of typing
//               // unfortunately this results is buggy effects where partial cursor code will appear
//               //                        blinkOn = true;
//               //                        cursorBlink = setInterval('displayCursor()', 600);
//             }
//           }, settings.textTypeDelay * i);
//         });
//       }, 2000);
//
//       // Delay then switch to new title
//       setTimeout(function () {
//         isSwitching = false;
//         clearInterval(cursorBlink);
//         $this.switchTitle(settings.isRandom);
//       }, settings.textTypeDelay * settings.text.split('').length * 2 + 2000);
//     }
//   },
//   switchTitle = function (isRandom) { // Switch the current title to display next
//     var minIndex = 0,
//     index = 0,
//     typeIndex = 0;
//
//     this.hide();
//
//     if (this.titles.length > 2) {
//       for (var i = 0; i < this.titles.length; ++i) {
//         if (this.titles.eq(i) = this.typeSurface) {
//           typeIndex = i;
//           break;
//         }
//       }
//       for (i = 0; i < this.$items.length; ++i) {
//         if (i !== typeIndex) {
//           minIndex = i;
//           break;
//         }
//       }
//       do {
//         index = Math.round(Math.random() * this.$items.length);
//       } while (index === typeIndex || index < minIndex || index >= this.titles.length);
//       $this.addClass('has-bubble-open')
//         .siblings().removeClass('has-bubble-open');
//
//       for (var i = minIndex; i < this.$items.length; ++i) {
//         if (this.$items.eq(i).hasClass(currentTitle)) {
//           this.$items.eq(i).removeClass(currentTitle);
//           if (index === i || !isRandom) {
//             if (i >= this.$items.length - 1) {
//               this.$items.eq(minIndex).addClass(currentTitle);
//             } else {
//               if (i + 1 === typeIndex) {
//                 if (i + 2 >= this.$items.length - 1)
//                 this.$items.eq(minIndex).addClass(currentTitle);
//                 else
//                 this.$items.eq(i + 2).addClass(currentTitle);
//               } else {
//                 this.$items.eq(i + 1).addClass(currentTitle);
//               }
//             }
//           } else {
//             this.$items.eq(index).addClass(currentTitle);
//           }
//           that = $('.' + currentTitle).show();
//           break;
//         }
//       }
//     }
//     if (!this.isSwitching)
//     this.runTitles(isRandom); // Start again
//   },
//   runTitles = function (isRandom) {// Control function
//     var $this = this,
//     title = $this.text(); // Save text
//     $this.typeImitator({
//       textTypeDelay: 100,
//       text: title,
//       isRandom: isRandom
//     });
//   }
// }
