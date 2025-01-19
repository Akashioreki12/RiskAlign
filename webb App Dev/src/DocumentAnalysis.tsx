import React, { useState } from 'react';
import {
  Home,
  FileText,
  BarChart2,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Clock,
  FileWarning,
} from 'lucide-react';

interface AnalysisStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  progress: number;
}

interface DocumentStatus {
  id: string;
  name: string;
  status: 'analyzed' | 'processing' | 'invalid';
  conformityScore: number;
  gaps: string[];
}

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

function DocumentAnalysis() {
  const [analysisSteps] = useState<AnalysisStep[]>([
    {
      id: 'preprocessing',
      name: 'Prétraitement',
      status: 'completed',
      progress: 100,
    },
    {
      id: 'nlp-analysis',
      name: 'Analyse NLP',
      status: 'in-progress',
      progress: 65,
    },
    {
      id: 'gap-evaluation',
      name: 'Évaluation des lacunes',
      status: 'pending',
      progress: 0,
    },
    {
      id: 'results-preparation',
      name: 'Préparation des résultats',
      status: 'pending',
      progress: 0,
    },
  ]);

  const [documents] = useState<DocumentStatus[]>([
    {
      id: 'doc-1',
      name: 'Politique_Risques.pdf',
      status: 'analyzed',
      conformityScore: 80,
      gaps: ['Section Analyse des Risques manquante', 'Mise à jour requise'],
    },
    {
      id: 'doc-2',
      name: 'Plan_Traitement_Risques.docx',
      status: 'processing',
      conformityScore: 0,
      gaps: [],
    },
    {
      id: 'doc-3',
      name: 'Gestion_Incidents.pdf',
      status: 'invalid',
      conformityScore: 30,
      gaps: ['Format incorrect', 'Contenu incomplet'],
    },
  ]);

  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '10:30:15',
      message: 'Début de l\'analyse du document : Politique_Risques.pdf',
      type: 'info',
    },
    {
      id: '2',
      timestamp: '10:30:45',
      message: 'Section manquante détectée : Analyse des Risques',
      type: 'warning',
    },
    {
      id: '3',
      timestamp: '10:31:00',
      message: 'Format invalide : Gestion_Incidents.pdf',
      type: 'error',
    },
  ]);

  const globalProgress = Math.round(
    analysisSteps.reduce((acc, step) => acc + step.progress, 0) / analysisSteps.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Suivez l'Analyse de Vos Documents avec RiskAlign
          </h1>
          <p className="text-xl text-gray-600">
            Votre conformité ISO 27001 en cours de traitement. Consultez les résultats et intervenez si nécessaire.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Progression Globale</h2>
            <span className="text-2xl font-bold text-blue-600">{globalProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${globalProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analysisSteps.map((step) => (
              <div
                key={step.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{step.name}</span>
                  {step.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {step.status === 'in-progress' && <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />}
                  {step.status === 'pending' && <Clock className="h-5 w-5 text-gray-400" />}
                  {step.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      step.status === 'completed'
                        ? 'bg-green-500'
                        : step.status === 'in-progress'
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Analysis Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Documents Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Documents en Analyse</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <div key={doc.id} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.status === 'analyzed' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Analysé
                          </span>
                        )}
                        {doc.status === 'processing' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            En cours
                          </span>
                        )}
                        {doc.status === 'invalid' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Invalide
                          </span>
                        )}
                      </div>
                    </div>
                    {doc.status === 'analyzed' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Conformité</span>
                          <span className="font-medium">{doc.conformityScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${doc.conformityScore}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {doc.gaps.length > 0 && (
                      <div className="mt-2">
                        <ul className="space-y-1">
                          {doc.gaps.map((gap, index) => (
                            <li key={index} className="text-sm text-red-600 flex items-center">
                              <FileWarning className="h-4 w-4 mr-1" />
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Journal d'Analyse</h3>
            </div>
            <div className="px-6 py-4 space-y-4 max-h-[500px] overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start space-x-2 text-sm ${
                    log.type === 'error'
                      ? 'text-red-600'
                      : log.type === 'warning'
                      ? 'text-yellow-600'
                      : log.type === 'success'
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  {log.type === 'error' && <XCircle className="h-4 w-4 mt-0.5" />}
                  {log.type === 'warning' && <AlertCircle className="h-4 w-4 mt-0.5" />}
                  {log.type === 'success' && <CheckCircle2 className="h-4 w-4 mt-0.5" />}
                  {log.type === 'info' && <FileText className="h-4 w-4 mt-0.5" />}
                  <div>
                    <span className="font-medium">{log.timestamp}</span>
                    <p className="mt-0.5">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Retour aux Documents
          </button>
          <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Voir les Résultats
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </main>

      {/* Footer */}

    </div>
  );
}

export default DocumentAnalysis;