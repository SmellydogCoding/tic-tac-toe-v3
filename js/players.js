var Players = (function Players() {

  var players = {
    player1: {
      name: "one",
      marker: "o"
    },
    player2: {
      name: "two",
      marker: ""
    }
  }

  players.current = players.player1;

  var setPlayerTwo = function() {
    if (players.player1.marker === "o") {
      players.player2.marker = "x";
    } else {
      players.player2.marker = "o";
    }
  }

  var setPlayerNames = function(player1,player2) {
    players.player1.name = player1;
    players.player2.name = player2;
  };

  var changePlayers = function() {
    if (players.current === players.player1) {
      players.current = players.player2;
    } else {
      players.current = players.player1;
    }
    // console.log(players.current);
  }

  var getPlayers = function() {
    return players;
  }

  return {
    setPlayerTwo: setPlayerTwo,
    setPlayerNames: setPlayerNames,
    getPlayers: getPlayers,
    changePlayers: changePlayers
  }
})();