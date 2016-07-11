'use strict'

let paramsFilter = {}

paramsFilter.filterInput = (action) => {
  // TODO: MUST FILTER THE INPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  return action
}

paramsFilter.filterOutput = (action, response) => {
  // TODO: MUST FILTER THE OUTPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  return response
}

module.exports = paramsFilter
