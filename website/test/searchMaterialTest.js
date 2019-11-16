let convert = require('../api/jsonparser.js');
let assert = require('assert');

/*
These tests are not working because
1) requiring isomorphic fetch in js files makes the fetch not work on html
2) Can't call html elements because node.js and html are not compatible
*/

describe('searchNull', function(){
  it('should say no items were found', function(){
    assert.equal(searchMaterials(" "), undefined);
  });
});

describe('searchLocations', function(){
  describe('searchLargeRange', function(){
    it('should return a list of strings > 10', function(){
      // cal/ searchLocations with certain lat and long, and large maxDistance
      // assert that the length of list is > 10
    })
  });
  describe('searchShortRange', function(){
    it('should return a list of strings < 10', function(){
      // call searchLocations with same long and lat as above, but with smaller
      //  distance
      // assert that the length of list is < 10
    });
  });
});

describe('clearList', function(){
  it('should show that the list is cleared', function(){
    // set list to some value
    // call clearSearchList()
    // assert that the list is not empty
  });
});
