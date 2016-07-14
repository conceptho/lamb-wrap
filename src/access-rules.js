'use strict'
let accessRules = {}

accessRules.checkAccess = (identity, model, action) => {
  let operation = false
  try {
    operation = action.schema.accessRules(identity, model)[action.operation]
  } catch (e) {
    throw new Error('Operation ' + action.operation + ' not defined at schema.accessRules')
  }
  if (typeof operation === 'function') {
    operation = operation(identity, model)
  }
  if (!operation) {
    throw new Error('Operation ' + action.operation + ' not allowed in this model')
  }
  return
}

module.exports = accessRules
