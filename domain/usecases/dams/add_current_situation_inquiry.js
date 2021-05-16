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
    async function addCurrentSituation(data) {
        try {
            //if need to run extra validations - add code
            const situation = await damsRepository.addCurrentSituation(data)
            return situation
        }catch(err){
            throw err
        }

    }

    return {
        addCurrentSituation: addCurrentSituation
    };
};
