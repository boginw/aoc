
function day6part1() {
    let map = document
        .querySelector("pre")
        .innerHTML.slice(0, -1)
        .split("\n")
        .map(it => it.split(""))

    let guardX = 0
    let guardY = 0
    let dir = "^"

    // find guard
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const char = map[i][j]
            if (char === "." || char === "#") continue
            guardX = j
            guardY = i
            dir = char
        }
    }

    let possible = []

    function notExists(input) {
        return possible.findIndex(it =>
            it.x === input.x &&
            it.y === input.y &&
            it.dir === input.dir
        ) === -1
    }

    let current = { x: guardX, y: guardY, dir }

    const increments = {
        "^": { xincr: 0, yincr: -1, rotate: ">" },
        "v": { xincr: 0, yincr: 1, rotate: "<" },
        "<": { xincr: -1, yincr: 0, rotate: "^" },
        ">": { xincr: 1, yincr: 0, rotate: "v" },
    }

    while (notExists(current)) {
        const newMap = map.map(curr => curr.join("")).join("\n")
        document.querySelector("pre").innerHTML = newMap

        possible.push({ ...current })

        const { xincr, yincr, rotate } = increments[current.dir]

        if (map[current.y + yincr] == null || map[current.y + yincr][current.x + xincr] == null)
            break

        if (map[current.y + yincr][current.x + xincr] === "#") {
            current.dir = rotate
            continue
        }

        current.x += xincr
        current.y += yincr
        map[current.y][current.x] = "X"
    }

    return new Set(possible.map(it => `${it.x},${it.y}`)).length
}
function day6part2() {
    let map = document
        .querySelector("pre")
        .innerHTML.slice(0, -1)
        .split("\n")
        .map(it => it.split(""))

    let guardX = 0
    let guardY = 0
    let dir = "^"

    // find guard
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const char = map[i][j]
            if (char === "." || char === "#") continue
            guardX = j
            guardY = i
            dir = char
        }
    }

    const increments = {
        "^": { xincr: 0, yincr: -1, rotate: ">" },
        "v": { xincr: 0, yincr: 1, rotate: "<" },
        "<": { xincr: -1, yincr: 0, rotate: "^" },
        ">": { xincr: 1, yincr: 0, rotate: "v" },
    }

    function isLoop(obsX, obsY) {
        let map = document
            .querySelector("pre")
            .innerHTML.slice(0, -1)
            .split("\n")
            .map(it => it.split(""))

        if (map[obsY][obsX] === "#" || map[obsY][obsX] === "^") return false

        map[obsY][obsX] = "#"

        let possible = []

        function notExists(input) {
            return possible.findIndex(it =>
                it.x === input.x &&
                it.y === input.y &&
                it.dir === input.dir
            ) === -1
        }

        let current = { x: guardX, y: guardY, dir }

        while (notExists(current)) {
            possible.push({ ...current })

            const { xincr, yincr, rotate } = increments[current.dir]

            if (map[current.y + yincr] == null || map[current.y + yincr][current.x + xincr] == null) {
                return false
            }

            if (map[current.y + yincr][current.x + xincr] === "#") {
                current.dir = rotate
                continue
            }

            current.x += xincr
            current.y += yincr
        }

        return true
    }

    let loops = 0

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const loop = isLoop(j, i)
            console.log({ x: j, y: i, loop })

            if (isLoop(j, i)) loops++
        }
    }

    return loops
}
