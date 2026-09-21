import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaBuilding,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [lesson, setLesson] = useState({
    date: "",
    heure_debut: "",
    heure_fin: "",
    type: "cours",
    salle: "",
    group: "",
    professeur_id: "",
    matiere_id: "",
  });

  const [groupes, setGroupes] = useState([]);
  const [salles, setSalles] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [profs, setProfs] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [lessonRes, groupesRes, sallesRes, matieresRes, profsRes] =
        await Promise.all([
          adminServices.get_lesson_by_id(id),
          adminServices.get_all_groups(),
          adminServices.get_all_salles(),
          adminServices.get_all_matieres(),
          adminServices.get_users(),
        ]);

      const lessonData = lessonRes.data;
      setLesson({
        date: lessonData.date.slice(0, 10),
        heure_debut: lessonData.heure_debut,
        heure_fin: lessonData.heure_fin,
        type: lessonData.type,
        salle: lessonData.salle?._id || "",
        group: lessonData.group?._id || "",
        professeur_id: lessonData.professeur_id?._id || "",
        matiere_id: lessonData.matiere_id?._id || "",
      });

      setGroupes(groupesRes.data);
      setSalles(sallesRes.data);
      setMatieres(matieresRes.data);
      setProfs(profsRes.data.filter((u) => u.role === "teacher"));
    } catch (error) {
      toast.error(
        "Erreur de chargement des données: " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
      navigate("/list_lessons");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await adminServices.update_lesson(id, lesson);
      toast.success("Leçon mise à jour avec succès ✅");
      navigate("/list_lessons");
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Erreur lors de la mise à jour";

      if (errorMsg.includes("Conflit")) {
        toast.error(`❌ ${errorMsg}`);
      } else {
        toast.error(`⚠️ ${errorMsg}`);
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/list_lessons")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft /> Retour
        </button>
      </div>
      <h2 className="mt-3 mb-3 text-2xl font-bold text-gray-800">
        Modifier la leçon
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" /> Date
            </label>
            <input
              type="date"
              name="date"
              value={lesson.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Time Fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaClock className="text-gray-500" /> Heure de début
            </label>
            <input
              type="time"
              name="heure_debut"
              value={lesson.heure_debut}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaClock className="text-gray-500" /> Heure de fin
            </label>
            <input
              type="time"
              name="heure_fin"
              value={lesson.heure_fin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Lesson Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type de leçon
            </label>
            <select
              name="type"
              value={lesson.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="cours">Cours</option>
              <option value="TP">TP</option>
              <option value="TD">TD</option>
              <option value="Exam">Examen</option>
            </select>
          </div>

          {/* Classroom */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaBuilding className="text-gray-500" /> Salle
            </label>
            <select
              name="salle"
              value={lesson.salle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="">-- Sélectionner une salle --</option>
              {salles.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Group */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUsers className="text-gray-500" /> Groupe
            </label>
            <select
              name="group"
              value={lesson.group}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="">-- Sélectionner un groupe --</option>
              {groupes.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.nom} ({g.niveau})
                </option>
              ))}
            </select>
          </div>

          {/* Professor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaChalkboardTeacher className="text-gray-500" /> Professeur
            </label>
            <select
              name="professeur_id"
              value={lesson.professeur_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="">-- Sélectionner un professeur --</option>
              {profs.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nom} ({p.email})
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaBook className="text-gray-500" /> Matière
            </label>
            <select
              name="matiere_id"
              value={lesson.matiere_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="">-- Sélectionner une matière --</option>
              {matieres.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.nomMatiere}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/list_lessons")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-6 py-2 rounded-md text-white font-medium transition ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enregistrement...
              </>
            ) : (
              <>
                <FaSave />
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;
