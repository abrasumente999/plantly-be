const {
  selectMyPlants,
  addMyPlants,
  selectMyPlantsById,
  deleteSelectedPlant,
} = require("../models/myPlants.models");
const { selectUserByUsername } = require("../models/users.models");
const { selectPlantsById } = require("../models/plants.models");
exports.getMyPlants = (req, res, next) => {
  const { username } = req.params;

  selectUserByUsername(username)
    .then(() => {
      return selectMyPlants(username);
    })
    .then((myPlants) => {
      res.status(200).send({ myPlants });
    })
    .catch(next);
};

exports.postMyPlants = (req, res, next) => {

  const { username, plant_id } = req.params;
  const { last_watered, nickname } = req.body;

  selectUserByUsername(username)
    .then(() => {
      return selectPlantsById(plant_id);
    })
    .then(() => {
      return addMyPlants(username, plant_id, last_watered, nickname);
    })
    .then((myPlant) => {
      res.status(201).send({ myPlant });
    })
    .catch(next);
};


exports.deleteMyPlant = (req, res, next) => {
  const { username, my_plant_id } = req.params;
  selectUserByUsername(username)
    .then(() => {
      return selectMyPlantsById(my_plant_id);
    })
    .then(() => {
      return deleteSelectedPlant( my_plant_id);
    })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};
