import { User } from "lucide-react";

export default function Equipe() {
  const equipe = [
    {
      nom: "Pr. Ahmed Ben Ali",
      role: "Directeur",
      description:
        "Responsable de la direction générale et de la stratégie de l’école.",
      image: "https://via.placeholder.com/150",
    },
    {
      nom: "Mme. Sara Trabelsi",
      role: "Professeur de Mathématiques",
      description:
        "Spécialiste en algèbre et analyse, passionnée par l’enseignement.",
      image: "https://via.placeholder.com/150",
    },
    {
      nom: "M. Youssef Gharbi",
      role: "Professeur d’Informatique",
      description: "Expert en développement web, bases de données et réseaux.",
      image: "https://via.placeholder.com/150",
    },
    {
      nom: "Mme. Ons Kacem",
      role: "Professeur de Physique",
      description:
        "Encadre les élèves dans les sciences expérimentales et appliquées.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-green-600 to-green-400 text-white">
        <h1 className="text-4xl font-bold mb-4">Notre Équipe</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Découvrez les enseignants et responsables qui accompagnent nos élèves
          au quotidien.
        </p>
      </section>

      {/* Liste équipe */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipe.map((person, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 text-center transition"
          >
            {person.image ? (
              <img
                src={person.image}
                alt={person.nom}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-gray-500" size={40} />
              </div>
            )}
            <h3 className="font-bold text-xl mb-1">{person.nom}</h3>
            <p className="text-blue-600 font-medium mb-2">{person.role}</p>
            <p className="text-gray-600 text-sm">{person.description}</p>
          </div>
        ))}
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
