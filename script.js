document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById("bingo-board");
  const letters = ['B', 'I', 'N', 'G', 'O'];
  const ranges = {
    'B': [1, 15],
    'I': [16, 30],
    'N': [31, 45],
    'G': [46, 60],
    'O': [61, 75]
  };

  // Shuffle array function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Generate a random number within a specified range
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Create a Bingo square element
  function createSquare(letter, number) {
    const square = document.createElement("div");
    square.classList.add("bingo-square");
    if (number === 'FREE') {
      square.textContent = 'FREE';
    } else {
      square.textContent = letter + number;
    }
    square.addEventListener("click", function() {
      square.classList.toggle("selected");
    });
    return square;
  }

  // Generate a random 5x5 Bingo board
  function generateBoard() {
    board.innerHTML = "";
    const shuffledNumbers = [];
    for (let letter of letters) {
      const [start, end] = ranges[letter];
      const columnNumbers = [];
      while (columnNumbers.length < 5) {
        const randomNumber = generateRandomNumber(start, end);
        if (!columnNumbers.includes(randomNumber)) {
          columnNumbers.push(randomNumber);
        }
      }
      shuffle(columnNumbers); // Randomize numbers within each column
      if (letter === 'N') { // Middle column (N) has a free space
        columnNumbers[2] = 'FREE';
      }
      shuffledNumbers.push(...columnNumbers);
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const square = createSquare(letters[j], shuffledNumbers[i + j * 5]);
        board.appendChild(square);
      }
    }
  }

  generateBoard();
});
