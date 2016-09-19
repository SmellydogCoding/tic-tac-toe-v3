!function() {
  "use strict";
  var ui = new UI;
  var board = new Board;
  ui.renderHTML('body',ui.startScreen);
  ui.startButtonEvent(ui,board);
}();