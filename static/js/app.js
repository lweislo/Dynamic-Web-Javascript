/**
@TODO Fix it so the open text inputs are cleared after data is displayed
*/
// from data.js
var data = data;
//====================
//Populate Dropdown list array
var uniqueDate = []
var uniqueCity = []
var uniqueState = []
var uniqueCountry = []
var uniqueShape = []
//====================
// To convert the table data to proper case
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
// //========================
// //
// console.log(data.map(item => item.date)
//   .filter((value, index, self) => self.indexOf(value) === index));
// //
data.forEach((item) => {
Object.entries(item).forEach(([key, value]) => {
if (key === "datetime") {
  if (!uniqueDate.includes(value)) {
      uniqueDate.push(value);}}
  else if (key === "city") {
    if (!uniqueCity.includes(value)) {
      uniqueCity.push(value);}}
  else if (key === "state") {
    if (!uniqueState.includes(value)) {
    uniqueState.push(value);}}
  else if (key === "country") {
    if (!uniqueCountry.includes(value)) {
    uniqueCountry.push(value);}}
  else if (key === "shape") {
    if (!uniqueShape.includes(value)) {
    uniqueShape.push(value);}}
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
//=============COUNTRY=======================
uniqueCountry.sort()
var countryDdl = d3.select("#country-ddl")
uniqueCountry.forEach((country) => {
  country = country.toUpperCase();
  var listitem = countryDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "country")
  .text(country)
  .on("click", filterChange);
});
//=============SHAPE========================
uniqueShape.sort()
var shapeDdl = d3.select("#shape-ddl")
uniqueShape.forEach((shape) => {
  shape = shape.toProperCase();
  var listitem = shapeDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "shape")
  .text(shape)
  .on("click", filterChange);
});
//============CITY=======================
var cityBtn = d3.select("#city-btn")
cityBtn.on("click", filterChange)

//=========================================
// Show all data from bottom link
var moreData = d3.select("#table-end")
moreData.on("click", allData);
//=========================================
//Check for partial text searching
var partialTextBox = false;
var partText = d3.select("#text-check");
partText.on("change", partialText);
//=========================================
function partialText() {
  if (partialTextBox) {
    partialTextBox = false;
  }
  else {
    partialTextBox = true
  }
  console.log("Is checked", partialTextBox)
}
//=======================================
//        FILTER SECTION
//=======================================
function filterChange(event) {
  d3.event.preventDefault();
  // Check the text, value and id of the triggering element
  // Incoming is either from dropdown (select) or open text (two)
  let inputSelect = d3.select(this).property("text");
  let cityText = d3.select("#city-text").property("value");
  let comText = d3.select("#comment-text").property("value");
  let tmsg = d3.select("#result-msg");
  //Did the event come from a dropdown?
  //If so make the variable all lowercase
  if (inputSelect){
    inputSelect = inputSelect.toLowerCase();
  }
  // Get the name of the element that raised the event
  inputOrigin = d3.select(this).attr("value");
  inputId = d3.select(this).attr("id");

  //If it's open text from City also make lowercase
  if (cityText) {
    cityText = cityText.toLowerCase();
    inputOrigin = d3.select(this).attr("id")}

// Filter statements here
  if (inputOrigin === "datetime") {
  var filteredData = data.filter(item => item.datetime === inputSelect);
  }
  //State dropdown filter
  else if (inputOrigin === "state") {
  var filteredData = data.filter(item => item.state === inputSelect);
  }
    //Country dropdown filter
  else if (inputOrigin === "country") {
    var filteredData = data.filter(item => item.country === inputSelect);
  }
    //Shape dropdown filter
  else if (inputOrigin === "shape") {
    var filteredData = data.filter(item => item["shape"] === inputSelect);
  }
  else if (inputId === "city-btn") {
  // City text field
    if (!partialTextBox) {
      var filteredData = data.filter(item => item.city.includes(cityText));
    }
    else {
      var filteredData = data.filter(item => item.city === cityText);
    }
  }
  else if (inputId === "comment-btn") {
  // City text field

    if (!partialTextBox) {
      var filteredData = data.filter(item => item.comment.includes(comText));
    }
    else {
      var filteredData = data.filter(item => item.city === cityText);
    }
  }
  //write partial search here
  if (filteredData.length === 0) {
    console.log("No results")
    clearAll();
  }
  else {
    drawTable(filteredData, inputId);
  }
  //Then go on and insert rows/columns into table using D3
}

/*========
* CLEAR DYNAMIC ELEMENTS
======*/
function clearAll() {
  let tbody = d3.select("tbody");
  let tmsg = d3.select("#result-msg");
  let cityInput = d3.select("#city-text");
  let comInput = d3.select("#comment-text");
  tbody.html("");
  cityInput.reset();
  comInput.reset();
  tmsg.append("p").text("There were no results for that selection.");
  console.log("All clear.")
  }
/*===================
 DRAW TABLE
===================*/
// Get a reference to the table body
function drawTable(filteredData, inputId) {
  var tbody = d3.select("tbody");
  var tmsg = d3.select("#result-msg");
  resultsLen = filteredData.length;
  tbody.html("");
  tmsg.append("p").text(`There were ${resultsLen} records that matched.`);

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
    else if (key === "shape") {
      value = value.toProperCase();}
    var cell = tbody.append("td");
    cell.text(value);
  }); //end of forEach 2
}); //end of forEach 1
d3.select("#city-text").html("");
d3.select("#comment-text").html("");
tmsg.html("");
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
