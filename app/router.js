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

const DAMSController = require('./controllers/dams_controller');


/**
 *
 * routing configurations
 *
 * @version 1.0
 * @author  DTE Platform
 */

module.exports = (app) => {

    // constructor ___
    const sampleController = DAMSController(app);

    // api info
    app.post('/action', sampleController.exampleMethod);
    app.get('/api/data/districts', sampleController.exampleMethod);
    app.get('/api/data/centers/:districts', sampleController.exampleMethod);
    app.get('/api/data/positions', sampleController.exampleMethod);
    app.post('/api/inquiry', sampleController.exampleMethod);
    app.update('/api/inquiry', sampleController.exampleMethod)
};
