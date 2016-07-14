'use strict'
let accessRules = {}

accessRules.checkAccess = (identity, model, action) => {
  let operation = false
  try {
    operation = action.schema.accessRules(identity, model)[action.operation]
  } catch (e) {
    throw new Error('Operation not defined at schema.accessRules')
  }
  if (typeof operation === 'function') {
    operation = operation(identity, model)
  }
  if (Promise.resolve(operation) === operation) {
    return operation
  }
  if (!operation) {
    throw new Error('Operation not allowed in this model')
  }
  return
}

module.exports = accessRules
