/**
 * Copyrights 2020 ImitiLabs Pvt Ltd.
 * All Rights Reserved.
 *
 * These material are unpublished, proprietary, confidential source
 * code of ImitiLabs and constitute a TRADE
 */

"use strict";

const mysql = require('./../../externals/adapters/mysql')

function resolve(container) {
    container.adapters = {
            db: mysql({
                host: process.env.DB_MYSQL_HOST,
                database: process.env.DB_MYSQL_DATABASE,
                user: process.env.DB_MYSQL_USER,
                password: process.env.DB_MYSQL_PASSWORD,
                port: process.env.DB_MYSQL_PORT
            }),
        }

}

module.exports = {
    resolve: resolve
};
