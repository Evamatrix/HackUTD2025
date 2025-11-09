import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Heart, DollarSign } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface DebtGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function DebtGame({ onBack, onComplete }: DebtGameProps) {
  const [stage, setStage] = useState<'jobSelection' | 'playing' | 'complete'>('jobSelection');
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [jobTitle, setJobTitle] = useState('');
  const [debt, setDebt] = useState(500);
  const [month, setMonth] = useState(1);
  const [totalPaid, setTotalPaid] = useState(0);
  const [savings, setSavings] = useState(0);
  const [monthlyChoice, setMonthlyChoice] = useState<string | null>(null);
  const [lastEvent, setLastEvent] = useState<string>('');
  const [stress, setStress] = useState(30);

  const jobOptions = [
    { title: 'Part-time Barista Cat', income: 800, emoji: '☕' },
    { title: 'Retail Cat', income: 1200, emoji: '🛍️' },
    { title: 'Office Cat', income: 1800, emoji: '💼' },
  ];

  const randomEvents = [
    { text: '🎉 Got a birthday gift of $50!', money: 50 },
    { text: '😺 Found $20 in old jeans!', money: 20 },
    { text: '🚗 Car repair: -$100', money: -100 },
    { text: '🤧 Doctor visit: -$80', money: -80 },
    { text: '💸 Friend repaid loan: +$60', money: 60 },
    { text: '⚡ High electric bill: -$50', money: -50 },
    { text: '🎮 Game went on sale: -$30', money: -30 },
    { text: '🍕 Free pizza at work!', money: 0 },
  ];

  const handleJobSelection = (job: typeof jobOptions[0]) => {
    setMonthlyIncome(job.income);
    setJobTitle(job.title);
    setStage('playing');
  };

  const handleChoice = (strategy: string, debtPayment: number, savingsAmount: number, funSpending: number) => {
    setMonthlyChoice(strategy);
    
    setTimeout(() => {
      const fixedExpenses = Math.floor(monthlyIncome * 0.4); // 40% for rent, food, utilities
      
      // Random event (30% chance)
      let eventMoney = 0;
      let eventText = '';
      if (Math.random() < 0.3 && month > 1) {
        const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        eventMoney = event.money;
        eventText = event.text;
        setLastEvent(eventText);
      } else {
        setLastEvent('');
      }
      
      // Calculate interest (20% APR = ~1.67% per month)
      const interest = Math.floor(debt * 0.0167);
      const newDebt = Math.max(0, debt - debtPayment + interest);
      
      // Update savings
      const newSavings = Math.max(0, savings + savingsAmount + eventMoney);
      
      // Update stress level
      let newStress = stress;
      if (debtPayment < 50 && debt > 200) newStress += 15; // Not paying enough
      if (funSpending === 0 && month > 2) newStress += 10; // No fun = burnout
      if (savingsAmount > 0) newStress -= 8; // Saving reduces stress
      if (debtPayment >= 150) newStress -= 12; // Aggressive payment feels good!
      if (eventMoney < 0) newStress += 5; // Unexpected expenses stressful
      newStress = Math.max(0, Math.min(100, newStress));
      
      setDebt(newDebt);
      setTotalPaid(totalPaid + debtPayment);
      setSavings(newSavings);
      setStress(newStress);
      
      if (newDebt <= 0) {
        setStage('complete');
        const speedBonus = Math.max(0, 100 - (month * 8));
        const savingsBonus = Math.floor(newSavings / 5);
        const stressBonus = stress < 50 ? 30 : 0;
        const points = 100 + speedBonus + savingsBonus + stressBonus;
        onComplete(points);
      } else if (month >= 12) {
        setStage('complete');
        const progressPoints = Math.floor(((500 - newDebt) / 500) * 80);
        const savingsBonus = Math.floor(newSavings / 5);
        const points = progressPoints + savingsBonus;
        onComplete(points);
      } else {
        setMonth(month + 1);
      }
      
      setMonthlyChoice(null);
    }, 2000);
  };

  const fixedExpenses = Math.floor(monthlyIncome * 0.4);
  const availableToSpend = monthlyIncome - fixedExpenses;
  const progress = ((500 - debt) / 500) * 100;

  const getStressEmoji = () => {
    if (stress < 30) return '😊';
    if (stress < 60) return '😐';
    if (stress < 80) return '😰';
    return '😫';
  };

  const getStressColor = () => {
    if (stress < 30) return 'bg-green-500';
    if (stress < 60) return 'bg-yellow-500';
    if (stress < 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const strategies = [
    {
      name: 'Aggressive Payoff',
      debt: Math.min(availableToSpend - 50, Math.floor(availableToSpend * 0.8)),
      savings: 0,
      fun: Math.max(50, availableToSpend - Math.floor(availableToSpend * 0.8)),
      emoji: '💪',
      desc: 'Pay debt fast, minimal fun money',
      pros: ['Debt-free quickly', 'Save on interest'],
      cons: ['High stress risk', 'No emergency fund'],
    },
    {
      name: 'Balanced Approach',
      debt: Math.floor(availableToSpend * 0.5),
      savings: Math.floor(availableToSpend * 0.2),
      fun: Math.floor(availableToSpend * 0.3),
      emoji: '⚖️',
      desc: 'Balance debt, savings, and fun',
      pros: ['Building savings', 'Lower stress', 'Steady progress'],
      cons: ['Slower debt payoff', 'More interest paid'],
    },
    {
      name: 'Minimum Payment',
      debt: 50,
      savings: Math.floor(availableToSpend * 0.3),
      fun: availableToSpend - 50 - Math.floor(availableToSpend * 0.3),
      emoji: '🐌',
      desc: 'Pay minimum, enjoy life',
      pros: ['Lots of fun money', 'Low stress'],
      cons: ['Debt grows with interest!', 'Takes forever to pay off'],
    },
    {
      name: 'Debt Avalanche',
      debt: Math.floor(availableToSpend * 0.7),
      savings: Math.floor(availableToSpend * 0.2),
      fun: Math.floor(availableToSpend * 0.1),
      emoji: '🎯',
      desc: 'Maximum debt payment with emergency fund',
      pros: ['Fast payoff', 'Emergency cushion', 'Smart strategy'],
      cons: ['Less fun money', 'Requires discipline'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto relative">
      <GameBackButton onBack={onBack} />
      <Card className="shadow-2xl custom-rounded no-border custom-card">
        <CardHeader className="text-white border-b-4 border-white/20 rounded-t-xl overflow-hidden custom-header flex flex-col items-center text-center header-spaced text-primary">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 bg-white/30 rounded-xl">
              <span className="text-3xl">😿</span>
            </div>
            Cat's Debt Challenge 💳
          </CardTitle>
          <CardDescription className="text-rose-100 text-base text-primary ">
            Balance income, expenses, and debt to become financially free! 🐱
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {stage === 'jobSelection' ? (
            <div className="space-y-6">
              <div className="text-center text-7xl mb-4">😿</div>
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-2xl text-gray-900">Choose Your Cat's Job</h3>
                <p className="text-gray-600">Your income affects how quickly you can pay off debt!</p>
              </div>

              <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-5 mb-6">
                <h4 className="text-rose-900 mb-3">💡 The Scenario:</h4>
                <ul className="text-rose-800 space-y-2 text-sm">
                  <li>• You have <strong>$500 in credit card debt</strong> at 20% APR</li>
                  <li>• You need to pay rent, food, utilities (40% of income)</li>
                  <li>• Random events will happen (just like real life!)</li>
                  <li>• Balance debt payment, savings, and fun money</li>
                  <li>• Watch your stress level - burnout is real!</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobOptions.map((job, index) => (
                  <button
                    key={index}
                    onClick={() => handleJobSelection(job)}
                    className="p-6 rounded-2xl border-3 border-rose-200 bg-white hover:border-rose-400 hover:bg-rose-50 hover:scale-105 transition-all transform"
                  >
                    <div className="text-6xl mb-3">{job.emoji}</div>
                    <p className="text-gray-900 mb-2">{job.title}</p>
                    <p className="text-2xl text-green-600 mb-1">${job.income}/mo</p>
                    <p className="text-xs text-gray-500">
                      ${Math.floor(job.income * 0.4)} fixed expenses
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : stage === 'playing' ? (
            <>
              {/* Status Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl border-2 border-green-300">
                  <p className="text-xs text-green-700 mb-1">💼 Income</p>
                  <p className="text-xl text-green-900">${monthlyIncome}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl border-2 border-blue-300">
                  <p className="text-xs text-blue-700 mb-1">💰 Savings</p>
                  <p className="text-xl text-blue-900">${savings}</p>
                </div>
                <div className="bg-gradient-to-br from-rose-100 to-rose-200 p-4 rounded-xl border-2 border-rose-300">
                  <p className="text-xs text-rose-700 mb-1">💳 Debt</p>
                  <p className="text-xl text-rose-900">${debt}</p>
                </div>
                <div className={`bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl border-2 border-purple-300`}>
                  <p className="text-xs text-purple-700 mb-1">😊 Stress</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getStressEmoji()}</span>
                    <span className="text-lg text-purple-900">{stress}%</span>
                  </div>
                </div>
              </div>

              {/* Month Info */}
              <div className="text-center space-y-4">
                <div className="flex justify-center items-center gap-2">
                  <span className="text-7xl">{jobTitle.includes('Barista') ? '☕' : jobTitle.includes('Retail') ? '🛍️' : '💼'}</span>
                </div>
                <div>
                  <p className="text-sm text-rose-600 uppercase tracking-wider">Month {month} of 12</p>
                  <h3 className="text-2xl text-gray-900">{jobTitle}</h3>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-600">Debt paid: {progress.toFixed(0)}%</p>
              </div>

              {/* Event Notification */}
              {lastEvent && (
                <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 animate-pulse">
                  <p className="text-amber-900 text-center">{lastEvent}</p>
                </div>
              )}

              {/* Budget Breakdown */}
              <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-5">
                <h4 className="text-teal-900 mb-3">💰 This Month's Income: ${monthlyIncome}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-teal-800">
                    <span>🏠 Fixed Expenses (rent, food, utilities):</span>
                    <span className="font-semibold">-${fixedExpenses}</span>
                  </div>
                  <div className="border-t border-teal-300 pt-2 flex justify-between text-teal-900">
                    <span>Available to allocate:</span>
                    <span className="text-lg font-bold">${availableToSpend}</span>
                  </div>
                </div>
              </div>

              {/* Strategy Choices */}
              <div>
                <h3 className="text-xl text-gray-900 mb-4">Choose Your Strategy This Month:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strategies.map((strategy, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoice(strategy.name, strategy.debt, strategy.savings, strategy.fun)}
                      disabled={monthlyChoice !== null}
                      className={`p-5 rounded-xl border-3 transition-all transform text-left ${
                        monthlyChoice === strategy.name
                          ? 'border-rose-500 bg-rose-100 scale-105 shadow-xl'
                          : 'border-gray-300 bg-white hover:border-rose-400 hover:bg-rose-50 hover:scale-102'
                      } ${monthlyChoice !== null ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-4xl">{strategy.emoji}</span>
                        <div>
                          <h4 className="text-lg text-gray-900 font-semibold">{strategy.name}</h4>
                          <p className="text-xs text-gray-600">{strategy.desc}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-rose-700">💳 Debt payment:</span>
                          <span className="font-semibold">${strategy.debt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">💰 To savings:</span>
                          <span className="font-semibold">${strategy.savings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">🎉 Fun money:</span>
                          <span className="font-semibold">${strategy.fun}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-green-700 font-semibold mb-1">✅ Pros:</p>
                          <ul className="text-gray-700 space-y-0.5">
                            {strategy.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-red-700 font-semibold mb-1">⚠️ Cons:</p>
                          <ul className="text-gray-700 space-y-0.5">
                            {strategy.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {monthlyChoice && (
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border-2 border-teal-300">
                  <p className="text-teal-900 text-lg">
                    ⏳ Processing month {month}...
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="text-8xl mb-4">
                {debt <= 0 ? '🎉' : '💪'}
              </div>
              <h3 className="text-4xl text-gray-900 tracking-tight">
                {debt <= 0 ? 'Debt-Free! 🐱✨' : 'Great Learning!'}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-green-100 p-4 rounded-xl">
                  <p className="text-xs text-green-700">Total Paid</p>
                  <p className="text-2xl text-green-900">${totalPaid}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl">
                  <p className="text-xs text-blue-700">Savings</p>
                  <p className="text-2xl text-blue-900">${savings}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl">
                  <p className="text-xs text-purple-700">Months</p>
                  <p className="text-2xl text-purple-900">{month}</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-xl">
                  <p className="text-xs text-pink-700">Final Stress</p>
                  <p className="text-2xl text-pink-900">{stress}%</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300 max-w-2xl mx-auto">
                <p className="text-emerald-900">
                  <strong>🌱 What You Learned:</strong>
                </p>
                <ul className="text-emerald-800 text-left mt-3 space-y-2">
                  <li>• Higher income = more options to pay debt faster</li>
                  <li>• Paying minimum keeps debt around longer (interest!)</li>
                  <li>• Balance is key: pay debt but don't burn out</li>
                  <li>• Emergency savings prevent more debt</li>
                  <li>• Real credit cards can charge 15-25% APR!</li>
                </ul>
              </div>

              <Button onClick={onBack} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-lg px-8 py-6 shadow-xl text-white">
                Back to Garden 🌿
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
