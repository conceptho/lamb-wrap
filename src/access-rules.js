'use strict'

/*
  Module responsible for resolving the availability of the requested operation.
*/
const Promise = require('bluebird')
const accessRules = {}


accessRules.checkAccess = (identity, model, action) => {
  let operation = false
  // Check if there's a valid operation.
  try {
    operation = action.model.accessRules(identity, model)[action.operation]
  } catch (e) {
    action.context.fail('Operation ' + action.operation + ' not defined at model.accessRules')
  }
  // Resolve operations permission.
  if (typeof operation === 'function') {
    operation = operation(identity, model)
  }
  if (typeof operation.then === 'function') {
    return operation
      .then((res) => {
        if (!res) {
          action.context.fail(res)
        }
        return res
      })
      .catch((err) => action.context.fail(err))
  }
  if (!operation) {
    action.context.fail('Operation ' + action.operation + ' not allowed in this model')
  }
  return Promise.resolve(operation)
}

module.exports = accessRules
