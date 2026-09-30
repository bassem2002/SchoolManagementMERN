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
    select: false,
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

function removePassword(doc, ret) {
  delete ret.mot_de_passe;
  return ret;
}
utilisateurSchema.set("toJSON", { transform: removePassword });
utilisateurSchema.set("toObject", { transform: removePassword });

let utilisateur = mongoose.model("utilisateur", utilisateurSchema);

module.exports = utilisateur;
