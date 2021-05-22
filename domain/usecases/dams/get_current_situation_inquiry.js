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
	 async function getCurrentSituationInquiry(inquiryId) {
		 try {
			 const leisonOfficers = await damsRepository.getCurrentSituationInquiry(inquiryId)
			 return leisonOfficers
		 }catch(err){
			 throw err
		 }
 
	 }
 
	 return {
		getCurrentSituationInquiry: getCurrentSituationInquiry
	 };
 };
 