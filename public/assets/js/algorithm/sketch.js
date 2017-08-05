var cities = [];
var totalCities = 8;
var minDistance;
var bestCitiesOrder;
var option = 0;
var algoName = "Brute Force with Repetition";
var cityArrayReset = true;
var startTime;
function changeCitiesArray() {
  //Initialized cities array with random x and y positions
  for (var i = 0; i < totalCities; i++) {
    var vec = createVector(random(10, width-10), random(20, (height)-20));
    cities[i] = vec;
  }
}

function setup(opt, algo, reformCitiesArray) {
    var canvas = createCanvas(800, 600);
    canvas.parent('canvasDiv');
    option = opt !== undefined? opt : option;
    algoName = algo !== undefined? algo : algoName;
    cityArrayReset = reformCitiesArray !== undefined? reformCitiesArray: cityArrayReset;
    if (cityArrayReset) {
      changeCitiesArray();
      drawTimeChart(null, true);
      drawDistChart(null, true);
      cityArrayReset = false;
    }
    startTime = new Date();
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
  loop();
}

function draw() {
    background(0);
    switch(option) {
        case 0:
            bruteForceWithRepetitionDraw(algoName);
            break;
        case 1:
            lexiOrderingDraw(algoName);
            break;
        case 2:
            genetaicAlgorithmDraw(algoName);
            break;
        case 3:
            genetaicCrossOverAlgorithmDraw(algoName);
            break;
        default:
            lexiOrderingDraw(algoName);
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
 * Draw heading label
 */
function drawHeading(heading) {
  textSize(20);
  fill(255);
  strokeWeight(0);

  text(heading, 5, 20);
}

/**
 * Draw min distance label
 */
function drawMinDistance(minDist) {
  textSize(20);
  fill(255);
  strokeWeight(0);

  text("Minimun Distnace: " + nf(minDist, 0, 2) + " px", 500, 20);
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

/**
 * Function to set minimunDistance on google charts
 */
function setDistanceInChart() {
  var data = {
    "id": option,
    "dist": minDistance
  }

  drawDistChart(data);
}

function setTimePassedInChart() {
  var time = (new Date()) - startTime;
  var data = {
    "id": option,
    "time": time
  }

  drawTimeChart(data);
}
