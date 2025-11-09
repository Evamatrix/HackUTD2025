import { useState } from 'react';
import { ArrowLeft, Scale } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface WantVsNeedGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface GameItem {
  name: string;
  emoji: string;
  type: 'want' | 'need';
  explanation: string;
}

export function WantVsNeedGame({ onBack, onComplete }: WantVsNeedGameProps) {
  const items: GameItem[] = [
    { name: 'Water Bottle', emoji: '💧', type: 'need', explanation: 'You need water to stay healthy!' },
    { name: 'Designer Shoes', emoji: '👟', type: 'want', explanation: 'Regular shoes work fine. Designer brands are a want!' },
    { name: 'School Supplies', emoji: '✏️', type: 'need', explanation: 'You need these for learning!' },
    { name: 'Video Game', emoji: '🎮', type: 'want', explanation: 'Games are fun but not necessary!' },
    { name: 'Winter Coat', emoji: '🧥', type: 'need', explanation: 'You need a coat to stay warm!' },
    { name: 'Candy', emoji: '🍭', type: 'want', explanation: 'Candy is a treat, not a necessity!' },
    { name: 'Healthy Food', emoji: '🥗', type: 'need', explanation: 'Your body needs nutritious food!' },
    { name: 'Latest Phone', emoji: '📱', type: 'want', explanation: 'An older phone works fine. The latest is a want!' },
    { name: 'Toothbrush', emoji: '🪥', type: 'need', explanation: 'You need this for dental health!' },
    { name: 'Toy Collection', emoji: '🧸', type: 'want', explanation: 'Toys are fun but not necessary!' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const currentItem = items[currentIndex];

  const handleChoice = (choice: 'want' | 'need') => {
    const correct = choice === currentItem.type;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentIndex + 1 >= items.length) {
        setGameComplete(true);
        onComplete(score + (correct ? 10 : 0));
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Inline back button (removed floating) */}
      <GameBackButton onBack={onBack} />
      <Card className="shadow-2xl custom-rounded no-border custom-card">
        <CardHeader className="text-white border-b-4 border-white/20 rounded-t-xl overflow-hidden custom-header flex flex-col items-center text-center header-spaced text-primary">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Scale className="w-7 h-7" />
            </div>
            Want vs Need
          </CardTitle>
          <CardDescription className="text-red-100 text-base text-primary ">
            Learn the difference between wants and needs!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {!gameComplete ? (
            <>
              <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl">
                <p className="text-sm text-blue-200 uppercase tracking-wider text-primary ">
                  Question {currentIndex + 1} of {items.length}
                </p>
                <p className="text-sm text-green-300 uppercase tracking-wider">
                  Score: {score} points
                </p>
              </div>

              <div className="text-center space-y-8 py-8">
                <div className="text-8xl mb-4">{currentItem.emoji}</div>
                <h3 className="text-4xl text-white tracking-tight text-primary ">{currentItem.name}</h3>
                <p className="text-2xl text-blue-200">Is this a want or a need?</p>

                {!showFeedback ? (
                  <div className="flex gap-6 justify-center mt-8">
                    <button
                      onClick={() => handleChoice('want')}
                       className="group px-12 py-8 rounded-3xl  bg-slate-800 hover:to-[#002D44] transition-all transform hover:scale-110 shadow-2xl border-2 border-white/20"
                    >
                      <p className="text-4xl mb-3">🎁</p>
                      <p className="text-2xl tracking-tight text-primary ">Want</p>
                    </button>
                    <button
                      onClick={() => handleChoice('need')}
                      className="group px-12 py-8 rounded-3xl border-white/10 bg-slate-800/50 hover:border-[#004977] hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 hover:scale-105 transition-all transform hover:scale-110 shadow-2xl border-2 border-white/20"
                    >
                      <p className="text-4xl mb-3">✅</p>
                      <p className="text-2xl tracking-tight text-primary ">Need</p>
                    </button>
                  </div>
                ) : (
                  <div className={`p-8 rounded-3xl border-2 ${isCorrect ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30' : 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-400/30'}`}>
                    <p className={`text-3xl mb-3 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                      {isCorrect ? '🎉 Correct!' : '❌ Not quite!'}
                    </p>
                    <p className={`text-xl ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                      {currentItem.explanation}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                <p className="text-sm text-blue-200 text-primary ">
                  💡 Remember: Needs are essential for living and health. 
                  Wants are nice to have but not necessary.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">
                {score >= 80 ? '🏆' : score >= 60 ? '🎉' : '💪'}
              </div>
              <h3 className="text-4xl text-white tracking-tight">
                {score >= 80 ? 'Outstanding!' : score >= 60 ? 'Great Job!' : 'Keep Practicing!'}
              </h3>
              <p className="text-xl text-blue-200">
                Final Score: {score} out of {items.length * 10} points
              </p>
              <p className="text-lg text-blue-300">
                You got {score / 10} out of {items.length} correct!
              </p>
              <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                <p className="text-yellow-100 text-lg">
                  💡 Pro Tip: Understanding wants vs needs is key to smart spending!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}