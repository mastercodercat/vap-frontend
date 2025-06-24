import { useAppDispatch, useTypedSelector } from "../store/hooks";
import { openSignInDialog, openSignUpDialog } from "../store/slices/uiSlice";
import { signOut } from "../store/slices/authSlice";
import { SignInDialog } from "../components/SignInDialog";
import { SignUpDialog } from "../components/SignUpDialog";
import type { RootState } from "../store";

export function LandingPage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    dispatch(signOut());
  };

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
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700 text-sm">
                    Welcome, {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => dispatch(openSignInDialog())}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => dispatch(openSignUpDialog())}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Your AI-Powered Virtual Assistant
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your workflow with intelligent automation, developer
              connections, and AI-powered resume generation.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to be productive
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  👨‍💻
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Developer Network
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Connect with talented developers, find collaborators, and
                  build amazing projects together.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  📄
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  AI Resume Generation
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Create professional resumes with AI assistance, tailored to
                  your skills and experience.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  🤖
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  AI Assistant
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Get help with tasks, questions, and productivity tips from
                  your personal AI assistant.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  📊
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Analytics & Insights
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Track your productivity, analyze your workflow, and get
                  insights to improve performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Free</h3>
                  <p className="mt-4 text-sm text-gray-500">
                    Perfect for getting started
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      $0
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Basic AI assistant
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        5 resume generations
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Basic developer search
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Pro</h3>
                  <p className="mt-4 text-sm text-gray-500">
                    For professionals and teams
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      $29
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Advanced AI assistant
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Unlimited resume generations
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Advanced developer search
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Analytics dashboard
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Enterprise
                  </h3>
                  <p className="mt-4 text-sm text-gray-500">
                    For large organizations
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      $99
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Everything in Pro
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Team collaboration
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Custom integrations
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Priority support
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white">VAP</h3>
              <p className="mt-4 text-gray-300">
                Your AI-powered virtual assistant for productivity, developer
                connections, and professional growth.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Product
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-white"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              © 2024 VAP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Dialogs */}
      <SignInDialog />
      <SignUpDialog />
    </div>
  );
}
