import React from 'react';
import { Industry, INDUSTRIES } from '../types';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LayoutDashboard, PlusCircle, BookOpen, User, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
  currentIndustry: Industry;
  onIndustryChange: (industry: Industry) => void;
  currentView: 'dashboard' | 'new' | 'library' | 'my-entries';
  onNavigate: (view: 'dashboard' | 'new' | 'library' | 'my-entries') => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentIndustry,
  onIndustryChange,
  currentView,
  onNavigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, label, icon: Icon }: { view: typeof currentView, label: string, icon: any }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        currentView === view 
          ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className={`w-4 h-4 ${currentView === view ? 'text-indigo-600' : 'text-gray-500'}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div 
              className="group flex items-center gap-2.5 cursor-pointer" 
              onClick={() => onNavigate('dashboard')}
            >
              <div className="bg-indigo-600 rounded-lg p-1.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">Playbook<span className="text-indigo-600">.ai</span></span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              <NavItem view="dashboard" label="Dashboard" icon={LayoutDashboard} />
              <NavItem view="library" label="Library" icon={BookOpen} />
              <NavItem view="my-entries" label="My Entries" icon={User} />
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block w-52">
              <Select value={currentIndustry} onValueChange={(v) => onIndustryChange(v as Industry)}>
                <SelectTrigger className="h-9 bg-white/50 border-gray-200 focus:ring-indigo-500/20 hover:bg-white transition-colors">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind} className="cursor-pointer">{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20 rounded-full px-5 transition-all hover:-translate-y-0.5"
              onClick={() => onNavigate('new')}
            >
              <PlusCircle className="w-4 h-4" />
              New Entry
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access navigation links and settings
                </SheetDescription>
                <div className="flex flex-col gap-6 py-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Navigation</h3>
                    <div className="flex flex-col gap-2 items-start">
                      <NavItem view="dashboard" label="Dashboard" icon={LayoutDashboard} />
                      <NavItem view="library" label="Library" icon={BookOpen} />
                      <NavItem view="my-entries" label="My Entries" icon={User} />
                    </div>
                  </div>
                  
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Settings</h3>
                    <div className="space-y-4">
                      <label className="text-sm text-gray-600">Active Industry</label>
                      <Select value={currentIndustry} onValueChange={(v) => onIndustryChange(v as Industry)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20"
                      onClick={() => {
                        onNavigate('new');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <PlusCircle className="w-4 h-4" />
                      Create New Entry
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-700">
        {children}
      </main>
    </div>
  );
};
