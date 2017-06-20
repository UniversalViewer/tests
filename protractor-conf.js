var browserstackData = require('./browserstack-conf.json');

exports.config = {

    specs: [
        'e2e/features/*.feature'
    ],

    capabilities: {
        //'browserName': 'internet explorer', //'firefox', //'chrome',
        'browserName': 'chrome', //'chrome',

        'chromeOptions': {
            args: ['--test-type', '--no-sandbox']
        }

        /* BROWSERSTACK LOCAL CONFIG 1: */
        /*
        ,
        'browserName': 'internet explorer', //'firefox', //'chrome',
        'browserstack.user' : browserstackData.user,
        'browserstack.key' : browserstackData.key,
        'browserstack.local' : 'true',
        'version': '11.0',
        'os': 'WINDOWS',
        'os_version': '8.1',
        'resolution': '1024x768'
        */
        /* END OF BROWSERSTACK LOCAL CONFIG 1 */
    },

    baseUrl: 'http://localhost:8002',

    /* BROWSERSTACK LOCAL CONFIG 2: */
    /* seleniumAddress: 'http://hub.browserstack.com/wd/hub', */
    /* END OF BROWSERSTACK LOCAL CONFIG 2 */

    framework: 'cucumber'

};