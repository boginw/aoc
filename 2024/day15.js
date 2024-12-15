function day15part1() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const [mapText, movementText] = text.split("\n\n")

    const map = mapText.split("\n").map(it => it.split(""))
    const movements = movementText.replaceAll("\n", "").split("")

    let robotX = 0
    let robotY = 0

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== "@") continue
            robotX = x
            robotY = y
            break
        }
    }

    const directions = {
        "^": { x: 0, y: -1 },
        "v": { x: 0, y: +1 },
        "<": { x: -1, y: 0 },
        ">": { x: +1, y: 0 },
    }

    function move(inputX, inputY, direction) {
        const newX = inputX + direction.x
        const newY = inputY + direction.y
        const self = map[inputY][inputX]

        if (map[newY][newX] === "#") return false
        if (map[newY][newX] === ".") {
            map[inputY][inputX] = "."
            map[newY][newX] = self
            return true
        }

        if (move(newX, newY, direction)) {
            map[inputY][inputX] = "."
            map[newY][newX] = self
            return true
        }

        return false
    }

    while (movements.length > 0) {
        const movement = movements.shift()
        const direction = directions[movement]

        if (move(robotX, robotY, direction)) {
            robotX += direction.x
            robotY += direction.y
        }
    }

    let gps = 0


    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== "O") continue
            gps += 100 * y + x
        }
    }

    return gps
}

function day15part2() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const [mapText, movementText] = text.split("\n\n")

    const map = mapText.split("\n").map(it => it.split("").flatMap(it => {
        if (it === "#") return ["#", "#"]
        if (it === "O") return ["[", "]"]
        if (it === ".") return [".", "."]
        if (it === "@") return ["@", "."]
    }))
    const movements = movementText.replaceAll("\n", "").split("")

    let robotX = 0
    let robotY = 0

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== "@") continue
            robotX = x
            robotY = y
            break
        }
    }

    const directions = {
        "^": { x: 0, y: -1 },
        "v": { x: 0, y: +1 },
        "<": { x: -1, y: 0 },
        ">": { x: +1, y: 0 },
    }

    function canMoveVertically(inputX, inputY, direction) {
        const newX = inputX + direction.x
        const newY = inputY + direction.y
        const width = map[inputY][inputX] === "[" ? 1 : 0

        if (map[newY][newX] === "#" || map[newY][newX + width] === "#")
            return false

        if (map[newY][newX] === "." && map[newY][newX + width] === ".") {
            return true
        }

        if (map[newY][newX] === "[" && !canMoveVertically(newX, newY, direction))
            return false
        if (map[newY][newX] === "]" && !canMoveVertically(newX - 1, newY, direction))
            return false
        if (width == 1 && map[newY][newX + 1] === "[" && !canMoveVertically(newX + 1, newY, direction))
            return false

        return true
    }

    function move(inputX, inputY, direction) {
        const newX = inputX + direction.x
        const newY = inputY + direction.y

        if (direction.x !== 0) {
            const newX = inputX + direction.x
            const newY = inputY + direction.y
            const self = map[inputY][inputX]

            if (map[newY][newX] === "#") return false
            if (map[newY][newX] === ".") {
                map[inputY][inputX] = "."
                map[newY][newX] = self
                return true
            }

            if (move(newX, newY, direction)) {
                map[inputY][inputX] = "."
                map[newY][newX] = self
                return true
            }

            return false
        }

        if (!canMoveVertically(inputX, inputY, direction))
            return false

        const width = map[inputY][inputX] === "[" ? 1 : 0

        if (map[newY][newX] === "[") move(newX, newY, direction)
        if (map[newY][newX] === "]") move(newX - 1, newY, direction)
        if (width > 0 && map[newY][newX + 1] === "[") move(newX + 1, newY, direction)

        map[newY][newX] = map[inputY][inputX]
        map[newY][newX + width] = map[inputY][inputX + width]
        map[inputY][inputX] = "."
        map[inputY][inputX + width] = "."

        return true
    }

    while (movements.length > 0) {
        const movement = movements.shift()
        const direction = directions[movement]

        if (move(robotX, robotY, direction)) {
            robotX += direction.x
            robotY += direction.y
        }
    }

    let gps = 0

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== "[") continue
            gps += 100 * y + x
        }
    }

    return gps
}
