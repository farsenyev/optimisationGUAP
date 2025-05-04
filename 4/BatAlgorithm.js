class Bat {
  constructor(dim, lower, upper) {
    this.dim = dim;
    this.lower = lower;
    this.upper = upper;

    this.position = Array.from({ length: dim }, (_, d) =>
        Math.random() * (upper[d] - lower[d]) + lower[d]
    );
    this.velocity = Array.from({ length: dim }, () => 0);
    this.frequency = 0;
    this.loudness = 1;
    this.pulseRate = 0;
    this.fitness = Infinity;
  }
}

/**
 * Bat Algorithm
 * @param {Function} objective - function to minimize: (x, y) => f
 * @param {number} dim - dimension (2 for our case)
 * @param {number[]} lower - lower bound array per dimension
 * @param {number[]} upper - upper bound array per dimension
 * @param {object} options - { populationSize, maxIter, fmin, fmax, alpha, gamma, R }
 * @returns {object} - best solution { position, fitness }
 */
export function batAlgorithm(objective, dim, lower, upper, options) {
  const N = options.populationSize || 30;
  const maxIter = options.maxIter || 500;
  const fmin = options.fmin || 0;
  const fmax = options.fmax || 2;
  const alpha = options.alpha || 0.9;
  const gamma = options.gamma || 0.9;
  const R = options.R || 0.001;

  const bats = Array.from({ length: N }, () => new Bat(dim, lower, upper));

  bats.forEach(bat => {
    bat.fitness = objective(...bat.position);
  });

  let best = {
    position: bats[0].position.slice(),
    fitness: bats[0].fitness
  };
  bats.forEach(bat => {
    if (bat.fitness < best.fitness) {
      best = { position: bat.position.slice(), fitness: bat.fitness };
    }
  });

  for (let t = 0; t < maxIter; t++) {
    bats.forEach(bat => {
      bat.frequency = fmin + (fmax - fmin) * Math.random();
      for (let d = 0; d < dim; d++) {
        bat.velocity[d] += (bat.position[d] - best.position[d]) * bat.frequency;
        bat.position[d] += bat.velocity[d];
        bat.position[d] = Math.min(Math.max(bat.position[d], lower[d]), upper[d]);
      }

      if (Math.random() > bat.pulseRate) {
        for (let d = 0; d < dim; d++) {
          bat.position[d] =
              best.position[d] + R * (Math.random() * 2 - 1);
          bat.position[d] = Math.min(
              Math.max(bat.position[d], lower[d]),
              upper[d]
          );
        }
      }

      const newFitness = objective(...bat.position);

      if (newFitness < bat.fitness && Math.random() < bat.loudness) {
        bat.fitness = newFitness;
        bat.loudness *= alpha;
        bat.pulseRate = bat.pulseRate *
            (1 - Math.exp(-gamma * t));
      }

      if (bat.fitness < best.fitness) {
        best = { position: bat.position.slice(), fitness: bat.fitness };
      }
    });
  }

  return best;
}

