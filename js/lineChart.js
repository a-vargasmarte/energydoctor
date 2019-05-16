/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    10.2 - File Separation
 */


// d3.csv('../preMean.csv', data => {
//   console.log(data);
// })


var margin = { left: 80, right: 100, top: 50, bottom: 100 },
  height = 500 - margin.top - margin.bottom,
  width = 800 - margin.left - margin.right;

var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);
var g = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var t = function() {
  return d3.transition().duration(1000);
};

var bisectDate = d3.bisector(function(d) {
  return d.date;
}).left;

// Add the line for the first time
g.append("path")
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-width", "3px");

g.append("path")
  .attr("class", "postLine")
  .attr("fill", "none")
  .attr("stroke", "green")
  .attr("stroke-width", "3px");

// Labels
var xLabel = g
  .append("text")
  .attr("class", "x axisLabel")
  .attr("y", height + 50)
  .attr("x", width / 2)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Time");
var yLabel = g
  .append("text")
  .attr("class", "y axisLabel")
  .attr("transform", "rotate(-90)")
  .attr("y", -60)
  .attr("x", -170)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Amps");

// Scales
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// X-axis
var xAxisCall = d3.axisBottom().ticks(10);
var xAxis = g
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")");

// Y-axis
var yAxisCall = d3.axisLeft();
var yAxis = g.append("g").attr("class", "y axis");

function update() {

  // console.log(postMean);
  // Filter data based on selections
  var coin = $("#coin-select").val(),
    yValue = "amps",
    sliderValues = $("#date-slider").slider("values");
  var dataTimeFiltered = filteredDataArray.filter(function(d) {
    // console.log(d);
    // console.log(
    //   Number(d.time) >= sliderValues[0] && Number(d.time) <= sliderValues[1]
    // );
    return (
      Number(d.time) >= sliderValues[0] &&
      Number(d.time) <= sliderValues[1] &&
      d.amps > 20
    );
  });

  // console.log(filteredDataArray[0]);
  //   console.log(parseTime("2019/12/31").getTime());
  // console.log(
  //   Date($("#date-slider").slider("values")[0]),
  //   Date($("#date-slider").slider("values")[1])
  // );

  // console.log(dataTimeFiltered);

  // Update scales
  x.domain(
    d3.extent(dataTimeFiltered, function(d) {
      //   console.log(d.date);
      return d.time;
    })
  );
  y.domain([
    d3.min(dataTimeFiltered, function(d) {
      return Number(35);
    }) / 1.005,
    d3.max(dataTimeFiltered, function(d) {
      return Number(d.amps);
    }) * 1.005
  ]);

  // Fix for format values
  var formatSi = d3.format(".2s");
  function formatAbbreviation(x) {
    var s = formatSi(x);
    switch (s[s.length - 1]) {
      case "G":
        return s.slice(0, -1) + "B";
      case "k":
        return s.slice(0, -1) + "K";
    }
    return s;
  }

  // Update axes
  xAxisCall.scale(x);
  xAxis.transition(t()).call(xAxisCall);
  yAxisCall.scale(y);
  yAxis.transition(t()).call(yAxisCall.tickFormat(formatAbbreviation));

  // Clear old tooltips
  d3.select(".focus").remove();
  d3.select(".overlay").remove();

  // Tooltip code
  var focus = g
    .append("g")
    .attr("class", "focus")
    .style("display", "none");
  focus
    .append("line")
    .attr("class", "x-hover-line hover-line")
    .attr("y1", 0)
    .attr("y2", height);
  focus
    .append("line")
    .attr("class", "y-hover-line hover-line")
    .attr("x1", 0)
    .attr("x2", width);
  focus.append("circle").attr("r", 5);
  focus
    .append("text")
    .attr("x", 15)
    .attr("dy", ".31em");
  svg
    .append("rect")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function() {
      focus.style("display", null);
    })
    .on("mouseout", function() {
      focus.style("display", "none");
    })
    .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(dataTimeFiltered, x0, 1),
      d0 = dataTimeFiltered[i - 1],
      d1 = dataTimeFiltered[i],
      d = d1 && d0 ? (x0 - d0.time > d1.time - x0 ? d1 : d0) : 0;
    focus.attr(
      "transform",
      "translate(" + x(d.time) + "," + y(Number(d.amps)) + ")"
    );
    focus.select("text").text(function() {
      // console.log(d);
      return d3.format("$,")(Number(d.amps).toFixed(2));
    });
    focus.select(".x-hover-line").attr("y2", height - y(Number(d.amps)));
    focus.select(".y-hover-line").attr("x2", -x(d.time));
  }

  // Path generator
  line = d3
    .line()
    .x(function(d) {
      return x(d.time);
    })
    .y(function(d) {
      return y(Number(d.amps));
    });

  let postLine = d3
    .line()
    .x(function(d) {
      return x(d.time);
    })
    .y(function(d) {
      // console.log(d.postAmps);
      return y(Number(d.postAmps));
    });

  // Update our line path
  g.select(".line")
    .transition(t)
    .attr("d", line(dataTimeFiltered));

  g.select(".postLine")
    .transition(t)
    .attr("d", postLine(dataTimeFiltered));

  // Update y-axis label
  // var newText =
  //   yValue == "price_usd"
  //     ? "Price (USD)"
  //     : yValue == "market_cap"
  //     ? "Market Capitalization (USD)"
  //     : "24 Hour Trading Volume (USD)";
  // yLabel.text(newText);
}
