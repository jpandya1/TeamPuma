/*
* https://talk.observablehq.com/t/httprequest-origin-null/121
* https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*
* Apparently there's a problem with the API requests not coming from the Earth911 server.
* This appears to be an issue with using Javascript for HTTP requests

THIS COPY IS ATTEMPTING TO CHANGE THE JSON QUERY TO FIT THE NEEDS OF THE DATABASE
*/

CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';
BASE_URL = 'http://api.earth911.com/';
API_KEY = 'c2ab03acf7e440d8';

/*
* Performs the HTTP Request using the (newer) fetch method
*/
function queryFetch(url) {
    fetch(CORS_PREFIX+url, {mode: 'cors'}).then( resp => {
        return resp.json();
    }).then(data => {

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
function getMaterials() {
    queryFetch(BASE_URL+'earth911.getMaterials?api_key='+API_KEY);
}

function searchMaterials(material) {
    queryFetch(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&query='+material);

    document.getElementById('TEST').innerHTML = "Now filter the results";
}

function filter(keyword){
  if (document.getElementById('APIFilteredList').hasChildNodes()) {
      // clear the list of former search results
      clearSearchList();
  }

  var db_len = document.getElementById('APIResponseList').getElementsByTagName('li').length;

  var list = document.createElement('ul');
  var i = 0;
  var j = 0;
  for(i = 0; i < db_len; i++){
    var str = document.getElementById('APIResponseList').getElementsByTagName('li')[i].innerHTML;
    if(str.includes(keyword)){
      j++;
      var item = document.createElement('li');
      item.appendChild(document.createTextNode(str));
      list.appendChild(item);
    }
  }
  document.getElementById("APIFilteredList").appendChild(list);
  document.getElementById("TEST").innerHTML = "";
  console.log(results);
}

function searchLocations(lat, long, materialID, maxDistance) {
    queryFetch(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&latitude='+lat+'&longitude='+long+'&materialID='+materialID+'&maxDistance='+maxDistance);
}

function searchMaterialsByProximity(lat, long) {
    queryFetch(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&latitude='+lat+'&longitude='+long);
}

/* --- Search Page Methods --- */
function reset() {
    document.getElementById("APIResponse").innerHTML = "The API's response goes here."
}

function generateList(jsonResults) {
    // Create the list element:
    var list = document.createElement('ul');
    for(var i = 0; i < jsonResults.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(jsonResults[i].description));

        // Add it to the list:
        list.appendChild(item);
    }
    return list;
}

function clearSearchList() {
    document.getElementById('APIResponseList').innerHTML = "";
}
