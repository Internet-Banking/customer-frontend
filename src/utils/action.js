
// Create an action
export const create = (type, payload) => {
  const action = {type, payload}
  if (payload instanceof Error) {
    action.error = true
  }
  return action
}

// Merge action types and phases
export function merge(types, phases) {
  return [].concat(...types.map((type) => {
    return [type].concat(phases.map((phase) => `${type}_${phase}`))
  }))
}

// Convert array of string to object
export function arrayToObject(arr) {
  return arr.reduce((obj, key) => {
    obj[key] = null
    return obj
  }, {})
}
