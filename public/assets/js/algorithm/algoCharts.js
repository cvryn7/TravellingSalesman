

google.charts.load('current', {packages: ['corechart', 'bar']});

//Draw bar chart for time taken to find minimum
google.charts.setOnLoadCallback(drawTimeChart);

//Draw bar chart for minimum distance found
google.charts.setOnLoadCallback(drawDistChart);

var algoTime = [0, 0, 0, 0];
var algoMinDist = [0, 0, 0, 0];
var timeChartFlag = true;
var distChartFlag = true;
var materialTimeChart;
var materialDistChart;

function drawTimeChart(data, reset) {
  if (data) {
    algoTime[data.id] = data.time;
  }
  if (reset) {
    for (var i = 0; i < algoTime.length ; i++) {
      algoTime[i] = 0;
    }
  }
  var chartData = google.visualization.arrayToDataTable([
    ['Algorithms', algoTime[0] + " ms", algoTime[1] + " ms", algoTime[2] + " ms", algoTime[3] + " ms"],
    ['B-F Repetition', algoTime[0], 0, 0, 0],
    ['B-F NoRepetition', 0, algoTime[1], 0, 0],
    ['Genetic No Crossover', 0, 0, algoTime[2], 0],
    ['Genetic Crossover', 0, 0, 0, algoTime[3]]
  ]);


  var materialOptions = {
    chart: {
      title: 'Time to find minimum distance'
    },
    vAxis: {
      title: 'Total Time',
      minValue: 0,
    },
    hAxis: {
      title: 'Algorithm'
    },
    bars: 'horizontal'
  };
  if (timeChartFlag) {
    materialTimeChart = new google.charts.Bar(document.getElementById('timeChart'));
    materialTimeChart.draw(chartData, materialOptions);
    timeChartFlag = false;
  }else {
    materialTimeChart.draw(chartData, materialOptions);
  }

}

function drawDistChart(data, reset) {
  if (data) {
    algoMinDist[data.id] = data.dist;
  }
  if (reset) {
    for (var i = 0; i < algoMinDist.length ; i++) {
      algoMinDist[i] = 0;
    }
  }
  var chartData = google.visualization.arrayToDataTable([
    ['Algorithms', nf(algoMinDist[0],0,2) + " px", nf(algoMinDist[1],0,2) + " px", nf(algoMinDist[2],0,2)+" px", nf(algoMinDist[3],0,2)+" px"],
    ['B-F Repetition', algoMinDist[0], 0, 0, 0],
    ['B-F NoRepetition', 0, algoMinDist[1], 0, 0],
    ['Genetic No Crossover', 0, 0, algoMinDist[2], 0],
    ['Genetic Crossover', 0, 0, 0,algoMinDist[3]]
  ]);

  var materialOptions = {
    chart: {
      title: 'Minimum Distance Found in px'
    },
    vAxis: {
      title: 'Total Distance',
      minValue: 0,
      ticks: [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000]
    },
    hAxis: {
      title: 'Algorithms'
    },
    bars: 'horizontal',
  };

  if (distChartFlag) {
    materialDistChart = new google.charts.Bar(document.getElementById('minDistance'));
    materialDistChart.draw(chartData, materialOptions);
    distChartFlag = false;
  } else {
    materialDistChart.draw(chartData, materialOptions)
  }

}
