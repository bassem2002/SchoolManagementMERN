import React, { useState, useEffect } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";
import adminServices from "../../../services/adminServices"; // adapte le chemin
import { toast } from "react-toastify";
const CreateGroup = () => {
  const [formData, setFormData] = useState({
    nom: "",
    niveau: "",
    eleves: [],
  });

  const [allEleves, setAllEleves] = useState([]);

  useEffect(() => {
    // Charger tous les élèves pour le multiselect
    const fetchEleves = async () => {
      try {
        const data = await adminServices.get_users(); // Crée cette méthode
        setAllEleves(data.data.filter((el) => el.role == "student"));
      } catch (error) {
        console.error("Erreur lors du chargement des élèves", error);
      }
    };

    fetchEleves();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const handleEleveSelect = (e) => {
  //     const selectedOptions = Array.from(e.target.selectedOptions);
  //     const selectedIds = selectedOptions.map((opt) => opt.value);
  //     setFormData((prev) => ({
  //       ...prev,
  //       eleves: selectedIds,
  //     }));
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServices.create_group(formData);
      toast.success("Groupe ajouté avec succès");
      setFormData({
        nom: "",
        niveau: "",
        eleves: [],
      });
    } catch (error) {
      toast.error("Erreur lors de l'ajout du groupe :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaUsers className="text-blue-600" /> Ajouter un groupe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nom du groupe
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: Groupe A"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Niveau</label>
          <input
            type="text"
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: 1ère année"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1 mb-2">
            Élèves
          </label>
          <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
            {allEleves.map((eleve) => (
              <label key={eleve._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={eleve._id}
                  checked={formData.eleves.includes(eleve._id)}
                  onChange={(e) => {
                    const id = e.target.value;
                    setFormData((prev) => {
                      const isSelected = prev.eleves.includes(id);
                      return {
                        ...prev,
                        eleves: isSelected
                          ? prev.eleves.filter((eid) => eid !== id)
                          : [...prev.eleves, id],
                      };
                    });
                  }}
                />
                <span>
                  {eleve.nom} - {eleve.email}
                </span>
              </label>
            ))}
          </div>

          {/* Affichage des élèves sélectionnés */}
          {formData.eleves.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Élèves sélectionnés :
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {allEleves
                  .filter((el) => formData.eleves.includes(el._id))
                  .map((el) => (
                    <li key={el._id}>
                      {el.nom} ({el.email})
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Ajouter le groupe
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
