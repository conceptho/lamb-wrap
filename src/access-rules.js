'use strict'
let accessRules = {}

accessRules.checkAccess = (identity, model, action) => {
  let operation = false
  try {
    operation = action.schema.accessRules(identity, model)[action.operation]
  } catch (e) {
    action.context.fail('Operation not defined at schema.accessRules')
  }
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
    action.context.fail('Operation not allowed in this model')
  }
  return operation
}

module.exports = accessRules
