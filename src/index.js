'use strict';

const defaultCompare = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
};

module.exports = (array, compare = defaultCompare) => {
    const sorted = array.slice().sort(compare); // don't mutate the array
    return sorted.filter((elem, index) => {
        if (index === 0) return true; // skip first element
        return compare(sorted[index - 1], elem) !== 0;
    });
};
