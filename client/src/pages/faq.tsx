import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, AlertTriangle, Phone, MessageSquare } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "confidential",
    question: "How do I know my conversation is confidential?",
    answer: "All conversations are conducted through secure, encrypted channels. Our listeners sign strict confidentiality agreements, and we never record or monitor your sessions unless required by law for safety reasons."
  },
  {
    id: "vs-therapy",
    question: "What's the difference between this and therapy?",
    answer: "Our listeners provide peer support, emotional validation, and a safe space to process your thoughts. They don't diagnose, treat mental health conditions, or provide clinical advice. If you need professional therapy, we can help you find appropriate resources."
  },
  {
    id: "listener-training",
    question: "How are listeners trained and vetted?",
    answer: "All listeners complete background checks, comprehensive training in active listening and crisis recognition, and ongoing supervision. They're required to maintain boundaries and refer users to professional help when appropriate."
  },
  {
    id: "cancellation",
    question: "What's your cancellation policy?",
    answer: "You can cancel or reschedule up to 2 hours before your session for a full refund. Emergency cancellations are handled case-by-case. No-shows are non-refundable, but we understand life happens and will work with you when possible."
  },
  {
    id: "comfort",
    question: "What if I don't feel comfortable with my listener?",
    answer: "You can end any session at any time if you feel uncomfortable. We'll provide a full refund and help match you with a different listener who might be a better fit. Your comfort and safety are our priority."
  },
  {
    id: "pricing",
    question: "How much do sessions cost?",
    answer: "Our sessions are priced at $15 for 15 minutes, $25 for 30 minutes, and $40 for 60 minutes. We believe quality emotional support should be accessible and affordable for everyone."
  },
  {
    id: "emergency",
    question: "What if I'm having a mental health emergency?",
    answer: "If you're experiencing a mental health crisis, please contact emergency services immediately or call a crisis hotline. Our listeners are not trained to handle emergencies and will direct you to appropriate professional resources."
  }
];

const emergencyResources = {
  us: [
    { name: "National Suicide Prevention Lifeline", number: "988" },
    { name: "Crisis Text Line", number: "Text HOME to 741741" },
    { name: "National Sexual Assault Hotline", number: "1-800-656-HOPE" }
  ],
  international: [
    { name: "UK Samaritans", number: "116 123" },
    { name: "Canada Crisis Line", number: "1-833-456-4566" },
    { name: "Australia Lifeline", number: "13 11 14" }
  ]
};

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Safety & FAQ</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">Your safety and comfort are our top priorities</p>
      </div>

      {/* Important Safety Notice */}
      <Card className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 mb-12">
        <CardContent className="p-6">
          <div className="flex items-start">
            <AlertTriangle className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Important: This is peer support, not therapy
              </h3>
              <p className="text-orange-700 dark:text-orange-300">
                Our listeners provide emotional support and a caring ear, but they are not licensed therapists 
                or medical professionals. If you're experiencing a mental health crisis, please contact emergency 
                services or a crisis hotline immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Resources */}
      <Card className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-12">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
            <Phone className="mr-2" size={20} />
            Emergency Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-red-700 dark:text-red-300 mb-3">United States</h4>
              <ul className="space-y-2">
                {emergencyResources.us.map((resource, index) => (
                  <li key={index} className="text-red-600 dark:text-red-400 text-sm">
                    <strong>{resource.name}:</strong> {resource.number}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 dark:text-red-300 mb-3">International</h4>
              <ul className="space-y-2">
                {emergencyResources.international.map((resource, index) => (
                  <li key={index} className="text-red-600 dark:text-red-400 text-sm">
                    <strong>{resource.name}:</strong> {resource.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Frequently Asked Questions</h2>
        
        {faqData.map((faq) => (
          <Card key={faq.id} className="bg-slate-50 dark:bg-slate-800">
            <Collapsible
              open={openItems.has(faq.id)}
              onOpenChange={() => toggleItem(faq.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex justify-between p-6 h-auto text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <div className="flex-grow pr-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white break-words whitespace-normal">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`text-slate-500 dark:text-slate-400 transition-transform flex-shrink-0 ${
                      openItems.has(faq.id) ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Additional Safety Information */}
      <Card className="mt-12 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
        <CardContent className="p-8 text-center">
          <MessageSquare className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            We're here to help. Reach out to our support team for any additional questions or concerns.
          </p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Contact Support
          </Button>
        </CardContent>
      </Card>

      {/* Privacy & Safety Commitments */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">End-to-End Encryption</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              All conversations are protected with industry-standard encryption
            </p>
          </CardContent>
        </Card>

        <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Background Checked</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              All listeners undergo comprehensive background checks and training
            </p>
          </CardContent>
        </Card>

        <Card className="text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">24/7 Support</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Our safety team is available around the clock for any concerns
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
