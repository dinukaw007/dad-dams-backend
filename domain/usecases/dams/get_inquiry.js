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



module.exports = (damsRepository) => {

    /**
     * Build the use case logic flow as user desires
     * @param domainRequest
     * @returns {Promise<{resDesc: string, errorMassage: string, resCode: string}>}
     */
    async function getInquiry(inquiryId) {
        try {
            const inquiry = await damsRepository.getInquiry(inquiryId)
            return inquiry
        }catch(err){
            throw err
        }

    }

    return {
        getInquiry: getInquiry
    };
};
