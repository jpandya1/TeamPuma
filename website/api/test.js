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
it('No return for random string', () => {
//call getmaterials for some random, make sure empty
	parser.searchMaterials("randomstring");
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);
	})
//7
it('Correctly searches for aluminum', () => {
//getmaterials for aluminum
	parser.searchMaterials("Aluminum");
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//8
it('Correctly searches for paper', () => {
//get materials for paper
	parser.searchMaterials("Paper");
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//9
it('Correctly returns empty list when searching numbers', () => {
// get materials for numbers
	parser.searchMaterials('123');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);
	})
//10
it('Handles empty string search', () => {
//getmaterials with empty string
	parser.searchMaterials('');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);

	})
//11
it('returns results for all lowercase', () => {
	parser.searchMaterials('aluminum');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//12
it('returns results for all uppercase', () => {
	parser.searchMaterials('ALUMINUM');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//13
it('returns results for alternating case', () => {
	parser.searchMaterials('AlUmInUm');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//14
it('Correctly accepts latitude and longitude search', () => {
	parser.searchMaterialsByProximity('30.2672, 97.7431');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//15
it('Correctly returns no materials for invalid lat long', () => {
	parser.searchMaterialsByProximity('cat, dog');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//16
it('Correctly returns empty list for empty lat long', () => {
	parser.searchMaterialsByProximity('');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);

	})
//17
it('Correctly fails api call with extra params', () => {
	parser.searchMaterialsByProximity('cat, dog, dog');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//18
it('Correctly fails lat long with only lay', () => {
	parser.searchMaterialsByProximity('30.2672');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//19
it('Correctly clears search list', () => {
	parser.searchMaterialsByProximity('30.2672');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);
	parser.clearSearchList();
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);
	})
//20
it('Correctly filters', () => {
	parser.searchMaterials('aluminum');
	parser.filter('aluminum');
	var myList = searchpage.findElement(webdriver.By.id('APIFilteredList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);


	})
//21
it('Correctly does not filter invalid input', () => {
	parser.searchMaterials('dogcat');
	parser.filter('aluminum');
	var myList = searchpage.findElement(webdriver.By.id('APIFilteredList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);

	})
//22
it('Correctly blanks test element', () => {
	parser.searchMaterials('paper');
	parser.filter('paper');
	var myList = searchpage.findElement(webdriver.By.id('TEST'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);

	})
//23
it('Correctly does not blank test when invalid input', () => {
	parser.searchMaterials('paper');
	parser.filter('12742061');
	var myList = searchpage.findElement(webdriver.By.id('TEST'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//24
it('Correctly searches locations', () => {
	parser.searchLocations('30.2672, 97.7431, paper, 50');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() > 0);

	})
//25
it('Correctly fails searchLocations api call with invalid inputs', () => {
	parser.searchLocations('a, b, c, d');
	var myList = searchpage.findElement(webdriver.By.id('APIResponseList'));
	var elementContent = myList.getText();
	assertTrue(elementContent.size() === 0);

	})
\\
