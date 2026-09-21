const Matiere = require("../models/matiere");
const lesson = require("../models/lesson");
const createMatiere = async (matiereData) => {
  const existingMatiere = await Matiere.findOne({
    nomMatiere: matiereData.nomMatiere,
  });

  if (existingMatiere) {
    throw new Error("matiére déja existe");
  }

  const newMatiere = new Matiere({
    nomMatiere: matiereData.nomMatiere,
    coefficient: matiereData.coefficient,
    semestre: matiereData.semestre,
    description: matiereData.description,
  });
  return await newMatiere.save();
};

const getMatiere = async (id) => {
  let matiere = await Matiere.findById(id);
  return matiere;
};

const updateMatiere = async (id, matiereData) => {
  const matiere = await Matiere.findByIdAndUpdate(
    id,
    matiereData, // change les donnéss
    { new: true } // retourne la version mise à jour
  );

  if (!matiere) {
    throw new Error("matiére non trouvé ");
  }
  return matiere;
};

// matieredata ?
const deleteMatiere = async (id) => {
  const deleted = await Matiere.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Matière non trouvée pour suppression");
  }
  return deleted;
};

const getAllMatieres = async () => {
  let matiere = await Matiere.find();
  return matiere;
};

const getStudentSubjects = async (id) => {
  // id id student
  /*
 id student ==>  
 cette fonction permet de gangner le temp , car elle retourne les matiere de l'etudiant suivant son id 
*/

  let students_lessons = (
    await lesson.find().populate("matiere_id").populate("group")
  ).filter(
    (el) => el.group && el.group.eleves.map(String).includes(String(id))
  );

  let unique_student_lessons = students_lessons.filter(
    (lesson, index, self) =>
      index ===
      self.findIndex(
        (l) => String(l.matiere_id._id) === String(lesson.matiere_id._id)
      )
  );
  // bech ywalli tableau de matiere !
  return unique_student_lessons.map((el) => el.matiere_id);
};

const getTeacherSubjects = async (id) => {
  let teacher_lessons = (
    await lesson.find().populate("matiere_id").populate("group")
  ).filter((el) => el.professeur_id == id);

  let unique_teacher_lessons = teacher_lessons.filter(
    (lesson, index, self) =>
      index ===
      self.findIndex(
        (l) => String(l.matiere_id._id) === String(lesson.matiere_id._id)
      )
  );
  // bech ywalli tableau de matiere !
  return unique_teacher_lessons.map((el) => el.matiere_id);
};

module.exports = {
  createMatiere,
  getMatiere,
  updateMatiere,
  deleteMatiere,
  getAllMatieres,
  getStudentSubjects,
  getTeacherSubjects,
};
