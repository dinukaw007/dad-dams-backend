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

const serverError = require('../error/server_error');

const omittedRoutes = [
    '/metrics',
    '/favicon.ico'
];

function handle(req, res, next) {

    // omitted out routes
    if(omittedRoutes.indexOf(req.url) > -1) {
        next();
        return;
    }

    if((req.method === 'POST' || req.method === 'PUT') && 'application/json' !== req.get('content-type')) {
        throw serverError("API only accepts JSON");
    }

    next();
}

/**
 *
 * configurations for filter validation
 * customer can edit this accordingly
 *
 * @version 1.0
 * @author  DTE Platform
 */
module.exports = (app) => {
    app.use(handle);
};
