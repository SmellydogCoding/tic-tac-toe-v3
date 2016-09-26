var Game = (function GamePlay() {

  var init = function(){
    Players.setPlayerTwo();
    Board.clearBoard();
    start();
  };

  var repeat = false;
  var type;

  var gameTypeScreen = '<div class="screen screen-start" id="type">';
  gameTypeScreen += '<header>';
  gameTypeScreen += '<h1>Tic Tac Toe</h1>';
  gameTypeScreen += '<p class="intro">Please Choose Your Game Type:</p>'
  gameTypeScreen += '<a id="1player" href="#" class="button">1 Player Game<br><span class="subtitle">player vs. computer</span></a>'
  gameTypeScreen += '<a id="2player" href="#" class="button">2 Player Game<br><span class="subtitle">player vs. player</span></a>'
  gameTypeScreen += '</header>';
  gameTypeScreen += '</div>';

  var buildStartScreen = function() {
    var startScreen = '<div class="screen screen-start" id="start">';
    startScreen += '<header>';
    startScreen += '<h1>Tic Tac Toe</h1>';
    startScreen += '<p class="intro">Please Enter Your ';
    if (type === 1) {
      startScreen += 'Name:';
    } else if (type === 2) {
      startScreen += 'Names:';
    }
    startScreen += '</p>';
    startScreen += '<input type="text" name="player1" placeholder="Player 1" class="button">';
    if (type === 2) {
      startScreen += '<input type="text" name="player2" placeholder ="Player 2" class="button">';
    }
    startScreen += '<a id="startGame" href="#" class="button">Start Game</a>';
    startScreen += '</header>';
    startScreen += '</div>';
    return startScreen;
  };

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
  };

  var gameEndScreen = function(result) {
    var players = Players.getPlayers();
    var gameOver;
    if (result === 'wino') {
    gameOver = '<div class="screen screen-win screen-win-one" id="finish">';
    } else if (result === 'winx') {
      gameOver = '<div class="screen screen-win screen-win-two" id="finish">';
    } else if (result === 'tie') {
      gameOver = '<div class="screen screen-win screen-win-tie" id="finish">';
    }
    gameOver += '<header>';
    gameOver += '<h1>Tic Tac Toe</h1>';
    if (result === 'winx' || result === 'wino') {
      gameOver += '<p class="message">Winner:<br>' + players.current.name + '</p>';
    } else {
      gameOver += '<p class="message">It\'s a Tie!</p>';
    }
    gameOver += '<a id="newGame" href="#" class="button">New game</a>';
    gameOver += '</header>';
    gameOver += '</div>';
    return gameOver;
  };

  var start = function() {
    if (repeat) {
      $('#finish').detach();
    }
      renderHTML('body',gameTypeScreen);
      setGameTypeButtons();
  };

   var setGameTypeButtons = function() {
    $('#1player').click(function(){
      type = 1;
      setGameType();
    });
    $('#2player').click(function(){
      type = 2;
      setGameType();
    });
  };

  var setGameType = function() {
    $("#type").detach();
    var startPage = buildStartScreen();
    renderHTML('body',startPage);
    getNames();
  };

  var getNames = function() {
    $('#startGame').click(function(event) {
      $('input[name=player1],input[name=player2]').removeClass('inputError');
      $('.intro').removeClass('textError');
      if ($('input[name=player1]').val() === '' || ($('input[name=player2]').val() === '') && type === 2) {
        event.preventDefault();
        if ($('input[name=player1]').val() === '') {
          $('input[name=player1]').addClass('inputError');
        } 
        if ($('input[name=player2]').val() === '' && type === 2) {
          $('input[name=player2]').addClass('inputError');
        }
        $('.intro').addClass('textError');
      } else {
        var player1 = $('input[name=player1]').val();
        if (type === 2) {
          var player2 = $('input[name=player2]').val();
        } else var player2 = 'Computer';
        Players.setPlayerNames(player1,player2);
        $("#start").detach();
        renderHTML('body',Board.getInitialBoard);
        $('.player1').html(player1);
        $('.player2').html(player2);
        move();
      }
    });
  };

  var move = function() {
    renderCurrentPlayer();
    hoverCurrent();
    setMarker();
  };

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
  };

  var afterMove = function() {
    var result = Board.status();
    var players = Players.getPlayers(); 
    if (result === "winx" || result === "wino" || result === "tie") {
      $('#board').detach();
      renderHTML('body',gameEndScreen(result));
      $('#newGame').click(function() {
        repeat = true;
        init();
      });
    } else {
      Players.changePlayers();
      // console.log(players.current.name === 'Computer');
      if(type === 1 && players.current.name === 'Computer') {
        AI.computerMove();
        afterMove();
      } else {
        move();
      }
    }
  };

  return {
    init: init
  };
})();