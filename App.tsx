import React, { useState, useCallback } from 'react';
import { Onboarding } from './components/Onboarding';
import { NatalChart } from './components/NatalChart';
import { ReadingDisplay } from './components/ReadingDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateAstrologicalReading } from './services/geminiService';
import type { BirthData, AstrologicalData } from './types';
import { MOCK_ASTROLOGICAL_DATA } from './constants';

declare const html2canvas: any;
declare const jspdf: { jsPDF: any };

const App: React.FC = () => {
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [astrologicalReading, setAstrologicalReading] = useState<string | null>(null);
  const [astrologicalData, setAstrologicalData] = useState<AstrologicalData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReading = useCallback(async (data: BirthData) => {
    setIsLoading(true);
    setError(null);
    setBirthData(data);
    setAstrologicalReading(null);

    try {
      // In a real app, you would call a backend service here
      // to get the precise astrological calculations.
      // For this demo, we use mock data.
      const calculatedData = MOCK_ASTROLOGICAL_DATA;
      setAstrologicalData(calculatedData);
      
      const reading = await generateAstrologicalReading(calculatedData, data);
      setAstrologicalReading(reading);

    } catch (err) {
      console.error("Error generating reading:", err);
      setError("No se pudo generar tu lectura astrológica. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    if (!birthData) return;

    const reportElement = document.getElementById('astrology-report');
    if (!reportElement) {
        console.error("Report element not found");
        return;
    }

    try {
        const canvas = await html2canvas(reportElement, {
            scale: 2,
            backgroundColor: '#0f172a', // slate-900
            useCORS: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Lectura-Astrologica-${birthData.name.replace(/\s/g, '_')}.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
        setError("Lo sentimos, no se pudo generar el PDF. Por favor, inténtalo de nuevo.");
    }
}, [birthData]);
  
  const handleReset = () => {
    setBirthData(null);
    setAstrologicalReading(null);
    setAstrologicalData(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-400">
          Astro Persona AI 🔮
        </h1>
        <p className="text-slate-400 mt-2">Tu guía astrológica personalizada, con el poder de Gemini.</p>
      </header>
      
      <main className="w-full max-w-5xl flex-grow">
        {!birthData ? (
          <Onboarding onGenerate={handleGenerateReading} />
        ) : (
          <div className="w-full">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-lg">
                <LoadingSpinner />
                <p className="mt-4 text-lg text-cyan-300 animate-pulse">Generando tu mapa cósmico...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg text-center">
                <p className="font-bold">Ocurrió un Error</p>
                <p>{error}</p>
              </div>
            )}
            
            {!isLoading && astrologicalData && astrologicalReading && (
              <>
                <div id="astrology-report">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-4 md:p-6">
                        <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-2xl shadow-cyan-500/10">
                            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-400">Tu Carta Natal</h2>
                            <NatalChart data={astrologicalData} />
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl shadow-yellow-500/10">
                            <h2 className="text-2xl font-bold text-center mb-4 text-cyan-300">Interpretación con IA</h2>
                            <ReadingDisplay reading={astrologicalReading} />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-400/30"
                  >
                    Empezar de Nuevo
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-400/30"
                  >
                    Descargar PDF
                  </button>
                </div>
              </>
            )}

            { (isLoading || error) &&
                <div className="text-center mt-8">
                  <button
                    onClick={handleReset}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-400/30"
                  >
                    Empezar de Nuevo
                  </button>
                </div>
            }
          </div>
        )}
      </main>

      <footer className="w-full max-w-5xl text-center mt-8 text-slate-500 text-sm">
        <p>Aviso: Solo para fines de entretenimiento. No reemplaza el consejo profesional.</p>
      </footer>
    </div>
  );
};

export default App;