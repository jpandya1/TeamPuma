const operations = require('./operations.js') 
const assert = require('assert')
const searchpage = require('./searchpage.html')
const parser = require('./jsonparser_database.js')

//test 1
it('Correctly accepts keys', () => {
  var myTextBox = searchpage.findElement(webdriver.By.id('searchField'));
  myTextBox.sendKeys('aluminum');
  var elementContent = myTextBox.getText();
  assert.equal(elementContent, 'aluminum');
})
//test 2
it('Correctly doesnt show anything for empty', () => {
	var myTextBox = searchpage.findElement(webdriver.By.id('searchField'));
  	var elementContent = myTextBox.getText();
  	assertTrue(elementContent.size() === 0);
	})
//test 3
it('Reset button clears entry', () => {
	searchpage.Reset();
	var myTextBox = searchpage.findElement(webdriver.By.id('searchField'));
	var elementContent = myTextBox.getText();
  	assertTrue(elementContent.size() === 0);
	})
//test 4
it('Multiple resets with text inbetween is still empty', () => {
	searchpage.Reset();
	var myTextBox = searchpage.findElement(webdriver.By.id('searchField'));
    myTextBox.sendKeys('aluminum');
    searchpage.Reset();
    var elementContent = myTextBox.getText();
  	assertTrue(elementContent.size() === 0);
	})
//test 5
it('Parser reset works as expected', () => {
    document.getElementById("APIResponse").innerHTML = "The API's response goes here."
    var myTextBox = searchpage.findElement(webdriver.By.id('APIResponse'));
    parser.reset();
    var elementContent = myTextBox.getText();
    assert.equal(elementContent, "The API's response goes here.");
	})
//6
it('Correctly accepts keys', () => {
//call getmaterials for some random, make sure empty
	parser.searchMaterials("randomstring");
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);
	})
//7
it('Correctly accepts keys', () => {
//getmaterials for aluminum

	})
//8
it('Correctly accepts keys', () => {
//get materials for paper

	})
//9
it('Correctly accepts keys', () => {
// get materials for numbers

	})
//10
it('Correctly accepts keys', () => {
//getmaterials with empty string

	})
//11
it('Correctly accepts keys', () => {


	})
//12
it('Correctly accepts keys', () => {


	})
//13
it('Correctly accepts keys', () => {


	})
//14
it('Correctly accepts keys', () => {


	})
//15
it('Correctly accepts keys', () => {


	})
//16
it('Correctly accepts keys', () => {


	})
//17
it('Correctly accepts keys', () => {


	})
//18
it('Correctly accepts keys', () => {


	})
//19
it('Correctly accepts keys', () => {


	})
//20
it('Correctly accepts keys', () => {


	})
//21
it('Correctly accepts keys', () => {


	})
//22
it('Correctly accepts keys', () => {


	})
//23
it('Correctly accepts keys', () => {


	})
//24
it('Correctly accepts keys', () => {


	})
//25
it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

