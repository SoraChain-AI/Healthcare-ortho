
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { HelpButton } from '@/components/common/HelpButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {/* Animated background elements for glassmorphism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-liquid-morph blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-liquid-morph blur-2xl" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/30 rounded-full animate-float blur-lg"></div>
      </div>
      {/* Glass and liquid nav bar */}
      <Navbar />
      {/* Main content uses glassy container */}
      <main className="relative pt-16 min-h-screen z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <HelpButton />
    </div>
  );
};
export default Layout;
