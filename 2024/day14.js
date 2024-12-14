function day14part1() {
    const [w, h] = [101, 103]
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const robots = text.split("\n").map(line => {
        const [p, v] = line.split(" ").map(it => it.slice(2).split(","))
        return { p: { x: +p[0], y: +p[1] }, v: { x: +v[0], y: +v[1] } }
    })

    for (const robot of robots) {
        robot.p.x = (robot.p.x + (robot.v.x * 100)) % w
        robot.p.y = (robot.p.y + (robot.v.y * 100)) % h

        if (robot.p.x < 0) robot.p.x = w + robot.p.x
        if (robot.p.y < 0) robot.p.y = h + robot.p.y
    }

    let tl = 0, tr = 0, bl = 0, br = 0
    const pivotX = (w - 1) / 2
    const pivotY = (h - 1) / 2

    for (const robot of robots) {
        if (robot.p.x < pivotX && robot.p.y < pivotY) tl += 1
        if (robot.p.x < pivotX && robot.p.y > pivotY) bl += 1
        if (robot.p.x > pivotX && robot.p.y < pivotY) tr += 1
        if (robot.p.x > pivotX && robot.p.y > pivotY) br += 1
    }

    return tl * tr * bl * br
}

function day14part2() {
    const [w, h] = [101, 103]
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const robots = text.split("\n").map(line => {
        const [p, v] = line.split(" ").map(it => it.slice(2).split(","))
        return { p: { x: +p[0], y: +p[1] }, v: { x: +v[0], y: +v[1] } }
    })

    function printMap() {
        const map = [...new Array(h)].map(() => [...new Array(w)].map(() => 0))

        for (const robot of robots)
            map[robot.p.y][robot.p.x] += 1

        let str = ""

        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                str += map[i][j] === 0 ? "." : map[i][j].toString()
            }
            str += "\n"
        }

        return str
    }

    let maxNeightbours = 0
    let maxRound = 0

    const map = [...new Array(h)].map(() => [...new Array(w)].map(() => 0))

    for (const robot of robots) map[robot.p.y][robot.p.x] += 1

    for (let round = 0; round < 10_000; round++) {
        for (const robot of robots) {
            map[robot.p.y][robot.p.x] -= 1

            robot.p.x = (robot.p.x + robot.v.x) % w
            robot.p.y = (robot.p.y + robot.v.y) % h

            if (robot.p.x < 0) robot.p.x = w + robot.p.x
            if (robot.p.y < 0) robot.p.y = h + robot.p.y

            map[robot.p.y][robot.p.x] += 1
        }

        const totalNeighbours = robots.map(robot => {
            const t = map[robot.p.y - 1]?.[robot.p.x] ?? 0
            const b = map[robot.p.y + 1]?.[robot.p.x] ?? 0
            const l = map[robot.p.y]?.[robot.p.x - 1] ?? 0
            const r = map[robot.p.y]?.[robot.p.x + 1] ?? 0
            const tl = map[robot.p.y - 1]?.[robot.p.x - 1] ?? 0
            const tr = map[robot.p.y - 1]?.[robot.p.x + 1] ?? 0
            const bl = map[robot.p.y + 1]?.[robot.p.x - 1] ?? 0
            const br = map[robot.p.y + 1]?.[robot.p.x + 1] ?? 0

            return t + b + l + r + tl + tr + bl + br
        }).reduce((a, b) => a + b)

        if (maxNeightbours < totalNeighbours) {
            maxNeightbours = totalNeighbours
            maxRound = round

            if (maxNeightbours > 1500) {
                console.log(round + 1, maxNeightbours)
                console.log(printMap())
                break
            }
        }
    }

    return maxRound + 1
}
