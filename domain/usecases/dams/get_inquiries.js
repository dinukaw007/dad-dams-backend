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
    async function getInquiries(data) {
        try {
            const page = data.page_number || null
            const limit = data.page_size || null
            const pageOffset = page ? (page - 1) * limit : null
            const pageLimit = limit ? parseInt(limit) : null
            const searchParams = {
                limit: pageLimit,
                offset: pageOffset,
                sort: data.sort || 'ASC',
                inquiry_type_id: data.inquiry_type_id || null
            }


            const inquiries = await damsRepository.getInquiries(searchParams)
            return inquiries
        }catch(err){
            throw err
        }

    }

    return {
        getInquiries: getInquiries
    };
};
