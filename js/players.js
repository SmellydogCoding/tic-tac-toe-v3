var Players = (function Players() {

  var players = {
    player1: {
      name: "one",
      marker: "o"
    },
    player2: {
      name: "two",
      marker: "x"
    }
  }

  // set current player to player 1 at the start of the game
  var init = function() {
    players.current = players.player1;
  }

  // set player names upon input from the choose names screen
  var setPlayerNames = function(player1,player2) {
    players.player1.name = player1;
    players.player2.name = player2;
  };

  // change players between plays
  var changePlayers = function() {
    if (players.current === players.player1) {
      players.current = players.player2;
    } else {
      players.current = players.player1;
    }
  }

  // export players JSON
  var getPlayers = function() {
    return players;
  }
  // export the following functions for use in other modules
  return {
    init: init,
    setPlayerNames: setPlayerNames,
    getPlayers: getPlayers,
    changePlayers: changePlayers
  }
})();