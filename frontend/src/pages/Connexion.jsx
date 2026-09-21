import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthMessages } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!password.trim()) newErrors.password = "mot de passe est requis";
    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "L'email est invalide";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        dispatch(loginUser({ email: email, mot_de_passe: password }));
      } catch (err) {
        console.error("Erreur de connexion :", err);
        alert("Email ou mot de passe incorrect");
      }
    }
  };

  const { user, msg, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (msg) {
      toast.success(msg);
      dispatch(resetAuthMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthMessages());
    }

    if (user) {
      if (user.role == "admin") {
        setTimeout(() => {
          navigate("/list_users");
        }, 2500);
      } else if (user.role == "teacher") {
        setTimeout(() => {
          navigate("/teacher_calendar");
        }, 2500);
      } else if (user.role == "student") {
        setTimeout(() => {
          navigate("/student_calendar");
        }, 2500);
      }
    }
  }, [error, msg, user, dispatch, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900">Connexion</h2>
            <p className="mt-2 text-sm text-gray-600">
              Bienvenue sur notre plateforme éducative
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaEnvelope className="inline mr-2 text-gray-400" />
                  Adresse e-mail
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaLock className="inline mr-2 text-gray-400" />
                  Mot de passe
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div
          className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-800 to-blue-600"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-white px-20">
          <h2 className="text-4xl font-bold mb-6">Bienvenue sur EduPlatform</h2>
          <p className="text-xl text-center mb-10">
            La plateforme d'apprentissage qui révolutionne l'éducation en ligne
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Cours interactifs</h3>
                <p>
                  Accédez à des centaines de cours avec des contenus interactifs
                  et engageants
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Communauté active</h3>
                <p>
                  Rejoignez une communauté d'apprenants et d'enseignants
                  passionnés
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Apprentissage sécurisé</h3>
                <p>
                  Vos données sont protégées et votre apprentissage est
                  confidentiel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
