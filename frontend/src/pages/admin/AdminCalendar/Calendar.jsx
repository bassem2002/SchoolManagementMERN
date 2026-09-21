import { useEffect, useState } from "react";
import AdminServices from "../../../services/adminServices.js";
import WeekCalendar from "./WeekCalendar";
import SessionsModal from "./SessionsModal";
import {motion} from 'framer-motion'
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiGrid,
  FiList,
} from "react-icons/fi";

const daysInWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedSession, setSelectedSession] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [calendarType, setCalendarType] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = startOfMonth.getDay() === 0 ? 6 : startOfMonth.getDay() - 1; // Adjust for Monday start
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (sessionForDay) => {
    setSelectedSession(sessionForDay);
    setIsModalOpen(true);
  };

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split("T")[0];
    const isCurrentMonth = day > 0 && day <= daysInMonth;
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    const sessionsForDay = sessions.filter(
      (e) => e.date.split("T")[0] === dateString
    );

    return (
      <motion.div
        key={i}
        className={`h-32 border border-gray-200 p-1 relative transition-colors
          ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
          ${isToday ? "ring-2 ring-blue-500" : ""}
          hover:bg-gray-50`}
        whileHover={{ scale: 1.02 }}
      >
        <div
          className={`absolute top-1 left-1 p-1 rounded-full w-6 h-6 flex items-center justify-center
          ${isToday ? "bg-blue-500 text-white" : "text-gray-700"}`}
        >
          {isCurrentMonth ? day : ""}
        </div>
        {sessionsForDay.length > 0 ? (
          <motion.div
            className="flex flex-col h-full pt-8 cursor-pointer"
            onClick={() => handleDayClick(sessionsForDay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex-1 bg-blue-100 rounded-lg p-2 overflow-hidden">
              <div className="text-xs font-medium text-blue-800 truncate">
                {sessionsForDay.length} séance
                {sessionsForDay.length > 1 ? "s" : ""}
              </div>
              {sessionsForDay.slice(0, 2).map((session, idx) => (
                <div key={idx} className="text-xs text-blue-600 truncate mt-1">
                  {session.matiere_id?.nomMatiere}
                </div>
              ))}
              {sessionsForDay.length > 2 && (
                <div className="text-xs text-blue-500 mt-1">
                  +{sessionsForDay.length - 2} plus
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="h-full pt-8"></div>
        )}
      </motion.div>
    );
  });

  useEffect(() => {
    const GetSessions = async () => {
      try {
        setIsLoading(true);
        const result = await AdminServices.get_all_lessons();
        setSessions(result.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    GetSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-2xl font-bold">Calendrier</h1>
        <p className="text-blue-100">
          {calendarType ? "Vue par semaine" : "Vue par mois"}
        </p>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <motion.button
            onClick={() => setCalendarType(!calendarType)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {calendarType ? (
              <>
                <FiGrid className="text-blue-600" />
                <span>Vue Mois</span>
              </>
            ) : (
              <>
                <FiList className="text-blue-600" />
                <span>Vue Semaine</span>
              </>
            )}
          </motion.button>

          {!calendarType && (
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handlePreviousMonth}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft className="text-gray-700" />
              </motion.button>
              <h2 className="text-xl font-semibold text-gray-800">
                {startOfMonth.toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <motion.button
                onClick={handleNextMonth}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className="text-gray-700" />
              </motion.button>
            </div>
          )}
        </div>

        {!calendarType && (
          <>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysInWeek.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-600 py-2 bg-gray-100 rounded"
                >
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
          </>
        )}

        {calendarType && <WeekCalendar allLessons={sessions} />}

        {isModalOpen && (
          <SessionsModal
            initialSessions={selectedSession}
            onClose={() => {
              setIsModalOpen(false);
              // Optional: Add refresh logic here if needed
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
