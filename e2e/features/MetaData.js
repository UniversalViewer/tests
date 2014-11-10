
var Metadata = function() {

	var ptor;

	this.Before(function (callback) {
		browser.ignoreSynchronization = true;

		callback();
	});

	this.Given(/^The user is viewing the Viewer$/, function (callback) {

		// http://assertselenium.com/2013/02/22/handling-iframes-using-webdriver/
		ptor = protractor.getInstance();

		//ptor.get('/examples/monograph.html');

		//browser.driver.get('/examples/monograph.html');
		////browser.driver.sleep(4000);
		//var app = browser.findElement(protractor.By.id('app'));
        //
		//var firstItem = app.get(1)
        //
		//console.log(app);

		ptor.get('/examples/monograph.html').then(function(){

			//ptor.getTitle().then(function(val){
			//	console.log(val);
			//});

			ptor.sleep(3000).then(function(){
				ptor.findElement(protractor.By.tagName('iframe')).then(function(iframe) {
					console.log('the iframe: ' + iframe);
					callback();
				}, function(){
					callback.fail("iframe not found");
				});
			});

			//ptor.findElement(protractor.By.css('.wellcomePlayer')).then(function(el) {
			//	callback();
			//}, function(){
			//	callback.fail("wellcomePlayer div not found");
			//});

		});
	});

	this.When(/^they click "([^"]*)"$/, function (arg1, callback) {

		callback();

		//ptor.findElementInFrame(ptor,protractor.By.buttonText(arg1)).then(function(el){
		//		el.click().then(function() {
		//			callback();
		//});
		//});
	});

	this.Then(/^metadata key\/value pairs are displayed to the user$/, function (callback) {

		ptor.switchTo().frame(0);

		ptor.findElement(protractor.By.id('app')).then(function(app) {
			console.log('the app: ' + app);

			app.getAttribute("class").then(function(c) {
				console.log("the class: " + c);
				callback();
			});

		}, function(){
			callback.fail("app not found");
		});

	});

	this.Then(/^the metadata side panel is visible to the user$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

};

module.exports = Metadata;