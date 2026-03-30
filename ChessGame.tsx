import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  User, 
  Brain, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Sword,
  Shield,
  Crown
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  spanish: string;
  armenian: string;
  options: string[];
  correct: string;
}

// --- Constants ---
const PABLO_FULL_NAME = "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso";

const QUESTIONS: Question[] = [
  { id: 1, spanish: 'Gira a la izquierda', armenian: 'Թեքվիր ձախ', options: ['Թեքվիր աջ', 'Թեքվիր ձախ', 'Գնա ուղիղ', 'Կանգնիր'], correct: 'Թեքվիր ձախ' },
  { id: 2, spanish: 'Sigue todo recto', armenian: 'Գնա ուղիղ', options: ['Թեքվիր ձախ', 'Գնա ուղիղ', 'Հեռու է', 'Մոտիկ է'], correct: 'Գնա ուղիղ' },
  { id: 3, spanish: 'Cerca', armenian: 'Մոտիկ', options: ['Հեռու', 'Աջ', 'Մոտիկ', 'Կենտրոն'], correct: 'Մոտիկ' },
  { id: 4, spanish: 'Lejos', armenian: 'Հեռու', options: ['Մոտիկ', 'Հեռու', 'Ձախ', 'Ուղիղ'], correct: 'Հեռու' },
  { id: 5, spanish: 'Derecha', armenian: 'Աջ', options: ['Ձախ', 'Աջ', 'Ուղիղ', 'Կենտրոն'], correct: 'Աջ' },
  { id: 6, spanish: 'Izquierda', armenian: 'Ձախ', options: ['Աջ', 'Ձախ', 'Ուղիղ', 'Հեռու'], correct: 'Ձախ' },
  { id: 7, spanish: 'Museo', armenian: 'Թանգարան', options: ['Բանկ', 'Թանգարան', 'Հրապարակ', 'Լուսացույց'], correct: 'Թանգարան' },
  { id: 8, spanish: 'Semáforo', armenian: 'Լուսացույց', options: ['Լուսացույց', 'Փողոց', 'Բանկ', 'Թանգարան'], correct: 'Լուսացույց' },
  { id: 9, spanish: 'Centro', armenian: 'Կենտրոն', options: ['Անկյուն', 'Կենտրոն', 'Վերջ', 'Սկիզբ'], correct: 'Կենտրոն' },
  { id: 10, spanish: 'Plaza', armenian: 'Հրապարակ', options: ['Փողոց', 'Տուն', 'Հրապարակ', 'Այգի'], correct: 'Հրապարակ' },
  { id: 11, spanish: 'Calle', armenian: 'Փողոց', options: ['Տուն', 'Փողոց', 'Ճանապարհ', 'Քաղաք'], correct: 'Փողոց' },
  { id: 12, spanish: 'Banco', armenian: 'Բանկ', options: ['Դպրոց', 'Բանկ', 'Խանութ', 'Հիվանդանոց'], correct: 'Բանկ' },
  { id: 13, spanish: 'En frente de', armenian: 'Դիմացը', options: ['Կողքը', 'Հետևը', 'Դիմացը', 'Մեջտեղը'], correct: 'Դիմացը' },
  { id: 14, spanish: 'Hasta', armenian: 'Մինչև', options: ['Հետո', 'Մինչև', 'Առաջ', 'Վերջ'], correct: 'Մինչև' },
  { id: 15, spanish: 'Después', armenian: 'Հետո', options: ['Հիմա', 'Հետո', 'Առաջ', 'Միշտ'], correct: 'Հետո' },
  { id: 16, spanish: 'Mira', armenian: 'Նայիր', options: ['Լսիր', 'Նայիր', 'Խոսիր', 'Գրիր'], correct: 'Նայիր' },
  { id: 17, spanish: 'Camina', armenian: 'Քայլիր', options: ['Վազիր', 'Քայլիր', 'Կանգնիր', 'Նստիր'], correct: 'Քայլիր' },
  { id: 18, spanish: 'Verás', armenian: 'Կտեսնես', options: ['Կլսես', 'Կտեսնես', 'Կզգաս', 'Կիմանաս'], correct: 'Կտեսնես' },
  { id: 19, spanish: 'Un poco más', armenian: 'Մի փոքր էլ', options: ['Շատ', 'Մի փոքր էլ', 'Բավական է', 'Քիչ'], correct: 'Մի փոքր էլ' },
  { id: 20, spanish: 'Justo', armenian: 'Հենց', options: ['Մոտավորապես', 'Հենց', 'Հեռու', 'Արագ'], correct: 'Հենց' },
  { id: 21, spanish: 'Muchas gracias', armenian: 'Շատ շնորհակալություն', options: ['Խնդրեմ', 'Շատ շնորհակալություն', 'Բարև', 'Ցտեսություն'], correct: 'Շատ շնորհակալություն' },
  { id: 22, spanish: 'De nada', armenian: 'Խնդրեմ', options: ['Շնորհակալություն', 'Խնդրեմ', 'Այո', 'Ոչ'], correct: 'Խնդրեմ' },
  { id: 23, spanish: 'Hasta luego', armenian: 'Առայժմ', options: ['Բարի լույս', 'Առայժմ', 'Հաջողություն', 'Բարի երեկո'], correct: 'Առայժմ' },
  { id: 24, spanish: '¿Sabes?', armenian: 'Գիտե՞ս', options: ['Տեսնո՞ւմ ես', 'Գիտե՞ս', 'Լսո՞ւմ ես', 'Ուզո՞ւմ ես'], correct: 'Գիտե՞ս' },
  { id: 25, spanish: 'Dónde', armenian: 'Որտեղ', options: ['Ինչպես', 'Որտեղ', 'Երբ', 'Ով'], correct: 'Որտեղ' },
  { id: 26, spanish: 'Está', armenian: 'Գտնվում է', options: ['Կա', 'Գտնվում է', 'Գնում է', 'Գալիս է'], correct: 'Գտնվում է' },
  { id: 27, spanish: 'Perդón', armenian: 'Ներեցեք', options: ['Խնդրում եմ', 'Ներեցեք', 'Շնորհակալ եմ', 'Բարև'], correct: 'Ներեցեք' },
  { id: 28, spanish: 'Claro', armenian: 'Իհարկե', options: ['Հնարավոր է', 'Իհարկե', 'Երբեք', 'Գուցե'], correct: 'Իհարկե' },
  { id: 29, spanish: 'Silla', armenian: 'Աթոռ', options: ['Սեղան', 'Աթոռ', 'Պահարան', 'Մահճակալ'], correct: 'Աթոռ' },
  { id: 30, spanish: 'Gato', armenian: 'Կատու', options: ['Շուն', 'Կատու', 'Ձի', 'Թռչուն'], correct: 'Կատու' },
];

export default function ChessGrammarGame() {
  const [playerPos, setPlayerPos] = useState({ x: 3, y: 7 });
  const [pabloPos, setPabloPos] = useState({ x: 3, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'waitingForMove' | 'won' | 'lost'>('start');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Initialize game
  const startGame = () => {
    setPlayerPos({ x: 3, y: 7 });
    setPabloPos({ x: 3, y: 0 });
    setScore(0);
    setQuestionsCount(0);
    setGameState('playing');
    nextQuestion();
  };

  const nextQuestion = () => {
    if (questionsCount >= 30) {
      setGameState(score >= 15 ? 'won' : 'lost');
      return;
    }
    const randomIdx = Math.floor(Math.random() * QUESTIONS.length);
    setCurrentQuestion(QUESTIONS[randomIdx]);
    setFeedback(null);
    setQuestionsCount(q => q + 1);
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || feedback || gameState !== 'playing') return;

    const isCorrect = answer === currentQuestion.correct;
    setFeedback({
      isCorrect,
      message: isCorrect ? 'Ճիշտ է! Հիմա ընտրիր քայլդ տախտակի վրա:' : 'Սխալ է: Պաբլոն մոտենում է:'
    });

    if (isCorrect) {
      setScore(s => s + 1);
      setGameState('waitingForMove');
    } else {
      setTimeout(() => {
        movePablo();
        if (gameState !== 'lost') {
          nextQuestion();
        }
      }, 1500);
    }
  };

  const handleCellClick = (x: number, y: number) => {
    if (gameState !== 'waitingForMove') return;

    // Check if the move is valid (adjacent cell)
    const dx = Math.abs(x - playerPos.x);
    const dy = Math.abs(y - playerPos.y);
    
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)) {
      setPlayerPos({ x, y });
      if (x === pabloPos.x && y === pabloPos.y) {
        setGameState('won');
      } else {
        setGameState('playing');
        nextQuestion();
      }
    }
  };

  const movePablo = () => {
    setPabloPos(prev => {
      // Pablo moves towards the player
      let nextX = prev.x;
      let nextY = prev.y;

      if (prev.x < playerPos.x) nextX++;
      else if (prev.x > playerPos.x) nextX--;
      
      if (prev.y < playerPos.y) nextY++;
      else if (prev.y > playerPos.y) nextY--;

      if (nextX === playerPos.x && nextY === playerPos.y) {
        setGameState('lost');
      }
      return { x: nextX, y: nextY };
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-slate-800 font-sans p-4 md:p-8 flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Pablo Info & Score */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          <div className="glass-card p-6 rounded-[2rem] border border-orange-100 space-y-4">
            <div className="flex items-center gap-3 text-orange-600 font-bold text-xs uppercase tracking-widest">
              <User className="w-4 h-4" />
              Հակառակորդ
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 leading-tight">ՊԱԲԼՈ</h2>
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed break-words">
                {PABLO_FULL_NAME}
              </p>
            </div>
            <div className="pt-4 border-t border-orange-50 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                <span>Հարցեր</span>
                <span>{questionsCount} / 30</span>
              </div>
              <div className="w-full bg-orange-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${(questionsCount / 30) * 100}%` }} />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase">Միավորներ</div>
                <div className="text-2xl font-black text-orange-500">{score}</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-[2rem] text-white space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-orange-400 text-[10px] font-bold uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              Կանոններ
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              1. Ճիշտ պատասխանիր հարցին:<br/>
              2. Ճիշտ պատասխանից հետո **ինքդ ընտրիր քայլդ** տախտակի վրա:<br/>
              3. Եթե սխալվես, Պաբլոն կմոտենա քեզ:<br/>
              4. Խաղը տևում է 30 հարց:
            </p>
          </div>
        </div>

        {/* Center Panel: 3D Chess Board */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
          <div className="perspective-1000 w-full max-w-[500px] aspect-square">
            <motion.div 
              initial={{ rotateX: 20 }}
              className="w-full h-full bg-white rounded-2xl shadow-2xl border-8 border-slate-800 grid grid-cols-8 grid-rows-8 overflow-hidden transform-style-3d"
            >
              {Array.from({ length: 64 }).map((_, i) => {
                const x = i % 8;
                const y = Math.floor(i / 8);
                const isDark = (x + y) % 2 === 1;
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isPablo = pabloPos.x === x && pabloPos.y === y;
                
                // Highlight possible moves
                const dx = Math.abs(x - playerPos.x);
                const dy = Math.abs(y - playerPos.y);
                const isPossibleMove = gameState === 'waitingForMove' && ((dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1));

                return (
                  <div 
                    key={i} 
                    onClick={() => handleCellClick(x, y)}
                    className={`
                      relative flex items-center justify-center transition-all cursor-pointer
                      ${isDark ? 'bg-orange-100/50' : 'bg-white'}
                      ${isPossibleMove ? 'ring-2 ring-inset ring-orange-400 bg-orange-200/40' : ''}
                      hover:bg-orange-50
                    `}
                  >
                    <AnimatePresence>
                      {isPlayer && (
                        <motion.div
                          layoutId="player-piece"
                          initial={{ scale: 0, y: -20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0 }}
                          className="z-20 text-orange-600 drop-shadow-lg"
                        >
                          <Crown className="w-8 h-8 fill-current" />
                        </motion.div>
                      )}
                      {isPablo && (
                        <motion.div
                          layoutId="pablo-piece"
                          initial={{ scale: 0, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0 }}
                          className="z-20 text-slate-800 drop-shadow-lg"
                        >
                          <Sword className="w-8 h-8 fill-current" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="absolute inset-0 border-[0.5px] border-orange-50/30 pointer-events-none" />
                  </div>
                );
              })}
            </motion.div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="w-3 h-3 bg-orange-500 rounded-sm" /> Դու (Թագավոր)
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="w-3 h-3 bg-slate-800 rounded-sm" /> Պաբլո (Թուր)
            </div>
          </div>
        </div>

        {/* Right Panel: Questions & Controls */}
        <div className="lg:col-span-3 space-y-6 order-3">
          <AnimatePresence mode="wait">
            {gameState === 'start' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-[2rem] text-center space-y-6"
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">Պատրա՞ստ ես</h3>
                <button 
                  onClick={startGame}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl"
                >
                  ՍԿՍԵԼ ԽԱՂԸ
                </button>
              </motion.div>
            ) : gameState === 'won' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-emerald-50 border-2 border-emerald-200 rounded-[2rem] text-center space-y-4 shadow-2xl shadow-emerald-100"
              >
                <Trophy className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-black text-emerald-800">ՀԱՂԹԱՆԱԿ!</h3>
                <p className="text-sm text-emerald-600 font-medium">Դուք հաղթեցիք Պաբլոյին:</p>
                <button onClick={startGame} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl">ԿՐԿՆԵԼ</button>
              </motion.div>
            ) : gameState === 'lost' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-red-50 border-2 border-red-200 rounded-[2rem] text-center space-y-4 shadow-2xl shadow-red-100"
              >
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-2xl font-black text-red-800">ՊԱՐՏՈՒԹՅՈՒՆ</h3>
                <p className="text-sm text-red-600 font-medium">Պաբլոն ավելի արագ էր:</p>
                <button onClick={startGame} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl">ՓՈՐՁԵԼ ՆՈՐԻՑ</button>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion?.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-6 rounded-[2rem] space-y-6"
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Իսպաներեն</div>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    {currentQuestion?.spanish}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {currentQuestion?.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!feedback || gameState === 'waitingForMove'}
                      className={`
                        p-4 rounded-xl text-left font-bold text-sm transition-all border-2
                        ${feedback && opt === currentQuestion.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 
                          feedback && opt !== currentQuestion.correct ? 'bg-white border-slate-50 opacity-50' :
                          'bg-white border-orange-50 hover:border-orange-200 hover:bg-orange-50/30'}
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border flex items-center gap-3 ${feedback.isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}
                  >
                    {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="text-xs font-bold">{feedback.message}</p>
                  </motion.div>
                )}

                {gameState === 'waitingForMove' && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 text-xs font-bold text-center animate-pulse">
                    ԸՆՏՐԻՐ ՔԱՅԼԴ ՏԱԽՏԱԿԻ ՎՐԱ
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Info */}
      <footer className="mt-12 text-center text-orange-600/20 text-[10px] font-mono uppercase tracking-[0.3em] pb-8">
        Chess Grammar Battle • Pablo vs Player • 30 Questions Challenge
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(255, 99, 33, 0.05);
        }
      `}} />
    </div>
  );
}
