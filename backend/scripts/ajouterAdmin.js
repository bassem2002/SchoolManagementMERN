const bcrypt = require("bcrypt");
const utilisateur = require("../models/Utilisateur");

exports.checkAdmin = async () => {
  try {
    const exisitingUser = await utilisateur.findOne({ role: "admin" });
    if (!exisitingUser) {
      const hashedPassword = await bcrypt.hash("admin", 10); // mot de passe simple pour test

      const newAdmin = new utilisateur({
        nom: "Super Admin",
        email: "admin@gmail.com",
        mot_de_passe: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      console.log("✅ Admin ajouté avec succès !");
    } else {
      console.log("ℹ️ Admin déjà existant.");
    }
  } catch (err) {
    console.error("❌ Erreur lors de la vérification/ajout de l'admin :", err);
  }
};
