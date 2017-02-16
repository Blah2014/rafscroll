# rafscroll.js
rafscroll chains your scroll events to requestAnimationFrame.

Your monitor refreshes at 60 frames per second (fps). Scroll
events, on the other hand, do not. Chaining your scroll events to a
requestAnimationFrame ensures that your transitions and animations will refresh
each time the monitor refreshes, rather than each time a scroll event is fired.

This is not a magic fix for smooth scrolling animations. In fact, sometimes
regular old scroll events are smoother. But this is an easy way to test that out.

To use the script, take one of the files from the /dist/ folder and drop it into
your site. I've compiled two versions, one with a polyfill and one without. If
you're unsure which version to use, use rafscroll.polyfill.min.js.

    <script src="rafscroll.polyfill.min.js"></script>

After you've loaded the script you can invoke it like this.

    new rafscroll(function() {
      // Do your thing here.
    });

## Parameters

### Callback
{Function} A callback function is the first argument. This will get invoked on
each animation frame.

Example:

    new rafscroll(someFunction);

It will be passed the last known scroll event as the first argument.

Example:

    new rafscroll(function(e) {
      console.log(e); // Last known scroll event.
    });

## Methods

### rafscroll.unsubscribe()
    var smoothScroll = new rafscroll(function(e) {
      console.log(e);
    });

    smoothScroll.unsubscribe(); // unsubsribe from scroll events.

### rafscroll.subscribe()
Subscribe (or re-subscribe) to the scroll events. This gets called automatically
when the constructor is first invoked, so there's is usually no need for a
developer to access the method.

    var smoothScroll = new rafscroll(function(e) {
      console.log(e);
    });

    smoothScroll.unsubscribe(); // unsubsribe from scroll events.
    smoothScroll.subscribe(); // re-subsribe from scroll events.

## Module Loaders
This script supports amd, CommonJS, or (if all else fails) creates a global
namespace. The tutorials written above show you how to invoke the function using
a global namespace. Here's how you can use it with a module loader.

amd:

    require(['rafscroll'], function(rafscroll) {
      new rafscroll(someFunction);
    });

CommonJS:

    var rafscroll = require('rafscroll');

    new rafscroll(someFunction);
