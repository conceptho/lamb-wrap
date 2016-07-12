'use strict'

let Authenticator = require('./authenticator')
let AccessRules = require('./access-rules')

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
  let model = action.loadModel()
  AccessRules.checkAccess(identity, action)
  return action
    .filterInput()
    .execute(identity, model)
    .filterOutput()
    .send()
}

module.exports = application
