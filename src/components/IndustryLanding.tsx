import React from 'react';
import { Industry, INDUSTRIES } from '../types';
import { Briefcase, Building, Stethoscope, Landmark, HardHat, GraduationCap, Megaphone, Server, ArrowRight, ShoppingCart, Factory, Scale, TrendingUp, Headphones, Package, Home, Plane, Film, Flag, HelpCircle, Globe } from 'lucide-react';
import { cn } from './ui/utils';
import kadoshLogo from '../assets/kadoshAI.png';
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/playbook-theme.mp3';

interface Props {
  onSelect: (industry: Industry) => void;
  onPrivacyPolicyClick: () => void;
  onHelpClick?: () => void;
}

const icons: Record<Industry, React.ReactNode> = {
  "General": <Globe className="w-8 h-8" />,
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
  "General": "from-indigo-500 to-violet-500",
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

export const IndustryLanding: React.FC<Props> = ({ onSelect, onPrivacyPolicyClick, onHelpClick }) => {
  const [industryInput, setIndustryInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (industryInput.trim()) {
      onSelect(industryInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
        <BackgroundMusic src={themeMusic} />

        {onHelpClick && (
          <button
            onClick={onHelpClick}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium px-4 py-2.5 rounded-full shadow-lg border border-gray-200 hover:border-indigo-200 transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            title="Quick Start Guide"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Start Guide</span>
          </button>
        )}

        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px]" />
        </div>

        <div className="max-w-2xl w-full z-10 space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Standardize your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">lessons learned.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Enter your industry to begin capturing insights, generating standardized playbooks, and building a resilient organization.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
              <div className="space-y-3">
                <label htmlFor="industry-input" className="block text-lg font-semibold text-gray-900">
                  What's your industry?
                </label>
                <input
                  id="industry-input"
                  type="text"
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  placeholder="e.g. IT & Technology, Healthcare, Finance..."
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!industryInput.trim()}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center space-y-6 mb-6">
            {/* Privacy Policy Link */}
            <div className="text-center">
              <button
                onClick={onPrivacyPolicyClick}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded px-2 py-1"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Copyright Footer Row */}
          <div className="flex items-center justify-center text-gray-400 text-sm gap-3">
            <span>Copyright © {new Date().getFullYear()}</span>
            <img
              src={kadoshLogo}
              alt="Kadosh AI"
              className="h-5 w-auto object-contain"
            />
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
};