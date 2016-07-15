'use strict'

const paramsFilter = {}

paramsFilter.filterInput = (identity, action) => {
  // TODO: MUST FILTER THE INPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  console.log('Identity', identity)
  console.log('Action', action)
  return action
}

paramsFilter.filterOutput = (identity, model, action) => {
  // TODO: MUST FILTER THE OUTPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  return action.response
}

module.exports = paramsFilter
