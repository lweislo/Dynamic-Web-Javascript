
// from data.js
var data = data;
//====================
//Populate Dropdown list array
var uniqueDate = []
var uniqueCity = []
var uniqueState = []
//====================
// To convert the table data to proper case
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
//========================
data.forEach((item) => {
Object.entries(item).forEach(([key, value]) => {
if (key === "datetime") {
  if (!uniqueDate.includes(value)) {
      uniqueDate.push(value);}}
  else if (key === "city") {
    if (!uniqueCity.includes(value)) {
      value = value.toProperCase();
      uniqueCity.push(value);}}
  else if (key === "state") {
    if (!uniqueState.includes(value)) {
    uniqueState.push(value);}}
  });
});
// Populate the dropdown list itself
//=============DATE========================
var dateDdl = d3.select("#date-ddl")
uniqueDate.forEach((date) => {
  var listitem = dateDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "datetime")
  .text(date)
  .on("click", filterChange);
});
//=============STATE=======================
uniqueState.sort()
var stateDdl = d3.select("#state-ddl")
uniqueState.forEach((state) => {
  state = state.toUpperCase();
  var listitem = stateDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "state")
  .text(state)
  .on("click", filterChange);
});
//============CITY=======================
uniqueCity.sort()
var cityDdl = d3.select("#city-ddl")
uniqueCity.forEach((city) => {
  var listitem = cityDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "city")
  .text(city)
  .on("click", filterChange);
});
//=========================================
// Showing all data from bottom link
var moreData = d3.select("#table-end")
moreData.on("click", allData);
//====================
function filterChange(event) {
  d3.event.preventDefault();
  var inputText = d3.select(this).property("text");
  inputText = inputText.toLowerCase();
  var inputOrigin = d3.select(this).attr("value");
  if (inputOrigin === "datetime") {
  var filteredData = data.filter(item => item.datetime === inputText);}
  else if (inputOrigin === "state") {
  var filteredData = data.filter(item => item.state === inputText);}
  else if (inputOrigin === "city") {
  var filteredData = data.filter(item => item.city === inputText);}

  console.log("This is my data before drawing", filteredData);
  drawTable(filteredData)
  //Then go on and insert rows/columns into table using D3
}
//===================
// Get a reference to the table body
function drawTable(filteredData) {
  var tbody = d3.select("tbody");
  var tdiv = d3.select("#table-area")
  tbody.html("")
// Add the rows and cells of data from the data.js source file.
  filteredData.forEach((ufoSighting) => {
  var row = tbody.append("tr");
  Object.entries(ufoSighting).forEach(([key, value]) => {
    // Pretty up cases in table data
    if (key === "city") {
      value = value.toProperCase();}
    else if (key === "state" || key === "country") {
      value = value.toUpperCase();}
    else if (key === "comments") {
      value = stripHtml(value); }
    // else if (key === "durationMinutes") {
    //   durationParse(value)
    // }
    var cell = tbody.append("td");
    cell.text(value);
  }); //end of forEach 2
}); //end of forEach 1
} //end of function
//====================
// On page load, show a slice of the data
function defaultTable(event) {
  drawTable(data.slice(0,10));
}
window.onload = function () {
  defaultTable();
};
//====================
// Load all of the data if the user clicks the link at the bottom
function allData(event) {
  // d3.event.preventDefault();
  drawTable(data);
}

//====================
function stripHtml(html){
    // Create a temporary div element
    var tempDiv = document.createElement("div");
    // Set the HTML content with the provided
    tempDiv.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return tempDiv.textContent || tempDiv.innerText || "";
}
//====================
