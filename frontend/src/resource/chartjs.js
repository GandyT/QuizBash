import Chart from "chart.js";

function makeChart(ctx, datasets, ylabel, toplabel) {
  var dict = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (const item of datasets) {
    if (item == 100) {
      dict[9] += 1
    }
    else {
      dict[Math.floor(item / 10)] += 1
    }
  }
  var somelist = []
  for (const key in Object.keys(dict)) {
    somelist.push(dict[key]);
  }
  var data = {
    labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
    datasets: [{
      label: toplabel,
      data: somelist,
      backgroundColor: [
        'rgba(255, 1, 1, 0.45)',
        'rgba(255, 84, 84, 0.45)',
        'rgba(255, 132, 1, 0.45)',
        'rgba(255, 166, 1,0.45)',
        'rgba(255, 225, 1, 0.45)',
        'rgba(255, 247, 1, 0.45)',
        'rgba(230, 255, 1, 0.45)',
        'rgba(47, 255, 0, 0.45)',
        'rgba(0, 255, 229, 0.45)',
        'rgba(0, 157, 255, 0.45)',
      ],
      borderColor: [
        'rgba(255, 1, 1, 1)',
        'rgba(255, 84, 84, 1)',
        'rgba(255, 132, 1, 1)',
        'rgba(255, 166, 1,1)',
        'rgba(255, 225, 1, 1)',
        'rgba(255, 247, 1, 1)',
        'rgba(230, 255, 1, 1)',
        'rgba(47, 255, 0, 1)',
        'rgba(0, 255, 229, 1)',
        'rgba(0, 157, 255, 1)',
      ],
      borderWidth: 1
    }]
  }

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: ylabel
          }
        }]
      }
    }
  });
  // console.log(ctx)
  // var option = {
  //   animation: {
  //     duration:5000
  //   },
  //   responsive:false,
  //   maintainAspectRatio: false,
  //   beginAtZero: true
  // };
  //
  // var myBarChart = myChart.Bar(ctx, {
  //   type: 'line',
  //   data: data,
  //   options:option,
  //
  // });
}

export default makeChart;