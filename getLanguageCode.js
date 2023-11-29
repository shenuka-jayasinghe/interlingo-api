//converts two letter code eg: PL to google voice list language code: pl-PL
function getLanguageCode(language){

    let languageCode
    const exceptionsRegex = /EN|SV|CN/g
    if (exceptionsRegex.test(language)) {
        switch(language){
            case 'EN': languageCode = 'en-GB'
            break;
            case 'SV': languageCode = 'sv-SE'
            break;
            case 'CN': languageCode = 'cmn-CN'
        }
    }
    else {
        languageCode = `${language.toLowerCase()}-${language}`
    }
    return languageCode
}
module.exports = getLanguageCode