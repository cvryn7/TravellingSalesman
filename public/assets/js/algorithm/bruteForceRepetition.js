
function setupBruteForceWithRepetition() {
    var distance = calcDistance(cities);
    minDistance = distance;
    setDistanceInChart();
    bestCitiesOrder = cities.slice()// get full shallow copy of cities
}

/**
 * Draw paths using brute force technique with repetitions
 */
function bruteForceWithRepetitionDraw(algoName) {

    drawHeading(algoName);
    drawMinDistance(minDistance);
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
        setDistanceInChart();
        setTimePassedInChart();
        bestCitiesOrder = cities.slice() // get full shallow copy of the cities array
    }
}
