import { Music, Trophy, Users, Plane } from "lucide-react";

export default function VieScolaire() {
  const activites = [
    {
      icon: <Music size={32} />,
      title: "Clubs & Activités artistiques",
      description:
        "Des clubs de musique, théâtre et arts plastiques pour développer la créativité des élèves.",
    },
    {
      icon: <Trophy size={32} />,
      title: "Sports & Compétitions",
      description:
        "Football, basket-ball, athlétisme… Nos élèves participent à des compétitions locales et nationales.",
    },
    {
      icon: <Users size={32} />,
      title: "Associations & Vie citoyenne",
      description:
        "Engagez-vous dans des associations étudiantes pour développer l’esprit de solidarité et de citoyenneté.",
    },
    {
      icon: <Plane size={32} />,
      title: "Voyages & Sorties pédagogiques",
      description:
        "Des sorties culturelles, visites de musées et voyages éducatifs pour enrichir l’expérience scolaire.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white">
        <h1 className="text-4xl font-bold mb-4">Vie Scolaire</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Au-delà des cours, notre école propose un cadre dynamique où les
          élèves s’épanouissent à travers des activités variées.
        </p>
      </section>

      {/* Activités */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {activites.map((act, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 text-center transition"
          >
            <div className="text-purple-600 mb-4 flex justify-center">
              {act.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{act.title}</h3>
            <p className="text-gray-600 text-sm">{act.description}</p>
          </div>
        ))}
      </section>

      {/* Section événements récents */}
      <section className="bg-purple-50 py-12 px-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Événements récents
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/600x300"
              alt="Fête de fin d'année"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Fête de fin d’année</h3>
              <p className="text-gray-600">
                Un moment de partage et de célébration pour clôturer l’année
                scolaire avec nos élèves et enseignants.
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/600x300"
              alt="Compétition sportive"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Tournoi sportif</h3>
              <p className="text-gray-600">
                Nos équipes sportives ont participé au tournoi interscolaire
                avec de belles performances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>
          &copy; {new Date().getFullYear()} Notre École. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
