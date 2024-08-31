async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isSafe(board, row, col, N) {
  for (let i = 0; i < row; i++) if (board[i][col]) return false;

  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j]) return false;

  for (let i = row, j = col; i >= 0 && j < N; i--, j++)
    if (board[i][j]) return false;

  return true;
}

async function solveNQUtil(board, row, N, chessboard) {
  if (row >= N) return true;

  for (let col = 0; col < N; col++) {
    const square = chessboard.children[row * N + col];
    square.classList.add("traversing", "enlarged");
    await sleep(200); // Delay

    if (isSafe(board, row, col, N)) {
      board[row][col] = 1;
      square.classList.remove("traversing");
      square.classList.add("queen");

      if (await solveNQUtil(board, row + 1, N, chessboard)) return true;

      board[row][col] = 0;
      square.classList.remove("queen");
    }
    square.classList.remove("traversing", "enlarged");
  }

  return false;
}

async function solveNQ(N, chessboard) {
  let board = Array.from({ length: N }, () => Array(N).fill(0));
  if (!(await solveNQUtil(board, 0, N, chessboard))) {
    alert("Solution does not exist");
    return [];
  }
  return board;
}
