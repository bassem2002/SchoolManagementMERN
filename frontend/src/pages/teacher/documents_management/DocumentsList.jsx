import React, { useEffect, useState } from "react";
//import adminServices from "../../../services/adminServices"; // adapte selon ton projet
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import teacherServices from "../../../services/teacherServices";
import { useSelector } from "react-redux";
import adminServices from "../../../services/adminServices";

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchDocs = async () => {
      if (user.role == "teacher") {
        try {
          const res = await teacherServices.get_teacher_documents(
            user._id // id de l'enseignant
          ); // crée ce service si besoin
          setDocuments(res.data);
        } catch (err) {
          toast.error("Erreur lors du chargement des documents." + err);
        }
      } else if (user.role == "admin") {
        try {
          const res = await adminServices.get_all_documents();

          setDocuments(res.data);
        } catch (err) {
          toast.error("Erreur lors du chargement des documents." + err);
        }
      }
    };

    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce document ?")) return;
    try {
      await teacherServices.delete_document(id);
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      toast.error("Erreur lors de la suppression." + err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FaFilePdf className="text-red-600" /> Liste des documents
      </h2>

      {documents.length === 0 ? (
        <p className="text-center text-gray-500">Aucun document trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border"
            >
              <div className="p-4">
                <h1 className="text-lg font-semibold text-blue-800">
                  Matiere : {doc.matiere_id.nomMatiere}
                </h1>
                <h6 className="text-sm font-semibold text-blue-800">
                  Titre du document : {doc.titre}
                </h6>
                <p className="text-sm text-gray-600">Type : {doc.type}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Professeur : {doc.professeur_id.nom}
                </p>
                {doc.fichier ? (
                  <iframe
                    src={`http://localhost:3000/uploads/${doc.fichier}`}
                    title={doc.titre}
                    className="w-full h-64 border rounded"
                  ></iframe>
                ) : (
                  <div className="text-sm text-red-500 italic mt-2">
                    Aucun fichier PDF
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-yellow-600"
                    onClick={() => navigate(`/Update_document/${doc._id}`)}
                  >
                    <FaEdit /> Modifier
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700"
                    onClick={() => handleDelete(doc._id)}
                  >
                    <FaTrash /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsList;
