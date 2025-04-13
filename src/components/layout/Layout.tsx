
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { HelpButton } from '@/components/common/HelpButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <HelpButton />
    </div>
  );
};

export default Layout;
