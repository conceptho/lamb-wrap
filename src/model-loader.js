'use strict'

/*
  This model is responsible for retrieving or creating an instance of the requested model.
*/

const Promise = require('bluebird')
const Action = require('./action')

const modelLoader = {}

modelLoader.load = (action, identity) => {
  // Grant that all methods into the required model are promisified
  let model = Promise.promisifyAll(action.model)
  // Retrieve an array of the requested itens
  if (action.operation === Action.LIST) {
    return model.findAllowed(identity)
  }
  // Retrieve a new instance of the required model
  if (action.operation === Action.CREATE) {
    return Promise.resolve(new model())
  }
  // Retrieve a single instance of a required model
  return action.event.queryParams.id ? model.findByIdAsync(action.event.queryParams.id) : model.findByIdAsync(action.event.pathParams.id)
}

module.exports = modelLoader
