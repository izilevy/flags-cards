// Base variables
var strCntry = "";
var ajaxData;
var BaseUrl =
  "https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;borders;flag";
var SearchUrl = "https://restcountries.eu/rest/v2/name/";

// Enter keypad search
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    searchCntry();
  }
});

// Get the API AJAX data function
let getAllData = (url) => {
  $.ajax({
    type: "GET",
    datatype: "json",
    url: url,
    success: function (data) {
      ajaxData = data;
      console.log(ajaxData);
      showData(ajaxData);
    },
    error: function (error) {
      console.log("error : ", error);
    },
  });
};

// Search for a country function which gets the value from the html search input field
let searchCntry = () => {
  var cntry = countrySearch.value;
  countrySearch.value = "";
  if (cntry != "") {
    console.log(
      SearchUrl +
        cntry +
        "?fields=name;topLevelDomain;capital;currencies;borders;flag"
    );
    getAllData(
      SearchUrl +
        cntry +
        "?fields=name;topLevelDomain;capital;currencies;borders;flag"
    );
  } else {
    console.log(BaseUrl);
    getAllData(BaseUrl);
  }
};

// Show the data from the API to the HTML page
let showData = (countries) => {
  strCntry = "";
  strCntry += '<div class="card-columns">';
  countries.map((country) => {
    buildSingle(country, countries.indexOf(country));
  });
  strCntry += "</div>";
  htmlData.innerHTML = strCntry;
};

// Build the HTML string for the innerHTML div for a single country
let buildSingle = (country) => {
  strCntry += '<div class="card row">';
  strCntry += '<div class="img float-left col-6">';
  if (country.flag != null) {
    strCntry += `<img class="img-fluid my-3 flag" src="${country.flag}" alt="Card image cap">`;
  }
  strCntry += "</div>";
  strCntry += '<div class="card-body float-right col-6">';
  strCntry += `<h5 class="card-title">${country.name}</h5>`;
  strCntry += `<span class="card-text"><strong>Top Level Domain: </strong>${country.topLevelDomain}</span><br>`;
  strCntry += `<span class="card-text"><strong>Capital: </strong>${country.capital}</span><br>`;
  strCntry += '<span class="card-text"><strong>Currencies:</strong></span><br>';
  for (let curr of country.currencies) {
    strCntry += `${country.currencies.indexOf(curr) + 1}. ${curr.code}<br>`;
  }
  strCntry += '<span class="card-text"><strong>Borders: </strong></span><br>';
  for (let border of country.borders) {
    strCntry += `"${border}"`;
    if (country.borders.indexOf(border) != country.borders.length - 1) {
      strCntry += ", ";
    } else {
      strCntry += ".";
    }
  }
  strCntry += "</div>";
  strCntry += "</div>";
};

// Show the initial all of the countries data to the page on first load
getAllData(BaseUrl);
