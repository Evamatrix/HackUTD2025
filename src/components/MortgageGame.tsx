import { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface MortgageGameProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export function MortgageGame({ onBack, onComplete }: MortgageGameProps) {
  const [stage, setStage] = useState<'intro' | 'choosing' | 'result'>('intro');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const mortgageOptions = [
    {
      id: 1,
      title: 'The Cozy Cat House 🏠',
      price: 200000,
      downPayment: 40000,
      monthlyPayment: 950,
      years: 30,
      totalPaid: 342000,
      description: '20% down, standard 30-year loan',
      emoji: '😸',
      pros: ['Lower monthly payment', 'More affordable each month'],
      cons: ['Pay more interest over time', 'Takes longer to own'],
    },
    {
      id: 2,
      title: 'The Quick Cat Den 🏡',
      price: 200000,
      downPayment: 40000,
      monthlyPayment: 1600,
      years: 15,
      totalPaid: 288000,
      description: '20% down, faster 15-year loan',
      emoji: '😺',
      pros: ['Pay off faster', 'Save $54,000 in interest!', 'Own your home sooner'],
      cons: ['Higher monthly payment', 'Less money for other things each month'],
    },
    {
      id: 3,
      title: 'The Small Down Cat Cottage 🏘️',
      price: 200000,
      downPayment: 10000,
      monthlyPayment: 1100,
      years: 30,
      totalPaid: 396000,
      description: '5% down, 30-year loan + PMI',
      emoji: '😿',
      pros: ['Need less money upfront', 'Can buy sooner'],
      cons: ['Higher monthly payment', 'Pay extra insurance (PMI)', 'Pay $196,000 in interest total!'],
    },
  ];

  const handleStartQuiz = () => {
    setStage('choosing');
  };

  const handleSelectOption = (id: number) => {
    setSelectedOption(id);
  };

  const handleConfirmChoice = () => {
    setStage('result');
    // Award points based on understanding (option 2 is best financially)
    const points = selectedOption === 2 ? 100 : selectedOption === 1 ? 75 : 50;
    onComplete(points);
  };

  const selectedMortgage = mortgageOptions.find(opt => opt.id === selectedOption);

  return (
    <div className="max-w-5xl mx-auto">
      <Button onClick={onBack} variant="ghost" className="mb-4 text-emerald-800 hover:text-emerald-900 hover:bg-emerald-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Garden
      </Button>

      <Card className="border-4 border-blue-300 bg-gradient-to-br from-white to-blue-50 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-b-4 border-blue-700">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-white/30 rounded-xl">
              <Home className="w-7 h-7" />
            </div>
            Cat's First Home 🏡
          </CardTitle>
          <CardDescription className="text-blue-100 text-base">
            Learn about mortgages and how cats buy their dream homes! 🐱
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {stage === 'intro' && (
            <div className="space-y-6">
              <div className="text-center text-7xl mb-4">🏠</div>
              
              <div className="space-y-4 text-gray-800">
                <h3 className="text-2xl text-center text-gray-900">What is a Mortgage?</h3>
                
                <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-6">
                  <p className="text-lg">
                    🏡 A <strong>mortgage</strong> is a special loan to buy a house. Most cats can't pay for a whole house at once, so they borrow money from a bank!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-emerald-300 rounded-xl p-5">
                    <div className="text-3xl mb-2">💰</div>
                    <h4 className="text-lg text-gray-900 mb-2">Down Payment</h4>
                    <p className="text-sm text-gray-700">Money you pay upfront. Usually 5-20% of the home's price.</p>
                  </div>

                  <div className="bg-white border-2 border-amber-300 rounded-xl p-5">
                    <div className="text-3xl mb-2">📅</div>
                    <h4 className="text-lg text-gray-900 mb-2">Monthly Payment</h4>
                    <p className="text-sm text-gray-700">You pay the bank every month for 15-30 years until the loan is paid off.</p>
                  </div>

                  <div className="bg-white border-2 border-rose-300 rounded-xl p-5">
                    <div className="text-3xl mb-2">📈</div>
                    <h4 className="text-lg text-gray-900 mb-2">Interest</h4>
                    <p className="text-sm text-gray-700">Extra money you pay to borrow. The longer you take to pay, the more interest you pay!</p>
                  </div>

                  <div className="bg-white border-2 border-purple-300 rounded-xl p-5">
                    <div className="text-3xl mb-2">🏆</div>
                    <h4 className="text-lg text-gray-900 mb-2">Own Your Home</h4>
                    <p className="text-sm text-gray-700">When you finish paying, the house is all yours!</p>
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5">
                  <p className="text-amber-900">
                    <strong>🌱 Fun Fact:</strong> Paying off a mortgage faster (like 15 years instead of 30) can save you tens of thousands of dollars in interest!
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleStartQuiz} 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg py-6 text-white shadow-xl"
              >
                Help the Cat Choose a Home! 🐱
              </Button>
            </div>
          )}

          {stage === 'choosing' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🤔</div>
                <h3 className="text-2xl text-gray-900 mb-2">Choose the Best Option!</h3>
                <p className="text-gray-600">The cat wants to buy a $200,000 house. Which mortgage should they choose?</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mortgageOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`cursor-pointer p-6 rounded-2xl border-3 transition-all transform ${
                      selectedOption === option.id
                        ? 'border-blue-500 bg-blue-50 scale-105 shadow-xl'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{option.emoji}</div>
                      <div className="flex-1">
                        <h4 className="text-xl text-gray-900 mb-1">{option.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-lg">
                            <p className="text-xs text-purple-700">Down Payment</p>
                            <p className="text-purple-900">${(option.downPayment / 1000).toFixed(0)}k</p>
                          </div>
                          <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-lg">
                            <p className="text-xs text-teal-700">Per Month</p>
                            <p className="text-teal-900">${option.monthlyPayment}</p>
                          </div>
                          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 rounded-lg">
                            <p className="text-xs text-amber-700">Loan Length</p>
                            <p className="text-amber-900">{option.years} years</p>
                          </div>
                          <div className="bg-gradient-to-br from-rose-100 to-rose-200 p-3 rounded-lg">
                            <p className="text-xs text-rose-700">Total Paid</p>
                            <p className="text-rose-900">${(option.totalPaid / 1000).toFixed(0)}k</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-green-700 mb-1">✅ Pros:</p>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {option.pros.map((pro, i) => (
                                <li key={i}>• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs text-red-700 mb-1">⚠️ Cons:</p>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {option.cons.map((con, i) => (
                                <li key={i}>• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOption && (
                <Button 
                  onClick={handleConfirmChoice} 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg py-6 text-white shadow-xl"
                >
                  Confirm Choice! 🏠
                </Button>
              )}
            </div>
          )}

          {stage === 'result' && selectedMortgage && (
            <div className="text-center space-y-6 py-8">
              <div className="text-8xl mb-4">{selectedMortgage.emoji}</div>
              <h3 className="text-4xl text-gray-900 tracking-tight">
                Great Learning! 🎓
              </h3>
              <p className="text-xl text-gray-700">
                You chose: <strong>{selectedMortgage.title}</strong>
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-3 border-blue-300 rounded-2xl p-6 max-w-2xl mx-auto">
                <h4 className="text-lg text-blue-900 mb-3">💡 What We Learned:</h4>
                <div className="space-y-3 text-left text-gray-800">
                  <p>• <strong>15-year mortgage:</strong> Best value! Save $54,000 in interest compared to 30-year.</p>
                  <p>• <strong>30-year mortgage:</strong> Lower monthly payment, but costs more overall.</p>
                  <p>• <strong>Low down payment:</strong> Need less money upfront, but pay more in the long run.</p>
                  <p>• <strong>The key:</strong> Balance what you can afford monthly with total cost!</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300 max-w-2xl mx-auto">
                <p className="text-emerald-900 text-lg">
                  🌳 Remember: Buying a home is a big decision! Take time to save for a good down payment and choose a loan you can afford.
                </p>
              </div>

              <Button onClick={onBack} className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg px-8 py-6 shadow-xl text-white">
                Back to Garden
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
