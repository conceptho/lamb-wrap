'use strict'

let Action = require('../../src/action')

describe('Action Class', () => {
  describe('#createAction', () => {
    it('Empty config should throw error', (done) => {
      (() => new Action()).should.throw(Error)
      return done()
    })
  })
})
