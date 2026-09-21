import React from "react";
import { Lock, ArrowLeft, Home, Mail } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Page 401 – Non autorisée
 * React + Tailwind CSS (JSX)
 *
 * Utilisation :
 *   <Unauthorized401 onBack={() => navigate(-1)} homeHref="/" contactHref="/contact" />
 */
export default function Unauthorized401({
  onBack,
  homeHref = "/",
  contactHref = "/contact",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        {/* Carte principale */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-slate-900/60 ring-1 ring-white/10 backdrop-blur">
          {/* Halo décoratif */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
          />

          <div className="flex flex-col items-center text-center gap-6 p-8 sm:p-12">
            {/* Icône */}
            <motion.div
              initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="grid place-items-center h-20 w-20 rounded-2xl bg-slate-800 ring-1 ring-white/10 shadow-xl"
              aria-hidden
            >
              <Lock className="h-10 w-10" />
            </motion.div>

            {/* Titre & code */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Accès non autorisé
              </h1>
              <p className="text-slate-300">
                Code d’erreur : <span className="font-mono">401</span>
              </p>
            </div>

            {/* Message */}
            <p className="text-slate-300 max-w-prose">
              Vous n’avez pas les permissions nécessaires pour accéder à cette
              page. Veuillez vous connecter avec un compte autorisé ou retourner
              à l’accueil.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {/* Bouton retour */}
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ring-1 ring-white/10 bg-slate-800 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 transition"
                aria-label="Revenir en arrière"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>

              {/* Accueil */}
              <a
                href={homeHref}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ring-1 ring-white/10 bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 transition"
                aria-label="Aller à l’accueil"
              >
                <Home className="h-4 w-4" />
                Accueil
              </a>

              {/* Contacter le support */}
              <a
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ring-1 ring-white/10 bg-fuchsia-600/90 hover:bg-fuchsia-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 transition"
                aria-label="Contacter le support"
              >
                <Mail className="h-4 w-4" />
                Contacter le support
              </a>
            </div>

            {/* Détails techniques (optionnels) */}
            <details className="mt-4 w-full max-w-prose text-left text-slate-300/90">
              <summary className="cursor-pointer select-none text-sm font-medium text-slate-200/90 hover:text-white">
                Détails techniques
              </summary>
              <div className="mt-2 rounded-xl bg-slate-800/60 p-4 ring-1 ring-white/10">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Vous devez être authentifié(e) pour accéder à cette
                    ressource.
                  </li>
                  <li>
                    Si vous pensez qu’il s’agit d’une erreur, rafraîchissez la
                    page ou reconnectez‑vous.
                  </li>
                  <li>
                    Contactez l’administrateur pour obtenir les droits
                    nécessaires.
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        {/* Pied de page léger */}
        <div className="mt-6 text-center text-xs text-slate-400">
          <span>
            © {new Date().getFullYear()} Votre Société. Tous droits réservés.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
