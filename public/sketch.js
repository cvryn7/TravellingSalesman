var cities = [];
var totalCities = 3;
function setup() {
    createCanvas(400, 300);

    //Initialized cities array with random x and y positions
    for (var i = 0; i < totalCities; i++) {
        var vec = createVector(random(10, width-10), random(10, height-10));
        cities[i] = vec;
    }
}

function draw() {
    background(0);

    //draw all cities represented by white ellipse
    fill(255);
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    //draw path between the cities
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();
}