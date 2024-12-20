function day18findShortestPath(map, start, end) {
  const queue = [[0, { x: start.x, y: start.y, cost: 1 }]];
  const dist = [...new Array(map.length)].map(() =>
    [...new Array(map[0].length)].map(() => ({}))
  );
  dist[start.y][start.x] = 1;

  while (queue.length > 0) {
    const [currDist, vertex, path] = queue.shift();

    if (vertex.x === end.x && vertex.y === end.y) {
      let finalPath = [];
      let current = path;

      while (current != null) {
        finalPath.push(current[0]);
        current = current[1];
      }

      return finalPath;
    }

    const neighbours = [
      { y: vertex.y + 1, x: vertex.x },
      { y: vertex.y - 1, x: vertex.x },
      { y: vertex.y, x: vertex.x + 1 },
      { y: vertex.y, x: vertex.x - 1 },
    ];

    for (let i = 0; i < neighbours.length; i++) {
      const adj = neighbours[i];
      if (map[adj.y]?.[adj.x] == null) continue;
      if (map[adj.y]?.[adj.x] === "#") continue;

      const adjDist = dist[adj.y][adj.x] ?? Infinity;

      if (adjDist <= currDist + 1) continue;

      dist[adj.y][adj.x] = currDist + 1;

      queue.push([currDist + 1, adj, [adj, path]]);
      queue.sort((a, b) => a[0] - b[0]);
    }
  }
}

function day18part1() {
  const [maxW, maxH] = [70, 70];
  const limit = 1024;
  const text = document.querySelector("pre").innerHTML.slice(0, -1);

  const bytes = text
    .split("\n")
    .map((it) => it.split(","))
    .map(([x, y]) => ({ x: +x, y: +y }));

  const map = [...new Array(maxH + 1)].map(() =>
    [...new Array(maxW + 1)].map(() => ".")
  );

  for (let b = 0; b < limit; b++) {
    const byte = bytes[b];
    map[byte.y][byte.x] = "#";
  }

  return day18findShortestPath(map, { x: 0, y: 0 }, { x: maxW, y: maxH })
    .length;
}

function day18part2() {
  const [maxW, maxH] = [70, 70];
  const text = document.querySelector("pre").innerHTML.slice(0, -1);

  const bytes = text
    .split("\n")
    .map((it) => it.split(","))
    .map(([x, y]) => ({ x: +x, y: +y }));

  const map = [...new Array(maxH + 1)].map(() =>
    [...new Array(maxW + 1)].map(() => ".")
  );

  let currentPath = day18findShortestPath(
    map,
    { x: 0, y: 0 },
    { x: maxW, y: maxH }
  );

  for (let b = 0; b < bytes.length; b++) {
    const byte = bytes[b];
    map[byte.y][byte.x] = "#";

    if (currentPath.some((it) => it.x === byte.x && it.y === byte.y))
      currentPath = day18findShortestPath(
        map,
        { x: 0, y: 0 },
        { x: maxW, y: maxH }
      );

    if (currentPath == null) {
      return byte;
    }
  }
}
