'use strict'

const Action = require('../../src/action')
const Application = require('../../src/application')
const UserSchema = require('../mocks/user.schema')

describe('Application Class', () => {
  describe('.run', () => {
    it('Should not work if the action has invalid attributes', (done) => {
      return Application.run(Action.create({schema: 'User', operation: Action.DELETE, body: () => null}))
        .then()
        .catch((err) => {
          return done()
        })
    })
    it('Should work when runing with a valid action', (done) => {
      return Application.run(Action.create({
        event: {
          body: {},
          headers: {},
          pathParams: {},
          queryParams: {}
        },
        context: {
          success: () => null,
          fail: (err) => console.log(err)
        },
        schema: UserSchema,
        operation: Action.CREATE,
        body: () => null
      }))
        .then((data) => {
          return done()
        })
    })
  })
  describe('.handler', () => {
    it('Should not work if there are problems at action creation', (done) => {
      (() => Application.handler(Action.create())).should.throw(Error)
      return done()
    })
    it('Should not work if there is no action as input', (done) => {
      (() => Application.handler()).should.throw(Error)
      return done()
    })
    it('Should be valid for a valid action', (done) => {
      const handler = Application.handler(Action.create({schema: UserSchema, operation: Action.DELETE, body: () => null}))
      ;(typeof handler).should.be.eql('function')
      return done()
    })
  })
})
