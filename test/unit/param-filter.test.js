'use strict'

const sampleIdentity = require('../mocks/identity.sample')
const ParamFilter = require('../../src/param-filter')

describe('Param-filter Class', () => {
  describe('.filterInput', () => {
    it('Should work when runing with a valid action with a valid indentity', (done) => {
      let sampleAction = require('../mocks/action.sample')
      return ParamFilter.filterInput(sampleIdentity, sampleAction)
        .then((data) => {
          data.event.body.should.have.property('name')
          data.event.headers.should.have.property('secretKey')
          data.event.queryParams.should.not.have.property('account_id')
          return done()
        })
    })
    it('Should work when runing without params', (done) => {
      let sampleAction = require('../mocks/action.sample')
      delete sampleAction.event.body.name
      delete sampleAction.event.headers.secretKey
      delete sampleAction.event.queryParams.account_id
      return ParamFilter.filterInput(sampleIdentity, sampleAction)
        .then((data) => {
          return done()
        })
    })
  })
})
