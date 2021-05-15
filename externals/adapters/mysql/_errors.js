'use strict'

const serverError = require('../../../app/error/server_error')
const adapterError = require('../../errors/adapter_error')
const repositoryError = require('../../errors/repository_error')

function unknownError () {
  return adapterError('Unknown database adapter error', 'ADMG00')
}

function configError (details) {
  return serverError(`DB config error ${JSON.stringify(details)}`, 'ADMG01')
}

function connectionError () {
  return serverError('Error connecting to database', 'ADMG02')
}

function queryExecutionError () {
  return repositoryError('Error executing query', 'ADMG03')
}

module.exports = {
  unknownError: unknownError,
  configError: configError,
  connectionError: connectionError,
  queryExecutionError: queryExecutionError
}
