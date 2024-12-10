function day10part1() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const map = text.split("\n").map(it => it.split("").map(it => +it))

    const queue = []

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== 0) continue
            queue.push({ x, y, startX: x, startY: y })
        }
    }

    let trails = new Set()

    while (queue.length > 0) {
        const entry = queue.shift()
        const { x, y } = entry
        const val = map[y]?.[x]

        if (val === undefined) continue

        if (val === 9) {
            trails.add(`${entry.startX},${entry.startY} --> ${x},${y}`)
            continue
        }

        if (map[y]?.[x + 1] === val + 1)
            queue.unshift({ ...entry, y, x: x + 1 })
        if (map[y]?.[x - 1] === val + 1)
            queue.unshift({ ...entry, y, x: x - 1 })
        if (map[y + 1]?.[x] === val + 1)
            queue.unshift({ ...entry, y: y + 1, x })
        if (map[y - 1]?.[x] === val + 1)
            queue.unshift({ ...entry, y: y - 1, x })
    }

    return trails.size
}

function day10part2() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const map = text.split("\n").map(it => it.split("").map(it => +it))

    const queue = []

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== 0) continue
            queue.push({ x, y })
        }
    }

    let trails = 0

    while (queue.length > 0) {
        const { x, y } = queue.shift()
        const val = map[y]?.[x]

        if (val === undefined) continue

        if (val === 9) {
            trails++
            continue
        }

        if (map[y]?.[x + 1] === val + 1)
            queue.unshift({ y, x: x + 1 })
        if (map[y]?.[x - 1] === val + 1)
            queue.unshift({ y, x: x - 1 })
        if (map[y + 1]?.[x] === val + 1)
            queue.unshift({ y: y + 1, x })
        if (map[y - 1]?.[x] === val + 1)
            queue.unshift({ y: y - 1, x })
    }

    return trails
}

day10part2()
