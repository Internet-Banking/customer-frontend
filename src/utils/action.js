
// Create an action
const create = (type, payload) => {
  const action = {type, payload}
  if (payload instanceof Error) {
    action.error = true
  }
  return action
}

// Merge action types and phases
const merge = (types, phases) => {
  return [].concat(...types.map((type) => {
    return [type].concat(phases.map((phase) => `${type}_${phase}`))
  }))
}

// Convert array of string to object
const arrayToObject = (arr) => {
  return arr.reduce((obj, key) => {
    obj[key] = null
    return obj
  }, {})
}

export default {create, merge, arrayToObject}
