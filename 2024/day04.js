function day4part1() {
    const input = document
        .querySelector("pre")
        .innerHTML.slice(0, -1)
        .split("\n")
        .map((it) => it.split(""));

    const target = "XMAS";
    const targetReverse = target.split("").reverse().join("");

    function read(opts) {
        let { x, y } = opts;
        const xincr = opts.xincr ?? 0;
        const yincr = opts.yincr ?? 0;
        const length = opts.length ?? 4;
        let acc = "";

        for (let i = 0; i < length; i++) {
            if (input.length <= y || input[y].length <= x) return acc;

            acc += input[y][x];
            x += xincr;
            y += yincr;
        }

        return acc;
    }

    let matches = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (read({ x, y, xincr: 1 }) === target) matches++;
            if (read({ x, y, xincr: 1 }) === targetReverse) matches++;

            if (read({ x, y, yincr: 1 }) === target) matches++;
            if (read({ x, y, yincr: 1 }) === targetReverse) matches++;

            if (read({ x, y, xincr: 1, yincr: 1 }) === target) matches++;
            if (read({ x, y, xincr: 1, yincr: 1 }) === targetReverse) matches++;

            if (read({ x, y, xincr: -1, yincr: 1 }) === target) matches++;
            if (read({ x, y, xincr: -1, yincr: 1 }) === targetReverse) matches++;
        }
    }

    return matches;
}

function day4part2() {
    const input = document
        .querySelector("pre")
        .innerHTML.slice(0, -1)
        .split("\n")
        .map((it) => it.split(""));

    let matches = 0;

    for (let y = 1; y < input.length - 1; y++) {
        for (let x = 1; x < input[y].length - 1; x++) {
            if (input[y][x] !== "A") continue;

            const tl = input[y - 1][x - 1];
            const tr = input[y - 1][x + 1];
            const bl = input[y + 1][x - 1];
            const br = input[y + 1][x + 1];

            const diag1 = (tl === "M" && br === "S") || (tl === "S" && br === "M");
            const diag2 = (tr === "M" && bl === "S") || (tr === "S" && bl === "M");

            if (!diag1 || !diag2) continue;

            console.log(x, y);

            matches++;
        }
    }

    return matches;
}
