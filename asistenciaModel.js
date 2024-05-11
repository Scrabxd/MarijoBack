const { NUMBER,STRING } = require('sequelize')
const db = require('./dbmodel')


const dbT = 'Asistencia'
const Asistencia = db.define(dbT, {
    id:{
        type:NUMBER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nombre1: {
        type:STRING,
        allowNull:false
    },
    nombre2:{
        type:STRING,
        allowNull:true
    },
    nameToCheck:{
        type:STRING,
        allowNull:false
    },
    nameToCheck2:{
        type:STRING,
        allowNull:true
    }
},{

    freezeTableName:true,
    timestamps:false
})

module.exports = Asistencia