'use strict';

const generateRandomArray = size => {

    const array = [];

    for(let i = 0; i < size; i++){

        array.push(Math.floor(Math.random() * 1000));
    }

    return array;
};

const bubbleSort = arr => {

    const result = Array.from(arr);

    for(let i = 0; i < result.length; i++){

        for(let j = 0; j < result.length - 1; j++){

            if(result[j] > result[j + 1]){

                const temp = result[j];

                result[j] = result[j + 1];

                result[j + 1] = temp;
            }
        }
    }

    return result;
};

const nativeSort = arr => {

    const result = Array.from(arr);

    return result.sort((a,b) => a - b);
};

document.getElementById('compareButton')
.addEventListener('click', () => {

    const testArray = generateRandomArray(3000);

    console.time('Bubble Sort');

    const bubbleResult = bubbleSort(testArray);

    console.timeEnd('Bubble Sort');

    console.time('Native Sort');

    const nativeResult = nativeSort(testArray);

    console.timeEnd('Native Sort');

    console.assert(
        JSON.stringify(bubbleResult) === JSON.stringify(nativeResult),
        'Niet hetzelfde'
    );

    document.getElementById('results').innerHTML =
        '<p>Bekijk console voor resultaten</p>';
});
