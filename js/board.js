function Board() {
  var board = [];
  var winningRoutes = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ]
  var winner = false;

  this.contents = function() {
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

  this.winningBoard = function () {
    for (var i = 0; i < winningRoutes.length; i++) {
      if ((board[winningRoutes[i][0]] === "x" && board[winningRoutes[i][1]] === "x" && board[winningRoutes[i][2]] === "x") ||
          (board[winningRoutes[i][0]] === "o" && board[winningRoutes[i][1]] === "o" && board[winningRoutes[i][2]] === "o")) {
            winner = true;
          }
    }
  }

  this.status = function() {
    this.contents();
    this.winningBoard();
    console.log(winner);
    this.winner = winner;
  }
}