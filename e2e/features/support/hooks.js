/**
 * Created by jenniferstrejevitch on 03/12/2014.
 */
var ViewerPage = require("../PageObjects/ViewerPage.js");

var hooks = function () {
    var ptor = browser;
    var showdebug = new ViewerPage().showdebug;
    ptor.ignoreSynchronization = true;

    this.Before(function(callback) {
        if(showdebug) { console.log('Before - Hooks'); }
        if(showdebug) { console.log('switching to defaultContent'); }
        ptor.switchTo().defaultContent().then(
            function () {
                if(showdebug) { console.log('switching to frame[0]'); }
                ptor.switchTo().frame(0).then(
                    function() {
                        if(showdebug) { console.log('switched, calling back'); }
                        callback();
                    });
            });
    });

    this.registerHandler('BeforeFeature', function (event, callback) {

        //Hooks does not have access to World. Check first comment on question
        // http://stackoverflow.com/questions/25984786/cant-access-world-methods-in-afterfeatures-hook
        this.GetPage = function(page, callback){
            if(showdebug) { console.log('getting page ' + page); }
            ptor.get(page).then(
                function() {
                    var vp = new ViewerPage();
                    vp.sleep(vp.pageLoadDelay).then(
                        function () {
                            if(showdebug) { console.log('Get page ' + feature); }
                            new ViewerPage().resetFrame(callback);
                        });
                });
        };

        if(showdebug) { console.log('before! ',event.getPayloadItem('feature').getName()); }
        var feature = event.getPayloadItem('feature').getName();
        if(showdebug) { console.log('Feature:' + feature); }

        switch(feature) {
            case 'Hierarchical Index':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404deephierarchy/manifest.json&si=0&ci=0&z=-0.0693%2C0%2C1.1385%2C1.2366',callback);
                break;
            case 'Display Two Up Missing Images':
                this.GetPage('/examples/bl.html?manifest=/examples/iiif-missingimages.js',callback);
                break;
            case 'Display Two Up Bad First Page On Left':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000060MissingCanvas/manifest.json',callback);
                break;
            case 'Display Two Up Bad Pages Incorrectly Labelled':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405_leftleft/manifest.json',callback);
                break;
            case 'Display Two Up Incorrectly Curated':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404multiple/manifest.json',callback);
                break;
            //case 'Thumbnails':
            //    this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_100022570722.0x000001/manifest.json#?si=0&ci=0&z=-0.2327%2C0%2C1.4653%2C1.5916',callback);
            //    break;
            case 'Eliding':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404longtitle/manifest.json&config=%2Fdefault-config.js#?si=0&ci=0',callback);
                break;
            case 'Left To Right Manifests':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json', callback);
                break;
            case 'Right To Left Manifests':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405/manifest.json', callback);
                break;
            case 'Top To Bottom Manifests':
                // will need to find a proper manifest to point this at
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405/manifest.json', callback);
                break;
            case 'Large Manifests':
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_100015688900.0x000002largemanifest/manifest.json#?si=0&ci=0&z=-0.2514%2C0%2C1.5028%2C1.6323', callback);
                break;
            default:
                this.GetPage('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json',callback);
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