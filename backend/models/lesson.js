const mongoose = require("mongoose");
const salle = require("./salle");
const group = require("./group");
const matiere = require("./matiere");

const lessonSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    heure_debut: {
      type: String,
      required: true,
    },
    heure_fin: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "cours",
      Enum: ["cours", "TP", "TD", "Exam"],
    },
    // le sttaus d'une séance est soit "en cours", "terminé" ou "annulé" ou "reporté"
    status: {
      type: String,
      default: "scheduled",
      Enum: ["scheduled", "cancelled", "done", "postponed"],
    },
    // [] signifie c'est un tableau de bla bla
    salle: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: salle,
      required: false,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: group,
    },
    professeur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "utilisateur", // ou "Professeur" si tu as un modèle séparé
      required: true,
    },
    matiere_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "matiere", // ou "Professeur" si tu as un modèle séparé
      required: true,
    },
  },
  { timestamps: true }
  // ajouter createdAt + updatedAt
);

let lesson = mongoose.model("lesson", lessonSchema);
module.exports = lesson;
