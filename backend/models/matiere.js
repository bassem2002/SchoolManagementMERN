const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema({
  nomMatiere: {
    type: String,
    required: true,
  },

  coefficient: {
    type: Number,
    required: true,
  },

  semestre: {
    type: Number,
    default: "1",
    Enum: ["1", "2"],
  },

  description: {
    type: String,
  },
});
let matiere = mongoose.model("matiere", matiereSchema);
module.exports = matiere;
/*

clé etranger : 
 type: mongoose.Schema.Types.ObjectId,
    ref: 'Classe', // Assure-toi que le modèle des classes s'appelle bien "Classe"
    required: true
*/
/*
{
  nom_matiere: "Mathématiques",
  description: "Cours de base sur l’algèbre et l’analyse",
  coefficient: 3,
  classe_id: ObjectId("..."),
  prof_idzzz: ObjectId("..."),
  semestre: 1,}
*/
