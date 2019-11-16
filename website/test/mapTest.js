let convert = require('../mapsApi/mark.js');
let assert = require('assert');

// For maps.html
/*
These tests are not working because
1) requiring isomorphic fetch in js files makes the fetch not work on html
2) Can't call html elements because node.js and html are not compatible
*/

describe('cornerCases', function(){
  it('should return nothing', function(){
    //window.document.getElementById("searchField") = "";
    assert.equal(geocode(), undefined);
    done()
  });
});

describe('test_searchLocation', function(){
  describe('searchStreet', function(){
    it('should allow for street search', function(){
      // set input box to a street address
      // get the list of strings
      // assert that list of strings is not null
    });
  });
  describe('searchZip', function(){
    it('should allow for zip code search', function(){
      // set input box to a zip code
      // get the list of strings
      // assert that list of strings is not null
    });
  });
  describe('searchState', function(){
    it('should allow for state search', function(){
      // set input box to a state
      // get the list of strings
      // assert that list of strings is not null
    });
  });
});

describe('test_streetInput', function(){
  describe('search_lowercaseStreet', function(){
    it('should still search despite lowercase', function(){
      // set input box to an address of lower case letters
      // get the list of strings
      // set input box to address of normal lettering
      // assert that the list of strings are equal
    });
  });
  describe('search_allcapsStreet', function(){
    it('should still search despite all caps', function(){
      // set input box to an address of all caps letters
      // get the list of strings
      // set input box to address of normal lettering
      // assert that the list of strings are equal
    });
  });
});
