'use strict'

const validator = require('validate.js')
const errors = require('./_errors')

/**
 * Check whether configurations are valid.
 *
 * @param {Object} config
 */
function validateConfig (config) {
  const rules = {
    host: {
      presence: true,
      length: {
        minimum: 1
      }
    },
    // port: {
    //     presence: true,
    //     numericality: {
    //         onlyInteger: true,
    //         greaterThan: 0
    //     }
    // },
    database: {
      presence: true,
      length: {
        minimum: 1
      }
    },
    user: {
      presence: true,
      length: {
        minimum: 1
      }
    }
    // password: {
    //     presence: true,
    //     length: {
    //         minimum: 1
    //     }
    // },
  }

  const details = validator.validate(config, rules)

  if (details === undefined) {
    return
  }

  throw errors.configError(details)
}

/**
 *
 * @type {{validateConfig: validateConfig}}
 */
module.exports = {
  validateConfig: validateConfig
}
