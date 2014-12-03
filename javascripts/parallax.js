(function() {
  /*
    How To Impress Your Friends In 2014, or Write Plain Javascript Without Libraries!

    By Johan Brook (@johanbrook), 2014.
  */

  // From Underscore
  var throttle = function(wait, func, options) {
    var context, args, result
    var timeout = null
    var previous = 0
    if (!options) options = {}
    var later = function() {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      var now = Date.now()
      if (!previous && options.leading === false) previous = now
      var remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout)
        timeout = null
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  }

  var isTouch = function() {
    var platform = navigator.platform.toLowerCase()
    return platform.indexOf('ipad') != -1  ||  platform.indexOf('iphone') != -1
  }

  var transform = function(el, offset) {
    el.style.webkitTransform = "translate3d(0, " + offset + "px, 0)";
    el.style.MozTransform = "translate3d(0, " + offset + "px, 0)";
    el.style.msTransform = "translateY(" + offset + "px)";
    el.style.OTransform = "translate3d(0, " + offset + "px, 0)";
    el.style.transform = "translate3d(0, " + offset + "px, 0)";
  }

  var parallaxThis = function() {
    var logo = document.querySelector('.parallax-logo'),
        header = document.querySelector('.parallax-header')

    var scrollHandler = throttle(100, function(e) {
      var val = Math.max(window.pageYOffset, 0),
          offset = -(val * 0.5),
          opacity = (1 - (val / 500))

      logo.style.opacity = opacity
      header.style.opacity = opacity*1.5

      transform(logo, offset*1.5)
      transform(header, offset)
    })

    document.addEventListener('scroll', scrollHandler, false)
  }

  var init = function(){
    if(!isTouch()) {
      document.body.classList.add('no-touch');
      parallaxThis()
    }
    else {
      document.body.classList.add('touch');
    }

  }


  document.addEventListener('DOMContentLoaded', init)

})();
