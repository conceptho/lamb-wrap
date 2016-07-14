'use strict'

let User = {}

let promiseSample = new Promise(
  (resolve, reject) => {
    setTimeout(
      () => {
        resolve(true)
      }, 5000)
  }
)

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
    LIST: promiseSample
  }
}

module.exports = User
