'use strict'

/*
  Module responsible for creating an application object that setup a lambda as a return for the application.handler method.
*/

const Authenticator = require('./authenticator')
const AccessRules = require('./access-rules')
const ModelLoader = require('./model-loader')
const Promise = require('bluebird')

// Constructor of an Application object
const Application = function (config) {
  // Config an identity setup so it can be requested later.
  this.identity = {}
  this.identity.model = config.identityModel
  if (config.jwtSecret) {
    this.identity.jwtSecret = config.jwtSecret
  }
  // Function that returns a handler function to be executed by AWS lambda server.
  this.handler = (action) => {
    if (!action) {
      throw new Error('Invalid action as input')
    }
    return (event, context) => {
      action.event = event
      action.context = context
      return this.run(action)
    }
  }
  /*
    Function that handle's the lamb-wrap cycle
    1 - Get the user's identity.
    2 - Retrieve the requested model or create a new instance of it.
    3 - Check if the requested operation is allowed at the target model.
    4 - Filter input attributes at event, following a set of restrictions defined into model.
    5 - Execute a provided function.
    6 - Filter the output attributes at the response, following a set of restrictions defined into model.
    7 - Send the response as a JSON to the user.
  */
  this.run = (action) => {
    return Authenticator.getIdentity(action, this.identity)
      .then((identity) => {
        return Promise.props({
          model: ModelLoader.load(action, identity),
          identity: identity
        })
      })
      .then((data) => {
        return Promise.props({
          accessRules: AccessRules.checkAccess(data.identity, data.model, action),
          identity: data.identity,
          model: data.model
        })
      })
      .then((data) => {
        return Promise.props({
          accessRules: data.accessRules,
          identity: data.identity,
          model: data.model,
          action: action.filterInput(data.identity, data.model)
        })
      })
      .then((data) => {
        return Promise.props({
          accessRules: data.accessRules,
          identity: data.identity,
          model: data.model,
          action: data.action.execute(data.identity, data.model)
        })
      })
      .then((data) => {
        return Promise.props({
          accessRules: data.accessRules,
          identity: data.identity,
          model: data.model,
          action: data.action.filterOutput(data.identity, data.model)
        })
      })
      .then((data) => {
        return data.action.response.send()
      })
      .catch((err) => {
        action.context.fail(err)
      })
  }
}
// Exports a function that returns a ready to use instance of application.
module.exports = {
  create: (config) => new Application(config)
}
