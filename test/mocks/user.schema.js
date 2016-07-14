'use strict'

let User = {}

User.attributeRules = function () {
  return {
    name: 'public', // qualquer um pode ver e editar
    email: function (model, user) { return 'public' },
    created_at: 'protected', // só pode ver
    password: 'private' // não pode ver nem alterar
  }
}

User.expandables = function () {
  return {
    account: true,
    logins: false
  }
}

User.accessRules = function (user, model) {
  return {
    view: function (user, model) {
      return !!user.account_ids.indexOf(model.account_id)
    },
    update: function (user, model) { return false },
    delete: false,
    create: true
  }
}

User.findAllowed = function (user, model) {
  return !!user.account_ids.indexOf(model.account_id)
}

module.exports = User
