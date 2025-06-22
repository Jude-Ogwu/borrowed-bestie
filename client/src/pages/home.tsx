import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingModal } from "@/components/booking-modal";
import { ListenerCard } from "@/components/listener-card";
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Search, 
  CreditCard, 
  MessageCircle,
  Star,
  ArrowRight
} from "lucide-react";
import type { Listener } from "@shared/schema";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedListener, setSelectedListener] = useState<Listener | undefined>();

  const { data: listeners = [] } = useQuery<Listener[]>({
    queryKey: ["/api/listeners"],
  });

  const handleBookListener = (listener: Listener) => {
    setSelectedListener(listener);
    setIsBookingModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      text: "I was going through a tough breakup and just needed someone to listen without judgment. My bestie Sarah was incredible - she helped me process my feelings and gave me hope.",
      author: "Emma K.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face",
      rating: 5
    },
    {
      text: "As someone dealing with work stress, talking to Marcus really helped me gain perspective. It's amazing how much clarity you can get from someone who truly listens.",
      author: "David M.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face", 
      rating: 5
    },
    {
      text: "I was skeptical at first, but my session with Lisa exceeded all expectations. She created such a safe space for me to share my anxiety about starting college.",
      author: "Sophia L.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b567?w=48&h=48&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-warm dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-teal-500/10 dark:from-purple-400/5 dark:to-teal-500/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-400/10 to-teal-500/10 dark:from-orange-400/5 dark:to-teal-500/5 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-8 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-teal-500 dark:text-teal-400" size={16} />
                  <span>500+ conversations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-teal-500 dark:text-teal-400" size={16} />
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="text-teal-500 dark:text-teal-400" size={16} />
                  <span>Fully confidential</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
                Sometimes, you just need{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-400">
                  someone to talk to
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Connect with trained listeners for confidential peer support. No therapy, no judgment—just genuine human connection when you need it most.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  size="lg"
                  className="bg-gradient-teal text-white hover:bg-teal-600 shadow-xl text-lg px-8 py-4"
                >
                  <MessageCircle className="mr-2" size={20} />
                  Book a Call Now
                </Button>
                <Button
                  onClick={() => scrollToSection('listeners')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 text-lg px-8 py-4"
                >
                  Meet Our Besties
                </Button>
              </div>
              
              {/* Availability indicator */}
              <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 inline-block">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium">12 listeners available now</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
                alt="Two people having a supportive conversation in a peaceful setting"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {listeners.slice(0, 3).map((listener, index) => (
                      <img
                        key={listener.id}
                        src={listener.imageUrl}
                        alt={`${listener.name} profile`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Ready to listen</p>
                    <p className="text-xs text-slate-500">Available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Simple, safe, and secure. Get the support you need in just three easy steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-teal rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                  <Search className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Choose Your Bestie</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Browse our community of trained listeners and find someone who specializes in what you're going through.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-coral rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                  <CreditCard className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Book & Pay Securely</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Select your preferred time slot and session length. Pay securely through our encrypted payment system.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-lavender rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Connect & Chat</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Join your scheduled session and have a meaningful conversation with someone who genuinely cares.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-teal-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">What People Are Saying</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">Real stories from our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.author} testimonial`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Verified user</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listeners Section */}
      <section id="listeners" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Meet Our Besties</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our trained listeners come from diverse backgrounds and specialize in different areas of support. 
              Find someone who resonates with you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listeners.slice(0, 6).map((listener) => (
              <ListenerCard
                key={listener.id}
                listener={listener}
                onBookClick={handleBookListener}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              onClick={() => window.location.href = '/listeners'}
              variant="outline"
              size="lg"
              className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600"
            >
              View All Besties <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedListener={selectedListener}
      />
    </>
  );
}
