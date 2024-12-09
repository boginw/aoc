function day1part1() {
    var [a, b] = document.querySelector("pre").innerText
        .slice(0, -1) // remove last \n
        .split("\n")
        .map(it => it.split("   "))
        .map(it => [+it[0], +it[1]])
        .reduce((prev, curr) => {
            prev[0].push(curr[0])
            prev[1].push(curr[1])
            return prev
        }, [[], []])

    a.sort()
    b.sort()

    return Math.abs(a.map((_, idx) => Math.abs(a[idx] - b[idx])).reduce((a, b) => a + b))
}

function day1part2() {
    var [a, b] = document.querySelector("pre").innerText
        .slice(0, -1) // remove last \n
        .split("\n")
        .map(it => it.split("   "))
        .map(it => [+it[0], +it[1]])

    var occurrences = []
    b.forEach(it => {
        if (occurrences[it] == null) occurrences[it] = 1
        else occurrences[it] += 1
    })
    a.map(it => it * (occurrences[it] ?? 0)).reduce((a, b) => a + b)

    return a.map(it => it * (occurrences[it] ?? 0)).reduce((a, b) => a + b)
}
