import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Navigation,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface Word {
  id: string;
  text: string;
  originalIndex: number;
}

interface Lesson {
  id: number;
  targetSentence: string[];
  translationAm: string;
  grammarRule: string;
  grammarRuleAm: string;
}

// --- Data ---
const LESSONS: Lesson[] = [
  {
    id: 1,
    targetSentence: ['Gira', 'a', 'la', 'izquierda'],
    translationAm: 'Թեքվիր ձախ',
    grammarRule: 'Usa "Gira" (del verbo Girar) para dar una orden.',
    grammarRuleAm: 'Օգտագործեք «Gira» (Girar բայից) հրաման տալու համար:'
  },
  {
    id: 2,
    targetSentence: ['Sigue', 'todo', 'recto'],
    translationAm: 'Գնա ուղիղ',
    grammarRule: ' "Sigue" viene del verbo Seguir (e -> i).',
    grammarRuleAm: '«Sigue»-ն գալիս է Seguir բայից (e -> i փոփոխությամբ):'
  },
  {
    id: 3,
    targetSentence: ['El', 'museo', 'está', 'a', 'la', 'derecha'],
    translationAm: 'Թանգարանը գտնվում է աջ կողմում',
    grammarRule: 'Usa el verbo "estar" para indicar ubicación.',
    grammarRuleAm: 'Օգտագործեք «estar» բայը գտնվելու վայրը նշելու համար:'
  },
  {
    id: 4,
    targetSentence: ['Cruza', 'la', 'calle'],
    translationAm: 'Անցիր փողոցը',
    grammarRule: 'El imperativo de "Cruzar" es "Cruza".',
    grammarRuleAm: '«Cruzar» բայի հրամայական ձևն է «Cruza»:'
  }
];

// --- Helper ---
const shuffle = (array: string[]) => {
  const newArr = array.map((text, index) => ({ id: `${text}-${index}-${Math.random()}`, text, originalIndex: index }));
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function GrammarApp() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [availableWords, setAvailableWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

  const currentLesson = LESSONS[currentLessonIndex];

  // Initialize lesson
  useEffect(() => {
    setAvailableWords(shuffle(currentLesson.targetSentence));
    setSelectedWords([]);
    setUsedIds(new Set());
    setIsCorrect(null);
  }, [currentLessonIndex]);

  const handleWordClick = (word: Word) => {
    if (usedIds.has(word.id)) return;

    setSelectedWords([...selectedWords, word]);
    setUsedIds(new Set(usedIds).add(word.id));
  };

  const handleRemoveWord = (word: Word) => {
    setSelectedWords(selectedWords.filter(w => w.id !== word.id));
    const newUsed = new Set(usedIds);
    newUsed.delete(word.id);
    setUsedIds(newUsed);
    setIsCorrect(null);
  };

  const checkResult = () => {
    if (selectedWords.length !== currentLesson.targetSentence.length) {
      setIsCorrect(false);
      return;
    }
    const result = selectedWords.map(w => w.text.trim()).join(' ');
    const target = currentLesson.targetSentence.join(' ');
    setIsCorrect(result === target);
  };

  const nextLesson = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      setCurrentLessonIndex(0); // Loop back
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-slate-800 font-sans p-4 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            Գրամատիկայի Դասընթաց (A0)
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            ԿԱԶՄԻՐ <span className="text-orange-500">ՆԱԽԱԴԱՍՈՒԹՅՈՒՆ</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Թարգմանիր. <span className="text-orange-600 font-bold">"{currentLesson.translationAm}"</span>
          </p>
        </header>

        {/* Result Area */}
        <div className="min-h-[120px] p-8 bg-white/60 rounded-[2.5rem] border-2 border-dashed border-orange-200 flex flex-wrap gap-3 items-center justify-center shadow-inner">
          <AnimatePresence>
            {selectedWords.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-slate-400 italic"
              >
                Ընտրիր բառերը ստորև...
              </motion.p>
            )}
            {selectedWords.map((word) => (
              <motion.button
                key={word.id}
                layoutId={word.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => handleRemoveWord(word)}
                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors"
              >
                {word.text}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Word Bank */}
        <div className="p-8 bg-white/40 rounded-[2.5rem] border border-orange-100">
          <div className="flex flex-wrap gap-4 justify-center">
            {availableWords.map((word) => {
              const isUsed = usedIds.has(word.id);
              return (
                <div key={word.id} className="relative">
                  {/* The Gray Placeholder Block */}
                  <div 
                    className={`px-6 py-3 rounded-2xl bg-slate-200/50 border border-slate-200 transition-opacity duration-300 ${isUsed ? 'opacity-100' : 'opacity-0'}`}
                    style={{ visibility: isUsed ? 'visible' : 'hidden' }}
                  >
                    <span className="invisible">{word.text}</span>
                  </div>
                  
                  {/* The Actual Word Button */}
                  {!isUsed && (
                    <motion.button
                      layoutId={word.id}
                      onClick={() => handleWordClick(word)}
                      className="absolute inset-0 px-6 py-3 bg-white border border-orange-200 text-slate-800 font-bold rounded-2xl shadow-sm hover:shadow-md hover:border-orange-400 transition-all active:scale-95"
                    >
                      {word.text}
                    </motion.button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setSelectedWords([]);
              setUsedIds(new Set());
              setIsCorrect(null);
            }}
            className="p-4 bg-white border border-orange-200 rounded-2xl text-orange-500 hover:bg-orange-50 transition-colors"
            title="Reset"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          
          <button
            onClick={checkResult}
            disabled={selectedWords.length === 0}
            className="px-12 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ՍՏՈՒԳԵԼ
          </button>
        </div>

        {/* Feedback & Grammar */}
        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-8 rounded-[2.5rem] border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-start gap-4">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
                )}
                <div className="space-y-4 w-full">
                  <div>
                    <h3 className={`text-xl font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isCorrect ? 'Ճիշտ է!' : 'Փորձիր նորից'}
                    </h3>
                    <p className="text-slate-600">
                      {isCorrect 
                        ? 'Դուք հիանալի կերպով կազմեցիք նախադասությունը:' 
                        : 'Բառերի հերթականությունը սխալ է: Ուշադրություն դարձրեք գրամատիկային:'}
                    </p>
                  </div>

                  {/* Grammar Rule Box */}
                  <div className="bg-white/80 p-6 rounded-2xl border border-orange-100 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest">
                      <Lightbulb className="w-4 h-4" />
                      Գրամատիկական Կանոն
                    </div>
                    <p className="font-medium text-slate-800">{currentLesson.grammarRuleAm}</p>
                    <p className="text-sm text-slate-500 italic">{currentLesson.grammarRule}</p>
                  </div>

                  {isCorrect && (
                    <button
                      onClick={nextLesson}
                      className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                      ՀԱՋՈՐԴԸ <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <footer className="text-center text-slate-400 text-xs font-mono uppercase tracking-[0.2em] pt-8 pb-12">
          <p>Spanish Grammar Builder • Level A0 • Directions</p>
        </footer>
      </div>
    </div>
  );
}
