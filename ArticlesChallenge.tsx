import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  ArrowRight, 
  Trophy, 
  AlertTriangle,
  GraduationCap,
  Star,
  Gamepad2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

interface Question {
  sentence: string;
  translation: string;
  options: string[];
  correctAnswer: string;
}

const QUESTIONS: Question[] = [
  { sentence: "___ casa es muy grande.", translation: "Տունը շատ մեծ է:", options: ["El", "La", "Los", "Las"], correctAnswer: "La" },
  { sentence: "___ libros están en la mesa.", translation: "Գրքերը սեղանի վրա են:", options: ["El", "La", "Los", "Las"], correctAnswer: "Los" },
  { sentence: "___ sol brilla mucho.", translation: "Արևը շատ է փայլում:", options: ["El", "La", "Los", "Las"], correctAnswer: "El" },
  { sentence: "___ flores son bonitas.", translation: "Ծաղիկները գեղեցիկ են:", options: ["El", "La", "Los", "Las"], correctAnswer: "Las" },
  { sentence: "___ coche es rojo.", translation: "Մեքենան կարմիր է:", options: ["El", "La", "Los", "Las"], correctAnswer: "El" },
  { sentence: "___ manzanas son rojas.", translation: "Խնձորները կարմիր են:", options: ["El", "La", "Los", "Las"], correctAnswer: "Las" },
  { sentence: "___ gato duerme en el sofá.", translation: "Կատուն քնած է բազմոցին:", options: ["El", "La", "Los", "Las"], correctAnswer: "El" },
  { sentence: "___ sillas son cómodas.", translation: "Աթոռները հարմարավետ են:", options: ["El", "La", "Los", "Las"], correctAnswer: "Las" },
  { sentence: "___ perro corre rápido.", translation: "Շունը արագ է վազում:", options: ["El", "La", "Los", "Las"], correctAnswer: "El" },
  { sentence: "___ ventana está abierta.", translation: "Պատուհանը բաց է:", options: ["El", "La", "Los", "Las"], correctAnswer: "La" },
];

const SUCCESS_IMG = "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=600&q=80"; // Happy student/teacher
const FAILURE_IMG = "https://images.unsplash.com/photo-1580894732230-28389339b059?auto=format&fit=crop&w=600&q=80"; // Strict/Stressed teacher

// --- Components ---

export default function ArticlesChallenge() {
  const [view, setView] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const question = QUESTIONS[currentIdx];

  const handleAnswer = (answer: string) => {
    if (feedback) return;
    setSelectedAnswer(answer);
    
    if (answer === question.correctAnswer) {
      setFeedback('correct');
      setScore(prev => prev + 10);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setView('result');
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setView('start');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase italic">Artículos Challenge</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Definite Articles Test</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</p>
              <p className="text-2xl font-black text-indigo-600">{score}/100</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                  <Star className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600">80+ Points to Pass</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">
                  ԻՍՊԱՆԵՐԵՆԻ <br />
                  <span className="text-indigo-600">ՄԱՐՏԱՀՐԱՎԵՐ</span>
                </h2>
                <p className="text-lg font-medium text-slate-500 max-w-md mx-auto">
                  Լրացրու նախադասությունները ճիշտ հոդերով: Հավաքիր առնվազն <span className="text-indigo-600 font-bold">80 միավոր</span>, որպեսզի ուսուցիչը գոհ մնա:
                </p>
              </div>

              <button 
                onClick={() => setView('quiz')}
                className="group bg-indigo-600 text-white px-12 py-6 rounded-[32px] font-black text-2xl shadow-2xl shadow-indigo-200 hover:translate-y-1 transition-all flex items-center gap-4"
              >
                ՍԿՍԵԼ ԽԱՂԸ
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl border-b-8 border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <motion.div 
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-12 text-center">
                  <div className="space-y-4">
                    <p className="text-sm font-black text-indigo-500 uppercase tracking-[0.3em]">Question {currentIdx + 1} of 10</p>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
                      {question.sentence}
                    </h3>
                    <p className="text-xl font-medium text-slate-400 italic">"{question.translation}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {question.options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={feedback !== null}
                        onClick={() => handleAnswer(opt)}
                        className={`p-6 rounded-3xl font-black text-2xl transition-all border-4 ${
                          selectedAnswer === opt
                            ? (feedback === 'correct' ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white')
                            : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-indigo-400 hover:bg-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center justify-center gap-3 text-2xl font-black uppercase italic ${
                          feedback === 'correct' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {feedback === 'correct' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                        {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-10"
            >
              <div className="relative group">
                <img 
                  src={score >= 80 ? SUCCESS_IMG : FAILURE_IMG} 
                  alt="Result" 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-[48px] object-cover shadow-2xl border-8 border-white group-hover:rotate-2 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center shadow-xl ${score >= 80 ? 'bg-green-500' : 'bg-red-500'}`}>
                  {score >= 80 ? <Trophy className="text-white w-10 h-10" /> : <AlertTriangle className="text-white w-10 h-10" />}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Your Final Score</p>
                  <h2 className={`text-7xl font-black tracking-tighter ${score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                    {score}/100
                  </h2>
                </div>

                <div className="p-8 bg-white rounded-[40px] shadow-xl border border-slate-100 max-w-md mx-auto">
                  {score >= 80 ? (
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-green-600 uppercase italic">ԱՊՐԵՍ! ՄՈԼՈԴԵՑ!</h3>
                      <p className="text-slate-500 font-medium">Դու հիանալի տիրապետում ես իսպաներենի հոդերին: Ուսուցիչը հպարտ է քեզնով:</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-red-600 uppercase italic">ՎԱՅ, ՎԱՅ, ՎԱՅ...</h3>
                      <p className="text-slate-500 font-medium italic">Ուսուցիչը բարկացած է: Դու պետք է ավելի լավ սովորես, թե չէ ականջներդ կքաշի:</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={resetGame}
                className="bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-xl hover:scale-105 transition-all flex items-center gap-3"
              >
                <RefreshCcw className="w-5 h-5" />
                ՓՈՐՁԵԼ ՆՈՐԻՑ
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
            <Gamepad2 className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Spanish Articles Challenge • 80 Points Goal
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
