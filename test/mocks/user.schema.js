'use strict'

let User = {}

User.attributeRules = function () {
  return {
    account_id: 'protected',
    name: 'public', // qualquer um pode ver e editar
    email: function (model, user) { return 'public' },
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
    VIEW: (user, model) => user.account_id === model.account_id,
    UPDATE: (user, model) => true,
    DELETE: false,
    CREATE: true,
    LIST: false
  }
}

module.exports = User
