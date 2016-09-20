function UI(players,board) {
  Players.call(this,players);
  Board.call(this,board);
  this.startScreen = '<div class="screen screen-start" id="start">'
  this.startScreen += '<header>'
  this.startScreen += '<h1>Tic Tac Toe</h1>'
  this.startScreen += '<a id="startGame" href="#" class="button">Start Game</a>'
  this.startScreen += '</header>'
  this.startScreen += '</div>'
}

UI.prototype = Object.create(Players.prototype);
UI.prototype = Object.create(Board.prototype);

UI.prototype.startButtonEvent = function() {
  var ui = this;
  $('#startGame').click(function(){
    $("#start").detach();
    ui.renderHTML('body',ui.initialBoard);
    ui.renderCurrentPlayer();
  });
}

UI.prototype.renderHTML = function(target,html) {
  $(target).html(html);
};

UI.prototype.renderCurrentPlayer = function() {
  if(this.current === this.player1) {
    $('#player1').addClass('active');
  } else {
    $('#player2').addClass('active');
  }
  this.hoverCurrent();
};

UI.prototype.hoverCurrent = function() {
  var marker = "img/o.svg";
  if (this.current === this.player2) {
    marker = "img/x.svg";
  }
  $('.boxes li').hover(function(){
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
      $(this).css('background-image','url(' + marker + ')');
    }
  },
  function() {
    $(this).css('background-image','none');
  }
  );
}