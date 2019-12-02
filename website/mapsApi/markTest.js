
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



function queryLocationFetch(url) {
    fetch(CORS_PREFIX + url, {
        mode: 'cors'
    }).then(resp => {
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
            document.getElementById('APIResponseList').appendChild(generateLocationList(results));
            console.log(results);
        }

    });
}





function queryMapFetch(url) {
    fetch(CORS_PREFIX + url, {
        mode: 'cors'
    }).then(resp => {
        return resp.json();
    }).then(data => {

        var response = data;
        var results = response.result;

        if (!Array.isArray(results) || !results.length) {

        } else {
            var count;
            if (results.length < 30) {
                count = results.length;
            } else {
                count = 30;
            }

            var markers = [];


            for (var i = 0; i < count; i++) {
                markers.push({
                    coords: {
                        lat: results[i].latitude,
                        lng: results[i].longitude
                    },
                    content: results[i].description

                });
            }


            for (var i = 0; i < count; i++) {
                addMarker(markers[i]);
            }


        }

    });
}

function addMarker(prop) {
    var marker = new google.maps.Marker({
        position: prop.coords,
        map: map,
    });
    if(prop.content){
        var infowindow = new google.maps.InfoWindow({
            content: prop.content
        });

        marker.addListener('click', function(){
            infowindow.open(marker.get('map'), marker);
        });
    }
        
    
}

/* --- Earth 911 API Calls --- */

function searchKanLocations(lat, long, material_ids) {
    queryLocationFetch(BASE_URL + 'earth911.searchLocations?api_key=' + API_KEY + '&latitude=' + lat + '&longitude=' + long + material_ids);
    queryMapFetch(BASE_URL + 'earth911.searchLocations?api_key=' + API_KEY + '&latitude=' + lat + '&longitude=' + long + material_ids);
}

/* --- Search Page Methods --- */


function generateLocationList(jsonResults) {
    // Create the list element:
    var list = document.createElement('ul');
    for (var i = 0; i < jsonResults.length / 2; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(jsonResults[i].description + " --- " + jsonResults[i].distance + " miles from your location"));

        // Add it to the list:
        list.appendChild(item);
    }
    return list;
}

function clearSearchList() {
    document.getElementById('APIResponseList').innerHTML = "";
}


function geocode() {
    var location = document.getElementById('searchFieldLocation').value;
    var material = document.getElementById('searchMaterialBox').value;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyC1tYYqGdNtn_Re-u4X4ldatpcQ6sKoFsQ'
            }
        })
        .then(function(response) {
            //log full response
            console.log(response);

            //formatted address
            var formattedAddress = response.data.results[0].formatted_address;
            var lati = response.data.results[0].geometry.location.lat;
            var lngi = response.data.results[0].geometry.location.lng;

            var formattedAddressOutput = `
                  <ul class="list-group">
                    <li class="list-group-item">${formattedAddress}</li>
                  </ul>
                `;
            //output to app
            document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
            map.setZoom(13);
            map.setCenter({
                lat: lati,
                lng: lngi
            })



            MapFetch(material, lati, lngi);

            //'&material_id[]=60&material[]= 445'

        })
        .catch(function(error) {
            console.log(error);
        });

}

function MapFetch(material, latitude, longitude) {
    fetch(CORS_PREFIX+BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&query='+material, {mode: 'cors'}).then( resp => {
        return resp.json();
    }).then(data => {

        var response = data;
        var results = response.result;

        var material_ids = []
        for (var i = 0; i < results.length; i++) {
            material_ids.push(results[i].material_id);
        }

        let url = '';
        var prefix = "&material_id[]=";

        for (var j = 0; j < material_ids.length; j++) {
            url = url + prefix + material_ids[j];
        }

        searchKanLocations(latitude, longitude, url);

    });
}

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(30.2672, -97.7431),
        mapTypeId: 'terrain'
    });
}




