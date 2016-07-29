'use strict'

const Action = require('../../src/action')
const UserModel = require('../mocks/user.model')

module.exports = Action.create({
  event: {
    body: {
      name: 'Luciano França'
    },
    headers: {
      apiKey: 'aHashedSecretKey'
    },
    pathParams: {},
    queryParams: {
      id: 'aHashedAccountId'
    },
    method: 'PUT',
    resourcePath: '/User',
    source: 'aws.apiGateway'
  },
  context: {
    success: () => 'context.succeed called',
    fail: (err) => err
  },
  model: UserModel,
  operation: Action.UPDATE,
  body: (action, identity, model) => model
})
