
function day2part1() {
    return document.querySelector("pre").innerHTML
        .slice(0, -1)
        .split("\n")
        .map(it => it.split(" "))
        .map(it => it.map(num => +num))
        .filter(it => {
            let anyIncreasing = false
            let anyDecreasing = false

            for (let i = 1; i < it.length; i++) {
                anyIncreasing = anyIncreasing || it[i] > it[i - 1]
                anyDecreasing = anyDecreasing || it[i] < it[i - 1]

                if (anyIncreasing && anyDecreasing) return false

                const diff = Math.abs(it[i] - it[i - 1])

                if (diff < 1 || diff > 3) return false
            }

            return true
        }).length
}

function day2part2() {

    function isSafe(it) {
        let anyIncreasing = false
        let anyDecreasing = false

        for (let i = 1; i < it.length; i++) {
            anyIncreasing = anyIncreasing || it[i] > it[i - 1]
            anyDecreasing = anyDecreasing || it[i] < it[i - 1]

            if (anyIncreasing && anyDecreasing) return false

            const diff = Math.abs(it[i] - it[i - 1])

            if (diff < 1 || diff > 3) return false
        }

        return true
    }

    return document.querySelector("pre").innerHTML
        .slice(0, -1)
        .split("\n")
        .map(it => it.split(" "))
        .map(it => it.map(num => +num))
        .filter(it => {
            if (isSafe(it)) return true

            for (let i = 0; i < it.length; i++) {
                const arr = it.slice()
                arr.splice(i, 1)
                if (isSafe(arr)) return true
            }

            return false
        }).length
}
