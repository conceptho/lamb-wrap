'use strict'

const Authenticator = require('../../src/authenticator')
const sampleAction = require('../mocks/action.sample')()
const UserModel = require('../mocks/user.model')

const configIdentity = {
  model: UserModel,
  jwtSecret: 'aHashedSecret'
}

describe('Authenticator Class', () => {
  describe('.getIdentity', () => {
    it('Should work when runing with a valid JwtToken', (done) => {
      let customEvent = {
        event: {
          body: { name: 'Luciano Franças' },
          headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RUb2tlbiI6InNvbWVIYXNoZWRUb2tlbiJ9.2Ui-OuRnnLCS585qUW7zKgRD1CzfK8ZCq5R3uf6iSPo' },
          pathParams: {},
          queryParams: { id: 'aHashedAccountId' },
          method: 'PUT',
          resourcePath: '/User',
          source: 'aws.apiGateway'
        }
      }
      Authenticator.getIdentity(Object.assign({}, sampleAction, customEvent), configIdentity)
        .then((identity) => {
          identity.jwtToken.should.be.eql('someHashedToken')
          return done()
        })
    })
    it('Should not work when runing with a invalid JwtToken', (done) => {
      let customEvent = {
        event: {
          body: { name: 'Luciano Franças' },
          headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RUb2tlbiI6InNvbWVIYXNoZWRUb2tlbiJ9.2Ui-OuRnnLCS585qUW7zKgRD1CzfK8ZCq5R3uf6iSP0' },
          pathParams: {},
          queryParams: { id: 'aHashedAccountId' },
          method: 'PUT',
          resourcePath: '/User',
          source: 'aws.apiGateway'
        }
      }
      Authenticator.getIdentity(Object.assign({}, sampleAction, customEvent), configIdentity)
        .catch((err) => {
          return done()
        })
    })
    it('Should return null when there\'s no auth method in event', (done) => {
      let customEvent = {
        event: {
          body: { name: 'Luciano França' },
          headers: {},
          pathParams: {},
          queryParams: { id: 'aHashedAccountId' },
          method: 'PUT',
          resourcePath: '/User',
          source: 'aws.apiGateway'
        }
      }
      Authenticator.getIdentity(Object.assign({}, sampleAction, customEvent), configIdentity)
        .then((res) => {
          (!!res).should.not.be.ok()
          return done()
        })
    })
  })
})
