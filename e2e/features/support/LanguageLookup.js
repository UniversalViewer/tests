var LanguageLookup = function() {
    var languages = {};
    languages['English'] = 'en-GB';
    languages['Welsh'] = 'cy-GB';
    languages['TestLanguage'] = 'xx-XX';

    var that = this;
    this.languages = languages;

    this.getLanguageCode = function(languageName) {
        if(languageName in that.languages) {
            return that.languages[languageName];
        }
        return "none";
    };
};

module.exports = LanguageLookup;
