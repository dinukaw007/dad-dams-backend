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
const getLeisonOfficersImp = require('./../../domain/usecases/dams/get_leison_officers');

const inquiryTypesUsecaseImp = require('./../../domain/usecases/dams/get_inquiry_types');
const malpracticeTypesUsecaseImp = require('./../../domain/usecases/dams/get_malpractice_types');
const postionsUsecaseImp = require('./../../domain/usecases/dams/get_positions');
const createInquiryUsecaseImp = require('./../../domain/usecases/dams/create_inquiry');
const updateInquiryUsecaseImp = require('./../../domain/usecases/dams/update_inquiry');
const getInquiryUsecaseImp = require('./../../domain/usecases/dams/get_inquiry');
const getInquriesUsecaseImp = require('./../../domain/usecases/dams/get_inquiries');
const situationUsecaseImp = require('./../../domain/usecases/dams/add_current_situation_inquiry');
const leisonOfficersUsecaseImp = require('./../../domain/usecases/dams/add_leison_officers');

const getCurrentSituationInquiryImp = require('./../../domain/usecases/dams/get_current_situation_inquiry');

const getRelatedFieldImp = require('./../../domain/usecases/dams/get_related_field');
const getSourceOfInvestigationImp = require('./../../domain/usecases/dams/get_source_of_investigation');

const getConnectedInquirieImp = require('./../../domain/usecases/dams/get_connected_inquirie');
const addConnectedInquirieImp = require('./../../domain/usecases/dams/add_connected_inquirie');
const removeConnectedInquirieImp = require('./../../domain/usecases/dams/remove_connected_inquirie');

const LoggingUtils = require('./../../externals/log/logging_utils');

module.exports = (app) => {

    const container = app.get('container');
    const validator = app.get('validator');
    const responseMapper = app.get('response_mapper');
    const asyncErrorHandler = app.get('async_error_handler');
    const logger = new LoggingUtils('DAMS_CONTROLLER');


    const districtsUsecase = districtsUsecaseImp(container.repositories.damsRepository);
    const centersUsecase = centersUsecaseImp(container.repositories.damsRepository);
    const getLeisonOfficersUsecase = getLeisonOfficersImp(container.repositories.damsRepository);
    const inquiryTypesUsecase = inquiryTypesUsecaseImp(container.repositories.damsRepository);
    const malpracticeTypesUsecase = malpracticeTypesUsecaseImp(container.repositories.damsRepository);
    const positionsUsecase = postionsUsecaseImp(container.repositories.damsRepository);

    const createInquiryUsecase = createInquiryUsecaseImp(container.repositories.damsRepository);
    const updateInquiryUsecase = updateInquiryUsecaseImp(container.repositories.damsRepository);
    const getInquiryUsecase = getInquiryUsecaseImp(container.repositories.damsRepository);
    const getInquiriesUsecase = getInquriesUsecaseImp(container.repositories.damsRepository);
    const addSituationUsecase = situationUsecaseImp(container.repositories.damsRepository);
    const addLeisonOfficersUsecase = leisonOfficersUsecaseImp(container.repositories.damsRepository);
    const getCurrentSituationInquiryUsecase = getCurrentSituationInquiryImp(container.repositories.damsRepository);
    //
    const getRelatedFieldUsecase = getRelatedFieldImp(container.repositories.damsRepository);
    const getSourceOfInvestigationUsecase = getSourceOfInvestigationImp(container.repositories.damsRepository);

    const  getConnectedInquirieUsecase = getConnectedInquirieImp(container.repositories.damsRepository);
    const  addConnectedInquirieUsecase = addConnectedInquirieImp(container.repositories.damsRepository);
    const  removeConnectedInquirieUsecase = removeConnectedInquirieImp(container.repositories.damsRepository);


    async function getDistricts(req, res) {
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
    async function getCenters(req, res) {
        const { params } = req
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
    async function getPositions(req, res) {
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

    async function getInquiryTypes(req, res) {
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

    async function getMalpracticeTypes(req, res) {
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
    async function createInquiry(req, res) {
        await logger.info(`Get Districts Controller ${JSON.stringify(req.body)}`);
        try {
            let data = req.body
            // Defining validation rules
            const rules = {
                file_no: {
                    presence: true,
                },
                inquiry_type_id: {
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
    async function updateInquiry(req, res) {
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

    async function getInquiry(req, res) {
        await logger.info(`Get Malpractices Controller`);
        const { params } = req
        try {
            let inquiry = await getInquiryUsecase.getInquiry(params.inquiryId)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    inquiry
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }
    async function getInquiries(req, res) {
        await logger.info(`Get Malpractices Controller`);
        const { query } = req
        try {
            let inquiries = await getInquiriesUsecase.getInquiries(query)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    inquiries
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }

    async function getInquiriesByFileNo(req, res) {
        await logger.info(`Get getInquiriesByFileNo Controller`);
        const { query } = req
        try {
            let inquiries = await getInquiriesUsecase.getInquiriesByFileNo(query)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    inquiries
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }

    async function addLesisonOfficers(req, res) {
        await logger.info(`Get Districts Controller ${JSON.stringify(req.body)}`);
        try {
            let data = req.body
            // Defining validation rules
            const rules = {
                inquiry_id: {
                    presence: true,
                },

            };

            // Validate the request
            validator.validate(data, rules);


            // Call domain business logic
            let domainResponseDto = await addLeisonOfficersUsecase.addLeisonOfficers(data);

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

    async function addCurrentState(req, res) {
        await logger.info(`Get Districts Controller ${JSON.stringify(req.body)}`);
        try {
            let data = req.body
            // Defining validation rules
            const rules = {
                inquiry_id: {
                    presence: true,
                },

            };

            // Validate the request
            validator.validate(data, rules);


            // Call domain business logic
            let domainResponseDto = await addSituationUsecase.addCurrentSituation(data);

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

    async function tester(req, res) {
        return res.status(responseCodes.OK).json(
            responseMapper.map(
                "shit works"
            )
        );
    }

    async function getLesisonOfficers(req, res) {
        const { params } = req
        await logger.info(`GetLesison Officers`);
        try {
            let centers = await getLeisonOfficersUsecase.getLeisonOfficers(params.inquiryId)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    centers
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }


    async function getCurrentSituationInquiry(req, res) {
        const { params } = req
        await logger.info(`GetLesison Officers`);
        try {
            let centers = await getCurrentSituationInquiryUsecase.getCurrentSituationInquiry(params.inquiryId)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    centers
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }

    async function inquiryFinalize(req, res) {
        await logger.info(`Get Districts Controller ${req}`);
        try {
            let data = req.body;

            // Defining validation rules
            const rules = {
                inquiry_id: {
                    presence: true,
                },
                is_work_done: {
                    presence: true,

                }, work_done_date: {
                    presence: true,
                }
            };

            // Validate the request
            validator.validate(data, rules);
            data.state = 2;
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

    async function inquiryBasicInformatinUpdate(req, res) {
        await logger.info(`Get Districts Controller ${req}`);
        try {
            let data = req.body;

            // Defining validation rules
            const rules = {
                inquiry_id: {
                    presence: true,
                },
                file_name: {
                    presence: true,
                }, 
                file_no: {
                    presence: true,
                }, 
                file_start_reason: {
                    presence: true,
                }, 
                file_start_date: {
                    presence: true,
                }
            };

            // Validate the request
            validator.validate(data, rules);
            // Call domain business logic
            let domainResponseDto = await updateInquiryUsecase.updateBasicInformationInquiry(data);

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


    async function getRelatedField(req, res) {
        await logger.info(`Get RelatedField Controller`);
        try {
            let relatedField = await getRelatedFieldUsecase.getRelatedField();
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    relatedField
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }

    async function getSourceOfInvestigation(req, res) {
        await logger.info(`Get SourceOfInvestigation Controller`);
        try {
            let sourceOfInvestigation = await getSourceOfInvestigationUsecase.getSourceOfInvestigation();
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    sourceOfInvestigation
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }

    }


    async function getConnectedInquirie(req, res) {
        await logger.info(`Get ConnectedInquirie Controller`);
        const { query } = req
        try {
            let connected_inquirie = await getConnectedInquirieUsecase.getConnectedInquirie(query)
            return res.status(responseCodes.OK).json(
                responseMapper.map(
                    connected_inquirie
                )
            );
        } catch (err) {
            asyncErrorHandler.handle(err, res);
        }
    }


    async function addConnectedInquirie(req, res) {
        await logger.info(`Get Districts Controller ${JSON.stringify(req.body)}`);
        try {
            let data = req.body
            // Defining validation rules
            const rules = {
                inquiry_id: {
                    presence: true,
                },
                connected_inquiry_id: {
                    presence: true,
                },

            };

            // Validate the request
            validator.validate(data, rules);

            data.status =1;
            // Call domain business logic
            let domainResponseDto = await addConnectedInquirieUsecase.addConnectedInquirie(data);

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

    return {
        getDistricts: getDistricts,
        getCenters: getCenters,
        getPositions: getPositions,
        getInquiryTypes: getInquiryTypes,
        getMalpracticeTypes: getMalpracticeTypes,
        createInquiry: createInquiry,
        updateInquiry: updateInquiry,
        getInquiry: getInquiry,
        getInquiries: getInquiries,
        tester: tester,
        addCurrentState: addCurrentState,
        addLesisonOfficers: addLesisonOfficers,
        getLesisonOfficers: getLesisonOfficers,
        getCurrentSituationInquiry: getCurrentSituationInquiry,
        inquiryFinalize: inquiryFinalize,
        inquiryBasicInformatinUpdate:inquiryBasicInformatinUpdate,
        getRelatedField:getRelatedField,
        getSourceOfInvestigation:getSourceOfInvestigation,
        getInquiriesByFileNo:getInquiriesByFileNo,
        getConnectedInquirie:getConnectedInquirie,
        addConnectedInquirie:addConnectedInquirie

    };
}
