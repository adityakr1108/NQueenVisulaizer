let solutionSteps = [];
let currentStep = -1;

async function visualizeNQueen() {
  const N = parseInt(document.getElementById("board-size").value);
  const chessboard = document.getElementById("chessboard");
  const status = document.getElementById("status");
  
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

  solutionSteps = [];
  currentStep = -1;
  status.textContent = "Processing...";
  await solveNQ(N, chessboard);
  if (solutionSteps.length > 0) {
    status.textContent = "Solution found!";
  } else {
    status.textContent = "No solution found.";
  }
}

async function solveNQ(N, chessboard) {
  const board = Array.from({ length: N }, () => Array(N).fill(false));

  async function isSafe(board, row, col) {
    // Check this row on left side
    for (let i = 0; i < col; i++) {
      if (board[row][i]) return false;
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; j >= 0 && i < N; i++, j--) {
      if (board[i][j]) return false;
    }

    return true;
  }

  async function solveNQUtil(board, col) {
    if (col >= N) return true;

    for (let i = 0; i < N; i++) {
      if (await isSafe(board, i, col)) {
        board[i][col] = true;
        const index = i * N + col;
        const square = chessboard.children[index];
        square.classList.add("queen");
        solutionSteps.push(index);
        currentStep++;

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (await solveNQUtil(board, col + 1)) return true;

        board[i][col] = false;
        square.classList.remove("queen");
        solutionSteps.pop();
        currentStep--;
      }
    }

    return false;
  }

  await solveNQUtil(board, 0);
}

function resetBoard() {
  const chessboard = document.getElementById("chessboard");
  const status = document.getElementById("status");
  chessboard.innerHTML = "";
  status.textContent = "";
  solutionSteps = [];
  currentStep = -1;
}

function stepBack() {
  const chessboard = document.getElementById("chessboard");
  if (currentStep > 0) {
    const index = solutionSteps[currentStep];
    const square = chessboard.children[index];
    square.classList.remove("queen");
    currentStep--;
  }
}
