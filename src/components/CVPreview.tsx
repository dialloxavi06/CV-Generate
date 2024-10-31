import React from 'react';
import { CVData } from '../types';
import { User, Mail, Phone, MapPin, Download, GraduationCap, Briefcase, Languages, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const downloadPDF = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('cv.pdf');
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-8" id="cv-preview">
        {/* Header */}
        <div className="flex items-center gap-8 mb-8">
          {cvData.personalInfo.image && (
            <img
              src={cvData.personalInfo.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
            </h1>
            {cvData.personalInfo.title && (
              <p className="text-xl text-gray-600 mt-2">{cvData.personalInfo.title}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {cvData.personalInfo.email}
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {cvData.personalInfo.phone}
                </div>
              )}
              {cvData.personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {cvData.personalInfo.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-xl font-semibold text-gray-700">{exp.position}</h3>
                  <div className="text-gray-600 font-medium">{exp.company}</div>
                  <div className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate}
                  </div>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Education
            </h2>
            <div className="space-y-6">
              {cvData.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xl font-semibold text-gray-700">{edu.school}</h3>
                  <div className="text-gray-600 font-medium">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </div>
                  <p className="mt-2 text-gray-600">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <span className="text-gray-700">{skill.name}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {cvData.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Languages className="w-6 h-6" />
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {cvData.languages.map((lang) => (
                <div key={lang.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{lang.name}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Download Button */}
      <div className="p-4 border-t">
        <button
          onClick={downloadPDF}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CVPreview;