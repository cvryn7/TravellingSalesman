var population = [];
var fitness = []; // for saving fitness score of elements in population
var numberOfGenerations = 200;
var populationSize = 100;
var generationCount = 0;
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
    for (var i = 0; i < populationSize; i++) {
        //get a shuffled copy of the order array
        population[i] = shuffle(order);
    }


    //Calculate initial total distance
    var distance = calcDistanceWithOrder(cities, order);
    minDistance = distance;
    bestCitiesOrder = order.slice()// get full shallow copy of order array

    totalPermutation = factorial(totalCities);
}

function genetaicAlgorithmDraw() {
    background(0);
    frameRate(10);
    stroke(255);
    strokeWeight(2);
    noFill();

    for (var i = 0; i < population.length; i++) {
        background(0);
        beginShape();
        var order = population[i];
        for (var j = 0; j < order.length; j++) {
            var index = order[j];
            vertex(cities[index].x , cities[index].y);
        }
        endShape();
    }

    //Genetic algorithm
    calculateFitness();


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
    normalizeFitness();
    nextGeneration();
    if (generationCount > numberOfGenerations) {
        noLoop();
    }
}

/**
 * Calculate fitness for the order set available in the
 * current population. Lesser the distance more the fitness
 */
function calculateFitness() {
    for ( var i = 0; i < population.length; i++) {
        var distance = calcDistanceWithOrder(cities, population[i]);
        if (distance < minDistance) {
            minDistance = distance;
            bestCitiesOrder = population[i];
        }
        //distance + 1 to avoid divide by zero error
        fitness[i] = 1/(distance+1);
    }
    console.log(minDistance);
}

/**
 * Map the fitness to a probability of 0 to 1 so that
 * all fitness scores can add up to 1.
 */
function normalizeFitness() {
    var sum = 0;
    for (var i = 0; i < fitness.length; i++) {
        sum += fitness[i];
    }

    for (var i = 0; i < fitness.length; i++) {
        fitness[i] = fitness[i]/ sum;
    }
}

/**
 * Produce next set of orders of cities based on the
 * fitness scores of the previous population
 */
function nextGeneration() {
    generationCount++;
    var newPopulation = [];
    for (var i = 0; i < population.length; i++) {
        //we want to pick order with higher fitness
        //and leave the other orders.
        var order = pickOne(population, fitness);
        mutate(order, 1);
        newPopulation[i] = order;
    }
    population = newPopulation
}

/**
 * Pick the one order in population based on fitness
 * value
 */
function pickOne(population, fitness) {
    var index = 0;
    var r = random(1);

    while (r > 0) {
        r = r - fitness[index];
        index++;
    }
    index--;
    return population[index].slice();
}

/**
 * Change the order with swaping some of the
 * element by mutation rate
 * @param order
 * @param mutationRate
 */
function mutate(order, mutationRate) {
    for (var i = 0; i < mutationRate; i++) {
        var indexA = floor(random(order.length));
        var indexB = floor(random(order.length));
        swap(order, indexA, indexB);
    }
}

