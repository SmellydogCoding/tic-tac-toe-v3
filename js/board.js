var Board = (function() {
  "use strict";
  
  var gameboard = [];
  // all of the possible 'three in a row' combinations
  var winningRoutes = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];

  // HTML code block for the board at game start
  var initialBoardHTML = '<div class="board" id="board">';
  initialBoardHTML += '<header>';
  initialBoardHTML += '<h1>Tic Tac Toe</h1>';
  initialBoardHTML += '<ul>';
  initialBoardHTML += '<li class="players" id="player1">';
  initialBoardHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>';
  initialBoardHTML += '<span class="player1"></span></li>';
  initialBoardHTML += '<li class="players" id="player2">';
  initialBoardHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>';
  initialBoardHTML += '<span class="player2"></span></li>';
  initialBoardHTML += '</ul>';
  initialBoardHTML += '</header>';
  initialBoardHTML += '<ul class="boxes">';
  for(var s = 0; s < 9; s++) {
    initialBoardHTML += '<li class="box" data-square="' + s + '"></li>';
  }
  initialBoardHTML += '</ul>';
  initialBoardHTML += '</div>';

  // clear the game board at the start of a new game
  var init = function() {
    gameboard = [];
  };

  // export game board code block
  var getInitialBoard = function() {
    return initialBoardHTML;
  };

  // export current game board
  var getBoard = function() {
    return gameboard;
  };

  // parse the on-screen board for x and o and update the game board
  var boardContents = function() {
    $('.boxes li').each(function(){
      var index = parseInt($(this).attr('data-square'));
      if ($(this).hasClass('box-filled-1')) {
        gameboard[index] = 'o';
      } else if ($(this).hasClass('box-filled-2')) {
        gameboard[index] = 'x';
      } else {
        gameboard[index] = '';
      }
    });
  };

  // logic to check if a board (which could be either the game board and minimax board) has a win or tie
  var winningBoard = function (eitherboard) {
    var result = 'game in progress';
    for (var i = 0; i < winningRoutes.length; i++) {
      if (eitherboard[winningRoutes[i][0]] === 'x' && eitherboard[winningRoutes[i][1]] === 'x' && eitherboard[winningRoutes[i][2]] === 'x') {
        result = 'winx';
        break;
      } else if (eitherboard[winningRoutes[i][0]] === 'o' && eitherboard[winningRoutes[i][1]] === 'o' && eitherboard[winningRoutes[i][2]] === 'o') {
        result = 'wino';
        break;
      }   
    }
    if (eitherboard.indexOf('') === -1 && result !== 'winx' && result !== 'wino') {
        result = 'tie';
    }
    return result;
  };

  // update the game board and check for a win or tie after a move
  var status = function() {
    boardContents();
    var result = winningBoard(gameboard);
    return result;
  };

  // update the minimax board and check for a win or tie after a move
  var checkAIBoard = function(aiboard) {
    var airesult = winningBoard(aiboard);
    return airesult;
  };

  // export the following functions for use in the game module and ai module
  return {
    init: init,
    getInitialBoard: getInitialBoard,
    getBoard: getBoard,
    status: status,
    checkAIBoard: checkAIBoard
  };
})();