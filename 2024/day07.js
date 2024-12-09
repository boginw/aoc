
function day7part1() {
    const text = document.querySelector("pre").innerText

    const equations = text.slice(0, -1).split("\n")
        .map(it => it.split(": "))
        .map(([result, equation]) => ({ result: +(result), equation: equation.split(" ").map(it => +(it)) }))

    const operatorImpls = {
        "+": (a, b) => a + b,
        "*": (a, b) => a * b,
        "|": (a, b) => +(a.toString() + b.toString())
    }

    function eval(equation, operators, fallback = "+") {
        let result = equation[0]

        for (let i = 1; i < equation.length; i++) {
            const impl = operatorImpls[operators[i - 1] ?? fallback]
            result = impl(result, equation[i])
        }

        return result
    }

    const solvable = []

    for (let { result, equation } of equations) {
        let opNum = -1
        let ops = ""

        while (opNum < Math.pow(2, equation.length) - 1) {
            opNum++
            ops = opNum.toString(2).replaceAll("0", "+").replaceAll("1", "*").split("").reverse()

            if (result === eval(equation, ops)) {
                solvable.push({ result, equation, ops })
                console.log("Solved", result)
                break
            }
        }
    }

    return solvable.map(it => it.result).reduce((a, b) => a + b)
}

function day7part2() {
    const text = document.querySelector("pre").innerText

    const equations = text.slice(0, -1).split("\n")
        .map(it => it.split(": "))
        .map(([result, equation]) => ({ result: +(result), equation: equation.split(" ").map(it => +(it)) }))

    const operatorImpls = {
        "+": (a, b) => a + b,
        "*": (a, b) => a * b,
        "|": (a, b) => Math.pow(10, Math.floor(Math.log10(a, 10)) + 1) * a + b
    }

    function eval(equation, operators, fallback = "+") {
        let result = equation[0]

        for (let i = 1; i < equation.length; i++) {
            const impl = operatorImpls[operators[i - 1] ?? fallback]
            result = impl(result, equation[i])
        }

        return result
    }

    const solvable = []

    for (let { result, equation } of equations) {
        let opNum = -1
        let ops = ""

        while (opNum < Math.pow(3, equation.length) - 1) {
            opNum++
            ops = opNum.toString(3).replaceAll("0", "+").replaceAll("1", "*").replaceAll("2", "|").split("").reverse()

            if (result === eval(equation, ops)) {
                solvable.push({ result, equation, ops })
                console.log("Solved", result)
                break
            }
        }
    }

    return solvable.map(it => it.result).reduce((a, b) => a + b)
}
