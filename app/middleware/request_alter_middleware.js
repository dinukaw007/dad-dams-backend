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

const uuidv1 = require('uuid/v1');


/**
 * Set UUID as log identifier.
 *
 * @param req
 */
function setLogIdentifier(req) {

    // Check weather UUID is sent with request header.
    // If it is not available then set randomly generated UUID to it.
    let req_uuid = req.get(process.env.REQ_IDENTIFIER_NAME);
    if(req_uuid == null || (req_uuid ==="")){
        req.uuid = uuidv1();
    } else{
        req.uuid = req_uuid;
    }
    //set uuid as global variable
    global.uuid= req.uuid;
}

/**
 * Set request massage type from request header.
 *
 * @param req
 */
function setRequestType(req) {
    // Check weather MassageRequestType is sent with request header.
    // If it is not available then set default value to it.
    let req_msg_type = req.get(process.env.MASSAGE_TYPE_HEADER_NAME);
    if(req_msg_type == null || (req_msg_type ==="")){
        req.msg_type = 'API_CALL';
    } else{
        req.msg_type = req_msg_type;
    }
    //set RequestMassageType as global variable
    global.massageType = req.msg_type;
}

function handle(req, res, next) {

    setLogIdentifier(req);
    setRequestType(req);

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

