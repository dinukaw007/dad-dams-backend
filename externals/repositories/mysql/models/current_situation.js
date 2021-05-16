'use strict'

const { DataTypes } = require('sequelize')

const name = 'current_situation'

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inquiry_id: DataTypes.INTEGER,
    current_situation_type_of_action: DataTypes.STRING,
    current_situation_date: DataTypes.DATE,
    current_situation_action_taken: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,

}


/**
 *
 * @param dbAdapter
 * @return {Model}
 */
module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema)
}
