/**
@TODO Try to fix the stripe and hover on the bootstrap table element
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
/*=========================================
Populate the arrays for ddls*/
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
// Populate the dropdown lists
//=============DATE======================
var dateDdl = d3.select("#date-ddl")
uniqueDate.forEach((date) => {
  var listitem = dateDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "datetime")
  .text(date)
  .on("click", selectFilterChange);
});
//=============STATE======================
uniqueState.sort()
var stateDdl = d3.select("#state-ddl")
uniqueState.forEach((state) => {
  state = state.toUpperCase();
  var listitem = stateDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "state")
  .text(state)
  .on("click", selectFilterChange);
});
//=============COUNTRY=====================
uniqueCountry.sort()
var countryDdl = d3.select("#country-ddl")
uniqueCountry.forEach((country) => {
  country = country.toUpperCase();
  var listitem = countryDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "country")
  .text(country)
  .on("click", selectFilterChange);
});
//=============SHAPE======================
uniqueShape.sort()
var shapeDdl = d3.select("#shape-ddl")
uniqueShape.forEach((shape) => {
  shape = shape.toProperCase();
  var listitem = shapeDdl.append("a")
  .attr("class","dropdown-item")
  .attr("value", "shape")
  .text(shape)
  .on("click", selectFilterChange);
});
//============TEXT BOX EVENTS==========
var cityBtn = d3.select("#city-btn")
cityBtn.on("click", textFilterChange)
var comBtn = d3.select("#comment-btn")
comBtn.on("click", textFilterChange)
//=============SEE ALL DATA ==========
// Show all data from bottom link
var moreData = d3.select("#table-end")
moreData.on("click", allData);
//============TIGHT TEXT SEARCH=============
//Check for partial text searching
var partialTextBox = false;
var partText = d3.select("#text-check");
partText.on("change", partialText);
/*=========================================
THIS HANDLES THE CHECKBOX FOR TIGHT TEXT SEARCHING
===========================================*/
function partialText() {
  if (partialTextBox) {
    partialTextBox = false;
  }
  else {
    partialTextBox = true
  }
  // console.log("Is checked", partialTextBox)
}
/*=========================================
       FILTER SECTION
==========================================*/

function textFilterChange(event) {
  d3.event.preventDefault();
  var tbody = d3.select("tbody");
  tbody.html("");
  var cityText = d3.select("#city-text").property("value").toLowerCase();
  var comText = d3.select("#comment-text").property("value").toLowerCase();
  var inputId = d3.select(this).attr("id");
  // console.log(cityText, comText, inputId)

    if (inputId === "city-btn") {
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
        var filteredData = data.filter(item => item.comments.toLowerCase().includes(comText));
      }
      else {
        var filteredData = data.filter(item => item.comments === comText);
      }
    }
      if (filteredData.length === 0) {
        console.log("No results")
          /*======== IF EMPTY CLEAR DYNAMIC ELEMENTS ======*/
          var tbody = d3.select("tbody");
          var tmsg = d3.select("#result-msg");
          var cityInput = d3.select("#city-text");
          var comInput = d3.select("#comment-text");
          tbody.html("");
          cityText = "";
          comText = "";
          tmsg.text("There were no results for that selection. Try unchecking exact text search box.");
          console.log("All text clear.");
          }
      else {
        console.log("Results", filteredData.length, filteredData)
        drawTable(filteredData);
      }
  } //END of textFilterChange
/*======== END OF TEXT BOX FILTER FUNCTION ======*/

/*======== START DROPDOWN LIST FILTER FUNCTIONS ======*/
function selectFilterChange(event) {
  d3.event.preventDefault();
  var tbody = d3.select("tbody");
  tbody.html("");
  // Check the text, value and id of the triggering element
  // Incoming is either from dropdown (select) or open text (two)
  var inputSelect = d3.select(this).property("text").toLowerCase();
  var tmsg = d3.select("#result-msg");
  console.log(inputSelect, tmsg)
  inputOrigin = d3.select(this).attr("value");

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

  if (filteredData.length === 0) {
    console.log("No results")
  /*======== CLEAR DYNAMIC ELEMENTS IF NO RESULTS ======*/
      var tbody = d3.select("tbody");
      var tmsg = d3.select("#result-msg");
      tbody.html("");
      tmsg.text("There were no results for that selection.");
      // console.log("All clear.");
      }
  else {
    drawTable(filteredData);
  }
  //Draw dynamic table with drawTable function
} //END selectFilterChange function
/*====================================
 DRAW TABLE
======================================*/
// Get a reference to the table body
function drawTable(filteredData) {
  var tbody = d3.select("tbody");
  // console.log("Drawing table")
  resultsLen = filteredData.length;
  var tmsg = d3.select("#result-msg");
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
      // Now add the TD element for each value
    cell = row.append("td");
    cell.text(value)
  }); //end of forEach 2
}); //end of forEach 1

tmsg.html("");
} //end of drawtable function
//====================

/*===========================
// On page load, show a slice of the data
=============================*/
function defaultTable(event) {

  drawTable(data.slice(0,10));
}

window.onload = function () {
  defaultTable();
};
/*====================
 Load all of the data if the user clicks the link at the bottom
======================*/
function allData(event) {
  // d3.event.preventDefault();
  drawTable(data);
}
/*====================
Convert the html encodings to characters
=====================*/
function stripHtml(html){
    // Create a temporary div element
    var tempDiv = document.createElement("div");
    // Set the HTML content with the provided
    tempDiv.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return tempDiv.textContent || tempDiv.innerText || "";
}
//====================
