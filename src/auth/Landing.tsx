import React from "react";
import { RedirectLoginOptions } from "@auth0/auth0-react";

interface LandingProps {
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
}

export default function Landing({ loginWithRedirect }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header with cat logo */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl border-b-4 border-amber-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/assets/icons/main-cat.svg" alt="Main Cat" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-3xl tracking-tight flex items-center gap-2">
                Capital Meow-ney 
                <span className="text-2xl">🐾</span>
              </h1>
              <p className="text-sm text-emerald-100 tracking-wide">POWERED BY CAPITAL ONE</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6">
            {/* Box 1 */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg border-2 border-emerald-200 hover:border-amber-200 transition-all">
              <h2 className="text-4xl font-extrabold text-emerald-800 mb-4">Welcome to Financial Fun!</h2>
              <p className="text-lg text-teal-700">
                Learn money skills through exciting games. Earn Catnip Points, collect badges, and become a financial whiz — all while having fun! 🎮
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg border-2 border-teal-200 hover:border-amber-200 transition-all">
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">Ready to Play?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Log In */}
                <button
                  onClick={() => loginWithRedirect()}
                  className="px-8 py-4 rounded-2xl text-white font-semibold shadow-md transition-transform hover:scale-105
                             bg-gradient-to-r from-amber-400 to-amber-600
                             hover:from-emerald-600 hover:to-teal-600"
                >
                  Log In
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}
                  className="px-8 py-4 rounded-2xl bg-white text-emerald-700 font-semibold shadow-md border-2 border-emerald-400 hover:border-amber-300 transform hover:scale-105 transition-all"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Features */}
          <div className="space-y-4">
            {/* Box 3 */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg border-2 border-emerald-200 hover:border-amber-200 transition-all text-center">
              <img src="/assets/icons/main-cat.svg" alt="Cat mascot" className="mx-auto w-32 h-32 mb-4 animate-bounce-slow" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-emerald-50 rounded-2xl">
                  <span className="text-2xl">💰</span>
                  <h4 className="font-semibold text-emerald-800">Savings Game</h4>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl">
                  <span className="text-2xl">📊</span>
                  <h4 className="font-semibold text-emerald-800">Budget Challenge</h4>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl">
                  <span className="text-2xl">📈</span>
                  <h4 className="font-semibold text-emerald-800">Investing</h4>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl">
                  <span className="text-2xl">🏠</span>
                  <h4 className="font-semibold text-emerald-800">Mortgage Game</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-emerald-700">
        <p>Start your financial journey today! 🚀</p>
      </footer>
    </div>
  );
}
