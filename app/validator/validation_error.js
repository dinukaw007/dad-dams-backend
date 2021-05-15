/**
 * Copyrights 2020 Axiata Digital Labs Pvt Ltd.
 * All Rights Reserved.
 *
 * These material are unpublished, proprietary, confidential source
 * code of ImitiLabs and constitute a TRADE

 *
 .
 *
 */

"use strict";

const ErrorTypes = require('./../error/types');


/**
 *
 * Validation ERROR type model
 *
 * @version 1.0
 * @author  DTE Platform
 */
module.exports = () => {

    let err = new Error();
    err.name = ErrorTypes.VALIDATION_ERROR;

    return err;
};
