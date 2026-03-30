import React, { useState } from 'react';
import { 
  Tv,
  Trophy,
  RotateCcw,
  BookOpen,
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data ---

const SERIAL_DIALOGUE = [
  {
    speaker: "Ignacio",
    sp: "— ¡Che, María! ¿Qué mirás con tanta atención? ¿Hay una mosca en la pared?",
    am: "(Է՜յ, Մարիա՛: Ինչի՞ն ես այդքան ուշադիր նայում: Պատի վրա ճանճ կա՞:)",
    mood: "🧔"
  },
  {
    speaker: "María",
    sp: "— ¡No, Ignacio! Mirá esa foto... a la izquierda de la radio. ¡Es él! ¡Es el chico del té!",
    am: "(Ո՛չ, Իգնասիո: Նայիր այդ նկարին... ռադիոյից ձախ: Դա նա է... Թեյի տղան է:)",
    mood: "👩"
  },
  {
    speaker: "Pablo",
    sp: "— ¿Qué chico? ¿Cómo se llama?",
    am: "(Ո՞ր տղան: Ի՞նչ է նրա անունը:)",
    mood: "👨‍💼"
  },
  {
    speaker: "María",
    sp: "— Se llama... Francisco Javier de la Santa Cruz y Valderrama de los Ríos.",
    am: "(Նրա անունն է... Ֆրանսիսկո Խավիեր դե լա Սանտա Կրուս ի Վալդեռամա դե լոս Ռիոս:)",
    mood: "👩✨"
  },
  {
    speaker: "José",
    sp: "— ¡Qué nombre tan largo! ¿Y quién es? ¿Un príncipe?",
    am: "(Ինչ երկար անուն է: Իսկ ո՞վ է նա: Արքայազն է՞:)",
    mood: "👨‍🦳"
  },
  {
    speaker: "María",
    sp: "— No, ¡sos un exagerado, José! Fue mi primer amigo en Armenia. Estábamos en un café en el centro de Ereván, a la una y media. Él estaba sentado enfrente de mí.",
    am: "(Ո՛չ, չափազանցնում ես, Խոսե՛: Նա իմ առաջին ընկերն էր Հայաստանում: Մենք Երևանի կենտրոնի մի սրճարանում էինք, մեկն անց կեսին: Նա նստած էր իմ դիմաց:)",
    mood: "👩☕"
  },
  {
    speaker: "Ignacio",
    sp: "— ¿Y qué hacían?",
    am: "(Իսկ ի՞նչ էիք անում:)",
    mood: "🧔❓"
  },
  {
    speaker: "María",
    sp: "— Tomábamos este mismo té. Él me dijo: «María, este té tiene mucha energía. ¡Te va a gustar mucho!». ¡Y miren, es verdad! Todavía tengo la foto.",
    am: "(Խմում էինք հենց այս նույն թեյը: Նա ինձ ասաց. «Մարիա՛, այս թեյը շատ էներգիա ունի: Այն քեզ շատ դուր կգա»: Եվ նայեք, դա ճիշտ է: Ես դեռ ունեմ լուսանկարը:)",
    mood: "👩📸"
  },
  {
    speaker: "Pablo",
    sp: "— ¡Qué increíble! Pero, ¿dónde vive ahora Francisco... Francisco Javier... bueno, el chico del nombre largo?",
    am: "(Ինչ անհավանական է: Բայց որտե՞ղ է ապրում հիմա Ֆրանսիսկո... Ֆրանսիսկո Խավիեր... դե լավ, այն երկար անունով տղան:)",
    mood: "👨‍💼🗺️"
  },
  {
    speaker: "María",
    sp: "— Vive en Madrid, cerca del Museo del Prado. ¡Vamos a visitarlo mañana!",
    am: "(Նա ապրում է Մադրիդում, Պրադո թանգարանի մոտ: Վաղը գնանք նրան այցելության:)",
    mood: "👩✈️"
  }
];

const SERIAL_EXERCISES = [
  {
    question: "María mira una _____ a la izquierda de la radio.",
    options: ["foto", "mosca", "radio"],
    answer: "foto",
    hint: "Նկար"
  },
  {
    question: "El chico se llama Francisco _____.",
    options: ["Javier", "José", "Pablo"],
    answer: "Javier",
    hint: "Խավիեր"
  },
  {
    question: "Francisco fue el primer _____ de María en Armenia.",
    options: ["amigo", "hermano", "profesor"],
    answer: "amigo",
    hint: "Ընկեր"
  },
  {
    question: "Estábamos en un café en el _____ de Ereván.",
    options: ["centro", "lejos", "derecha"],
    answer: "centro",
    hint: "Կենտրոն"
  },
  {
    question: "Estábamos en the café a la una y _____.",
    options: ["media", "diez", "punto"],
    answer: "media",
    hint: "Կես"
  },
  {
    question: "Él estaba sentado _____ de mí.",
    options: ["enfrente", "detrás", "arriba"],
    answer: "enfrente",
    hint: "Դիմացը"
  },
  {
    question: "Este té tiene mucha _____.",
    options: ["energía", "agua", "frío"],
    answer: "energía",
    hint: "Էներգիա"
  },
  {
    question: "Todavía tengo la _____.",
    options: ["foto", "radio", "mosca"],
    answer: "foto",
    hint: "Լուսանկար"
  },
  {
    question: "Francisco vive ahora en _____.",
    options: ["Madrid", "Ereván", "Barcelona"],
    answer: "Madrid",
    hint: "Մադրիդ"
  },
  {
    question: "Vive cerca del _____ del Prado.",
    options: ["Museo", "Banco", "Teatro"],
    answer: "Museo",
    hint: "Թանգարան"
  }
];

const HOME_PRACTICE_EXERCISES = [
  {
    sp: "Francisco vive en Madrid.",
    am: "Ֆրանսիսկոն ապրում է Մադրիդում:",
    missing: "vive",
    options: ["vive", "come", "bebe"],
    hint: "Ապրում է"
  },
  {
    sp: "El té tiene mucha energía.",
    am: "Թեյը շատ էներգիա ունի:",
    missing: "energía",
    options: ["agua", "energía", "azúcar"],
    hint: "Էներգիա"
  },
  {
    sp: "Mirá esa foto a la izquierda.",
    am: "Նայիր այդ նկարին ձախ կողմում:",
    missing: "izquierda",
    options: ["derecha", "izquierda", "arriba"],
    hint: "Ձախ"
  },
  {
    sp: "Él estaba sentado enfrente de mí.",
    am: "Նա նստած էր իմ դիմաց:",
    missing: "enfrente",
    options: ["detrás", "enfrente", "lejos"],
    hint: "Դիմացը"
  },
  {
    sp: "Vamos a visitarlo mañana.",
    am: "Վաղը գնանք նրան այցելության:",
    missing: "mañana",
    options: ["hoy", "ayer", "mañana"],
    hint: "Վաղը"
  }
];

const ARTICLES_EXERCISES = [
  { noun: "chico", article: "un", options: ["un", "una", "unos", "unas"], am: "տղա" },
  { noun: "chica", article: "una", options: ["un", "una", "unos", "unas"], am: "աղջիկ" },
  { noun: "libros", article: "unos", options: ["un", "una", "unos", "unas"], am: "գրքեր" },
  { noun: "mesas", article: "unas", options: ["un", "una", "unos", "unas"], am: "սեղաններ" },
  { noun: "agua", article: "un", options: ["un", "una", "unos", "unas"], am: "ջուր (սկսվում է շեշտված 'a'-ով)" },
  { noun: "mapa", article: "un", options: ["un", "una", "unos", "unas"], am: "քարտեզ (բացառություն)" },
  { noun: "problema", article: "un", options: ["un", "una", "unos", "unas"], am: "խնդիր (բացառություն)" },
  { noun: "día", article: "un", options: ["un", "una", "unos", "unas"], am: "օր (բացառություն)" },
  { noun: "hacha", article: "un", options: ["un", "una", "unos", "unas"], am: "կացին (սկսվում է շեշտված 'ha'-ով)" },
  { noun: "idioma", article: "un", options: ["un", "una", "unos", "unas"], am: "լեզու (բացառություն)" }
];

const ARTICLES_THEORY = [
  {
    title: "Անորոշ հոդեր (Un, Una, Unos, Unas)",
    content: "Իսպաներենում անորոշ հոդերը ցույց են տալիս անհայտ կամ ընդհանուր առարկաներ:",
    rules: [
      { article: "Un", usage: "Արական սեռ, եզակի (un chico)", am: "Մի տղա" },
      { article: "Una", usage: "Իգական սեռ, եզակի (una chica)", am: "Մի աղջիկ" },
      { article: "Unos", usage: "Արական սեռ, հոգնակի (unos libros)", am: "Որոշ գրքեր" },
      { article: "Unas", usage: "Իգական սեռ, հոգնակի (unas mesas)", am: "Որոշ սեղաններ" }
    ]
  },
  {
    title: "⚠️ Հատուկ դեպքեր (Բացառություններ)",
    content: "Կան բառեր, որոնք ավարտվում են 'a'-ով, բայց արական են կամ օգտագործում են 'un' հոդը:",
    rules: [
      { article: "Un agua", usage: "Իգական բառեր, որոնք սկսվում են շեշտված 'a' կամ 'ha'-ով (un hacha, un alma):", am: "Ջուր, կացին, հոգի" },
      { article: "Un mapa", usage: "Հունական ծագման բառեր կամ բացառություններ (un día, un problema, un sistema, un idioma, un planeta):", am: "Քարտեզ, օր, խնդիր, համակարգ, լեզու, մոլորակ" }
    ]
  }
];

// --- Main Component ---

export default function MuseumDialogueApp() {
  const [view, setView] = useState<'intro' | 'serial' | 'serialExercise' | 'homePractice' | 'articlesTheory' | 'articlesGame' | 'result'>('intro');
  const [serialLevel, setSerialLevel] = useState(0);
  const [homeLevel, setHomeLevel] = useState(0);
  const [articlesLevel, setArticlesLevel] = useState(0);
  const [serialDialogueIndex, setSerialDialogueIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleSerialAnswer = (option: string) => {
    if (feedback) return;

    if (option === SERIAL_EXERCISES[serialLevel].answer) {
      setFeedback('correct');
      setPoints(prev => prev + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (serialLevel < SERIAL_EXERCISES.length - 1) {
        setSerialLevel(prev => prev + 1);
        setFeedback(null);
      } else {
        setFeedback(null);
        setView('result');
      }
    }, 1500);
  };

  const handleHomeAnswer = (option: string) => {
    if (feedback) return;

    if (option === HOME_PRACTICE_EXERCISES[homeLevel].missing) {
      setFeedback('correct');
      setPoints(prev => prev + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (homeLevel < HOME_PRACTICE_EXERCISES.length - 1) {
        setHomeLevel(prev => prev + 1);
        setFeedback(null);
      } else {
        setFeedback(null);
        setView('result');
      }
    }, 1500);
  };

  const handleArticlesAnswer = (option: string) => {
    if (feedback) return;

    if (option === ARTICLES_EXERCISES[articlesLevel].article) {
      setFeedback('correct');
      setPoints(prev => prev + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (articlesLevel < ARTICLES_EXERCISES.length - 1) {
        setArticlesLevel(prev => prev + 1);
        setFeedback(null);
      } else {
        setFeedback(null);
        setView('result');
      }
    }, 1500);
  };

  const reset = () => {
    setView('intro');
    setSerialLevel(0);
    setHomeLevel(0);
    setArticlesLevel(0);
    setSerialDialogueIndex(0);
    setPoints(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-indigo-950 font-sans text-slate-100 selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-indigo-900/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-b-4 border-purple-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Tv className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white uppercase">APRENDE ESPAÑOL</h1>
              <p className="text-xs font-bold text-purple-300 uppercase tracking-widest">Սերիալ. Հայկական թեյի գաղտնիքը</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-indigo-800/50 px-4 py-2 rounded-full border-2 border-purple-500/30">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-black text-white">{points}</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1 rounded-[40px] shadow-2xl">
                <div className="bg-indigo-900 rounded-[38px] p-8 md:p-12 text-center space-y-8">
                  <div className="flex justify-center gap-4">
                    <div className="w-24 h-24 bg-purple-800/50 rounded-full flex items-center justify-center text-5xl shadow-inner border-2 border-purple-500/30">🧔</div>
                    <div className="w-24 h-24 bg-pink-800/50 rounded-full flex items-center justify-center text-5xl shadow-inner border-2 border-pink-500/30">👩</div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                      ՀԱՅԿԱԿԱՆ ԹԵՅԻ <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 italic">ԳԱՂՏՆԻՔԸ</span>
                    </h2>
                    <p className="text-purple-200 font-medium max-w-md mx-auto text-lg">
                      Դիտիր սերիալը, սովորիր նոր բառեր և բացահայտիր գաղտնիքը:
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col gap-4">
                    <button 
                      onClick={() => setView('serial')}
                      className="group relative bg-white text-indigo-900 px-12 py-6 rounded-3xl font-black text-2xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-purple-500/20 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Tv className="w-8 h-8 relative z-10" /> 
                      <span className="relative z-10">ԴԻՏԵԼ ՍԵՐԻԱԼԸ</span>
                    </button>

                    <button 
                      onClick={() => setView('homePractice')}
                      className="group relative bg-indigo-800 text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl border-2 border-purple-500/30 overflow-hidden"
                    >
                      <Camera className="w-6 h-6" /> 
                      <span>ԽՈՐՀՐԴԱՎՈՐ ԼՈՒՍԱՆԿԱՐ</span>
                    </button>

                    <button 
                      onClick={() => setView('articlesTheory')}
                      className="group relative bg-gradient-to-r from-orange-600 to-pink-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl border-2 border-white/20 overflow-hidden"
                    >
                      <BookOpen className="w-6 h-6" /> 
                      <span>UN, UNA, UNOS, UNAS</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'serial' && (
            <motion.div 
              key="serial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-slate-800 rounded-[40px] p-4 md:p-8 shadow-2xl border-8 border-slate-700 relative">
                <div className="absolute top-4 right-8 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                <div className="bg-slate-900 rounded-[30px] p-6 md:p-10 min-h-[450px] flex flex-col justify-between border-4 border-slate-950 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="px-4 py-1 bg-purple-600 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-purple-900/50">
                        ՍԵՐԻԱԼ • ՄԱՍ 2
                      </div>
                      <h3 className="text-purple-400 font-bold italic text-lg">«Հայկական թեյի գաղտնիքը»</h3>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={serialDialogueIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="space-y-8"
                      >
                        <div className="flex items-start gap-6">
                          <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center text-5xl shadow-2xl border-2 border-slate-700 shrink-0">
                            {SERIAL_DIALOGUE[serialDialogueIndex].mood}
                          </div>
                          <div className="flex-1 space-y-4">
                            <p className="text-purple-400 font-black uppercase text-sm tracking-[0.2em] border-b border-purple-500/20 pb-2 inline-block">
                              {SERIAL_DIALOGUE[serialDialogueIndex].speaker}
                            </p>
                            <p className="text-white text-2xl md:text-3xl font-bold leading-snug">
                              {SERIAL_DIALOGUE[serialDialogueIndex].sp}
                            </p>
                            <p className="text-orange-400 text-lg italic bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                              {SERIAL_DIALOGUE[serialDialogueIndex].am}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10 flex justify-between items-center mt-12">
                    <button 
                      onClick={() => setView('intro')}
                      className="text-slate-500 font-black hover:text-white transition-colors flex items-center gap-2 uppercase text-xs tracking-widest"
                    >
                      <RotateCcw className="w-4 h-4" /> ԳԼԽԱՎՈՐ ՄԵՆՅՈՒ
                    </button>
                    
                    <div className="flex gap-4">
                      {serialDialogueIndex > 0 && (
                        <button 
                          onClick={() => setSerialDialogueIndex(prev => prev - 1)}
                          className="bg-slate-700 text-white p-5 rounded-2xl hover:bg-slate-600 transition-all border-b-4 border-slate-800 active:border-b-0 active:translate-y-1"
                        >
                          <ArrowLeft className="w-6 h-6" />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => {
                          if (serialDialogueIndex < SERIAL_DIALOGUE.length - 1) {
                            setSerialDialogueIndex(prev => prev + 1);
                          } else {
                            setView('serialExercise');
                          }
                        }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-purple-900/40 border-b-4 border-purple-800 active:border-b-0 active:translate-y-1"
                      >
                        {serialDialogueIndex < SERIAL_DIALOGUE.length - 1 ? 'ՀԱՋՈՐԴԸ' : 'ԱՆՑՆԵԼ ՎԱՐԺՈՒԹՅԱՆԸ'} <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-12">
                  <div className="w-14 h-14 rounded-full bg-slate-700 border-4 border-slate-600 shadow-inner flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-slate-800" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-slate-700 border-4 border-slate-600 shadow-inner flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-slate-800" />
                  </div>
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="w-24 h-2 bg-slate-700 rounded-full" />
                    <div className="w-24 h-2 bg-slate-700 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'serialExercise' && (
            <motion.div 
              key="serialExercise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div className="bg-indigo-900 rounded-[40px] p-8 md:p-12 shadow-2xl border-b-8 border-purple-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-indigo-950">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((serialLevel + 1) / SERIAL_EXERCISES.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>

                <div className="flex flex-col items-center gap-12 pt-6">
                  <div className="text-center space-y-6">
                    <div className="inline-block px-6 py-2 bg-purple-500/20 rounded-full text-xs font-black text-purple-300 uppercase tracking-[0.3em] border border-purple-500/30">
                      ՎԱՐԺՈՒԹՅՈՒՆ • {serialLevel + 1} / {SERIAL_EXERCISES.length}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                      {SERIAL_EXERCISES[serialLevel].question}
                    </h2>
                    <p className="text-purple-300 font-bold italic text-xl">({SERIAL_EXERCISES[serialLevel].hint})</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {SERIAL_EXERCISES[serialLevel].options.map((opt) => (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSerialAnswer(opt)}
                        className={`p-8 rounded-3xl font-black text-2xl transition-all border-4 ${
                          feedback === 'correct' && opt === SERIAL_EXERCISES[serialLevel].answer
                            ? 'bg-green-500 border-green-400 text-white shadow-2xl shadow-green-500/40'
                            : feedback === 'wrong' && opt === opt
                              ? 'bg-red-500/20 border-red-500/50 text-red-400'
                              : 'bg-indigo-800/50 border-purple-500/30 text-white hover:border-purple-400 hover:bg-indigo-800 shadow-lg'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>

                  <div className="h-16 flex items-center justify-center">
                    {feedback === 'correct' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        className="flex items-center gap-3 text-green-400 font-black uppercase italic text-2xl"
                      >
                        <CheckCircle2 className="w-8 h-8" /> ՃԻՇՏ Է! +1 ✨
                      </motion.div>
                    )}
                    {feedback === 'wrong' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        className="flex items-center gap-3 text-red-400 font-black uppercase italic text-2xl"
                      >
                        <AlertTriangle className="w-8 h-8" /> ՍԽԱԼ Է! 🧐
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'homePractice' && (
            <motion.div 
              key="homePractice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div className="bg-indigo-900 rounded-[40px] p-8 md:p-12 shadow-2xl border-b-8 border-orange-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-indigo-950">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((homeLevel + 1) / HOME_PRACTICE_EXERCISES.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                  />
                </div>

                <div className="flex flex-col items-center gap-12 pt-6">
                  <div className="text-center space-y-6">
                    <div className="inline-block px-6 py-2 bg-orange-500/20 rounded-full text-xs font-black text-orange-300 uppercase tracking-[0.3em] border border-orange-500/30">
                      ԽՈՐՀՐԴԱՎՈՐ ԼՈՒՍԱՆԿԱՐ • {homeLevel + 1} / {HOME_PRACTICE_EXERCISES.length}
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                        {HOME_PRACTICE_EXERCISES[homeLevel].sp.split(HOME_PRACTICE_EXERCISES[homeLevel].missing).map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="text-orange-400 border-b-4 border-orange-500 px-2 min-w-[80px] inline-block">_____</span>}
                          </React.Fragment>
                        ))}
                      </h2>
                      <p className="text-orange-400 font-bold italic text-xl">
                        {HOME_PRACTICE_EXERCISES[homeLevel].am}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {HOME_PRACTICE_EXERCISES[homeLevel].options.map((opt) => (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleHomeAnswer(opt)}
                        className={`p-8 rounded-3xl font-black text-2xl transition-all border-4 ${
                          feedback === 'correct' && opt === HOME_PRACTICE_EXERCISES[homeLevel].missing
                            ? 'bg-green-500 border-green-400 text-white shadow-2xl shadow-green-500/40'
                            : feedback === 'wrong' && opt === opt
                              ? 'bg-red-500/20 border-red-500/50 text-red-400'
                              : 'bg-indigo-800/50 border-orange-500/30 text-white hover:border-orange-400 hover:bg-indigo-800 shadow-lg'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>

                  <div className="h-16 flex items-center justify-center">
                    {feedback === 'correct' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        className="flex items-center gap-3 text-green-400 font-black uppercase italic text-2xl"
                      >
                        <CheckCircle2 className="w-8 h-8" /> ՃԻՇՏ Է! ✨
                      </motion.div>
                    )}
                    {feedback === 'wrong' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        className="flex items-center gap-3 text-red-400 font-black uppercase italic text-2xl"
                      >
                        <AlertTriangle className="w-8 h-8" /> ՍԽԱԼ Է! 🧐
                      </motion.div>
                    )}
                  </div>

                  <button 
                    onClick={() => setView('intro')}
                    className="text-slate-500 font-black hover:text-white transition-colors flex items-center gap-2 uppercase text-xs tracking-widest"
                  >
                    <RotateCcw className="w-4 h-4" /> ՉԵՂԱՐԿԵԼ
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'articlesTheory' && (
            <motion.div 
              key="articlesTheory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-indigo-900 rounded-[40px] p-8 md:p-12 shadow-2xl border-b-8 border-pink-500 relative overflow-hidden">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                      Իսպաներենի <span className="text-pink-400">Հոդերը</span>
                    </h2>
                    <p className="text-purple-300 font-bold mt-2">Un, Una, Unos, Unas</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ARTICLES_THEORY.map((section, idx) => (
                      <div key={idx} className="bg-indigo-800/50 p-6 rounded-3xl border-2 border-purple-500/20 space-y-4">
                        <h3 className="text-xl font-black text-pink-400 uppercase">{section.title}</h3>
                        <p className="text-sm text-purple-200 leading-relaxed">{section.content}</p>
                        <div className="space-y-2">
                          {section.rules.map((rule, rIdx) => (
                            <div key={rIdx} className="flex flex-col bg-indigo-950/50 p-3 rounded-2xl border border-white/5">
                              <span className="text-white font-black text-lg">{rule.article}</span>
                              <span className="text-purple-300 text-xs">{rule.usage}</span>
                              <span className="text-orange-400 text-xs italic mt-1">{rule.am}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-4">
                    <button 
                      onClick={() => setView('articlesGame')}
                      className="bg-white text-indigo-900 px-12 py-6 rounded-3xl font-black text-2xl hover:scale-105 transition-all flex items-center gap-4 shadow-2xl"
                    >
                      <ArrowRight className="w-8 h-8" /> ՍԿՍԵԼ ԽԱՂԸ
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'articlesGame' && (
            <motion.div 
              key="articlesGame"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div className="bg-indigo-900 rounded-[40px] p-8 md:p-12 shadow-2xl border-b-8 border-pink-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-indigo-950">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((articlesLevel + 1) / ARTICLES_EXERCISES.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>

                <div className="flex flex-col items-center gap-12 pt-6">
                  <div className="text-center space-y-6">
                    <div className="inline-block px-6 py-2 bg-pink-500/20 rounded-full text-xs font-black text-pink-300 uppercase tracking-[0.3em] border border-pink-500/30">
                      ՀՈԴԵՐԻ ԽԱՂ • {articlesLevel + 1} / {ARTICLES_EXERCISES.length}
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight flex items-center justify-center gap-4">
                        <span className="text-pink-500 border-b-8 border-pink-600 px-4 min-w-[150px] inline-block">_____</span>
                        <span>{ARTICLES_EXERCISES[articlesLevel].noun}</span>
                      </h2>
                      <p className="text-orange-400 font-bold italic text-2xl">
                        {ARTICLES_EXERCISES[articlesLevel].am}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {ARTICLES_EXERCISES[articlesLevel].options.map((opt) => (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleArticlesAnswer(opt)}
                        className={`p-6 rounded-3xl font-black text-2xl transition-all border-4 ${
                          feedback === 'correct' && opt === ARTICLES_EXERCISES[articlesLevel].article
                            ? 'bg-green-500 border-green-400 text-white shadow-2xl shadow-green-500/40'
                            : feedback === 'wrong' && opt === opt
                              ? 'bg-red-500/20 border-red-500/50 text-red-400'
                              : 'bg-indigo-800/50 border-pink-500/30 text-white hover:border-pink-400 hover:bg-indigo-800 shadow-lg'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>

                  <div className="h-16 flex items-center justify-center">
                    {feedback === 'correct' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        className="flex items-center gap-3 text-green-400 font-black uppercase italic text-2xl"
                      >
                        <CheckCircle2 className="w-8 h-8" /> ՃԻՇՏ Է! ✨
                      </motion.div>
                    )}
                    {feedback === 'wrong' && (
                      <motion.div 
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1.2, rotate: 0 }}
                        className="flex items-center gap-3 text-red-400 font-black uppercase italic text-2xl"
                      >
                        <AlertTriangle className="w-8 h-8" /> ՍԽԱԼ Է! 🧐
                      </motion.div>
                    )}
                  </div>

                  <button 
                    onClick={() => setView('intro')}
                    className="text-slate-500 font-black hover:text-white transition-colors flex items-center gap-2 uppercase text-xs tracking-widest"
                  >
                    <RotateCcw className="w-4 h-4" /> ՉԵՂԱՐԿԵԼ
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[50px] p-12 text-center shadow-2xl border-4 border-purple-500/30"
            >
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]" />
              <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">ԳԵՐԱԶԱՆՑ Է!</h2>
              <p className="text-2xl text-purple-200 mb-12 font-medium">Դու հավաքեցիր <span className="text-white font-black text-4xl">{points}</span> միավոր</p>
              
              <button 
                onClick={reset}
                className="bg-white text-indigo-900 px-12 py-6 rounded-3xl font-black text-2xl hover:scale-110 transition-all shadow-2xl shadow-white/10 flex items-center gap-4 mx-auto"
              >
                <RotateCcw className="w-8 h-8" /> ՆՈՐԻՑ ՍԿՍԵԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
