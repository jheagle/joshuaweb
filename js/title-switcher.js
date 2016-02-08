(function($) {
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
  var TitleSwitcher = function(currentClass, titlesContainer) {
    this.currentClass = currentClass;
    this.titlesContainer = titlesContainer;
    this.titles = titlesContainer.children();
    this.typeSurface = {};
    this.isRandom = false;
    this.delaySwitch = 400;
    this.delayEffect = 200;

    this.startTitles = function(isRandom, delaySwitch, delayEffect) {
      var typeSurface = 'typeSurface';
      var currentIndex = this.titlesContainer.find('.' + this.currentClass).index();
      var currentTitle = this.titles[currentIndex];
      this.delaySwitch = delaySwitch || 400;
      this.delayEffect = delayEffect || 200;
      this.isRandom = isRandom || false;
      var $self = this;
      this.titles.eq(0).clone().prependTo(this.titlesContainer).addClass(typeSurface);
      this.typeSurface = this.titlesContainer.find('.' + typeSurface).removeClass(this.currentClass).empty().show();
      this.titles.hide();
      $self.switchTitle(currentTitle, $self.typingEffect, this);
    };

    this.cursorBlink = function(blinkOn, self) { // display cursor effect
      var $self = self || this;
      if (blinkOn) {
        $self.typeSurface.html($.trim($self.typeSurface.html().replace(/\||&nbsp;*(\<\/span\>)?$/, '$1')));
        $self.typeSurface.html($self.typeSurface.html() + '<span style="display: inline-block;font-weight: normal; color: black; text-decoration: none">&#124;</span>');
      } else {
        $self.typeSurface.html($self.typeSurface.html().replace(/\|(\<\/span\>)$/, '&nbsp;$1'));
      };
    };

    this.typingEffect = function(domObject, callBackFunction, self) {
      var $self = self || this;
      var currentIndex = $self.titlesContainer.find('.' + $self.currentClass).index();
      var domObject = domObject || $self.titles[currentIndex + 1];
      var callBackFunction = callBackFunction || $self.typingEffect;
      var blinkOn = true;
      var numBlinks = 4;
      if ($self.typeSurface.attr('style')) {
        $self.typeSurface.removeAttr('style');
      }
      if ($(domObject).attr('style')) {
        $self.typeSurface.attr('style', $(domObject).attr('style'));
      }
      $self.typeSurface.empty().show();

      for (var i = 0; i < numBlinks; ++i) {
        setTimeout(function() {
          $self.cursorBlink(blinkOn, $self);
          blinkOn = !blinkOn;
        }, i * $self.delaySwitch);
      }

      setTimeout(function() {
        $self.typeSurface.empty();
        $self.typeSurface.html($self.typeSurface.html() + '<span style="font-weight: normal; color: black; text-decoration: none">&#124;</span>');
        $.each($(domObject).text().split(''), function(i, letter) {
          setTimeout(function() {
            $self.typeSurface.html($self.typeSurface.text().replace('|', '') + letter + '<span style="font-weight: normal; color: black; text-decoration: none">&#124;</span>');
            // Replace html with old html on last letter
            if ($(domObject).text() + '|' === $self.typeSurface.text()) {
              $self.typeSurface.html(domObject.innerHTML + '<span style="font-weight: normal; color: black; text-decoration: none">&#124;</span>');
              for (var j = 0; j < numBlinks * 2; ++j) {
                setTimeout(function() {
                  --j;
                  $self.cursorBlink(blinkOn, $self);
                  blinkOn = !blinkOn;
                  if (j === 0) {
                    callBackFunction(domObject, $self.typingEffect, $self);
                  }
                }, j * $self.delaySwitch);
              }
            }
          }, i * $self.delayEffect);
        });
      }, numBlinks * $self.delaySwitch);
    };

    this.switchTitle = function(currentTitle, callBackFunction, self) {
      var $self = self || this;
      var currentIndex = $(currentTitle).index();
      var maxIndex = $self.titles.length;
      var nextIndex = 0;
      if (maxIndex === 1) {
        return callBackFunction(currentTitle, $self.switchTitle, $self);
      }
      if ($self.isRandom) {
        if (!$.trim($self.typeSurface.text())) {
          currentIndex = -1;
        }
        do {
          nextIndex = Math.round(Math.random() * maxIndex - 1);
        } while (nextIndex === currentIndex - 1 || nextIndex >= maxIndex);
      } else {
        if (!$.trim($self.typeSurface.text())) {
          currentIndex = maxIndex;
        }
        nextIndex = currentIndex < maxIndex ? currentIndex : 0;
      }
      var nextTitle = $self.titles[nextIndex];
      $(currentTitle).removeClass($self.currentClass);
      $(nextTitle).addClass($self.currentClass);
      return callBackFunction(nextTitle, $self.switchTitle, $self);
    };
  }

  $('.' + currentClass).each(function(i, titleClass) {
    var title = new TitleSwitcher(currentClass, $(titleClass).parent());
    titles.push(title);
  });
  $.each(titles, function(i, title) {
    if (title.titlesContainer.hasClass('title-switcher')) {
      title.startTitles(false, 400, 100);
    } else {
      title.startTitles(true);
    }
  });
})(jQuery);
