import { Phone, Globe, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Une question ? Besoin d’informations ? Notre équipe est là pour vous
          aider.
        </p>
      </section>

      {/* Infos de contact */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Téléphone</h3>
          <p className="text-gray-600">+216 71 000 000</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Site Web</h3>
          <a
            href="https://www.notre-ecole.tn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.notre-ecole.tn
          </a>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Email</h3>
          <p className="text-gray-600">contact@notre-ecole.tn</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={28} />
          </div>
          <h3 className="font-bold text-lg mb-2">Adresse</h3>
          <p className="text-gray-600">Rue de l'Éducation, Sfax, Tunisie</p>
        </div>
      </section>

      {/* Carte Google Map intégrée */}
      <section className="container mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Nous localiser
        </h2>
        <div className="w-full h-80 rounded-lg overflow-hidden shadow">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.6809!2d10.7522!3d34.7406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002cbafc91d0d5%3A0x123456789abcdef!2sSfax%2C%20Tunisie!5e0!3m2!1sfr!2stn!4v0000000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
       
      </footer>
    </div>
  );
}
