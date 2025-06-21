import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu } from "lucide-react";
import { BookingModal } from "./booking-modal";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/listeners", label: "Our Besties" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "Safety & FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      if (location === '/') {
        scrollToSection(sectionId);
      } else {
        window.location.href = href;
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-teal rounded-lg flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">Borrowed Bestie</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-teal text-white hover:bg-teal-600 shadow-lg"
              >
                Book a Call
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="text-slate-600 hover:text-teal-600 transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    ))}
                    <Button
                      onClick={() => {
                        setIsBookingModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-gradient-teal text-white hover:bg-teal-600 mt-4"
                    >
                      Book a Call
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
