import React, { useState } from 'react';
import type { BirthData } from '../types';

interface OnboardingProps {
  onGenerate: (data: BirthData) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onGenerate }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time || !location) {
      setError('Todos los campos son requeridos.');
      return;
    }
    setError('');
    onGenerate({ name, date, time, location });
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800/50 p-8 rounded-2xl shadow-2xl shadow-cyan-500/10">
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-400">Ingresa tus Datos de Nacimiento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Tu Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="p. ej., Alex"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">Fecha de Nacimiento</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-1">Hora de Nacimiento</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">Lugar de Nacimiento</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="p. ej., Buenos Aires, Argentina"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Generar mi Carta Cósmica
        </button>
      </form>
    </div>
  );
};