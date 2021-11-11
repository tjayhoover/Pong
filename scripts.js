// Ask for a username and welcome the player to the game
var userName = prompt("Please enter your username!", "");
alert("Welcome to Pong, " + userName + "! To play, hover your mouse near the left of the black play area.");

// Retrieve the canvas that displays the scores
const score_canvas = document.getElementById("scores");
const score_ctx = score_canvas.getContext('2d');

// Retrieve the game canvas
const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');

// Draw rectangles to the main game canvas
function makeRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Draw rectangles to the scoreboard canvas
function makeScoreBoard(x, y, w, h, color) {
    score_ctx.fillStyle = color;
    score_ctx.fillRect(x, y, w, h);
}

// Draw circles to the main game canvas
function makeCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// Display text on the main game canvas
function makeText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "15pt sans-serif";
    ctx.fillText(text, x, y);
}

// Display the scores on the scoreboard
function makeScore(text, x, y, color) {
    score_ctx.fillStyle = color;
    score_ctx.font = "20pt sans-serif";
    score_ctx.fillText(text, x, y);
}

// Find random numbers to calculate the angle that the computer hits the ball
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Create the user's paddle
const user = {
    x: 0,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "RED",
    score: 0,
    high_score: 0,
    difficulty: "Normal"
}

// Create the computer's paddle
const com = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

// Create the net
const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE",
}

// Create the ball
const ball = {
    saved_veloX: 0,
    saved_veloY: 0,
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 300,
    speed_change: 30,
    velocityX: 0,
    velocityY: 0,
    color: "white",
    u: -1,
    l: 1,
}

// Display the net on the screen
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        makeRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Draw all the desired elements to the screen at the same time
function render() {
    // Clear the canvases (So that stuff doesn't just pile up on top of each other)
    makeRect(0, 0, canvas.width, canvas.height, "BLACK");
    makeScoreBoard(0, 0, score_canvas.width, score_canvas.height, "lightgray");

    // Display the scores
    makeScore("Score: ", score_canvas.width / 8, 5 * score_canvas.height / 6, "BLACK");
    makeScore(user.score, 3 * score_canvas.width / 4, 5 * score_canvas.height / 6, "BLACK");
    makeScore("High Score: ", score_canvas.width / 8, 2 * score_canvas.height / 6, "BLACK");
    makeScore(user.high_score, 3 * score_canvas.width / 4, 2 * score_canvas.height / 6, "BLACK");

    makeText("Score: ", (canvas.width / 2) - 100, canvas.height / 11, "WHITE");
    makeText(user.score, (canvas.width / 2) - 30, (canvas.height / 11) + 0.5, "WHITE");

    makeText("Difficulty: ", 2 * (canvas.width / 3) - 120, canvas.height / 11, "WHITE");
    makeText(user.difficulty, 2 * (canvas.width / 3) - 30, (canvas.height / 11) + 0.5, "WHITE");

    // Display the net
    drawNet()

    // Display the paddles
    makeRect(user.x, user.y, user.width, user.height, user.color);
    makeRect(com.x, com.y, com.width, com.height, com.color);

    // Display the ball
    makeCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Reset the ball to the middle of the screen
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = 250;
    user.score = 0;
    if (user.difficulty == "Easy") {
        ball.speed = 200;
    }
    else if (user.difficulty == "Normal") {
        ball.speed = 300;
    }
    else if (user.difficulty == "Hard") {
        ball.speed = 400;
    }
}

// Pause the game
function pause() {
    if (ball.velocityY != 0 || ball.velocityX != 0) {
        ball.saved_veloX = ball.velocityX;
        ball.saved_veloY = ball.velocityY;
    }
    ball.velocityX = 0;
    ball.velocityY = 0;
}

// Resume the game
function play() {
    if (ball.velocityY == 0 & ball.velocityX == 0) {
        ball.velocityX = ball.saved_veloX;
        ball.velocityY = ball.saved_veloY;
    }
}

// Refresh the page
function refreshPage() {
    window.location.reload();
}

// Change the difficulty to easy
function easy() {
    user.height = 150;
    ball.u = 0.3;
    ball.l = -.03;
    ball.speed_change = 10;
    ball.speed = 200;
    user.difficulty = "Easy";
    document.getElementById('easy_button').style.backgroundColor = '#767676';
    document.getElementById('normal_button').style.backgroundColor = 'lightgray';
    document.getElementById('hard_button').style.backgroundColor = 'lightgray';
}

// Change the difficulty to normal
function normal() {
    user.height = 100;
    ball.u = 0.9;
    ball.l = -0.9;
    ball.speed_change = 30;
    ball.speed = 300;
    user.difficulty = "Normal";
    document.getElementById('easy_button').style.backgroundColor = 'lightgray';
    document.getElementById('normal_button').style.backgroundColor = '#767676';
    document.getElementById('hard_button').style.backgroundColor = 'lightgray';
}

// Change the difficulty to hard
function hard() {
    user.height = 80;
    ball.u = 1.5;
    ball.l = -1.5
    ball.speed_change = 75;
    ball.speed = 400;
    user.difficulty = "Hard";
    document.getElementById('easy_button').style.backgroundColor = 'lightgray';
    document.getElementById('normal_button').style.backgroundColor = 'lightgray';
    document.getElementById('hard_button').style.backgroundColor = '#767676';
}

// Use the position of the mouse to control the game
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

// Detect collisisons between the ball and paddles
function collision(b, p) {

    // Create attributes of p and b that make more sense to read
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    // Check if a collission happened and return true or false
    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}

// Update the game. This happens 250 times per second.
function refresh() {
    // Ball movement and wall bounce
    ball.x += ball.velocityX * tic;
    ball.y += ball.velocityY * tic;
    if (ball.y + ball.radius > canvas.height ||
        ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Make the computer's paddle track the position of the ball
    com.y = ball.y - 50;

    // This ternary epression checks whether the current player is the computer or the user
    let player = (ball.x < canvas.width / 2) ? user : com;

    // If the user hits the ball, this is the code that executes
    if (collision(ball, user)) {
        // Where on the paddle the ball hit
        let collidePoint = ball.y - (player.y + player.height / 2);

        // Normalization
        collidePoint = collidePoint / (player.height / 2);

        // Calculate the angle of the path of the ball (in radians)
        let angleRad = collidePoint * (Math.PI / 4);

        // X direction of the ball when hit
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;

        // Velocity change
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);

        // Speed increases after every hit
        ball.speed += ball.speed_change;
    }

    // If the computer hits the ball, this is the code that executes
    if (collision(ball, com)) {

        // X direction of the ball when hit
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;

        // This is the radom angle of the ball's path after the computer hits it
        var angle = getRandomArbitrary(ball.l, ball.u);

        // Velocity change
        ball.velocityX = direction * ball.speed * Math.cos(angle);
        ball.velocityY = direction * ball.speed * Math.sin(angle);

        // Again, the speed increases after every hit
        ball.speed += ball.speed_change;
    }

    // Update the score if the user successfully returns the ball
    if (collision(ball, user)) {
        user.score++;
    }

    // Update the high score and reset the ball when the game ends
    if (ball.x - ball.radius < -100) {
        if (user.score > user.high_score) {
            user.high_score = user.score;
            alert(user.high_score + " is a new high score!");
            resetBall();
            pause();
        }
        else {
            alert("You did not set a high score.");
            resetBall();
            pause();
        }
    }
}

// This function is the main game function. It calls render to display the game, then update to make things move.
function game() {
    render();
    refresh();
}

// Refresh rate of the game
const framesPerSecond = 250;

// This multiplier will make sure the ball travels the same speed no matter what the frame rate is
const tic = 1 / framesPerSecond;

// This code calls the game function 250 times per second
setInterval(game, 1000.0 / framesPerSecond);
