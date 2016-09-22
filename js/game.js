var Game = (function GamePlay() {

  var init = function(){
    Players.setPlayerTwo();
    Board.clearBoard();
    start();
  };

  var startScreen = '<div class="screen screen-start" id="start">';
  startScreen += '<header>';
  startScreen += '<h1>Tic Tac Toe</h1>';
  startScreen += '<a id="startGame" href="#" class="button">Start Game</a>';
  startScreen += '</header>';
  startScreen += '</div>';

  var renderHTML = function(target,html) {
    $(target).html(html);
  };

  var renderCurrentPlayer = function() {
    $('#player1,#player2').removeClass('active');
    var players = Players.getPlayers();
    if (players.current === players.player1) {
      $('#player1').addClass('active');
    } else {
      $('#player2').addClass('active');
    }
  };

  var hoverCurrent = function() {
    var players = Players.getPlayers();
    var hoverMarker;
    if (players.current === players.player1) {
      hoverMarker = "img/o.svg";
    } else if (players.current === players.player2) {
      hoverMarker = "img/x.svg";
    }
    $('.boxes li').unbind();
    $('.boxes li').hover(function() {
      if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        $(this).css('background-image','url(' + hoverMarker + ')');
      }
    }, function() {
      if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        $(this).css('background-image','none');
      }
    });
  }

  var setMarker = function() {
    var players = Players.getPlayers();
    var marker;
    if (players.current === players.player1) {
      marker = 'box-filled-1';
    } else if (players.current === players.player2) {
      marker = 'box-filled-2';
    }
    $('.boxes li').click(function(){
      if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        $(this).addClass(marker);
        afterMove();
      }
    });
  }

  var gameEndScreen = function(result) {
    var players = Players.getPlayers();
    var gameOver;
    if (result === 'win' && players.current === players.player1) {
    gameOver = '<div class="screen screen-win screen-win-one" id="finish">';
    } else if (result === 'win' && players.current === players.player2) {
      gameOver = '<div class="screen screen-win screen-win-two" id="finish">';
    } else if (result === 'tie') {
      gameOver = '<div class="screen screen-win screen-win-tie" id="finish">';
    }
    gameOver += '<header>';
    gameOver += '<h1>Tic Tac Toe</h1>';
    if (result === 'win') {
      gameOver += '<p class="message">Winner</p>';
    } else {
      gameOver += '<p class="message">It\'s a Tie!</p>';
    }
    gameOver += '<a id="newGame" href="#" class="button">New game</a>';
    gameOver += '</header>';
    gameOver += '</div>';
    return gameOver;
  }

  var start = function(repeat) {
    if (repeat) {
      $('#finish').detach();
      renderHTML('body',Board.getInitialBoard);
      move();
    } else {
      renderHTML('body',startScreen);
      $('#startGame').click(function(){
        $("#start").detach();
        renderHTML('body',Board.getInitialBoard);
        move();
      });
    }
  };

  var move = function() {
    renderCurrentPlayer();
    hoverCurrent();
    setMarker();
  };

  var afterMove = function() {
    var result = Board.status();
    if (result === "win" || result === "tie") {
      $('#board').detach();
      renderHTML('body',gameEndScreen(result));
      $('#newGame').click(function() {
        start(true);
      });
    } else {
      Players.changePlayers();
      move();
    }
  };

  return {
    init: init
  };
})();