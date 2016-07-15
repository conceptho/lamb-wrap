'use strict'

let User = {}

let promiseSampleFalse = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(false)
    }, 50)
  })
}

let promiseSampleTrue = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 50)
  })
}

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
    VIEW: (user, model) => promiseSampleTrue(),
    UPDATE: (user, model) => true,
    DELETE: false,
    CREATE: true,
    LIST: promiseSampleFalse
  }
}

module.exports = User
