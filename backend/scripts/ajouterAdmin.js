const bcrypt = require("bcrypt");
const utilisateur = require("../models/Utilisateur");

exports.checkAdmin = async () => {
  try {
    const exisitingUser = await utilisateur.findOne({ role: "admin" });
    if (!exisitingUser) {
      if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        console.log("Creation initiale ignoree : configurer ADMIN_EMAIL et ADMIN_PASSWORD.");
        return;
      }
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const newAdmin = new utilisateur({
        nom: "Super Admin",
        email: process.env.ADMIN_EMAIL,
        mot_de_passe: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      console.log("✅ Admin ajouté avec succès !");
    } else {
      console.log("ℹ️ Admin déjà existant.");
    }
  } catch (err) {
    console.error("❌ Erreur lors de la vérification/ajout de l'admin :");
  }
};
