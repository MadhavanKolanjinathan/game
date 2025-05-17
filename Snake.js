
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
const scale = 15; // Size of each grid
let rows = canvas.height / scale;
let columns = canvas.width / scale;

// Game state variables
let snake;
let food;
let score;

// Set up the game
function setup() { 
  canvas.width = 1200;
  canvas.height = 400;
  score = 0;
  rows = canvas.height / scale; // Recalculate rows after setting canvas size
  columns = canvas.width / scale; // Recalculate columns after setting canvas size
  snake = new Snake();
  food = generateFood();
  window.setInterval(gameLoop,140);
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  snake.draw();
  drawFood(food);
  checkCollision();
  displayScore();
}

// Snake class
function Snake() {
  this.body = [{x: 10, y: 10}];
  this.direction = 'right';
  
  this.update = function () {
    const head = {x: this.body[0].x, y: this.body[0].y};
    
    // Update position based on the direction
    switch (this.direction) {
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
      case 'up':
        head.y--;   
        break;
      case 'down':
        head.y++; 

           
        break;
    }
    
    this.body.unshift(head);
    
    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = generateFood();
    } else {
      this.body.pop();
    }
  };
  
  this.draw = function () {
    ctx.fillStyle = 'red';
    this.body.forEach((segment) => {
      ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });
  };
    
  this.changeDirection = function (event) {
    if (event.keyCode === 37 && this.direction !== 'right') {
      this.direction = 'left';
    } else if (event.keyCode === 38 && this.direction !== 'down') {
      this.direction = 'up';
    } else if (event.keyCode === 39 && this.direction !== 'left') {
      this.direction = 'right';
    } else if (event.keyCode === 40 && this.direction !== 'up') {
      this.direction = 'down';
    }
  };
}

// Generate food at a random location
function generateFood() {
  return {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
  };
}

// Draw food on the canvas
function drawFood(food) {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(food.x * scale, food.     y * scale, scale, scale);
}

// Check for collisions with walls or itself
function checkCollision() {
  const head = snake.body[0];
  
  // Collision with walls
  if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
    alert("Game over!! your score is:"+ score);
    setup();
  }
  
  // Collision with itself
  for (let i = 1; i < snake.body.length; i++) {
    if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
      alert("Game over!! your score is:"+ score);
      setup();
    }
  }
}

// Display score
function displayScore() {
  ctx.fillStyle = 'white';
  ctx.font = '25px Arial';
  ctx.fillText('Score: ' + score ,500,380);
  
}   

//! TIMER----------------------------------
// ---------------------------------->

// Timer variables
let seconds = 0;
let minutes = 0;
let timerInterval;
let isPageVisible = true;

//! Update timer display

// 1 seconds =1000 ms  (That purpose use post increment we can used)
function updateTimer() {
seconds++;
if (seconds >= 60) {
    seconds = 0;
    minutes++;   
}
document.getElementById('timer').textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
//  document.getElementById('timer').textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;

}

//!Format time to ensure two digits for single digit numbers

// ( 1 to 9 is single digit  so i use 0)
function formatTime(time) {
return time < 10 ? '0' + time : time;
}

//! Start  timer
function startTimer() {
if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
}
}

//! Pause  timer
function pauseTimer() {
clearInterval(timerInterval);
time       


  rInterval = null;
}

//! Handle page visibility changes
document.addEventListener('visibilitychange', function() {
if (document.hidden) {

//! If the page is hidden, pause the timer
    stopTimer(); onclick()
    isPageVisible = false;
} else {
//! If the page is visible again, resume the timer
    if (!isPageVisible) {
        startTimer();
        isPageVisible = true; 
    }
}
});

// after return to repete (Start the timer  the page is loaded)
   startTimer();


// Listen for keyboard input to change direction
document.addEventListener('keydown', (event) => snake.changeDirection(event));

// Initialize the game
setup();

