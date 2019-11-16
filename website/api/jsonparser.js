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

function RDQueryFetch(url) {
    fetch(CORS_PREFIX+url, {mode: 'cors'}).then( resp => {
        return resp.json();
    }).then(data => {

        var response = data;
        var results = response.result;

        // fill in the list with search results
        generateGalleryOfLinKBoxes(results);

        // console.log(results);
    });
}

/* --- Earth 911 API Calls --- */
// Returns an array of all materials
function getMaterials() {
    queryFetch(BASE_URL+'earth911.getMaterials?api_key='+API_KEY);
}

// Searches for materials matching keywords
function searchMaterials(material) {
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
    RDQueryFetch(BASE_URL+'earth911.searchFamilies?api_key='+API_KEY+'&query='+query);
}

// Returns an array of all families
function getFamilies() {
    RDQueryFetch(BASE_URL+'earth911.getFamilies?api_key='+API_KEY);
}

// Returns an array of all families with specific family_type_id
function getFamiliesOfTypeID(familyID) {
    RDQueryFetch(BASE_URL+'earth911.getFamilies?api_key='+API_KEY+'&family_type_id='+familyID);
}

function sortNumber(a, b) {
  return a - b;
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

        // Add it to the list:
        list.appendChild(item);
    }
    return list;
}


function clearSearchList() {
    document.getElementById('APIResponseList').innerHTML = "";
}

/* --- Recycle Database Methods --- */
function generateGalleryOfLinKBoxes(jsonResults) {

    var gallery = document.getElementById("LinkBoxGallery");

    for (var i = 0; i < jsonResults.length; i++) {

        // create a gallery element for the galleryOfLinkBoxes class
        var galleryWrapper = document.createElement('div');
        galleryWrapper.setAttribute("class", "galleryOfLinkBoxes");

        var detailWrapper = document.createElement('a');
        detailWrapper.setAttribute("href", "#");

        if (jsonResults[i].material_ids != undefined) {

            var matElt = document.createElement('p');
            var matchingMaterials = jsonResults[i].material_ids;
            detailWrapper.title = matchingMaterials;
            detailWrapper.appendChild(matElt);
            detailWrapper.onclick = function() {
                // console.log(this.title);
                generateGalleryOfMatchingMaterials(this.title);
            }
        }

        // Create a link box
        var itemBox = document.createElement('div');
        itemBox.setAttribute("class", "linkBoxes");

        var title = document.createElement("h3");
        title.innerHTML = jsonResults[i].description;
        itemBox.appendChild(title);

        var img = document.createElement("img");
        img.setAttribute("class", "databaseGalleryImages");
        img.setAttribute("width", "600");
        img.setAttribute("height", "400");
        img.setAttribute("src", "http://greenroutine.appspot.com/images/glass_logo.png");
        itemBox.appendChild(img);

        var brk = document.createElement("br"); // for spacing
        itemBox.append(brk);

        galleryWrapper.appendChild(itemBox);
        detailWrapper.appendChild(galleryWrapper);
        gallery.appendChild(detailWrapper);
    }
}

function getMaterialById(material_id) {
    fetch(CORS_PREFIX+BASE_URL+'earth911.getMaterials?api_key='+API_KEY, {mode: 'cors'}).then( resp => {
        return resp.json();
    }).then(data => {

        var response = data;
        var results = response.result;

        for (var i = 0; i < results.length; i++) {
            if (results[i].material_id == material_id) {
                // console.log(results[i]);
                return results[i];
            }
        }
    });
}

function getMaterialsByID(material_id) {

    fetch(CORS_PREFIX+BASE_URL+'earth911.getMaterials?api_key='+API_KEY, {mode: 'cors'}).then( resp => {
        return resp.json();
    }).then(data => {

        var response = data;
        var results = response.result;

        // console.log("Material id = " + material_id);

        var matchingMaterials = [];
        for (var i = 0; i < results.length; i++) {
            if (results[i].family_ids != undefined) {
                for (var j = 0; j < results[i].family_ids.length; j++) {
                    if (results[i].family_ids[j] == material_id) {
                        console.log("found a match");
                        matchingMaterials.push(results[i]);
                        break;
                    }
                }
            }
        }
        console.log(matchingMaterials);
        return matchingMaterials;
    });
}

function generateGalleryOfMatchingMaterials(jsonResults) {

    fetch(CORS_PREFIX+BASE_URL+'earth911.getMaterials?api_key='+API_KEY, {mode: 'cors'}).then( resp => {
        return resp.json();
    }).then(data => {

        var response = data;
        var results = response.result;

        // console.log(jsonResults);

        var gallery = document.getElementById("LinkBoxGallery");
        gallery.innerHTML = "";

        // console.log(jsonResults);

        // for each of the matching items
        var items = jsonResults.split(',');
        items.sort(sortNumber);
        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < results.length; j++) {
                if (results[j].material_id == items[i]) {
                    console.log(items);
                    console.log("Name: " + results[j].description + ", id: " + results[j].material_id);
                    // create a gallery element for the galleryOfLinkBoxes class
                    var galleryWrapper = document.createElement('div');
                    galleryWrapper.setAttribute("class", "galleryOfLinkBoxes");

                    // Create a link box
                    var itemBox = document.createElement('div');
                    itemBox.setAttribute("class", "linkBoxes");

                    var title = document.createElement("h3");

                    var brk = document.createElement("br"); // for spacing
                    var descr = document.createElement("p");

                    title.innerHTML = results[j].description;
                    descr.innerHTML = results[j].long_description;

                    // var img = document.createElement("img");
                    // img.setAttribute("class", "databaseGalleryImages");
                    // img.setAttribute("width", "600");
                    // img.setAttribute("height", "400");
                    // img.setAttribute("src", "http://greenroutine.appspot.com/images/paint.jpg");

                    itemBox.appendChild(title);
                    // itemBox.appendChild(img);
                    itemBox.append(brk);
                    itemBox.append(descr);

                    galleryWrapper.appendChild(itemBox);
                    gallery.appendChild(galleryWrapper);
                }
            }
        }
    });
}

module.exports = convert;
