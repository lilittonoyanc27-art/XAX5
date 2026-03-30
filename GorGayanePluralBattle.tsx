import React, { useState, useEffect } from 'react';
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
  Grid,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

interface WordItem {
  id: string;
  text: string;
  pairId: number;
  type: 'singular' | 'plural';
}

const PAIRS = [
  { singular: "el libro", plural: "los libros" },
  { singular: "la mesa", plural: "las mesas" },
  { singular: "el coche", plural: "los coches" },
  { singular: "la casa", plural: "las casas" },
  { singular: "el mapa", plural: "los mapas" },
  { singular: "la mano", plural: "las manos" },
  { singular: "el problema", plural: "los problemas" },
  { singular: "el día", plural: "los días" },
  { singular: "la foto", plural: "las fotos" },
  { singular: "el profesor", plural: "los profesores" },
];

const generateGrid = () => {
  const items: WordItem[] = [];
  PAIRS.forEach((pair, index) => {
    items.push({ id: `s-${index}`, text: pair.singular, pairId: index, type: 'singular' });
    items.push({ id: `p-${index}`, text: pair.plural, pairId: index, type: 'plural' });
  });
  return items.sort(() => Math.random() - 0.5);
};

// --- Components ---

export default function GorGayanePluralBattle() {
  const [view, setView] = useState<'start' | 'battle' | 'end'>('start');
  const [grid, setGrid] = useState<WordItem[]>([]);
  const [scores, setScores] = useState({ Gor: 0, Gayane: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<'Gor' | 'Gayane'>('Gor');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  useEffect(() => {
    if (view === 'battle') {
      setGrid(generateGrid());
      setMatchedIds([]);
      setScores({ Gor: 0, Gayane: 0 });
      setCurrentPlayer('Gor');
    }
  }, [view]);

  const handleCellClick = (item: WordItem) => {
    if (feedback || matchedIds.includes(item.id) || selectedId === item.id) return;

    if (!selectedId) {
      setSelectedId(item.id);
    } else {
      const firstItem = grid.find(i => i.id === selectedId)!;
      
      if (firstItem.pairId === item.pairId && firstItem.type !== item.type) {
        // Correct Match
        setFeedback('correct');
        setMatchedIds(prev => [...prev, firstItem.id, item.id]);
        setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 10 }));
        
        setTimeout(() => {
          setFeedback(null);
          setSelectedId(null);
          if (matchedIds.length + 2 === grid.length) {
            setView('end');
          }
        }, 1000);
      } else {
        // Wrong Match
        setFeedback('wrong');
        setWrongIds([firstItem.id, item.id]);
        
        setTimeout(() => {
          setFeedback(null);
          setSelectedId(null);
          setWrongIds([]);
          setCurrentPlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    setView('start');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Scoreboard */}
        <header className="flex justify-between items-center mb-8 bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-2xl">
          <div className={`flex items-center gap-4 transition-all duration-500 ${currentPlayer === 'Gor' ? 'scale-110' : 'opacity-40'}`}>
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 border-2 border-blue-400">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400">Player 1</p>
              <h2 className="text-2xl font-black italic">ԳՈՌ</h2>
              <p className="text-xl font-black text-blue-400">{scores.Gor} PTS</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="bg-purple-500 p-3 rounded-full shadow-lg shadow-purple-500/40 animate-bounce">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Matching Battle</p>
          </div>

          <div className={`flex items-center gap-4 text-right transition-all duration-500 ${currentPlayer === 'Gayane' ? 'scale-110' : 'opacity-40'}`}>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-pink-400">Player 2</p>
              <h2 className="text-2xl font-black italic">ԳԱՅԱՆԵ</h2>
              <p className="text-xl font-black text-pink-400">{scores.Gayane} PTS</p>
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
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                  <Flame className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-black uppercase tracking-widest text-purple-500">Grid Duel</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
                  ԳՈՌ <span className="text-purple-500">VS</span> ԳԱՅԱՆԵ
                </h1>
                <p className="text-xl font-medium text-slate-400 max-w-2xl mx-auto">
                  Գտեք եզակի և հոգնակի թվերի զույգերը: <br />
                  Յուրաքանչյուր զույգը՝ <span className="text-white font-bold">10 միավոր</span>:
                </p>
              </div>

              <button 
                onClick={() => setView('battle')}
                className="group relative bg-purple-600 text-white px-16 py-8 rounded-[32px] font-black text-3xl shadow-2xl shadow-purple-500/40 hover:scale-105 transition-all active:scale-95"
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
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                  <Zap className={`w-4 h-4 ${currentPlayer === 'Gor' ? 'text-blue-400' : 'text-pink-400'}`} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Հերթը՝ <span className={currentPlayer === 'Gor' ? 'text-blue-400' : 'text-pink-400'}>{currentPlayer === 'Gor' ? 'ԳՈՌԻՆՆ' : 'ԳԱՅԱՆԵԻՆՆ'}</span> է
                  </span>
                </div>
              </div>

              {/* Grid Arena */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {grid.map((item) => {
                  const isSelected = selectedId === item.id;
                  const isMatched = matchedIds.includes(item.id);
                  const isWrong = wrongIds.includes(item.id);

                  return (
                    <motion.button
                      key={item.id}
                      layout
                      disabled={isMatched || feedback !== null}
                      onClick={() => handleCellClick(item)}
                      className={`h-32 rounded-3xl font-black text-xl transition-all border-4 flex items-center justify-center p-4 text-center ${
                        isMatched 
                          ? 'bg-green-500/20 border-green-500/50 text-green-400 opacity-40 scale-95' 
                          : isWrong
                          ? 'bg-red-500 border-red-400 text-white animate-shake'
                          : isSelected
                          ? 'bg-purple-600 border-purple-400 text-white scale-105 shadow-2xl shadow-purple-500/40'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      {isMatched ? <CheckCircle2 className="w-8 h-8" /> : item.text}
                    </motion.button>
                  );
                })}
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
                    {feedback === 'correct' ? <Sparkles className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                    <div className="flex flex-col items-center">
                      <span>{feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}</span>
                      {feedback === 'wrong' && (
                        <span className="text-sm mt-2 text-red-300 animate-bounce">
                          Գնա, ականջներդ քաշելու եմ!
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <div className="w-56 h-56 bg-purple-600 rounded-[48px] flex items-center justify-center shadow-2xl rotate-6 relative z-10">
                  <Trophy className="w-28 h-28 text-white" />
                </div>
                <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 animate-pulse" />
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
                  <h3 className="text-3xl font-black text-purple-500 uppercase italic">
                    {scores.Gor > scores.Gayane ? 'ՀԱՂԹԵՑ ԳՈՌԸ!' : scores.Gayane > scores.Gor ? 'ՀԱՂԹԵՑ ԳԱՅԱՆԵՆ!' : 'ՈՉ-ՈՔԻ!'}
                  </h3>
                  <p className="text-slate-400 mt-2 font-medium">Հիանալի մարտ էր: Դուք երկուսդ էլ հիանալի տիրապետում եք հոգնակի թվին:</p>
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
            <Star className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              Gor vs Gayane • Plural Battle Edition
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
