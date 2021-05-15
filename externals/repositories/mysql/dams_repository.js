'use strict'
/**
 *
 * @param dbAdapter
 */

module.exports = (dbAdapter) => {
    // const UploadDocumentTypeModel = require('./models/upload_document_type_model')(
    //     dbAdapter
    // )
    // const DocumentTypeModel = require('./models/document_type_model')(dbAdapter)

    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getAllDocumentType (sort) {
        return await DocumentTypeModel.findAndCountAll({
            order: [['documentTypeId', sort]]
        })
    }

    return {
        getByDocumentCode: getAllDocumentType,

    }
}
