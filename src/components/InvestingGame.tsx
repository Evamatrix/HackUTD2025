import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

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
  const [investments, setInvestments] = useState<
    { investment: Investment; amount: number; yearBought: number }[]
  >([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(0);
  const [yearHistory, setYearHistory] = useState<{ year: number; value: number; change: number }[]>([
    { year: 0, value: 1000, change: 0 },
  ]);

  const availableInvestments: Investment[] = [
    {
      name: 'New Tech Stock',
      type: 'stock',
      risk: 'high',
      description: 'High risk, high reward technology company',
      emoji: '📱',
      minReturn: -50,
      maxReturn: 50,
    },
    {
      name: 'Blue Chip Stock',
      type: 'stock',
      risk: 'medium',
      description: 'Stable company with steady growth',
      emoji: '🏢',
      minReturn: -10,
      maxReturn: 25,
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
    return investment.minReturn + range * random;
  };

  const nextYear = () => {
  if (investments.length === 0) {
    alert('You need to invest something first!');
    return;
  }

  // Step 1: Update investment returns
  const updatedInvestments = investments.map(item => {
    const returnRate = calculateReturn(item.investment);
    const newAmount = item.amount * (1 + returnRate / 100);
    return { ...item, amount: newAmount };
  });

  // Step 2: Compute total investment value (excluding cash)
  const investedValue = updatedInvestments.reduce((sum, i) => sum + i.amount, 0);

  // Step 3: Update total value but keep cash separate
  const totalValue = portfolio + investedValue;

  // Step 4: Record progress for the year
  const lastValue = yearHistory[yearHistory.length - 1].value;
  const change = totalValue - lastValue;
  setYearHistory([...yearHistory, { year, value: totalValue, change }]);

  // Step 5: Save new investment states
  setInvestments(updatedInvestments);

  if (year >= 5) {
    setGameComplete(true);

    // Calculate total & annualized returns properly
    const initialValue = yearHistory.length > 0 ? yearHistory[0].value : 1000;
    const finalValue = totalValue;
    const totalGrowth = ((finalValue - initialValue) / initialValue) * 100;
    const yearsPassed = year;
    const cagr = (Math.pow(finalValue / initialValue, 1 / yearsPassed) - 1) * 100;

    const totalReturn = Math.min(200, Math.max(-100, cagr));
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

    setInvestments([
      ...investments,
      {
        investment: selectedInvestment,
        amount: investAmount,
        yearBought: year,
      },
    ]);
    setPortfolio(portfolio - investAmount);
    setTotalInvested(totalInvested + investAmount);
    setSelectedInvestment(null);
    setInvestAmount(0);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  const totalPortfolioValue =
    portfolio + investments.reduce((sum, item) => sum + item.amount, 0);

  // ✅ Proper CAGR return calculation (realistic annualized)
  let totalReturn = 0;
  if (year > 1) {
    const initialValue = 1000;
    const yearsPassed = year - 1;
    totalReturn = (Math.pow(totalPortfolioValue / initialValue, 1 / yearsPassed) - 1) * 100;
    if (totalReturn < -100) totalReturn = -100;
    if (totalReturn > 200) totalReturn = 200;
  }

  const initialValue = yearHistory.length > 0 ? yearHistory[0].value : 1000;
  const finalValue = yearHistory.length > 0 ? yearHistory[yearHistory.length - 1].value : totalPortfolioValue;
  const totalGrowth = ((finalValue - initialValue) / initialValue) * 100;

  return (
    <div className="max-w-6xl mx-auto relative">
      <GameBackButton onBack={onBack} />
      <Card className="shadow-2xl custom-rounded no-border custom-card">
        <CardHeader className="text-white border-b-4 border-white/20 rounded-t-xl overflow-hidden flex flex-col items-center text-center header-spaced text-primary">
          <CardTitle className="text-3xl font-bold">Investment Challenge</CardTitle>
          <CardDescription className="text-blue-100 text-base text-primary">
            Grow your $1,000 portfolio over 5 years. Diversify your investments wisely!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {!gameComplete ? (
            <>
              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                  <p className="text-sm text-blue-200 uppercase tracking-wider text-primary">Year</p>
                  <p className="text-3xl text-white tracking-tight text-primary">{year} / 5</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border-2 border-green-400/30">
                  <p className="text-sm text-green-200 uppercase tracking-wider text-primary">
                    Available Cash
                  </p>
                  <p className="text-3xl text-white tracking-tight text-primary">
                    ${portfolio.toFixed(0)}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl border-2 border-purple-400/30">
                  <p className="text-sm text-purple-200 uppercase tracking-wider text-primary">
                    Total Value
                  </p>
                  <p className="text-3xl text-white tracking-tight text-primary">
                    ${totalPortfolioValue.toFixed(0)}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-400/30">
                  <p className="text-sm text-yellow-200 uppercase tracking-wider text-primary">
                    Return (CAGR)
                  </p>
                  <p
                    className={`text-3xl tracking-tight ${
                      totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {year === 1 ? '—' : `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(1)}%`}
                  </p>
                </div>
              </div>

              {/* Current Investments */}
              {investments.length > 0 && (
                <div className="p-6 bg-slate-800/50 rounded-2xl border-2 border-white/10">
                  <h3 className="text-xl text-white mb-4 tracking-tight text-primary">
                    Your Portfolio
                  </h3>
                  <div className="space-y-3">
                    {investments.map((item, index) => {
                      const percentage = (item.amount / totalPortfolioValue) * 100;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{item.investment.emoji}</span>
                            <div>
                              <p className="text-white">{item.investment.name}</p>
                              <p className="text-sm text-blue-300">
                                <span className={getRiskColor(item.investment.risk)}>
                                  {item.investment.risk} risk
                                </span>
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
                        <span className="text-green-400">
                          {investment.minReturn}% to {investment.maxReturn}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedInvestment && (
                  <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border-2 border-blue-400/30">
                    <h4 className="text-white mb-4 text-primary">
                      Invest in {selectedInvestment.name}
                    </h4>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="text-sm text-blue-200 mb-2 block text-primary">
                          Amount to invest
                        </label>
                        <input
                          type="number"
                          value={investAmount || ''}
                          onChange={(e) =>
                            setInvestAmount(
                              Math.min(portfolio, Math.max(0, parseInt(e.target.value) || 0))
                            )
                          }
                          placeholder="Enter amount"
                          className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-white/10 text-white"
                          max={portfolio}
                        />
                        <div className="flex gap-2 mt-2">
                          {[
                            { label: '25%', val: 0.25 },
                            { label: '50%', val: 0.5 },
                            { label: '75%', val: 0.75 },
                            { label: 'All', val: 1 },
                          ].map((b) => (
                            <button
                              key={b.label}
                              onClick={() => setInvestAmount(Math.floor(portfolio * b.val))}
                              className="px-3 py-1 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-600"
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={makeInvestment}
                        disabled={investAmount <= 0 || investAmount > portfolio}
                        className="bg-gradient-to-r from-[#004977] to-[#003D5C] hover:from-[#003D5C] hover:to-[#002D44] px-8 py-6 "
                      >
                        Invest
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Year */}
              <div className="flex flex-col gap-4">
                <Button
                  onClick={nextYear}
                  disabled={investments.length === 0}
                  className="w-full bg-gradient-to-r from-[#DA2032] to-[#B01828] hover:from-[#B01828] hover:to-[#901420] text-lg py-6 shadow-xl text-primary"
                >
                  Advance to Year {year + 1} →
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="mb-4 flex justify-center">
                <img 
                  src={totalReturn >= 0 ? '/assets/icons/upward-cat.svg' : '/assets/icons/downward-cat.svg'}
                  alt={totalReturn >= 0 ? 'Success cat' : 'Loss cat'}
                  className="object-contain"
                  style={{ width: '350px', height: '350px' }}
                />
              </div>
              <h3 className="text-4xl text-white tracking-tight">
                {totalReturn >= 20
                  ? 'Outstanding Returns!'
                  : totalReturn >= 0
                  ? 'Positive Growth!'
                  : 'Learning Experience!'}
              </h3>

              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-blue-300">Started With</p>
                  <p className="text-2xl text-black">$1,000</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-blue-300">Ended With</p>
                  <p className="text-2xl text-black">
                    ${totalPortfolioValue.toFixed(0)}
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-blue-300">Total Growth</p>
                  <p
                    className={`text-2xl ${
                      totalGrowth >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {totalGrowth >= 0 ? '+' : ''}
                    {totalGrowth.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* CAGR Display */}
              <div className="p-4 bg-slate-700/50 rounded-xl max-w-md mx-auto">
                <p className="text-sm text-blue-300">Average Annual Return (CAGR)</p>
                <p
                  className={`text-2xl ${
                    totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {totalReturn >= 0 ? '+' : ''}
                  {totalReturn.toFixed(1)}%
                </p>
              </div>

              {/* Performance History */}
              <div className="p-6 bg-slate-800/50 rounded-2xl border-2 border-white/10 max-w-2xl mx-auto">
                <h4 className="text-black mb-4">Your Journey</h4>
                <div className="space-y-2">
                  {yearHistory.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                    >
                      <span className="text-black-300">Year {record.year}</span>
                      <span className="text-white">${record.value.toFixed(0)}</span>
                      {record.change !== 0 && (
                        <span
                          className={`flex items-center gap-1 ${
                            record.change >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {record.change >= 0 ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          )}
                          {record.change >= 0 ? '+' : ''}
                          {record.change.toFixed(0)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
