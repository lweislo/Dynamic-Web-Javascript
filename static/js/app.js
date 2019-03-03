
// from data.js
var data = data;
var mydate = "1/10/2010";
// var mycity = "el cajon"
// var mystate = "ca"
// var myshape = "triangle"

var dateFilter = d3.select("#filter-btn");

function filterChange(event) {
  d3.event.preventDefault();

  var inputValue = d3.select("#datetime").property("value");
  // console.log("This is the input", inputValue)
  var filteredData = data.filter(date => date.datetime === inputValue);
  // console.log("This is my data before drawing", filteredData);
  drawTable(filteredData)
  //Then go on and insert rows/columns into table using D3
}

dateFilter.on("click", filterChange);

// Get a reference to the table body
function drawTable(filteredData) {
  var tbody = d3.select("tbody");
  var tdiv = d3.select("#table-area")

  filteredData.forEach((ufoSighting) => {
  var row = tbody.append("tr");
  Object.entries(ufoSighting).forEach(([key, value]) => {
    var cell = tbody.append("td");
    cell.text(value);
  }); //end of forEach 2
}); //end of forEach 1

} //end of function

// On page load, show a slice of the data
function defaultTable(event) {
  console.log("This is my default table");
  drawTable(data.slice(0,10));
}
window.onload = function () {
  defaultTable();
};
