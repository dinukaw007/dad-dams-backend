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

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment');
const os = require('os');


let dateFormat = () => {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS')
}

let processId = () => {
    return process.pid;
}
class LoggingUtils {

    constructor(route) {
        // Initialize basic logging data
        this.appName = process.env.APP_NAME;
        this.msName = process.env.MS_NAME;
        this.hostName = os.hostname();
        this.consoleLogLevel = process.env.CONSOLE_LOG_LEVEL;
        this.fileLogLevel = process.env.FILE_LOG_LEVEL;
        this.consoleLogName = 'STDOUT';
        this.fileLogName = 'application-log';

        // Instantiate logger
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: this.consoleLogLevel,
                    // Setting up log pattern.
                    // note: global.uuid and global.massageType should be set according to incoming request.
                    format: winston.format.printf((info) => {
                        return `${dateFormat()}|${processId()}|${this.hostName}|${info.level.toUpperCase()}|${this.consoleLogName}|${this.appName}|${this.msName}|${global.uuid}|${global.massageType}|${info.message} `
                    })
                }),
                new DailyRotateFile({
                    level: this.fileLogLevel,
                    // Setting up log pattern.
                    // note: global.uuid and global.massageType should be set according to incoming request.
                    format: winston.format.printf((info) => {
                        return `${dateFormat()}|${processId()}|${this.hostName}|${info.level.toUpperCase()}|${this.fileLogName}|${this.appName}|${this.msName}|${global.uuid}|${global.massageType}|${info.message} `
                    }),
                    filename: `./logs/${this.msName}-%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    //zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '30d'
                })
            ]
        })
    }

    async info(message) {
        this.logger.log('info', message);
    }

    async debug(message) {
        this.logger.log('debug', message);
    }

    async error(message) {
        this.logger.log('error', message);
    }
}

module.exports = LoggingUtils;
