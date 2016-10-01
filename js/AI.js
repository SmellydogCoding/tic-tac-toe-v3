var AI = (function(){
  "use strict";
  
  var currentMarker;
  var computerChoice;
  
  var computerMove = function() {
    var aiboard = Board.getBoard();
    currentMarker = 'x';
    minimax(aiboard,0);
    $('li[data-square="' + computerChoice + '"]').addClass('box-filled-2').css('background-image','url("img/x.svg")');
  };

  var getAvailableMoves = function(aiboard) {
    var availableMovesList = [];
    for(var a = 0; a < aiboard.length; a++) {
      if (aiboard[a] === '') {
        availableMovesList.push(a);
      }
    }
    return availableMovesList;
  }
  
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

  var makeNewBranch = function(move,aiboard) {
    aiboard[move] = currentMarker;
    changePlayer();
    return aiboard;
  }

  var changePlayer = function() {
    if (currentMarker === 'x') {
        currentMarker = 'o';
      } else {
        currentMarker = 'x';
      }
  }

  var clearMove = function(move,aiboard) {
    aiboard[move] = '';
    changePlayer();
    return aiboard;
  }

  var minimax = function(aiboard,depth) {
    if (Board.checkAIBoard(aiboard) !== 'game in progress') {
      return score(depth,aiboard);
    }
    depth += 1;
    var scores = [];
    var moves = [];
    var availableMoves = getAvailableMoves(aiboard);
    var move;
    var branch;
    for (var m = 0; m < availableMoves.length; m++) {
      move = availableMoves[m];
      branch = makeNewBranch(move,aiboard);
      scores.push(minimax(branch,depth));
      moves.push(move);
      aiboard = clearMove(move,aiboard);
    }
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
  return {
    computerMove: computerMove
  }
})();