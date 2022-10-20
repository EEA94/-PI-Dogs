// const axios = require('axios');
// const {API_KEY} = process.env;
// require('dotenv').config();
const {getApiInfo, getAllDogs} = require('../services')
const { Dog, Temperament} = require('../db')



const dogs = async(req,res)=>{
    const {name} = req.query;
    const data = await getAllDogs();

    if(name){
        const nameFiltered = data.filter(e => 
            e.name.toLowerCase().includes(name.toLowerCase()))
        nameFiltered.length ?
        res.status(200).send(nameFiltered) :
        res.send(['Dog not found'])
    }
    else{
        res.status(200).send(data)
    }
}

const temperament = async (req,res)=>{
    const dataApi = await getApiInfo();
    const tempsArray = dataApi.map(dog => dog.temperament)
    const tempsFiltered = [...new Set(tempsArray.flat())].filter(temp => 
        temp!=undefined)
    
    tempsFiltered.forEach(t => 
        Temperament.findOrCreate({
            where: {name: t}
        }))
    const allTemps = await Temperament.findAll();
    res.send(allTemps)
}

const dogPost = async (req,res)=>{
const {name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span,
    temperament,
    image} = req.body;

const dogFormat = {
    name,
    weight: `${weight_min} - ${weight_max}`,
    height: `${height_min} - ${height_max}`,
    life_span: `${life_span} years`,
    image
}
const tempDb = await Temperament.findAll({
    where:{
        name: temperament
    }
})
const dogCreated = await Dog.create(dogFormat)
dogCreated.addTemperament(tempDb)
res.send("Dog created successfuly")
}

const dogId = async (req,res)=>{
const { id } = req.params;
const allDogs = await getAllDogs();
    if(id){
        const filteredById = allDogs.filter(e => e.id == id)
        filteredById.length ?
        res.status(200).json(filteredById) :
        res.status(404).send("Id not found")
    }
}

module.exports = {
    dogs,
    dogId,
    dogPost,
    temperament,
}