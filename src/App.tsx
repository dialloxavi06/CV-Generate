import React, { useState } from 'react';
import { Download, Briefcase, GraduationCap, User, Mail, Phone, MapPin, Languages, Award } from 'lucide-react';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { CVData } from './types';

function App() {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      image: '',
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: [],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">CV Generator Pro</h1>
          <p className="mt-2 text-indigo-100">Create your professional CV in minutes</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CVForm cvData={cvData} setCVData={setCVData} />
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;