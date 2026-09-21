import React, { useState, useEffect } from "react";
import {
  FiX,
  FiClock,
  FiBook,
  FiUser,
  FiUsers,
  FiHome,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiClock as FiPostponed,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import adminServices from "../../../services/adminServices.js";

function SessionsModal({ onClose, initialSessions }) {
  const [sessions, setSessions] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour < 10 ? "0" + hour : hour}:00`;
  });

  const isWithinInterval = (startTime, endTime, slotTime) => {
    return slotTime >= startTime && slotTime < endTime;
  };

  const statusOptions = [
    {
      value: "done",
      label: "Terminé",
      icon: FiCheckCircle,
      color: "text-green-500",
    },
    {
      value: "cancelled",
      label: "Annulé",
      icon: FiAlertCircle,
      color: "text-red-500",
    },
    {
      value: "postponed",
      label: "Ajourné",
      icon: FiPostponed,
      color: "text-yellow-500",
    },
  ];

  const getStatusDisplay = (status) => {
    switch (status) {
      case "scheduled":
        return { text: "À venir", color: "text-blue-500" };
      case "done":
        return { text: "Terminé", color: "text-green-500" };
      case "cancelled":
        return { text: "Annulé", color: "text-red-500" };
      case "postponed":
        return { text: "Ajourné", color: "text-yellow-500" };
      default:
        return { text: status, color: "text-gray-500" };
    }
  };

  useEffect(() => {
    if (initialSessions && Array.isArray(initialSessions)) {
      const mapped = initialSessions.map((s) => ({
        ...s,
        slot: `${s.heure_debut} - ${s.heure_fin}`,
      }));
      setSessions(mapped);
    }
  }, [initialSessions]);

  const handleChangeStatus = async (id, newStatus) => {
    try {
      setIsUpdating(true);
      await adminServices.update_lesson(id, { status: newStatus });
      setSessions(
        sessions.map((session) =>
          session._id === id ? { ...session, status: newStatus } : session
        )
      );
    } catch (error) {
      console.error("Error updating session:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FiCalendar className="text-blue-600" />
                Détails des Séances
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {sessions.length} séance{sessions.length !== 1 ? "s" : ""}{" "}
                programmée{sessions.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              aria-label="Fermer"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <motion.div
                  key={session._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getStatusDisplay(
                            session.status
                          ).color.replace("text", "bg")} bg-opacity-10`}
                        >
                          <FiBook className="text-lg" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {session.matiere_id?.nomMatiere}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <FiUser className="mr-2" />
                              {session.professeur_id?.nom}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FiUsers className="mr-2" />
                              {session.group?.nom} - {session.group?.niveau}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FiHome className="mr-2" />
                              Salle: {session.salle?.nom}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center mb-2">
                        <FiClock className="mr-2 text-blue-500" />
                        <span className="font-medium">
                          {session.heure_debut} - {session.heure_fin}
                        </span>
                      </div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusDisplay(session.status).color
                        } bg-opacity-10 ${getStatusDisplay(
                          session.status
                        ).color.replace("text", "bg")} bg-opacity-10`}
                      >
                        {getStatusDisplay(session.status).text}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Plage horaire:
                    </h4>
                    <div className="overflow-x-auto">
                      <div className="inline-flex border border-gray-200 rounded-lg overflow-hidden">
                        {timeSlots.map((slot, i) => (
                          <div
                            key={i}
                            className={`w-12 h-8 flex items-center justify-center text-xs border-r border-gray-200 last:border-r-0 ${
                              isWithinInterval(
                                session.heure_debut,
                                session.heure_fin,
                                slot
                              )
                                ? "bg-green-500 text-white"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            {isWithinInterval(
                              session.heure_debut,
                              session.heure_fin,
                              slot
                            )
                              ? "✓"
                              : ""}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modifier l'état:
                    </label>
                    <div className="relative">
                      <select
                        onChange={(e) =>
                          handleChangeStatus(session._id, e.target.value)
                        }
                        disabled={isUpdating}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Choisir un état...</option>
                        {statusOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className={`${option.color} font-medium`}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {isUpdating && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucune séance trouvée</p>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SessionsModal;
