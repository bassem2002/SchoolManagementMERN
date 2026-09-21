import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";
import { FaUsers, FaEdit } from "react-icons/fa";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    niveau: "",
    eleves: [],
  });

  const [allEleves, setAllEleves] = useState([]);

  useEffect(() => {
    // Load group data
    const fetchGroup = async () => {
      try {
        const res = await adminServices.get_group_by_id(id); // recuperer data dans variable res
        setFormData({
          nom: res.data.nom,
          niveau: res.data.niveau,
          eleves: res.data.eleves.map((el) => el._id),
        });
      } catch (err) {
        toast.error("Failed to load group data." + err);
      }
    };

    // Load all students
    const fetchEleves = async () => {
      try {
        const res = await adminServices.get_users();
        // recuperer juste les utilisateurs de tupe student
        const students = res.data.filter((user) => user.role === "student");
        setAllEleves(students);
      } catch (err) {
        toast.error("Failed to load students." + err);
      }
    };

    fetchGroup();
    fetchEleves();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminServices.update_group(id, formData);
      toast.success("Groupe mis à jour avec succès !");
      navigate("/list_groups");
    } catch (err) {
      toast.error("Erreur lors de la mise à jour du groupe." + err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaUsers className="text-blue-600" /> Modifier le groupe
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
                  onChange={handleCheckboxChange}
                />
                <span>
                  {eleve.nom} - {eleve.email}
                </span>
              </label>
            ))}
          </div>

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
          <FaEdit /> Mettre à jour le groupe
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
