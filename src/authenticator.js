'use strict'

const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))

const authenticator = {}

authenticator.getIdentity = (action, identity) => {
  if (action.event.headers.Authorization) {
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
