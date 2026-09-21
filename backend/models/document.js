const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  fichier: {
    type: String, // nom du fichier uploadé (ex : "1699987845-document.pdf")
    required: false,
  },
  matiere_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "matiere",
    required: true,
  },

  type: {
    type: String,
    default: "cours",
    Enum: ["cours", "TP", "TD", "Exam"],
  },

  professeur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "utilisateur", // ou "Professeur" si tu as un modèle séparé
    required: true,
  },
});
const document = mongoose.model("document", documentSchema);
module.exports = document;
