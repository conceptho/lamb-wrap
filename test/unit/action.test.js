'use strict'

const Action = require('../../src/action')
const SampleAction = require('../mocks/action.sample')
const sampleIdentity = require('../mocks/identity.sample')
const sampleModel = require('../mocks/user.model')

describe('Action Class', () => {
  describe('.create', () => {
    it('Empty config should throw error', (done) => {
      (() => Action.create()).should.throw(Error)
      return done()
    })
    it('Missing model (required argument) should throw error', (done) => {
      (() => Action.create({operation: '', body: () => null})).should.throw(Error)
      return done()
    })
    it('Invalid operation constant sent by user should throw error', (done) => {
      (() => Action.create({model: '', operation: 'GIMME_MY_LAMB', body: () => null})).should.throw(Error)
      return done()
    })
    it('Valid default action should create an action', (done) => {
      (() => Action.create({model: '', operation: Action.DELETE, body: () => null})).should.not.throw(Error)
      return done()
    })
    it('Action can have custom attributes', (done) => {
      const actualAction = Action.create({model: '', operation: Action.UPDATE, body: () => null, description: 'Desc goes here'})
      actualAction.should.have.property('description', 'Desc goes here')
      return done()
    })
  })
  describe('.execute', () => {
    it('Should work for a simple body function', (done) => {
      let sampleAction = SampleAction()
      return sampleAction.execute(sampleIdentity, sampleModel)
        .then((data) => {
          data.response.should.not.be.eql(false)
          return done()
        })
    })
    it('Should work for a body promise', (done) => {
      let sampleAction = SampleAction()
      sampleAction.body = function (action, identity, model) {
        return Promise.all([])
          .then(() => {
            return model
          })
      }
      return sampleAction.execute(sampleIdentity, sampleModel)
        .then((data) => {
          data.response.should.not.be.eql(false)
          return done()
        })
    })
    it('Should not work when body is provided as an simple attribute', (done) => {
      let sampleAction = SampleAction()
      sampleAction.body = 'invalidBody'
      return sampleAction.execute(sampleIdentity, sampleModel)
        .catch((err) => {
          err.should.not.be.eql(null)
          return done()
        })
    })
  })
})
