import React, { useState } from "react";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slices/authSlice";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.warn("Vous êtes déconnecté");
    setTimeout(() => {
      navigate("/connexion");
    }, 1500);
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src="https://img.freepik.com/premium-vector/school-clipart-cartoon-style-vector-illustration_761413-4334.jpg"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="ml-2 text-xl font-semibold text-gray-800">
            Plateforme école
          </span>
        </div>

        {/* User profile dropdown on the right */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src="https://cdn-icons-png.freepik.com/512/8664/8664801.png"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.nom}
            </span>
            <FiChevronDown
              className={`text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="mr-3" />
                Profile
              </a>
              <button
                onClick={() => handleLogout()}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLogOut className="mr-3" />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
