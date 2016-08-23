'use strict'

/*
  This module is responsible for filtering input parameters and response attributes based on the access rules provided at the model.
*/

const Promise = require('bluebird')

const paramsFilter = {}

// This function resolve an provided attribute as a flat attribute a function or a promise.
const resolveAttribute = (action, attribute, identity, model) => {
  // If the attribute is not defined then by default it's a private attribute.
  if (!attribute) {
    return 'private'
  }
  // Resolve if it's a promise.
  if (typeof attribute.then === 'function') {
    return attribute
      .then((res) => {
        if (!res) {
          action.context.fail(res)
        }
        return res
      })
      .catch((err) => action.context.fail(err))
  }
  // Resolve if it's a simple function.
  if (typeof attribute === 'function') {
    return resolveAttribute(action, attribute(identity, model), identity, model)
  }
  return attribute
}

// Removes the forbidden attributes from the event input.
const filterAction = (action, rules, eventKeys, options) => {
  eventKeys.forEach((eventKey) => {
    Object.keys(action.event[eventKey]).forEach((subEventKey) => {
      if (!rules[subEventKey] || options.indexOf(rules[subEventKey]) === -1) {
        delete action.event[eventKey][subEventKey]
      }
    })
  })
  return action
}

// Define what are the available event attributes, the required permissions to be allowed and filter the event input.
paramsFilter.filterInput = (identity, model, action) => {
  const attributeRules = action.model.attributeRules()
  const eventKeys = ['body', 'headers', 'pathParams', 'queryParams']
  let possibleAttributes = eventKeys.reduce((result, current) => {
    Object.keys(action.event[current]).forEach((subEventKey) => {
      result[subEventKey] = resolveAttribute(action, attributeRules[subEventKey], identity, model)
    })
    return result
  }, {})
  return Promise.props(possibleAttributes)
    .then((data) => {
      return filterAction(action, data, eventKeys, ['public'])
    })
    .catch((err) => action.context.fail(err))
}

// Define what are the required permissions to be allowed and filter response.
paramsFilter.filterOutput = (identity, model, action) => {
  const attributeRules = action.model.attributeRules()
  // Transform response into a plain object.
  if (typeof action.response.data.toJSON === 'function') {
    action.response.data = action.response.data.toJSON()
  }
  // Resolve attribute permissions.
  let possibleAttributes = Object.keys(action.response.data).reduce((final, current) => {
    final[current] = resolveAttribute(action, attributeRules[current], identity)
    return final
  }, {})
  // Remove if it's not allowed.
  return Promise.props(possibleAttributes)
    .then((data) => {
      Object.keys(action.response.data).forEach((key) => {
        if (!data[key] || ['public', 'protected'].indexOf(data[key]) === -1) {
          delete action.response.data[key]
        }
      })
      return action
    })
    .catch((err) => action.context.fail(err))
}

module.exports = paramsFilter
