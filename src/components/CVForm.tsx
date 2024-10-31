import React from 'react';
import { PlusCircle, Trash2, Upload } from 'lucide-react';
import { CVData } from '../types';

interface CVFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const CVForm: React.FC<CVFormProps> = ({ cvData, setCVData }) => {
  const addItem = (section: keyof CVData, newItem: any) => {
    setCVData({
      ...cvData,
      [section]: [...cvData[section], { ...newItem, id: crypto.randomUUID() }],
    });
  };

  const removeItem = (section: keyof CVData, id: string) => {
    setCVData({
      ...cvData,
      [section]: cvData[section].filter((item: any) => item.id !== id),
    });
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setCVData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [field]: value },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex flex-col items-center mb-4">
            {cvData.personalInfo.image && (
              <img
                src={cvData.personalInfo.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            )}
            <label className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            placeholder="First Name"
            value={cvData.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={cvData.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={cvData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={cvData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={cvData.personalInfo.title}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            className="input-field md:col-span-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={cvData.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            className="input-field md:col-span-2"
          />
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Education Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            onClick={() => addItem('education', {
              school: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              description: '',
            })}
            className="btn-add"
          >
            <PlusCircle className="w-5 h-5" />
            Add Education
          </button>
        </div>
        {cvData.education.map((edu) => (
          <div key={edu.id} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => {
                  const updated = cvData.education.map((item) =>
                    item.id === edu.id ? { ...item, school: e.target.value } : item
                  );
                  setCVData({ ...cvData, education: updated });
                }}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const updated = cvData.education.map((item) =>
                    item.id === edu.id ? { ...item, degree: e.target.value } : item
                  );
                  setCVData({ ...cvData, education: updated });
                }}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => {
                  const updated = cvData.education.map((item) =>
                    item.id === edu.id ? { ...item, field: e.target.value } : item
                  );
                  setCVData({ ...cvData, education: updated });
                }}
                className="input-field"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => {
                    const updated = cvData.education.map((item) =>
                      item.id === edu.id ? { ...item, startDate: e.target.value } : item
                    );
                    setCVData({ ...cvData, education: updated });
                  }}
                  className="input-field"
                />
                <input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => {
                    const updated = cvData.education.map((item) =>
                      item.id === edu.id ? { ...item, endDate: e.target.value } : item
                    );
                    setCVData({ ...cvData, education: updated });
                  }}
                  className="input-field"
                />
              </div>
              <textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) => {
                  const updated = cvData.education.map((item) =>
                    item.id === edu.id ? { ...item, description: e.target.value } : item
                  );
                  setCVData({ ...cvData, education: updated });
                }}
                className="input-field md:col-span-2"
                rows={3}
              />
            </div>
            <button
              onClick={() => removeItem('education', edu.id)}
              className="btn-remove mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button
            onClick={() => addItem('experience', {
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: '',
            })}
            className="btn-add"
          >
            <PlusCircle className="w-5 h-5" />
            Add Experience
          </button>
        </div>
        {cvData.experience.map((exp) => (
          <div key={exp.id} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const updated = cvData.experience.map((item) =>
                    item.id === exp.id ? { ...item, company: e.target.value } : item
                  );
                  setCVData({ ...cvData, experience: updated });
                }}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => {
                  const updated = cvData.experience.map((item) =>
                    item.id === exp.id ? { ...item, position: e.target.value } : item
                  );
                  setCVData({ ...cvData, experience: updated });
                }}
                className="input-field"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => {
                    const updated = cvData.experience.map((item) =>
                      item.id === exp.id ? { ...item, startDate: e.target.value } : item
                    );
                    setCVData({ ...cvData, experience: updated });
                  }}
                  className="input-field"
                />
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => {
                    const updated = cvData.experience.map((item) =>
                      item.id === exp.id ? { ...item, endDate: e.target.value } : item
                    );
                    setCVData({ ...cvData, experience: updated });
                  }}
                  className="input-field"
                />
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const updated = cvData.experience.map((item) =>
                    item.id === exp.id ? { ...item, description: e.target.value } : item
                  );
                  setCVData({ ...cvData, experience: updated });
                }}
                className="input-field md:col-span-2"
                rows={3}
              />
            </div>
            <button
              onClick={() => removeItem('experience', exp.id)}
              className="btn-remove mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <button
            onClick={() => addItem('skills', { name: '', level: 3 })}
            className="btn-add"
          >
            <PlusCircle className="w-5 h-5" />
            Add Skill
          </button>
        </div>
        {cvData.skills.map((skill) => (
          <div key={skill.id} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) => {
                  const updated = cvData.skills.map((item) =>
                    item.id === skill.id ? { ...item, name: e.target.value } : item
                  );
                  setCVData({ ...cvData, skills: updated });
                }}
                className="input-field"
              />
              <input
                type="range"
                min="1"
                max="5"
                value={skill.level}
                onChange={(e) => {
                  const updated = cvData.skills.map((item) =>
                    item.id === skill.id ? { ...item, level: parseInt(e.target.value) } : item
                  );
                  setCVData({ ...cvData, skills: updated });
                }}
                className="input-field"
              />
            </div>
            <button
              onClick={() => removeItem('skills', skill.id)}
              className="btn-remove mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* Languages Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Languages</h2>
          <button
            onClick={() => addItem('languages', { name: '', level: 'Intermediate' })}
            className="btn-add"
          >
            <PlusCircle className="w-5 h-5" />
            Add Language
          </button>
        </div>
        {cvData.languages.map((lang) => (
          <div key={lang.id} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Language"
                value={lang.name}
                onChange={(e) => {
                  const updated = cvData.languages.map((item) =>
                    item.id === lang.id ? { ...item, name: e.target.value } : item
                  );
                  setCVData({ ...cvData, languages: updated });
                }}
                className="input-field"
              />
              <select
                value={lang.level}
                onChange={(e) => {
                  const updated = cvData.languages.map((item) =>
                    item.id === lang.id ? { ...item, level: e.target.value } : item
                  );
                  setCVData({ ...cvData, languages: updated });
                }}
                className="input-field"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </div>
            <button
              onClick={() => removeItem('languages', lang.id)}
              className="btn-remove mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CVForm;