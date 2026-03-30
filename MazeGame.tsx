import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  Compass, 
  Flag, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Home,
  Navigation
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  explanationAm: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Ինչպե՞ս կլինի իսպաներեն «Մոտիկ»:',
    options: ['Cerca', 'Lejos', 'Derecha'],
    correct: 'Cerca',
    explanation: '"Cerca" significa cerca en el espacio.',
    explanationAm: '«Cerca» նշանակում է մոտիկ տարածության մեջ:'
  },
  {
    id: 2,
    text: 'Ինչպե՞ս կլինի իսպաներեն «Հեռու»:',
    options: ['Cerca', 'Lejos', 'Izquierda'],
    correct: 'Lejos',
    explanation: '"Lejos" se usa para distancias grandes.',
    explanationAm: '«Lejos»-ն օգտագործվում է մեծ հեռավորությունների համար:'
  },
  {
    id: 3,
    text: 'Լրացրեք նախադասությունը. "El gato está ____ de la silla" (Կատուն աթոռին ՄՈՏ է):',
    options: ['lejos', 'cerca', 'recto'],
    correct: 'cerca',
    explanation: 'Usamos "cerca de" para indicar proximidad.',
    explanationAm: 'Մենք օգտագործում ենք «cerca de» մոտիկություն նշելու համար:'
  },
  {
    id: 4,
    text: 'Լրացրեք նախադասությունը. "La montaña está ____" (Լեռը ՀԵՌՈՒ է):',
    options: ['cerca', 'lejos', 'centro'],
    correct: 'lejos',
    explanation: '"Lejos" indica que algo no está cerca.',
    explanationAm: '«Lejos»-ը ցույց է տալիս, որ ինչ-որ բան մոտիկ չէ:'
  },
  {
    id: 5,
    text: 'Ո՞րն է "Cerca"-ի հականիշը (հակառակ իմաստը):',
    options: ['Derecha', 'Lejos', 'Todo recto'],
    correct: 'Lejos',
    explanation: 'Cerca y Lejos son antónimos.',
    explanationAm: 'Cerca-ն և Lejos-ը հականիշներ են:'
  }
];

const MAZE_SIZE = 5;
const EXIT_POS = { x: 4, y: 4 };

export default function MazeGame() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'answering'>('playing');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; messageAm: string } | null>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex % QUESTIONS.length];

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correct;
    
    setFeedback({
      isCorrect,
      message: currentQuestion.explanation,
      messageAm: currentQuestion.explanationAm
    });

    if (isCorrect) {
      // Move player
      setTimeout(() => {
        movePlayer();
      }, 1500);
    }
  };

  const movePlayer = () => {
    setPlayerPos(prev => {
      let nextX = prev.x;
      let nextY = prev.y;

      if (nextX < EXIT_POS.x) {
        nextX += 1;
      } else if (nextY < EXIT_POS.y) {
        nextY += 1;
      }

      if (nextX === EXIT_POS.x && nextY === EXIT_POS.y) {
        setGameState('won');
      }
      return { x: nextX, y: nextY };
    });

    // Reset for next question
    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setCurrentQuestionIndex(0);
    setGameState('playing');
    setFeedback(null);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-slate-800 font-sans p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            Cerca & Lejos Game
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            ԼԱԲԻՐԻՆԹՈՍԻ <span className="text-orange-500">ԱՐԿԱԾԸ</span>
          </h1>
          <p className="text-slate-600 font-medium">Ճիշտ պատասխանիր, որպեսզի ճամփորդը դուրս գա լաբիրինթոսից:</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Maze Grid */}
          <div className="relative p-4 bg-white/40 rounded-[3rem] border border-orange-100 shadow-xl">
            <div className="grid grid-cols-5 gap-2 aspect-square">
              {Array.from({ length: MAZE_SIZE * MAZE_SIZE }).map((_, i) => {
                const x = i % MAZE_SIZE;
                const y = Math.floor(i / MAZE_SIZE);
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isExit = EXIT_POS.x === x && EXIT_POS.y === y;
                const isPath = (x <= playerPos.x && y <= playerPos.y);

                return (
                  <div 
                    key={i} 
                    className={`
                      relative rounded-2xl border flex items-center justify-center transition-all duration-500
                      ${isExit ? 'bg-emerald-100 border-emerald-300' : 'bg-white/60 border-orange-50'}
                      ${isPath && !isExit ? 'bg-orange-100/50' : ''}
                    `}
                  >
                    {isPlayer && (
                      <motion.div 
                        layoutId="player"
                        className="z-10 p-2 bg-orange-500 rounded-xl shadow-lg text-white"
                      >
                        <User className="w-6 h-6" />
                      </motion.div>
                    )}
                    {isExit && !isPlayer && (
                      <Flag className="w-6 h-6 text-emerald-500" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[8px] font-mono">
                      {x},{y}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-6 flex justify-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" /> Ճամփորդ
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" /> Ելք
              </div>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {gameState === 'won' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 bg-emerald-50 border-2 border-emerald-200 rounded-[3rem] text-center space-y-6 shadow-2xl shadow-emerald-100"
                >
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                    <Home className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-emerald-800 tracking-tight">ՀԱՂԹԱՆԱԿ!</h2>
                    <p className="text-emerald-600 font-medium text-lg">Ճամփորդը հասավ տուն:</p>
                  </div>
                  <button 
                    onClick={resetGame}
                    className="px-12 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
                  >
                    ԽԱՂԱԼ ՆՈՐԻՑ
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-8 md:p-12 rounded-[3rem] space-y-8"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500 font-mono text-xs uppercase tracking-widest">
                      <Navigation className="w-4 h-4" />
                      Հարց {currentQuestionIndex + 1}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                      {currentQuestion.text}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!feedback}
                        className={`
                          p-6 rounded-2xl text-left font-bold text-lg transition-all border-2
                          ${selectedOption === option 
                            ? (option === currentQuestion.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700')
                            : 'bg-white border-orange-50 hover:border-orange-200 hover:bg-orange-50/30'}
                          ${feedback && option === currentQuestion.correct && selectedOption !== option ? 'border-emerald-500 bg-emerald-50/50' : ''}
                        `}
                      >
                        <div className="flex justify-between items-center">
                          {option}
                          {selectedOption === option && (
                            option === currentQuestion.correct ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl border ${feedback.isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}
                    >
                      <p className="font-bold mb-1">{feedback.isCorrect ? 'Ճիշտ է!' : 'Սխալ է'}</p>
                      <p className="text-sm opacity-80 mb-2">{feedback.messageAm}</p>
                      <p className="text-xs italic opacity-60">{feedback.message}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-orange-100 flex justify-between items-center text-orange-600/30 text-xs font-mono uppercase tracking-widest pb-12">
          <div className="flex items-center gap-2">
            <MapIcon className="w-4 h-4" />
            <span>Cerca vs Lejos Maze</span>
          </div>
          <button onClick={resetGame} className="hover:text-orange-500 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset Game
          </button>
        </footer>
      </div>
    </div>
  );
}
