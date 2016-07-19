'use strict'

const paramsFilter = {}

paramsFilter.filterInput = (action) => {
  // TODO: MUST FILTER THE INPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  return action
}

paramsFilter.filterOutput = (action) => {
  // TODO: MUST FILTER THE OUTPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  return action.response
}

module.exports = paramsFilter
