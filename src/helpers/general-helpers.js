import config from '../data/config.json'

export function regionRenderNameToValue(region) {
    // console.log("[regionRenderNameToValue] Searching for region...")
    // console.log(region)

    let val = ''
    Object.keys(config.regionToRegionRenderName).map( key => {
        // console.log(key)
        if(config.regionToRegionRenderName[key] === region)
            val = key
    })
    // console.log(val)
    return val
}

export function typeRenderNameToValue(type) {
    let val = ''
    Object.keys(config.typeToTypeRenderName).map( key => {
        if(config.typeToTypeRenderName[key] === type)
            val = key
    })
    return val
}

export function professionRenderNameToValue(profession) {
    let val = ''
    Object.keys(config.professionToProfessionRenderName).map( key => {
        if(config.professionToProfessionRenderName[key] === profession)
            val = key
    })
    return val
}

export function genderRenderNameToValue(gender) {
    let val = ''
    Object.keys(config.genderToGenderRenderName).map( key => {
        if(config.genderToGenderRenderName[key] === gender)
            val = key
    })
    return val
}

export function ageRangeRenderNameToValue(ageRange) {
    let val = ''
    Object.keys(config.ageRangeToAgeRangeRenderName).map( key => {
        if(config.ageRangeToAgeRangeRenderName[key] === ageRange)
            val = key
    })
    return val
}

export function experienceRenderNameToValue(experience) {
    let val = ''
    Object.keys(config.experienceToExperienceRenderName).map( key => {
        if(config.experienceToExperienceRenderName[key] === experience)
            val = key
    })
    return val
}


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
            key: keys[i],
            value: +values[i], // Cast to number with unary operator +
            name: labels[keys[i]],
        })
    }
    return data
}

export function createOptionsObjectFromArrays(values, labels) {
    let options = []
    for (let i = 0; i < values.length; i++) {
        options.push({
            value: values[i],
            label: labels[values[i]],
        })
    }
    return options
}

export function toPercentages(values, fixed = 2) {
    let data = []
    const sumReducer = (accumulator, curr) => accumulator + curr
    const sum = values.reduce(sumReducer)
    values.map(val => {
        data.push(((val * 100) / sum).toFixed(fixed))
    })
    return data
}

// Finds if the child object is contained in the parent object, if the
// child is found the key of the field is returned. If its
// not found false is returned.
// Parameters:
// - child <Object> object to find
// - parent <Object> object in which to search
export function findChildObject(child, parent) {
    const keys = Object.keys(parent)
    for (let i = 0; i < keys.length; i++) {
        if (JSON.stringify(parent[keys[i]]) === JSON.stringify(child))
            return keys[i]
    }
    return false
}

// Parameters:
// - cases <Object> object in which to search
// - region <String> value of the region field to be matched
export function filterCasesByRegion(cases, region) {
    let filteredCases = []
    cases.map(c => {
        if (c.region != '' && c.region === region) {
            filteredCases.push(c)
        }
    })
    return filteredCases
}
