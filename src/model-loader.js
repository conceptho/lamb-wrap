'use strict'

const Promise = require('bluebird')
const Action = require('./action')

const modelLoader = {}

modelLoader.load = (action, identity) => {
  let model = Promise.promisifyAll(action.model)
  if (action.operation === Action.LIST) {
    return model.findAllowed(identity)
  }
  if (action.operation === Action.CREATE) {
    return Promise.resolve(new model())
  }
  return action.event.queryParams.id ? model.findByIdAsync(action.event.queryParams.id) : model.findByIdAsync(action.event.pathParams.id)
}

module.exports = modelLoader
