!function() {
  "use strict";
  var ui = new UI;
  var board = new Board;
  var players = new Players('o');
  ui.renderHTML('body',ui.startScreen);
  ui.startGame();
}();