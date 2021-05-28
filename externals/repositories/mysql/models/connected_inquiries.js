'use strict'

const { DataTypes } = require('sequelize')

const name = 'connected_inquirie'

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inquiry_id: DataTypes.INTEGER,
    connected_inquiry_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    
}
/**
 *
 * @param dbAdapter
 * @return {Model}
 */
module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema)
}
