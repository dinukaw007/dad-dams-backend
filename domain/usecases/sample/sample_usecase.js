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

const SampleDomainResponseDto = require('../../entities/sample_domain_response_dto');

module.exports = (repository) => {

    let domainResponseDto = SampleDomainResponseDto();

    /**
     * Build the use case logic flow as user desires
     * @param domainRequest
     * @returns {Promise<{resDesc: string, errorMassage: string, resCode: string}>}
     */
    async function process(domainRequest) {

        // Todo: Execute business logic
        let err = false;
        // console.log(domainRequest.id);

        if(err){
            throw err;
        } else {
            domainResponseDto.resCode = "200";
            domainResponseDto.resDesc = "Operation Success";
            return domainResponseDto;
        }

    }

    return {
        process: process
    };
};
