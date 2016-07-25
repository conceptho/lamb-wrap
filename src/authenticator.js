'use strict'

const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))

const authenticator = {}

authenticator.getIdentity = (action, identity) => {
  if (action.event.headers.jwtToken) {
    return jwt.verifyAsync(action.event.headers.jwtToken, identity.jwtSecret)
      .then((payload) => {
        return identity.schema.getIdentityByJwtToken(payload)
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
  if (action.event.headers.apiKey) {
    return identity.schema.getIdentityByApiToken(action.event.headers.apiKey)
  }
  action.context.fail('No credentials found')
}

module.exports = authenticator
