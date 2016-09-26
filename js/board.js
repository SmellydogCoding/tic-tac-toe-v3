var Board = (function Board() {
  
  var board = [];
  var winningRoutes = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]
  var result = 'game in progress';
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
  for(s = 0; s < 9; s++) {
    initialBoardHTML += '<li class="box" data-square="' + s + '"></li>';
  }
  initialBoardHTML += '</ul>';
  initialBoardHTML += '</div>';

  var clearBoard = function() {
    board = [];
    result = 'game in progress';
  }

  var getInitialBoard = function() {
    return initialBoardHTML;
  }

  var getBoard = function() {
    return board;
  }

  var getWinningRoutes = function() {
    return winningRoutes;
  }

  var boardContents = function() {
    $('.boxes li').each(function(){
      var index = parseInt($(this).attr('data-square'));
      if ($(this).hasClass('box-filled-1')) {
        board[index] = 'o';
      } else if ($(this).hasClass('box-filled-2')) {
        board[index] = 'x';
      } else {
        board[index] = '';
      }
    });
  }

  var winningBoard = function (board) {
    for (var i = 0; i < winningRoutes.length; i++) {
      if (board[winningRoutes[i][0]] === "x" && board[winningRoutes[i][1]] === "x" && board[winningRoutes[i][2]] === "x") {
        return result = 'winx';
      } else if (board[winningRoutes[i][0]] === "o" && board[winningRoutes[i][1]] === "o" && board[winningRoutes[i][2]] === "o") {
        return result = 'wino';
      }
    }
  }

  var tieBoard = function() {
    if (($.inArray('', board) > -1) === false) {
      return result = 'tie';
    }
  }

  var status = function() {
    boardContents();
    winningBoard(board);
    if (result !== 'winx' && result !== 'wino') {
      tieBoard();
    }
    return result;
  }

  var checkAIBoard = function(mmboard) {
    console.log(mmboard);
    var result;
    result = winningBoard(mmboard);
    if (result !== 'winx' && result !== 'wino') {
     result = tieBoard(mmboard);
    }
    if (result !== 'winx' && result !== 'wino' & result !== 'tie') {
      result = 'in progress'
    }
    console.log(result);
    return result;
  }

  return {
    clearBoard: clearBoard,
    getInitialBoard: getInitialBoard,
    getBoard: getBoard,
    getWinningRoutes: getWinningRoutes,
    status: status,
    winningBoard: winningBoard,
    checkAIBoard: checkAIBoard
  }
})();