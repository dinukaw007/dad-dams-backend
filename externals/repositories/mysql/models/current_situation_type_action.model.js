'use strict'

const { DataTypes } = require('sequelize')

const name = 'current_situation_type_action'

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
}
/**
 *
 * @param dbAdapter
 * @return {Model}
 */
module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema)
}
