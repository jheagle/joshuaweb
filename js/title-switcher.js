// Created by Joshua Web Strategy

/*********************************************
Title Switcher: to imitate typing and switch to
different titles based on DOM.
	Requires titles to be listed as elements
    inside a div, one of the title elements
    needs to have class "displayTitle".
**********************************************/
   
var isSwitching = false, // flag for click to pause / switch -- don't change!
    currentTitle = 'displayTitle', // name for class with displayTitle
    typeSurface = 'typeSurface', // name for class to type into
    blinkOn = true;

$('.' + currentTitle).parent().click(function() {
    if(!isSwitching){
        $('.' + typeSurface).hide();
        $('.' + currentTitle).show();
        isSwitching = true;
    }else{
        $('.' + currentTitle).switchTitle(false);
    }
})

// display cursor effect
function displayCursor(){
    $typingSurface = $('.' + typeSurface);
    if(blinkOn)
        $typingSurface.html($typingSurface.html() + '<span style="font-weight: normal">&#124;</span>');
    else
        if($.browser.msie)
            $typingSurface.html($typingSurface.html().slice(0, -43));
        else
            $typingSurface.html($typingSurface.html().slice(0, -42));

    blinkOn = !blinkOn;
}

// Imitate typing effect
$.fn.typeImitator = function(opts){
	var $this = this,
        $typingSurface = $('.' + typeSurface);
        defaults = {
            textTypeDelay: 50
        },
        settings = $.extend(defaults, opts),
        count = 0;

    blinkOn = true;
    var cursorBlink = setInterval('displayCursor()', 600);
    
    if(!isSwitching){
        $typingSurface.empty();
        $originalTitle = $this.html(); // Save html
        this.$items = this.parent().children();
        for(var i = 1; i <= this.$items.length; i++){
            this.$items.eq(i).hide();
        }
        $typingSurface.show();
        setTimeout(function(){
            clearInterval(cursorBlink);
            $typingSurface.empty();
            $typingSurface.html($typingSurface.html() + '<span style="font-weight: normal">&#124;</span>');
            $.each(settings.text.split(''), function(i, letter){
                setTimeout(function(){
                    if($.browser.msie)
                        $typingSurface.html($typingSurface.html().slice(0, -43));
                    else
                        $typingSurface.html($typingSurface.html().slice(0, -42));
                    $typingSurface.html($typingSurface.html() + letter + '<span style="font-weight: normal">&#124;</span>');
                    // Replace html with old html on last letter
                    if(i >= settings.text.split('').length - 1) {
                        $typingSurface.html($originalTitle);
                        blinkOn = true;
                        cursorBlink = setInterval('displayCursor()', 600);
                    }
                }, settings.textTypeDelay * i);
            });
        }, 2000);

        // Delay then switch to new title
        setTimeout(function(){
            isSwitching = false;
            clearInterval(cursorBlink);
            $this.switchTitle(settings.isRandom);
        	}, settings.textTypeDelay * settings.text.split('').length * 2 + 2000);
    }
};

// Switch the current title to display next
$.fn.switchTitle = function(isRandom) {
	var $this = this,
		$that = this,
        minIndex = 0,
        index = 0,
        typeIndex = 0;

    $this.hide();
	this.$items = this.parent().children();

    if(this.$items.length > 2){
        for(var i = 0; i < this.$items.length; i++){
            if(this.$items.eq(i).hasClass(typeSurface)){
                typeIndex = i;
                break;
            }           
        }
        for(i = 0; i < this.$items.length; i++){
            if(i !== typeIndex){
                minIndex = i;        
                break;
            }
        }
        do{
            index = Math.round(Math.random() * this.$items.length);
        }while(index === typeIndex || index < minIndex || index >= this.$items.length);

        for(var i = minIndex; i < this.$items.length; i++){
    		if(this.$items.eq(i).hasClass(currentTitle)){
    			this.$items.eq(i).removeClass(currentTitle);
                if(index === i || !isRandom){
        			if (i >= this.$items.length - 1){
                        this.$items.eq(minIndex).addClass(currentTitle);
        			} else {
                        if(i+1 === typeIndex){
                            if(i+2 >= this.$items.length - 1)
                                this.$items.eq(minIndex).addClass(currentTitle);
                            else
                                this.$items.eq(i+2).addClass(currentTitle);
                        }else{
                            this.$items.eq(i+1).addClass(currentTitle);                        
                        }
        			}
                }else{
                    this.$items.eq(index).addClass(currentTitle);
                }
    			that = $('.' + currentTitle).show();
    			break;
    		} 			
        } 
    }
    if(!isSwitching) that.runTitles(isRandom); // Start again
}

// Control function
$.fn.runTitles = function(isRandom){
	var $this = this,
        title = $this.text(); // Save text
    $this.typeImitator({
        textTypeDelay: 100,
    	text: title,
        isRandom: isRandom
    });
}

// Start Here
$(function(){
    /************************************************************
     Set isRandom to True for random start and random title order,
     false for original order
    *************************************************************/ 
    var isRandom = true; // change this to false or true

    this.$items = $('.' + currentTitle).parent().children();
    this.$items.eq(0).clone().prependTo($('.' + currentTitle).parent()).addClass(typeSurface);
    $('.' + typeSurface).removeClass(currentTitle); // remove title class from type surface
    $('.' + typeSurface).empty(); // prepare type surface by deleting contents

    if(isRandom)
	   $('.' + currentTitle).switchTitle(isRandom);
    else
       $('.' + currentTitle).runTitles(isRandom);        
});