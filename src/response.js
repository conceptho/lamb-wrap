'use strict'

const Response = function (data, action) {
  this.data = data
  this.action = action
  // Send the response through the lambda context.succeed method.
  this.send = () => action.context.succeed(this.data)
}

module.exports = Response
