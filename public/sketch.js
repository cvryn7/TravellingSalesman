var cities = [];
var totalCities = 8;
var minDistance;
var bestCitiesOrder;
var option = 3;

function setup() {
    createCanvas(500, 500);

    switch(option) {
        case 0:
            setupBruteForceWithRepetition();
            break;
        case 1:
            setupLexiOrdering();
            break;
        case 2:
            setupGeneticAlgorithm();
            break;
        case 3:
            setupGeneticCrossoverAlgorithm();
            break;
        default:
            setupLexiOrdering();
    }
}

function draw() {
    background(0);
    switch(option) {
        case 0:
            bruteForceWithRepetitionDraw();
            break;
        case 1:
            lexiOrderingDraw();
            break;
        case 2:
            genetaicAlgorithmDraw();
            break;
        case 3:
            genetaicCrossOverAlgorithmDraw();
            break;
        default:
            lexiOrderingDraw();
    }
}

/**
 * Draw cities as ellipse
 */
function drawCities() {
    stroke(0, 255, 0);
    strokeWeight(2);
    noFill();
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 10, 10);
    }
}

/**
 * Swaps cities in the array to draw different possible
 * paths between the cities
 * @param array
 * @param indexI
 * @param indexJ
 */
function swap(array, indexI, indexJ) {
    var temp = array[indexI];
    array[indexI] = array[indexJ];
    array[indexJ] = temp;
}

/**
 * Calculate total distance travelled if walked through
 * point in their insertion order
 * @param points
 */
function calcDistance(points) {
    var totalDistance = 0;
    for (var i = 0; i < points.length-1; i++) {
        //p5js dist function calculates distance between two coordinates
        var distance = dist(points[i].x , points[i].y, points[i+1].x, points[i+1].y);
        totalDistance += distance;
    }
    return totalDistance;
}