import { useState } from 'react';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { GameBackButton } from './ui/GameBackButton';

interface BudgetChallengeProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Item {
  name: string;
  category: string;
  cost: number;
  emoji: string;
}

export function BudgetChallenge({ onBack, onComplete }: BudgetChallengeProps) {
  const [budget] = useState(50);
  const [spent, setSpent] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [gameComplete, setGameComplete] = useState(false);

  const items: Item[] = [
    { name: 'Movie Ticket', category: 'Entertainment', cost: 12, emoji: '🎬' },
    { name: 'Lunch', category: 'Food', cost: 8, emoji: '🍕' },
    { name: 'Book', category: 'Education', cost: 15, emoji: '📚' },
    { name: 'Video Game', category: 'Entertainment', cost: 25, emoji: '🎮' },
    { name: 'Snacks', category: 'Food', cost: 5, emoji: '🍿' },
    { name: 'Art Supplies', category: 'Hobbies', cost: 18, emoji: '🎨' },
    { name: 'Ice Cream', category: 'Food', cost: 6, emoji: '🍦' },
    { name: 'Soccer Ball', category: 'Sports', cost: 20, emoji: '⚽' },
  ];

  const handleItemClick = (item: Item) => {
    if (selectedItems.some(i => i.name === item.name)) {
      // Remove item
      setSelectedItems(selectedItems.filter(i => i.name !== item.name));
      setSpent(spent - item.cost);
    } else {
      // Add item if budget allows
      if (spent + item.cost <= budget) {
        setSelectedItems([...selectedItems, item]);
        setSpent(spent + item.cost);
      }
    }
  };

  const handleFinish = () => {
    setGameComplete(true);
    const budgetUsed = (spent / budget) * 100;
    const points = budgetUsed >= 70 && budgetUsed <= 100 ? 100 : Math.floor(budgetUsed);
    onComplete(points);
  };

  const remaining = budget - spent;
  const progress = (spent / budget) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <GameBackButton onBack={onBack} />


    <Card className="shadow-2xl custom-rounded no-border custom-card">
      <CardHeader className="text-white border-b-4 border-white/20 rounded-t-xl overflow-hidden custom-header flex flex-col items-center text-center header-spaced text-primary">
        <CardTitle className="text-3xl font-bold">
            {/* <div className="p-2 bg-white/20 rounded-lg">
              <DollarSign className="w-7 h-7" />
            </div> */}
            Budget Builder
          </CardTitle>
          <CardDescription className="text-blue-100 text-base text-primary">
            You have ${budget} to spend. Choose wisely!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {!gameComplete ? (
            <>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                    <p className="text-primary text-sm text-blue-200 uppercase tracking-wider">Spent</p>
                    <p className="text-primary text-3xl text-white tracking-tight">${spent}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border-2 border-green-400/30">
                    <p className="text-primary text-sm text-green-200 uppercase tracking-wider">Remaining</p>
                    <p className={`text-primary text-3xl tracking-tight ${remaining < 10 ? 'text-red-400' : 'text-green-400'}`}>
                      ${remaining}
                    </p>
                  </div>
                </div>
                <Progress value={progress} className="h-3 bg-slate-700" />
              </div>

              <div>
                <h3 className="text-primary text-xl text-white mb-6 tracking-tight">Available Items (Click to add/remove)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                  {items.map((item) => {
                    const isSelected = selectedItems.some(i => i.name === item.name);
                    const canAfford = spent + item.cost <= budget;
                    
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item)}
                        disabled={!isSelected && !canAfford}
                        className={`p-5 rounded-2xl border-2 transition-all transform ${
                          isSelected
                            ? 'border-[#004977] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 scale-105 shadow-xl'
                            : canAfford
                            ? 'border-white/10 bg-slate-800/50 hover:border-[#004977] hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 hover:scale-105'
                            : 'border-white/5 bg-slate-900/50 opacity-40'
                        }`}
                      >
                        <div className="text-primary text-4xl mb-3">{item.emoji}</div>
                        <p className="text-primary text-sm text-white mb-2">{item.name}</p>
                        <p className="text-primary text-blue-300 text-lg">${item.cost}</p>
                        {isSelected && (
                          <div className="mt-3">
                            <span className="text-xs bg-[#004977] text-white px-3 py-1 rounded-full">
                              ✓ Added
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedItems.length > 0 && (
                <div className="text-primary p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border-2 border-green-400/30">
                  <h4 className="text-primary text-sm text-green-200 mb-3 uppercase tracking-wider">Your Cart:</h4>
                  <div className="flex flex-wrap gap-2 text-primary">
                    {selectedItems.map((item, index) => (
                      <span key={index} className="text-sm bg-slate-800 px-4 py-2 rounded-xl border border-green-300/30 text-white text-primary">
                        {item.emoji} {item.name} (${item.cost})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleFinish} 
                className="text-primary w-full btn-bg text-lg py-6 shadow-xl"

                disabled={selectedItems.length === 0}
              >
                Finish Shopping
              </Button>
            </>
          ) : (
            <div className="text-primary text-center space-y-6 py-8">
              <div className="text-8xl mb-4">
                {progress >= 70 ? '🎉' : progress >= 40 ? '👍' : '🤔'}
              </div>
              <h3 className="text-primary text-4xl text-white tracking-tight">
                {progress >= 70 ? 'Excellent Budgeting!' : progress >= 40 ? 'Not Bad!' : 'Keep Learning!'}
              </h3>
              <p className="text-primary text-xl text-blue-200">
                You used ${spent} of your ${budget} budget ({Math.round(progress)}%)
              </p>
              <div className="text-primary p-6 bg-gradient-to-br from-green-500/20 to--500/20 rounded-2xl border-2 border-yellow-400/30">
                <p className="text-black-100 text-lg ">
                  💡 Pro Tip: {progress >= 70 
                    ? 'You maximized your budget efficiently!' 
                    : 'Aim to use most of your budget while staying within limits!'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}