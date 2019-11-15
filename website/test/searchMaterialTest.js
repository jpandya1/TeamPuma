const fetch = require('node-fetch');
let convert = require('../api/jsonparser.js')
let assert = require('assert');

describe('searchNull', function(){
  it('should say no items were found', function(){
    assert.equal(searchMaterials(" "), "No items were found for your request.");
  });
});
