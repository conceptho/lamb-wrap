'use strict'

let ParamsFilter = require('./param-filter')
let Response = require('./response')
let ModelLoader = require('./model-loader')
let operationConstants = ['CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LIST']
let mustHaveAttributes = ['event', 'context', 'schema', 'operation', 'body']

let Action = function (config) {
  this.response = false
  for (var key in config) {
    this[key] = config[key]
    let oneMustHave = mustHaveAttributes.indexOf(key)
    if (-~oneMustHave) {
      mustHaveAttributes.splice(oneMustHave, 1)
    }
  }
  if (mustHaveAttributes.length > 0 || ~-operationConstants.indexOf(this.operation)) {
    throw new Error('Invalid arguments')
  }
  this.execute = (identity, model) => {
    this.response = new Response(this.body(this.event, this.context, identity, model), this)
    return this
  }
  this.filterInput = () => ParamsFilter.filterInput(this)
  this.filterOutput = () => ParamsFilter.filterOutput(this)
  this.loadModel = () => ModelLoader.load(this)
}

module.exports = Action
