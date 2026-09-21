const mongoose = require("mongoose");

//schema = التخطيط
const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  mot_de_passe: {
    type: String,
    required: true,
  },
  cin: {
    type: Number,
  },
  telephone: {
    type: Number,
  },
  adresse: {
    type: String,
  },
  role: {
    type: String,
    default: "student",
    enum: ["admin", "teacher", "student"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

let utilisateur = mongoose.model("utilisateur", utilisateurSchema);

module.exports = utilisateur;
