// Функция для вычисления "удвоенной" площади F(x1,x2) = 3*x1 - x1*x2 + 2*x2 - 4
function F(x1, x2) {
    return 3 * x1 - x1 * x2 + 2 * x2 - 4;
}

// Целевая функция – площадь, которую будем максимизировать
function area(x1, x2) {
    return 0.5 * F(x1, x2);
}

// Параметры оптимизации
const tol = 1e-6;       // требуемая точность
const maxIter = 100;    // максимальное число итераций

// Начальное приближение
let x1 = 2.0, x2 = 3.0;

// Для хранения точек итераций (для построения графика)
const iterPoints = [];
iterPoints.push({x1, x2, area: area(x1, x2)});

// Функция одномерной оптимизации по x в заданном интервале [L, R] (простейшая реализация с перебором)
function optimize1D(func, L, R, fixedParam, isX1=true) {
    let bestX, bestVal = -Infinity;
    const N = 1000; // число точек в сетке
    for (let i = 0; i <= N; i++) {
        let x = L + (R - L) * i / N;
        let val = isX1 ? func(x, fixedParam) : func(fixedParam, x);
        if (val > bestVal) {
            bestVal = val;
            bestX = x;
        }
    }
    return bestX;
}

// Основной цикл координатного спуска
for (let iter = 0; iter < maxIter; iter++) {
    // Оптимизация по x1, фиксируя x2
    let newX1 = optimize1D(F, 0, 4, x2, true);
    // Оптимизация по x2, фиксируя обновлённое x1
    let newX2 = optimize1D(F, 2, 4, newX1, false);

    iterPoints.push({x1: newX1, x2: newX2, area: area(newX1, newX2)});

    // Если изменения очень малы, останавливаем итерации
    if (Math.abs(newX1 - x1) < tol && Math.abs(newX2 - x2) < tol) {
        x1 = newX1;
        x2 = newX2;
        break;
    }

    x1 = newX1;
    x2 = newX2;
}

console.log("Найденная точка:", {x1, x2, area: area(x1, x2)});
// Ожидаемо, при точном поиске, оптимальные значения будут на границе: например, x1=0, x2=4 (area=2)
// или x1=4, x2=2 (area=2)
