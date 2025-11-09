import { useState, useEffect } from 'react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import '../styles/globals.css';

interface SavingsGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Choice {
  amount: number;
  description: string;
  emoji: string;
}

export function SavingsGame({ onBack, onComplete }: SavingsGameProps) {
  const [savingsGoal] = useState(100);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [week, setWeek] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [weeklyChoice, setWeeklyChoice] = useState<number | null>(null);
  const [choices, setChoices] = useState<Choice[]>([]);

  // All possible financial actions
  const allOptions: Choice[] = [
    { amount: 5, description: 'Save from allowance', emoji: '💵' },
    { amount: 10, description: 'Do extra chores', emoji: '🧹' },
    { amount: 15, description: 'Part-time job', emoji: '💼' },
    { amount: 20, description: 'Sell old toys', emoji: '🧸' },
    { amount: -5, description: 'Buy candy', emoji: '🍬' },
    { amount: -10, description: 'Go out with friends', emoji: '🍕' },
    { amount: -25, description: 'Buy video games', emoji: '🎮' },
    { amount: -15, description: 'Buy clothes', emoji: '👕' },
  ];

  // Shuffle helper
  const shuffleArray = (arr: Choice[]) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate 4 random options each week
  useEffect(() => {
    const randomChoices = shuffleArray(allOptions).slice(0, 4);
    setChoices(randomChoices);
  }, [week]);

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
      <GameBackButton onBack={onBack} />
      <Card className="shadow-2xl custom-rounded no-border custom-card">
        <CardHeader className="text-primary border-b-4 border-white/20 rounded-t-xl overflow-hidden custom-header flex flex-col items-center text-center header-spaced">
          <CardTitle className="text-3xl font-bold text-primary">
            Savings Bank
          </CardTitle>
          <CardDescription className="text-base text-primary">
            Save $100 for a new bike! Make smart financial choices each week.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-6 rounded-b-xl">
          {!gameComplete ? (
            <>
              <div className="text-center space-y-6">
                <div className="text-7xl">🐷</div>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-primary">
                    Week {week} of 10
                  </p>
                  <p className="text-4xl tracking-tight text-primary">
                    ${currentSavings} / ${savingsGoal}
                  </p>
                </div>
                <Progress value={progress} className="h-3 bg-slate-700" />
              </div>

              <div>
                <h3 className="text-xl mb-6 tracking-tight text-primary">
                  What's your move this week?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {choices.map((choice, index) => {
                    const isDisabled =
                      weeklyChoice !== null ||
                      (choice.amount < 0 && currentSavings + choice.amount < 0);

                    return (
                      <button
                        key={index}
                        onClick={() => handleChoice(choice.amount)}
                        disabled={isDisabled}
                        className={`p-6 rounded-2xl border-2 transition-all transform ${
                          weeklyChoice === choice.amount
                            ? 'border-[#DA2032] bg-gradient-to-br from-red-500/20 to-rose-500/20 scale-105 shadow-xl'
                            : 'border-white/10 bg-slate-800/50 hover:border-[#DA2032] hover:bg-gradient-to-br hover:from-red-500/10 hover:to-rose-500/10 hover:scale-105'
                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-5xl mb-3 text-primary">{choice.emoji}</div>
                        <p className="mb-2 text-primary">{choice.description}</p>
                        <p className="text-2xl text-primary">
                          {choice.amount > 0 ? '+' : ''}
                          {choice.amount === 0 ? 'Skip' : `$${choice.amount}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {weeklyChoice !== null && (
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                  <p className="text-lg text-primary">
                    {weeklyChoice > 0
                      ? '🎉 Great choice! Keep saving!'
                      : '😅 Oops! Try to save more next time!'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4 text-primary">
                {currentSavings >= savingsGoal ? '🎉' : '💪'}
              </div>
              <h3 className="text-4xl tracking-tight text-primary">
                {currentSavings >= savingsGoal
                  ? 'Challenge Complete!'
                  : 'Nice Effort!'}
              </h3>
              <p className="text-xl text-primary">
                {currentSavings >= savingsGoal
                  ? 'You reached your goal! Time to get that bike!'
                  : `You saved $${currentSavings}. Keep practicing to reach your goal!`}
              </p>
              <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                <p className="text-lg text-primary">
                  💡 Pro Tip: Small, consistent savings add up to big wins over
                  time!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
