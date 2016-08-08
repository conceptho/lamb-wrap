'use strict'

const Promise = require('bluebird')
const ParamsFilter = require('./param-filter')
const Response = require('./response')
const operationConstants = ['CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LIST']
const requiredAttributes = ['model', 'operation', 'body']

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
    try {
      if (typeof this.body(this, identity, model).then === 'function') {
        return this.body(this, identity, model)
          .then((data) => {
            this.response = new Response(data, this)
            return this
          })
      }
      this.response = new Response(this.body(this, identity, model), this)
      return Promise.resolve(this)
    } catch (err) {
      return Promise.reject(err)
    }
  }
  this.filterInput = (identity, model) => ParamsFilter.filterInput(identity, model, this)
  this.filterOutput = (identity, model) => ParamsFilter.filterOutput(identity, model, this)
}

module.exports = {
  create: (config) => new Action(config),
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  LIST: 'LIST'
}
