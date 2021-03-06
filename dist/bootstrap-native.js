// Native Javascript for Bootstrap 3 v2.0.1 | © dnp_theme | MIT-License
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    root.Affix = bsn.Affix;
    root.Alert = bsn.Alert;
    root.Button = bsn.Button;
    root.Carousel = bsn.Carousel;
    root.Collapse = bsn.Collapse;
    root.Dropdown = bsn.Dropdown;
    root.Modal = bsn.Modal;
    root.Popover = bsn.Popover;
    root.ScrollSpy = bsn.ScrollSpy;
    root.Tab = bsn.Tab;
    root.Tooltip = bsn.Tooltip;
  }
}(this, function () {
  
  /* Native Javascript for Bootstrap 3 | Internal Utility Functions
  ----------------------------------------------------------------*/
  
  // globals
  var global = typeof global !== 'undefined' ? global : this||window,
    doc = document.documentElement, body = document.body,
    
    // IE browser detect
    isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,
  
    // function toggle attributes
    dataToggle    = 'data-toggle',
    dataDismiss   = 'data-dismiss',
    dataSpy       = 'data-spy',
    dataRide      = 'data-ride',
    
    // components
    stringAffix     = 'Affix',
    stringAlert     = 'Alert',
    stringButton    = 'Button',
    stringCarousel  = 'Carousel',
    stringCollapse  = 'Collapse',
    stringDropdown  = 'Dropdown',
    stringModal     = 'Modal',
    stringPopover   = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab       = 'Tab',
    stringTooltip   = 'Tooltip',
  
    // options DATA API
    databackdrop      = 'data-backdrop',
    dataKeyboard      = 'data-keyboard',
    dataDuration      = 'data-duration',
    dataTarget        = 'data-target',
    dataInterval      = 'data-interval',
    dataHeight        = 'data-height',
    dataPause         = 'data-pause',
    dataOriginalTitle = 'data-original-title',
    dataOriginalText  = 'data-original-text',
    dataDismissible   = 'data-dismissible',
    dataTrigger       = 'data-trigger',
    dataAnimation     = 'data-animation',
    dataContainer     = 'data-container',
    dataPlacement     = 'data-placement',
    dataDelay         = 'data-delay',
    dataOffsetTop     = 'data-offset-top',
    dataOffsetBottom  = 'data-offset-bottom',
  
    // option keys
    backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
    duration = 'duration', content = 'content', target = 'target', 
    interval = 'interval', pause = 'pause', animation = 'animation',
    placement = 'placement', container = 'container', 
  
    // box model
    offsetTop    = 'offsetTop',      offsetBottom   = 'offsetBottom',
    offsetLeft   = 'offsetLeft',
    scrollTop    = 'scrollTop',      scrollLeft     = 'scrollLeft',
    clientWidth  = 'clientWidth',    clientHeight   = 'clientHeight',
    offsetWidth  = 'offsetWidth',    offsetHeight   = 'offsetHeight',
    innerWidth   = 'innerWidth',     innerHeight    = 'innerHeight',
    scrollHeight = 'scrollHeight',   height         = 'height',
  
    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden   = 'aria-hidden',
  
    // event names
    clickEvent    = 'click',
    hoverEvent    = 'hover',
    keydownEvent  = 'keydown',
    resizeEvent   = 'resize',
    scrollEvent   = 'scroll',
    // originalEvents
    showEvent     = 'show',
    shownEvent    = 'shown',
    hideEvent     = 'hide',
    hiddenEvent   = 'hidden',
    closeEvent    = 'close',
    closedEvent   = 'closed',
    slidEvent     = 'slid',
    slideEvent    = 'slide',
    changeEvent   = 'change',
  
    // other
    getAttribute         = 'getAttribute',
    setAttribute         = 'setAttribute',
    hasAttribute         = 'hasAttribute',
    getElementsByTagName = 'getElementsByTagName',
    getBoundingClientRect= 'getBoundingClientRect',
    querySelectorAll     = 'querySelectorAll',
    getElementsByCLASSNAME = 'getElementsByClassName',
  
    indexOf    = 'indexOf',
    parentNode = 'parentNode',
    length     = 'length',
    
    active     = 'active',
    collapsing = 'collapsing',
    disabled   = 'disabled',
    loading    = 'loading',
    left       = 'left',
    right      = 'right',
    top        = 'top',
    bottom     = 'bottom',
  
    // tooltip / popover
    mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
    tipPositions = /\b(top|bottom|left|top)+/,
  
    // class manipulation, since 1.2.0 requires polyfill.js
    addClass = function(element,classNAME) {
      element.classList.add(classNAME);
    },
    removeClass = function(element,classNAME) {
      element.classList.remove(classNAME);
    },
    hasClass = function(element,classNAME){ // since 1.2.0
      return element.classList.contains(classNAME);
    },
  
    // selection methods
    nodeListToArray = function(nodeList){
      var childItems = []; for (var i = 0, nll = nodeList[length]; i<nll; i++) { childItems.push( nodeList[i] ) }
      return childItems;
    },
    getElementsByClassName = function(element,classNAME) { // getElementsByClassName IE8+
      var selectionMethod = isIE === 8 ? querySelectorAll : getElementsByCLASSNAME;      
      return nodeListToArray(element[selectionMethod]( isIE === 8 ? '.' + classNAME.replace(/\s(?=[a-z])/g,'.') : classNAME ));
    },
    queryElement = function (selector, parent) { // selector utility since 1.2.0
      var lookUp = parent ? parent : document;
      return typeof selector === 'object' ? selector : 
        (/^#/.test(selector) ? document.getElementById(selector.replace('#', '')) : lookUp.querySelector(selector));
    },
    getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
    // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var firstChar = selector.charAt(0);
      for ( ; element && element !== document; element = element[parentNode] ) {// Get closest match
        if ( firstChar === '.' || firstChar !== '#') {// If selector is a class
          if ( queryElement(selector,element[parentNode]) !== null ) { return element; }
        }
        if ( firstChar === '#' ) { // If selector is an ID
          if ( element.id === selector.substr(1) ) { return element; }
        }
      }
      return false;
    },
  
    // event attach jQuery style / trigger  since 1.2.0
    on = function (element, event, handler) {
      element.addEventListener(event, handler, false);
    },
    off = function(element, event, handler) {
      element.removeEventListener(event, handler, false);
    },
    bootstrapCustomEvent = function (eventName, componentName, related) {
      var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName);
      OriginalCustomEvent.relatedTarget = related;
      this.dispatchEvent(OriginalCustomEvent);
    },
  
    // reference a live collection of the DOM
    AllDOMElements = document[getElementsByTagName]('*'),
  
    /* Init DATA API
    *  -------------
    *  component : Dropdown
    *  constructor : Dropdown() constructor
    *  dataAttribute : data-toggle 
    */
    initializeDataAPI = function( component, constructor, dataAttribute, collection ){
      var lookUp = collection && collection[length] ? collection : AllDOMElements;
      for (var i=0; i < lookUp[length]; i++) {
        var attrValue = lookUp[i][getAttribute](dataAttribute), expectedAttrValue = component.replace(/spy/i,'').toLowerCase();
        if ( attrValue && component === stringButton && ( attrValue[indexOf](expectedAttrValue) > -1 ) // data-toggle="buttons"
            || attrValue === expectedAttrValue ) { // all other components
          new constructor(lookUp[i]);
        }
      }
    },
    /* BULK initialization
    *  -------------------
    * you can uncomment the below to trigger a global re-initialization 
    * at any time you can either go for your own HTMLCollection / Array object
    * or use with no argument to use the above AllDOMElements collection */
    // components = [stringAffix, stringAlert, stringButton, stringCarousel, stringCollapse, stringDropdown, stringModal, stringPopover, stringScrollSpy, stringTab, stringToolTip],
    // componentsSelectors = [dataSpy, dataDismiss, dataToggle, dataRide, dataToggle, dataToggle, dataToggle, dataToggle, dataSpy, dataToggle, dataToggle],
    // bulkInitializeDataAPI = function(collection){
    //   for (var i=0; i<components[length]; i++){
    //     initializeDataAPI( components[i], global[components[i]], componentsSelectors[i], collection );
    //   }
    // },
  
    // tab / collapse stuff
    getOuterHeight = function (child) {
      var style = child && (child.currentStyle || global.getComputedStyle(child)), // the getComputedStyle polyfill would do this for us, but we want to make sure it does
        btp = /px/.test(style.borderTopWidth) ? Math.round(style.borderTopWidth.replace('px','')) : 0,
        btb = /px/.test(style.borderBottomWidth) ? Math.round(style.borderBottomWidth.replace('px','')) : 0,
        mtp = /px/.test(style.marginTop)  ? Math.round(style.marginTop.replace('px',''))    : 0,
        mbp = /px/.test(style.marginBottom)  ? Math.round(style.marginBottom.replace('px',''))  : 0;
      return child[clientHeight] + parseInt( btp ) + parseInt( btb ) + parseInt( mtp ) + parseInt( mbp );
    },
    getMaxHeight = function(parent) { // get collapse trueHeight and border
      var parentHeight = 0, style, margin;
      for (var k = 0, ll = parent.children[length]; k < ll; k++) {
        parentHeight += getOuterHeight(parent.children[k]);
      }
      return parentHeight;
    },
  
    // tooltip / popover stuff
    isElementInViewport = function(element) { // check if this.tooltip is in viewport
      var rect = element[getBoundingClientRect]();
      return ( rect[top] >= 0 && rect[left] >= 0 &&
        rect[bottom] <= (global[innerHeight] || doc[clientHeight]) &&
        rect[right] <= (global[innerWidth] || doc[clientWidth]) )
    },
    getScroll = function() { // also Affix and ScrollSpy uses it
      return {
        y : global.pageYOffset || doc[scrollTop],
        x : global.pageXOffset || doc[scrollLeft]
      }
    },
    styleTip = function(link,element,position,container) { // both popovers and tooltips
      var rect = link[getBoundingClientRect](), 
          scroll = container === body ? getScroll() : { x: container[offsetLeft] + container[scrollLeft], y: container[offsetTop] + container[scrollTop] },
          linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
          elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] };
  
      // apply styling to tooltip or popover
      if ( position === top ) { // TOP
        element.style[top] = rect[top] + scroll.y - elementDimensions.h + 'px';
        element.style[left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px'
  
      } else if ( position === bottom ) { // BOTTOM
        element.style[top] = rect[top] + scroll.y + linkDimensions.h + 'px';
        element.style[left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px';
  
      } else if ( position === left ) { // LEFT
        element.style[top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
        element.style[left] = rect[left] + scroll.x - elementDimensions.w + 'px';
  
      } else if ( position === right ) { // RIGHT
        element.style[top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
        element.style[left] = rect[left] + scroll.x + linkDimensions.w + 'px';
      }
      element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
    },
    updatePlacement = function(position) {
      return position === top ? bottom : // top
              position === bottom ? top : // bottom
              position === left ? right : // left
              position === right ? left : position; // right
    };
  
  
  
  /* Native Javascript for Bootstrap 3 | Affix
  -------------------------------------------*/
  
  //AFFIX DEFINITION
  var Affix = function(element, options) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // read DATA API
    var targetData        = element[getAttribute](dataTarget),
        offsetTopData     = element[getAttribute](dataOffsetTop),
        offsetBottomData  = element[getAttribute](dataOffsetBottom),
        
        // component specific strings
        affix = 'affix', affixed = 'affixed', fn = 'function', update = 'update',
        affixTop = 'affix-top', affixedTop = 'affixed-top',
        affixBottom = 'affix-bottom', affixedBottom = 'affixed-bottom';
  
    this[target] = options[target] ? queryElement(options[target]) : queryElement(targetData) || null; // target is an object
    this[offsetTop] = options[offsetTop] ? options[offsetTop] : parseInt(offsetTopData) || 0; // offset option is an integer number or function to determine that number
    this[offsetBottom] = options[offsetBottom] ? options[offsetBottom]: parseInt(offsetBottomData) || 0;
  
    if ( !this[target] && !( this[offsetTop] || this[offsetBottom] ) ) { return; } // invalidate
  
    // internal bind
    var self = this,
  
      // constants
      resizeDelay = (isIE && isIE < 10) ? 500 : 50, // for legacy browsers we try to limit the interval for updating the Affix
      pinOffsetTop, pinOffsetBottom, maxScroll, scrollY, pinnedTop, pinnedBottom,
      affixedToTop = false, affixedToBottom = false,
      // private methods
      getMaxScroll = function(){
        return Math.max( body[scrollHeight], body[offsetHeight], doc[clientHeight], doc[scrollHeight], doc[offsetHeight] );
      },  
      getOffsetTop = function () {
        if ( self[target] !== null ) {
          return self[target][getBoundingClientRect]()[top] + scrollY;
        } else if ( self[offsetTop] ) {
          return parseInt(typeof self[offsetTop] === fn ? self[offsetTop]() : self[offsetTop] || 0);
        }
      },
      getOffsetBottom = function () {
        if ( self[offsetBottom] ) {
          return maxScroll - element[offsetHeight] - parseInt( typeof self[offsetBottom] === fn ? self[offsetBottom]() : self[offsetBottom] || 0 );
        }
      },
      checkPosition = function () {
        maxScroll = getMaxScroll();
        scrollY = parseInt(getScroll().y,0);
        pinOffsetTop = getOffsetTop();
        pinOffsetBottom = getOffsetBottom(); 
        pinnedTop = ( parseInt(pinOffsetTop) - scrollY < 0) && (scrollY > parseInt(pinOffsetTop) );
        pinnedBottom = ( parseInt(pinOffsetBottom) - scrollY < 0) && (scrollY > parseInt(pinOffsetBottom) );
      },
      pinTop = function () {
        if ( !affixedToTop && !hasClass(element,affix) ) { // on loading a page halfway scrolled these events don't trigger in Chrome
          bootstrapCustomEvent.call(element, affix, affix);
          bootstrapCustomEvent.call(element, affixTop, affix);
          addClass(element,affix);
          affixedToTop = true;
          bootstrapCustomEvent.call(element, affixed, affix);
          bootstrapCustomEvent.call(element, affixedTop, affix);
        }
      },
      unPinTop = function () {
        if ( affixedToTop && hasClass(element,affix) ) {
          removeClass(element,affix);
          affixedToTop = false;
        }
      },
      pinBottom = function () {
        if ( !affixedToBottom && !hasClass(element, affixBottom) ) {
          bootstrapCustomEvent.call(element, affix, affix);
          bootstrapCustomEvent.call(element, affixBottom, affix);
          addClass(element,affixBottom);
          affixedToBottom = true;
          bootstrapCustomEvent.call(element, affixed, affix);
          bootstrapCustomEvent.call(element, affixedBottom, affix);
        }
      },
      unPinBottom = function () {
        if ( affixedToBottom && hasClass(element,affixBottom) ) {
          removeClass(element,affixBottom);
          affixedToBottom = false;
        }
      },
      updatePin = function () {
        if ( pinnedBottom ) {
          if ( pinnedTop ) { unPinTop(); }
          pinBottom(); 
        } else {
          unPinBottom();
          if ( pinnedTop ) { pinTop(); } 
          else { unPinTop(); }
        }
      };
  
    // public method
    this[update] = function () {
      checkPosition();
      updatePin(); 
    };
  
    // init
    if ( !(stringAffix in element ) ) {
      on( global, scrollEvent, this[update] );
      on( global, resizeEvent, function() { setTimeout(function(){ self[update](); }, resizeDelay); });
      element[stringAffix] = this;
    }
  
    this[update]();
  };
  
  // AFFIX DATA API
  // =================
  initializeDataAPI( stringAffix, Affix, dataSpy );
  
  
  /* Native Javascript for Bootstrap 3 | Alert
  -------------------------------------------*/
  
  // ALERT DEFINITION
  // ================
  var Alert = function( element ) {
    
    // initialization element
    element = queryElement(element);
  
    // bind, target alert, duration and stuff
    var self = this, component = 'alert',
      alert = getClosest(element,'.'+component), duration = (isIE && isIE < 10) ? 0 : 300, // default alert transition duration
      // handler
      clickHandler = function(e){
        var eventTarget = e[target];
        eventTarget = eventTarget[hasAttribute](dataDismiss) ? eventTarget : eventTarget[parentNode];
        if (eventTarget && eventTarget[hasAttribute](dataDismiss)) { // we double check the data attribute, it's important
          alert = getClosest(eventTarget,'.'+component);
          element = queryElement('['+dataDismiss+'="'+component+'"]',alert);
          (element === eventTarget || element === eventTarget[parentNode]) && alert && self.close();
        }
      };
    
    // public method
    this.close = function() {
      if ( alert && element && hasClass(alert,'in') ) {
        bootstrapCustomEvent.call(alert, closeEvent, component);
        removeClass(alert,'in');
        setTimeout(function() {
          if (alert) {
            bootstrapCustomEvent.call(alert, closedEvent, component);
            off(element, clickEvent, clickHandler); // detach it's listener
            alert[parentNode].removeChild(alert);
          } 
        }, duration);
      }
    };
  
    // init
    if ( !(stringAlert in element ) ) {
      on(element, clickEvent, clickHandler);
      element[stringAlert] = this;
    }
  };
  
  // ALERT DATA API
  // ==============
  initializeDataAPI ( stringAlert, Alert, dataDismiss );
  
  
  /* Native Javascript for Bootstrap 3 | Button
  ---------------------------------------------*/
  
  // BUTTON DEFINITION
  // ===================
  var Button = function( element, option ) {
  
    // initialization element
    element = queryElement(element);
  
    // set option
    option = option || null;
  
    // constant
    var toggled = false, // toggled makes sure to prevent triggering twice the change.bs.button events
  
        // strings
        component = 'button',
        checked = 'checked',
        reset = 'reset',
        LABEL = 'LABEL',
        INPUT = 'INPUT',
  
      // private methods
      setState = function() {
        if ( !! option && option !== reset ) {
          if ( option === loading ) {
            addClass(element,disabled);
            element[setAttribute](disabled,disabled);
          }
          element[setAttribute](dataOriginalText, element.innerHTML.replace(/^\s+|\s+$/g, '')); // trim the text
          element.innerHTML = element[getAttribute]('data-'+option+'-text');
        }
      },
      resetState = function() {
        if (element[getAttribute](dataOriginalText)) {
          if ( hasClass(element,disabled) || element[getAttribute](disabled) === disabled ) {
            removeClass(element,disabled);
            element.removeAttribute(disabled);
          }
          element.innerHTML = element[getAttribute](dataOriginalText);
        }
      },
      toggle = function(e) {
        var parent = e[target][parentNode],
          label = e[target].tagName === LABEL ? e[target] : parent.tagName === LABEL ? parent : null; // the .btn label
  
        if ( !label ) return; //react if a label or its immediate child is clicked
  
        var eventTarget = this, // the button group, the target of the handler function
          labels = getElementsByClassName(eventTarget,'btn'), // all the button group buttons
          input = label[getElementsByTagName](INPUT)[0];
  
        if ( !input ) return; //return if no input found
  
        // manage the dom manipulation
        if ( input.type === 'checkbox' ) { //checkboxes
          if ( !input[checked] ) {
            addClass(label,active);
            input[getAttribute](checked);
            input[setAttribute](checked,checked);
            input[checked] = true;
          } else {
            removeClass(label,active);
            input[getAttribute](checked);
            input.removeAttribute(checked);
            input[checked] = false;
          }
  
          if (!toggled) { // prevent triggering the event twice
            toggled = true;
            bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
            bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
          }
        }
  
        if ( input.type === 'radio' && !toggled ) { // radio buttons
          if ( !input[checked] ) { // don't trigger if already active
            addClass(label,active);
            input[setAttribute](checked,checked);
            input[checked] = true;
            bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
            bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
  
            toggled = true;
            for (var i = 0, ll = labels[length]; i<ll; i++) {
              var otherLabel = labels[i], otherInput = otherLabel[getElementsByTagName](INPUT)[0];
              if ( otherLabel !== label && hasClass(otherLabel,active) )  {
                removeClass(otherLabel,active);
                otherInput.removeAttribute(checked);
                otherInput[checked] = false;
                bootstrapCustomEvent.call(otherInput, changeEvent, component); // trigger the change
              }
            }
          }
        }
        setTimeout( function() { toggled = false; }, 50 );
      };
  
    // init
    if ( hasClass(element,'btn') ) { // when Button text is used we don't register the initialization in the BootstrapNative object
      if ( option !== null ) {
        if ( option !== reset ) { setState(); } 
        else { resetState(); }
      }
    }
    if ( hasClass(element,'btn-group') ) { // register in the BootstrapNative object
      if ( !( stringButton in element ) ) {
        on( element, clickEvent, toggle );
        element[stringButton] = this;
      }
    }
  };
  
  // BUTTON DATA API
  // =================
  initializeDataAPI( stringButton, Button, dataToggle );
  
  
  /* Native Javascript for Bootstrap 3 | Carousel
  ----------------------------------------------*/
  
  // CAROUSEL DEFINITION
  // ===================
  var Carousel = function( element, options ) {
  
    // initialization element
    element = queryElement( element );
  
    // set options
    options = options || {};
  
    // DATA API
    var intervalData = element[getAttribute](dataInterval) === 'false' ? false : parseInt(element[getAttribute](dataInterval)) || 5000, // bootstrap carousel default interval
        pauseData = element[getAttribute](dataPause) === hoverEvent || false,
        keyboardData = element[getAttribute](dataKeyboard) === 'true' || false,
        durationData = parseInt(element[getAttribute](dataDuration)) || 600, // bootstrap carousel default transition duration
      
        // strings
        component = 'carousel',
        paused = 'paused',
        direction = 'direction',
        dataSlideTo = 'data-slide-to'; 
  
    this[keyboard] = options[keyboard] === true || keyboardData;
    this[pause] = (options[pause] === hoverEvent || pauseData) ? hoverEvent : false; // false / hover
    this[duration] = (isIE && isIE < 10) ? 0 : options[duration] || durationData;
  
    if ( !( options[interval] || intervalData ) ) { // determine slide interval
      this[interval] = false;
    } else {
      this[interval] = parseInt(options[interval]) || intervalData; // default slide interval
    }
  
    // bind, event targets
    var self = this, index = element.index = 0, timer = element.timer = 0, 
      isSliding = false, // isSliding prevents click event handlers when animation is running
      slides = getElementsByClassName(element,'item'), total = slides[length],
      slideDirection = this[direction] = left,
      controls = getElementsByClassName(element,component+'-control'),
      leftArrow = controls[0], rightArrow = controls[1],
      indicator = queryElement( '.'+component+'-indicators', element ),
      indicators = indicator[getElementsByTagName]( "LI" );
  
    // handlers
    var pauseHandler = function () {
        if ( self[interval] !==false && !hasClass(element,paused) ) {
          addClass(element,paused);
          !isSliding && clearInterval( timer );
        }
      },
      resumeHandler = function() {
        if ( self[interval] !== false && hasClass(element,paused) ) {
          removeClass(element,paused);
          !isSliding && clearInterval( timer );
          !isSliding && self.cycle();
        }
      },
      indicatorHandler = function(e) {
        e.preventDefault();
        if (isSliding) return;
  
        var eventTarget = e[target], activeIndicator = self.getActiveIndex(); // event target | the current active item
  
        if ( eventTarget && !hasClass(eventTarget,active) && eventTarget[getAttribute](dataSlideTo) ) {
          index = parseInt( eventTarget[getAttribute](dataSlideTo), 10 );
  
          //determine direction first
          if  ( (activeIndicator < index ) || (activeIndicator === 0 && index === total -1 ) ) {
            slideDirection = self[direction] = left; // next
          } else if  ( (activeIndicator > index) || (activeIndicator === total - 1 && index === 0 ) ) {
            slideDirection = self[direction] = right; // prev
          }
        } else { return false; }
  
        self.slideTo( index ); //Do the slide
      },
      controlsHandler = function (e) {
        e.preventDefault();
        if (isSliding) return;
  
        var eventTarget = e.currentTarget || e.srcElement;
  
        if ( eventTarget === rightArrow ) {
          index++;
          slideDirection = self[direction] = left; //set direction first
  
          if( index === total - 1 ) {
            index = total - 1;
          } else if ( index === total ){
            index = 0;
          }
        } else if ( eventTarget === leftArrow ) {
          index--;
          slideDirection = self[direction] = right; //set direction first
  
          if( index === 0 ) {
            index = 0;
          } else if ( index < 0 ){
            index = total - 1
          }
        }
  
        self.slideTo( index ); //Do the slide
      },
      keyHandler = function (e) {
        if (isSliding) return;
        switch (e.which) {
          case 39:
            index++;
            slideDirection = self[direction] = left;
            if( index == total - 1 ) { index = total - 1; } else
            if ( index == total ){ index = 0 }
            break;
          case 37:
            index--;
            slideDirection = self[direction] = right;
            if ( index == 0 ) { index = 0; } else
            if ( index < 0 ) { index = total - 1 }
            break;
          default: return;
        }
        self.slideTo( index ); //Do the slide
      },
      // private methods
      setActivePage = function( pageIndex ) { //indicators
        for ( var i = 0, icl = indicators[length]; i < icl; i++ ) {
          removeClass(indicators[i],active);
        }
        if (indicators[pageIndex]) addClass(indicators[pageIndex], active);
      };
  
  
    // public methods
    this.cycle = function() {
      slideDirection = this[direction] = left; // make sure to always come back to default slideDirection
      timer = setInterval(function() {
        index++;
  
        index = index === total ? 0 : index;
        self.slideTo( index );
      }, this[interval]);
    };
    this.slideTo = function( next ) {
      var activeItem = this.getActiveIndex(), // the current active
          orientation = slideDirection === left ? 'next' : 'prev'; //determine type
  
      bootstrapCustomEvent.call(element, slideEvent, component, slides[next]); // here we go with the slide
  
      isSliding = true;
      clearInterval(timer);
      setActivePage( next );
  
      if ( hasClass(element,'slide') && !(isIE && isIE < 10) ) {
        addClass(slides[next],orientation);
        slides[next][offsetWidth];  
        addClass(slides[next],slideDirection);
        addClass(slides[activeItem],slideDirection);
  
        setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
          isSliding = false;
  
          addClass(slides[next],active);
          removeClass(slides[activeItem],active);
  
          removeClass(slides[next],orientation);
          removeClass(slides[next],slideDirection);
          removeClass(slides[activeItem],slideDirection);
  
          if ( self[interval] && !hasClass(element,paused) ) {
            self.cycle();
          }
          bootstrapCustomEvent.call(element, slidEvent, component, slides[next]); // here we go with the slid event
  
        }, this[duration] + 100 );
      } else {
        addClass(slides[next],active);
        slides[next][offsetWidth];
        removeClass(slides[activeItem],active);
        setTimeout(function() {
          isSliding = false;
          if ( self[interval] && !hasClass(element,paused) ) {
            self.cycle();
          }
          bootstrapCustomEvent.call(element, slidEvent, component, slides[next]); // here we go with the slid event
        }, this[duration] + 100 );
      }
    };
    this.getActiveIndex = function () {
      return slides[indexOf](getElementsByClassName(element,'item active')[0]) || 0;
    };
  
    // init
    if ( !(stringCarousel in element ) ) {
  
      if ( this[pause] && this[interval] ) {
        on( element, mouseHover[0], pauseHandler );
        on( element, mouseHover[1], resumeHandler );
        on( element, 'touchstart', pauseHandler );
        on( element, 'touchend', resumeHandler );
      }
    
      rightArrow && rightArrow.addEventListener( clickEvent, controlsHandler, false);
      leftArrow && leftArrow.addEventListener( clickEvent, controlsHandler, false);
    
      indicator && indicator.addEventListener( clickEvent, indicatorHandler, false);
      this[keyboard] === true && global.addEventListener( keydownEvent, keyHandler, false);
  
      if (this.getActiveIndex()<0) {
        slides[length] && addClass(slides[0],active);
        indicators[length] && setActivePage(0);
      }
  
      if ( this[interval] ){ this.cycle(); }
      element[stringCarousel] = this;
    }
  };
  
  // CAROUSEL DATA API
  // =================
  initializeDataAPI( stringCarousel, Carousel, dataRide );
  
  
  /* Native Javascript for Bootstrap 3 | Collapse
  -----------------------------------------------*/
  
  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function( element, options ) {
    element = queryElement(element);
  
    // set options
    options = options || {};
    options.duration = parseInt(options.duration || element[getAttribute](dataDuration));
  
    this[duration] = (isIE && isIE < 10) ? 0 : (options.duration || 300); // default collapse transition duration
  
    // event targets and constants
    var accordion = null, collapse = null, self = this, 
      isAnimating = false, // when true it will prevent click handlers
      accordionData = element[getAttribute]('data-parent'),
  
      // component strings
      component = 'collapse',
      collapsed = 'collapsed',
  
      // private methods
      openAction = function(collapseElement) {
        bootstrapCustomEvent.call(collapseElement, showEvent, component);
        isAnimating = true;
        removeClass(collapseElement,component);
        addClass(collapseElement,collapsing);
        collapseElement.style[height] = '0px';
        setTimeout(function() {
          collapseElement.style[height] = getMaxHeight(collapseElement) + 'px';
        }, 10);
        setTimeout(function() {
          removeClass(collapseElement,collapsing);
          addClass(collapseElement,component);
          addClass(collapseElement,'in');
          collapseElement.style[height] = '';
          isAnimating = false;
          collapseElement[setAttribute](ariaExpanded,'true');
          bootstrapCustomEvent.call(collapseElement, shownEvent, component);
        }, self[duration]);
      },
      closeAction = function(collapseElement) {
        bootstrapCustomEvent.call(collapseElement, hideEvent, component);
        isAnimating = true;
        removeClass(collapseElement,component);
        collapseElement.style[height] = getMaxHeight(collapseElement) + 'px';
        setTimeout(function() {
          addClass(collapseElement,collapsing);
          collapseElement.style[height] = '0px';
        }, 10);
        setTimeout(function() {
          removeClass(collapseElement,collapsing);
          removeClass(collapseElement,'in');
          addClass(collapseElement,component);
          collapseElement.style[height] = '';
          isAnimating = false;
          collapseElement[setAttribute](ariaExpanded,'false');
          bootstrapCustomEvent.call(collapseElement, hiddenEvent, component);
        }, self[duration]);
      },
      getTarget = function() {
        var href = element.href && element[getAttribute]('href'),
          parent = element[getAttribute](dataTarget),
          id = href || ( parent && /#/.test(parent) ) && parent;
        return id && queryElement(id);
      };
    
    // public methods
    this.toggle = function(e) {
      e.preventDefault();
      if (isAnimating) return;
      if (!hasClass(collapse,'in')) { self.show(); } 
      else { self.hide(); }
    };
    this.hide = function() {
      closeAction(collapse);
      addClass(element,collapsed);
    };
    this.show = function() {
      openAction(collapse);
      removeClass(element,collapsed);
  
      if ( accordion !== null ) {
        var activeCollapses = getElementsByClassName(accordion,component+' in');
        for (var i=0, al=activeCollapses[length]; i<al; i++) {
          if ( activeCollapses[i] !== collapse) closeAction(activeCollapses[i]);
        }
      }
    };
  
    // init
    if ( !(stringCollapse in element ) ) {
      collapse = getTarget();
      accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
      on(element, clickEvent, this.toggle);
  
      element[stringCollapse] = this;
    }
  };
  
  // COLLAPSE DATA API
  // =================
  initializeDataAPI(stringCollapse, Collapse, dataToggle);
  
  
  /* Native Javascript for Bootstrap 3 | Dropdown
  ----------------------------------------------*/
  
  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function( element, option ) {
      
    // initialization element
    element = queryElement(element);
  
    // set option
    this.persist = option === true || element[getAttribute]('data-persist') === 'true' || false;
  
    // constants, event targets, strings
    var self = this, isOpen = false,
      parent = element[parentNode],
      component = 'dropdown', open = 'open',
      relatedTarget = null,
      menu = queryElement('.dropdown-menu', parent),
      children = nodeListToArray( menu[getElementsByTagName]('*')),
  
      // handlers
      keyHandler = function(e) {
        if (isOpen && (e.which == 27 || e.keyCode == 27)) { relatedTarget = null; hide(); } // e.keyCode for IE8
      },
      clickHandler = function(e) {
        var eventTarget = e[target], hasData;
        if (!eventTarget || !eventTarget[parentNode]) return; // invalidate
        hasData = eventTarget[getAttribute](dataToggle) || eventTarget[parentNode][getAttribute](dataToggle);
        if ( eventTarget === element || eventTarget === parent || eventTarget[parentNode] === element ) {
          e.preventDefault(); // comment this line to stop preventing navigation when click target is a link 
          relatedTarget = element;
          self.toggle();
        } else if ( isOpen ) {
          if ( (eventTarget === menu || children && children[indexOf](eventTarget) > -1) && ( self.persist || hasData ) ) {
            return;
          } else { relatedTarget = null; hide(); }
        }
        (/\#$/.test(eventTarget.href) || /\#$/.test(eventTarget[parentNode].href)) && e.preventDefault(); // should be here to prevent jumps
      },
      // private methods
      show = function() {
        bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
        addClass(parent,open);
        menu[setAttribute](ariaExpanded,true);
        bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
        on(document, keydownEvent, keyHandler);
        isOpen = true;
      },
      hide = function() {
        bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
        removeClass(parent,open);
        menu[setAttribute](ariaExpanded,false);
        bootstrapCustomEvent.call(parent, hiddenEvent, component, relatedTarget);
        off(document, keydownEvent, keyHandler);
        isOpen = false;
      };
  
    // public methods
    this.toggle = function() {
      if (hasClass(parent,open) && isOpen) { hide(); } 
      else { show(); }
    };
  
    // init
    if ( !(stringDropdown in element) ) { // initialize, make sure it's not already initialized
      menu[setAttribute]('tabindex', '0'); // Fix onblur on Chrome | Safari
      element[stringDropdown] = this;
      on(document, clickEvent, clickHandler);
    }
  };
  
  // DROPDOWN DATA API
  // =================
  initializeDataAPI( stringDropdown, Dropdown, dataToggle );
  
  
  /* Native Javascript for Bootstrap 3 | Modal
  -------------------------------------------*/
    
  // MODAL DEFINITION
  // ===============
  var Modal = function(element, options) { // element is the is the modal
  
    // the triggering button element
    element = queryElement(element);
  
    // modal
    var modal = queryElement( element[getAttribute](dataTarget)||element[getAttribute]('href') ),
  
      // strings
      component = 'modal',
      staticString = 'static',
      paddingLeft = 'paddingLeft',
      paddingRight = 'paddingRight'
      modalBackdropString = 'modal-backdrop';
  
    // set options
    options = options || {};
  
    this[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
    this[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
    this[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : this[backdrop];
    this[duration] = (isIE && isIE < 10) ? 50 : (options[duration] || parseInt(modal[getAttribute](dataDuration)) || 300); // the default modal fade duration option
    this[content]  = options[content]; // JavaScript only
  
    // bind, constants, event targets and other vars
    var self = this, open = false, relatedTarget = null,
      bodyIsOverflowing, modalIsOverflowing, scrollbarWidth, overlay,
  
      // private methods
      getWindowWidth = function() {
        var htmlRect = doc[getBoundingClientRect]();
        return global[innerWidth] || (htmlRect[right] - Math.abs(htmlRect[left]));
      },
      setScrollbar = function () {
        var bodyStyle = body.currentStyle || global.getComputedStyle(body), bodyPad = parseInt((bodyStyle[paddingRight]), 10);
        if (bodyIsOverflowing) { body.style[paddingRight] = (bodyPad + scrollbarWidth) + 'px'; }
      },
      resetScrollbar = function () {
        body.style[paddingRight] = '';
      },
      measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div'), scrollBarWidth;
        scrollDiv.className = component+'-scrollbar-measure'; // this is here to stay
        body.appendChild(scrollDiv);
        scrollBarWidth = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
        body.removeChild(scrollDiv);
        return scrollBarWidth;
      },
      checkScrollbar = function () {
        bodyIsOverflowing = body[clientWidth] < getWindowWidth();
        modalIsOverflowing = modal[scrollHeight] > doc[clientHeight];
        scrollbarWidth = measureScrollbar();
      },
      adjustDialog = function () {
        modal.style[paddingLeft] = !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth + 'px' : '';
        modal.style[paddingRight] = bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth + 'px' : '';
      },
      resetAdjustments = function () {
        modal.style[paddingLeft] = '';
        modal.style[paddingRight] = '';
      },
      createOverlay = function() {
        var newOverlay = document.createElement('div');
        overlay = queryElement('.'+modalBackdropString);
  
        if ( overlay === null ) {
          newOverlay[setAttribute]('class',modalBackdropString+' fade');
          overlay = newOverlay;
          body.appendChild(overlay);
        }
      },
      removeOverlay = function() {
        overlay = queryElement('.'+modalBackdropString); 
        if ( overlay && overlay !== null && typeof overlay === 'object' ) {
          body.removeChild(overlay); overlay = null;
        }
      },
      keydownHandlerToggle = function() {
        if (!hasClass(modal,'in')) { // element, event, handler
          on(document, keydownEvent, keyHandler);
        } else {
          off(document, keydownEvent, keyHandler);
        }
      },
      resizeHandlerToggle = function() {
        if (!hasClass(modal,'in')) {
          on(global, resizeEvent, this.update);
        } else {
          off(global, resizeEvent, this.update);
        }
      },
      dismissHandlerToggle = function() {
        if (!hasClass(modal,'in')) {
          on(modal, clickEvent, dismissHandler);
        } else {
          off(modal, clickEvent, dismissHandler);
        }
      },
      // handlers
      clickHandler = function(e) {
        var clickTarget = e[target]; 
        clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
        if ( !e.defaultPrevented && !open && clickTarget === element && !hasClass(modal,'in') ) {
          modal.modalTrigger = element;
          relatedTarget = element;
          self.show();
          e.preventDefault();
          setTimeout(function(){ e.defaultPrevented = false; }, 50);
        }
      },
      keyHandler = function(e) {
        var key = e.which || e.keyCode; // keyCode for IE8
        if (self[keyboard] && key == 27 && open) {
          self.hide();
        }
      },
      dismissHandler = function(e) {
        var clickTarget = e[target];
        if ( !e.defaultPrevented && open && (clickTarget[parentNode][getAttribute](dataDismiss) === component 
            || clickTarget[getAttribute](dataDismiss) === component
            || (clickTarget === modal && self[backdrop] !== staticString) ) ) {
          self.hide(); relatedTarget = null;
          e.preventDefault();
          setTimeout(function(){ e.defaultPrevented = false; }, 50);
        }
      };
  
    // public methods
    this.toggle = function() {
      if (open && hasClass(modal,'in')) {this.hide();} else {this.show();}
    };
    this.show = function() {
      bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);
  
      var currentOpen = getElementsByClassName(document,component+' in')[0];
      currentOpen && currentOpen !== modal && currentOpen.modalTrigger[stringModal].hide(); // we elegantly hide any opened modal
  
      if ( this[backdrop] ) {
        createOverlay();
      }
  
      if ( overlay && !hasClass(overlay,'in')) {
        setTimeout( function() { addClass(overlay,'in'); }, 0);
      }
  
      setTimeout( function() {
        modal.style.display = 'block';
  
        checkScrollbar();
        setScrollbar();
        adjustDialog();
  
        resizeHandlerToggle();
        dismissHandlerToggle();
        keydownHandlerToggle();
  
        addClass(body,component+'-open');
        addClass(modal,'in');
        modal[setAttribute](ariaHidden, false);
      }, this[duration]/2);
      setTimeout( function() {
        open = true;
        bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
      }, this[duration]);
    };
    this.hide = function() {
      bootstrapCustomEvent.call(modal, hideEvent, component);
      overlay = queryElement('.'+modalBackdropString);
  
      if ( overlay !== null ) {
        removeClass(overlay,'in');
      }
      removeClass(modal,'in');
      modal[setAttribute](ariaHidden, true);
  
      setTimeout( function() {
        removeClass(body,component+'-open');
  
        resizeHandlerToggle();
        dismissHandlerToggle();
        keydownHandlerToggle();
  
        resetAdjustments();
        resetScrollbar();
        modal.style.display = '';
      }, this[duration]/2);
  
      setTimeout( function() {
        if (!getElementsByClassName(document,component+' in')[0]) { removeOverlay(); }
        open = false;
        bootstrapCustomEvent.call(modal, hiddenEvent, component);
      }, this[duration]);
    };
    this.setContent = function( content ) {
      queryElement('.'+component+'-content',modal).innerHTML = content;
    };
    this.update = function() {
      if (open) {
        checkScrollbar();
        setScrollbar();
        adjustDialog();
      }
    };
  
    // init
    if ( !(stringModal in element) ) {
      if ( !!this[content] ) { this.setContent( this[content] ); }
      on(element, clickEvent, clickHandler);
      element[stringModal] = this;
    }
  };
  
  // DATA API
  initializeDataAPI(stringModal, Modal, dataToggle);
  
  
  /* Native Javascript for Bootstrap 3 | Popover
  ----------------------------------------------*/
  
  // POPOVER DEFINITION
  // ==================
  var Popover = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var triggerData = element[getAttribute](dataTrigger), // click / hover / focus
        animationData = element[getAttribute](dataAnimation), // true / false
        durationData = element[getAttribute](dataDuration),
        placementData = element[getAttribute](dataPlacement),
        dismissibleData = element[getAttribute](dataDismissible),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
  
        // internal strings
        component = 'popover',
        template = 'template',
        trigger = 'trigger',
        classString = 'class',
        div = 'div',
        fade = 'fade',
        title = 'title',
        content = 'content',
        dataTitle = 'data-title',
        dataContent = 'data-content',
        dismissible = 'dismissible',
        closeBtn = '<button type="button" class="close">×</button>';
  
    // set options
    options = options || {};
    this[template] = options[template] ? options[template] : null; // JavaScript only
    this[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
    this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    this[placement] = options[placement] ? options[placement] : placementData || top;
    this[delay] = parseInt(options[delay] || delayData) || 100;
    this[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
    this[duration] = (isIE && isIE < 10) ? 0 : parseInt(options[duration] || durationData) || 150;
    this[container] = queryElement(options[container]) || queryElement(containerData) || body;
    
    // bind, content
    var self = this, 
      titleString = element[getAttribute](dataTitle) || null,
      contentString = element[getAttribute](dataContent) || null;
  
    if ( !contentString && !this[template] ) return; // invalidate
  
    // constants, vars
    var popover = null, timer = 0, placementSetting = this[placement],
      
      // handlers
      dismissibleHandler = function(e) {
        if (popover !== null && e[target] === queryElement('.close',popover)) {
          self.hide();
        }
      },
  
      // private methods
      removePopover = function() {
        self[container].removeChild(popover);
        timer = null; popover = null; 
      },
      createPopover = function() {
        titleString = element[getAttribute](dataTitle); // check content again
        contentString = element[getAttribute](dataContent);
  
        popover = document.createElement(div);
  
        if ( contentString !== null && self[template] === null ) { //create the popover from data attributes
  
          popover[setAttribute]('role','tooltip');
  
          if (titleString !== null) {
            var popoverTitle = document.createElement('h3');
            popoverTitle[setAttribute](classString,component+'-title');
  
            popoverTitle.innerHTML = self[dismissible] ? titleString + closeBtn : titleString;
            popover.appendChild(popoverTitle);
          }
  
          var popoverArrow = document.createElement(div), popoverContent = document.createElement(div);
          popoverArrow[setAttribute](classString,'arrow'); popoverContent[setAttribute](classString,component+'-content');
          popover.appendChild(popoverArrow); popover.appendChild(popoverContent);
  
          //set popover content
          popoverContent.innerHTML = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;
  
        } else {  // or create the popover from template
          var popoverTemplate = document.createElement(div);
          popoverTemplate.innerHTML = self[template];
          popover.innerHTML = popoverTemplate.firstChild.innerHTML;
        }
  
        //append to the container
        self[container].appendChild(popover);
        popover.style.display = 'block';
        popover[setAttribute](classString, component+ ' ' + placementSetting + ' ' + self[animation]);
      },
      showPopover = function () {
        !hasClass(popover,'in') && ( addClass(popover,'in') );
      },
      updatePopover = function() {
        styleTip(element,popover,placementSetting,self[container]);
        if (!isElementInViewport(popover) ) { 
          placementSetting = updatePlacement(placementSetting); 
          styleTip(element,popover,placementSetting,self[container]); 
        }
      };
  
    // public methods / handlers
    this.toggle = function() {
      if (popover === null) { self.show(); } 
      else { self.hide(); }
    };
    this.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover === null) {
          placementSetting = self[placement]; // we reset placement in all cases
          createPopover();
          updatePopover();
          showPopover();
          bootstrapCustomEvent.call(element, showEvent, component);
          setTimeout(function() {
            bootstrapCustomEvent.call(element, shownEvent, component);
          }, self[duration]);
        }
      }, 20 );
    };
    this.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover && popover !== null && hasClass(popover,'in')) {
          bootstrapCustomEvent.call(element, hideEvent, component);
          removeClass(popover,'in');
          setTimeout(function() {
            removePopover();
            bootstrapCustomEvent.call(element, hiddenEvent, component);
          }, self[duration]);
        }
      }, self[delay] );
    };
  
    // init
    if ( !(stringPopover in element) ) {
      if (self[trigger] === hoverEvent) {
        on( element, mouseHover[0], self.show );
        if (!self[dismissible]) { on( element, mouseHover[1], self.hide ); }
      } else if (/^(click|focus)$/.test(self[trigger])) {
        on( element, self[trigger], self.toggle );
        if (!self[dismissible]) { on( element, 'blur', self.hide ); }
      }
      
      if (self[dismissible]) { on( document, clickEvent, dismissibleHandler ); }
    
      // dismiss on window resize
      if ( !(isIE && isIE < 9) ) { on( global, resizeEvent, self.hide ); }
  
      element[stringPopover] = self;
    }
  };
  
  // POPOVER DATA API
  // ================
  initializeDataAPI(stringPopover, Popover, dataToggle);
  
  
  /* Native Javascript for Bootstrap 3 | ScrollSpy
  -----------------------------------------------*/
  
  // SCROLLSPY DEFINITION
  // ====================
  var ScrollSpy = function(element, options) {
  
    // initialization element, the element we spy on
    element = queryElement(element); 
  
    // DATA API
    var targetData = queryElement(element[getAttribute](dataTarget));
  
    // set options
    options = options || {};
    if ( !options[target] && !targetData ) { return; } // invalidate
  
    // event targets, constants
    var spyTarget = options[target] && queryElement(options[target]) || targetData,
        links = spyTarget && spyTarget[getElementsByTagName]('A'), 
        items = [], targetContainers = [], scrollOffset,
        scrollTarget = element[offsetHeight] < element[scrollHeight] ? element : global, // determine which is the real scrollTarget
        isWindow = scrollTarget === global;  
  
    // populate items and targets
    for (var i=0, il=links[length]; i<il; i++) {
      var href = links[i][getAttribute]('href'), 
          targetContainer = href && /#[a-z0-9]+$/i.test(href) && queryElement(href);
      if ( !!targetContainer ) {
        items.push(links[i]);
        targetContainers.push(targetContainer);
      }
    }
  
    // private methods
    var updateItem = function(index) {
        var parent = items[index][parentNode], // item's parent LI element
          targetElement = targetContainers[index], // the menu item targets this element
          parentTargetOffsetTop = !isWindow && targetContainers[indexOf](targetElement[parentNode]) > -1 ? targetElement[parentNode][offsetTop] : 0,
          targetRect = isWindow && targetElement[getBoundingClientRect](),
  
          isActive = hasClass(parent,active) || false,
          topEdge = isWindow ? targetRect[top] + scrollOffset : targetElement[offsetTop] + parentTargetOffsetTop,
  
          bottomEdge = isWindow ? targetRect[bottom] + scrollOffset : topEdge + targetElement[offsetHeight],
          inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;
  
        if ( !isActive && inside ) {
          if ( parent.tagName === 'LI' && !hasClass(parent,active) ) {
            addClass(parent,active);
            isActive = true;
            bootstrapCustomEvent.call(element, 'activate', 'scrollspy', items[index]);
          }
        } else if ( !inside ) {
          if ( parent.tagName === 'LI' && hasClass(parent,active) ) {
            removeClass(parent,active);
            isActive = false;
          }
        } else if ( !inside && !isActive || isActive && inside ) {
          return;
        }
      },
      updateItems = function(){
        scrollOffset = isWindow ? getScroll().y : element[scrollTop];
        for (var index=0, itl=items[length]; index<itl; index++) {
          updateItem(index)
        }
      };
  
    // public method
    this.refresh = function () {
      updateItems();
    }
  
    // init
    if ( !(stringScrollSpy in element) ) {
      this.refresh();
      on( scrollTarget, scrollEvent, this.refresh );
      if ( !(isIE && isIE < 9)) { 
        on( global, resizeEvent, this.refresh ); 
      }
      element[stringScrollSpy] = this;
    }
  };
  
  // SCROLLSPY DATA API
  // ==================
  initializeDataAPI(stringScrollSpy, ScrollSpy, dataSpy);
  
  
  /* Native Javascript for Bootstrap 3 | Tab
  -----------------------------------------*/
  
  // TAB DEFINITION
  // ==============
  var Tab = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var durationData = element[getAttribute](dataDuration),
        heightData = element[getAttribute](dataHeight),
      
      // strings
      component = 'tab', height = 'height', isAnimating = 'isAnimating';
  
    // set default animation state
    element[isAnimating] = false;
  
    // set options
    options = options || {};
    this[duration] = (isIE && isIE < 10)  ? 0 : parseInt(options[duration] || durationData) || 150; // default tab transition duration
    this[height] = (isIE && isIE < 10)  ? false : (options[height] || heightData === 'true') || false; // filter legacy browsers
  
    // bind, event targets
    var self = this, next,
      tabs = getClosest(element,'.nav'),
      tabsContentContainer,
      dropdown = queryElement('.dropdown',tabs);
      
  
    // private methods
    var getActiveTab = function() {
        var activeTabs = getElementsByClassName(tabs,active), activeTab;
        if ( activeTabs[length] === 1 && !hasClass(activeTabs[0],'dropdown') ) {
          activeTab = activeTabs[0];
        } else if ( activeTabs[length] > 1 ) {
          activeTab = activeTabs[activeTabs[length]-1];
        }
        return activeTab[getElementsByTagName]('A')[0];
      },
      getActiveContent = function() {
        return queryElement(getActiveTab()[getAttribute]('href'));
      },
      // handler 
      clickHandler = function(e) {
        e.preventDefault();
        next = e[target];
        self.show();
      };
  
    // public method
    this.show = function() { // the tab we clicked is now the next tab
      var nextContent = queryElement(next[getAttribute]('href')), //this is the actual object, the next tab content to activate
        activeTab = getActiveTab(), activeContent = getActiveContent();
      
      if ( (!activeTab[isAnimating] || !next[isAnimating]) && !hasClass(next[parentNode],active) ) {
        activeTab[isAnimating] = next[isAnimating] = true;
        removeClass(activeTab[parentNode],active);
        addClass(next[parentNode],active);
  
        if ( dropdown ) {
          if ( !hasClass(element[parentNode][parentNode],'dropdown-menu') ) {
            if (hasClass(dropdown,active)) removeClass(dropdown,active);
          } else {
            if (!hasClass(dropdown,active)) addClass(dropdown,active);
          }
        }
        
        if (tabsContentContainer) tabsContentContainer.style[height] = getMaxHeight(activeContent) + 'px'; // height animation
  
        bootstrapCustomEvent.call(activeTab, hideEvent, component, next);
  
        setTimeout(function() {
          removeClass(activeContent,'in');
        }, 10);
  
        setTimeout(function() {
          if (tabsContentContainer) addClass(tabsContentContainer,collapsing);
          removeClass(activeContent,active);
          addClass(nextContent,active);
          setTimeout(function() {
            addClass(nextContent,'in');
          }, 10);
  
          bootstrapCustomEvent.call(next, showEvent, component, activeTab);
          bootstrapCustomEvent.call(activeTab, hiddenEvent, component, next);
  
          if(tabsContentContainer) tabsContentContainer.style[height] = getMaxHeight(nextContent) + 'px'; // height animation
        }, self[duration]*.7);
  
        setTimeout(function() {
          bootstrapCustomEvent.call(next, shownEvent, component, activeTab);
  
          if (tabsContentContainer) { // height animation
            removeClass(tabsContentContainer,collapsing);
            tabsContentContainer.style[height] =  ''; 
          }
          activeTab[isAnimating] = next[isAnimating] = false;
        }, self[duration]*1.5);
      }
    };
  
    // init
    if ( !(stringTab in element) ) {
      if (this[height]) { tabsContentContainer = getActiveContent()[parentNode]; }
      on(element, clickEvent, clickHandler);
      element[stringTab] = this;
    }
  };
  
  // TAB DATA API
  // ============
  initializeDataAPI(stringTab, Tab, dataToggle);
  
  
  /* Native Javascript for Bootstrap 3 | Tooltip
  ---------------------------------------------*/
  
  // TOOLTIP DEFINITION
  // ==================
  var Tooltip = function( element,options ) {
  
    // initialization element
    element = queryElement(element);
  
    // DATA API
    var animationData = element[getAttribute](dataAnimation);
        placementData = element[getAttribute](dataPlacement);
        durationData = element[getAttribute](dataDuration);
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
        
        // strings
        component = 'tooltip',
        classString = 'class',
        title = 'title',
        fade = 'fade',
        div = 'div';
  
    // set options
    options = options || {};
    this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    this[placement] = options[placement] ? options[placement] : placementData || top;
    this[delay] = parseInt(options[delay] || delayData) || 100;
    this[duration] = (isIE && isIE < 10) ? 0 : parseInt(options[duration] || durationData) || 150;
    this[container] = queryElement(options[container]) || queryElement(containerData) || body;
  
    // bind, event targets, title and constants
    var self = this, timer = 0, placementSetting = this[placement], tooltip = null,
      titleString = element[getAttribute](title) || element[getAttribute](dataOriginalTitle);
  
    if ( !titleString ) return; // invalidate
  
    // private methods
    var removeToolTip = function() {
        self[container].removeChild(tooltip);
        tooltip = null; timer = null;
      },
      createToolTip = function() {
        titleString = element[getAttribute](title) || element[getAttribute](dataOriginalTitle); // read the title again
        tooltip = document.createElement(div);
        tooltip[setAttribute]('role',component);
  
        var tooltipArrow = document.createElement(div), tooltipInner = document.createElement(div);
        tooltipArrow[setAttribute](classString, component+'-arrow'); tooltipInner[setAttribute](classString,component+'-inner');
  
        tooltip.appendChild(tooltipArrow); tooltip.appendChild(tooltipInner);
  
        tooltipInner.innerHTML = titleString;
  
        self[container].appendChild(tooltip);
        tooltip[setAttribute](classString, component + ' ' + placementSetting + ' ' + self[animation]);
      },
      updateTooltip = function () {
        styleTip(element,tooltip,placementSetting,self[container]);
        if (!isElementInViewport(tooltip) ) { 
          placementSetting = updatePlacement(placementSetting); 
          styleTip(element,tooltip,placementSetting,self[container]); 
        }
      },
      showTooltip = function () {
        !hasClass(tooltip,'in') && ( addClass(tooltip,'in') );
      };
  
    // public methods
    this.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip === null) {
          placementSetting = self[placement]; // we reset placement in all cases
          createToolTip();
          updateTooltip();
          showTooltip();
          bootstrapCustomEvent.call(element, showEvent, component);
          setTimeout(function() {
            bootstrapCustomEvent.call(element, shownEvent, component);
          }, self[duration]);
        }
      }, 20 );
    };
    this.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip && tooltip !== null && hasClass(tooltip,'in')) {
          bootstrapCustomEvent.call(element, hideEvent, component);
          removeClass(tooltip,'in');
          setTimeout(function() {
            removeToolTip();
            bootstrapCustomEvent.call(element, hiddenEvent, component);
          }, self[duration]);
        }
      }, self[delay]);
    };
    this.toggle = function() {
      if (!tooltip) { self.show(); } 
      else { self.hide(); }
    };
  
    // init
    if ( !(stringTooltip in element) ) {
      element[setAttribute](dataOriginalTitle,titleString);
      element.removeAttribute(title);
      on(element, mouseHover[0], this.show);
      on(element, mouseHover[1], this.hide);
      element[stringTooltip] = this;
    }
  };
  
  // TOOLTIP DATA API
  // =================
  initializeDataAPI(stringTooltip, Tooltip, dataToggle);
  
  
  return {
    Affix: Affix,
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    ScrollSpy: ScrollSpy,
    Tab: Tab,
    Tooltip: Tooltip
  };
}));
