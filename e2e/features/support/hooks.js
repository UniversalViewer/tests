/**
 * Created by jenniferstrejevitch on 03/12/2014.
 */
var hooks = function () {

    var ptor;

    this.registerHandler('BeforeFeature', function (event,callback) {

        console.log('before! ',event.getPayloadItem('feature').getName());
        var feature = event.getPayloadItem('feature').getName();

        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();

        if(feature == 'DisplayTwoUpMissingImages') {
            ptor.get('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json')
                .then(function() {
                    ptor.sleep(5000).then(function () {
                        console.log('Get page');
                        callback(); // tell Cucumber we're finished and to use 'this' as the world instance
                    });
                });
        }
        else {
            ptor.get('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json')
                .then(function () {
                    ptor.sleep(5000).then(function () {
                        console.log('Get page');
                        callback(); // tell Cucumber we're finished and to use 'this' as the world instance
                    });
                });
        }
        //callback();
    });
};

module.exports = hooks;