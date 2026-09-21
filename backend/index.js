const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { checkAdmin } = require("./scripts/ajouterAdmin");

// les routes
const authRouter = require("./routes/authRoutes");
const matiereRouter = require("./routes/matiereRoutes");
const salleRouter = require("./routes/salleRoutes");
const groupRoutes = require("./routes/groupRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const documentsRoutes = require("./routes/documentRoutes");
const userRoutes = require("./routes/utlisateurRoutes");
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
  })
);
app.use(express.json());

// =====> ca c'est l api (groupe des endpoints )
app.use("/api/auth", authRouter);
app.use("/api/matiere", matiereRouter);
app.use("/api/salle", salleRouter);
app.use("/api/group", groupRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/users", userRoutes);

app.use("/uploads", express.static("uploads")); // permet d'accéder aux fichiers uploadés

// localhost:3000/api/auth/register
// localhost:3000/api/auth/login

checkAdmin();

// express file static serve

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ya express js , asna3li url ki n7ot fih esm fichier , ywalli afficheir fi navugateur
// app.use(express.static(path.join(__dirname, "uploads"))); // permet d'accéder aux fichier
// localhost:3000/uploads/1753738288488-lettre_Farah_TEBOURSKI.pdf

mongoose
  .connect("mongodb://localhost:27017/projet")
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    // Lancer le serveur SEULEMENT après que MongoDB soit connecté
    app.listen(3000, () =>
      console.log("🚀 Serveur en marche sur http://localhost:3000")
    );
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });
// express static serve
