import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface MoneyMatchGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface MatchItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

export function MoneyMatchGame({ onBack, onComplete }: MoneyMatchGameProps) {
  const items: MatchItem[] = [
    { id: 1, name: 'Pencil', price: 1, emoji: '✏️' },
    { id: 2, name: 'Notebook', price: 3, emoji: '📓' },
    { id: 3, name: 'Backpack', price: 25, emoji: '🎒' },
    { id: 4, name: 'Calculator', price: 15, emoji: '🔢' },
    { id: 5, name: 'Lunch Box', price: 10, emoji: '🍱' },
    { id: 6, name: 'Water Bottle', price: 8, emoji: '💧' },
  ];

  const [shuffledPrices, setShuffledPrices] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<MatchItem | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    const prices = items.map(item => item.price);
    setShuffledPrices(prices.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (selectedItem && selectedPrice !== null) {
      setAttempts(attempts + 1);
      const correct = selectedItem.price === selectedPrice;
      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
        setScore(score + 10);
        setMatched([...matched, selectedItem.id]);
        
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedItem(null);
          setSelectedPrice(null);
          
          if (matched.length + 1 === items.length) {
            setGameComplete(true);
            const finalScore = Math.max(100 - (attempts - items.length) * 5, 60);
            onComplete(finalScore);
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedItem(null);
          setSelectedPrice(null);
        }, 1500);
      }
    }
  }, [selectedItem, selectedPrice]);

  const handleItemClick = (item: MatchItem) => {
    if (!matched.includes(item.id) && !showFeedback) {
      setSelectedItem(item);
    }
  };

  const handlePriceClick = (price: number) => {
    if (!matched.some(id => items.find(item => item.id === id)?.price === price) && !showFeedback) {
      setSelectedPrice(price);
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Inline back button (removed floating) */}
      <GameBackButton onClick={onBack} tone="dark" className="mb-4" />

      <Card className="border-2 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-[#004977] to-[#003D5C] text-white border-b-4 border-white/20">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="w-7 h-7" />
            </div>
            Money Match
          </CardTitle>
          <CardDescription className="text-blue-100 text-base">
            Match each item with its correct price!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {!gameComplete ? (
            <>
              <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl">
                <p className="text-sm text-blue-200 uppercase tracking-wider">
                  Matched: {matched.length} of {items.length}
                </p>
                <p className="text-sm text-green-300 uppercase tracking-wider">
                  Score: {score} points
                </p>
              </div>

              {showFeedback && (
                <div className={`p-6 rounded-2xl text-center border-2 ${isCorrect ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30' : 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-400/30'}`}>
                  <p className={`text-2xl ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                    {isCorrect ? '🎉 Perfect Match!' : '❌ Try Again!'}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Items Column */}
                <div>
                  <h3 className="text-xl text-white mb-4 tracking-tight">Items</h3>
                  <div className="space-y-3">
                    {items.map((item) => {
                      const isMatched = matched.includes(item.id);
                      const isSelected = selectedItem?.id === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          disabled={isMatched || showFeedback}
                          className={`w-full p-5 rounded-2xl border-2 transition-all transform flex items-center gap-4 ${
                            isMatched
                              ? 'border-[#004977] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-60'
                              : isSelected
                              ? 'border-[#004977] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 scale-105 shadow-xl'
                              : 'border-white/10 bg-slate-800/50 hover:border-[#004977] hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 hover:scale-105'
                          }`}
                        >
                          <span className="text-4xl">{item.emoji}</span>
                          <span className="text-white text-lg">{item.name}</span>
                          {isMatched && <span className="ml-auto text-green-400 text-2xl">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Prices Column */}
                <div>
                  <h3 className="text-xl text-white mb-4 tracking-tight">Prices</h3>
                  <div className="space-y-3">
                    {shuffledPrices.map((price, index) => {
                      const isMatched = matched.some(id => items.find(item => item.id === id)?.price === price);
                      const isSelected = selectedPrice === price;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handlePriceClick(price)}
                          disabled={isMatched || showFeedback}
                          className={`w-full p-5 rounded-2xl border-2 transition-all transform ${
                            isMatched
                              ? 'border-[#004977] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-60'
                              : isSelected
                              ? 'border-[#004977] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 scale-105 shadow-xl'
                              : 'border-white/10 bg-slate-800/50 hover:border-[#004977] hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 hover:scale-105'
                          }`}
                        >
                          <span className="text-blue-300 text-2xl">${price}</span>
                          {isMatched && <span className="ml-3 text-green-400 text-2xl">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                <p className="text-sm text-blue-200">
                  💡 Pro Tip: Click an item on the left, then click its matching price on the right!
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">🏆</div>
              <h3 className="text-4xl text-white tracking-tight">Challenge Complete!</h3>
              <p className="text-xl text-blue-200">
                You matched all items correctly!
              </p>
              <p className="text-lg text-blue-300">
                Attempts: {attempts} | Perfect Score: {items.length}
              </p>
              <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                <p className="text-yellow-100 text-lg">
                  💡 Pro Tip: Knowing real-world prices helps you make smart shopping decisions!
                </p>
              </div>
              <Button onClick={onBack} className="bg-gradient-to-r from-[#000] to-[#B01828] hover:from-[#B01828] hover:to-[#901420] text-black hover:text-black focus:text-black text-lg px-8 py-6 shadow-xl">
                Back to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}