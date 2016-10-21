var EventManager, Events,
  _this = this;

EventManager = new EventEmitter();

Events = {
  CLOSE_EVENT: "Close Event",
  SLIDE_EVENT_CLICK: "On Slide Click",
  WINDOW_RESIZE: "On Window Resize",
  KEYBOARD_EVENT: "On Key Press"
};

(function() {
  var MIN_HEIGHT, MIN_WIDTH;
  MIN_WIDTH = 1024;
  MIN_HEIGHT = 768;
  window.onkeydown = function(event) {
    return EventManager.emitEvent(Events.KEYBOARD_EVENT, [event]);
  };
  return window.onresize = function(e) {
    return EventManager.emitEvent(Events.WINDOW_RESIZE, [e]);
  };
})();
