import { useState } from "react";
import { SignInDialog } from "./components/SignInDialog";
import { SignUpDialog } from "./components/SignUpDialog";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">VAP</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a
                    href="#features"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Pricing
                  </a>
                  <a
                    href="#about"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    About
                  </a>
                </div>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSignInOpen(true)}
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUpOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign In Dialog */}
      <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />

      {/* Sign Up Dialog */}
      <SignUpDialog isOpen={isSignUpOpen} onOpenChange={setIsSignUpOpen} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your AI-Powered Virtual Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of productivity with VAP. Our intelligent
              virtual assistant helps you manage tasks, schedule meetings, and
              streamline your workflow with advanced AI capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started Free
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how VAP can transform your daily workflow with
              cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Conversations
              </h3>
              <p className="text-gray-600">
                Natural language processing that understands context and
                provides intelligent responses to your queries.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Scheduling
              </h3>
              <p className="text-gray-600">
                Automatically manage your calendar, schedule meetings, and send
                reminders with intelligent time optimization.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Get detailed analytics on your productivity patterns and receive
                personalized recommendations for improvement.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-600 text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Bank-level security with end-to-end encryption and compliance
                with industry standards.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-600 text-xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-Platform Support
              </h3>
              <p className="text-gray-600">
                Access VAP from anywhere with our web, mobile, and desktop
                applications that sync seamlessly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Optimized performance ensures instant responses and smooth
                interactions with minimal latency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How VAP Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with VAP in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sign Up
              </h3>
              <p className="text-gray-600">
                Create your account in seconds with just your email and
                password.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect
              </h3>
              <p className="text-gray-600">
                Link your calendar, email, and other productivity tools to VAP.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start Working
              </h3>
              <p className="text-gray-600">
                Begin chatting with your AI assistant and watch your
                productivity soar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-4">Perfect for getting started</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $0<span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 100 AI interactions per month
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic scheduling features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Email support
                </li>
              </ul>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-600 rounded-lg p-8 text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-blue-100 mb-4">For professionals and teams</p>
              <div className="text-4xl font-bold mb-6">
                $29<span className="text-lg text-blue-100">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited AI interactions
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Advanced scheduling & analytics
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Team collaboration features
                </li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors font-medium">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Enterprise
              </h3>
              <p className="text-gray-600 mb-4">For large organizations</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                Custom
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Pro
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom integrations
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced security features
                </li>
              </ul>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using VAP to
            streamline their workflow and boost their productivity.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">VAP</h3>
              <p className="text-gray-400">
                Your AI-powered virtual assistant for enhanced productivity and
                workflow management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VAP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
