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
	 async function addConnectedInquirie(data) {
		 try { 		

			const inquiry_entry = {
				inquiry_id:data.inquiry_id,
				connected_inquiry_id:data.connected_inquiry_id
			}

			const connected_inquiry_entry = {
				inquiry_id:data.connected_inquiry_id,
				connected_inquiry_id:data.inquiry_id
			}

			 const addConnectedInquirie1 = await damsRepository.addConnectedInquirie(inquiry_entry)
			 const addConnectedInquirie2 = await damsRepository.addConnectedInquirie(connected_inquiry_entry)
			 return [addConnectedInquirie1,addConnectedInquirie2];
		 }catch(err){
			 throw err
		 }
 
	 }
 
	 return {
		addConnectedInquirie: addConnectedInquirie
	 };
 };
 