var AI = (function(){
  "use strict";
  
  var currentMarker;
  var computerChoice;
  
  // function that chooses the best move for the computer using minimax
  // a copy of the current game board is created, which is passed to minimax
  // in this game, the computer is always 'x'
  var computerMove = function() {
    var aiboard = Board.getBoard();
    currentMarker = 'x';
    var depth = 0;
    minimax(aiboard,depth);
    $('li[data-square="' + computerChoice + '"]').addClass('box-filled-2').css('background-image','url("img/x.svg")');
  };

  // get all of the vacant squares on the current board
  var getAvailableMoves = function(aiboard) {
    var availableMovesList = [];
    for(var a = 0; a < aiboard.length; a++) {
      if (aiboard[a] === '') {
        availableMovesList.push(a);
      }
    }
    return availableMovesList;
  }
  
  // scoring system for minimax
  var score = function(depth,aiboard) {
    var aistatus = Board.checkAIBoard(aiboard);
    if (aistatus === 'winx') {
      return 10 - depth;
    } else if (aistatus === 'wino') {
      return depth - 10;
    } else {
      return 0;
    }
  }

  // makes a play (x or o) on the current minimax board (which also creates a new branch) and changes the marker
  var makeNewBranch = function(move,aiboard) {
    aiboard[move] = currentMarker;
    changePlayer();
    return aiboard;
  }

  // changes the marker between x (computer) and o (human)
  var changePlayer = function() {
    if (currentMarker === 'x') {
        currentMarker = 'o';
      } else {
        currentMarker = 'x';
      }
  }

  // clears the current move from the minimax board once the end of a branch is reached
  var clearMove = function(move,aiboard) {
    aiboard[move] = '';
    changePlayer();
    return aiboard;
  }

  // minimax algorithm
  var minimax = function(aiboard,depth) {
    //check to see if the board is a win or tie after each iteration
    if (Board.checkAIBoard(aiboard) !== 'game in progress') {
      return score(depth,aiboard);
    }
    depth += 1;
    var scores = [];
    var moves = [];
    var availableMoves = getAvailableMoves(aiboard);
    var move;
    var branch;
    // test each available square by creating a branch (and braches of) recursing as needed and
    // and pushing the resulting score from each branch into a scores array to evaluate later
    // the move that generated the score for each branch is pushed into a moves array (which
    // corrispods to the scores in the scores array
    // then clear the board after each move
    for (var m = 0; m < availableMoves.length; m++) {
      move = availableMoves[m];
      branch = makeNewBranch(move,aiboard);
      scores.push(minimax(branch,depth));
      moves.push(move);
      aiboard = clearMove(move,aiboard);
    }
    // at the end of the loop, if the current player is the computer (x), pick the highest score
    // from the scores array.  if the current player is the human (o), pick the lowest score from
    // the scores array.  The index position at the appropriate score is the move the computer should make.
    var highScore;
    var highScoreIndex;
    var lowScore;
    var lowScoreIndex;
    if (currentMarker === 'x') {
      highScore = Math.max.apply(Math,scores);
      highScoreIndex = scores.indexOf(highScore);
      computerChoice = moves[highScoreIndex];
      return scores[highScoreIndex];
    } else {
      lowScore = Math.max.apply(Math,scores);
      lowScoreIndex = scores.indexOf(lowScore);
      computerChoice = moves[lowScoreIndex];
      return scores[lowScoreIndex];
    }
  }
  // export the function computerMove for use in the game module
  return {
    computerMove: computerMove
  }
})();