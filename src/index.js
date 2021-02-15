import "./styles.css";

const cylinderContainer = document.querySelector(".cylinder-container");
const rightFace = document.querySelector(".right-face");
const cylinderWidth = parseInt(getComputedStyle(cylinderContainer).width);
const cylinderHalfDepth = cylinderWidth / 2;

for (let i = 0; i < cylinderWidth; i++) {
  createCylinderFace(i + 1);
}

function createCylinderFace(distance) {
  const face = document.createElement("div");
  face.classList.add("face");
  face.style.transform = `translateX(${distance}px) rotateY(-90deg) translateZ(${cylinderHalfDepth}px)`;
  cylinderContainer.insertBefore(face, rightFace);
}

const allCarouselCells = document.querySelectorAll(".carousel__cell"),
  carouselObject = document.querySelector(".carousel"),
  chosenWordArea = document.querySelector(".chosen-word-area"),
  chosenWord = document.getElementById("chosen-word"),
  nextBtn = document.getElementById("next"),
  prevBtn = document.getElementById("prev"),
  numOfCells = allCarouselCells.length,
  cellPadding = 15,
  cellWidth = parseInt(getComputedStyle(cylinderContainer).width),
  cellSize = cellWidth + cellPadding * 2,
  angle = 360 / numOfCells,
  cylinderDepth = parseInt(getComputedStyle(cylinderContainer).width),
  // Move carousel cells by half the depth
  tZ = cylinderDepth / 2,
  // tZ = Math.round((cellWidth / 2) / Math.tan(Math.PI / numOfCells)),
  offset = 0,
  chosenWordAnimationTime = 500;
let rotation = 0;

// chosenWordArea.style.transform = `rotateY(${offset}deg) translateZ(${-tZ}px)`;

[...allCarouselCells].map((cell, index) => {
  cell.style.transform = `rotateX(${index * angle}deg) translateZ(${tZ}px)`;
  cell.id = index * angle;
});

nextBtn.addEventListener("click", moveCarousel);
prevBtn.addEventListener("click", moveCarousel);

function moveCarousel(e) {
  e.target.id === "next" ? (rotation -= angle) : (rotation += angle);
  carouselObject.style.transform = `rotateY(${offset}deg) rotateX(${rotation}deg)`;
  const displayedWord = calculateDisplayedWord();
  setTimeout(() => {
    chosenWord.style.opacity = 1;
    chosenWord.innerText = displayedWord;
  }, chosenWordAnimationTime);
}

function calculateDisplayedWord() {
  chosenWord.style.opacity = 0;
  removeOffset();
  const carouselRotateX = carouselObject.style.transform
    .split(" ")
    .find((prop) => prop.includes("rotateX"));
  const carouselRotateXValue = parseInt(carouselRotateX.substring(8));
  // To go right, we have to use a negative rotation
  // Therefore we have to invert the rotateX value so we go the correct direction
  const carouselRotateXValueFlipped = carouselRotateXValue * -1;
  const rotateXValue = carouselRotateXValueFlipped % 360;
  const shownCell = document.getElementById(rotateXValue);
  // shownCell.style.transform = shownCell.style.transform + `rotate(${offset}deg)`;
  return shownCell.innerText;
}

function removeOffset() {
  [...allCarouselCells].map((cell) => {
    cell.style.transform = cell.style.transform
      .split(" ")
      .filter((prop) => !(prop.includes("rotate") && !prop.includes("X")))
      .join(" ");
  });
}

// Want to have a bar/white display across the roller coaster
// For the word being displayed
// IE. I don't want to rotate the words individually. Or I want to think about this more
