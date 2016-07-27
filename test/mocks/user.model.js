'use strict'

const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))


const User = {}

const promiseSampleFalse = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false)
    }, 50)
  })
}

const promiseSampleTrue = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 50)
  })
}

let promiseSamplePublic = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('public')
    }, 50)
  })
}

User.attributeRules = function () {
  return {
    account_id: 'protected',
    name: 'public', // qualquer um pode ver e editar
    email: (identity) => 'public',
    apiKey: (identity) => promiseSamplePublic(),
    created_at: 'protected', // só pode ver
    password: 'private', // não pode ver nem alterar
    logins: 'protected'
  }
}

User.expandables = function () {
  return {
    logins: true
  }
}

User.accessRules = function (user, model) {
  return {
    VIEW: (user, model) => promiseSampleTrue(),
    UPDATE: (user, model) => true,
    DELETE: false,
    CREATE: true,
    LIST: promiseSampleFalse
  }
}


User.getIdentityByJwtToken = (jwtToken) => {
  return Promise.resolve(Object.assign({}, require('./identity.sample'), jwtToken))
    .catch((err) => new Error(err))
}

User.getIdentityByApiToken = (apiToken) => {
  return Promise.resolve(require('./identity.sample'))
}

User.findAllowed = (identity) => {
  return Promise.resolve(require('./identity.sample'))
}

User.findById = (id, cb) => {
  let data = require('./identity.sample')
  let err = null
  cb(err, data)
}

module.exports = User
