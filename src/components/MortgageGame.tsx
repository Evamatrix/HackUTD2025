import { useState, useEffect } from 'react';
import { Home, Briefcase } from 'lucide-react';
import { GameBackButton } from './ui/GameBackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface MortgageGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function MortgageGame({ onBack, onComplete }: MortgageGameProps) {
  const [stage, setStage] = useState<'intro' | 'choosing' | 'result'>('intro');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // 🎭 Random Luna profiles
  const lunaProfiles = [
    { job: 'Barista ☕', income: 2400, expenses: 1500, lifestyle: 'lives in a small apartment, loves coffee and saving for travel.' },
    { job: 'Teacher 🍎', income: 3200, expenses: 1700, lifestyle: 'cares for her students, balances budget carefully each month.' },
    { job: 'Engineer 💻', income: 4500, expenses: 2000, lifestyle: 'enjoys gadgets and eats out often, but saves responsibly.' },
    { job: 'Artist 🎨', income: 2800, expenses: 1800, lifestyle: 'freelances and has an unpredictable income.' },
    { job: 'Nurse 🏥', income: 3800, expenses: 1900, lifestyle: 'works long hours but values financial stability.' },
    { job: 'Game Designer 🎮', income: 4000, expenses: 2100, lifestyle: 'loves gaming, creative projects, and smart budgeting.' },
  ];

  const [luna, setLuna] = useState(lunaProfiles[0]);

  useEffect(() => {
    // Pick a random profile each game
    const randomProfile = lunaProfiles[Math.floor(Math.random() * lunaProfiles.length)];
    setLuna(randomProfile);
  }, []);

  // 🏠 Mortgage options
  const mortgageOptions = [
    {
      id: 1,
      title: 'Cozy 30-Year Home 🏠',
      downPayment: 40000,
      monthlyPayment: 950,
      years: 30,
      totalPaid: 342000,
      description: '20% down, 30-year loan',
      emoji: '🐱',
    },
    {
      id: 2,
      title: 'Speedy 15-Year Home 🚀',
      downPayment: 40000,
      monthlyPayment: 1600,
      years: 15,
      totalPaid: 288000,
      description: '20% down, faster payoff',
      emoji: '😺',
    },
    {
      id: 3,
      title: 'Low Down Payment Plan 🏘️',
      downPayment: 10000,
      monthlyPayment: 1100,
      years: 30,
      totalPaid: 396000,
      description: '5% down, higher insurance costs',
      emoji: '😿',
    },
  ];

  const handleSelectOption = (id: number) => setSelectedOption(id);
  const handleConfirmChoice = () => setStage('result');

  const selectedMortgage = mortgageOptions.find(opt => opt.id === selectedOption);
  const calcLeftover = (payment: number) => luna.income - (luna.expenses + payment);

  const getOutcome = (leftover: number) => {
    if (leftover > 800)
      return `Luna the ${luna.job.split(' ')[0]} can easily afford this home! She covers her expenses, saves comfortably, and still has money for treats 🐾.`;
    if (leftover > 200)
      return `Luna can afford this home but must budget carefully each month. She might skip fancy lattes for a while ☕.`;
    if (leftover >= 0)
      return `Luna breaks even — she can pay her bills, but there’s no room for surprises. A vet visit or car repair might cause stress 😿.`;
    return `Oh no! Luna’s payments are too high for her ${luna.job.toLowerCase()} income. She risks missing payments and should choose a cheaper plan 😰.`;
  };

  const getPoints = (leftover: number) => {
    if (leftover > 800) return 100;
    if (leftover > 200) return 85;
    if (leftover >= 0) return 70;
    return 50;
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <GameBackButton onBack={onBack} />

      <Card className="shadow-2xl custom-rounded no-border custom-card">
        <CardHeader className="border-b-4 border-white/20 rounded-t-xl overflow-hidden custom-header flex flex-col items-center text-center header-spaced text-primary">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 bg-white/30 rounded-xl">
              <Home className="w-7 h-7" />
            </div>
            Luna’s Mortgage Challenge
          </CardTitle>
          <CardDescription className="text-blue-100 text-base text-primary">
            Help Luna the Cat choose a mortgage she can truly afford!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {stage === 'intro' && (
            <div className="space-y-6 text-center">
              <div className="text-8xl mb-4">🐾</div>
              <h3 className="text-2xl text-gray-900 font-semibold">Meet Luna the {luna.job}!</h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Luna earns <strong>${luna.income.toLocaleString()}</strong> per month and spends around <strong>${luna.expenses.toLocaleString()}</strong> on living costs.
              </p>
              <p className="text-gray-700 max-w-2xl mx-auto">
                She {luna.lifestyle} Now she’s found her dream $200,000 home and needs your help picking the right mortgage plan!
              </p>
              <Button
                onClick={() => setStage('choosing')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg py-6 text-white shadow-xl"
              >
                Help Luna Choose a Plan 💵
              </Button>
            </div>
          )}

          {stage === 'choosing' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🏦</div>
                <h3 className="text-2xl text-gray-900 mb-2 font-semibold">Can Luna Afford This?</h3>
                <p className="text-gray-600">
                  Luna earns ${luna.income}/month and spends ${luna.expenses} on her daily life.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mortgageOptions.map(option => {
                  const leftover = calcLeftover(option.monthlyPayment);
                  const canAfford = leftover >= 0;
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all transform ${
                        selectedOption === option.id
                          ? 'border-blue-500 bg-blue-50 scale-105 shadow-xl'
                          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:scale-[1.02]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{option.emoji}</div>
                        <div className="flex-1 text-left">
                          <h4 className="text-xl text-gray-900 font-semibold mb-1">{option.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{option.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div className="bg-purple-100 p-3 rounded-lg">
                              <p className="text-xs text-purple-700">Down Payment</p>
                              <p className="text-purple-900">${(option.downPayment / 1000).toFixed(0)}k</p>
                            </div>
                            <div className="bg-teal-100 p-3 rounded-lg">
                              <p className="text-xs text-teal-700">Monthly Payment</p>
                              <p className="text-teal-900">${option.monthlyPayment}</p>
                            </div>
                            <div className="bg-amber-100 p-3 rounded-lg">
                              <p className="text-xs text-amber-700">Years</p>
                              <p className="text-amber-900">{option.years}</p>
                            </div>
                            <div className="bg-rose-100 p-3 rounded-lg">
                              <p className="text-xs text-rose-700">Leftover / Month</p>
                              <p
                                className={`text-lg font-semibold ${
                                  leftover > 500
                                    ? 'text-green-700'
                                    : leftover > 0
                                    ? 'text-yellow-700'
                                    : 'text-red-700'
                                }`}
                              >
                                {canAfford ? `$${leftover}` : `-$${Math.abs(leftover)}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedOption && (
                <Button
                  onClick={handleConfirmChoice}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg py-6 text-white shadow-xl"
                >
                  Confirm Luna’s Choice 🏠
                </Button>
              )}
            </div>
          )}

          {stage === 'result' && selectedMortgage && (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">🎉</div>
              <h3 className="text-4xl text-gray-900 font-bold">Luna’s Outcome</h3>

              <p className="text-xl text-gray-700">
                Luna the {luna.job} chose <strong>{selectedMortgage.title}</strong>
              </p>

              <div className="bg-blue-50 border border-blue-300 rounded-2xl p-6 max-w-2xl mx-auto">
                <p className="text-blue-900 text-lg">
                  {getOutcome(calcLeftover(selectedMortgage.monthlyPayment))}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 max-w-2xl mx-auto">
                <h4 className="text-emerald-900 text-lg font-semibold mb-2">💡 What We Learned:</h4>
                <ul className="text-left text-gray-800 space-y-1">
                  <li>• Always check how much you have left after expenses.</li>
                  <li>• Your income determines how much home you can afford.</li>
                  <li>• A smaller payment can mean less stress and more savings long-term.</li>
                </ul>
              </div>

              <Button
                onClick={() => {
                    onComplete(getPoints(calcLeftover(selectedMortgage.monthlyPayment)));
                    onBack(); // 👈 Go back to dashboard/home
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg py-4 px-8 shadow-xl"
              >
                Finish Lesson 🏡
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
