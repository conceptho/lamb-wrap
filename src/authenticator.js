'use strict'

/*
  This module is responsible for resolving the JWT then execute the provided getIdentity method and then return the retrieved user.
*/

const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))

const authenticator = {}

authenticator.getIdentity = (action, identity) => {
  // Check if there's a provided Auth attribute.
  if (action.event.headers.Authorization) {
    // Resolve the JWT payload and execute the provided getIdentity method.
    return jwt.verifyAsync(action.event.headers.Authorization.replace('Bearer ', ''), identity.jwtSecret)
      .then((payload) => {
        return identity.model.getIdentity(payload)
      })
      .catch((err) => {
        throw action.context.fail(err)
      })
  }
  return Promise.resolve(null)
}

module.exports = authenticator
