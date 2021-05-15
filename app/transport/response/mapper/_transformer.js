/**
 * Copyrights 2020 Axiata Digital Labs Pvt Ltd.
 * All Rights Reserved.
 *
 * These material are unpublished, proprietary, confidential source
 * code of Axiata Digital Labs Pvt Ltd (ADL) and constitute a TRADE
 * SECRET of ADL.
 *
 * ADL retains all title to and intellectual property rights in these
 * materials.
 *
 */

'use strict'

/**
 * Transform as a single data structure.
 *
 * @param {*} data
 * @param {*} transformer
 * @param {*} asCollection
 */
function transform (data, transformer, asCollection) {
  asCollection = asCollection || false

  if (asCollection) {
    return _transformCollection(data, transformer)
  }

  return transformer.transform(data)
}

/**
 * Transform as a collection of data structures.
 *
 * @param {*} data
 * @param {*} transformer
 */
function _transformCollection (data, transformer) {
  const collection = []

  data.forEach(function (datum) {
    collection.push(transformer.transform(datum))
  })

  return collection
}

module.exports = {
  transform: transform
}
