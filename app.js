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

// prevent this file from executing directly
if (require.main === module)
{
    console.error('This file is not there to be executed directly. Please use server.js instead.');
    process.exit();
}

/*
|--------------------------------------------------------------------------
| Load Configurations
|--------------------------------------------------------------------------
|
*/

require('dotenv').config();


/*
|--------------------------------------------------------------------------
| Create App
|--------------------------------------------------------------------------
|
*/

const express = require('express');
let app = express();


/*
|--------------------------------------------------------------------------
| Resolve and Add Dependency Injection Container
|--------------------------------------------------------------------------
|
*/

require('./app/container')(app);


/*
|--------------------------------------------------------------------------
| Add Request Validator
|--------------------------------------------------------------------------
|
*/

require('./app/validator')(app);


/*
|--------------------------------------------------------------------------
| Add Response Mapper
|--------------------------------------------------------------------------
|
*/

require('./app/transport/response/mapper')(app);


/*
|--------------------------------------------------------------------------
| Async Error Handler
|--------------------------------------------------------------------------
|
*/

require('./app/error/async_handler')(app);


/*
|--------------------------------------------------------------------------
| Add Middleware
|--------------------------------------------------------------------------
|
*/

//setup msstat middleware
//require('./Package-msstat')(app);

// allow cross origin calls
require('./app/middleware/cors_middleware')(app);

// check whether input is JSON
require('./app/middleware/request_check_middleware')(app);

// alter the request with additional details
require('./app/middleware/request_alter_middleware')(app);

// enable JSON body parsing
app.use(express.json());


/*
|--------------------------------------------------------------------------
| Add Router
|--------------------------------------------------------------------------
|
*/

require('./app/router')(app);


/*
|--------------------------------------------------------------------------
| Add Error Handler
|--------------------------------------------------------------------------
|
| This will override the default error handler.
| NOTE: Should be added to the `app` as the last step of the
|       bootstrapping process.
|
*/

require('./app/error/handler')(app);


/*
 |--------------------------------------------------------------------------
 | Export decorated app object which can be used by process handler
 |--------------------------------------------------------------------------
 |
 */

module.exports = app;
