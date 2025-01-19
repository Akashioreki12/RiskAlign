import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  BarChart2,
  ClipboardList,
  Upload,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import DocumentAnalysis from './DocumentAnalysis';
import ResultsPage from './ResultsPage'
import HomePagee from './HomePagee'

interface Question {
  id: string;
  text: string;
  answer: boolean | null;
}

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  status?: string;
}

function App() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'risk-policy',
      text: 'Disposez-vous d\'une politique de gestion des risques ?',
      answer: null,
    },
    {
      id: 'risk-treatment',
      text: 'Avez-vous un plan de traitement des risques documenté ?',
      answer: null,
    },
    {
      id: 'internal-audits',
      text: 'Réalisez-vous des audits internes réguliers ?',
      answer: null,
    },
    {
      id: 'incident-management',
      text: 'Disposez-vous d\'un processus documenté de gestion des incidents ?',
      answer: null,
    },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-risk-policy',
      name: 'Politique de gestion des risques',
      required: true,
      uploaded: false,
    },
    {
      id: 'doc-risk-treatment',
      name: 'Plan de traitement des risques',
      required: true,
      uploaded: false,
    },
    {
      id: 'doc-audit-reports',
      name: 'Rapports d\'audit',
      required: false,
      uploaded: false,
    },
    {
      id: 'doc-incident-process',
      name: 'Processus de gestion des incidents',
      required: true,
      uploaded: false,
    },
  ]);

  const handleQuestionAnswer = (id: string, answer: boolean) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, answer } : q
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (event.target.files && event.target.files[0]) {
      setDocuments(documents.map(doc =>
        doc.id === docId ? { ...doc, uploaded: true, status: 'En cours de validation' } : doc
      ));
    }
  };

  const progress = Math.round(
    ((questions.filter(q => q.answer !== null).length / questions.length) * 50) +
    ((documents.filter(d => d.uploaded).length / documents.filter(d => d.required).length) * 50)
  );

  const handleStartAnalysis = () => {
    navigate('/analysis');
  };

  const handleGoToResults = () => {
    // Programmatic navigation to the Results Page
    navigate('/results');
  };

    const handleStartHome = () => {
    navigate('/home');
  };

  const HomePage = () => (
    <>
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Progression : {progress}%</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Préparez votre Analyse avec le Questionnaire Initial de RiskAlign
          </h1>
          <p className="text-xl text-gray-600">
            Répondez aux questions pour personnaliser votre évaluation et identifier les documents nécessaires.
          </p>
        </div>

        {/* Questionnaire Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Questionnaire Initial
          </h2>
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg text-gray-900 mb-4">{question.text}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleQuestionAnswer(question.id, true)}
                    className={`px-6 py-2 rounded-md ${
                      question.answer === true
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => handleQuestionAnswer(question.id, false)}
                    className={`px-6 py-2 rounded-md ${
                      question.answer === false
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    Non
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Documents Requis
          </h2>
          <div className="space-y-6">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {doc.name}
                      {doc.required && (
                        <span className="ml-2 text-sm text-red-600">*Requis</span>
                      )}
                    </h3>
                    {doc.status && (
                      <p className="text-sm text-gray-600 mt-1">{doc.status}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {}}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <HelpCircle className="h-5 w-5 mr-1" />
                      Modèle
                    </button>
                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      {doc.uploaded ? 'Remplacer' : 'Télécharger'}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, doc.id)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleStartAnalysis}
            disabled={progress < 100}
            className={`mt-8 w-full py-3 px-4 rounded-md flex items-center justify-center text-lg font-medium ${
              progress < 100
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Passer à l'Analyse
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/homee" className="flex items-center text-gray-900 hover:text-blue-600">
                <Home className="h-5 w-5 mr-1" />
                Accueil
              </Link>
              <Link to="/" className="flex items-center text-blue-600">
                <FileText className="h-5 w-5 mr-1" />
                Documents
              </Link>
              <Link to="/analysis" className="flex items-center text-gray-900 hover:text-blue-600">
                <BarChart2 className="h-5 w-5 mr-1" />
                Analyse
              </Link>
              <Link to="/results" className="flex items-center text-gray-900 hover:text-blue-600">
                <ClipboardList className="h-5 w-5 mr-1" />
                Rapports
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<DocumentAnalysis />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/homee" element={<HomePagee />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
              <p className="text-gray-400">
                RiskAlign garantit la sécurité de vos réponses et documents grâce à un chiffrement de bout en bout.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Utiles</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Support Technique
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Politique de Confidentialité
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Pour toute question ou assistance, notre équipe de support est disponible 24/7.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;