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
const districtTransformer = require('../transformers/district_transformer');
const SampleDomainRequestDto = require('../../domain/entities/sample_domain_request_dto');

const districtsUsecaseImp = require('./../../domain/usecases/dams/get_districts');
const centersUsecaseImp = require('./../../domain/usecases/dams/get_centers');
const inquiryTypesUsecaseImp = require('./../../domain/usecases/dams/get_inquiry_types');
const malpracticeTypesUsecaseImp = require('./../../domain/usecases/dams/get_malpractice_types');
const postionsUsecaseImp = require('./../../domain/usecases/dams/get_positions');


const createInquiryUsecaseImp = require('./../../domain/usecases/dams/create_inquiry');
const updateInquiryUsecaseImp = require('./../../domain/usecases/dams/update_inquiry');
const getInquiryUsecaseImp = require('./../../domain/usecases/dams/get_inquiry');
const getInquriesUsecaseImp = require('./../../domain/usecases/dams/get_inquiries');


const LoggingUtils = require('./../../externals/log/logging_utils');

module.exports = (app) => {

    const container = app.get('container');
    const validator = app.get('validator');
    const responseMapper = app.get('response_mapper');
    const asyncErrorHandler = app.get('async_error_handler');
    const logger = new LoggingUtils('DAMS_CONTROLLER');


    const districtsUsecase = districtsUsecaseImp(container.repositories.damsRepository);
    const centersUsecase = centersUsecaseImp(container.repositories.damsRepository);
    const inquiryTypesUsecase = inquiryTypesUsecaseImp(container.repositories.damsRepository);
    const malpracticeTypesUsecase = malpracticeTypesUsecaseImp(container.repositories.damsRepository);
    const positionsUsecase = postionsUsecaseImp(container.repositories.damsRepository);

    const createInquiryUsecase = createInquiryUsecaseImp(container.repositories.damsRepository);
    const updateInquiryUsecase = updateInquiryUsecaseImp(container.repositories.damsRepository);
    const getInquiryUsecase = getInquiryUsecaseImp(container.repositories.damsRepository);
    const getInquiriesUsecase = getInquriesUsecaseImp(container.repositories.damsRepository);


    async function getDistricts(req, res){
        await logger.info(`Get Districts Controller`);
        try {
            let districts = await districtsUsecase.getDistricts()
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    districts
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }
    async function getCenters(req, res){
        const {params} = req
        await logger.info(`Get Centers Controller`);
        try {
            let centers = await centersUsecase.getCenters(params.districtId)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    centers
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }
    async function getPositions(req, res){
        await logger.info(`Get Positions Controller`);
        try {
            let positions = await positionsUsecase.getPositions()
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    positions
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }

    async function getInquiryTypes(req, res){
        await logger.info(`Get Inquiry Types Controller`);
        try {
            let inquirytypes = await inquiryTypesUsecase.getInquiryTypes()
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    inquirytypes
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }

    async function getMalpracticeTypes(req, res){
        await logger.info(`Get Malpractices Controller`);
        try {
            let malpractices = await malpracticeTypesUsecase.getMalpractices()
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    malpractices
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }
    async function createInquiry(req, res){
        await logger.info(`Get Districts Controller ${req}`);
        try {
            let data = req.body
            // Defining validation rules
            const rules = {
                file_no: {
                    presence: true,
                },
                inquiry_type_no: {
                    presence: true,
                },
                file_start_date: {
                    presence: true,
                },
                file_name: {
                    presence: true,

                },
                file_start_reason: {
                    presence: true,

                },
            };

            // Validate the request
            validator.validate(data, rules);


            // Call domain business logic
            let domainResponseDto = await createInquiryUsecase.createInquiry(data);

            //Transform domain response
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    domainResponseDto
                )
            );

        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }
    async function updateInquiry(req, res){
        await logger.info(`Get Districts Controller ${req}`);
        try {
            let data = req.body;

            // Defining validation rules
            const rules = {
                inquiry_id: {
                    presence: true,
                }
            };

            // Validate the request
            validator.validate(data, rules);

            // Call domain business logic
            let domainResponseDto = await updateInquiryUsecase.updateInquiry(data);

            //Transform domain response
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    domainResponseDto
                )
            );

        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }

    async function getInquiry(req, res){}
    async function getInquiries(req, res){}
    async function tester(req, res){
        return res.status(responseCodes.OK).json(
            responseMapper.map(
                "shit works"
            )
        );
    }



    return {
        getDistricts: getDistricts,
        getCenters: getCenters,
        getPositions:getPositions,
        getInquiryTypes:getInquiryTypes,
        getMalpracticeTypes: getMalpracticeTypes,
        createInquiry: createInquiry,
        updateInquiry: updateInquiry,
        getInquiry: getInquiry,
        getInquiries: getInquiries,
        tester:tester
    };
}
