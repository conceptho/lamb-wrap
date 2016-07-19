'use strict'

const Action = require('../../src/action')
const Application = require('../../src/application')
const UserSchema = require('../mocks/user.schema')

describe('Application Class', () => {
  describe('.run', () => {
    it('Should not work if the action has invalid attributes', (done) => {
      (() => Application.run(Action.create({schema: 'User', operation: Action.DELETE, body: () => null}))).should.throw(Error)
      return done()
    })
    // Not working yet because the application is not fully implemented
    // it('Should work when runing with a valid action', (done) => {
    //   (() => Application.run(Action.create({event: {}, context: {success: () => null}, schema: 'User', operation: Action.DELETE, body: () => null}))).should.not.throw(Error)
    //   return done()
    // })
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
