import React from "react";
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function StudentSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Student Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex flex-col justify-between h-full">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => navigate("/student_calendar")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiHome className="mr-3 text-lg" />
              <span>Calendrier</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/student_subjects")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaFileAlt className="mr-3 text-lg" />
              <span>Mes matieres</span>
            </button>
          </li>
          {/* Mes Documents */}
        </ul>

        {/* Déconnexion */}
        <ul className="space-y-2 border-t border-gray-700 pt-4">
          <li>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors text-red-400"
            >
              <FiLogOut className="mr-3 text-lg" />
              <span>Déconnexion</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default StudentSidebar;
