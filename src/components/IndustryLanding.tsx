import React from 'react';
import { Industry, INDUSTRIES } from '../types';
import { Briefcase, Building, Stethoscope, Landmark, HardHat, GraduationCap, Megaphone, Server, ArrowRight } from 'lucide-react';
import { cn } from './ui/utils';
import kadoshLogo from '../assets/kadoshAI.png';
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/playbook-theme.mp3';

interface Props {
  onSelect: (industry: Industry) => void;
}

const icons: Record<Industry, React.ReactNode> = {
  "IT & Technology": <Server className="w-8 h-8" />,
  "Finance & Banking": <Landmark className="w-8 h-8" />,
  "HR & Recruitment": <Briefcase className="w-8 h-8" />,
  "Operations & Logistics": <Building className="w-8 h-8" />,
  "Healthcare": <Stethoscope className="w-8 h-8" />,
  "Construction": <HardHat className="w-8 h-8" />,
  "Marketing": <Megaphone className="w-8 h-8" />,
  "Education": <GraduationCap className="w-8 h-8" />,
};

const gradients: Record<Industry, string> = {
  "IT & Technology": "from-blue-500 to-cyan-500",
  "Finance & Banking": "from-emerald-500 to-teal-500",
  "HR & Recruitment": "from-orange-500 to-amber-500",
  "Operations & Logistics": "from-slate-500 to-gray-500",
  "Healthcare": "from-red-500 to-pink-500",
  "Construction": "from-yellow-500 to-orange-500",
  "Marketing": "from-purple-500 to-indigo-500",
  "Education": "from-sky-500 to-indigo-500",
};

export const IndustryLanding: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
        <BackgroundMusic src={themeMusic} />
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl w-full z-10 space-y-12">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
         
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Standardize your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">lessons learned.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Select your industry to begin capturing insights, generating standardized playbooks, and building a resilient organization.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry}
              onClick={() => onSelect(industry)}
              className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden text-center"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradients[industry]}`} />
              
              <div className={`mb-4 p-4 rounded-xl bg-gray-50 text-gray-600 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br ${gradients[industry]}`}>
                {icons[industry]}
              </div>
              
              <span className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                {industry}
              </span>
              
              <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
