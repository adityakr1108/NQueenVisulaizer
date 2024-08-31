async function visualizeNQueen() {
  const N = parseInt(document.getElementById("board-size").value);
  const chessboard = document.getElementById("chessboard");
  chessboard.innerHTML = "";
  chessboard.style.gridTemplateColumns = `repeat(${N}, 50px)`;
  chessboard.style.gridTemplateRows = `repeat(${N}, 50px)`;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const square = document.createElement("div");
      square.classList.add((i + j) % 2 === 0 ? "white" : "black");
      chessboard.appendChild(square);
    }
  }

  await solveNQ(N, chessboard);
}
