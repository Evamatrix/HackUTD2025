import { useState } from 'react';
import { ArrowLeft, TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface InvestingGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Investment {
  name: string;
  type: 'stock' | 'bond' | 'savings';
  risk: 'low' | 'medium' | 'high';
  description: string;
  emoji: string;
  minReturn: number;
  maxReturn: number;
}

export function InvestingGame({ onBack, onComplete }: InvestingGameProps) {
  const [year, setYear] = useState(1);
  const [portfolio, setPortfolio] = useState(1000);
  const [totalInvested, setTotalInvested] = useState(1000);
  const [investments, setInvestments] = useState<{ investment: Investment; amount: number; yearBought: number }[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(0);
  const [yearHistory, setYearHistory] = useState<{ year: number; value: number; change: number }[]>([{ year: 0, value: 1000, change: 0 }]);

  const availableInvestments: Investment[] = [
    {
      name: 'Tech Stock',
      type: 'stock',
      risk: 'high',
      description: 'High risk, high reward technology company',
      emoji: '📱',
      minReturn: -20,
      maxReturn: 40,
    },
    {
      name: 'Blue Chip Stock',
      type: 'stock',
      risk: 'medium',
      description: 'Stable company with steady growth',
      emoji: '🏢',
      minReturn: -5,
      maxReturn: 15,
    },
    {
      name: 'Government Bond',
      type: 'bond',
      risk: 'low',
      description: 'Safe investment with guaranteed returns',
      emoji: '📜',
      minReturn: 2,
      maxReturn: 5,
    },
    {
      name: 'Savings Account',
      type: 'savings',
      risk: 'low',
      description: 'Very safe, minimal growth',
      emoji: '🏦',
      minReturn: 1,
      maxReturn: 2,
    },
  ];

  const calculateReturn = (investment: Investment): number => {
    const range = investment.maxReturn - investment.minReturn;
    const random = Math.random();
    return investment.minReturn + (range * random);
  };

  const nextYear = () => {
    if (investments.length === 0) {
      alert('You need to invest something first!');
      return;
    }

    let newPortfolioValue = 0;
    const updatedInvestments = investments.map(item => {
      const returnRate = calculateReturn(item.investment);
      const newAmount = item.amount * (1 + returnRate / 100);
      newPortfolioValue += newAmount;
      return { ...item, amount: newAmount };
    });

    setInvestments(updatedInvestments);
    setPortfolio(newPortfolioValue);
    
    const change = newPortfolioValue - portfolio;
    setYearHistory([...yearHistory, { year, value: newPortfolioValue, change }]);

    if (year >= 5) {
      setGameComplete(true);
      const totalReturn = ((newPortfolioValue - totalInvested) / totalInvested) * 100;
      const points = Math.max(50, Math.min(150, Math.floor(100 + totalReturn)));
      onComplete(points);
    } else {
      setYear(year + 1);
    }
  };

  const makeInvestment = () => {
    if (!selectedInvestment || investAmount <= 0) return;
    
    if (investAmount > portfolio) {
      alert("You don't have enough money!");
      return;
    }

    setInvestments([...investments, { 
      investment: selectedInvestment, 
      amount: investAmount,
      yearBought: year 
    }]);
    setPortfolio(portfolio - investAmount);
    setTotalInvested(totalInvested + investAmount);
    setSelectedInvestment(null);
    setInvestAmount(0);
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const totalPortfolioValue = portfolio + investments.reduce((sum: any, item: { amount: any; }) => sum + item.amount, 0);
  const totalReturn = ((totalPortfolioValue - 1000) / 1000) * 100;

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Inline back button (removed floating) */}
      <GameBackButton onBack={onBack} />
      <Card className="border-2 border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-[#004977] to-[#003D5C] text-white border-b-4 border-white/20">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="w-7 h-7" />
            </div>
            Investment Challenge
          </CardTitle>
          <CardDescription className="text-blue-100 text-base">
            Grow your $1,000 portfolio over 5 years. Diversify your investments wisely!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {!gameComplete ? (
            <>
              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                  <p className="text-sm text-blue-200 uppercase tracking-wider">Year</p>
                  <p className="text-3xl text-white tracking-tight">{year} / 5</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border-2 border-green-400/30">
                  <p className="text-sm text-green-200 uppercase tracking-wider">Available Cash</p>
                  <p className="text-3xl text-white tracking-tight">${portfolio.toFixed(0)}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl border-2 border-purple-400/30">
                  <p className="text-sm text-purple-200 uppercase tracking-wider">Total Value</p>
                  <p className="text-3xl text-white tracking-tight">${totalPortfolioValue.toFixed(0)}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                  <p className="text-sm text-yellow-200 uppercase tracking-wider">Return</p>
                  <p className={`text-3xl tracking-tight ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Current Investments */}
              {investments.length > 0 && (
                <div className="p-6 bg-slate-800/50 rounded-2xl border-2 border-white/10">
                  <h3 className="text-xl text-white mb-4 tracking-tight flex items-center gap-2">
                    Your Portfolio
                  </h3>
                  <div className="space-y-3">
                    {investments.map((item, index) => {
                      const percentage = (item.amount / totalPortfolioValue) * 100;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{item.investment.emoji}</span>
                            <div>
                              <p className="text-white">{item.investment.name}</p>
                              <p className="text-sm text-blue-300">
                                <span className={getRiskColor(item.investment.risk)}>{item.investment.risk} risk</span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-lg">${item.amount.toFixed(0)}</p>
                            <p className="text-sm text-blue-300">{percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Investment Selection */}
              <div>
                <h3 className="text-xl text-white mb-4 tracking-tight">Choose an Investment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {availableInvestments.map((investment) => (
                    <button
                      key={investment.name}
                      onClick={() => setSelectedInvestment(investment)}
                      className={`p-5 rounded-2xl border-2 transition-all transform ${
                        selectedInvestment?.name === investment.name
                          ? 'border-[#004977] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 scale-105 shadow-xl'
                          : 'border-white/10 bg-slate-800/50 hover:border-[#004977] hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10 hover:scale-105'
                      }`}
                    >
                      <div className="text-4xl mb-3">{investment.emoji}</div>
                      <p className="text-white mb-1">{investment.name}</p>
                      <p className="text-sm text-blue-300 mb-2">{investment.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className={getRiskColor(investment.risk)}>{investment.risk} risk</span>
                        <span className="text-green-400">{investment.minReturn}% to {investment.maxReturn}%</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedInvestment && (
                  <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                    <h4 className="text-white mb-4">Invest in {selectedInvestment.name}</h4>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="text-sm text-blue-200 mb-2 block">Amount to invest</label>
                        <input
                          type="number"
                          value={investAmount || ''}
                          onChange={(e) => setInvestAmount(Math.min(portfolio, Math.max(0, parseInt(e.target.value) || 0)))}
                          placeholder="Enter amount"
                          className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-white/10 text-white"
                          max={portfolio}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setInvestAmount(Math.floor(portfolio * 0.25))}
                            className="px-3 py-1 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600"
                          >
                            25%
                          </button>
                          <button
                            onClick={() => setInvestAmount(Math.floor(portfolio * 0.5))}
                            className="px-3 py-1 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600"
                          >
                            50%
                          </button>
                          <button
                            onClick={() => setInvestAmount(Math.floor(portfolio * 0.75))}
                            className="px-3 py-1 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600"
                          >
                            75%
                          </button>
                          <button
                            onClick={() => setInvestAmount(portfolio)}
                            className="px-3 py-1 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600"
                          >
                            All
                          </button>
                        </div>
                      </div>
                      <Button
                        onClick={makeInvestment}
                        disabled={investAmount <= 0 || investAmount > portfolio}
                        className="bg-gradient-to-r from-[#004977] to-[#003D5C] hover:from-[#003D5C] hover:to-[#002D44] px-8 py-6"
                      >
                        Invest
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Year Button */}
              <div className="flex flex-col gap-4">
                <Button
                  onClick={nextYear}
                  disabled={investments.length === 0}
                  className="w-full bg-gradient-to-r from-[#DA2032] to-[#B01828] hover:from-[#B01828] hover:to-[#901420] text-lg py-6 shadow-xl"
                >
                  Advance to Year {year + 1} →
                </Button>
                
                <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                  <p className="text-yellow-100">
                    💡 Pro Tip: Diversification (spreading investments across different types) helps reduce risk. Don't put all your money in one place!
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">
                {totalReturn >= 20 ? '🚀' : totalReturn >= 0 ? '📈' : '📉'}
              </div>
              <h3 className="text-4xl text-white tracking-tight">
                {totalReturn >= 20 ? 'Outstanding Returns!' : totalReturn >= 0 ? 'Positive Growth!' : 'Learning Experience!'}
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-blue-300">Started With</p>
                  <p className="text-2xl text-white">$1,000</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-blue-300">Ended With</p>
                  <p className="text-2xl text-white">${totalPortfolioValue.toFixed(0)}</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-blue-300">Total Return</p>
                  <p className={`text-2xl ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Performance History */}
              <div className="p-6 bg-slate-800/50 rounded-2xl border-2 border-white/10 max-w-2xl mx-auto">
                <h4 className="text-white mb-4">Your Journey</h4>
                <div className="space-y-2">
                  {yearHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-blue-300">Year {record.year}</span>
                      <span className="text-white">${record.value.toFixed(0)}</span>
                      {record.change !== 0 && (
                        <span className={`flex items-center gap-1 ${record.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {record.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          {record.change >= 0 ? '+' : ''}{record.change.toFixed(0)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30 max-w-2xl mx-auto">
                <p className="text-yellow-100 text-lg">
                  💡 Key Takeaway: Investing involves risk, but over time, a diversified portfolio typically grows. 
                  The earlier you start investing, the more time your money has to grow through compound returns!
                </p>
              </div>
              
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
