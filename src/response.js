'use strict'

let Response = function (data, action) {
  this.data = data
  this.action = action
  this.send = () => action.context.success(data)
}

module.exports = Response
