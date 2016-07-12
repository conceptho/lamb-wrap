'use strict'
// Should use require('lamb-warp') instead
let { Application, Action } = require('./index')

var body = (action, identity, model) => {
  model.save()
  return model
}

module.exports = {
  body: body,
  handler: Application.handler(Action.create({body: body, operation: Action.CREATE}))
}
