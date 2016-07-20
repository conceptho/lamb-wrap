'use strict'

const sampleIdentity = require('../mocks/identity.sample')
const ParamFilter = require('../../src/param-filter')
const sampleAction = require('../mocks/action.sample')

describe('Param-filter Class', () => {
  describe('.filterInput', () => {
    it('Should work when runing with a valid action with a valid indentity', (done) => {
      return ParamFilter.filterInput(sampleIdentity, sampleAction)
        .then((data) => {
          return done()
        })
    })
  })
})
