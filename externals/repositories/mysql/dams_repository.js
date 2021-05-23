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
    const currentSitationModel = require('./models/current_situation')(dbAdapter)

    otherLeisonOfficersModel.belongsTo(inquiryModel, {
        foreignKey: 'inquiry_id',
        targetKey:'inquiry_id'
    })
    inquiryModel.hasMany(otherLeisonOfficersModel, {
        as: 'other_liaison_officers',
        foreignKey:'inquiry_id'
    })

    currentSitationModel.belongsTo(inquiryModel, {
        foreignKey: 'inquiry_id',
        targetKey:'inquiry_id'
    })
    inquiryModel.hasMany(currentSitationModel, {
        as: 'current_situation',
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
     * @param inquiryId
     * @return {Promise<*>}
     */
       async function getLeisonOfficers (inquiryId) {
        const whereObj = {}
        if(inquiryId){
            whereObj.inquiry_id = inquiryId
        }
        return await otherLeisonOfficersModel.findAll({
            where: whereObj
        })
    }


    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function addInquiry (data) {
        // console.log(data)
        return inquiryModel.create(data);
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function updateInquiry (data) {
        const currentInquiryRecord = await inquiryModel.findOne({
            where:{
                inquiry_id: data.inquiry_id
            }
        });
        data.file_no = currentInquiryRecord.file_no
        data.file_start_date = currentInquiryRecord.file_start_date
        data.file_name = currentInquiryRecord.file_name
        data.file_start_reason = currentInquiryRecord.file_start_reason
        let merged = {...currentInquiryRecord.dataValues, ...data};
        await inquiryModel.update(merged,{where:{inquiry_id:data.inquiry_id}});
        return await inquiryModel.findOne({where:{inquiry_id:data.inquiry_id}});
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
            },
            include: [
                {model: currentSitationModel,
                    as:"current_situation"},
                {model: otherLeisonOfficersModel,
                    as: "other_liaison_officers"}
            ]
        })
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function AddLeisonOfficers (data) {
        data.other_liaison_officers.forEach(function(itm){
            itm.inquiry_id = data.inquiry_id;
        });
        return await otherLeisonOfficersModel.bulkCreate(data.other_liaison_officers)
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function addCurrentSituation (data) {
        return await currentSitationModel.create(data);
        // const foundItem = await currentSitationModel.findOne({where:{
        //         inquiry_id: data.inquiry_id
        //     }});
        // if (!foundItem) {
        //     // Item not found, create a new one
        //     return currentSitationModel.create(data);

        // }
        // // Found an item, update it
        // return await currentSitationModel.update(data, { where: {
        //         inquiry_id: data.inquiry_id
        //     }});

    }


        /**
     * .
     * @param inquiryId
     * @return {Promise<*>}
     */
         async function getCurrentSituationInquiry (inquiryId) {
            const whereObj = {}
            if(inquiryId){
                whereObj.inquiry_id = inquiryId
            }
            return await currentSitationModel.findAll({
                where: whereObj,
                order:[['current_situation_date','DESC']]
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
        getInquiry:getInquiry,
        addCurrentSituation: addCurrentSituation,
        AddLeisonOfficers: AddLeisonOfficers,
        getLeisonOfficers:getLeisonOfficers,
        getCurrentSituationInquiry:getCurrentSituationInquiry

    }
}
