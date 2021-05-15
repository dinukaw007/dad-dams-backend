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

const _mapper = require('./_mapper')
const _transformer = require('./_transformer')

module.exports = (app) => {
  app.set('response_mapper', {
    map: _mapper.map,
    transform: _transformer.transform
  })
}
