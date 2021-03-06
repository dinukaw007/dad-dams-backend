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

const DAMSController = require('./controllers/dams_controller');


/**
 *
 * routing configurations
 *
 * @version 1.0
 * @author  DTE Platform
 */

module.exports = (app) => {

    // constructor ___
    const damsController = DAMSController(app);

    // api info
    app.get('/', damsController.tester)
    app.get('/api/data/districts', damsController.getDistricts)
    app.get('/api/data/centers/:districtId', damsController.getCenters)
    app.get('/api/data/centers/', damsController.getCenters)
    app.get('/api/data/positions', damsController.getPositions)
    app.get('/api/data/inquirytypes', damsController.getInquiryTypes)
    app.get('/api/data/malpracticetypes', damsController.getMalpracticeTypes)
    app.post('/api/inquiry', damsController.createInquiry)
    app.put('/api/inquiry', damsController.updateInquiry)
    app.put('/api/inquiry/basic', damsController.inquiryBasicInformatinUpdate)
    app.post('/api/inquiry/addcurrentstate', damsController.addCurrentState)   
    app.post('/api/inquiry/addleisonofficerse', damsController.addLesisonOfficers)
    app.get('/api/inquiry', damsController.getInquiries)
    app.get('/api/inquiriesbyfileno', damsController.getInquiriesByFileNo)
    app.put('/api/inquiry/finalize', damsController.inquiryFinalize)
    app.get('/api/inquiry/:inquiryId', damsController.getInquiry)
    app.get('/api/inquiry/:inquiryId/leisonofficers', damsController.getLesisonOfficers)
    app.get('/api/inquiry/:inquiryId/currentsituation', damsController.getCurrentSituationInquiry)
    app.get('/api/data/relatedfield', damsController.getRelatedField)
    app.get('/api/data/sourceofinvestigation', damsController.getSourceOfInvestigation)
    app.get('/api/connectedinquirie', damsController.getConnectedInquirie)
    app.post('/api/connectedinquirie', damsController.addConnectedInquirie)
    app.put('/api/connectedinquirie/remove', damsController.addConnectedInquirie)
};
