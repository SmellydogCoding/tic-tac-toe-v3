function UI() {
  this.startScreen = '<div class="screen screen-start" id="start">'
  this.startScreen += '<header>'
  this.startScreen += '<h1>Tic Tac Toe</h1>'
  this.startScreen += '<a id="startGame" href="#" class="button">Start game</a>'
  this.startScreen += '</header>'
  this.startScreen += '</div>'
}

UI.prototype.startButtonEvent = function(ui,board) {
  $('#startGame').click(function(){
    $("#start").detach();
    ui.renderHTML('body',board.initialBoard);
  });
}

UI.prototype.renderHTML = function(target,html) {
  $(target).html(html);
};