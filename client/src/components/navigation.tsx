import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, UserCircle } from "lucide-react";
import { BookingModal } from "./booking-modal";
import { ThemeToggle } from "./theme-toggle";
import { useMobile } from "@/hooks/use-mobile";

export function Navigation() {
  const [location] = useLocation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    // Check if user is logged in as admin
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    setIsAdmin(isAuthenticated);
  }, [location]);

  const navItems = [
    { href: "/", label: "How It Works", isScroll: true, sectionId: "how-it-works" },
    { href: "/listeners", label: "Our Besties" },
    { href: "/marketplace", label: "Marketplace" },
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

  const handleNavClick = (item: any) => {
    if (item.isScroll) {
      if (location === '/') {
        scrollToSection(item.sectionId);
      } else {
        window.location.href = '/#how-it-works';
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
              <img 
                src="/new_logo.jpg" 
                alt="Borrowed Bestie Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10" 
              />
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white hidden xs:block">
                Borrowed Bestie
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.isScroll ? (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center space-x-1 sm:space-x-4">
              {/* Only show on larger screens */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              
              {/* Marketplace Cart Link - Only show on larger screens */}
              <Link 
                href="/marketplace" 
                className="hidden sm:block text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>
              
              {/* Admin Area - Only show on larger screens */}
              <Link 
                href={isAdmin ? "/admin" : "/admin-login"} 
                className="hidden sm:block text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
              >
                <UserCircle className="h-5 w-5" />
              </Link>
              
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-teal text-white hover:bg-teal-600 shadow-lg text-xs sm:text-sm px-2 sm:px-4"
              >
                {isMobile ? "Book" : "Book a Call"}
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white dark:bg-slate-900">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      item.isScroll ? (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item)}
                          className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-left text-lg"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-left text-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    ))}
                    
                    <div className="flex items-center space-x-4 pt-2">
                      <Link 
                        href="/marketplace"
                        className="flex items-center text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        <span>Marketplace</span>
                      </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Link 
                        href={isAdmin ? "/admin" : "/admin-login"}
                        className="flex items-center text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserCircle className="mr-2 h-5 w-5" />
                        <span>Admin</span>
                      </Link>
                    </div>
                    
                    {/* Theme Toggle in Mobile Menu */}
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-600 dark:text-slate-300">Theme</span>
                      <ThemeToggle />
                    </div>
                    
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
