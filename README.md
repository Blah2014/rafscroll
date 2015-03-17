<a name="rafscroll"></a>
#class: rafscroll
**Members**

* [class: rafscroll](#rafscroll)
  * [new rafscroll()](#new_rafscroll)
  * [rafscroll.subscribe()](#rafscroll.subscribe)
  * [rafscroll.unsubscribe()](#rafscroll.unsubscribe)

<a name="new_rafscroll"></a>
##new rafscroll()
Offloads your scroll events onto a requestAnimationFrame. This is useful,
sometimes, when you want to achieve smoother animations on scroll.

### Why would you need a requestAnimationFrame?
Your browser refreshes at 60 frames per second (fps). Scroll events, on the
other hand, do not. Chaining your scroll events to a requestAnimationFrame
ensures that your transitions and animations will refresh each time the
refreshes, rather than each time a scroll event is fired.

**Example**  
var smoothScroll = new rafscroll(function(e) {
  console.log(e); // the last known scroll event.
});

<a name="rafscroll.subscribe"></a>
##rafscroll.subscribe()
Subscribe (or re-subscribe) to the scroll events. This gets called
automatically when the constructor is first invoked, so there's is
usually no need for a developer to access the method.

**Example**  
var smoothScroll = new rafscroll(function(e) {
  console.log(e);
});

smoothScroll.unsubscribe(); // unsubsribe from scroll events.
smoothScroll.subscribe(); // re-subsribe from scroll events.

<a name="rafscroll.unsubscribe"></a>
##rafscroll.unsubscribe()
**Example**  
var smoothScroll = new rafscroll(function(e) {
  console.log(e);
});

smoothScroll.unsubscribe(); // unsubsribe from scroll events.

