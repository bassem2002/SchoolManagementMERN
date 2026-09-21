import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import studentService from "../../../services/studentService";
import { FaFilePdf, FaFileAlt, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function SubjectDocuments() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const result = await studentService.get_subject_documents(id);
        setDocuments(result.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    }
    fetchDocuments();
  }, [id]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="p-6">
      {user.role == "teacher" && (
        <div className="flex justify-end flex-end mb-5 ">
          <button
            onClick={() => navigate("/add_document", { state: id })}
            className="w-[10vw] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Ajouter un document
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Documents</h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">Aucun document trouvé.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-lg rounded-xl p-4 flex items-start gap-4 hover:shadow-xl transition cursor-pointer"
              onClick={() =>
                setPreviewFile(`http://localhost:3000/uploads/${doc.fichier}`)
              }
            >
              {doc.fichier?.toLowerCase().endsWith(".pdf") ? (
                <FaFilePdf className="text-red-500 text-4xl" />
              ) : (
                <FaFileAlt className="text-blue-500 text-4xl" />
              )}

              <div>
                <h3 className="font-bold text-lg">{doc.titre}</h3>
                <p className="text-sm text-gray-600">{doc.contenu}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 h-5/6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setPreviewFile(null)}
            >
              <FaTimes size={20} />
            </button>

            {/* File Preview */}
            {previewFile.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={previewFile}
                title="Document Preview"
                className="w-full h-full rounded-b-lg"
              />
            ) : (
              <img
                src={previewFile}
                alt="Preview"
                className="w-full h-full object-contain rounded-b-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectDocuments;
