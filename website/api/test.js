const operations = require('./operations.js') 
const assert = require('assert')
const searchpage = require('./searchpage.html')

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

it('Multiple resets with text inbetween is still empty', () => {
	searchpage.Reset();
	var myTextBox = searchpage.findElement(webdriver.By.id('searchField'));
    myTextBox.sendKeys('aluminum');
    searchpage.Reset();
    var elementContent = myTextBox.getText();
  	assertTrue(elementContent.size() === 0);

	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

it('Correctly accepts keys', () => {


	})

