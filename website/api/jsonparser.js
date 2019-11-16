let convert = {};
//require('es6-promise').polyfill();
//require('isomorphic-fetch');

/*
* https://talk.observablehq.com/t/httprequest-origin-null/121
* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*
* Apparently there's a problem with the API requests not coming from the Earth911 server.
* This appears to be an issue with using Javascript for HTTP requests
*/

CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';
BASE_URL = 'http://api.earth911.com/';
API_KEY = 'c2ab03acf7e440d8';

/*
* Performs the HTTP Request using the (newer) fetch method
*/

function queryFetch(url) {
//    fetch(CORS_PREFIX+url, {mode: 'cors'}).then( resp => {
    fetch(CORS_PREFIX+url, {mode: 'cors'}).then( function(resp){
        return resp.json();
//    }).then(data => {
    }).then(function(data) {

        var response = data;
        var results = response.result;

        if (document.getElementById('APIResponseList').hasChildNodes()) {
            // clear the list of former search results
            clearSearchList();
        }

        if (!Array.isArray(results) || !results.length) {
            // No results were returned for this request
            document.getElementById("APIResponse").innerHTML = "No items were found for your request.";
        } else {
            // Some number of results were returned
            document.getElementById("APIResponse").innerHTML = " ";

            // fill in the list with search results
            document.getElementById('APIResponseList').appendChild(generateList(results));
            console.log(results);
        }
    });
}

/* --- Earth 911 API Calls --- */
// Returns an array of all materials
function getMaterials() {
    queryFetch(BASE_URL+'earth911.getMaterials?api_key='+API_KEY);
}

// Searches for materials matching keywords
//function searchMaterials(material) {
searchMaterials = function(material){
    queryFetch(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&query='+material);
}

// Returns an array of brief location information given a latitude and longitude
function searchLocations(lat, long, maxDistance) {
    queryLocationFetch(BASE_URL+'earth911.searchLocations?api_key='+API_KEY+'&latitude='+lat+'&longitude='+long+'&maxDistance='+maxDistance);
}

// Finds materials accepted at nearby locations
function searchMaterialsByProximity(lat, long) {
    queryFetch(BASE_URL+'earth911.searchMaterialsByProximity?api_key='+API_KEY+'&latitude='+lat+'&longitude='+long);
}

// Searches for families matching keywords within the query
function searchFamilies(query) {
    queryFetch(BASE_URL+'earth911.searchFamilies?api_key='+API_KEY+'&query='+query);
}

// Returns an array of all families
function getFamilies() {
    queryFetch(BASE_URL+'earth911.getFamilies?api_key='+API_KEY);
}

// Returns an array of all families with specific family_type_id
function getFamiliesOfTypeID(familyID) {
    queryFetch(BASE_URL+'earth911.getFamilies?api_key='+API_KEY+'&family_type_id='+familyID);
}

/* --- Search Page Methods --- */

function generateList(jsonResults) {
    // Create the list element:
    var list = document.createElement('ul');
    for(var i = 0; i < jsonResults.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(jsonResults[i].description));
        item.appendChild(document.createTextNode(jsonResults[i].url));

        // Add it to the list:
        list.appendChild(item);
    }
    return list;
}


function clearSearchList() {
    document.getElementById('APIResponseList').innerHTML = "";
}

module.exports = convert;
