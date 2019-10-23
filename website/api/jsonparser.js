BASE_URL = 'http://api.earth911.com/';
API_KEY = 'c2ab03acf7e440d8';

function query(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        document.getElementById("APIResponse").innerHTML = myArr[0];
      }
    };

    req.send();
}

function getMaterials() {
    query(BASE_URL+'earth911.getMaterials?api_key='+API_KEY);
}

function searchMaterials(material) {
    query(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&query='+material);
}

function searchLocations(lat, long, materialID, maxDistance) {
    query(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&latitude='+lat+'&longitude='+long+'&materialID='+materialID+'&maxDistance='+maxDistance);
}

function searchMaterialsByProximity(lat, long) {
    query(BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&latitude='+lat+'&longitude='+long);
}

function testRequest() {
    var req = new XMLHttpRequest();
    req.open('GET', BASE_URL+'earth911.getMaterials?api_key='+API_KEY, true);
    // req.open('GET', BASE_URL+'earth911.searchMaterials?api_key='+API_KEY+'&query=bottle', true);

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            document.getElementById("APIResponse").innerHTML = myArr[0];
        } else {
            document.getElementById("APIResponse").innerHTML = 'State: '+req.readyState+', Status: '+req.status;
        }
    };

    req.send();
}

function reset() {
    document.getElementById("APIResponse").innerHTML = "The API's response goes here."
}
