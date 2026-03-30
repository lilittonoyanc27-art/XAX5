import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Compass, 
  Map as MapIcon, 
  ChevronRight, 
  Trophy, 
  RotateCcw, 
  Star,
  Zap,
  Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data ---

interface TimeLevel {
  id: number;
  hour: number;
  minute: number;
  questionArm: string;
  options: string[];
  correctAnswer: string;
  storyArm: string;
}

const LEVELS: TimeLevel[] = [
  {
    id: 1,
    hour: 10,
    minute: 0,
    questionArm: "Ժամը քանի՞սն է:",
    options: ["Son las diez", "Es la una", "Son las dos", "Son las diez y media"],
    correctAnswer: "Son las diez",
    storyArm: "Դուք սկսում եք ձեր ճանապարհորդությունը առավոտյան:"
  },
  {
    id: 2,
    hour: 1,
    minute: 0,
    questionArm: "Ինչպե՞ս կլինի 'Ժամը մեկն է':",
    options: ["Son las una", "Es la una", "Es el uno", "Son las una en punto"],
    correctAnswer: "Es la una",
    storyArm: "Ժամանակն է կեսօրյա ընդմիջման:"
  },
  {
    id: 3,
    hour: 4,
    minute: 30,
    questionArm: "Ինչպե՞ս կլինի 'Չորսն անց կես':",
    options: ["Son las cuatro y media", "Son las cuatro y cuarto", "Son las cuatro menos media", "Es la cuatro y media"],
    correctAnswer: "Son las cuatro y media",
    storyArm: "Արևը սկսում է իջնել:"
  },
  {
    id: 4,
    hour: 7,
    minute: 15,
    questionArm: "Ինչպե՞ս կլինի 'Յոթն անց տասնհինգ' (քառորդ):",
    options: ["Son las siete y quince", "Son las siete y cuarto", "Son las siete menos cuarto", "Es la siete y cuarto"],
    correctAnswer: "Son las siete y cuarto",
    storyArm: "Երեկոյան հանդիպման ժամանակն է:"
  },
  {
    id: 5,
    hour: 11,
    minute: 45,
    questionArm: "Ինչպե՞ս կլինի 'Տասներկուսին տասնհինգ պակաս':",
    options: ["Son las doce menos cuarto", "Son las once y cuarenta", "Son las doce y cuarto", "Son las once menos cuarto"],
    correctAnswer: "Son las doce menos cuarto",
    storyArm: "Գիշերը մոտենում է:"
  },
  {
    id: 6,
    hour: 2,
    minute: 0,
    questionArm: "Ինչպե՞ս կլինի 'Ժամը երկուսն է':",
    options: ["Son las dos", "Es las dos", "Son los dos", "Es la dos"],
    correctAnswer: "Son las dos",
    storyArm: "Ճանապարհորդությունը շարունակվում է:"
  },
  {
    id: 7,
    hour: 5,
    minute: 15,
    questionArm: "Ինչպե՞ս կլինի 'Հինգն անց քառորդ':",
    options: ["Son las cinco y cuarto", "Son las cinco y quince", "Es la cinco y cuarto", "Son las cinco menos cuarto"],
    correctAnswer: "Son las cinco y cuarto",
    storyArm: "Թեյի ժամանակն է:"
  },
  {
    id: 8,
    hour: 8,
    minute: 30,
    questionArm: "Ինչպե՞ս կլինի 'Ութն անց կես':",
    options: ["Son las ocho y media", "Son las ocho y treinta", "Es la ocho y media", "Son las ocho menos media"],
    correctAnswer: "Son las ocho y media",
    storyArm: "Ընթրիքի ժամանակն է:"
  },
  {
    id: 9,
    hour: 1,
    minute: 45,
    questionArm: "Ինչպե՞ս կլինի 'Երկուսին քառորդ պակաս':",
    options: ["Son las dos menos cuarto", "Son las una y cuarenta y cinco", "Es la dos menos cuarto", "Son las dos y cuarto"],
    correctAnswer: "Son las dos menos cuarto",
    storyArm: "Գրեթե հասանք տեղ:"
  },
  {
    id: 10,
    hour: 12,
    minute: 0,
    questionArm: "Ինչպե՞ս կլինի 'Ժամը տասներկուսն է':",
    options: ["Son las doce", "Es la doce", "Son los doce", "Es el doce"],
    correctAnswer: "Son las doce",
    storyArm: "Դուք հասաք ձեր նպատակին:"
  }
];

// --- Components ---

const AnalogClock = ({ hour, minute }: { hour: number, minute: number }) => {
  const hourDeg = (hour % 12) * 30 + minute * 0.5;
  const minuteDeg = minute * 6;

  return (
    <div className="relative w-64 h-64 bg-white rounded-full border-8 border-blue-900 shadow-2xl flex items-center justify-center">
      {/* Numbers */}
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
        <div 
          key={num}
          className="absolute font-black text-blue-900 text-xl"
          style={{ 
            transform: `rotate(${i * 30}deg) translateY(-100px) rotate(-${i * 30}deg)` 
          }}
        >
          {num}
        </div>
      ))}
      
      {/* Center Dot */}
      <div className="absolute w-4 h-4 bg-blue-900 rounded-full z-30" />
      
      {/* Hour Hand */}
      <motion.div 
        className="absolute w-2 h-16 bg-blue-900 rounded-full origin-bottom z-20"
        animate={{ rotate: hourDeg }}
        style={{ bottom: '50%' }}
      />
      
      {/* Minute Hand */}
      <motion.div 
        className="absolute w-1.5 h-24 bg-sky-500 rounded-full origin-bottom z-10"
        animate={{ rotate: minuteDeg }}
        style={{ bottom: '50%' }}
      />
    </div>
  );
};

export default function TimeQuest() {
  const [view, setView] = useState<'intro' | 'game' | 'result'>('intro');
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(12);

  const currentLevel = LEVELS[levelIndex];

  useEffect(() => {
    if (view !== 'game' || feedback) return;

    if (timeLeft === 0) {
      setFeedback('wrong');
      setTimeout(() => {
        if (levelIndex + 1 < LEVELS.length) {
          setLevelIndex(l => l + 1);
          setFeedback(null);
          setSelectedOption(null);
          setTimeLeft(12);
        } else {
          setView('result');
        }
      }, 1500);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, view, feedback, levelIndex]);

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === currentLevel.correctAnswer) {
      setFeedback('correct');
      setScore(s => s + 10);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (levelIndex + 1 < LEVELS.length) {
        setLevelIndex(l => l + 1);
        setFeedback(null);
        setSelectedOption(null);
        setTimeLeft(12);
      } else {
        setView('result');
      }
    }, 1500);
  };

  const restart = () => {
    setLevelIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedOption(null);
    setTimeLeft(12);
    setView('game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-900 font-['Inter'] text-white overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-20" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-10"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  className="absolute inset-[-20px] border-4 border-dashed border-white/30 rounded-full"
                />
                <div className="bg-white p-10 rounded-full shadow-2xl relative">
                  <Clock className="w-24 h-24 text-blue-900" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                  TIME <br/>
                  <span className="text-yellow-400">QUEST</span>
                </h1>
                <p className="text-xl font-bold uppercase tracking-[0.3em] opacity-80">Ժամանակի Ճանապարհորդություն</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 max-w-md mx-auto space-y-4">
                <p className="font-bold text-lg">
                  Անցիր բոլոր 10 մակարդակները՝ ճիշտ որոշելով ժամը իսպաներենով: Յուրաքանչյուր ճիշտ պատասխան քեզ ավելի մոտ է բերում հաղթանակին:
                </p>
                <div className="flex justify-center gap-4 text-yellow-400">
                  <Compass className="w-6 h-6" />
                  <MapIcon className="w-6 h-6" />
                  <Zap className="w-6 h-6" />
                </div>
              </div>

              <button 
                onClick={() => setView('game')}
                className="group relative px-16 py-8 bg-yellow-400 text-blue-900 text-2xl font-black uppercase tracking-widest rounded-full shadow-[0_10px_0_0_#ca8a04] hover:scale-105 active:translate-y-[10px] active:shadow-none transition-all"
              >
                ՍԿՍԵԼ ՔՎԵՍԹԸ
              </button>
            </motion.div>
          )}

          {view === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full space-y-8"
            >
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
                <motion.div 
                  className="bg-yellow-400 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((levelIndex + 1) / LEVELS.length) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">CURRENT SCENE</p>
                  <h2 className="text-3xl font-black italic uppercase text-yellow-400">Level {levelIndex + 1}</h2>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">SCORE</p>
                  <p className="text-3xl font-black">{score}</p>
                </div>
              </div>

              {/* Timer Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/10">
                <motion.div 
                  className={`h-full ${timeLeft <= 3 ? 'bg-red-500' : 'bg-sky-400'}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / 12) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/10 backdrop-blur-2xl p-12 rounded-[50px] border border-white/20 shadow-2xl">
                <div className="flex flex-col items-center space-y-8">
                  <AnalogClock hour={currentLevel.hour} minute={currentLevel.minute} />
                  <div className="bg-blue-900/50 px-6 py-3 rounded-2xl border border-white/10">
                    <p className="text-sm font-bold italic opacity-80 text-center">{currentLevel.storyArm}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                      <Timer className={`w-6 h-6 ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`} />
                      {currentLevel.questionArm}
                      <span className={`ml-auto text-3xl font-black ${timeLeft <= 3 ? 'text-red-500' : 'text-white'}`}>
                        {timeLeft}s
                      </span>
                    </h3>
                    <div className="h-1 w-20 bg-yellow-400" />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentLevel.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!feedback}
                        className={`
                          group relative p-6 rounded-3xl text-left font-black text-xl transition-all border-4
                          ${selectedOption === option 
                            ? (option === currentLevel.correctAnswer ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white')
                            : 'bg-white/5 border-white/10 hover:border-yellow-400 hover:bg-white/10 text-white'
                          }
                          ${feedback && option !== currentLevel.correctAnswer && selectedOption !== option ? 'opacity-30' : ''}
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option}</span>
                          {selectedOption === option && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              {option === currentLevel.correctAnswer ? <Star className="fill-current" /> : <RotateCcw />}
                            </motion.div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-12"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-[-40px] bg-yellow-400 rounded-full blur-3xl"
                />
                <div className="relative bg-white p-16 rounded-full shadow-2xl">
                  <Trophy className="w-32 h-32 text-blue-900" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-7xl font-black uppercase italic tracking-tighter">ՔՎԵՍԹԸ ԱՎԱՐՏՎԱԾ Է</h2>
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">TOTAL SCORE</p>
                    <p className="text-6xl font-black text-yellow-400">{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">TIME MASTER</p>
                    <p className="text-6xl font-black text-sky-400">{Math.round((score / (LEVELS.length * 10)) * 100)}%</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button 
                  onClick={restart}
                  className="px-16 py-8 bg-yellow-400 text-blue-900 font-black uppercase tracking-widest rounded-full shadow-[0_8px_0_0_#ca8a04] hover:scale-105 active:translate-y-[8px] active:shadow-none transition-all"
                >
                  ՆՈՐԻՑ ԽԱՂԱԼ <RotateCcw className="inline ml-2 w-8 h-8" />
                </button>
                <button 
                  onClick={() => setView('intro')}
                  className="px-16 py-8 bg-white/10 border-2 border-white/30 font-black uppercase tracking-widest rounded-full hover:bg-white/20 transition-all"
                >
                  ԳԼԽԱՎՈՐ ՄԵՆՅՈՒ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
