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
    async function getMalpractices() {
        try {
            const malPractices = await damsRepository.getMalpracticeTypes()
            return malPractices
        }catch(err){
            throw err
        }

    }

    return {
        getMalpractices: getMalpractices
    };
};
