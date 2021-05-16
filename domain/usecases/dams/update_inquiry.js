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
            for (let prop in data) {
                if (data[prop] === ''){
                    delete data[prop]
                }
                if (data[prop] === null){
                    delete data[prop]
                }
            }
            const inquiry = await damsRepository.updateInquiry(data)
            return inquiry
        }catch(err){
            throw err
        }

    }

    return {
        updateInquiry: updateInquiry
    };
};
