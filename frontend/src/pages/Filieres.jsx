import {
  GraduationCap,
  Code,
  Briefcase,
  Scale,
  Stethoscope,
} from "lucide-react";

export default function Filieres() {
  const filieres = [
    {
      icon: <Code size={32} />,
      title: "Informatique",
      description:
        "Formation complète en développement, intelligence artificielle, réseaux et cybersécurité.",
    },
    {
      icon: <Scale size={32} />,
      title: "Droit",
      description:
        "Préparez-vous aux carrières juridiques grâce à un enseignement théorique et pratique.",
    },
    {
      icon: <Stethoscope size={32} />,
      title: "Médecine",
      description:
        "Programme d’excellence pour former les médecins de demain avec des stages hospitaliers.",
    },
    {
      icon: <Briefcase size={32} />,
      title: "Gestion & Économie",
      description:
        "Développez vos compétences en management, finance et entrepreneuriat.",
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Sciences Humaines",
      description:
        "Une formation axée sur la psychologie, la sociologie et les sciences sociales.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h1 className="text-4xl font-bold mb-4">Nos Filières</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Découvrez les différentes branches de formation disponibles dans notre
          faculté.
        </p>
      </section>

      {/* Liste des filières */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filieres.map((filiere, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 text-center transition"
          >
            <div className="text-blue-600 mb-4 flex justify-center">
              {filiere.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{filiere.title}</h3>
            <p className="text-gray-600">{filiere.description}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
     
      </footer>
    </div>
  );
}
