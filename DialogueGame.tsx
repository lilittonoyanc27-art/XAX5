import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  User, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  ChevronRight,
  Navigation,
  ArrowRight,
  Volume2
} from 'lucide-react';

// --- Types ---
interface DialogueStep {
  id: number;
  speaker: 'A' | 'B';
  speakerName: string;
  textBefore: string;
  missingPart: string;
  textAfter: string;
  translationAm: string;
}

// --- Data ---
const DIALOGUE: DialogueStep[] = [
  {
    id: 1,
    speaker: 'A',
    speakerName: 'Զբոսաշրջիկ',
    textBefore: '¡Perdón! ¿Sabes dónde está el ',
    missingPart: 'museo',
    textAfter: '?',
    translationAm: 'Ներեցեք, գիտե՞ք որտեղ է թանգարանը:'
  },
  {
    id: 2,
    speaker: 'B',
    speakerName: 'Անցորդ',
    textBefore: 'Sí, claro. No está ',
    missingPart: 'lejos',
    textAfter: '.',
    translationAm: 'Այո, իհարկե: Հեռու չէ:'
  },
  {
    id: 3,
    speaker: 'A',
    speakerName: 'Զբոսաշրջիկ',
    textBefore: '¿Cómo ',
    missingPart: 'llego',
    textAfter: '?',
    translationAm: 'Ինչպե՞ս հասնեմ:'
  },
  {
    id: 4,
    speaker: 'B',
    speakerName: 'Անցորդ',
    textBefore: 'Mira, sigue ',
    missingPart: 'todo recto',
    textAfter: ' por esta calle hasta el semáforo.',
    translationAm: 'Նայիր, շարունակիր ամբողջն ուղիղ այս փողոցով մինչև լուսացույցը:'
  },
  {
    id: 5,
    speaker: 'B',
    speakerName: 'Անցորդ',
    textBefore: 'En el semáforo, gira a la ',
    missingPart: 'derecha',
    textAfter: '.',
    translationAm: 'Լուսացույցի մոտ թեքվիր աջ:'
  },
  {
    id: 6,
    speaker: 'B',
    speakerName: 'Անցորդ',
    textBefore: 'Camina un poco más y verás un banco a la ',
    missingPart: 'izquierda',
    textAfter: '.',
    translationAm: 'Քայլիր մի փոքր և ձախ կողմում կտեսնես բանկը:'
  },
  {
    id: 7,
    speaker: 'A',
    speakerName: 'Զբոսաշրջիկ',
    textBefore: '¿El museo está ',
    missingPart: 'cerca',
    textAfter: ' del banco?',
    translationAm: 'Թանգարանը բանկի մո՞տ է:'
  },
  {
    id: 8,
    speaker: 'B',
    speakerName: 'Անցորդ',
    textBefore: 'Sí, el museo está justo en frente del banco, en el ',
    missingPart: 'centro',
    textAfter: ' de la plaza.',
    translationAm: 'Այո, թանգարանը հենց բանկի դիմացն է, հրապարակի կենտրոնում:'
  },
  {
    id: 9,
    speaker: 'A',
    speakerName: 'Զբոսաշրջիկ',
    textBefore: '¡Muchas ',
    missingPart: 'gracias',
    textAfter: '!',
    translationAm: 'Շատ շնորհակալություն:'
  },
  {
    id: 10,
    speaker: 'B',
    speakerName: 'Անցորդ',
    textBefore: '¡De nada! ¡Hasta ',
    missingPart: 'luego',
    textAfter: '!',
    translationAm: 'Խնդրեմ: Առայժմ:'
  }
];

const OPTIONS = [
  'museo', 'lejos', 'llego', 'todo recto', 'derecha', 'izquierda', 'cerca', 'centro', 'gracias', 'luego'
];

export default function DialogueGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const step = DIALOGUE[currentStep];

  const handleOptionClick = (option: string) => {
    if (isCorrect) return;
    
    setSelectedOption(option);
    if (option === step.missingPart) {
      setIsCorrect(true);
      setTimeout(() => {
        setCompletedSteps([...completedSteps, step.id]);
        if (currentStep < DIALOGUE.length - 1) {
          setCurrentStep(currentStep + 1);
          setIsCorrect(null);
          setSelectedOption(null);
        } else {
          setGameFinished(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
      setTimeout(() => setIsCorrect(null), 1000);
    }
  };

  const resetGame = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setSelectedOption(null);
    setIsCorrect(null);
    setGameFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-slate-800 font-sans p-4 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4" />
            Ինտերակտիվ Երկխոսություն
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            ԻՆՉՊԵ՞Ս ՀԱՍՆԵԼ <span className="text-orange-500">ԹԱՆԳԱՐԱՆ</span>
          </h1>
          <p className="text-slate-600 font-medium italic">Լրացրեք երկխոսության բաց թողնված մասերը:</p>
        </header>

        {/* Dialogue Display */}
        <div className="glass-card p-6 md:p-10 rounded-[3rem] space-y-6 min-h-[400px] flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {DIALOGUE.slice(0, currentStep + 1).map((s, idx) => {
              const isCurrent = idx === currentStep && !gameFinished;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: s.speaker === 'A' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-4 ${s.speaker === 'B' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${s.speaker === 'A' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-white'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className={`max-w-[80%] space-y-1 ${s.speaker === 'B' ? 'text-right' : ''}`}>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{s.speakerName}</div>
                    <div className={`p-4 rounded-2xl text-lg font-medium shadow-sm border ${s.speaker === 'A' ? 'bg-white border-orange-100 rounded-tl-none' : 'bg-slate-100 border-slate-200 rounded-tr-none'}`}>
                      {s.textBefore}
                      <span className={`px-2 py-0.5 rounded-lg border-b-2 transition-all ${isCurrent ? 'bg-orange-50 border-orange-300 text-transparent' : 'bg-orange-100 border-orange-500 text-orange-700'}`}>
                        {isCurrent ? '........' : s.missingPart}
                      </span>
                      {s.textAfter}
                    </div>
                    <div className="text-xs text-slate-400 italic px-2">{s.translationAm}</div>
                  </div>
                </motion.div>
              );
            })}

            {gameFinished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-emerald-50 border-2 border-emerald-200 rounded-[2rem] text-center space-y-4"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-bold text-emerald-800">Հիանալի է!</h3>
                <p className="text-emerald-600">Դուք ամբողջությամբ լրացրեցիք երկխոսությունը:</p>
                <button onClick={resetGame} className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all">ԽԱՂԱԼ ՆՈՐԻՑ</button>
              </motion.div>
            )}
          </div>

          {/* Options Area */}
          {!gameFinished && (
            <div className="pt-8 border-t border-orange-100">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-orange-600/40 uppercase tracking-widest">
                <Navigation className="w-3 h-3" />
                Ընտրեք ճիշտ տարբերակը
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    disabled={isCorrect === true}
                    className={`
                      px-4 py-3 rounded-xl font-bold text-sm transition-all border-2
                      ${selectedOption === opt 
                        ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700')
                        : 'bg-white border-orange-50 hover:border-orange-300 hover:shadow-md'}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-orange-100 flex justify-between items-center text-orange-600/30 text-xs font-mono uppercase tracking-widest pb-12">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Dialogue Builder: Museo</span>
          </div>
          <button onClick={resetGame} className="hover:text-orange-500 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </footer>
      </div>
    </div>
  );
}
