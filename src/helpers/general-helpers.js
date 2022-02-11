export function capitalizeFirstLetter(word) {
    if (typeof word === 'string')
        return word.charAt(0).toUpperCase() + word.slice(1)
    else return ''
}

export function getRandomElement(elements) {
    return elements[Math.floor(Math.random() * elements.length)]
}

export function buildMapById(elements, idField = 'id') {
    return elements.reduce((map, currElement) => {
        const id = currElement[idField]
        map.set(id, currElement)
        return map
    }, new Map())
}

export function createDataObjectFromArrays(keys, values, labels) {
    let data = []
    for (let i = 0; i < keys.length; i++) {
        data.push({
            "key": keys[i],
            "value": +values[i], // Cast to number with unary operator +
            "name": labels[keys[i]]
        })
    }
    return data
}

export function toPercentages(values, fixed = 2) {
    let data = []
    const sumReducer = (accumulator, curr) => accumulator + curr;
    const sum = values.reduce(sumReducer);
    values.map(val => {data.push((val*100/sum).toFixed(fixed))})
    return data
}
