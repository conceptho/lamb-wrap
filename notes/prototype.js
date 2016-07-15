// assign a function to the "statics" object of our animalSchema
userSchema.statics.attributeRules = function () {
  return {
    account_id: 'protected',
    name: 'public', // qualquer um pode ver e editar
    email: function (model, user) { return 'public' },
    secretKey: function (model, user) { return 'protected' }
    created_at: 'protected', // só pode ver
    password: 'private' // não pode ver nem alterar
  }
}

userSchema.statics.expandables = function () {
  return {
    account: true,
    logins: false
  }
}

userSchema.statics.accessRules = function (user, model) {
  return {
    view: function (user, model) {
      return !!user.account_ids.indexOf(model.account_id)
    },
    update: function (user, model) { return false },
    delete: false,
    create: true
  }
}

userSchema.statics.findAllowed = function (user, model) {
  return !!user.account_ids.indexOf(model.account_id)
}

var User = mongoose.model('User', userSchema)
User.findByName('fido', function (err, users) {
  console.log(users)
})

// GET /user/123?expand=account

// *-> user authentication
// *-> event validation
// -> resource loader
// -> user authorization
// -> check resource access rule
// -> body parameters filtering (for edition/listing)
// -> method body (get user by id)
// -> expand and serialize
// -> parameters filtering for visualization
// *-> return result

var User = function () {
  return this
}


