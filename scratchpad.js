// from data.js
var tableData = data;
var mydate = "1/10/2010";
var mycity = "el cajon"
var mystate = "ca"
var myshape = "triangle"
// Get a reference to the table body
var tbody = d3.select("tbody");

function selectDate(item) {
  return item.datetime === mydate;
}
function selectCity(item) {
  return item.city === mycity;
}
function selectState(item) {
  return item.state === mystate;
}
function selectShape(item) {
  return item.shape === myshape;
}
filteredData = tableData.filter(person => person.bloodType === inputValue);

// filter() uses the custom function as its argument
var selectedDate = tableData.filter(date => date.datetime ==- inputValue);
var selectedCity = tableData.filter(selectCity);
var selectedState = tableData.filter(selectState);
var selectedShape = tableData.filter(selectShape);
console.log(selectedDate);
console.log(selectedCity);
console.log(selectedState);
console.log(selectedShape);

// Select the submit button
var dateFilter = d3.select("#filter-btn");

function filterChange(event) {
  d3.event.preventDefault();
  inputElement = d3.select("#datetime")
  var inputValue = inputElement.property("value");
  var filteredData = tableData.filter(item => item.datetime === inputValue);

  //Then go on and insert rows/columns into table using D3
}

dateFilter.on("click", filterChange);
