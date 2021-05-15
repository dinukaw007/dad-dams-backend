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

function transform(datum) {
    // Change according to user needs
    return {
        resCode: datum.resCode,
        resDesc: datum.resDesc,
        errorMassage: datum.errorMassage
    };
}

module.exports = {
    transform: transform
};
