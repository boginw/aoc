
function day8part1() {
    const text = document.querySelector("pre").innerText
    const map = text.slice(0, -1).split("\n").map(it => it.split(""))

    const locations = {}

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const char = map[y][x]

            if (char === ".") continue

            locations[char] ??= []
            locations[char].push({ x, y })
        }
    }

    const antinodes = new Set()

    for (const [key, data] of Object.entries(locations)) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {

                if (i === j) continue

                const node1 = data[i]
                const node2 = data[j]

                const xDiff = node1.x - node2.x
                const yDiff = node1.y - node2.y

                const antinode1 = map[node1.y + yDiff]?.[node1.x + xDiff]
                const antinode2 = map[node2.y + yDiff]?.[node2.x + xDiff]

                if (antinode1 != null && antinode1 !== key)
                    antinodes.add(`${node1.x + xDiff},${node1.y + yDiff}`)
                if (antinode2 != null && antinode2 !== key)
                    antinodes.add(`${node2.x + xDiff},${node2.y + yDiff}`)
            }
        }
    }

    return antinodes.size
}

function day8part2() {
    const text = document.querySelector("pre").innerText
    const map = text.slice(0, -1).split("\n").map(it => it.split(""))

    const locations = {}

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const char = map[y][x]

            if (char === ".") continue

            locations[char] ??= []
            locations[char].push({ x, y })
        }
    }

    const antinodes = new Set()

    for (const [key, data] of Object.entries(locations)) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {

                if (i === j) continue

                const node1 = data[i]
                const node2 = data[j]

                const xDiff = node1.x - node2.x
                const yDiff = node1.y - node2.y

                let octave = 1
                let y1 = 0
                let x1 = 0

                let y2 = 0
                let x2 = 0

                do {
                    x1 = node1.x + xDiff * octave
                    y1 = node1.y + yDiff * octave

                    x2 = node2.x + xDiff * octave
                    y2 = node2.y + yDiff * octave

                    let antinode1 = map[y1]?.[x1]
                    let antinode2 = map[y2]?.[x2]

                    if (antinode1 != null) antinodes.add(`${x1},${y1}`)
                    if (antinode2 != null) antinodes.add(`${x2},${y2}`)

                    octave++
                } while ((map[y1]?.[x1] != null) || (map[y2]?.[x2] != null))
            }
        }
    }

    return antinodes.size
}