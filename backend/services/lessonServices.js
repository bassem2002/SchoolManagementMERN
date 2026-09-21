const group = require("../models/group");
const lesson = require("../models/lesson");
const { populate } = require("../models/salle");
const utilisateur = require("../models/Utilisateur");

const createLesson = async (data) => {
  const { date, heure_debut, heure_fin, salle, group, professeur_id } = data;

  // Vérifie les conflits de salle
  const salleConflict = await lesson.findOne({
    date,
    salle,
    // cette condition maaneha la leçon existante se chevauche avec celle qu’on veut créer.
    $or: [
      {
        heure_debut: { $lt: heure_fin }, // lt ? less then
        heure_fin: { $gt: heure_debut }, // greater then
      },
    ],
  });

  if (salleConflict) {
    throw new Error(
      "Cette salle est déjà occupée à cet horaire. Veuillez en choisir une autre."
    );
  }

  // Vérifie les conflits de groupe
  const groupConflict = await lesson.findOne({
    // cherches dans la base de données une leçon qui a le même groupe et la même date
    date,
    group,
    // Cette condition détecte si les heures se croisent
    $or: [
      //vérifie s’il y a chevauchement = تداخل  entre les horaires
      {
        heure_debut: { $lt: heure_fin },
        heure_fin: { $gt: heure_debut },
      },
    ],
  });

  if (groupConflict) {
    throw new Error(
      "Ce groupe a déjà une leçon à cet horaire. Veuillez en choisir un autre."
    );
  }

  // Vérifie les conflits de professeur
  const profConflict = await lesson.findOne({
    date,
    professeur_id,
    $or: [
      {
        heure_debut: { $lt: heure_fin },
        heure_fin: { $gt: heure_debut },
      },
    ],
  });

  if (profConflict) {
    throw new Error(
      "Ce professeur a déjà une leçon à cet horaire. Veuillez en choisir un autre."
    );
  }

  // Si tout est bon, créer la leçon
  const newLesson = new lesson({
    date,
    heure_debut,
    heure_fin,
    type: data.type,
    salle,
    group,
    professeur_id,
    matiere_id: data.matiere_id,
  });

  await newLesson.save();
};

const getLessons = async (id) => {
  let lessons = await lesson
    .findById(id)
    .populate("matiere_id")
    .populate("professeur_id")
    .populate("group")
    .populate("salle");
  return lessons;
};

const getAllLessons = async () => {
  let lessons = await lesson
    .find()
    .populate("matiere_id")
    .populate("professeur_id")
    .populate("group")
    .populate("salle");
  return lessons;
};

const updateLesson = async (id, data) => {
  const Lesson = await lesson.findByIdAndUpdate(id, data, { new: true });
  if (!Lesson) {
    throw new Error("Lesson not found"); // lesson non trouvé
  }
  return Lesson;
};
const deleteLesson = async (id) => {
  const deleted = await lesson.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Lesson not found"); // lesson non trouvé
  }
  return deleted;
};

const getLessonsByTeacherId = async (id) => {
  let lessons = await lesson
    .find({ professeur_id: id })
    .populate("matiere_id")
    .populate("professeur_id")
    .populate("group")
    .populate("salle");
  return lessons;
};

const lessonsByGroup = async (id) => {
  // id = id eleve
  // on doit chercher l'id de group dans lequel l'eleve ya9ra !!
  let studentGroup = await group.findOne({ eleves: id });
  let lessons = await lesson
    .find({ group: studentGroup._id })
    .populate("matiere_id")
    .populate("professeur_id")
    .populate("group")
    .populate("salle");
  return lessons;
};

module.exports = {
  createLesson,
  getLessons,
  getAllLessons,
  updateLesson,
  deleteLesson,
  getLessonsByTeacherId,
  lessonsByGroup,
};
