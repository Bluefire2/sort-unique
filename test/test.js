'use strict';

const sortUnique = require('../lib/index'),
    chai = require('chai'),
    expect = chai.expect;

console.log(sortUnique([893,420,420,525,83]));

describe('sort-unique', () => {
    const emptyArray = [];
    it('should return an empty array when given an empty array', () => {
        expect(sortUnique(emptyArray)).to.have.length(0);
    });

    const arrayA = [3, 6, 5, 4, 7, 1, 3];
    it('should not mutate the array', () => {
        const s = sortUnique(arrayA);
        expect(arrayA).to.eql([3, 6, 5, 4, 7, 1, 3]);
    });

    // generate random arrays and test postconditions
    const NTests = 100,
        minLength = 5,
        maxLength = 20,
        maxValue = 20;

    const defaultCompare = (a, b) => {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    };

    const arrayIsSorted = (a, compare=defaultCompare) => {
        return a.every((elem, index) => {
            if(index === 0) return true;
            return compare(elem, a[index - 1]) !== -1;
        });
    };

    const arrayHasNoDuplicates = (a, compare=defaultCompare) => {
        return a.every((elem, index) => a.slice(index + 1).every(elem2 => compare(elem, elem2) !== 0));
    };

    for(let i = 0; i < NTests; i++) {
        const len = minLength + Math.floor(Math.random() * (maxLength - minLength)),
            array = Array.from({length: len}, () => Math.floor(Math.random() * maxValue)),
            sorted = sortUnique(array);

        it(`should correctly sort ${array}`, () => {
            // check length
            expect(sorted).to.have.length.within(1, len);

            // verify sorted invariant
            expect(sorted).to.satisfy(arrayIsSorted);
        });

        it(`should correctly remove duplicates in ${array}`, () => {
            // verify that there are no duplicate elements
            expect(sorted).to.satisfy(arrayHasNoDuplicates);
        });
    }

    // now test sorting with a custom comparison function
    const compareObjects = ({value: valueA}, {value: valueB}) => defaultCompare(valueA, valueB);

    for(let i = 0; i < NTests; i++) {
        const len = minLength + Math.floor(Math.random() * (maxLength - minLength)),
            array = Array.from({length: len}, () => {return {value: Math.floor(Math.random() * maxValue)};}),
            sorted = sortUnique(array, compareObjects);

        it(`should correctly sort with a custom compare function ${array}`, () => {
            // check length
            expect(sorted).to.have.length.within(1, len);

            // verify sorted invariant
            expect(sorted).to.satisfy(a => arrayIsSorted(a, compareObjects));
        });

        it(`should correctly remove duplicates with a custom compare function in ${array}`, () => {
            // verify that there are no duplicate elements
            expect(sorted).to.satisfy(a => arrayHasNoDuplicates(a, compareObjects));
        });
    }
});