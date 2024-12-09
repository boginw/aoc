function day3part1() {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    const text = document.querySelector("pre").innerText

    return [...text.matchAll(regex)]
        .map(([, v1, v2]) => +v1 * +v2)
        .reduce((a, b) => a + b)
}

function day3part2() {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    const text = document.querySelector("pre").innerText
    return text.split("do()")
        .map(it => it.split("don't()")[0])
        .flatMap(it => [...it.matchAll(regex)])
        .map(([, a, b]) => +a * +b)
        .reduce((a, b) => a + b)
}
