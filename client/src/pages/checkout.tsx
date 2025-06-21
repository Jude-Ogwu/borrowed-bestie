import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Lock, Check } from 'lucide-react';
import { useLocation } from 'wouter';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const CheckoutForm = ({ bookingData }: { bookingData: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/booking-success',
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Your session has been booked! Check your email for confirmation.",
      });
      // Clear booking data
      sessionStorage.removeItem('bookingData');
      setLocation('/');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2" size={20} />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-teal text-white hover:bg-teal-600 py-3"
                disabled={!stripe}
              >
                Complete Booking - ${bookingData?.sessionType?.price}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-slate-500">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Lock size={16} />
          <span>Secured by Stripe</span>
        </div>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
};

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if Stripe is configured
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      setPaymentError("Payment processing is not configured. Please contact support.");
      return;
    }

    // Get booking data from sessionStorage
    const storedBookingData = sessionStorage.getItem('bookingData');
    if (!storedBookingData) {
      toast({
        title: "No booking data found",
        description: "Please start your booking process again.",
        variant: "destructive",
      });
      setLocation('/');
      return;
    }

    const parsedBookingData = JSON.parse(storedBookingData);
    setBookingData(parsedBookingData);

    // Create PaymentIntent
    apiRequest("POST", "/api/create-payment-intent", { 
      amount: parsedBookingData.sessionType.price 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message.includes("not configured")) {
          setPaymentError(data.message);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
        console.error('Payment initialization error:', error);
      });
  }, [toast, setLocation]);

  if (paymentError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Payment Unavailable</h2>
            <p className="text-red-600 mb-4">{paymentError}</p>
            <Button onClick={() => setLocation('/')} variant="outline">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret || !bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-slate-800">Complete Your Booking</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Booking Summary */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookingData.listener && (
                <div className="flex items-center space-x-4">
                  <img
                    src={bookingData.listener.imageUrl}
                    alt={bookingData.listener.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-800">{bookingData.listener.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {bookingData.listener.specialties.slice(0, 2).map((specialty: string) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Session Type</span>
                  <span className="font-medium">{bookingData.sessionType.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-medium">{bookingData.sessionType.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date & Time</span>
                  <span className="font-medium">{bookingData.date}, {bookingData.time}</span>
                </div>
                {bookingData.notes && (
                  <div className="pt-2">
                    <span className="text-slate-600 text-sm">Session Notes:</span>
                    <p className="text-sm text-slate-700 mt-1 p-2 bg-slate-50 rounded">
                      {bookingData.notes}
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${bookingData.sessionType.price}</span>
              </div>
            </CardContent>
          </Card>

          {/* What happens next */}
          <Card className="bg-teal-50 border-teal-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="text-teal-600 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-sm text-slate-700">
                    You'll receive an email confirmation with session details
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-teal-600 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-sm text-slate-700">
                    A calendar invite will be sent to your email
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-teal-600 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-sm text-slate-700">
                    You'll receive reminders 24 hours and 1 hour before your session
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div>
          {stripePromise ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm bookingData={bookingData} />
            </Elements>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Unavailable</h3>
              <p className="text-red-600">Payment processing is not configured.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
