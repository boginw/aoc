function day11part1(maxDepth = 25) {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const stones = text.split(" ").map(it => +it)
    const cache = [...new Array(maxDepth + 1)].map(() => ({}))

    function maybeStore(input, depth = 0) {
        const hit = cache[depth][input]
        if (hit != null) return hit

        const result = calculate(input, depth)
        const inputLength = Math.floor(Math.log10(input) + 1)

        if (inputLength < 5)
            cache[depth][input] = result

        return result
    }

    function calculate(input, depth = 0) {
        if (depth === maxDepth)
            return 1

        const nextDepth = depth + 1

        if (input === 0)
            return maybeStore(1, nextDepth)

        let length = 0

        if ((length = Math.floor(Math.log10(input) + 1)) % 2 === 0) {
            const inputStr = input.toString()
            const part1 = +inputStr.slice(0, length / 2)
            const part2 = +inputStr.slice(length / 2, length)

            return maybeStore(part1, nextDepth) + maybeStore(part2, nextDepth)
        }

        return maybeStore(input * 2024, nextDepth)
    }

    let sum = 0

    for (let i = 0; i < stones.length; i++) {
        console.log(`${i}: ${stones[i]}`)
        sum += calculate(stones[i])
    }

    return sum
}

function day11part2() {
    return day11part1(75)
}
