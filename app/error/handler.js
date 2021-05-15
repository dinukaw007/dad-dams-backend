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
const LoggingUtils = require('./../../externals/log/logging_utils');

/**
 * Handle error.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @private
 */
function handle(err, req, res, next) {

    let formattedError = formatter.format(err);
    const logger = new LoggingUtils('handler');

    logger.error(err.stack);
    res.status(formattedError.code).json(formattedError.message);

    next();
}


module.exports = (app) => {
    app.use(handle);
};
