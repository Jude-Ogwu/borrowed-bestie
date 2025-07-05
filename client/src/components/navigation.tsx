import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useMobile();

  const links = [
    { href: "/", label: "Home" },
    { href: "/listeners", label: "Besties" },
    { href: "/marketplace", label: "Books" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img 
                src="/new_logo.jpg" 
                alt="Borrowed Bestie Logo" 
                className={`rounded-full ${isMobile ? 'h-9 w-9' : 'h-10 w-10'}`} 
              />
              <span className="text-xl font-bold">Borrowed Bestie</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive(link.href) ? "default" : "ghost"}
                className={isActive(link.href) ? "bg-gradient-teal text-white" : ""}
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <Link href="/admin-login">
            <Button variant="outline">Admin</Button>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={isActive(link.href) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(link.href) ? "bg-gradient-teal text-white" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/admin-login">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
