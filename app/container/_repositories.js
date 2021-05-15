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

const damsRepository = require('../../externals/repositories/mysql/dams_repository')

function resolve(container) {
    container.repositories = {
            damsRepository: damsRepository(container.adapters.db),
    }

}

module.exports = {
    resolve: resolve
};
