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

const formatter = require('./formatter');

/**
 * Handle async error.
 *
 * @param err
 * @param res
 */
function handle(err, res) {

    let formattedError = formatter.format(err);

    console.error(err.stack);
    res.status(formattedError.code).json(formattedError.message);
}


module.exports = (app) => {
    app.set('async_error_handler', {
        handle: handle
    });
};
