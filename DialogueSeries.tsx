import React, { useState } from 'react';
import { 
  Tv, 
  BookOpen, 
  Gamepad2, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle, 
  Coffee, 
  DoorOpen, 
  Plane,
  Languages,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data ---

interface DialogueLine {
  character: 'José' | 'Pablo' | 'Ignacio' | 'Narrator';
  spanish: string;
  armenian: string;
  image?: string;
}

const DIALOGUE: DialogueLine[] = [
  { 
    character: 'José', 
    spanish: "No, hoy es martes. Aquí tienes tu té. ¡Cuidado, está caliente!", 
    armenian: "Ոչ, այսօր երեքշաբթի է: Ահա քո թեյը: Զգույշ եղիր, տաք է:",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'Pablo', 
    spanish: "¡Gracias!", 
    armenian: "Շնորհակալություն:",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'Narrator', 
    spanish: "(De repente, tocaron a la puerta y entró Ignacio con una bandeja.)", 
    armenian: "(Հանկարծ դուռը թակեցին, և Իգնասիոն ներս մտավ սկուտեղով:)",
    image: "https://images.unsplash.com/photo-1517733948473-98921171d075?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'Ignacio', 
    spanish: "¡Hola, chicos! Perdón por entrar así, pero tengo algo para vosotros. Este té no es mío, es de María Guadalupe.", 
    armenian: "Ողջույն, տղանե՛ր: Կներեք այսպես ներս մտնելու համար, բայց ես ձեզ համար մի բան ունեմ: Այս թեյն իմը չէ, այն Մարիա Գուադալուպեից է:",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'José', 
    spanish: "¿De María Guadalupe? ¿Dónde está ella?", 
    armenian: "Մարիա Գուադալուպեի՞ց: Որտե՞ղ է նա:",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'Ignacio', 
    spanish: "Ella está en su casa, pero me llamó hace cinco minutos. Dijo: 'Ignacio, tienes que llevar este té de Armenia a mis amigos'.", 
    armenian: "Նա իր տանն է, բայց հինգ րոպե առաջ ինձ զանգահարեց: Ասաց. «Իգնասիո՛, դու պետք է այս հայկական թեյը տանես ընկերներիս»:",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'Pablo', 
    spanish: "¡Qué amable es María Guadalupe! Pero, Ignacio, ¿por qué tienes prisa?", 
    armenian: "Ինչ բարի է Մարիա Գուադալուպեն: Բայց, Իգնասիո՛, ինչո՞ւ ես շտապում:",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  { 
    character: 'Ignacio', 
    spanish: "Porque tengo que hablar con José. Vamos a ir a Madrid el próximo mes y tenemos que preparar todo. ¡María Guadalupe también viene con nosotros!", 
    armenian: "Որովհետև ես պետք է խոսեմ Խոսեի հետ: Մենք հաջորդ ամիս պատրաստվում ենք գնալ Մադրիդ և պետք է ամեն ինչ պատրաստենք: Մարիա Գուադալուպեն նույնպես գալիս է մեզ հետ:",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "¿Qué día es hoy?",
    options: ["Lunes", "Martes", "Miércoles"],
    answer: "Martes",
    armenian: "Ի՞նչ օր է այսօր:"
  },
  {
    question: "¿De quién es el té?",
    options: ["De Ignacio", "De José", "De María Guadalupe"],
    answer: "De María Guadalupe",
    armenian: "Ո՞ւմն է թեյը:"
  },
  {
    question: "¿A dónde van el próximo mes?",
    options: ["A Armenia", "A Madrid", "A Barcelona"],
    answer: "A Madrid",
    armenian: "Ո՞ւր են գնում հաջորդ ամիս:"
  },
  {
    question: "¿Cómo está el té?",
    options: ["Frío", "Caliente", "Dulce"],
    answer: "Caliente",
    armenian: "Ինչպիսի՞ն է թեյը:"
  },
  {
    question: "¿Por qué tiene prisa Ignacio?",
    options: ["Tiene que dormir", "Tiene que hablar con José", "Tiene que comer"],
    answer: "Tiene que hablar con José",
    armenian: "Ինչո՞ւ է Իգնասիոն շտապում:"
  },
  {
    question: "¿Cuál es el artículo para 'mesa'?",
    options: ["El", "La", "Los"],
    answer: "La",
    armenian: "Ո՞րն է 'mesa'-ի հոդը:"
  },
  {
    question: "¿Cuál es el artículo para 'libros'?",
    options: ["El", "La", "Los"],
    answer: "Los",
    armenian: "Ո՞րն է 'libros'-ի հոդը:"
  },
  {
    question: "¿Cuál es el artículo para 'chica'?",
    options: ["El", "La", "Las"],
    answer: "La",
    armenian: "Ո՞րն է 'chica'-ի հոդը:"
  },
  {
    question: "¿Cuál es el artículo para 'profesores'?",
    options: ["El", "Los", "Las"],
    answer: "Los",
    armenian: "Ո՞րն է 'profesores'-ի հոդը:"
  },
  {
    question: "¿Cuál es el artículo para 'ventanas'?",
    options: ["El", "Los", "Las"],
    answer: "Las",
    armenian: "Ո՞րն է 'ventanas'-ի հոդը:"
  }
];

// --- Components ---

export default function DialogueSeries() {
  const [view, setView] = useState<'menu' | 'text' | 'series' | 'quiz'>('menu');
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const resetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleQuizAnswer = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option === QUIZ_QUESTIONS[quizIndex].answer) {
      setFeedback('correct');
      setScore(s => s + 10); // Each question is 10 points
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (quizIndex < QUIZ_QUESTIONS.length - 1) {
        setQuizIndex(i => i + 1);
        setFeedback(null);
        setSelectedOption(null);
      } else {
        setQuizIndex(i => i + 1); // Move to result
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-800 font-sans selection:bg-pink-200">
      
      {/* Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/40 blur-[100px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-yellow-200/40 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 bg-white/60 backdrop-blur-md p-6 rounded-[32px] border border-white/40 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200 rotate-3">
              <Tv className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-sky-600">El Té de Armenia</h1>
              <p className="text-[10px] font-bold text-pink-500 uppercase tracking-[0.2em]">Spanish Series Experience</p>
            </div>
          </div>
          {view !== 'menu' && (
            <button 
              onClick={() => { setView('menu'); resetQuiz(); setSeriesIndex(0); }}
              className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform text-sky-500"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {view === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-black uppercase tracking-widest text-yellow-700">New Episode</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-sky-900 uppercase italic leading-none">
                  ՄԱԴՐԻԴԻ <br />
                  <span className="text-pink-500">ՃԱՆԱՊԱՐՀԸ</span>
                </h2>
                <p className="text-xl font-medium text-slate-500 max-w-md mx-auto">
                  Դիտիր սերիալը, սովորիր երկխոսությունը և ստուգիր գիտելիքներդ վարժությունների միջոցով:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                <button 
                  onClick={() => setView('text')}
                  className="bg-white text-sky-600 p-8 rounded-[40px] font-black text-xl shadow-xl shadow-sky-100 hover:translate-y-1 transition-all flex flex-col items-center gap-4 border-2 border-sky-50"
                >
                  <div className="p-4 bg-sky-50 rounded-2xl"><BookOpen /></div>
                  ՏԵՔՍՏԸ
                </button>
                <button 
                  onClick={() => setView('series')}
                  className="bg-sky-500 text-white p-8 rounded-[40px] font-black text-xl shadow-xl shadow-sky-200 hover:translate-y-1 transition-all flex flex-col items-center gap-4"
                >
                  <div className="p-4 bg-sky-400 rounded-2xl"><Tv /></div>
                  ՍԵՐԻԱԼ
                </button>
                <button 
                  onClick={() => setView('quiz')}
                  className="bg-pink-500 text-white p-8 rounded-[40px] font-black text-xl shadow-xl shadow-pink-200 hover:translate-y-1 transition-all flex flex-col items-center gap-4"
                >
                  <div className="p-4 bg-pink-400 rounded-2xl"><Gamepad2 /></div>
                  ՎԱՐԺՈՒԹՅՈՒՆ
                </button>
              </div>
            </motion.div>
          )}

          {view === 'text' && (
            <motion.div 
              key="text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border-4 border-sky-100">
                <div className="flex items-center gap-4 mb-10">
                  <Languages className="text-sky-500 w-8 h-8" />
                  <h3 className="text-3xl font-black uppercase italic text-sky-900">Երկխոսություն</h3>
                </div>

                <div className="space-y-8">
                  {DIALOGUE.map((line, i) => (
                    <div key={i} className={`flex gap-6 ${line.character === 'Pablo' ? 'flex-row-reverse text-right' : ''}`}>
                      {line.character !== 'Narrator' && (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-white">
                          <img src={line.image} alt={line.character} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <div className={`flex-1 p-6 rounded-[32px] shadow-sm border ${
                        line.character === 'José' ? 'bg-sky-50 border-sky-100 rounded-tl-none' :
                        line.character === 'Pablo' ? 'bg-pink-50 border-pink-100 rounded-tr-none' :
                        line.character === 'Ignacio' ? 'bg-yellow-50 border-yellow-100' :
                        'bg-slate-50 border-slate-200 italic text-slate-500'
                      }`}>
                        {line.character !== 'Narrator' && <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-40">{line.character}</p>}
                        <p className="text-xl font-black text-slate-800 leading-tight">{line.spanish}</p>
                        <p className="text-sm font-medium text-slate-500 mt-3 border-t border-black/5 pt-3">{line.armenian}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setView('series')}
                  className="bg-sky-500 text-white px-12 py-5 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-4"
                >
                  ԴԻՏԵԼ ՍԵՐԻԱԼԸ
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'series' && (
            <motion.div 
              key="series"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col gap-8"
            >
              {/* Cinema Screen */}
              <div className="bg-slate-900 rounded-[50px] p-4 md:p-8 shadow-2xl border-[12px] border-slate-800 relative aspect-video overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={seriesIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full h-full flex flex-col items-center justify-center text-center p-8"
                  >
                    {DIALOGUE[seriesIndex].character !== 'Narrator' ? (
                      <div className="space-y-8">
                        <div className="relative inline-block">
                          <img 
                            src={DIALOGUE[seriesIndex].image} 
                            alt={DIALOGUE[seriesIndex].character} 
                            className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] object-cover shadow-2xl border-4 border-white/20" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-6 py-2 rounded-full font-black text-sm shadow-xl">
                            {DIALOGUE[seriesIndex].character}
                          </div>
                        </div>
                        <div className="space-y-4 max-w-2xl">
                          <p className="text-2xl md:text-4xl font-black text-white leading-tight">
                            {DIALOGUE[seriesIndex].spanish}
                          </p>
                          <p className="text-lg font-medium text-sky-300 italic">
                            {DIALOGUE[seriesIndex].armenian}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                          <DoorOpen className="text-slate-900 w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                          <p className="text-2xl font-black text-yellow-400 italic">
                            {DIALOGUE[seriesIndex].spanish}
                          </p>
                          <p className="text-lg font-medium text-slate-400">
                            {DIALOGUE[seriesIndex].armenian}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10">
                  <motion.div 
                    className="h-full bg-sky-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((seriesIndex + 1) / DIALOGUE.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center px-4">
                <button 
                  disabled={seriesIndex === 0}
                  onClick={() => setSeriesIndex(i => i - 1)}
                  className="p-6 bg-white rounded-full shadow-xl text-sky-500 disabled:opacity-30 hover:scale-110 transition-transform"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                
                <div className="flex gap-4">
                  {seriesIndex === DIALOGUE.length - 1 ? (
                    <button 
                      onClick={() => setView('quiz')}
                      className="bg-pink-500 text-white px-12 py-5 rounded-full font-black text-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-4"
                    >
                      ԱՆՑՆԵԼ ՎԱՐԺՈՒԹՅԱՆԸ
                      <Gamepad2 />
                    </button>
                  ) : (
                    <button 
                      onClick={() => setSeriesIndex(i => i + 1)}
                      className="bg-sky-500 text-white px-12 py-5 rounded-full font-black text-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-4"
                    >
                      ՀԱՋՈՐԴԸ
                      <ChevronRight />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col gap-8"
            >
              {quizIndex < QUIZ_QUESTIONS.length ? (
                <div className="bg-white rounded-[50px] p-8 md:p-16 shadow-2xl border-8 border-pink-50 relative overflow-hidden text-center">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Gamepad2 className="w-32 h-32" />
                  </div>

                  <div className="space-y-12 relative z-10">
                    <div className="space-y-4">
                      <p className="text-pink-400 font-black uppercase tracking-[0.3em] text-xs">Հարց {quizIndex + 1} / {QUIZ_QUESTIONS.length}</p>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-800 leading-tight">
                        {QUIZ_QUESTIONS[quizIndex].question}
                      </h2>
                      <p className="text-xl font-bold text-slate-400 italic">({QUIZ_QUESTIONS[quizIndex].armenian})</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {QUIZ_QUESTIONS[quizIndex].options.map((opt) => (
                        <button
                          key={opt}
                          disabled={feedback !== null}
                          onClick={() => handleQuizAnswer(opt)}
                          className={`p-6 rounded-3xl font-black text-xl transition-all border-4 ${
                            selectedOption === opt
                              ? (feedback === 'correct' ? 'bg-green-500 border-green-400 text-white' : 'bg-red-500 border-red-400 text-white')
                              : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-pink-400 hover:bg-white'
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
                          className={`flex items-center justify-center gap-3 font-black text-2xl uppercase italic ${
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
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                  <div className="relative">
                    {score >= 80 ? (
                      <div className="space-y-8">
                        <div className="w-56 h-56 bg-green-500 rounded-[48px] flex items-center justify-center shadow-2xl rotate-6 relative z-10 mx-auto">
                          <CheckCircle2 className="w-28 h-28 text-white" />
                        </div>
                        <h2 className="text-6xl font-black tracking-tighter uppercase italic text-green-600">ԱՊՐԵՍ! (MOLODEC)</h2>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="w-56 h-56 bg-red-500 rounded-[48px] flex items-center justify-center shadow-2xl -rotate-6 relative z-10 mx-auto overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1594819047050-99defca82545?auto=format&fit=crop&w=400&q=80" 
                            alt="Angry Teacher" 
                            className="w-full h-full object-cover opacity-80"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <XCircle className="w-28 h-28 text-white/50" />
                          </div>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-red-600">ՈՒՍՈՒՑԻՉԸ ԲԱՐԿԱՑԱԾ Է!</h2>
                        <p className="text-slate-500 font-bold">Պետք է ավելի լավ սովորես:</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-pink-400 blur-3xl opacity-10 animate-pulse" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-3xl font-bold text-slate-500">
                      Քո արդյունքը՝ <span className={`${score >= 80 ? 'text-green-600' : 'text-red-600'} text-5xl`}>{score}</span> / 100
                    </p>
                  </div>

                  <button 
                    onClick={() => { setView('menu'); resetQuiz(); }}
                    className="bg-sky-500 text-white px-16 py-6 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-4"
                  >
                    <RefreshCcw />
                    ՓՈՐՁԵԼ ՆՈՐԻՑ
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-white/40">
            <Coffee className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Spanish Series • El Té de Armenia
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
