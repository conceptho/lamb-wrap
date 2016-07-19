'use strict'
// Should use require('lamb-warp') instead
const Application = require('../index').Application
const Action = require('../index').Action


var body = (action, identity, model) => {
  model.save()
  return model
}

module.exports = {
  body: body,
  handler: Application.handler(Action.create({body: body, operation: Action.CREATE}))
}
