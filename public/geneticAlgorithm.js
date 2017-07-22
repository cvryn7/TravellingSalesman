var population = [];

function setupGeneticAlgorithm() {
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

    //Calculate initial total distance
    var distance = calcDistanceWithOrder(cities, order);
    minDistance = distance;
    bestCitiesOrder = order.slice()// get full shallow copy of order array

    totalPermutation = factorial(totalCities);
}

function genetaicAlgorithmDraw() {

}

