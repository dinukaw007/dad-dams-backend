'use strict'

const { DataTypes } = require('sequelize')

const name = 'other_liaison_officers'

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inquiry_id: DataTypes.INTEGER,
    other_liaison_officer_name: DataTypes.STRING,
    other_liaison_officer_position: DataTypes.INTEGER,
    other_liaison_officer_facts: DataTypes.STRING,
    other_liaison_officer_nic: DataTypes.STRING
}



/**
 *
 * @param dbAdapter
 * @return {Model}
 */
module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema)
}
