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

module.exports = (message, code) => {

    let err = new Error(message);
    err.name = ErrorTypes.DOMAIN_ERROR;
    err.code = code;

    return err;
};
