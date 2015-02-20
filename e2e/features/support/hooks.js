/**
 * Created by jenniferstrejevitch on 03/12/2014.
 */
var ViewerPage = require("../PageObjects/ViewerPage.js");

var hooks = function () {
    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    ptor.ignoreSynchronization = true;

    this.currentFeature = '';
    var that = this;

    this.Before(function(callback) {
        if(showdebug) { console.log('Before - Hooks'); }
        vp.resetFrame(callback);
    });

    this.BeforeScenario(function (event, callback) {
        if(showdebug) { console.log('Scenario: ' + event.getPayloadItem('scenario').getName()); }

        //Hooks does not have access to World. Check first comment on question
        // http://stackoverflow.com/questions/25984786/cant-access-world-methods-in-afterfeatures-hook
        this.GetPage = function(page, callback){
            if(showdebug) { console.log('getting page ' + page); }
            ptor.get(page).then(
                function() {
                    vp.sleep(vp.pageLoadDelay).then(
                        function () {
                            //vp.resetFrame(callback);
                            callback();
                        });
                });
        };

        switch(that.currentFeature) {
            case 'Hierarchical Index':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404deephierarchy/manifest.json&si=0&ci=0&z=-0.0693%2C0%2C1.1385%2C1.2366',callback);
                break;
            case 'Display Two Up Missing Images':
                this.GetPage('/examples/?manifest=/examples/iiif-missingimages.js',callback);
                break;
            case 'Display Two Up Bad First Page On Left':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000060MissingCanvas/manifest.json',callback);
                break;
            case 'Display Two Up Bad Pages Incorrectly Labelled':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405_leftleft/manifest.json',callback);
                break;
            case 'Display Two Up Incorrectly Curated':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404multiple/manifest.json',callback);
                break;
            //case 'Thumbnails':
            //    this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_100022570722.0x000001/manifest.json#?si=0&ci=0&z=-0.2327%2C0%2C1.4653%2C1.5916',callback);
            //    break;
            case 'Eliding':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000028404longtitle/manifest.json&config=%2Fdefault-config.js#?si=0&ci=0',callback);
                break;
            case 'Left To Right Manifests':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json', callback);
                break;
            case 'Right To Left Manifests':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/add_ms_9405/manifest.json', callback);
                break;
            case 'Top To Bottom Manifests':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/or_16753/manifest.json', callback);
                break;
            case 'Large Manifests':
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_100015688900.0x000002largemanifest/manifest.json#?si=0&ci=0&z=-0.2514%2C0%2C1.5028%2C1.6323', callback);
                break;
            case 'Language Switching Behaviour':
            case 'Language Specific Characters':
            case 'Language Support In Interface':
                this.GetPage('/examples/?manifest=http://dms-data.stanford.edu/data/manifests/kn/mw497gz1295/manifest.json', callback);
                break;
            case 'Language Support In Manifest':
                this.GetPage('/examples/?manifest=/examples/manifest/languagetest.json', callback);
                break;
            case 'Language Fallback Support In Manifest':
                this.GetPage('/examples/?manifest=/examples/manifest/languagefallbacktest.json', callback);
                break;
            case 'Rights Notices':
            case 'Malicious Rights Notices':
            default:
                this.GetPage('/examples/?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json',callback);
        }

    });

    this.registerHandler('BeforeFeature', function (event, callback) {
        var feature = event.getPayloadItem('feature').getName();
        if(showdebug) { console.log('Feature: ' + feature); }
        that.currentFeature = feature;

        callback();
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