'use strict'

const idendity = Object.assign({}, require('./user.schema'), {
  account_id: 'aHashedAccountId',
  name: 'Luciano Pellacani França',
  email: 'lucianopf@outlook.com',
  secretKey: 'aHashedSecretKey',
  created_at: '2016-07-07',
  password: 'aHashedPassword',
  logins: []
})

module.exports = idendity