'use strict'

let AccessRules = require('../../src/access-rules')

describe('Access-rules Class', () => {
  describe('.checkAccess', () => {
    it('Should not work if the action has invalid attributes', (done) => {
      // (() => Application.run(Action.create({schema: 'User', operation: Action.DELETE, body: () => null}))).should.throw(Error)
      return done()
    })
  })
})
