const tahoe = {
    type: "lake",
    name: "tahoe",
    state: "california"
}

const {name, state} = tahoe

const tahoeCity = {
    ...tahoe,
    type: "city"
}

console.log(tahoeCity.type, state)

