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

const responseCodes = require('http-status-codes');
const testTransformer = require('./../transformers/test_transformer');
const SampleDomainRequestDto = require('../../domain/entities/sample_domain_request_dto');
const SampleUseCase = require('./../../domain/usecases/sample/sample_usecase');
const LoggingUtils = require('./../../externals/log/logging_utils');

module.exports = (app) => {

    const container = app.get('container');
    const validator = app.get('validator');
    const responseMapper = app.get('response_mapper');
    const asyncErrorHandler = app.get('async_error_handler');
    const logger = new LoggingUtils('DAMS_CONTROLLER');

    const sampleUseCase = SampleUseCase(container.repositories.samplePostgresRepository);


    async function startFile(req, res) {

        logger.info("controller Started....");
        try {
            let data = req.body;

            // Defining validation rules
            const rules = {
                id: {
                    presence: true,
                    numericality: {
                        onlyInteger: true
                    }
                }
            };

            // Validate the request
            validator.validate(data, rules);

            // request map to domain object
            let domainRequestDto = SampleDomainRequestDto();
            domainRequestDto.id = req.body.id;

            // Call domain business logic
            let domainResponseDto = await sampleUseCase.process(domainRequestDto);

            //Transform domain response
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    responseMapper.transform(domainResponseDto, testTransformer, false)
                )
            );

        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }

    return {
        startFile: startFile,
    };
}
