function Players(player1) {
  this.player1 = player1;
  if (this.player1 === "o") {
    this.player2 = "x";
  } else {
    this.player2 = "o";
  }
  this.current = this.player1;
}

Players.prototype.changePlayers = function() {
  if (Players.current === Players.player1) {
    Players.current = Players.player2;
  } else {
    Players.current = Players.player1;
  }
}