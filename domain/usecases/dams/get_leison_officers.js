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
	 async function getLeisonOfficers(inquiryId) {
		 try {
			 const leisonOfficers = await damsRepository.getLeisonOfficers(inquiryId)
			 return leisonOfficers
		 }catch(err){
			 throw err
		 }
 
	 }
 
	 return {
		getLeisonOfficers: getLeisonOfficers
	 };
 };
 