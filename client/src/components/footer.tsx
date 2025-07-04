import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/new_logo.jpg" alt="Borrowed Bestie Logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Borrowed Bestie</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Connecting hearts through listening. Sometimes you just need someone to talk to, 
              and we're here to make that happen.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/listeners" className="hover:text-teal-400 transition-colors">
                  Find a Bestie
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Become a Listener
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-teal-400 transition-colors">
                  Safety & FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">© 2024 Borrowed Bestie. All rights reserved.</p>
          <p className="text-slate-400 text-sm mt-2 md:mt-0">
            Made with ❤️ for human connection
          </p>
        </div>
      </div>
    </footer>
  );
}
