'use strict'

let Authenticator = require('./authenticator')
let AccessRules = require('./access-rules')
let ModelLoader = require('./model-loader')

let application = {}

application.handler = (action) => {
  if (!action) {
    throw new Error('Invalid action as input')
  }
  return (event, context) => {
    action.event = event
    action.context = context
    return application.run(action)
  }
}

application.run = (action) => {
  let identity = Authenticator.getIdentity(action)
  let model = ModelLoader.load(action)
  AccessRules.checkAccess(identity, model, action)
  return action
    .filterInput()
    .execute(identity, model)
    .filterOutput()
    .send()
}

module.exports = application
