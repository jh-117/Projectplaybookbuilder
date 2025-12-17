<div class="fbb737a4">import React from 'react';
import { Industry, INDUSTRIES } from '../types';
import { Briefcase, Building, Stethoscope, Landmark, HardHat, GraduationCap, Megaphone, Server, ArrowRight, ShoppingCart, Factory, Scale, TrendingUp, Headphones, Package, Home, Plane, Film, Flag } from 'lucide-react';
import { cn } from './ui/utils';
import kadoshLogo from '../assets/kadoshAI.png';
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/playbook-theme.mp3';

interface Props {
  onSelect: (industry: Industry) =&gt; void;
}

const icons: Record&lt;Industry, React.ReactNode&gt; = {
  "IT &amp; Technology": &lt;Server className="w-8 h-8" /&gt;,
  "Finance &amp; Banking": &lt;Landmark className="w-8 h-8" /&gt;,
  "HR &amp; Recruitment": &lt;Briefcase className="w-8 h-8" /&gt;,
  "Operations &amp; Logistics": &lt;Building className="w-8 h-8" /&gt;,
  "Healthcare": &lt;Stethoscope className="w-8 h-8" /&gt;,
  "Construction": &lt;HardHat className="w-8 h-8" /&gt;,
  "Marketing": &lt;Megaphone className="w-8 h-8" /&gt;,
  "Education": &lt;GraduationCap className="w-8 h-8" /&gt;,
  "Retail &amp; E-commerce": &lt;ShoppingCart className="w-8 h-8" /&gt;,
  "Manufacturing": &lt;Factory className="w-8 h-8" /&gt;,
  "Legal &amp; Compliance": &lt;Scale className="w-8 h-8" /&gt;,
  "Sales": &lt;TrendingUp className="w-8 h-8" /&gt;,
  "Customer Service": &lt;Headphones className="w-8 h-8" /&gt;,
  "Product Management": &lt;Package className="w-8 h-8" /&gt;,
  "Real Estate": &lt;Home className="w-8 h-8" /&gt;,
  "Hospitality &amp; Tourism": &lt;Plane className="w-8 h-8" /&gt;,
  "Media &amp; Entertainment": &lt;Film className="w-8 h-8" /&gt;,
  "Government &amp; Public Sector": &lt;Flag className="w-8 h-8" /&gt;,
};

const gradients: Record&lt;Industry, string&gt; = {
  "IT &amp; Technology": "from-blue-500 to-cyan-500",
  "Finance &amp; Banking": "from-emerald-500 to-teal-500",
  "HR &amp; Recruitment": "from-orange-500 to-amber-500",
  "Operations &amp; Logistics": "from-slate-500 to-gray-500",
  "Healthcare": "from-red-500 to-pink-500",
  "Construction": "from-yellow-500 to-orange-500",
  "Marketing": "from-rose-500 to-pink-500",
  "Education": "from-sky-500 to-blue-500",
  "Retail &amp; E-commerce": "from-violet-500 to-purple-500",
  "Manufacturing": "from-zinc-500 to-slate-500",
  "Legal &amp; Compliance": "from-amber-600 to-yellow-600",
  "Sales": "from-green-500 to-emerald-500",
  "Customer Service": "from-cyan-500 to-teal-500",
  "Product Management": "from-fuchsia-500 to-pink-500",
  "Real Estate": "from-lime-500 to-green-500",
  "Hospitality &amp; Tourism": "from-blue-400 to-cyan-400",
  "Media &amp; Entertainment": "from-red-500 to-orange-500",
  "Government &amp; Public Sector": "from-stone-600 to-gray-600",
};

export const IndustryLanding: React.FC&lt;Props&gt; = ({ onSelect }) =&gt; {
  return (
    &lt;div className="min-h-screen bg-gray-50 flex flex-col"&gt;
      &lt;div className="flex-grow relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans"&gt;
        &lt;BackgroundMusic src={themeMusic} /&gt;
        
        {/* Background Decor */}
        &lt;div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"&gt;
          &lt;div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" /&gt;
          &lt;div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px]" /&gt;
        &lt;/div&gt;

        &lt;div className="max-w-6xl w-full z-10 space-y-12"&gt;
          &lt;div className="text-center space-y-6 max-w-3xl mx-auto"&gt;
            &lt;h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"&gt;
              Standardize your &lt;br/&gt;
              &lt;span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600"&gt;lessons learned.&lt;/span&gt;
            &lt;/h1&gt;
            &lt;p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"&gt;
              Select your industry to begin capturing insights, generating standardized playbooks, and building a resilient organization.
            &lt;/p&gt;
          &lt;/div&gt;

          &lt;div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"&gt;
            {INDUSTRIES.map((industry) =&gt; (
              &lt;button
                key={industry}
                onClick={() =&gt; onSelect(industry)}
                className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden text-center"
              &gt;
                &lt;div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradients[industry]}`} /&gt;
                
                &lt;div className={`mb-4 p-4 rounded-xl bg-gray-50 text-gray-600 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br ${gradients[industry]}`}&gt;
                  {icons[industry]}
                &lt;/div&gt;
                
                &lt;span className="font-semibold text-gray-900 group-hover:text-black transition-colors"&gt;
                  {industry}
                &lt;/span&gt;
                
                &lt;div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"&gt;
                  &lt;ArrowRight className="w-5 h-5 text-gray-400" /&gt;
                &lt;/div&gt;
              &lt;/button&gt;
            ))}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Footer - Added to landing page */}
      &lt;footer className="bg-white border-t border-gray-200"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"&gt;
          &lt;div className="flex flex-col items-center justify-center space-y-6"&gt;
            
            {/* Privacy Policy Link */}
            &lt;div className="text-center"&gt;
              &lt;span className="text-gray-600 font-medium text-base"&gt;Privacy Policy&lt;/span&gt;
            &lt;/div&gt;

            {/* Powered By Section */}
            &lt;div className="flex flex-col items-center space-y-2"&gt;
              &lt;p className="text-xs text-gray-400 uppercase tracking-wider font-semibold"&gt;Powered by&lt;/p&gt;
              &lt;img
                src={kadoshLogo}
                alt="Kadosh AI"
                className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              /&gt;
            &lt;/div&gt;

            {/* Copyright */}
            &lt;p className="text-sm text-gray-400"&gt;
              © {new Date().getFullYear()} Playbook Builder. All rights reserved.
            &lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/footer&gt;
    &lt;/div&gt;
  );
};</div>