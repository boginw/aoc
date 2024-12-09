
function day5part1() {
    let [rulesText, updatesText] = document
        .querySelector("pre")
        .innerHTML.slice(0, -1)
        .split("\n\n");

    rules = rulesText
        .split("\n")
        .map((it) => it.split("|"))
        .reduce((map, [i, o]) => {
            map[i] ??= [];
            map[i].push(o);
            return map;
        }, {});
    updates = updatesText.split("\n").map((it) => it.split(","));

    let acc = 0;

    for (let update of updates) {
        let failed = false;

        for (let i = 0; i < update.length - 1; i++) {
            const el = update[i];

            for (let j = i + 1; j < update.length; j++) {
                const next = update[j];

                if (rules[next].indexOf(el) !== -1) {
                    console.log({ [next]: rules[next] }, el);
                    failed = true;
                    break;
                }

                if (rules[el].indexOf(next) !== -1) {
                    // break
                }
            }

            if (failed) break;
        }

        if (failed) continue;

        acc += +update[Math.floor(update.length / 2)];
    }

    console.log(acc);
}

function day5part2() {
    let [rulesText, updatesText] = document
        .querySelector("pre")
        .innerHTML.slice(0, -1)
        .split("\n\n");

    rules = rulesText
        .split("\n")
        .map((it) => it.split("|"))
        .reduce((map, [i, o]) => {
            map[i] ??= [];
            map[i].push(o);
            return map;
        }, {});
    updates = updatesText.split("\n").map((it) => it.split(","));

    let acc = 0;

    for (let update of updates) {
        const newUpdate = update.toSorted((a, b) =>
            rules[a].indexOf(b) !== -1 ? -1 : rules[b].indexOf(a) ? 1 : 0
        );

        for (let i = 0; i < update.length; i++) {
            if (update[i] === newUpdate[i]) continue;

            console.log(update, newUpdate);
            acc += +newUpdate[Math.floor(newUpdate.length / 2)];
            break
        }
    }

    return acc;
}
