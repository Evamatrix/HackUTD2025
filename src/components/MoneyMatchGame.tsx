import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface MoneyMatchGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface MatchItem {
  id: number;
  name: string;
  emoji: string;
  basePrice: number;
  variation: number;
}

export function MoneyMatchGame({ onBack, onComplete }: MoneyMatchGameProps) {
  const allItems: MatchItem[] = [
    { id: 1, name: 'Milk (1 gallon)', emoji: '🥛', basePrice: 4, variation: 0.2 },
    { id: 2, name: 'Loaf of Bread', emoji: '🍞', basePrice: 3, variation: 0.25 },
    { id: 3, name: 'T-Shirt', emoji: '👕', basePrice: 15, variation: 0.3 },
    { id: 4, name: 'Running Shoes', emoji: '👟', basePrice: 60, variation: 0.25 },
    { id: 5, name: 'Bicycle', emoji: '🚲', basePrice: 300, variation: 0.15 },
    { id: 6, name: 'Smartphone', emoji: '📱', basePrice: 800, variation: 0.2 },
    { id: 7, name: 'Laptop', emoji: '💻', basePrice: 1000, variation: 0.2 },
    { id: 8, name: 'Headphones', emoji: '🎧', basePrice: 75, variation: 0.25 },
    { id: 9, name: 'Movie Ticket', emoji: '🎟️', basePrice: 12, variation: 0.15 },
    { id: 10, name: 'Coffee', emoji: '☕', basePrice: 5, variation: 0.25 },
    { id: 11, name: 'Burrito', emoji: '🌯', basePrice: 10, variation: 0.2 },
    { id: 12, name: 'Basketball', emoji: '🏀', basePrice: 30, variation: 0.2 },
    { id: 13, name: 'Backpack', emoji: '🎒', basePrice: 45, variation: 0.25 },
    { id: 14, name: 'Soda (12-pack)', emoji: '🥤', basePrice: 9, variation: 0.2 },
    { id: 15, name: 'TV', emoji: '📺', basePrice: 450, variation: 0.25 },
    { id: 16, name: 'Gaming Console', emoji: '🎮', basePrice: 400, variation: 0.15 },
    { id: 17, name: 'Electric Scooter', emoji: '🛴', basePrice: 500, variation: 0.2 },
    { id: 18, name: 'Ice Cream', emoji: '🍦', basePrice: 6, variation: 0.3 },
    { id: 19, name: 'Book', emoji: '📚', basePrice: 20, variation: 0.25 },
    { id: 20, name: 'Water Bottle', emoji: '💧', basePrice: 15, variation: 0.2 },
  ];

  const getRandomPrice = (base: number, variation: number): number => {
    const factor = 1 + (Math.random() * 2 - 1) * variation;
    return Math.round(base * factor);
  };

  const [items, setItems] = useState<MatchItem[]>([]);
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
    const chosen = [...allItems].sort(() => Math.random() - 0.5).slice(0, 6);
    const priced = chosen.map(i => ({
      ...i,
      basePrice: getRandomPrice(i.basePrice, i.variation),
    }));
    setItems(priced);
    setShuffledPrices(priced.map(i => i.basePrice).sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (selectedItem && selectedPrice !== null) {
      setAttempts(a => a + 1);
      const correct = selectedItem.basePrice === selectedPrice;
      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
        setScore(s => s + 10);
        setMatched(prev => [...prev, selectedItem.id]);
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedItem(null);
          setSelectedPrice(null);
          if (matched.length + 1 === items.length) {
            setGameComplete(true);
            const accuracy = score / (attempts * 10 || 1);
            const finalScore = Math.max(60, Math.min(150, Math.floor(100 * accuracy + 20)));
            onComplete(finalScore);
          }
        }, 1200);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          setSelectedItem(null);
          setSelectedPrice(null);
        }, 1200);
      }
    }
  }, [selectedItem, selectedPrice]);

  const handleItemClick = (item: MatchItem) => {
    if (!matched.includes(item.id) && !showFeedback) setSelectedItem(item);
  };

  const handlePriceClick = (price: number) => {
    if (
      !matched.some(id => items.find(i => i.id === id)?.basePrice === price) &&
      !showFeedback
    ) {
      setSelectedPrice(price);
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <GameBackButton onBack={onBack} />

      <Card className="shadow-2xl custom-rounded no-border custom-card">
        <CardHeader className="border-b-4 border-white/20 rounded-t-xl overflow-hidden custom-header flex flex-col items-center text-center header-spaced">
          <CardTitle className="text-3xl font-bold flex items-center gap-3 text-primary">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="w-7 h-7" />
            </div>
            Real World Money Match
          </CardTitle>
          <CardDescription className="text-base text-primary opacity-90">
            Match each real-world item with its correct approximate price!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-6 text-primary">
          {!gameComplete ? (
            <>
              <div className="flex items-center justify-between bg-slate-100 p-4 rounded-xl border border-slate-300">
                <p className="text-sm text-blue-800 font-semibold">
                  Matched: {matched.length} of {items.length}
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  Score: {score} pts
                </p>
              </div>

              {showFeedback && (
                <div
                  className={`p-6 rounded-2xl text-center border-2 ${
                    isCorrect
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-red-100 border-red-300 text-red-700'
                  }`}
                >
                  <p className="text-2xl font-semibold">
                    {isCorrect ? '🎉 Correct!' : '❌ Try Again!'}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Items column */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Items</h3>
                  <div className="space-y-3">
                    {items.map(item => {
                      const isMatched = matched.includes(item.id);
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          disabled={isMatched || showFeedback}
                          className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                            isMatched
                              ? 'border-green-400 bg-green-50 opacity-70'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50 scale-105 shadow-md'
                              : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 hover:scale-105'
                          }`}
                        >
                          <span className="text-3xl">{item.emoji}</span>
                          <span className="text-slate-800 text-lg font-medium">
                            {item.name}
                          </span>
                          {isMatched && <span className="ml-auto text-green-500 text-2xl">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Prices column */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Prices</h3>
                  <div className="space-y-3">
                    {shuffledPrices.map((price, i) => {
                      const isMatched = matched.some(
                        id => items.find(j => j.id === id)?.basePrice === price
                      );
                      const isSelected = selectedPrice === price;
                      return (
                        <button
                          key={i}
                          onClick={() => handlePriceClick(price)}
                          disabled={isMatched || showFeedback}
                          className={`w-full p-5 rounded-2xl border-2 transition-all ${
                            isMatched
                              ? 'border-green-400 bg-green-50 opacity-70'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50 scale-105 shadow-md'
                              : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 hover:scale-105'
                          }`}
                        >
                          <span className="text-slate-800 text-lg font-semibold">
                            ${price}
                          </span>
                          {isMatched && <span className="ml-3 text-green-500 text-2xl">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-300 rounded-2xl text-yellow-800 text-center">
                💡 Tip: Prices change with brands and location — see if you can guess the range!
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">🏆</div>
              <h3 className="text-4xl text-slate-800 font-bold tracking-tight">
                Challenge Complete!
              </h3>
              <p className="text-xl text-slate-700">
                You matched all real-world items correctly!
              </p>
              <p className="text-lg text-blue-800 font-medium">
                Attempts: {attempts} | Score: {score}
              </p>
              <div className="p-6 bg-yellow-50 border border-yellow-300 rounded-2xl text-yellow-800 text-lg">
                💡 Understanding prices helps you make smarter everyday spending choices.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
