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
    const otherLeisonOfficersModel = require('./models/liaison_officers')(dbAdapter)
    const currentSitationModel = require('./models/current_situation')(dbAdapter)
    const relatedFieldModel = require('./models/related_field')(dbAdapter)
    const sourceOfInvestigationModel = require('./models/source_of_investigation')(dbAdapter)
    const connectedIinquiriesModel = require('./models/connected_inquiries')(dbAdapter)
    const currentSituationTypeActionModel = require('./models/current_situation_type_action.model')(dbAdapter)

    otherLeisonOfficersModel.belongsTo(inquiryModel, {
        foreignKey: 'inquiry_id',
        targetKey: 'inquiry_id'
    })
    inquiryModel.hasMany(otherLeisonOfficersModel, {
        as: 'liaison_officers',
        foreignKey: 'inquiry_id'
    })

    currentSitationModel.belongsTo(inquiryModel, {
        foreignKey: 'inquiry_id',
        targetKey: 'inquiry_id'
    })
    inquiryModel.hasMany(currentSitationModel, {
        as: 'current_situation',
        foreignKey: 'inquiry_id'
    })


    positionsModel.hasMany(inquiryModel, {
        as: 'positions',
        foreignKey: 'position'
    })

    inquiryModel.belongsTo(positionsModel, {
        foreignKey: 'position',
        as: 'positions'
    })

    //
    relatedFieldModel.hasMany(inquiryModel, {
        as: 'related_fields',
        foreignKey: 'related_field'
    })

    inquiryModel.belongsTo(relatedFieldModel, {
        foreignKey: 'related_field',
        as: 'related_fields'
    })

    //
    sourceOfInvestigationModel.hasMany(inquiryModel, {
        as: 'source_of_investigations',
        foreignKey: 'source_of_investigation'
    })

    inquiryModel.belongsTo(sourceOfInvestigationModel, {
        foreignKey: 'source_of_investigation',
        as: 'source_of_investigations'
    })


    induiryTypesModel.hasMany(inquiryModel, {
        as: 'inquiry_types',
        foreignKey: 'inquiry_type_id'
    })

    inquiryModel.belongsTo(induiryTypesModel, {
        foreignKey: 'inquiry_type_id',
        as: 'inquiry_types'
    })


    inquiryModel.hasMany(connectedIinquiriesModel, {
        foreignKey: 'inquiry_id',
        as: 'inquiries',        
    })

    connectedIinquiriesModel.belongsTo(inquiryModel, {
        foreignKey: 'inquiry_id',
        as: 'inquiries'
    })

    
    inquiryModel.hasMany(connectedIinquiriesModel, {
        foreignKey: 'connected_inquiry_id',
        as: 'connected_inquirys',        
    })

    connectedIinquiriesModel.belongsTo(inquiryModel, {
        foreignKey: 'connected_inquiry_id',
        as: 'connected_inquirys'
    })


    currentSituationTypeActionModel.hasMany(currentSitationModel, {
        foreignKey: 'current_situation_type_action',
        as: 'current_situation_type_actions',        
    })

    currentSitationModel.belongsTo(currentSituationTypeActionModel, {
        foreignKey: 'current_situation_type_action',
        as: 'current_situation_type_actions'
    })


    // induiryTypesModel.hasMany(inquiryModel, {
    //     as: 'inquiry_types',
    //     foreignKey: 'inquiry_type_id'
    // })

    // inquiryModel.belongsTo(induiryTypesModel, {
    //     foreignKey: 'inquiry_type_id',
    //     as: 'inquiry_types'
    // })






    // relatedFieldModel.belongsTo(inquiryModel, {
    //     foreignKey: 'inquiry_id',
    //     targetKey:'id'
    // })


    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getRelatedField() {
        return await relatedFieldModel.findAll({
            order: [['name', 'ASC']]
        }
        )
    }

    /**
* .
* @param sort
* @return {Promise<*>}
*/
    async function getSourceOfInvestigation() {
        return await sourceOfInvestigationModel.findAll({
            order: [['name', 'ASC']]
        }
        )
    }



    /**
     * .
     * @param sort
     * @return {Promise<*>}
     */
    async function getDistricts() {
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
    async function getInquiryTypes() {
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
    async function getMalpracticeTypes() {
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
    async function getPositions() {
        return await positionsModel.findAll({
            order: [['sort_order', 'ASC']]
        }
        )
    }
    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function getCenters(districtId) {
        const whereObj = {}
        if (districtId) {
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
    async function getLeisonOfficers(inquiryId) {
        const whereObj = {}
        if (inquiryId) {
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
    async function addInquiry(data) {
        // console.log(data)
        return inquiryModel.create(data);
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function updateInquiry(data) {
        const currentInquiryRecord = await inquiryModel.findOne({
            where: {
                inquiry_id: data.inquiry_id
            }
        });
        data.file_no = currentInquiryRecord.file_no
        data.file_start_date = currentInquiryRecord.file_start_date
        data.file_name = currentInquiryRecord.file_name
        data.file_start_reason = currentInquiryRecord.file_start_reason
        let merged = { ...currentInquiryRecord.dataValues, ...data };
        console.log(merged);
        await inquiryModel.update(merged, { where: { inquiry_id: data.inquiry_id } });
        return await inquiryModel.findOne({ where: { inquiry_id: data.inquiry_id } });
    }

    async function updateBasicInformationInquiry(data) {
        let currentInquiryRecord = await inquiryModel.findOne({
            where: {
                inquiry_id: data.inquiry_id
            }
        });
        currentInquiryRecord.file_no = data.file_no
        currentInquiryRecord.file_start_date = data.file_start_date
        currentInquiryRecord.file_name = data.file_name
        currentInquiryRecord.file_start_reason = data.file_start_reason

        let merged = { ...currentInquiryRecord.dataValues };
        await inquiryModel.update(merged, { where: { inquiry_id: data.inquiry_id } });
        return await inquiryModel.findOne({ where: { inquiry_id: data.inquiry_id } });
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function getInquiries(searchParams) {
        const offset = searchParams.offset
        const limit = searchParams.limit

        const whereObj = {}
        if (searchParams.inquiry_type_id != null) {
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

    async function getInquiriesByFileNo(searchParams) {
        const offset = searchParams.offset
        const limit = searchParams.limit
        const { Op } = require("sequelize");

        console.log(searchParams.file_no);
        let whereObj = {
            file_no: {}
        }
        if (searchParams.file_no != null) {
            whereObj.file_no = {
                [Op.like]: '%' + searchParams.file_no + '%',
            }
        }
        return await inquiryModel.findAll({
            attributes: ['inquiry_id', 'inquiry_type_id', 'file_no', 'file_start_date'],
            where: whereObj,
            offset: offset,
            include: [{ model: induiryTypesModel, as: "inquiry_types" }],
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
    async function getInquiry(inquiryId) {
        return await inquiryModel.findOne({
            where: {
                inquiry_id: inquiryId
            },
            include: [
                // {model: currentSitationModel,
                //     as:"current_situation"},
                { model: positionsModel, as: "positions" },
                { model: sourceOfInvestigationModel, as: "source_of_investigations" },
                { model: relatedFieldModel, as: "related_fields" },
                // {model: otherLeisonOfficersModel,
                //     as: "other_liaison_officers"}
            ]
        })
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function AddLeisonOfficers(data) {
        data.liaison_officers.forEach(function (itm) {
            itm.inquiry_id = data.inquiry_id;
        });
        return await otherLeisonOfficersModel.bulkCreate(data.liaison_officers)
    }

    /**
     * .
     * @param districtId
     * @return {Promise<*>}
     */
    async function addCurrentSituation(data) {
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
    async function getCurrentSituationInquiry(inquiryId) {
        const whereObj = {}
        if (inquiryId) {
            whereObj.inquiry_id = inquiryId
        }
        return await currentSitationModel.findAll({
            where: whereObj,
            include: [
                {model:currentSituationTypeActionModel, as: "current_situation_type_actions"}
            ],
            order: [['current_situation_date', 'DESC']]
        })
    }
    


    async function getConnectedInquirie(data) {
        // console.log(data)
        return await connectedIinquiriesModel.findAll({
            where: {
                inquiry_id: data.inquiry_id,
                status: 1
            }, include: [
                // {model: currentSitationModel,
                //     as:"current_situation"},
                { model: inquiryModel, as: "inquiries", attributes:['inquiry_id','file_no'],include: [{ model: induiryTypesModel, as: "inquiry_types",attributes:['name'] }] },
                { model: inquiryModel, as: "connected_inquirys" , attributes:['inquiry_id','file_no'],include: [{ model: induiryTypesModel, as: "inquiry_types",attributes:['name'] }]},
            ]
            
        });
    }


    async function addConnectedInquirie(data) {
        // console.log(data)
        return connectedIinquiriesModel.create(data);
    }

    async function removeConnectedInquirie(data) {
        // console.log(data)
        let connectedInquirieRecord = await connectedIinquiriesModel.findOne({
            where: {
                id: data.id
            }
        });
        connectedInquirieRecord.status = 0;
        await connectedIinquiriesModel.update(connectedInquirieRecord, { where: { id: data.id } });
        return await connectedIinquiriesModel.findOne({ where: { id: data.id } });
    }




    return {
        getDistricts: getDistricts,
        getCenters: getCenters,
        getInquiryTypes: getInquiryTypes,
        getMalpracticeTypes: getMalpracticeTypes,
        getPositions: getPositions,
        addInquiry: addInquiry,
        updateInquiry: updateInquiry,
        getInquiries: getInquiries,
        getInquiry: getInquiry,
        addCurrentSituation: addCurrentSituation,
        AddLeisonOfficers: AddLeisonOfficers,
        getLeisonOfficers: getLeisonOfficers,
        getCurrentSituationInquiry: getCurrentSituationInquiry,
        updateBasicInformationInquiry: updateBasicInformationInquiry,
        getRelatedField: getRelatedField,
        getSourceOfInvestigation: getSourceOfInvestigation,
        getInquiriesByFileNo: getInquiriesByFileNo,
        addConnectedInquirie: addConnectedInquirie,
        getConnectedInquirie: getConnectedInquirie,
        removeConnectedInquirie: removeConnectedInquirie

    }
}
