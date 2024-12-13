function day13part1(increaseBy = 0) {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const machines = text.split("\n\n").map(it => {
        const matches = [...it.matchAll(/(\d+)/gm)].map(it => it[0])
        return {
            a: { x: +matches[0], y: +matches[1] },
            b: { x: +matches[2], y: +matches[3] },
            r: { x: +matches[4] + increaseBy, y: +matches[5] + increaseBy },
        }
    })

    let tokens = 0

    for (let machine of machines) {
        const matrix = [
            [machine.a.x, machine.b.x, 1, 0],
            [machine.a.y, machine.b.y, 0, 1],
        ];

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (i === j) continue;
                for (let k = i + 1; k < matrix[i].length; k++) {
                    let divider = i == 0 ? 1 : matrix[i - 1][i - 1];
                    matrix[j][k] = (matrix[i][i] * matrix[j][k] - matrix[j][i] * matrix[i][k]) / divider;
                }
            }
        }

        const a = (matrix[0][2] * machine.r.x + matrix[0][3] * machine.r.y) / matrix[1][1]
        const b = (machine.r.x - (a * machine.a.x)) / machine.b.x

        if (!Number.isInteger(a) || !Number.isInteger(b)) continue

        tokens += 3 * a + b
    }

    return tokens
}

function day13part2() {
    return day13part1(10000000000000)
}
