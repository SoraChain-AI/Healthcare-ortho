
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Hospital, 
  Gavel, 
  BarChart2, 
  Bot, 
  Vote,
  BrainCircuit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { to: "/", label: "Home", icon: <BrainCircuit className="h-4 w-4" /> },
    { to: "/onboarding", label: "Onboarding", icon: <Hospital className="h-4 w-4" /> },
    { to: "/auction", label: "Auction", icon: <Gavel className="h-4 w-4" /> },
    { to: "/training", label: "Training", icon: <BarChart2 className="h-4 w-4" /> },
    { to: "/inference", label: "AI Specialist", icon: <Bot className="h-4 w-4" /> },
    { to: "/governance", label: "Governance", icon: <Vote className="h-4 w-4" /> },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ece62b12-57de-4357-9b19-8078adff3c8a.png" 
                  alt="SoraChain AI Logo" 
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold text-gradient">SoraChain AI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="glass-button text-sm flex items-center gap-2 hover:text-primary transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button className="glass-button liquid-gradient text-white border-0 glow-effect">
              Connect Wallet
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="glass-button p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/20">
              <Button className="w-full liquid-gradient text-white border-0">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
