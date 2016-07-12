'use strict'

let Action = require('../../src/action')

describe('Action Class', () => {
  describe('#createAction', () => {
    it('Empty config should throw error', (done) => {
      (() => Action.create()).should.throw(Error)
      return done()
    })
    it('Missing schema (required argument) should throw error', (done) => {
      (() => Action.create({event: {}, context: {}, operation: '', body: () => null})).should.throw(Error)
      return done()
    })
    it('Invalid operation constant sent by user should throw error', (done) => {
      (() => Action.create({event: {}, context: {}, schema: '', operation: 'GIMME_MY_LAMB', body: () => null})).should.throw(Error)
      return done()
    })
    it('Valid default action should create an action', (done) => {
      (() => Action.create({event: {}, context: {}, schema: '', operation: 'UPDATE', body: () => null})).should.not.throw(Error)
      return done()
    })
    it('Action can have custom attributes', (done) => {
      let actualAction = Action.create({event: {}, context: {}, schema: '', operation: Action.UPDATE, body: () => null, description: 'Desc goes here'})
      actualAction.should.have.property('description', 'Desc goes here')
      return done()
    })
  })
})
