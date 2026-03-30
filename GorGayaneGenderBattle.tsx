import React, { useState } from 'react';
import { 
  Swords, 
  Trophy, 
  User, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  ArrowRight,
  Star,
  Flame,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

interface Question {
  word: string;
  translation: string;
  correctAnswer: 'el' | 'la';
  isException?: boolean;
}

const QUESTIONS: Question[] = [
  { word: "libro", translation: "գիրք", correctAnswer: "el" },
  { word: "mesa", translation: "սեղան", correctAnswer: "la" },
  { word: "sol", translation: "արև", correctAnswer: "el" },
  { word: "luna", translation: "լուսին", correctAnswer: "la" },
  { word: "mapa", translation: "քարտեզ", correctAnswer: "el", isException: true },
  { word: "mano", translation: "ձեռք", correctAnswer: "la", isException: true },
  { word: "problema", translation: "խնդիր", correctAnswer: "el", isException: true },
  { word: "foto", translation: "լուսանկար", correctAnswer: "la", isException: true },
  { word: "día", translation: "օր", correctAnswer: "el", isException: true },
  { word: "flor", translation: "ծաղիկ", correctAnswer: "la" },
  { word: "coche", translation: "մեքենա", correctAnswer: "el" },
  { word: "casa", translation: "տուն", correctAnswer: "la" },
  { word: "perro", translation: "շուն", correctAnswer: "el" },
  { word: "gata", translation: "կատու (էգ)", correctAnswer: "la" },
  { word: "niño", translation: "տղա երեխա", correctAnswer: "el" },
  { word: "niña", translation: "աղջիկ երեխա", correctAnswer: "la" },
  { word: "cuaderno", translation: "տետր", correctAnswer: "el" },
  { word: "silla", translation: "աթոռ", correctAnswer: "la" },
  { word: "bolígrafo", translation: "գրիչ", correctAnswer: "el" },
  { word: "ventana", translation: "պատուհան", correctAnswer: "la" },
];

// --- Components ---

export default function GorGayaneGenderBattle() {
  const [view, setView] = useState<'start' | 'battle' | 'end'>('start');
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<'Gor' | 'Gayane'>('Gor');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selected, setSelected] = useState<'el' | 'la' | null>(null);

  const question = QUESTIONS[currentIdx];

  const handleAnswer = (answer: 'el' | 'la') => {
    if (feedback) return;
    setSelected(answer);
    
    if (answer === question.correctAnswer) {
      setFeedback('correct');
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 10 }));
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setCurrentPlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
        setFeedback(null);
        setSelected(null);
      } else {
        setView('end');
      }
    }, 1500);
  };

  const resetGame = () => {
    setScores({ Gor: 0, Gayane: 0 });
    setCurrentPlayer('Gor');
    setCurrentIdx(0);
    setFeedback(null);
    setSelected(null);
    setView('start');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-orange-500/30 overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Scoreboard */}
        <header className="flex justify-between items-center mb-8 bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-2xl">
          <div className={`flex items-center gap-4 transition-all duration-500 ${currentPlayer === 'Gor' ? 'scale-110' : 'opacity-40'}`}>
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 border-2 border-blue-400">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400">Player 1</p>
              <h2 className="text-2xl font-black italic">ԳՈՌ</h2>
              <p className="text-xl font-black text-blue-400">{scores.Gor} / 100</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="bg-orange-500 p-3 rounded-full shadow-lg shadow-orange-500/40 animate-bounce">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Gender Battle</p>
          </div>

          <div className={`flex items-center gap-4 text-right transition-all duration-500 ${currentPlayer === 'Gayane' ? 'scale-110' : 'opacity-40'}`}>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-pink-400">Player 2</p>
              <h2 className="text-2xl font-black italic">ԳԱՅԱՆԵ</h2>
              <p className="text-xl font-black text-pink-400">{scores.Gayane} / 100</p>
            </div>
            <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 border-2 border-pink-400">
              <User className="w-8 h-8" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-black uppercase tracking-widest text-orange-500">Gender Duel</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
                  ԳՈՌ <span className="text-orange-500">VS</span> ԳԱՅԱՆԵ
                </h1>
                <p className="text-xl font-medium text-slate-400 max-w-2xl mx-auto">
                  Ո՞վ ավելի լավ գիտի իսպաներենի սեռերը: <br />
                  Յուրաքանչյուր ճիշտ պատասխանը՝ <span className="text-white font-bold">10 միավոր</span>:
                </p>
              </div>

              <button 
                onClick={() => setView('battle')}
                className="group relative bg-orange-500 text-white px-16 py-8 rounded-[32px] font-black text-3xl shadow-2xl shadow-orange-500/40 hover:scale-105 transition-all active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-4">
                  ՍԿՍԵԼ ՄԱՐՏԸ
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          )}

          {view === 'battle' && (
            <motion.div 
              key="battle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col gap-8"
            >
              {/* Question Card */}
              <div className={`bg-white/5 backdrop-blur-xl rounded-[48px] p-8 md:p-16 border-4 shadow-2xl relative overflow-hidden transition-colors duration-500 ${
                currentPlayer === 'Gor' ? 'border-blue-500/30' : 'border-pink-500/30'
              }`}>
                
                {/* Turn Indicator */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 bg-white/10 rounded-full border border-white/10">
                  <Zap className={`w-4 h-4 ${currentPlayer === 'Gor' ? 'text-blue-400' : 'text-pink-400'}`} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Հերթը՝ <span className={currentPlayer === 'Gor' ? 'text-blue-400' : 'text-pink-400'}>{currentPlayer === 'Gor' ? 'ԳՈՌԻՆՆ' : 'ԳԱՅԱՆԵԻՆՆ'}</span> է
                  </span>
                </div>

                <div className="mt-8 space-y-12 text-center">
                  <div className="space-y-4">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Question {currentIdx + 1} / {QUESTIONS.length}</p>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-tight">
                      {question.word}
                    </h2>
                    <p className="text-2xl font-bold text-slate-400 italic">({question.translation})</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                    <button
                      disabled={feedback !== null}
                      onClick={() => handleAnswer('el')}
                      className={`p-8 rounded-3xl font-black text-4xl transition-all border-4 ${
                        selected === 'el'
                          ? (feedback === 'correct' ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white')
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-orange-500/50'
                      }`}
                    >
                      EL
                    </button>
                    <button
                      disabled={feedback !== null}
                      onClick={() => handleAnswer('la')}
                      className={`p-8 rounded-3xl font-black text-4xl transition-all border-4 ${
                        selected === 'la'
                          ? (feedback === 'correct' ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white')
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-orange-500/50'
                      }`}
                    >
                      LA
                    </button>
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center justify-center gap-4 text-3xl font-black uppercase italic ${
                          feedback === 'correct' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {feedback === 'correct' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                        {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'end' && (
            <motion.div 
              key="end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="relative">
                <div className="w-56 h-56 bg-orange-500 rounded-[48px] flex items-center justify-center shadow-2xl rotate-6 relative z-10">
                  <Trophy className="w-28 h-28 text-white" />
                </div>
                <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-30 animate-pulse" />
              </div>

              <div className="space-y-6">
                <h2 className="text-6xl font-black tracking-tighter uppercase italic">ՄԱՐՏԻ ԱՎԱՐՏ</h2>
                <div className="flex gap-12 justify-center items-end">
                  <div className="space-y-2">
                    <p className="text-blue-400 font-black">ԳՈՌ</p>
                    <p className="text-5xl font-black">{scores.Gor}</p>
                  </div>
                  <div className="text-4xl font-black text-slate-700">VS</div>
                  <div className="space-y-2">
                    <p className="text-pink-400 font-black">ԳԱՅԱՆԵ</p>
                    <p className="text-5xl font-black">{scores.Gayane}</p>
                  </div>
                </div>
                
                <div className="mt-8 p-8 bg-white/5 rounded-[32px] border border-white/10">
                  <h3 className="text-3xl font-black text-orange-500 uppercase italic">
                    {scores.Gor > scores.Gayane ? 'ՀԱՂԹԵՑ ԳՈՌԸ!' : scores.Gayane > scores.Gor ? 'ՀԱՂԹԵՑ ԳԱՅԱՆԵՆ!' : 'ՈՉ-ՈՔԻ!'}
                  </h3>
                  <p className="text-slate-400 mt-2 font-medium">Հիանալի մարտ էր: Դուք երկուսդ էլ հիանալի տիրապետում եք իսպաներենին:</p>
                </div>
              </div>

              <button 
                onClick={resetGame}
                className="bg-white text-slate-900 px-16 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-4"
              >
                <RefreshCcw />
                ԽԱՂԱԼ ՆՈՐԻՑ
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
            <Star className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              Gor vs Gayane • Gender Battle Edition
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
