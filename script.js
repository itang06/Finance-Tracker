const ctx = document.getElementById("myChart");
let myChart;
let jsonData;
fetch("data.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    jsonData = data;
    createChart(data, "bar");
    calculateAverages();
  });

function setChartType(chartType) {
  myChart.destroy();
  createChart(jsonData, chartType);
}
function createChart(data, type) {
  myChart = new Chart(ctx, {
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          type: type,
          label: "Monthly Revenue",
          data: data.map((row) => row.revenue),
          borderWidth: 1,
        },
        {
          type: type,
          label: "Monthly Costs",
          data: data.map((row) => row.costs),
          borderWidth: 1,
        },
        {
          type: type,
          label: "Monthly Profit",
          data: data.map((row) => row.profit),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });
}

function toggleDataset(index) {
  const visible = myChart.isDatasetVisible(index);
  myChart.setDatasetVisibility(index, !visible);
  myChart.update();
}

function calculateAverages() {
  const sumRevenue = jsonData.reduce((acc, item) => acc + item.revenue, 0);
  const averageRevenue = (sumRevenue / jsonData.length).toFixed(2);

  const sumCosts = jsonData.reduce((acc, item) => acc + item.costs, 0);
  const averageCosts = (sumCosts / jsonData.length).toFixed(2);

  const sumProfit = jsonData.reduce((acc, item) => acc + item.profit, 0);
  const averageProfit = (sumProfit / jsonData.length).toFixed(2);

  let r = document.createElement("h5");
  r.textContent = "$" + averageRevenue;
  document.querySelector("#revenue-body > h6").after(r);

  let c = document.createElement("h5");
  c.textContent = "$" + averageCosts;
  document.querySelector("#costs-body > h6").after(c);

  let p = document.createElement("h5");
  p.textContent = "$" + averageProfit;
  document.querySelector("#profit-body > h6").after(p);

  /* total monies */
  let rTotal = document.createElement("h5");
  rTotal.textContent = "$" + sumRevenue;
  document.querySelector("#total-revenue-body > h6").after(rTotal);

  let cTotal = document.createElement("h5");
  cTotal.textContent = "$" + sumCosts;
  document.querySelector("#total-costs-body > h6").after(cTotal);

  let pTotal = document.createElement("h5");
  pTotal.textContent = "$" + sumProfit;
  document.querySelector("#total-profit-body > h6").after(pTotal);

  /*best month*/
  const highestRevenue = Math.max(...jsonData.map((item) => item.revenue));
  const highestRevenueMonth = jsonData.find(
    (item) => item.revenue === highestRevenue
  ).month;

  letHighest;

  // Find highest costs and its month
  const highestCosts = Math.max(...jsonData.map((item) => item.costs));
  const highestCostsMonth = jsonData.find(
    (item) => item.costs === highestCosts
  ).month;

  // Find highest profit and its month
  const highestProfit = Math.max(...jsonData.map((item) => item.profit));
  const highestProfitMonth = jsonData.find(
    (item) => item.profit === highestProfit
  ).month;
}
