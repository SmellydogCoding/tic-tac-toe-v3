function Players(player1) {
  this.player1 = player1;

  if (this.player1 === "o") {
    this.player2 = "x";
  } else {
    this.player2 = "o";
  }

  this.current = this.player1;

  this.changePlayers = function() {
    if (this.current === this.player1) {
      this.current = this.player2;
    } else {
      this.current = this.player1;
    }
  }
}