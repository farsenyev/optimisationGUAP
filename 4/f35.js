import {batAlgorithm} from './BatAlgorithm.js';

function f35(x, y) {
    const r2 = x * x + y * y;
    return Math.pow(r2, 2) + r2 + Math.sin(50 * r2) + 1;
}


(function () {
    const lower35 = [-10, -10];
    const upper35 = [10, 10];

    console.log("\nOptimizing f35 on [-10,10]^2...");
    const result35 = batAlgorithm(f35, 2, lower35, upper35, {
        populationSize: 40,
        maxIter: 500,
        fmin: 0,
        fmax: 2,
        alpha: 0.9,
        gamma: 0.9,
        R: 0.001
    });
    console.log(
        `Best for f35: x = ${result35.position[0].toFixed(6)}, ` +
        `y = ${result35.position[1].toFixed(6)}, ` +
        `f = ${result35.fitness.toFixed(6)}`
    );
})();