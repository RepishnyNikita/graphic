function colorYesterdayColumn() {
  const percentage = document.querySelectorAll(".percentage");
  percentage.forEach((item) => {
    const value = parseFloat(item.textContent.replace("%", ""));
    if (value > 0) {
      item.parentElement.parentElement.classList.add("background-green");
    } else if (value < 0) {
      item.parentElement.parentElement.classList.add("background-red");
      item.classList.add("red");
    } else {
      item.classList.add("green");
    }
    if (value >= 0) {
      item.classList.add("green");
    }
  });
}
colorYesterdayColumn();

function colorDayOfWeakColumn() {
  const rows = document.querySelectorAll("table tr");

  if (rows.length > 1) {
    const secondRowCells = rows[1].querySelectorAll("td");
    const lastCell = secondRowCells[secondRowCells.length - 1];
    const value = parseFloat(lastCell.textContent.replace(/[^0-9]/g, ""), 10);
    if (value < 5000000) {
      lastCell.classList.add("background-red");
    }
  }

  for (let i = 5; i <= 8; i++) {
    if (rows.length > i) {
      const cells = rows[i].querySelectorAll("td");
      const lastCell = cells[cells.length - 1];
      const value = parseFloat(lastCell.textContent.replace(/[^0-9]/g, ""), 10);
      if (value > 700) {
        lastCell.classList.add("background-green");
      }
    }
  }

  if (rows.length > 10) {
    const eleventhRowCells = rows[10].querySelectorAll("td");
    const lastCell = eleventhRowCells[eleventhRowCells.length - 1];
    const value = parseFloat(lastCell.textContent.replace(/[^0-9]/g, ""), 10);
    if (value > 30) {
      lastCell.classList.add("background-green");
    }
  }
}
colorDayOfWeakColumn();


function renderHighcharts(container, name, data) {
  Highcharts.chart(container, {
    chart: { type: "line" },
    title: { text: `График по показателю: ${name}` },
    xAxis: { categories: ["Текущий день", "Вчера", "Этот день недели"] },
    yAxis: { title: { text: "Значение" } },
    series: [{ name: name, data: data }],
  });
}


function createRowsGraph() {
  const rows = document.querySelectorAll("table tr:not(:first-child)");
  rows.forEach((row) => {
    row.addEventListener("click", function () {
      const cells = row.querySelectorAll("td");
      const name = cells[0].textContent.trim(); 
      const today = parseInt(cells[1].textContent.replace(/[^0-9]/g, ""), 10); 
      const yesterday = parseFloat(
        cells[2].querySelector(".value").textContent.replace(/[^0-9]/g, ""),
        10
      ); 
      const dayOfWeek = parseFloat(
        cells[3].textContent.replace(/[^0-9]/g, ""),
        10
      ); 

      let chartRow = row.nextElementSibling; 
      if (chartRow && chartRow.classList.contains("chart-row")) {
        chartRow.remove(); 
      } else {
        chartRow = document.createElement("tr");
        chartRow.classList.add("chart-row");

        const chartCell = document.createElement("td");
        chartCell.colSpan = 4;
        chartCell.style.padding = "0";
        chartRow.appendChild(chartCell);

        const chartContainer = document.createElement("div");
        chartContainer.style.width = "100%";
        chartContainer.style.height = "300px";
        chartCell.appendChild(chartContainer);
        row.after(chartRow); 
        renderHighcharts(chartContainer, name, [today, yesterday, dayOfWeek]); 

        chartRow.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  });
}
createRowsGraph();
