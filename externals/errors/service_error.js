/**
 * Copyrights 2020 ImitiLabs Pvt Ltd.
 * All Rights Reserved.
 *
 * These material are unpublished, proprietary, confidential source
 * code of ImitiLabs and constitute a TRADE

 *
 .
 *
 */

"use strict";

const ErrorTypes = require('./types');

/**
 *
 * Error types for services
 *
 * @version 1.0
 * @author  DTE Platform
 */
module.exports = (message, code) => {

    let err = new Error(message);
    err.name = ErrorTypes.SERVICE_ERROR;
    err.code = code;

    return err;
};
