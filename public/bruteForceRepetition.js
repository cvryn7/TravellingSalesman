function setupBruteForceWithRepetition() {
    //Initialized cities array with random x and y positions
    for (var i = 0; i < totalCities; i++) {
        var vec = createVector(random(10, width-10), random(10, (height)-10));
        cities[i] = vec;
    }
    var distance = calcDistance(cities);
    minDistance = distance;
    bestCitiesOrder = cities.slice()// get full shallow copy of cities
}

/**
 * Draw paths using brute force technique with repetitions
 */
function bruteForceWithRepetitionDraw() {
    //draw path between the cities
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();

    //draw best found path
    stroke(255, 0, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        vertex(bestCitiesOrder[i].x, bestCitiesOrder[i].y);
    }
    endShape();

    //draw all cities represented by white ellipse
    drawCities();
    swap(cities, floor(random(cities.length)), floor(random(cities.length)));
    var distance = calcDistance(cities);
    if (distance < minDistance) {
        minDistance = distance;
        bestCitiesOrder = cities.slice() // get full shallow copy of the cities array
    }
}