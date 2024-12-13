function day12part1() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const map = text.split("\n").map(it => it.split(""))
    let counted = new Set()
    let sum = 0

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (counted.has(`${x},${y}`)) continue
            counted.add(`${x},${x}`)

            const plant = map[y][x]
            const region = new Set([])
            let perimiter = 0

            const toCheck = [{ x, y }]

            while (toCheck.length > 0) {
                const { x, y } = toCheck.pop()
                const location = `${x},${y}`

                if (map[y][x] !== plant || region.has(location))
                    continue

                region.add(location)

                if (map[y + 1]?.[x] !== plant) perimiter++
                else toCheck.push({ y: y + 1, x })

                if (map[y - 1]?.[x] !== plant) perimiter++
                else toCheck.push({ y: y - 1, x })

                if (map[y]?.[x + 1] !== plant) perimiter++
                else toCheck.push({ y, x: x + 1 })

                if (map[y]?.[x - 1] !== plant) perimiter++
                else toCheck.push({ y, x: x - 1 })
            }

            counted = counted.union(region)
            sum += perimiter * region.size
        }
    }

    return sum
}

function day12part2() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const map = text.split("\n").map(it => it.split(""))
    let counted = new Set()
    let sum = 0

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (counted.has(`${x},${y}`)) continue
            counted.add(`${x},${x}`)

            const plant = map[y][x]
            const region = new Set([])
            const perimiter = []

            function wallEquals(wall1, wall2) {
                return wall1.x === wall2.x
                    && wall1.y === wall2.y
                    && wall1.face === wall2.face
            }

            function addWall(wall) {
                if (perimiter.findIndex(p => wallEquals(p, wall)) !== -1) return
                perimiter.push(wall)
            }

            const toCheck = [{ x, y }]

            while (toCheck.length > 0) {
                const { x, y } = toCheck.pop()
                const location = `${x},${y}`

                if (map[y][x] !== plant || region.has(location)) {
                    continue
                }

                region.add(location)

                if (map[y + 1]?.[x] !== plant) addWall({ x, y, face: "S" })
                else toCheck.push({ y: y + 1, x })

                if (map[y - 1]?.[x] !== plant) addWall({ x, y, face: "N" })
                else toCheck.push({ y: y - 1, x })

                if (map[y]?.[x + 1] !== plant) addWall({ x, y, face: "E" })
                else toCheck.push({ y, x: x + 1 })

                if (map[y]?.[x - 1] !== plant) addWall({ x, y, face: "W" })
                else toCheck.push({ y, x: x - 1 })
            }

            counted = counted.union(region)

            const columnWalls = perimiter.filter(it => it.face === "W" || it.face === "E")
            const rowWalls = perimiter.filter(it => it.face === "N" || it.face === "S")
            const columns = Object.values(Object.groupBy(columnWalls, it => `${it.x},${it.face}`))
                .map(it => it.sort((a, b) => a.y - b.y))
            const rows = Object.values(Object.groupBy(rowWalls, it => `${it.y},${it.face}`))
                .map(it => it.sort((a, b) => a.x - b.x))

            let numCols = 0
            let numRows = 0

            for (let i = 0; i < columns.length; i++) {
                numCols++

                for (let j = 1; j < columns[i].length; j++) {
                    if (columns[i][j - 1].y + 1 === columns[i][j].y) // continuation of same wall
                        continue

                    numCols++
                }
            }

            for (let i = 0; i < rows.length; i++) {
                numRows++

                for (let j = 1; j < rows[i].length; j++) {
                    if (rows[i][j - 1].x + 1 === rows[i][j].x) // continuation of same wall
                        continue

                    numRows++
                }
            }

            const numWalls = numCols + numRows
            const price = numWalls * region.size
            sum += price
        }
    }

    return sum
}
