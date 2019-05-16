/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    10.2 - File Separation
 */

// var parseTime = d3.timeParse("%m/%d/%Y %H:%M %p");
// var formatTime = d3.timeFormat("%Y/%m/%d %H:%M %p");

var parseTime = d3.timeParse("%A %H:%M");
var formatTime = d3.timeFormat("%H:%M");

// Event listeners
$("#coin-select").on("change", update);
$("#var-select").on("change", update);

// Add jQuery UI slider
$("#date-slider").slider({
  range: true,
  max: parseTime("Friday 23:59").getTime(),
  min: parseTime("Friday 12:30").getTime(),
  step: 60000, // One minute
  values: [
    parseTime("Friday 10:30").getTime(),
    parseTime("Friday 23:59").getTime()
  ],
  slide: function(event, ui) {
    $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
    $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
    update();
  }
});

// d3.csv("../preClean.csv").then(function(data) {
// console.log(data);

d3.csv("../mergedClean.csv").then(function(mergedData) {
  console.log(mergedData);

  let preMean = [
    {
      hour: 1,
      meanAmps: 24.7883211904762
    },
    {
      hour: 2,
      meanAmps: 23.2425228571428
    },
    {
      hour: 3,
      meanAmps: 21.933863095238
    },
    {
      hour: 4,
      meanAmps: 23.9212842857142
    },
    {
      hour: 5,
      meanAmps: 23.8431247619047
    },
    {
      hour: 6,
      meanAmps: 31.18374
    },
    {
      hour: 7,
      meanAmps: 28.5351188095238
    },
    {
      hour: 8,
      meanAmps: 29.2612254761905
    },
    {
      hour: 9,
      meanAmps: 31.6158813084112
    },
    {
      hour: 10,
      meanAmps: 33.0034575
    },
    {
      hour: 11,
      meanAmps: 33.2629194630873
    },
    {
      hour: 12,
      meanAmps: 31.5424227380952
    },
    {
      hour: 13,
      meanAmps: 33.0355716666667
    },
    {
      hour: 14,
      meanAmps: 33.0382964285714
    },
    {
      hour: 15,
      meanAmps: 32.9276490476191
    },
    {
      hour: 16,
      meanAmps: 32.7866290476191
    },
    {
      hour: 17,
      meanAmps: 36.3133561904761
    },
    {
      hour: 18,
      meanAmps: 35.8700461904762
    },
    {
      hour: 19,
      meanAmps: 34.3431945238095
    },
    {
      hour: 20,
      meanAmps: 36.0146814285715
    },
    {
      hour: 21,
      meanAmps: 35.0092435714285
    },
    {
      hour: 22,
      meanAmps: 34.4872807142857
    },
    {
      hour: 23,
      meanAmps: 32.2525369047619
    }
  ];

  let postMean = [
    {
      hour: "01",
      meanAmps: 24.788321190476186
    },
    {
      hour: "02",
      meanAmps: 23.24252285714285
    },
    {
      hour: "03",
      meanAmps: 21.93386309523804
    },
    {
      hour: "04",
      meanAmps: 23.92128428571424
    },
    {
      hour: "05",
      meanAmps: 23.84312476190475
    },
    {
      hour: "06",
      meanAmps: 31.18374
    },
    {
      hour: "07",
      meanAmps: 28.53511880952382
    },
    {
      hour: "08",
      meanAmps: 29.26122547619049
    },
    {
      hour: "09",
      meanAmps: 31.61588130841124
    },
    {
      hour: 10,
      meanAmps: 33.00345750000001
    },
    {
      hour: 11,
      meanAmps: 33.262919463087265
    },
    {
      hour: 12,
      meanAmps: 31.542422738095233
    },
    {
      hour: 13,
      meanAmps: 33.035571666666655
    },
    {
      hour: 14,
      meanAmps: 33.03829642857143
    },
    {
      hour: 15,
      meanAmps: 32.92764904761908
    },
    {
      hour: 16,
      meanAmps: 32.786629047619094
    },
    {
      hour: 17,
      meanAmps: 36.31335619047615
    },
    {
      hour: 18,
      meanAmps: 35.8700461904762
    },
    {
      hour: 19,
      meanAmps: 34.34319452380953
    },
    {
      hour: 20,
      meanAmps: 36.01468142857146
    },
    {
      hour: 21,
      meanAmps: 35.009243571428506
    },
    {
      hour: 22,
      meanAmps: 34.487280714285724
    },
    {
      hour: 23,
      meanAmps: 32.252536904761875
    }
  ];

  console.log(postMean);

  // pre - intervention data
  filteredDataArray = mergedData
    .map((measure, i) => {
      let preFilteredData = {};
      // if (measure.weekday === "Friday") {

      // console.log(postMean[i].meanAmps);
      (preFilteredData["amps"] = Number(measure.amps_x)),
        (preFilteredData["time"] = Number(
          parseTime(`${measure.weekday} ${measure.time}`)
        )),
        (preFilteredData["postAmps"] = Number(measure.amps_y)),
        (preFilteredData["weekday"] = measure.weekday);
      // console.log(preFilteredData);
      return preFilteredData;
      // }

      // measure.time
    })
    .filter(measure => {
      // console.log(measure);
      return measure.weekday === "Friday";
    });

  console.log(filteredDataArray);
  console.log(postMean);

  update();
});
// });

// d3.csv("../preAmps.csv").then(function(data) {
//   console.log(data);
//   // Prepare and clean data

//   filteredDataArray = data.map(beer => {
//     let filteredData = {};
//     beer.time = beer.time.replace("/19", "/2019");
//     // console.log(beer.time);
//     let date = parseTime(beer.time);
//     // console.log(Number(date));
//     filteredData["amps"] = Number(beer.amps);
//     filteredData["time"] = Number(date);

//     return filteredData;
//   });

//   // console.log(filteredDataArray[0]);

//   // Run the visualization for the first time
//   update();
// });
