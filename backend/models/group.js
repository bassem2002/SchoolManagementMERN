const mongoose = require("mongoose");
const utilisateur = require("./Utilisateur");

const groupSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  niveau: { type: String, required: true },
  eleves: [
    { type: mongoose.Schema.Types.ObjectId, ref: utilisateur, required: true },
  ],
});
let group = mongoose.model("group", groupSchema);

module.exports = group;
