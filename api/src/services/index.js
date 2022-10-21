const axios = require("axios");
const { Dog, Temperament } = require("../db");
const {API_KEY} = require('../config.js')
require('dotenv').config();

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image.url,
        temperament: e.temperament?.split(", "),
        weight: e.weight.metric,
        height: e.height.metric,
        life_span: e.life_span,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("este es el error", error);
  }
};

const getDbInfo = async () => {
    const dbInfo = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const dbFormat = dbInfo.map((dog) => {
        const {
          id,
          name,
          Temperaments,
          image,
          weight,
          height,
          life_span,
          createdInDb,
        } = dog;
        const dogFormat = {
          id,
          name,
          temperament: Temperaments.map((t) => t.name),
          image,
          weight,
          height,
          life_span,
          createdInDb,
        };
        return dogFormat;
      });
      return dbFormat;
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  return [...apiInfo, ...dbInfo];
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllDogs,
};
