const mongoose = require("mongoose");

const salleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
});
let salle = mongoose.model("salle", salleSchema);
module.exports = salle;
