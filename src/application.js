'use strict'

const Authenticator = require('./authenticator')
const AccessRules = require('./access-rules')
const ModelLoader = require('./model-loader')

const application = {}

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
  return Authenticator.getIdentity(action)
    .then((identity) => {
      return Promise.all([ModelLoader.load(action), identity])
    })
    .then((data) => {
      let model = data[0]
      let identity = data[1]
      return Promise.all([AccessRules.checkAccess(identity, model, action), identity, model])
    })
    .then((data) => {
      let identity = data[1]
      let model = data[2]
      return action
        .filterInput(identity)
        .execute(identity, model)
        .filterOutput(identity)
        .send()
    })
    .catch((err) => {
      action.context.fail(err)
    })
}

module.exports = application
