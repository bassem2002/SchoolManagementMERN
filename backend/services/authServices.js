const utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/*
  const { nom, email, mot_de_passe, cin, telephone, adresse, role } = userData;

*/
const register = async (userData) => {
  console.log(userData);
  const existingUser = await utilisateur.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email déja utilisé");
  }

  const hashedPassword = await bcrypt.hash(userData.mot_de_passe, 10);
  const newUtilisateur = new utilisateur({
    nom: userData.nom,
    email: userData.email,
    mot_de_passe: hashedPassword,
    cin: userData.cin,
    telephone: userData.telephone,
    adresse: userData.adresse,
    role: userData.role,
  });

  // sauvgarde de l'utilisateur dans la base de données

  return await newUtilisateur.save();
};

const login = async (userData) => {
  const existingUser = await utilisateur.findOne({ email: userData.email });
  if (!existingUser) {
    throw new Error("Email n'existe pas ! ");
  }
  const isValidPassword = await bcrypt.compare(
    userData.mot_de_passe,
    existingUser.mot_de_passe
  );
  if (!isValidPassword) {
    throw new Error("Mot de passe incorrect !");
  }
  if (existingUser.status == "inactive") {
    throw new Error("compte desactivé !");
  }
  let payload = {
    _id: existingUser._id,
    role: existingUser.role,
    email: existingUser.email,
  };

  let token = jwt.sign(payload, "ter-155-art-1994-unbeaumoment-557");

  return { token: token, user: existingUser, message: "connected succefully" };
};

module.exports = {
  register,
  login,
};
