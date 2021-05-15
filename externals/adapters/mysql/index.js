'use strict'
const { Sequelize } = require('sequelize')
const validator = require('./_validator')
/**
 *
 * @param {Object} config
 * @return {{getModel: (function(String, Object): void)}}
 */
module.exports = (config) => {
  // validate configurations
  validator.validateConfig(config)

  // create db pool
  const pool = _getPool(config)

  /**
     * Get a model using a schema
     * @param {String} name
     * @param {Object} schema
     */
  function getModel (name, schema) {
    // pool.sync({force: true})
    return pool.define(name, schema, { timestamps: true })
  }

  /**
     * Get the database pool
     * @param {Object} config
     * @return {*}
     * @private
     */
  function _getPool (config) {
    return new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'mysql'
    })
  }

  return {
    getModel: getModel
  }
}
