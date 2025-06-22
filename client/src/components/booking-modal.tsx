import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { X, Lock, Calendar, Clock, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import type { Listener } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedListener?: Listener;
}

type SessionType = {
  duration: string;
  price: number;
  label: string;
};

const sessionTypes: SessionType[] = [
  { duration: "15", price: 15, label: "Quick Chat" },
  { duration: "30", price: 25, label: "Deep Dive" },
  { duration: "60", price: 40, label: "Extended" },
];

export function BookingModal({ isOpen, onClose, selectedListener }: BookingModalProps) {
  const [, setLocation] = useLocation();
  const [selectedSession, setSelectedSession] = useState<SessionType>(sessionTypes[0]);
  const [notes, setNotes] = useState("");
  const [useCalendly, setUseCalendly] = useState(false);

  const calendlyUrl = "https://calendly.com/ogwujude872/borrowed-bestie";

  const handleBookWithCalendly = () => {
    // Open Calendly in a new window
    window.open(calendlyUrl, '_blank', 'width=800,height=600');
    onClose();
  };

  const handleProceedToPayment = () => {
    // Create booking data to pass to checkout
    const bookingData = {
      listener: selectedListener,
      sessionType: selectedSession,
      date: "To be scheduled via Calendly",
      time: "To be scheduled via Calendly",
      notes,
    };
    
    // Store booking data in sessionStorage for checkout page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to checkout
    onClose();
    setLocation('/checkout');
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center justify-between">
            Book Your Session
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-300">
            Choose your session type and schedule your time with {selectedListener?.name || 'a listener'}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Session Type Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Choose Session Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {sessionTypes.map((session) => (
                <button
                  key={session.duration}
                  onClick={() => setSelectedSession(session)}
                  className={`border-2 rounded-lg p-4 transition-colors ${
                    selectedSession.duration === session.duration
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      selectedSession.duration === session.duration 
                        ? "text-teal-600 dark:text-teal-400" 
                        : "text-slate-600 dark:text-slate-300"
                    }`}>
                      {session.duration}min
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{session.label}</div>
                    <div className="text-lg font-semibold text-slate-800 dark:text-white">${session.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Booking Options */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Choose Your Booking Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 text-center">
                <Calendar className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Real-Time Booking</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Book directly with live availability using our Calendly integration
                </p>
                <Button
                  onClick={handleBookWithCalendly}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Book with Calendly
                </Button>
              </div>

              <div className="border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
                <Clock className="w-12 h-12 text-slate-500 dark:text-slate-400 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Manual Booking</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Submit your preference and we'll confirm availability
                </p>
                <Button
                  onClick={() => setUseCalendly(false)}
                  variant="outline"
                  className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  disabled={!useCalendly}
                >
                  Continue with Manual
                </Button>
              </div>
            </div>

            {!useCalendly && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> Manual booking requires confirmation. We'll email you within 2 hours 
                  to confirm your preferred time slot. For instant booking, use the Calendly option above.
                </p>
              </div>
            )}
          </div>

          {/* Session Notes */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Session Notes (Optional)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              Share anything you'd like your listener to know beforehand. This remains private.
            </p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Any specific areas you'd like to focus on?"
              rows={3}
              className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
          </div>

          {/* Summary */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Session Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Listener:</span>
                <span className="font-medium text-slate-800 dark:text-white">
                  {selectedListener ? selectedListener.name : "Select from listeners"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Scheduling:</span>
                <span className="font-medium text-slate-800 dark:text-white">Via Calendly (live availability)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                <span className="font-medium text-slate-800 dark:text-white">{selectedSession.duration} minutes</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <span className="font-semibold text-slate-800 dark:text-white">Total:</span>
                <span className="font-semibold text-slate-800 dark:text-white">${selectedSession.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handleProceedToPayment}
            className="w-full bg-gradient-teal text-white py-4 text-lg hover:bg-teal-600 transition-all transform hover:scale-105"
          >
            <Lock className="mr-2" size={20} />
            Continue to Payment
          </Button>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            By booking, you agree to our Terms of Service and Privacy Policy. 
            You can cancel up to 2 hours before your session for a full refund.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
