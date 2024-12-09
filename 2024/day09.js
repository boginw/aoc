function day9part1() {
    const text = document.querySelector("pre").innerHTML.slice(0, -1);

    const denseDiskMap = text.split("").map((it) => +it);
    const diskMap = denseDiskMap.flatMap((numOfBlocks, idx) => {
        const blocks = [...new Array(numOfBlocks)];

        if (idx % 2 === 0) {
            // file
            return blocks.map(() => ({ id: idx / 2, file: true }));
        } else {
            // free space
            return blocks.map(() => ({ file: false }));
        }
    });

    let firstFreeSpace;

    while ((firstFreeSpace = diskMap.findIndex((it) => !it.file)) !== -1) {
        // remove all free space at the end
        while (diskMap.at(-1)?.file === false) diskMap.pop()

        const lastFileBlock = diskMap.pop();
        diskMap.splice(firstFreeSpace, 1, lastFileBlock)

        // remove all free space at the end
        while (diskMap.at(-1)?.file === false) diskMap.pop()
    }

    return diskMap.map((it, idx) => it.id * idx).reduce((a, b) => a + b);
}

function day9part2() {
    const text = document.querySelector("pre").innerHTML.slice(0, -1);

    const denseDiskMap = text.split("").map((it) => +it);
    const diskMap = denseDiskMap.map((size, idx) => {
        if (idx % 2 === 0) {
            // file
            return ({ id: idx / 2, file: true, size });
        } else {
            // free space
            return ({ file: false, size });
        }
    });

    for (let i = diskMap.length - 1; i >= 0; i--) {
        if (!diskMap[i].file) continue

        for (let j = 0; j < diskMap.length; j++) {

            if (j === i) break
            if (diskMap[j].file) continue
            if (diskMap[j].size < diskMap[i].size) continue

            diskMap[j].size -= diskMap[i].size
            diskMap.splice(i, 1, { file: false, size: diskMap[i].size })
            diskMap.splice(j, 0, diskMap[i]) // insert file
            break
        }
    }

    return diskMap.filter(it => it.size > 0)
        .flatMap(it => [...new Array(it.size)].map(() => it.id))
        .map((it, idx) => (it ?? 0) * idx).reduce((a, b) => a + b);
}
