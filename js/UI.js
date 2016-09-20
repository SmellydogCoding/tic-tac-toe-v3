function UI(players,board,codeBlock) {
  Players.call(this,players);
  Board.call(this,board);
  CodeBlocks.call(this,codeBlock);
}

UI.prototype.startGame = function() {
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
  $('#player1,#player2').removeClass('active');
  if(this.current === this.player1) {
    $('#player1').addClass('active');
  } else {
    $('#player2').addClass('active');
  }
  this.hoverCurrent();
  this.setMarker();
};

UI.prototype.hoverCurrent = function() {
  var marker = "img/o.svg";
  if (this.current === this.player2) {
    marker = "img/x.svg";
  }
  $('.boxes li').unbind();
  $('.boxes li').hover(function(){
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
      $(this).css('background-image','url(' + marker + ')');
    }
  },
  function() {
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
      $(this).css('background-image','none');
    }
  }
  );
}

UI.prototype.setMarker = function() {
  var ui = this;
  var marker;
  if (this.current === this.player1) {
    marker = 'box-filled-1';
  } else {
    marker = 'box-filled-2';
  }

  $('.boxes li').click(function(){
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
      $(this).addClass(marker);
      ui.status();
      ui.betweenMoves();
    }
  });
}

UI.prototype.betweenMoves = function() {
  if (this.winner === true) {
    $('#board').detach();
    if (this.current === this.player1) {
      this.renderHTML('body',this.winnerO);
    } else {
      this.renderHTML('body',this.winnerX);
    }
  } else {
    this.changePlayers();
    this.renderCurrentPlayer();
  }
}

