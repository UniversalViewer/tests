
var Metadata = function() {

	var ptor;

	this.Before(function (callback) {
		browser.ignoreSynchronization = true;
		ptor = protractor.getInstance();

		callback();
	});

	this.Given(/^The user is viewing the Viewer$/, function (callback) {

		// http://assertselenium.com/2013/02/22/handling-iframes-using-webdriver/

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
		this.findElementInFrame(ptor,protractor.By.linkText(arg1)).then(function(el){
				el.click().then(function() {
					callback();
		});
		});
	});

	this.Then(/^metadata key\/value pairs are displayed to the user$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Then(/^the metadata side panel is visible to the user$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

};

module.exports = Metadata;