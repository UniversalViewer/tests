exports.config = {

    specs: [
        'e2e/features/Thumbnails.feature'
    ],

    capabilities: {
        //'browserName': 'internet explorer', //'firefox', //'chrome',
        'browserName': 'ie', //'chrome',

        'chromeOptions': {
            args: ['--test-type']
        }

        /* BROWSERSTACK LOCAL CONFIG: */
        //'browserName': 'internet explorer', //'firefox', //'chrome',
        //'browserstack.user' : 'Digirati',
        //'browserstack.key' : '5EKTyxTa2OxHccLpivA8',
        //'browserstack.local' : 'true',
        //'version': '11.0',
        //'os': 'WINDOWS',
        //'os_version': '8.1',
        //'resolution': '1024x768'

    },

    baseUrl: 'http://localhost:8001',
    //baseUrl: 'http://bltesters.azurewebsites.net',

    //seleniumAddress: 'http://hub.browserstack.com/wd/hub',

    framework: 'cucumber'

};
