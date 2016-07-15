'use strict'

const ParamsFilter = require('./param-filter')
const Response = require('./response')
const operationConstants = ['CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LIST']
const requiredAttributes = ['schema', 'operation', 'body']

const Action = function (config) {
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
}

module.exports = {
  create: (config) => new Action(config),
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  LIST: 'LIST'
}
