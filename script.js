//your code here
// script.js
document.addEventListener("DOMContentLoaded", function () {
  const images = ["img1", "img2", "img3", "img4", "img5"];

  const gameContainer = document.getElementById("game-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  let selectedTiles = [];
  let state = 1;

  function getRandomIndex() {
    return Math.floor(Math.random() * images.length);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function renderTiles() {
    const shuffledImages = shuffleArray([...images, images[getRandomIndex()]]);
    
    gameContainer.innerHTML = "";
    shuffledImages.forEach((imageClass) => {
      const img = document.createElement("img");
      img.src = `./images/${imageClass}.jpg`;
      img.className = imageClass;
      img.addEventListener("click", () => handleTileClick(imageClass));
      gameContainer.appendChild(img);
    });
  }

  function handleTileClick(imageClass) {
    if (selectedTiles.length < 2 && !selectedTiles.includes(imageClass)) {
      selectedTiles.push(imageClass);
      document.querySelector(`.${imageClass}`).classList.add("selected");

      if (selectedTiles.length === 2) {
        verifyButton.style.display = "block";
      }
    }
  }

  resetButton.addEventListener("click", () => {
    resetGame();
  });

  verifyButton.addEventListener("click", () => {
    verifyTiles();
  });

  function resetGame() {
    selectedTiles = [];
    verifyButton.style.display = "none";
    resetButton.style.display = "none";
    para.innerText = "";
    state = 1;
    renderTiles();
  }

  function verifyTiles() {
    resetButton.style.display = "block";
    verifyButton.style.display = "none";
    
    if (selectedTiles[0] === selectedTiles[1]) {
      para.innerText = "You are a human. Congratulations!";
    } else {
      para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    state = 4;
  }

  renderTiles();
});

