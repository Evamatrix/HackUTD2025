import { Trophy, Sparkles, Target, Scale, Coins } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp } from 'lucide-react';
// Import local cat icons
// Icons are served from public/assets/icons - use public URLs (no static import needed)

interface DashboardProps {
  userProgress: {
    totalPoints: number;
    badges: string[];
    gamesCompleted: {
      savings: number;
      budget: number;
      wantvsneed: number;
      moneymatch: number;
      investing: number;
      debt: number;
      mortgage: number;
    };
  };
  onSelectGame: (game: 'savings' | 'budget' | 'wantvsneed' | 'moneymatch' | 'investing' | 'debt' | 'mortgage') => void;
}

export function Dashboard({ userProgress, onSelectGame }: DashboardProps) {
  const games = [
    {
      id: 'savings' as const,
      title: 'Kitty Savings Bank',
      description: 'Help the cats save for big goals 🐱',
      icon: 'assets/icons/piggy-cat.svg',
      emoji: '😸',
      color: 'from-amber-400 to-orange-500',
      bgPattern: 'from-amber-100 to-orange-100',
      completed: userProgress.gamesCompleted.savings,
    },
    {
      id: 'budget' as const,
      title: 'Cat Budget Planner',
      description: 'Plan spending like a wise cat 🐈',
      icon: 'assets/icons/budget-cat.svg',
      emoji: '😺',
      color: 'from-teal-500 to-emerald-600',
      bgPattern: 'from-teal-100 to-emerald-100',
      completed: userProgress.gamesCompleted.budget,
    },
    {
      id: 'wantvsneed' as const,
      title: 'Paws & Priorities',
      description: 'Learn what cats need vs want 😻',
      icon: 'assets/icons/book-cat.svg',
      emoji: '😻',
      color: 'from-purple-500 to-pink-600',
      bgPattern: 'from-purple-100 to-pink-100',
      completed: userProgress.gamesCompleted.wantvsneed,
    },
    {
      id: 'moneymatch' as const,
      title: 'Meow Money Match',
      description: 'Match items with prices 😼',
      icon: 'assets/icons/shopping-cat.svg',
      emoji: '😼',
      color: 'from-green-500 to-lime-600',
      bgPattern: 'from-green-100 to-lime-100',
      completed: userProgress.gamesCompleted.moneymatch,
    },
    {
      id: 'investing' as const,
      title: 'Cat Investment Garden',
      description: 'Grow wealth like planting seeds 🌱',
      icon: 'assets/icons/deposit-cat.svg',
      emoji: '😽',
      color: 'from-rose-500 to-red-600',
      bgPattern: 'from-rose-100 to-red-100',
      completed: userProgress.gamesCompleted.investing,
    },
    {
      id: 'debt' as const,
      title: 'Debt Dilemma',
      description: 'Learn to escape debt traps 😿',
      icon: 'assets/icons/budget-cat.svg',
      emoji: '😿',
      color: 'from-rose-400 to-pink-600',
      bgPattern: 'from-rose-100 to-pink-100',
      completed: userProgress.gamesCompleted.debt,
    },
    {
      id: 'mortgage' as const,
      title: 'Cat\'s First Home',
      description: 'Understand mortgages & home buying 🏡',
      icon: 'assets/icons/main-cat.svg',
      emoji: '🏠',
      color: 'from-blue-500 to-cyan-600',
      bgPattern: 'from-blue-100 to-cyan-100',
      completed: userProgress.gamesCompleted.mortgage,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Welcome Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-5xl text-emerald-900 tracking-tight flex items-center justify-center gap-3">
          Welcome to the Garden!
        </h2>
        <p className="text-xl text-teal-700 max-w-2xl mx-auto">
          Help our cat friends learn about money while exploring nature 
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-all overflow-hidden border-4 border-amber-600">
          <div className="absolute top-0 right-0 text-7xl opacity-20">🐱</div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/30 rounded-xl">
                <span className="text-2xl">🐟</span>
              </div>
              Catnip Points
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-5xl tracking-tight">{userProgress.totalPoints}</p>
            <p className="text-sm text-amber-100 mt-2">Keep collecting! 🐾</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all overflow-hidden border-4 border-teal-700">
          <div className="absolute top-0 right-0 text-7xl opacity-20">🌿</div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/30 rounded-xl">
                <span className="text-2xl"></span>
                 <img src="assets/icons/flower.svg" alt="Flower" className="w-8 h-8 object-contain" />
              </div>
              Garden Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-5xl tracking-tight">{userProgress.badges.length}</p>
            <p className="text-sm text-teal-100 mt-2">Collect them all! 🌺</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 via-green-600 to-lime-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all overflow-hidden border-4 border-green-700">
          <div className="absolute top-0 right-0 text-7xl opacity-20">🍃</div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/30 rounded-xl">
                <span className="text-2xl">✅</span>
              </div>
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-5xl tracking-tight">
              {Object.values(userProgress.gamesCompleted).reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-sm text-green-100 mt-2">Adventures done! 🌱</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      {userProgress.badges.length > 0 && (
        <Card className="bg-gradient-to-br from-white to-green-50 border-4 border-emerald-400 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-emerald-900 text-2xl flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              Your Garden Achievements
            </CardTitle>
            <CardDescription className="text-teal-700">Keep growing your collection! 🌸</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {userProgress.badges.map((badge) => (
                <div key={badge} className="group relative">
                  <Badge className="text-base px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:scale-110 transition-transform border-2 border-amber-600">
                    <span className="text-lg mr-2">🌟</span>
                    {badge}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Games Grid */}
      <div>
        <h3 className="text-3xl text-emerald-900 mb-6 tracking-tight flex items-center gap-2">
          Choose Your Adventure <span className="text-2xl">🌳</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            return (
              <Card
                key={game.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 overflow-hidden bg-white hover:border-amber-400 border-teal-300"
                onClick={() => onSelectGame(game.id)}
              >
                <div className={`h-3 bg-gradient-to-r ${game.color}`} />
                <CardHeader className="relative overflow-hidden bg-gradient-to-br ${game.bgPattern}">
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.bgPattern} opacity-40`}></div>
                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3 text-gray-900 text-xl mb-2">
                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${game.color} shadow-lg group-hover:scale-110 transition-transform`}>
                          <img
                            src={game.icon}
                            alt={game.title}
                            className="object-contain"
                            style={{ width: 54, height: 54 }}
                          />
                        </div>
                        {game.title}
                      </CardTitle>
                      <CardDescription className="text-teal-700">{game.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-green-100 rounded-full border-2 border-green-300">
                        <span className="text-sm text-green-700">
                          {game.completed}x Purrfect! 🐾
                        </span>
                      </div>
                    </div>
                    <div className={`px-6 py-3 rounded-xl bg-gradient-to-r ${game.color} text-white shadow-lg group-hover:shadow-xl transition-all`}>
                      Let's Play!
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}