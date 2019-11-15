let convert = require('../api/jsonparser.js');
let assert = require('assert');
const fetch = require("node-fetch");


describe('searchNull', function(){
  it('should say no items were found', function(){
    assert.equal(searchMaterials(" "), undefined);
  });
});
