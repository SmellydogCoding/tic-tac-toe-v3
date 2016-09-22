var Players = (function Players() {

  var players = {
    player1: {
      name: "one",
      marker: "o"
    },
    player2: {
      name: "two",
      marker: ""
    },
    current: function() {
      return this.player1;
    }
  }

  var setPlayerTwo = function() {
    if (players.player1.marker === "o") {
      players.player2.marker = "x";
    } else {
      players.player2.marker = "o";
    }
  }

  var changePlayers = function() {
    if (players.current === players.player1) {
      players.current = players.player2;
    } else {
      players.current = players.player1;
    }
  }

  var getPlayers = function() {
    return players;
  }

  return {
    setPlayerTwo: setPlayerTwo,
    getPlayers: getPlayers,
    changePlayers: changePlayers
  }
})();