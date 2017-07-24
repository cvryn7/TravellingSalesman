var population = [];
var fitness = []; // for saving fitness score of elements in population
function setupGeneticAlgorithm() {
    minDistance = Infinity;
    var order = [];

    //Initialized cities array with random x and y positions
    for (var i = 0; i < totalCities; i++) {
        var vec = createVector(random(10, width-10), random(10, (height)-40));
        cities[i] = vec;
        //fill order array with indexes
        order[i] = i;
    }

    //fill population with order arrays of random sequences
    for (var i = 0; i < 10; i++) {
        //get a shuffled copy of the order array
        population[i] = shuffle(order);
    }

    for ( var i = 0; i < population.length; i++) {
        var distance = calcDistanceWithOrder(cities, population[i]);
        if (distance < minDistance) {
            minDistance = distance;
            bestCitiesOrder = population[i];
        }
        fitness[i] = distance;
    }

    //Calculate initial total distance
    var distance = calcDistanceWithOrder(cities, order);
    minDistance = distance;
    bestCitiesOrder = order.slice()// get full shallow copy of order array

    totalPermutation = factorial(totalCities);
}

function genetaicAlgorithmDraw() {
    background(0);


    stroke(255, 0, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < bestCitiesOrder.length; i++) {
        var n = bestCitiesOrder[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();
    drawCities();
}

