'use strict'
const Application = require('../index').Application
const userSchema = require('../models/user')

let application = Application.create({
  identitySchema: userSchema,
  jwtSecret: 'aHashedSecret'
})

module.exports = application
