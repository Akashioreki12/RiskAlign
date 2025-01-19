import React from 'react';
import {
  Home,
  FileText,
  BarChart2,
  ClipboardList,
  Download,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function ResultsPage() {
  const globalScore = 85; // Example global conformity score
  const categoryScores = [
    { category: 'Gestion des actifs', score: 75 },
    { category: 'Gestion des risques', score: 90 },
    { category: 'Gestion des incidents', score: 65 },
  ];

  const identifiedGaps = [
    {
      category: 'Gestion des risques',
      gap: 'Section manquante dans le plan de traitement des risques',
      impact: 'Élevé',
      recommendation: 'Ajouter un plan d’action pour les risques résiduels.',
    },
    {
      category: 'Gestion des actifs',
      gap: 'Inventaire des actifs incomplet',
      impact: 'Modéré',
      recommendation: 'Créer un registre complet des actifs.',
    },
  ];

  const recommendations = [
    {
      general: 'Mettre à jour votre plan de gestion des incidents pour inclure une liste des responsables.',
    },
    {
      category: 'Gestion des risques',
      actions: [
        'Ajoutez une analyse détaillée des risques résiduels.',
        'Documentez un calendrier pour le suivi des mesures de traitement des risques.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Vos Résultats avec RiskAlign – Découvrez votre Niveau de Conformité ISO 27001
          </h1>
          <p className="text-xl text-gray-600">
            Consultez vos scores, identifiez les lacunes et accédez à des recommandations pour atteindre une conformité complète.
          </p>
          <nav className="flex space-x-6 justify-center mt-4">
            
            <a href="#support" className="flex items-center text-gray-900 hover:text-blue-600">
              <ClipboardList className="h-5 w-5 mr-1" /> Assistance Technique
            </a>
            <button className="flex items-center text-gray-900 hover:text-blue-600">
              <Download className="h-5 w-5 mr-1" /> Télécharger le Rapport PDF
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Global Conformity Score */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Score Global de Conformité</h2>
          <div className="flex items-center justify-center">
            <div
              className={`rounded-full h-40 w-40 flex items-center justify-center border-8 ${
                globalScore > 90
                  ? 'border-green-500'
                  : globalScore >= 50
                  ? 'border-orange-500'
                  : 'border-red-500'
              }`}
            >
              <span className="text-4xl font-bold text-gray-900">{globalScore}%</span>
            </div>
          </div>
        </section>

        {/* Category Scores */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sous-Scores par Catégorie</h2>
          <div className="space-y-4">
            {categoryScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">{score.category}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        score.score > 90
                          ? 'bg-green-500'
                          : score.score >= 50
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${score.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-900">{score.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Identified Gaps */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Lacunes Identifiées</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Catégorie</th>
                <th className="px-4 py-2 border-b">Lacune</th>
                <th className="px-4 py-2 border-b">Impact</th>
                <th className="px-4 py-2 border-b">Actions Recommandées</th>
              </tr>
            </thead>
            <tbody>
              {identifiedGaps.map((gap, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{gap.category}</td>
                  <td className="px-4 py-2 border-b">{gap.gap}</td>
                  <td className={`px-4 py-2 border-b ${
                    gap.impact === 'Élevé'
                      ? 'text-red-600 font-bold'
                      : gap.impact === 'Modéré'
                      ? 'text-orange-600 font-bold'
                      : 'text-green-600 font-bold'
                  }`}>{gap.impact}</td>
                  <td className="px-4 py-2 border-b">{gap.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Recommendations */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommandations Personnalisées</h2>
          <p className="text-lg text-gray-600 mb-4">
            Sur la base des lacunes identifiées, RiskAlign vous propose des actions concrètes et des modèles pour améliorer votre conformité.
          </p>
          <ul className="space-y-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg font-medium text-gray-900">{rec.category || 'Recommandation Générale'}</p>
                <ul className="list-disc pl-6">
                  {rec.actions
                    ? rec.actions.map((action, idx) => (
                        <li key={idx} className="text-gray-700">{action}</li>
                      ))
                    : <li className="text-gray-700">{rec.general}</li>}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Download Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg font-medium">
            Télécharger le Rapport de Conformité ISO 27001
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
