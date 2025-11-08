import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { SavingsGame } from './components/SavingsGame';
import { BudgetChallenge } from './components/BudgetChallenge';
import { WantVsNeedGame } from './components/WantVsNeedGame';
import { MoneyMatchGame } from './components/MoneyMatchGame';
import { InvestingGame } from './components/InvestingGame';
import { DebtGame } from './components/DebtGame';
import { MortgageGame } from './components/MortgageGame';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'savings' | 'budget' | 'wantvsneed' | 'moneymatch' | 'investing' | 'debt' | 'mortgage'>('dashboard');
  const [userProgress, setUserProgress] = useState({
    totalPoints: 0,
    badges: [] as string[],
    gamesCompleted: {
      savings: 0,
      budget: 0,
      wantvsneed: 0,
      moneymatch: 0,
      investing: 0,
      debt: 0,
      mortgage: 0,
    }
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('financialLiteracyProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      // Ensure all game types exist with default values
      setUserProgress({
        totalPoints: parsed.totalPoints || 0,
        badges: parsed.badges || [],
        gamesCompleted: {
          savings: parsed.gamesCompleted?.savings || 0,
          budget: parsed.gamesCompleted?.budget || 0,
          wantvsneed: parsed.gamesCompleted?.wantvsneed || 0,
          moneymatch: parsed.gamesCompleted?.moneymatch || 0,
          investing: parsed.gamesCompleted?.investing || 0,
          debt: parsed.gamesCompleted?.debt || 0,
          mortgage: parsed.gamesCompleted?.mortgage || 0,
        }
      });
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('financialLiteracyProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const addPoints = (points: number) => {
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points
    }));
  };

  const completeGame = (gameType: keyof typeof userProgress.gamesCompleted) => {
    setUserProgress(prev => ({
      ...prev,
      gamesCompleted: {
        ...prev.gamesCompleted,
        [gameType]: prev.gamesCompleted[gameType] + 1
      }
    }));
  };

  const addBadge = (badge: string) => {
    setUserProgress(prev => {
      if (!prev.badges.includes(badge)) {
        return {
          ...prev,
          badges: [...prev.badges, badge]
        };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Decorative nature elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-20">🌿</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20">🍃</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-20">🌱</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20">🌺</div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl border-b-4 border-amber-500 relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-4xl">🐱</span>
              </div>
              <div>
                <h1 className="text-3xl tracking-tight flex items-center gap-2">
                  Money Cats 
                  <span className="text-2xl">🐾</span>
                </h1>
                <p className="text-sm text-emerald-100 tracking-wide">POWERED BY CAPITAL ONE</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 px-6 py-3 rounded-2xl shadow-lg border-2 border-amber-300 hover:scale-105 transition-transform">
                <p className="text-xs text-amber-900 uppercase tracking-wide">Catnip Points</p>
                <p className="text-2xl text-white flex items-center gap-1">
                  {userProgress.totalPoints} <span className="text-lg">🐟</span>
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 px-6 py-3 rounded-2xl shadow-lg border-2 border-teal-400 hover:scale-105 transition-transform">
                <p className="text-xs text-teal-100 uppercase tracking-wide">Badges</p>
                <p className="text-2xl text-white flex items-center gap-1">
                  {userProgress.badges.length} <span className="text-lg">🏵️</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <Dashboard 
            userProgress={userProgress}
            onSelectGame={setCurrentView}
          />
        )}
        
        {currentView === 'savings' && (
          <SavingsGame 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('savings');
              if (userProgress.gamesCompleted.savings === 0) {
                addBadge('First Saver');
              }
            }}
          />
        )}
        
        {currentView === 'budget' && (
          <BudgetChallenge 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('budget');
              if (userProgress.gamesCompleted.budget === 0) {
                addBadge('Budget Boss');
              }
            }}
          />
        )}
        
        {currentView === 'wantvsneed' && (
          <WantVsNeedGame 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('wantvsneed');
              if (userProgress.gamesCompleted.wantvsneed === 0) {
                addBadge('Smart Spender');
              }
            }}
          />
        )}
        
        {currentView === 'moneymatch' && (
          <MoneyMatchGame 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('moneymatch');
              if (userProgress.gamesCompleted.moneymatch === 0) {
                addBadge('Money Matcher');
              }
            }}
          />
        )}
        
        {currentView === 'investing' && (
          <InvestingGame 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('investing');
              if (userProgress.gamesCompleted.investing === 0) {
                addBadge('Future Investor');
              }
            }}
          />
        )}
        
        {currentView === 'debt' && (
          <DebtGame 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('debt');
              if (userProgress.gamesCompleted.debt === 0) {
                addBadge('Debt Destroyer');
              }
            }}
          />
        )}
        
        {currentView === 'mortgage' && (
          <MortgageGame 
            onBack={() => setCurrentView('dashboard')}
            onComplete={(points) => {
              addPoints(points);
              completeGame('mortgage');
              if (userProgress.gamesCompleted.mortgage === 0) {
                addBadge('Home Helper');
              }
            }}
          />
        )}
      </main>
    </div>
  );
}