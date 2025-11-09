import { useState } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface SavingsGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function SavingsGame({ onBack, onComplete }: SavingsGameProps) {
  const [savingsGoal] = useState(100);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [week, setWeek] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [weeklyChoice, setWeeklyChoice] = useState<number | null>(null);

  const choices = [
    { amount: 5, description: 'Save from allowance', emoji: '💵' },
    { amount: 10, description: 'Do extra chores', emoji: '🧹' },
    { amount: 15, description: 'Birthday money', emoji: '🎂' },
    { amount: -5, description: 'Buy candy', emoji: '🍬' },
  ];

  const handleChoice = (amount: number) => {
    setWeeklyChoice(amount);
    
    setTimeout(() => {
      const newSavings = Math.max(0, currentSavings + amount);
      setCurrentSavings(newSavings);
      
      if (newSavings >= savingsGoal) {
        setGameComplete(true);
        onComplete(100);
      } else if (week >= 10) {
        setGameComplete(true);
        const points = Math.floor((newSavings / savingsGoal) * 50);
        onComplete(points);
      } else {
        setWeek(week + 1);
      }
      
      setWeeklyChoice(null);
    }, 1500);
  };

  const progress = (currentSavings / savingsGoal) * 100;

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Inline back button (removed floating) */}
      <GameBackButton onClick={onBack} tone="dark" className="mb-4" />

      <Card className="border-2 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-[#DA2032] to-[#B01828] text-white border-b-4 border-white/20">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-white/20 rounded-lg">
              <Coins className="w-7 h-7" />
            </div>
            Piggy Bank Challenge
          </CardTitle>
          <CardDescription className="text-red-100 text-base">
            Save $100 for a new bike! Make smart financial choices each week.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {!gameComplete ? (
            <>
              <div className="text-center space-y-6">
                <div className="text-7xl">🐷</div>
                <div className="space-y-2">
                  <p className="text-sm text-blue-300 uppercase tracking-wider">Week {week} of 10</p>
                  <p className="text-4xl text-white tracking-tight">${currentSavings} / ${savingsGoal}</p>
                </div>
                <Progress value={progress} className="h-3 bg-slate-700" />
              </div>

              <div>
                <h3 className="text-xl text-white mb-6 tracking-tight">What's your move this week?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoice(choice.amount)}
                      disabled={weeklyChoice !== null}
                      className={`p-6 rounded-2xl border-2 transition-all transform ${
                        weeklyChoice === choice.amount
                          ? 'border-[#DA2032] bg-gradient-to-br from-red-500/20 to-rose-500/20 scale-105 shadow-xl'
                          : 'border-white/10 bg-slate-800/50 hover:border-[#DA2032] hover:bg-gradient-to-br hover:from-red-500/10 hover:to-rose-500/10 hover:scale-105'
                      } ${weeklyChoice !== null ? 'opacity-50' : ''}`}
                    >
                      <div className="text-5xl mb-3">{choice.emoji}</div>
                      <p className="text-white mb-2">{choice.description}</p>
                      <p className={`text-2xl ${choice.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {choice.amount > 0 ? '+' : ''}{choice.amount === 0 ? 'Skip' : `$${choice.amount}`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {weeklyChoice !== null && (
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                  <p className="text-blue-200 text-lg">
                    {weeklyChoice > 0 ? '🎉 Great choice! Keep saving!' : '😅 Oops! Try to save more next time!'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">
                {currentSavings >= savingsGoal ? '🎉' : '💪'}
              </div>
              <h3 className="text-4xl text-white tracking-tight">
                {currentSavings >= savingsGoal ? 'Challenge Complete!' : 'Nice Effort!'}
              </h3>
              <p className="text-xl text-blue-200">
                {currentSavings >= savingsGoal
                  ? 'You reached your goal! Time to get that bike!'
                  : `You saved $${currentSavings}. Keep practicing to reach your goal!`}
              </p>
              <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                <p className="text-yellow-100 text-lg">
                  💡 Pro Tip: Small, consistent savings add up to big wins over time!
                </p>
              </div>
              <Button onClick={onBack} className="bg-gradient-to-r from-[#DA2032] to-[#B01828] hover:from-[#B01828] hover:to-[#901420] text-black hover:text-black focus:text-black text-lg px-8 py-6 shadow-xl">
                Back to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}