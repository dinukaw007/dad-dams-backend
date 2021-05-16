'use strict'
/**
 *
 * @param dbAdapter
 */

module.exports = (dbAdapter) => {
    const districtsModel = require('./models/district')(dbAdapter)
    const centersModel = require('./models/center')(dbAdapter)
    const inquiryModel = require('./models/inquiry_model')(dbAdapter)
    const induiryTypesModel = require('./models/inquiry_type')(dbAdapter)
    const positionsModel = require('./models/position')(dbAdapter)
    const malpracticesModel = require('./models/malpractice_types')(dbAdapter)
    const otherLeisonOfficersModel = require('./models/other_liaison_officers')(dbAdapter)

    otherLeisonOfficersModel.belongsTo(inquiryModel, {
        foreignKey: 'inquiry_id',
        targetKey:'inquiry_id'
    })
    inquiryModel.hasMany(otherLeisonOfficersModel, {
        as: 'other_liaison_officers',
        foreignKey:'inquiry_id'
    })

    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getDistricts () {
        return await districtsModel.findAll({
            order: [['name', 'ASC']]
            }
        )
    }


    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getInquiryTypes () {
        return await induiryTypesModel.findAll({
                order: [['name', 'ASC']]
            }
        )
    }

    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getMalpracticeTypes () {
        return await malpracticesModel.findAll({
                order: [['name', 'ASC']]
            }
        )
    }

    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getPositions () {
        return await positionsModel.findAll({
                order: [['name', 'ASC']]
            }
        )
    }
    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function getCenters (districtId) {
        const whereObj = {}
        if(districtId){
            whereObj.district_id = districtId
        }
        return await centersModel.findAll({
            where: whereObj
        })
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function addInquiry (data) {
        return await inquiryModel.create(data)
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function updateInquiry (data) {
        await otherLeisonOfficersModel.destroy({
            where:{
                inquiry_id: data.inquiry_id
            }
        })
        const currentInquiryRecord = await inquiryModel.findOne({
            where:{
                inquiry_id: data.inquiry_id
            }
        })
        data.file_no = currentInquiryRecord.file_no
        data.file_start_date = currentInquiryRecord.file_start_date
        data.file_name = currentInquiryRecord.file_name
        data.file_start_reason = currentInquiryRecord.file_start_reason


        let merged = {...currentInquiryRecord.dataValues, ...data};

        return await inquiryModel.bulkCreate([merged],{
            updateOnDuplicate: ["inquiry_id", "file_no"],
            include:{
                model: otherLeisonOfficersModel,
                as: 'other_liaison_officers'
            }
        })
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function getInquiries (searchParams) {
        const offset = searchParams.offset
        const limit = searchParams.limit

        const whereObj = {}
        if(searchParams.inquiry_type_id != null){
            whereObj.inquiry_type_id = searchParams.inquiry_type_id
        }

        return await inquiryModel.findAndCountAll({
            where: whereObj,
            offset: offset,
            limit: limit,
            order: [
                ['file_start_date', 'DESC']
            ], // add query parms here
        })
    }
    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function getInquiry (inquiryId) {
        return await inquiryModel.findOne({
            where:{
                inquiry_id: inquiryId
            }
        })
    }


    return {
        getDistricts: getDistricts,
        getCenters: getCenters,
        getInquiryTypes: getInquiryTypes,
        getMalpracticeTypes: getMalpracticeTypes,
        getPositions: getPositions,
        addInquiry:addInquiry,
        updateInquiry:updateInquiry,
        getInquiries:getInquiries,
        getInquiry:getInquiry

    }
}
