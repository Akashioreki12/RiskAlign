import React from 'react';
import { motion } from 'framer-motion';

function HomePagee() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <motion.div
        className="max-w-5xl text-center text-gray-800 px-6"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h1
          className="text-5xl font-extrabold tracking-tight mb-6"
          variants={fadeIn}
        >
          Bienvenue sur RiskAlign
        </motion.h1>
        <motion.p className="text-lg leading-relaxed mb-8" variants={fadeIn}>
          Une plateforme alimentée par l'intelligence artificielle pour l'évaluation automatisée de la conformité à la norme ISO 27001. Simplifiez votre processus de conformité dès aujourd'hui.
        </motion.p>
        <motion.button
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
          variants={fadeIn}
        >
          Découvrir Plus
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={fadeIn}>
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">Analyse IA</h3>
          <p className="text-gray-700">
            Utilisez des modèles avancés comme <span className="font-semibold">BERT</span> et <span className="font-semibold">GPT</span> pour analyser vos documents et évaluer leur conformité.
          </p>
        </motion.div>

        <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={fadeIn}>
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">Recommandations</h3>
          <p className="text-gray-700">
            Recevez des recommandations personnalisées pour améliorer la sécurité de l'information et atteindre une conformité complète.
          </p>
        </motion.div>

        <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={fadeIn}>
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">Extensibilité</h3>
          <p className="text-gray-700">
            Préparez-vous à intégrer d'autres cadres de conformité comme le <span className="font-semibold">NIST</span> ou le <span className="font-semibold">GDPR</span>.
          </p>
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-16 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Prêt à améliorer votre conformité ISO 27001 ?
        </h2>
        <button
          className="bg-indigo-600 text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-indigo-700 transition duration-300"
        >
          Commencez Maintenant
        </button>
      </motion.div>
    </div>
  );
}

export default HomePagee;
