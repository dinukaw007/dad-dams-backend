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
    async function updateInquiry(data) {
        try {
            //if need to run extra validations - add code

            const centers = await damsRepository.updateInquiry(data)
            return centers
        }catch(err){
            throw err
        }

    }

    return {
        updateInquiry: updateInquiry
    };
};
