'use strict'

const AccessRules = require('../../src/access-rules')
const Action = require('../../src/action')
const UserModel = require('../mocks/user.model')

describe('Access-rules Class', () => {
  describe('.checkAccess', () => {
    it('Should not work if the operation is false', (done) => {
      (() => AccessRules.checkAccess(new UserModel(), new UserModel(), {model: UserModel, operation: Action.DELETE})).should.throw(Error)
      return done()
    })
    it('Should work if the operation is true', (done) => {
      (() => AccessRules.checkAccess(new UserModel(), new UserModel(), {model: UserModel, operation: Action.CREATE})).should.not.be.false()
      return done()
    })
    it('Should work if the operation is a function that returns true', (done) => {
      (() => AccessRules.checkAccess(new UserModel(), new UserModel(), {model: UserModel, operation: Action.UPDATE})).should.not.be.false()
      return done()
    })
    it('Should not work if the operation is not defined in the model', (done) => {
      (() => AccessRules.checkAccess(new UserModel(), new UserModel(), {model: UserModel, operation: 'SOMESORTOFOPERATION'})).should.throw(Error)
      return done()
    })
    it('Should work if the operation is a valid promise', (done) => {
      AccessRules.checkAccess(new UserModel(), new UserModel(), {context: {fail: (err) => err}, model: UserModel, operation: Action.VIEW})
      .then((res) => {
        res.should.be.eql(true)
      })
      .then(done)
      .catch(done)
    })
    it('Should not work if the operation is a valid promise with false result', (done) => {
      AccessRules.checkAccess(new UserModel(), new UserModel(), {context: {fail: (err) => err}, model: UserModel, operation: Action.LIST})
      .then((res) => {
        res.should.be.eql(false)
      })
      .then(done)
      .catch(done)
    })
  })
})
