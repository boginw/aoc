function day17part1() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const [registerText, programText] = text.split("\n\n")

    const program = programText.split(": ")[1].split(",").map(it => +it)
    const registerEntries = registerText.matchAll(/Register (\w): (\d+)/gm).toArray()
    const registers = Object.fromEntries(registerEntries.map(it => [it[1], BigInt(it[2])]))
    registers.P = 0 // program counter

    return day17execute(program, registers).join(",")
}

function day17part2() {
    const text = document.querySelector("pre").innerText.slice(0, -1)
    const [registerText, programText] = text.split("\n\n")

    const program = programText.split(": ")[1].split(",").map(it => +it)
    const registerEntries = registerText.matchAll(/Register (\w): (\d+)/gm).toArray()
    const originalRegisters = Object.fromEntries(registerEntries.map(it => [it[1], BigInt(it[2])]))
    originalRegisters.P = 0 // program counter

    function search(current, position) {
        let minResult = Number.MAX_VALUE

        for (let i = 0; i < 8; i++) {
            const next = (current << 3n) + BigInt(i)

            if (next > minResult) break

            const result = day17execute(program, { ...originalRegisters, A: next })

            if (!program.join("").endsWith(result.join("")))
                continue

            if (position === program.length - 1) return next

            const it = search(next, position + 1)
            if (it < minResult) minResult = it
        }

        return minResult
    }

    return search(0n, 0)
}

function day17execute(program, registers) {
    const stdout = []

    while (registers.P >= 0 && registers.P < program.length) {
        if (registers.P >= program.length)
            break

        const instruction = program[registers.P]
        const input = BigInt(program[registers.P + 1])
        const combo = input <= 3n ? input : input === 4n ? registers.A : input === 5n ? registers.B : registers.C

        // inline instructions to speed up by not putting stuff on the stack
        switch (instruction) {
            case 0: registers.A = registers.A >> combo; break;
            case 1: registers.B ^= input; break;
            case 2: registers.B = combo & 0b111n; break;
            case 3: if (registers.A !== 0n) registers.P = Number(input) - 2; break;
            case 4: registers.B ^= registers.C; break;
            case 5: stdout.push(Number(combo & 0b111n)); break;
            case 6: registers.B = registers.A >> combo; break;
            case 7: registers.C = registers.A >> combo; break;
        }

        registers.P += 2
    }

    return stdout
}
