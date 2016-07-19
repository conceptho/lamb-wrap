'use strict'

const paramsFilter = {}

paramsFilter.filterInput = (identity, action) => {
  // TODO: MUST FILTER THE INPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  // console.log('Identity', identity)
  const attributeRules = action.schema.attributeRules()
  // console.log('Action', action)
  ;['body', 'headers', 'pathParams', 'queryParams'].forEach((eventKey) => {
    if (typeof action.event[eventKey] === 'object') {
      console.log(eventKey)

      for (let subEventKey in action.event[eventKey]) {
        if (!attributeRules[subEventKey]) {
          delete action.event[eventKey][subEventKey]
        }
      }
    } else {
      if (!attributeRules[eventKey]) {
        delete action.event[eventKey]
      }
    }
  })
  // console.log('Action', action)
  // console.log('Attribute Rules', action.schema.attributeRules())
  return action
}

paramsFilter.filterOutput = (identity, model, action) => {
  // TODO: MUST FILTER THE OUTPUT ATTRIBUTES BASED ON SCHEMA.ATTRIBUTERULES
  return action.response
}

module.exports = paramsFilter
