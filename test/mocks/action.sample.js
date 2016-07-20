'use strict'

const Action = require('../../src/action')
const UserSchema = require('../mocks/user.schema')

module.exports = Action.create({
  event: {
    body: {
      name: 'Luciano França'
    },
    headers: {
      secretKey: 'aHashedSecretKey'
    },
    pathParams: {},
    queryParams: {
      account_id: 'aHashedAccountId'
    },
    method: 'PUT',
    resourcePath: '/User',
    source: 'aws.apiGateway'
  },
  context: {
    success: () => 'context.succeed called',
    fail: (err) => err
  },
  schema: UserSchema,
  operation: Action.UPDATE,
  body: () => null
})
