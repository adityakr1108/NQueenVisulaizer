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
  // Mocked solving process for demonstration
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const index = i * N + j;
      const square = chessboard.children[index];

      square.classList.add("traversing");
      await new Promise((resolve) => setTimeout(resolve, 100));
      square.classList.remove("traversing");

      if (Math.random() > 0.7) { // Random placement for demonstration
        square.classList.add("queen");
        solutionSteps.push(index); // Save the step
        currentStep++;
      }
    }
  }
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
