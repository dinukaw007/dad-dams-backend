'use strict'

const { DataTypes } = require('sequelize')

const name = 'liaison_officers'

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inquiry_id: DataTypes.INTEGER,
    liaison_officer_name: DataTypes.STRING,
    liaison_officer_position: DataTypes.INTEGER,
    liaison_officer_facts: DataTypes.STRING,
    liaison_officer_nic: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN,
    work_status: DataTypes.INTEGER   
}



/**
 *
 * @param dbAdapter
 * @return {Model}
 */
module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema)
}
