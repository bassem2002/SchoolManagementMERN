import React from "react";
import {
  FiUsers,
  FiFolder,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiHome,
  FiTablet,
} from "react-icons/fi";
import { FaUserShield, FaUsersCog, FaFileAlt } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate("/admin_dashboard")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiHome className="mr-3 text-lg" />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/admin_calendar")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiUsers className="mr-3 text-lg" />
              <span>Calendrier</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/list_users")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiUsers className="mr-3 text-lg" />
              <span>Gestion des Utilisateurs</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/list_groups")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RiGroupLine className="mr-3 text-lg" />
              <span>Gestion des Groupes</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/list_rooms")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiHome className="mr-3 text-lg" />
              <span>Gestion des salles</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/list_matiere")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiTablet className="mr-3 text-lg" />
              <span>Gestion des matieres</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/list_lessons")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiCalendar className="mr-3 text-lg" />
              <span>Gestion des Séances</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/documents_list")}
              className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaFileAlt className="mr-3 text-lg" />
              <span>Gestion des Documents</span>
            </button>
          </li>
        </ul>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <ul className="space-y-2">
            <li>
              <a className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors text-red-400">
                <FiLogOut className="mr-3 text-lg" />
                <button onClick={() => dispatch(logout())}>Déconnexion</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default AdminSidebar;
