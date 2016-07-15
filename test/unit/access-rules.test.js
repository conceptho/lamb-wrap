'use strict'

let AccessRules = require('../../src/access-rules')
let Action = require('../../src/action')
let User = require('../mocks/user.schema')

describe('Access-rules Class', () => {
  describe('.checkAccess', () => {
    it('Should not work if the operation is false', (done) => {
      (() => AccessRules.checkAccess({}, {}, {schema: User, operation: Action.DELETE})).should.throw(Error)
      return done()
    })
    it('Should work if the operation is true', (done) => {
      (() => AccessRules.checkAccess({}, {}, {schema: User, operation: Action.CREATE})).should.not.be.false()
      return done()
    })
    it('Should work if the operation is a function that returns true', (done) => {
      (() => AccessRules.checkAccess({}, {}, {schema: User, operation: Action.UPDATE})).should.not.be.false()
      return done()
    })
    it('Should not work if the operation is not defined in the schema', (done) => {
      (() => AccessRules.checkAccess({}, {}, {schema: User, operation: 'SOMESORTOFOPERATION'})).should.throw(Error)
      return done()
    })
    it('Should work if the operation is a valid promise', (done) => {
      return AccessRules.checkAccess({}, {}, {context: {fail: (err) => err}, schema: User, operation: Action.VIEW})
      .then((res) => {
        res.should.be.eql(true)
      })
      .then(done)
      .catch(done)
    })
    it('Should not work if the operation is a valid promise with false result', (done) => {
      return AccessRules.checkAccess({}, {}, {context: {fail: (err) => err}, schema: User, operation: Action.LIST})
      .then((res) => {
        res.should.be.eql(false)
      })
      .then(done)
      .catch(done)
    })
  })
})
