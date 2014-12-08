/**
 * Created by jenniferstrejevitch on 03/12/2014.
 */

var hooks = function () {
    var ptor;

    this.registerHandler('BeforeFeature', function (event,callback) {

        //TODO: Get iFrames and choose the one with correct element inside it
        var switchToViewerFrame = function() {
            ptor.switchTo().defaultContent().then(function () {
                ptor.sleep(3000).then(function() {
                    ptor.switchTo().frame(0).then(function() {
                        ptor.sleep(3000).then(function() {
                        });
                    });

                });
            });
        };

        console.log('before! ',event.getPayloadItem('feature').getName());
        var feature = event.getPayloadItem('feature').getName();
        console.log('Feature:' + feature);
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();

        switch(feature) {
            case 'DisplayTwoUpMissingImages':
                ptor.get('/examples/?manifest=/examples/iiif-missingimages.js#?si=0&ci=0&z=-0.2908%2C0%2C1.5816%2C1.7178')
                    .then(function() {
                        ptor.sleep(5000).then(function () {
                            console.log('Get page ' + feature);
                            switchToViewerFrame();
                            callback();
                        });
                    });
                break;
            case 'DisplayTwoUpBadFirstPageOnLeft':
                ptor.get('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000060MissingCanvas/manifest.json')
                    .then(function() {
                        ptor.sleep(5000).then(function () {
                            console.log('Get page ' + feature);
                            switchToViewerFrame();
                            callback();
                        });
                    });
                break;
            case 'DisplayTwoUpBadPagesIncorrectlyLabelled':
                ptor.get('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405_leftleft/manifest.json')
                    .then(function() {
                        ptor.sleep(5000).then(function () {
                            console.log('Get page ' + feature);
                            switchToViewerFrame();
                            callback();
                        });
                    });
                break;
            case 'DisplayTwoUpIncorrectlyCurated':
                ptor.get('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404multiple/manifest.json')
                    .then(function() {
                        ptor.sleep(5000).then(function () {
                            console.log('Get page ' + feature);
                            switchToViewerFrame();
                            callback();
                        });
                    });
                break;
            default:
                ptor.get('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json#?si=0&ci=0&z=-0.2908%2C0%2C1.5816%2C1.7178')
                    .then(function () {
                        ptor.sleep(5000).then(function () {
                            console.log('Get page ' + feature);
                            switchToViewerFrame();
                            callback();
                        });
                    });
        }
    });
};

module.exports = hooks;


/*
*
*   Missing images - http://bltesters.azurewebsites.net/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404Missing/manifest.json
 ·  Bad perfect (ie. first page on left) - first page will be on left - will work but look awkward - http://bltesters.azurewebsites.net/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000060MissingCanvas/manifest.json
 ·  Bad perfect (ie. pages incorrectly labelled or missing canvas) - left-left page display OR right-right page display - http://bltesters.azurewebsites.net/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405_leftleft/manifest.json
 ·  Incorrectly curated images as canvases (ie. multiple views of same page on different canvases) - should display as sequential pages - http://bltesters.azurewebsites.net/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404multiple/manifest.json
* */