'use strict';

var defaultCompare = function defaultCompare(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
};

module.exports = function (array) {
    var compare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCompare;

    var sorted = array.slice().sort(compare); // don't mutate the array
    return sorted.filter(function (elem, index) {
        if (index === 0) return true; // skip first element
        return compare(sorted[index - 1], elem) !== 0;
    });
};