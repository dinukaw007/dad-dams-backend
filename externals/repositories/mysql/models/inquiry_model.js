'use strict'

const { DataTypes } = require('sequelize')

const name = 'inquiry'

const schema = {
    inquiry_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    file_no: DataTypes.STRING,
    file_start_date: DataTypes.DATE,
    file_name: DataTypes.STRING,
    file_start_reason: DataTypes.STRING,
    inquiry_type_id: DataTypes.INTEGER,
    malpractice_type: DataTypes.INTEGER,
    name: DataTypes.STRING,
    nic: DataTypes.STRING,
    position: DataTypes.INTEGER,
    district: DataTypes.INTEGER,
    center: DataTypes.INTEGER,
    date_of_appointment: DataTypes.DATE,
    investigating_officer: DataTypes.INTEGER,
    officers_handling_the_complaint: DataTypes.STRING,
    is_report_submitted: DataTypes.BOOLEAN,
    submitted_date: DataTypes.DATE,
    amount_due: DataTypes.INTEGER,
    amount_charged: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    
    archived_date: DataTypes.DATE,
    work_done_date: DataTypes.DATE,
    is_sent_to_archive: DataTypes.INTEGER,
    is_work_done: DataTypes.INTEGER,
    source_of_investigation: DataTypes.INTEGER,
    related_field: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
}
/**
 *
 * @param dbAdapter
 * @return {Model}
 */
module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema)
}
