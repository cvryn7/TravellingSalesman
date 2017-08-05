var order = [];
var totalPermutation;
var count = 0;

function setupLexiOrdering() {
  order = [];
  totalPermutation = 0;
  count = 0;

  //Initialize order array with ascending order of numbers
  for (var i = 0; i < cities.length; i++) {
    order[i] = i;
  }

  //Calculate initial total distance
  var distance = calcDistanceWithOrder(cities, order);
  minDistance = distance;
  setDistanceInChart();
  bestCitiesOrder = order.slice()// get full shallow copy of order array

  totalPermutation = factorial(totalCities);
}

function lexiOrderingDraw(algoName) {

  drawHeading(algoName);
  drawMinDistance(minDistance);
  //draw path between the cities
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  //draw the best minimum distance path found so far
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    var n = bestCitiesOrder[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  drawCities();

  //find next permutation in lexicographic order
  nextOrder();

  textSize(20);
  fill(255);
  strokeWeight(0);
  var percent = 100 * (count/totalPermutation);

  text(nf(percent, 0, 2) + "% Completed", 20, height - 20);
  //calculate distance of new order of the cities
  //and check if it is the new minimum distance
  var distance = calcDistanceWithOrder(cities, order);
  if (distance < minDistance) {
    minDistance = distance;
    bestCitiesOrder = order.slice();
    setDistanceInChart();
    setTimePassedInChart();
  }
}


/**
 * function implementing algorithm for find next largest
 * permutation in lexicographical order. Algorithm is
 * explained at following link:
 * https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
 */
function nextOrder() {
  count++;
  //STEP 1 of the algorithm
  //Find the largest x such that order[x] < order[x+1]
  //(if there is no such x, P is the last permutation
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i+1]) {
      largestI = i;
    }
  }

  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  //STEP 2 of the algorithm
  //Find the largest y such that order[x] < order[y]
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  //STEP 3 of the algorithm
  //Swap order[x] and order[y]
  swap(order, largestI, largestJ);

  //STEP 4 of the algorithm
  //Reverse order[x+1 .. n]

  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

/**
 * Calculate total distance travelled if walked through
 * points in the order of order array
 * @param points
 */
function calcDistanceWithOrder(points, order) {
  var totalDistance = 0;
  for (var i = 0; i < order.length-1; i++) {
    //p5js dist function calculates distance between two coordinates
    var cityA = points[order[i]];
    var cityB = points[order[i+1]];
    var distance = dist(cityA.x , cityA.y, cityB.x, cityB.y);
    totalDistance += distance;
  }
  return totalDistance;
}

/**
 *  finds factorial of a number
 */
function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n-1);
  }
}
