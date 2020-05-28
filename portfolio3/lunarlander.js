var x = 300;
var y = 0;
var speedX = 0;
var speedY = 0;
var rectsize = 20;
var angle = 0;
var power = 0.03;
var gravity = 0.012;
var fuel = 400;
var frame = 0;
var thrust = false;
var state = 0;

function draw() {
    frame++;

    if (state == 0) {
        consoleLog("State 0");
        //Press any Key
        clear();
        background(0);
        drawStars();

        drawTerrain();
        drawLanding();
        drawFuel();
        fill(255);
        textSize(30);
        if (frame % 40 < 20) {
            textAlign(CENTER);
            text("PRESS ANY KEY", width / 2, height / 2);
        }
        if (frame > 5 && keyIsPressed) {
            spawnship();
            state = 1;
        }
    } else if (state == 1) {
        consoleLog("State 1");
        //Game Running
        clear();
        background(0);
        drawStars();
        drawTerrain();
        noStroke();
        drawFuel();

        //LANDEFLÄCHE

        drawLanding();

        //physik

        speedY += gravity;
        y += speedY;
        x += speedX;

        if (keyIsPressed && fuel > 0) {
            if (keyCode == UP_ARROW) {
                fuel -= 1;
                thrust = true;
                speedY -= power * cos(angle);
                speedX += power * sin(angle);
            } else if (keyCode == LEFT_ARROW) {
                angle -= 0.05;
            } else if (keyCode == RIGHT_ARROW) {
                angle += 0.05;
            }
        } else {
            thrust = false;
        }
        //consoleLog(speedY);
        // Check for landing
        // low enough
        if (y > height - 85) {
            // Check platform
            if (
                x > 90 + 15 &&
                x < 170 - 15 &&
                speedY < 1 &&
                angle < 0.2 &&
                angle > -0.2
            ) {
                // LANDED Succesful
                //gravity = 0;
                speedY = 0;
                speedX = 0;
                state = 2;
                frame = 0;
            } else {
                // failed landing
                speedY = 0;
                speedX = 0;
                state = 3;
                frame = 0;
            }
        }

        if (fuel <= 0) {
            fuel = 0;
            power = 0;
        }

        drawLander(x, y);
    } else if (state == 2) {
        consoleLog("State 2");
        clear();
        background(0);
        drawStars();
        drawTerrain();
        drawLanding();
        drawLander(x, y);
        drawFuel();
        fill(255);
        textSize(30);
        if (frame % 40 < 20) {
            textAlign(CENTER);
            text("SUCESSFUL LANDING!", width / 2, height / 2);
            thrust = false;
        }
        if (frame > 20 && keyIsPressed) {
            state = 0;
            frame = 0;
        }
    } else if (state == 3) {
        consoleLog("State 2");
        clear();
        background(0);
        drawStars();
        drawTerrain();
        drawLanding();
        drawLander(x, y);
        drawFuel();
        fill(255);
        textSize(30);
        if (frame % 40 < 20) {
            textAlign(CENTER);
            text("FAILED LANDING!", width / 2, height / 2);
            thrust = false;
        }
        if (frame > 20 && keyIsPressed) {
            state = 0;
            frame = 0;
        }
    }
}
//END OF DRAW---------------------------------------------------

function drawLander(x, y) {
    fill(255, 100, 0);
    push();
    translate(x, y);
    rotate(angle);
    translate(-x, -y);
    rectMode(CENTER);

    noStroke();
    fill(255);
    beginShape();
    vertex(x - 10, y);
    vertex(x - 10, y + 10);
    vertex(x - 18, y + 14);
    endShape();
    beginShape();
    vertex(x + 10, y);
    vertex(x + 10, y + 10);
    vertex(x + 18, y + 14);
    endShape();

    noStroke();
    fill(255, 100, 0);
    circle(x, y - 10, 10);
    rect(x, y, rectsize, rectsize);
    fill(255);
    circle(x, y - 10, 5);
    if (frame % 2 == 0 && thrust) {
        fill(255);
        //rect(x, y + 15, 10, 10);
        triangle(x - 5, y + 12, x + 5, y + 12, x, y + 30);
    }

    pop();
}

function drawStars() {
    //var x;
    //var y;
    //var radius;
    randomSeed(10);
    noStroke();
    for (i = 0; i < stars; i++) {
        x1 = random(0, width);
        y1 = random(0, height - 100);
        r = random(1, 2);
        fill((r / 2) * 255 - 120);
        circle(x1, y1, r);
    }
}

var stars = 80;

function drawTerrain() {
    randomSeed(0);
    xt = 0;
    yt = random(0, 100);
    strokeWeight(2);
    stroke(255);

    while (xt < width) {
        yt1 = random(0, 100);
        xt1 = xt + random(20, 50);
        line(xt, height - yt, xt1, height - yt1);
        xt = xt1;
        yt = yt1;
    }
}

function drawLanding() {
    noStroke();
    fill(255, 0, 0);
    rect(90, height - 70, 80, 10);
}

function spawnship() {
    x = 300;
    y = 30;
    fuel = 400;
    angle = 0;
    power = 0.03;
}

function drawFuel() {
    //Tankanzeige
    fill(255);
    textSize(30);
    textAlign(LEFT);
    text("Fuel: " + fuel, 20, 40);
}

function consoleLog(text) {
    //console.log(text);
}