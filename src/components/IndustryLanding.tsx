import React from 'react';
import { Industry, INDUSTRIES } from '../types';
import { Briefcase, Building, Stethoscope, Landmark, HardHat, GraduationCap, Megaphone, Server, ArrowRight, ShoppingCart, Factory, Scale, TrendingUp, Headphones, Package, Home, Plane, Film, Flag } from 'lucide-react';
import { cn } from './ui/utils';
import kadoshLogo from '../assets/kadoshAI.png';
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/playbook-theme.mp3';

interface Props {
  onSelect: (industry: Industry) => void;
  onPrivacyPolicyClick?: () => void; // Add this prop
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
  "Retail & E-commerce": <ShoppingCart className="w-8 h-8" />,
  "Manufacturing": <Factory className="w-8 h-8" />,
  "Legal & Compliance": <Scale className="w-8 h-8" />,
  "Sales": <TrendingUp className="w-8 h-8" />,
  "Customer Service": <Headphones className="w-8 h-8" />,
  "Product Management": <Package className="w-8 h-8" />,
  "Real Estate": <Home className="w-8 h-8" />,
  "Hospitality & Tourism": <Plane className="w-8 h-8" />,
  "Media & Entertainment": <Film className="w-8 h-8" />,
  "Government & Public Sector": <Flag className="w-8 h-8" />,
};

const gradients: Record<Industry, string> = {
  "IT & Technology": "from-blue-500 to-cyan-500",
  "Finance & Banking": "from-emerald-500 to-teal-500",
  "HR & Recruitment": "from-orange-500 to-amber-500",
  "Operations & Logistics": "from-slate-500 to-gray-500",
  "Healthcare": "from-red-500 to-pink-500",
  "Construction": "from-yellow-500 to-orange-500",
  "Marketing": "from-rose-500 to-pink-500",
  "Education": "from-sky-500 to-blue-500",
  "Retail & E-commerce": "from-violet-500 to-purple-500",
  "Manufacturing": "from-zinc-500 to-slate-500",
  "Legal & Compliance": "from-amber-600 to-yellow-600",
  "Sales": "from-green-500 to-emerald-500",
  "Customer Service": "from-cyan-500 to-teal-500",
  "Product Management": "from-fuchsia-500 to-pink-500",
  "Real Estate": "from-lime-500 to-green-500",
  "Hospitality & Tourism": "from-blue-400 to-cyan-400",
  "Media & Entertainment": "from-red-500 to-orange-500",
  "Government & Public Sector": "from-stone-600 to-gray-600",
};

export const IndustryLanding: React.FC<Props> = ({ onSelect, onPrivacyPolicyClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <div className="flex-grow relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <BackgroundMusic src={themeMusic} />
        
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px]" />
        </div>

        <div className="max-w-7xl w-full z-10 space-y-8 md:space-y-12">
          <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Standardize your <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">lessons learned.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Select your industry to begin capturing insights, generating standardized playbooks, and building a resilient organization.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 px-2">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                onClick={() => onSelect(industry)}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden text-center min-h-[140px] sm:min-h-[180px]"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradients[industry]}`} />
                
                <div className={`mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gray-50 text-gray-600 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br ${gradients[industry]}`}>
                  {React.cloneElement(icons[industry] as React.ReactElement, {
                    className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  })}
                </div>
                
                <span className="font-medium sm:font-semibold text-gray-900 group-hover:text-black transition-colors text-sm sm:text-base leading-tight px-1">
                  {industry}
                </span>
                
                <div className="absolute bottom-2 sm:bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Added to landing page */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            
            {/* Privacy Policy Link */}
            <div className="text-center">
              <button 
                onClick={onPrivacyPolicyClick}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>

            {/* Powered By Section */}
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Powered by</p>
              <img
                src={kadoshLogo}
                alt="Kadosh AI"
                className="h-6 sm:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Copyright */}
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} Playbook Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};