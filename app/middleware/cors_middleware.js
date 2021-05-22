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

const cors = require('cors');

let options = {
    origin: "example.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200   // some legacy browsers (IE11, various SmartTVs) choke on 204
};


/**
 *
 * configurations for cors validation
 *
 * @version 1.0
 * @author  DTE Platform
 */
module.exports = (app) => {
    app.use(cors());
};
