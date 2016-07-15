'use strict'

const Action = require('../../src/action')
const UserSchema = require('../mocks/user.schema')

module.exports = Action.create({
  event: {
    auth: {},
    payload: {
      name: 'Luciano França'
    }
  },
  context: {
    success: () => 'context.succeed called',
    fail: (err) => err
  },
  schema: UserSchema,
  operation: Action.UPDATE,
  body: () => null
})
