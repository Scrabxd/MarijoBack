const { NUMBER,STRING } = require('sequelize')
const db = require('./dbmodel')
const Asistencia = require('./asistenciaModel')


const dbT = 'Ips_r'
const Ips = db.define(dbT, {
    id:{
        type:NUMBER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    ip: {
        type:STRING,
        allowNull:true
    },
    belongsTo:{
        type:STRING,
        allowNull:true
    }
},{

    freezeTableName:true,
    timestamps:false
})



Ips.belongsTo(Asistencia, {foreignKey:'id'})

module.exports = Ips