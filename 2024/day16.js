function day16part1(text) {
    text ??= document.querySelector("pre").innerHTML.slice(0, -1);
    const map = text.split("\n").map((it) => it.split(""));
    const { start, end, maze } = day16parseMaze(map)

    const queue = [[0, { x: start.x, y: start.y, dir: "E", cost: 1 }]];
    const dist = [...new Array(map.length)].map(() => [...new Array(map[0].length)].map(() => ({})));
    dist[start.y][start.x]["E"] = 1;

    while (queue.length > 0) {
        const [currDist, vertex] = queue.shift();

        if (vertex.x === end.x && vertex.y === end.y) {
            return currDist
        }

        for (let i = 0; i < maze[vertex.y][vertex.x][vertex.dir].length; i++) {
            const adj = maze[vertex.y][vertex.x][vertex.dir][i];
            const adjDist = dist[adj.y][adj.x][adj.dir] ?? Infinity;

            if (adjDist <= currDist + adj.cost) continue;

            dist[adj.y][adj.x][adj.dir] = currDist + adj.cost;

            queue.push([currDist + adj.cost, adj]);
            queue.sort((a, b) => a[0] - b[0]);
        }
    }
}

function day16part2() {
    const text = document.querySelector("pre").innerHTML.slice(0, -1);
    const map = text.split("\n").map((it) => it.split(""));
    const { start, end, maze } = day16parseMaze(map)

    const maxDist = day16part1(text)

    const queue = [[0, { x: start.x, y: start.y, dir: "E", cost: 1 }, []]];
    const dist = [...new Array(map.length)].map(() => [...new Array(map[0].length)].map(() => ({})));
    dist[start.y][start.x]["E"] = 1;

    const paths = []

    while (queue.length > 0) {
        const [currDist, vertex, path] = queue.shift();

        if (vertex.x === end.x && vertex.y === end.y) {
            paths.push(path)
            continue
        }

        if (currDist >= maxDist)
            continue

        for (let i = 0; i < maze[vertex.y][vertex.x][vertex.dir].length; i++) {
            const adj = maze[vertex.y][vertex.x][vertex.dir][i];
            const adjDist = dist[adj.y][adj.x][adj.dir] ?? Infinity;

            if (adjDist < currDist + adj.cost) continue;

            dist[adj.y][adj.x][adj.dir] = currDist + adj.cost;
            queue.splice(0, 0, [currDist + adj.cost, adj, [adj, path]]); // depth first for RAM reasons
        }
    }

    const nodes = new Set()

    for (let path of paths) {
        do {
            nodes.add(`${path[0].x},${path[0].y}`)
            path = path[1]
        } while (path?.length === 2)
    }

    return nodes.size + 1
}

function day16parseMaze(map) {
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let directions = {
        N: { x: +0, y: -1, rotate: { N: 0, E: 1, S: 1, W: 1 } },
        E: { x: +1, y: +0, rotate: { N: 1, E: 0, S: 1, W: 2 } },
        S: { x: +0, y: +1, rotate: { N: 2, E: 1, S: 0, W: 1 } },
        W: { x: -1, y: +0, rotate: { N: 1, E: 2, S: 1, W: 0 } },
    };

    const maze = [...new Array(map.length)].map(() =>
        [...new Array(map[0].length)].map(() => ({ N: [], E: [], S: [], W: [] }))
    );

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "#") continue;
            if (map[y][x] === "S") start = { x, y }
            if (map[y][x] === "E") end = { x, y }

            for (const [fromDir, fromMove] of Object.entries(directions)) {
                for (const [toDir, toMove] of Object.entries(directions)) {
                    if (fromDir !== toDir) {
                        const to = map[y + toMove.y]?.[x + toMove.x];
                        if (to == null || to === "#") continue

                        const cost = directions[fromDir].rotate[toDir] * 1000;
                        maze[y][x][fromDir].push({ x, y, dir: toDir, cost });
                        continue
                    }

                    const to = map[y + fromMove.y]?.[x + fromMove.x];

                    if (to == null || to === "#") continue;

                    maze[y][x][fromDir].push({
                        x: x + fromMove.x,
                        y: y + fromMove.y,
                        dir: toDir,
                        cost: 1,
                    });
                }
            }
        }
    }

    return { start, end, maze }
}
