const getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

const formToJson = function (form) {
    const nameAttribute = 'name';
    const valueAttribute = 'value';

    const formArray = form.serializeArray();

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        if (returnArray[formArray[i][nameAttribute]]) {
            //already exists;
            var existingValue = returnArray[formArray[i][nameAttribute]];
            if (!Array.isArray(existingValue)) {
                //is not array, then lets make is a array
                returnArray[formArray[i][nameAttribute]] = [existingValue];
            }
            returnArray[formArray[i][nameAttribute]].push(formArray[i][valueAttribute]);
        } else {
            returnArray[formArray[i][nameAttribute]] = formArray[i][valueAttribute];
        }
    }
    return returnArray;
};
