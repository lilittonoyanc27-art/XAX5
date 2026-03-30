import React, { useState } from 'react';
import { 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Info,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data ---

const THEORY = [
  {
    titleArm: "Արական սեռ (EL) / Género Masculino (EL)",
    rules: [
      { rule: "Վերջավորություն -o", examples: "el libro (գիրք), el perro (շուն)" },
      { rule: "Վերջավորություն -e", examples: "el coche (մեքենա), el aire (օդ)" },
      { rule: "Բաղաձայններ (LRNS)", examples: "el sol (արև), el pan (հաց)" },
      { rule: "Շաբաթվա օրերը", examples: "el lunes (երկուշաբթի), el martes (երեքշաբթի)" },
      { rule: "Հունական ծագման բառեր (-ma)", examples: "el problema (խնդիր), el tema (թեմա)" }
    ]
  },
  {
    titleArm: "Իգական սեռ (LA) / Género Femenino (LA)",
    rules: [
      { rule: "Վերջավորություն -a", examples: "la mesa (սեղան)" },
      { rule: "Աբստրակտ հասկացություններ (-dad, -tad)", examples: "la ciudad (քաղաք), la libertad (ազատություն)" },
      { rule: "Աբստրակտ հասկացություններ (-ción, -sión)", examples: "la lección (դաս), la televisión (հեռուստացույց)" },
      { rule: "Աբստրակտ հասկացություններ (-umbre)", examples: "la costumbre (սովորություն)" },
      { rule: "Վերջավորություն -z", examples: "la luz (լույս), la paz (խաղաղություն)" }
    ]
  },
  {
    titleArm: "«Խաբուսիկ» բառեր (Բացառություններ) / Excepciones",
    rules: [
      { rule: "Արական բառեր` իգականի դիմակով (-a)", examples: "el día (օր), el mapa (քարտեզ), el planeta (մոլորակ), el sofá (բազմոց)" },
      { rule: "Իգական բառեր` արականի դիմակով (-o)", examples: "la mano (ձեռք), la foto (լուսանկար), la radio (ռադիո), la moto (մոտոցիկլետ)" }
    ]
  }
];

const GAME_WORDS = [
  { word: "libro", gender: "el", translation: "գիրք" },
  { word: "mesa", gender: "la", translation: "սեղան" },
  { word: "problema", gender: "el", translation: "խնդիր" },
  { word: "ciudad", gender: "la", translation: "քաղաք" },
  { word: "día", gender: "el", translation: "օր" },
  { word: "mano", gender: "la", translation: "ձեռք" },
  { word: "coche", gender: "el", translation: "մեքենա" },
  { word: "lección", gender: "la", translation: "դաս" },
  { word: "mapa", gender: "el", translation: "քարտեզ" },
  { word: "luz", gender: "la", translation: "լույս" },
  { word: "profesor", gender: "el", translation: "ուսուցիչ" },
  { word: "profesora", gender: "la", translation: "ուսուցչուհի" },
  { word: "dentista (տղամարդ)", gender: "el", translation: "ատամնաբույժ" },
  { word: "dentista (կին)", gender: "la", translation: "ատամնաբույժ" },
  { word: "sofá", gender: "el", translation: "բազմոց" }
];

// --- Components ---

export default function GenderMaster() {
  const [view, setView] = useState<'home' | 'theory' | 'game' | 'result'>('home');
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleAnswer = (gender: 'el' | 'la') => {
    if (feedback) return;
    
    if (GAME_WORDS[currentWordIdx].gender === gender) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentWordIdx + 1 < GAME_WORDS.length) {
        setCurrentWordIdx(i => i + 1);
        setFeedback(null);
      } else {
        setView('result');
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentWordIdx(0);
    setScore(0);
    setFeedback(null);
    setView('game');
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-[#1A1A1A] font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-[#0056b3]/20 pb-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#FF851B]" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#0056b3]">Spanish Gender Master</h1>
          </div>
          <div className="text-sm uppercase tracking-widest opacity-60 font-bold">
            Level: Beginner
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12 text-center py-6"
            >
              <div className="relative inline-block group mb-8">
                <div className="absolute inset-0 bg-[#FF851B] rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform" />
                <img 
                  src="https://picsum.photos/seed/teacher-pointer/800/600" 
                  alt="Teacher with pointer" 
                  referrerPolicy="no-referrer"
                  className="relative rounded-[40px] shadow-2xl border-4 border-white w-full max-w-lg mx-auto"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black leading-tight text-[#0056b3]">
                  Իսպաներենի սեռերի <br />
                  <span className="text-[#FF851B]">ամփոփիչ ուղեցույց</span>
                </h2>
                <p className="text-xl opacity-70 max-w-2xl mx-auto font-body">
                  Սովորեք տարբերել արական և իգական սեռերը իսպաներենում և ստուգեք ձեր գիտելիքները խաղի միջոցով:
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => setView('theory')}
                  className="w-full md:w-auto px-12 py-5 bg-white border-2 border-[#0056b3] text-[#0056b3] rounded-full flex items-center justify-center gap-3 hover:bg-[#0056b3] hover:text-white transition-all group shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-sm">Տեսություն</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setView('game')}
                  className="w-full md:w-auto px-12 py-5 bg-[#FF851B] text-white rounded-full flex items-center justify-center gap-3 hover:bg-[#e67716] transition-all group shadow-lg"
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-sm">Խաղալ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'theory' && (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('home')} className="p-2 hover:bg-[#0056b3]/5 rounded-full transition-colors text-[#0056b3]">
                  <RotateCcw className="w-6 h-6 rotate-180" />
                </button>
                <h2 className="text-3xl font-black text-[#0056b3]">Ուղեցույց / Guía</h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {THEORY.map((section, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[32px] shadow-xl border border-[#0056b3]/10">
                    <h3 className="text-2xl font-black mb-6 text-[#FF851B]">{section.titleArm}</h3>
                    <div className="space-y-4 font-body">
                      {section.rules.map((r, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 border-b border-black/5 pb-4 last:border-0">
                          <span className="font-black min-w-[200px] text-lg text-[#0056b3]">{r.rule}:</span>
                          <span className="text-lg opacity-80">{r.examples}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setView('game')}
                  className="px-16 py-6 bg-[#0056b3] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-xl"
                >
                  Անցնել խաղին
                </button>
              </div>
            </motion.div>
          )}

          {view === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto space-y-12 py-12"
            >
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-widest font-bold opacity-60 text-[#0056b3]">
                  <span>Question {currentWordIdx + 1} / {GAME_WORDS.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="h-2 bg-[#0056b3]/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#FF851B]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentWordIdx + 1) / GAME_WORDS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Word Card */}
              <div className="bg-white p-16 rounded-[48px] shadow-2xl border-4 border-[#0056b3]/5 text-center space-y-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWordIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0056b3]">
                      {GAME_WORDS[currentWordIdx].word}
                    </h3>
                    <p className="text-xl opacity-50 italic font-body">({GAME_WORDS[currentWordIdx].translation})</p>
                  </motion.div>
                </AnimatePresence>

                {/* Feedback Overlay */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm ${feedback === 'correct' ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                    >
                      {feedback === 'correct' ? (
                        <CheckCircle2 className="w-32 h-32 text-green-500" />
                      ) : (
                        <XCircle className="w-32 h-32 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => handleAnswer('el')}
                  disabled={!!feedback}
                  className="py-8 bg-white border-4 border-[#0056b3] text-[#0056b3] rounded-[32px] text-4xl font-black hover:bg-[#0056b3] hover:text-white transition-all disabled:opacity-50 shadow-xl"
                >
                  EL
                </button>
                <button 
                  onClick={() => handleAnswer('la')}
                  disabled={!!feedback}
                  className="py-8 bg-white border-4 border-[#FF851B] text-[#FF851B] rounded-[32px] text-4xl font-black hover:bg-[#FF851B] hover:text-white transition-all disabled:opacity-50 shadow-xl"
                >
                  LA
                </button>
              </div>

              <div className="flex justify-center">
                <button onClick={() => setView('theory')} className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity text-[#0056b3]">
                  <Info className="w-4 h-4" />
                  Հուշում
                </button>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-12 py-12"
            >
              <div className="space-y-4">
                <h2 className="text-6xl font-black text-[#0056b3]">Արդյունք / Resultado</h2>
                <p className="text-2xl font-body">
                  Դուք հավաքեցիք <span className="font-black text-[#FF851B]">{score}</span> միավոր {GAME_WORDS.length}-ից:
                </p>
              </div>

              {/* Final Image */}
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-[#0056b3] rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform" />
                <img 
                  src="https://picsum.photos/seed/teacher-diary/600/400" 
                  alt="Teacher with diary" 
                  referrerPolicy="no-referrer"
                  className="relative rounded-[40px] shadow-2xl border-4 border-white grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-full shadow-xl border border-[#0056b3]/10">
                  <GraduationCap className="w-8 h-8 text-[#FF851B]" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
                <button 
                  onClick={resetGame}
                  className="px-16 py-6 bg-[#FF851B] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <RotateCcw className="w-5 h-5" />
                  Նորից խաղալ
                </button>
                <button 
                  onClick={() => setView('home')}
                  className="px-16 py-6 bg-white border-2 border-[#0056b3] text-[#0056b3] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#0056b3] hover:text-white transition-all shadow-lg"
                >
                  Գլխավոր էջ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
