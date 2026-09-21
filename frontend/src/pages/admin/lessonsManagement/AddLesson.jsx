import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";
import {
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaBuilding,
  FaPlus,
  FaSave,
} from "react-icons/fa";

const AddLesson = () => {
  const [form, setForm] = useState({
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
  const [professeurs, setProfesseurs] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupRes, salleRes, profRes, matiereRes] = await Promise.all([
          adminServices.get_all_groups(),
          adminServices.get_all_salles(),
          adminServices.get_users(),
          adminServices.get_all_matieres(),
        ]);

        setGroupes(groupRes.data);
        setSalles(salleRes.data);
        setProfesseurs(profRes.data.filter((el) => el.role === "teacher"));
        setMatieres(matiereRes.data);
      } catch (err) {
        toast.error("Erreur lors du chargement des données : " + err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await adminServices.create_lesson(form);
      toast.success("Leçon ajoutée avec succès ✅");

      setForm({
        date: "",
        heure_debut: "",
        heure_fin: "",
        type: "cours",
        salle: "",
        group: "",
        professeur_id: "",
        matiere_id: "",
      });
    } catch (error) {
      console.error(error);
      const msg =
        error?.response?.data?.error || "Erreur inconnue lors de l'ajout.";

      if (
        msg.includes("Conflit de salle") ||
        msg.includes("groupe") ||
        msg.includes("professeur")
      ) {
        toast.error(`❌ Conflit détecté : ${msg}`);
      } else {
        toast.error(`⚠️ Erreur : ${msg}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FaPlus className="text-blue-600" />
          Ajouter une leçon
        </h2>
        <p className="text-gray-600 mt-2">
          Remplissez les détails de la nouvelle leçon
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" /> Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              value={form.heure_debut}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              value={form.heure_fin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              value={form.salle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              value={form.group}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">-- Sélectionner un groupe --</option>
              {groupes.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.nom} (Niveau: {g.niveau})
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
              value={form.professeur_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">-- Sélectionner un professeur --</option>
              {professeurs.map((p) => (
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
              value={form.matiere_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-8 py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <FaSave />
            {isSubmitting ? "Enregistrement..." : "Enregistrer la leçon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;
