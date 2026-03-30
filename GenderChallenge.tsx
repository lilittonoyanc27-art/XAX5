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
  ChevronRight,
  User
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
  { word: "coche", translation: "մեքենա", correctAnswer: "el" },
  { word: "flor", translation: "ծաղիկ", correctAnswer: "la" },
  { word: "mapa", translation: "քարտեզ", correctAnswer: "el", isException: true },
  { word: "mano", translation: "ձեռք", correctAnswer: "la", isException: true },
  { word: "problema", translation: "խնդիր", correctAnswer: "el", isException: true },
  { word: "día", translation: "օր", correctAnswer: "el", isException: true },
  { word: "foto", translation: "լուսանկար", correctAnswer: "la", isException: true },
  { word: "casa", translation: "տուն", correctAnswer: "la" },
  { word: "perro", translation: "շուն", correctAnswer: "el" },
  { word: "gata", translation: "կատու (էգ)", correctAnswer: "la" },
  { word: "niño", translation: "տղա երեխա", correctAnswer: "el" },
  { word: "niña", translation: "աղջիկ երեխա", correctAnswer: "la" },
  { word: "ventana", translation: "պատուհան", correctAnswer: "la" },
  { word: "cuaderno", translation: "տետր", correctAnswer: "el" },
  { word: "silla", translation: "աթոռ", correctAnswer: "la" },
  { word: "bolígrafo", translation: "գրիչ", correctAnswer: "el" },
];

const STRICT_TEACHER_IMG = "https://images.unsplash.com/photo-1594819047050-99defca82545?auto=format&fit=crop&w=600&q=80";
const HAPPY_TEACHER_IMG = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80";

// --- Components ---

export default function GenderChallenge() {
  const [view, setView] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selected, setSelected] = useState<'el' | 'la' | null>(null);

  const question = QUESTIONS[currentIdx];

  const handleAnswer = (answer: 'el' | 'la') => {
    if (feedback) return;
    setSelected(answer);
    
    if (answer === question.correctAnswer) {
      setFeedback('correct');
      setScore(prev => prev + 5); // 20 questions * 5 = 100
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelected(null);
        setFeedback(null);
      } else {
        setView('result');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setView('start');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100">
      <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase">El o La?</h1>
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Strict Teacher Edition</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Միավորներ</p>
            <p className="text-2xl font-black text-red-600">{score}/100</p>
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
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 border border-red-100 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-red-600">Զգույշ եղիր, ուսուցիչը խիստ է</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">
                  ՍԵՌԻ <br />
                  <span className="text-red-600">ՄԱՐՏԱՀՐԱՎԵՐ</span>
                </h2>
                <p className="text-lg font-medium text-slate-500 max-w-md mx-auto">
                  Ընտրիր ճիշտ հոդը (el կամ la): Եթե սխալվես, ուսուցիչը <span className="text-red-600 font-bold">ականջներդ կքաշի</span>:
                </p>
              </div>

              <button 
                onClick={() => setView('quiz')}
                className="group bg-slate-900 text-white px-12 py-6 rounded-[32px] font-black text-2xl shadow-2xl hover:bg-red-600 transition-all flex items-center gap-4"
              >
                ՍԿՍԵԼ ԹԵՍՏԸ
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
              <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl border-b-8 border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                  <motion.div 
                    className="h-full bg-red-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-12 text-center">
                  <div className="space-y-4">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Հարց {currentIdx + 1} / {QUESTIONS.length}</p>
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight">
                      {question.word}
                    </h3>
                    <p className="text-2xl font-bold text-slate-400 italic">({question.translation})</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <button
                      disabled={feedback !== null}
                      onClick={() => handleAnswer('el')}
                      className={`p-8 rounded-3xl font-black text-4xl transition-all border-4 ${
                        selected === 'el'
                          ? (feedback === 'correct' ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white')
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-red-400 hover:bg-white'
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
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-red-400 hover:bg-white'
                      }`}
                    >
                      LA
                    </button>
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-[32px] flex flex-col items-center gap-4 ${
                          feedback === 'correct' ? 'bg-green-50 text-green-700 border-2 border-green-100' : 'bg-red-50 text-red-700 border-2 border-red-100'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-2xl font-black uppercase italic">
                          {feedback === 'correct' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                          {feedback === 'correct' ? 'Ապրես!' : 'Սխալ է!'}
                        </div>
                        {feedback === 'wrong' && (
                          <p className="text-xl font-black text-red-600 animate-bounce">
                            Արի՛, ականջներդ քաշեմ:
                          </p>
                        )}
                        {feedback === 'correct' && question.isException && (
                          <p className="text-sm font-bold">Սա բացառություն էր, լավ հիշել ես:</p>
                        )}
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
                  src={score >= 80 ? HAPPY_TEACHER_IMG : STRICT_TEACHER_IMG} 
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
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Վերջնական արդյունք</p>
                  <h2 className={`text-7xl font-black tracking-tighter ${score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                    {score}/100
                  </h2>
                </div>

                <div className="p-8 bg-white rounded-[40px] shadow-xl border border-slate-200 max-w-md mx-auto">
                  {score >= 80 ? (
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-green-600 uppercase italic">ԱՊՐԵՍ! ՄՈԼՈԴԵՑ!</h3>
                      <p className="text-slate-500 font-medium">Դու հիանալի տիրապետում ես իսպաներենի սեռերին:</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-red-600 uppercase italic">ՎԱՅ, ՎԱՅ, ՎԱՅ...</h3>
                      <p className="text-xl font-black text-red-600 mb-2">Գնա՛, թե չէ ականջներդ կքաշեմ:</p>
                      <p className="text-slate-500 font-medium italic">Ուսուցիչը շատ դժգոհ է քո գիտելիքներից:</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={resetGame}
                className="bg-slate-900 text-white px-12 py-5 rounded-full font-black text-xl shadow-xl hover:bg-red-600 transition-all flex items-center gap-3"
              >
                <RefreshCcw className="w-5 h-5" />
                ՓՈՐՁԵԼ ՆՈՐԻՑ
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-200">
            <User className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Spanish Gender Challenge • Strict Edition
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
