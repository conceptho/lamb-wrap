'use strict'

let UserModel = require('./user.model')
const idendity = Object.assign({}, new UserModel(), {
  id: 'aHashedAccountId',
  name: 'Luciano Pellacani França',
  email: 'lucianopf@outlook.com',
  apiKey: 'aHashedSecretKey',
  created_at: '2016-07-07',
  password: 'aHashedPassword',
  logins: [],
  toJSON: function () { return this }
})

module.exports = idendity
