# rafscroll.js
rafscroll offloads your scroll events onto a requestAnimationFrame.

## Why do I need this?
Your monitor refreshes at 60 frames per second (fps). Scroll
events, on the other hand, do not. Chaining your scroll events to a
requestAnimationFrame ensures that your transitions and animations will refresh
each time the monitor refreshes, rather than each time a scroll event is fired.

## How do I use it?
In it's most simple form, you can use it like this:

    new rafscroll(function() {
      // Do your thing here.
    });

## Parameters

### Callback
{Function} A callback function is the first argument. This will get invoked on
each animation frame.

Example:

    new rafscroll(someFunction);

It will be passed the last known scroll event as the first
argument.

Example:

    new rafscroll(function(e) {
      console.log(e); // Last known scroll event.
    });

### Context
{Object} Just an easy way to bind this function to the desired scope.

Example:

    new rafscroll(someFunction, this);

### Arguments
{Array} In case you need to pass additional arguments

Example:

    new rafscroll(someFunction, this, [someVar, someOtherVar]);

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

