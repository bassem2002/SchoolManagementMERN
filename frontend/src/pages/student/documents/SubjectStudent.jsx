import React, { useEffect, useState } from "react";
import studentService from "../../../services/studentService";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SubjectStudent() {
  const [matieres, setMatieres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // navigate = fonction imératif pour naviguer entre les pages
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        setIsLoading(true);
        const res = await studentService.get_subjects_by_student_id(user._id);
        setMatieres(res.data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors du chargement des matières :", error);
        setError("Impossible de charger les matières");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatieres();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Matières étudiées
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 text-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg"
        >
          {error}
        </motion.div>
      ) : matieres.length > 0 ? (
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          <AnimatePresence>
            {matieres.map((matiere) => (
              <motion.li
                onClick={() => navigate(`/subject_documents/${matiere._id}`)}
                key={matiere._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {matiere.nomMatiere}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 text-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
        >
          Aucune matière trouvée pour ce groupe.
        </motion.div>
      )}
    </motion.div>
  );
}

export default SubjectStudent;
