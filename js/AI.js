var AI = (function(){
  
  var current;
  var winningRoutes = Board.getWinningRoutes;
  var bestChoice;
  
  var computerMove = function() {
    // console.log('AI');
    var board = Board.getBoard();
    current = 'x';
    minimax(board,0);
    console.log(bestChoice);
    $('li[data-square="' + bestChoice + '"]').addClass('box-filled-2').css('background-image','url("img/x.svg")');
  };

  var getAvailableMoves = function() {
    var moves = [];
    for(a = 0; a < board.length; a++) {
      if (board[a] === '') {
        moves.push(a);
      }
    }
    return moves;
  }
  
  var score = function(board,depth) {
    var winner = Board.checkAIBoard(board);
    if (winner === 'x') {
      return 10 - depth;
    } else if (winner === 'o') {
      return depth - 10;
    } else {
      return 0;
    }
  }

  var testMove = function(move,mmboard) {
    mmboard[move] = current;
    return mmboard;
  }

  var changePlayer = function() {
    if (current === 'x') {
        current = 'o';
      } else {
        current = 'x';
      }
  }

  var clearMove = function(move,mmboard) {
    mmboard[move] = '';
    return mmboard;
  }

  var minimax = function(mmboard,depth) {
    console.log(mmboard);
    console.log(Board.checkAIBoard(mmboard));
    if (Board.checkAIBoard(mmboard) !== 'in progress') {
      return score(mmboard,depth);
    }
    depth += 1;
    var scores = [];
    var moves = [];
    var availableMoves = getAvailableMoves(mmboard);
    var move;
    var branch;
    for (m = 0; m < availableMoves.length; m++) {
      move = availableMoves[m];
      branch = testMove(move,mmboard);
      changePlayer();
      scores.push(minimax(branch,depth));
      console.log(scores);
      moves.push(move);
      mmboard = clearMove(move,mmboard);
      changePlayer();
    }
    var highScore;
    var highScoreIndex;
    var lowScore;
    var lowScoreIndex;
    if (current === 'x') {
      highScore = Math.max.apply(Math,scores);
      highScoreIndex = scores.indexOf(highScore);
      bestChoice = moves[highScoreIndex];
      return scores[highScoreIndex];
    } else if (current === 'o') {
      lowScore = Math.max.apply(Math,scores);
      lowScoreIndex = scores.indexOf(lowScore);
      bestChoice = moves[lowScoreIndex];
      return scores[lowScoreIndex];
    }
  }
  return {
    computerMove: computerMove
  }
})();