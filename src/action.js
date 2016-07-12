'use strict'

let ParamsFilter = require('./param-filter')
let Response = require('./response')
let ModelLoader = require('./model-loader')
let operationConstants = ['CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LIST']
let requiredAttributes = ['schema', 'operation', 'body']

let Action = function (config) {
  this.response = false
  for (var key in config) {
    this[key] = config[key]
    let required = requiredAttributes.indexOf(key)
    if (required !== -1) {
      requiredAttributes.splice(required, 1)
    }
  }
  if (requiredAttributes.length > 0 || operationConstants.indexOf(this.operation) === -1) {
    throw new Error('Invalid arguments')
  }
  this.execute = (identity, model) => {
    this.response = new Response(this.body(this, identity, model), this)
    return this
  }
  this.filterInput = () => ParamsFilter.filterInput(this)
  this.filterOutput = () => ParamsFilter.filterOutput(this)
  this.loadModel = () => ModelLoader.load(this)
}

module.exports = {
  create: (config) => new Action(config),
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  LIST: 'LIST'
}
