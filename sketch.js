let pos = [];

let currentT = 1;
let tArray = [];
let sliders = [];

let matrix = [];

let selected = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  updateMatrix();
}

function draw() {
  background(0);
  
  for (let i = 0; i < tArray.length; i++) {
    tArray[i] = sliders[i].value();
  }
  
  // if (control != -1 && notTouchingSlider() && mouseIsPressed) {
  //   pos[control-1].set(canvasToGrid(mouseX, mouseY));
  // }
  
  // if (mouseIsPressed) {
  //   for (const p of pos) {
  //     const canvasPos = gridToCanvas(p.x, p.y);
  //     if (dist(mouseX, mouseY, canvasPos.x, canvasPos.y) <= 10) {
  //       p.set(canvasToGrid(mouseX, mouseY));
  //     }
  //   }
  // }
  if (selected != -1) pos[selected].set(canvasToGrid(mouseX, mouseY));
  
  updateMatrix();
  visualizeEquation();
}

function addPos(x, y) {
  pos.push(createVector(x, y));
  
  tArray.push(currentT);
  
  let slider = createSlider(1, currentT+1, currentT, 0);
  slider.position(10, height - 30 * currentT);
  for (let s of sliders) {
    s.attribute('max', currentT+1);
  }
  sliders.push(slider);
  
  currentT++;
}

function updateMatrix() {
  initializeMatrix();
  rowReduceMatrix();
}
function initializeMatrix() {
  matrix = [];
  for (let i = 0; i < pos.length; i++) {
    const p = pos[i];
    matrix[i] = [];
    for (let j = 0; j < pos.length; j++) {
      matrix[i][j] = pow(tArray[i], pos.length - j - 1);
    }
    matrix[i][pos.length] = p.x;
    matrix[i][pos.length+1] = p.y;
  }
}
function printMatrix() {
  console.log("-------------");
  for (let i = 0; i < matrix.length; i++) {
    let s = "";
    for (let j = 0; j < matrix[i].length; j++) {
      s += matrix[i][j] + " ";
    }
    console.log(s);
  }
}

function rowReduceMatrix() {
  for (let i = 0; i < matrix.length; i++) {
    setToOne(i, i);
    for (let j = 0; j < matrix.length; j++) {
      if (j != i) setToZero(j, i, i);
    }
  }
}
// sets a (row, col) to one by dividing the row by that value
function setToOne(row, col) {
  const val = matrix[row][col];
  for (let i = 0; i < matrix[row].length; i++) {
    matrix[row][i] /= val;
  }
}
// (row1, col) to zero by subtracting by a multiplied row2
function setToZero(row1, col, row2) {
  const val1 = matrix[row1][col];
  const val2 = matrix[row2][col];
  const multiplyer = val1 / val2;
  for (let i = 0; i < matrix[row1].length; i++) {
    matrix[row1][i] -= matrix[row2][i] * multiplyer;
  }
}

function visualizeEquation() {
  // 0 lines/grid
  strokeWeight(2);
  stroke(255, 155);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  
  // displaying function (red line)
  noFill();
  strokeWeight(2);
  stroke(255, 0, 0);
  let xCoefficients = matrix.map(row => row[row.length - 2]);
  let yCoefficients = matrix.map(row => row[row.length - 1]);
  beginShape();
  for (let t = -10; t <= 10; t += 0.1) {
    let p = evaluateEquation(t, xCoefficients, yCoefficients);
    vertex(p.x, p.y);
  }
  endShape();
  
  strokeWeight(5);
  stroke(255);
  for (let i = 0; i < tArray.length; i++) {
    point(evaluateEquation(i+1, xCoefficients, yCoefficients));
  }
  
  // circles with number of pos
  for (let i = 0; i < pos.length; i++) {
    const p = pos[i];
    const canvasPos = gridToCanvas(p.x, p.y);
    
    strokeWeight(2);
    stroke(255);
    fill(255, 155);
    ellipse(canvasPos.x, canvasPos.y, 20);
    
    textAlign(CENTER);
    textSize(18);
    noStroke();
    fill(0);
    text(i+1, canvasPos.x, canvasPos.y + 6);
  }
}
function evaluateEquation(t, xCoefficients, yCoefficients) {
  let x = 0;
  for (let i = 0; i < xCoefficients.length; i++) {
    x += xCoefficients[i] * pow(t, xCoefficients.length - i - 1);
  }
    
  let y = 0;
  for (let i = 0; i < yCoefficients.length; i++) {
    y += yCoefficients[i] * pow(t, yCoefficients.length - i - 1);
  }
  
  return gridToCanvas(x, y);
}

const gridSize = 10;
function canvasToGrid(x, y) {
  let retX = map(x, 0, width, -gridSize, gridSize);
  let retY = map(y, 0, height, gridSize, -gridSize);
  return createVector(retX, retY);
}
function gridToCanvas(x, y) {
  let retX = map(x, -gridSize, gridSize, 0, width);
  let retY = map(y, gridSize, -gridSize, 0, height);
  return createVector(retX, retY);
}

function notTouchingSlider() { 
  return mouseY < height - 30 * (currentT-1) || mouseX > 150; 
}
function notTouchingPos() {
  for (const p of pos) {
    const canvasPos = gridToCanvas(p.x, p.y);
    if (dist(mouseX, mouseY, canvasPos.x, canvasPos.y) <= 10) {
      return false;
    }
  }
  return true;
}
function mousePressed() {
  if (
    notTouchingSlider() && notTouchingPos()
  ) {
    let mouse = canvasToGrid(mouseX, mouseY);
    addPos(mouse.x, mouse.y);
    updateMatrix();
  } else {
    for (let i = pos.length-1; i >= 0; i--) {
      const p = pos[i];
      const canvasPos = gridToCanvas(p.x, p.y);
      if (dist(mouseX, mouseY, canvasPos.x, canvasPos.y) <= 10) {
        selected = i;
      }
    }
  }
}
function mouseReleased() {
  selected = -1;
}
function keyPressed() {
  if (key == 'r' || key == 'R') {
    pos = [];

    currentT = 1;
    tArray = [];
    sliders = [];

    matrix = [];

    selected = -1;
    
    removeElements();
    updateMatrix();
  }
}
