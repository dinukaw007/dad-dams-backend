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
    async function getCenters(data) {
        try {
            const page = data.page_number || null
            const limit = data.page_size || null
            const pageOffset = page ? (page - 1) * limit : null
            const pageLimit = limit ? parseInt(limit) : null
            const searchParams = {
                limit: pageLimit,
                offset: pageOffset,
                sort: data.sort || 'ASC',
            }

            const centers = await damsRepository.getInquiries(searchParams)
            return centers
        }catch(err){
            throw err
        }

    }

    return {
        getCenters: getCenters
    };
};
