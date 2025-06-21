import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { X, Lock, Calendar, Clock } from "lucide-react";
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
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("3:00 PM");
  const [notes, setNotes] = useState("");

  const handleProceedToPayment = () => {
    // Create booking data to pass to checkout
    const bookingData = {
      listener: selectedListener,
      sessionType: selectedSession,
      date: selectedDate,
      time: selectedTime,
      notes,
    };
    
    // Store booking data in sessionStorage for checkout page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to checkout
    onClose();
    setLocation('/checkout');
  };

  const timeSlots = [
    "9:00 AM", "11:30 AM", "2:00 PM", "3:00 PM", 
    "4:30 PM", "6:00 PM", "7:30 PM", "9:00 PM"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center justify-between">
            Book Your Session
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Session Type Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Choose Session Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {sessionTypes.map((session) => (
                <button
                  key={session.duration}
                  onClick={() => setSelectedSession(session)}
                  className={`border-2 rounded-lg p-4 transition-colors ${
                    selectedSession.duration === session.duration
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-200 hover:border-teal-500"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      selectedSession.duration === session.duration 
                        ? "text-teal-600" 
                        : "text-slate-600"
                    }`}>
                      {session.duration}min
                    </div>
                    <div className="text-sm text-slate-600 mb-2">{session.label}</div>
                    <div className="text-lg font-semibold text-slate-800">${session.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar View */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Date & Time</h3>
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(`Dec ${day}`)}
                    className={`text-center py-2 rounded transition-colors ${
                      day === 13 ? "bg-teal-100 font-semibold text-teal-700" : "hover:bg-teal-100"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mt-4">
              <h4 className="font-medium text-slate-700 mb-3">Available Times ({selectedDate})</h4>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 text-sm border rounded transition-colors ${
                      selectedTime === time
                        ? "border-teal-500 bg-teal-50 text-teal-700 font-medium"
                        : "border-slate-200 hover:border-teal-500 hover:bg-teal-50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Session Notes */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Session Notes (Optional)</h3>
            <p className="text-sm text-slate-600 mb-3">
              Share anything you'd like your listener to know beforehand. This remains private.
            </p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Any specific areas you'd like to focus on?"
              rows={3}
            />
          </div>

          {/* Summary */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Session Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Listener:</span>
                <span className="font-medium">
                  {selectedListener ? selectedListener.name : "Select from listeners"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date & Time:</span>
                <span className="font-medium">{selectedDate}, {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="font-medium">{selectedSession.duration} minutes</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                <span className="font-semibold text-slate-800">Total:</span>
                <span className="font-semibold text-slate-800">${selectedSession.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handleProceedToPayment}
            className="w-full bg-gradient-teal text-white py-4 text-lg hover:bg-teal-600 transition-all transform hover:scale-105"
          >
            <Lock className="mr-2" size={20} />
            Secure Payment with Stripe
          </Button>

          <p className="text-xs text-slate-500 text-center">
            By booking, you agree to our Terms of Service and Privacy Policy. 
            You can cancel up to 2 hours before your session for a full refund.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
