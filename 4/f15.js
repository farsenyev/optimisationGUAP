import {batAlgorithm} from './BatAlgorithm.js';

function f15(x, y) {
    return (Math.pow(x, 6) / 6) - 1.05 * Math.pow(x, 4) + 2 * Math.pow(x, 2) + x * y + Math.pow(y, 2);
}

(function () {
    const lower15 = [-5, -5];
    const upper15 = [5, 5];

    console.log("\nOptimizing f15 (three-hump camel) on [-5,5]^2...");
    const result15 = batAlgorithm(f15, 2, lower15, upper15, {
        populationSize: 40,
        maxIter: 500,
        fmin: 0,
        fmax: 2,
        alpha: 0.9,
        gamma: 0.9,
        R: 0.001
    });
    console.log(
        `Best for f15: x = ${result15.position[0].toFixed(6)}, ` +
        `y = ${result15.position[1].toFixed(6)}, ` +
        `f = ${result15.fitness.toFixed(6)}`
    );
})();
