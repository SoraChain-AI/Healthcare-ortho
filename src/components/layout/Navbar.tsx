
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Menu, 
  X, 
  Hospital, 
  Gavel, 
  BarChart2, 
  Bot, 
  Vote 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { to: "/", label: "Home", icon: <BrainCircuit className="h-5 w-5 mr-2" /> },
    { to: "/onboarding", label: "Institution Onboarding", icon: <Hospital className="h-5 w-5 mr-2" /> },
    { to: "/auction", label: "Subnet Auction", icon: <Gavel className="h-5 w-5 mr-2" /> },
    { to: "/training", label: "Federated Training", icon: <BarChart2 className="h-5 w-5 mr-2" /> },
    { to: "/inference", label: "Knee Specialist AI", icon: <Bot className="h-5 w-5 mr-2" /> },
    { to: "/governance", label: "Feedback & Governance", icon: <Vote className="h-5 w-5 mr-2" /> },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-8 w-8 text-sorachain-primary" />
                <span className="text-xl font-bold bg-clip-text text-transparent sorachain-gradient">SoraChain AI</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-sorachain-primary dark:text-gray-300 dark:hover:text-sorachain-primary"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ThemeToggle />
            <div className="ml-3">
              <Button className="sorachain-button">Connect Wallet</Button>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-sorachain-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-sorachain-primary"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between px-3">
              <ThemeToggle />
              <Button className="sorachain-button">Connect Wallet</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
