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

const validationError = require('./validation_error');
const validator = require('validate.js');

function validate(data, rules) {

    let details = validator.validate(data, rules);

    if(details !== undefined) {

        let err = validationError();
        err.details = details;

        throw err;
    }

    return true;
}

/**
 *
 * Validate the request
 *
 * @version 1.0
 * @author  DTE Platform
 */
module.exports = (app) => {

    app.set('validator', {
        validate: validate
    });
};
