let beltSpeed = 1;
let speeds = [80, 90, 100];

const scoreText = document.querySelector("#score");
const highestScoreText = document.querySelector("#highestScore");
let score = 0;
let highestScore = 0;

const newWaste = 
  ["images/apple.jpg", "images/pizza.jpg", "images/watermelon.jpg", "images/leaves.jpg", "images/pizzaBox.jpg", "images/cardboardContainer.jpg", 
    "images/sodaCan.jpg", "images/milkJug.jpg", "images/glassBottle.jpg", "images/cardboard.jpg", "images/paper.jpg", "images/cannedFood.jpg",
    "images/wrappers.jpg", "images/plasticBag.jpg", "images/plasticUtensils.jpg", "images/drinkCup.jpg", "images/chipBag.jpg", "images/milkBox.jpg"];
let wasteOnBelt = [];
let xPosOnBelt;
const yPosOnBelt = "145px"
let beltMove = true;

let gameOver;
let id = null;

function startGame() {
  clearInterval(id);
  id = setInterval(frame, 100);
  let counter = 1;
  addWaste();
  function frame() {
    r = Math.floor(Math.random(4))
    if (counter % (speeds[r] - ((beltSpeed - 1) * 10)) == 0) {
      addWaste();
    }
    if (counter % 500 == 0) {
      beltSpeed++;
    }
    moveBelt(counter);

    // moving all waste on belt
    for (let i = wasteOnBelt.length - 1; i >= 0; i--) {
      let waste = document.getElementById(wasteOnBelt[i]);
      let img = waste.getAttribute("src");
      waste.addEventListener("mousedown", mouseDown, false); // mouse evenlistener
      // position of waste
      let xPos = waste.offsetLeft;
      let yPos = waste.offsetTop;
      // remove waste
      if (removeWaste(img, xPos, yPos)) {
        waste.remove();
        wasteOnBelt.splice(i, 1);
      } else {
        if (beltMove == true) {
          waste.style.left = xPos + beltSpeed + "px";
          xPosOnBelt = waste.style.left;
        }
      }

    // game over if score below 0
    if (score < 0) {
      gameOverRun();
    }
    // change highestScore
    if (score > highestScore) {
      highestScore = score;
    }
      scoreText.innerText = score;
      highestScoreText.innerText = highestScore;
    }
  
    counter++;
  }
}

function resetGame() {
  clearInterval(id);
  clearBelt();
  gameOver = document.getElementById("gameOver");
  gameOver.style.color = "white";
  score = 0;
  speeds = [30, 40, 50, 60, 70]
  scoreText.innerText = score;
}

function moveBelt(counter) {
  let belt = document.getElementById("conveyor");
  if (counter % 2 == 0) {
    belt.style.marginTop = "4px";
  } else {
    belt.style.marginTop = "6px";
  }
}

function gameOverRun() {
  clearInterval(id);
  id = setInterval(frame, 500);
  let counter = 1;
  clearBelt();
  function frame() {
    gameOver = document.getElementById("gameOver");
    if (counter < 6) {
      if (counter % 2 == 0) {
        gameOver.style.color = "white";
      } else {
        gameOver.style.color = "rgb(39, 71, 144)";
      }
    }
    counter++;
  }
}

function clearBelt() {
  for (let i = wasteOnBelt.length - 1; i >= 0; i--) {
    waste = document.getElementById(wasteOnBelt[i]);
    waste.remove();
  }
  wasteOnBelt = [];
}

function addWaste() {
  let r = Math.floor(Math.random() * newWaste.length);
  let src = newWaste[r];
  let img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("class", "waste");
  img.setAttribute("draggable", "false");

  let id = Math.floor(Math.random() * 21); // generate unique id
  while (wasteOnBelt.includes(id)) {
    id = Math.floor(Math.random() * 21);
  }
  img.setAttribute("id", id);
  
  img.style.left = "4px";
  img.style.top = "145px";
  
  document.getElementById("game").appendChild(img);
  wasteOnBelt.push(id);
}

function removeWaste(img, xPos, yPos) {
  if (xPos >= 420 && yPos >= 140 && yPos <= 150) {
    score = score - 2;
    return true;
  } else if (toCompost(img, xPos, yPos) || 
             toRecycling(img, xPos, yPos) || 
             toLandfill(img, xPos, yPos)) {
    return true;
  } else {
    return false;
  }
}

function toCompost(img, xPos, yPos) {
  switch (img) {
    case "images/apple.jpg":
    case "images/pizza.jpg":
    case "images/watermelon.jpg":
    case "images/leaves.jpg":
    case "images/pizzaBox.jpg":
    case "images/cardboardContainer.jpg":
      if ((xPos >= 30) && (xPos <= 120) && 
          (yPos >= 250) && (yPos <= 450)) {
        score++;
        return true;
      }
      else if ((xPos >= 180) && (xPos <= 270) && 
               (yPos >= 250) && (yPos <= 450)) {
        score--;
        return true;
      }
      else if ((xPos >= 320) && (xPos <= 420) && 
          (yPos >= 250) && (yPos <= 450)) {
        score--;
        return true;
      }
    default:
      return false;
  }
}

function toRecycling(img, xPos, yPos) {
  switch (img) {
    case "images/sodaCan.jpg":
    case "images/milkJug.jpg":
    case "images/glassBottle.jpg":
    case "images/cardboard.jpg":
    case "images/paper.jpg":
    case "images/cannedFood.jpg":
      if ((xPos >= 180) && (xPos <= 270) && 
               (yPos >= 250) && (yPos <= 450)) {
        score++;
        return true;
      }
      else if ((xPos >= 30) && (xPos <= 120) && 
          (yPos >= 250) && (yPos <= 450)) {
        score--;
        return true;
      }
      else if ((xPos >= 320) && (xPos <= 420) && 
          (yPos >= 250) && (yPos <= 450)) {
        score--;
        return true;
      }
    default:
      return false;
  }
}

function toLandfill(img, xPos, yPos) {
  switch (img) {
    case "images/wrappers.jpg":
    case "images/plasticBag.jpg":
    case "images/plasticUtensils.jpg":
    case "images/drinkCup.jpg":
    case "images/chipBag.jpg":
    case "images/milkBox.jpg":
      if ((xPos >= 320) && (xPos <= 420) && 
          (yPos >= 250) && (yPos <= 450)) {
        score++;
        return true;
      }
      else if ((xPos >= 30) && (xPos <= 120) && 
          (yPos >= 250) && (yPos <= 450)) {
        score--;
        return true;
      }
      else if ((xPos >= 180) && (xPos <= 270) && 
               (yPos >= 250) && (yPos <= 450)) {
        score--;
        return true;
      }
    default:
      return false;
  }
}

function mouseDown(e) {
  // store the reference to the waste item that is being dragged
  waste = e.target;

  // calculate the offset between the mouse click and the waste item's position
  gMouseDownOffsetX = e.clientX - waste.offsetLeft;
  gMouseDownOffsetY = e.clientY - waste.offsetTop;

  // add mousemove and mouseup event listeners to enable dragging
  window.addEventListener("mousemove", wasteMove, true);
  window.addEventListener("mouseup", mouseUp, true);

  beltMove = false;
}

function wasteMove(e) {
  // ensure a waste item is being dragged
  if (waste) {
      waste.style.position = "absolute";
    
      let newTop = e.clientY - gMouseDownOffsetY;
      let newLeft = e.clientX - gMouseDownOffsetX;

      waste.style.top = newTop + "px";
      waste.style.left = newLeft + "px";
  }
}

function mouseUp() {
  // remove the mousemove and mouseup event listeners
  window.removeEventListener('mousemove', wasteMove, true);
  window.removeEventListener('mouseup', mouseUp, true);

  // reset the reference to the waste item being dragged
  waste.style.position = "relative";
  waste.style.top = yPosOnBelt;
  waste.style.left = xPosOnBelt;
  waste = null;
  beltMove = true;
}
