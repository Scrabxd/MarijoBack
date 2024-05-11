const express = require('express')
const dotenv = require('dotenv').config()
const { check } = require('express-validator');
const cors = require('cors')

const datab = require('./dbmodel');
const Asistencia = require('./asistenciaModel')
const validator = require('./validator')
const Ip = require('./Ip');
const { Op } = require('sequelize');

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(cors({
    origin:"marijovxs.vercel.app"
}))

app.post('/getListaInv',async(req,res) => {
    return res.json(await Asistencia.findAll())
})

app.post('/asistencia', [ check('nombre1','El nombre es requerido es lo unico >:C').notEmpty().isString(),check('ip','Ip no valida.').isIP(), validator] , async(req,res) => {

    const {nombre1,nombre2, ip} = req.body
    const newName = nombre1.toLowerCase()
    let newName2 = null
    let nameToCheck2 = null

    if(nombre2 !== undefined){

        newName2 = nombre2.toLowerCase()

        nameToCheck2 = Array.from(
            new Set(
                nombre2.split('').filter(item => item !== ' ')
            )
        ).join('').toLowerCase()
    }

    const nameToCheck = Array.from(
        new Set(
            nombre1.split('').filter(item => item !== ' ')
        )
    ).join('').toLowerCase()


    
    try {
        const findIp = await Ip.findOne({
            where:{
                ip
            }
        })
    
        if (findIp) {
            return res.status(415).json({
                status:415,
                msg:"Nel pa, ip registrada"
            })
        }

        const [createAsistenciaR, createIp] = await Promise.all([
            Asistencia.findOrCreate({
                where: {
                    [Op.or]: [
                        { nameToCheck: nameToCheck },
                        { nameToCheck2: nameToCheck2 }
                    ]
                },
                defaults: {
                    nombre1: newName,
                    nombre2: newName2,
                    nameToCheck: nameToCheck,
                    nameToCheck2: nameToCheck2
                }
            }),
            Ip.create({
                ip,
                belongsTo: null 
            })
        ]);
        
        const [createAsistencia, created] = createAsistenciaR;

    
        if(!created){
            return res.status(400).json({
                MSG: "Ya estas invitado!",
                status:400
            })
        }

        const {id} = createAsistencia


        Ip.update({
            belongsTo: id
        },{where:{
            id: createIp["id"]
        }})


        console.log({
            msg:"asistencia creada!",
            status:200,
            createAsistencia
        })
    
        return res.status(200).json({
            MSG:"Asistencia creada!",
            status:200,
            createAsistencia
        })
    } catch (error) {
        console.log(error)
        
        return res.json(error)
    }
})

const authenticate = async() => {
    try {
        await datab.authenticate();
    } catch (error) {
        console.log(error)
    }
}


authenticate()

app.listen( port , () => {
    console.log(`Servidor corriendo en el puerto ${port}` )
})