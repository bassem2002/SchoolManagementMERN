import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, Phone } from "lucide-react";
import { useSelector } from "react-redux";

export default function Accueil() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h1 className="text-5xl font-bold mb-4">Bienvenue à Notre faculté</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Une institution dédiée à l’excellence académique et à la réussite des
          étudiant.
        </p>
        {!user && (
          <a
            href="/Connexion"
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition"
          >
            Connexion
          </a>
        )}
        {/* // ? :  */}
        {user && (
          <a
            href={
              user.role == "admin"
                ? "/list_users"
                : user.role == "student"
                ? "/student_calendar"
                : "/teacher_calendar"
            }
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition"
          >
            Acceuill
          </a>
        )}
      </section>

      {/* Présentation */}
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Qui sommes-nous ?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Notre faculté offre un enseignements de qualité, encadré par une
          équipe pédagogique passionnée. Nous mettons un point d’honneur à
          préparer nos étudiant à relever les défis de demain.
        </p>
      </section>

      {/* Services / Sections */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Nos Filières</h3>
          <p className="text-gray-600 mb-4">
            Découvrez nos différentes spécialités et programmes adaptés.
          </p>
          <Link
            to="/filieres"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Voir plus
          </Link>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Notre Équipe</h3>
          <p className="text-gray-600 mb-4">
            Rencontrez nos enseignants et le personnel administratif.
          </p>
          <Link
            to="/equipe"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
          >
            Voir l'équipe
          </Link>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Vie Scolaire</h3>
          <p className="text-gray-600 mb-4">
            Activités parascolaires, événements et projets éducatifs.
          </p>
          <Link
            to="/vie-scolaire"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition"
          >
            Explorer
          </Link>
        </div>
      </section>

      {/* Contact rapide */}
      <section className="bg-blue-50 py-12 px-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Besoin d’informations ?
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" size={28} />
            <p className="text-gray-700">+216 71 000 000</p>
          </div>
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10"></footer>
    </div>
  );
}
