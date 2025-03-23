// Определение целевой функции f(θ)
function f(theta) {
    return 2 - Math.cos(theta) + Math.sqrt(3) * Math.sin(theta);
}

// Функция метода кубической интерполяции
function cubicInterpolation(maxIter = 50, tol = 0.01) {
    // Выбор начальных точек: они охватывают интервал, где ожидается экстремум.
    let theta1 = 1.0; // левая граница
    let theta2 = 2.0; // центральная точка (ближе к оптимальному значению)
    let theta3 = 3.0; // правая граница

    // Массив для хранения всех итерационных точек (для последующего построения графика)
    let iterPoints = [theta1, theta2, theta3];

    for (let i = 0; i < maxIter; i++) {
        const f1 = f(theta1);
        const f2 = f(theta2);
        const f3 = f(theta3);

        // Вычисляем числитель и знаменатель по формуле кубической интерполяции
        const num = Math.pow(theta2 - theta1, 2) * (f2 - f3) - Math.pow(theta2 - theta3, 2) * (f2 - f1);
        const den = (theta2 - theta1) * (f2 - f3) - (theta2 - theta3) * (f2 - f1);

        // Защита от деления на ноль
        if (Math.abs(den) < 1e-8) {
            break;
        }

        // Новое приближение по формуле
        const thetaNew = theta2 - 0.5 * (num / den);
        iterPoints.push(thetaNew);

        // Собираем имеющиеся точки в массив объектов {theta, f}
        let pts = [
            {theta: theta1, f: f1},
            {theta: theta2, f: f2},
            {theta: theta3, f: f3},
            {theta: thetaNew, f: f(thetaNew)}
        ];

        console.log("Итерация:", i);
        console.log("Значения", pts[i]);

        // Сортируем точки по возрастанию theta
        pts.sort((a, b) => a.theta - b.theta);

        // Находим точку с максимальным значением функции
        const maxPoint = pts.reduce((prev, curr) => (curr.f > prev.f ? curr : prev));
        const idxMax = pts.findIndex(pt => pt.theta === maxPoint.theta);

        // Обновляем набор из трёх точек так, чтобы максимум оказался в центре:
        // Если максимум — крайняя точка, выбираем три ближайшие; иначе берём одну точку слева и одну справа.
        if (idxMax === 0) {
            pts = pts.slice(0, 3);
        } else if (idxMax === pts.length - 1) {
            pts = pts.slice(pts.length - 3);
        } else {
            pts = pts.slice(idxMax - 1, idxMax + 2);
        }

        // Обновляем значения для следующей итерации
        theta1 = pts[0].theta;
        theta2 = pts[1].theta;
        theta3 = pts[2].theta;

        // Если изменение центрального приближения меньше tol, завершаем итерации
        if (Math.abs(thetaNew - theta2) < tol) {
            theta2 = thetaNew;
            // break;
        }
    }

    return {thetaOpt: theta2, fOpt: f(theta2), iterPoints};
}

// Запускаем метод кубической интерполяции
const result = cubicInterpolation(50, 0.01);
console.log("Оптимальный угол θ:", result.thetaOpt);
console.log("Максимальное значение f(θ):", result.fOpt);
console.log("Максимальное BD =", Math.sqrt(result.fOpt)); // f(θ) = BD²
console.log("Итерационные точки:", result.iterPoints);
