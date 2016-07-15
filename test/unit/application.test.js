'use strict'

let Action = require('../../src/action')
let Application = require('../../src/application')
let UserSchema = require('../mocks/user.schema')

describe('Application Class', () => {
  describe('.run', () => {
    it('Should work when runing with a valid action', (done) => {
      (() => Application.run(Action.create({event: {}, context: {success: () => null, fail: (err) => err}, schema: UserSchema, operation: Action.CREATE, body: () => null}))).should.not.throw(Error)
      return done()
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
      let handler = Application.handler(Action.create({schema: UserSchema, operation: Action.DELETE, body: () => null}))
      ;(typeof handler).should.be.eql('function')
      return done()
    })
  })
})
