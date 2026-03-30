import React, { useState } from 'react';
import { 
  Book, 
  Info, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  GraduationCap,
  Sparkles,
  Layers,
  FileText,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Theory Data ---

const THEORY_SECTIONS = [
  {
    id: 'gender',
    title: 'Գոյականի Սեռը (Género)',
    icon: <Layers className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-600 leading-relaxed">
          Իսպաներենում բոլոր գոյականները ունեն սեռ՝ <b>արական (Masculino)</b> կամ <b>իգական (Femenino)</b>:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h4 className="text-blue-700 font-black mb-4 uppercase tracking-wider">Արական (Masculino)</h4>
            <p className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest">Հիմնական վերջավորություններ՝</p>
            <ul className="space-y-2 text-blue-900 font-medium">
              <li>• <b>-o</b> (el libro, el niño)</li>
              <li>• <b>-or</b> (el profesor, el amor)</li>
              <li>• <b>-aje</b> (el viaje, el paisaje)</li>
              <li>• <b>-ma</b> (el tema, el sistema*)</li>
            </ul>
          </div>
          
          <div className="bg-pink-50 p-6 rounded-3xl border border-pink-100">
            <h4 className="text-pink-700 font-black mb-4 uppercase tracking-wider">Իգական (Femenino)</h4>
            <p className="text-xs font-bold text-pink-400 mb-2 uppercase tracking-widest">Հիմնական վերջավորություններ՝</p>
            <ul className="space-y-2 text-pink-900 font-medium">
              <li>• <b>-a</b> (la mesa, la casa)</li>
              <li>• <b>-ción / -sión</b> (la canción, la pasión)</li>
              <li>• <b>-dad / -tad</b> (la ciudad, la libertad)</li>
              <li>• <b>-tud / -umbre</b> (la actitud, la costumbre)</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <h4 className="text-indigo-700 font-black uppercase tracking-wider">Ընդհանուր սեռ (-ista, -ante)</h4>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Այս վերջավորություններով բառերը չեն փոխվում: Սեռը որոշվում է միայն <b>հոդով</b>.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-2xl border border-indigo-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">-ista</p>
              <p className="text-sm font-bold">el / la dentista</p>
              <p className="text-sm font-bold">el / la artista</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-indigo-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">-ante</p>
              <p className="text-sm font-bold">el / la estudiante</p>
              <p className="text-sm font-bold">el / la cantante</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'definite',
    title: 'Որոշյալ Հոդեր (Artículos Definidos)',
    icon: <CheckCircle className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-600 leading-relaxed">
          Օգտագործվում են, երբ խոսում ենք կոնկրետ, հայտնի առարկայի մասին:
        </p>

        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 font-black uppercase text-xs text-slate-500">Թիվ / Սեռ</th>
                <th className="p-4 font-black uppercase text-xs text-blue-600">Արական</th>
                <th className="p-4 font-black uppercase text-xs text-pink-600">Իգական</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-bold text-slate-400">Եզակի</td>
                <td className="p-4 text-2xl font-black text-blue-500">EL</td>
                <td className="p-4 text-2xl font-black text-pink-500">LA</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-bold text-slate-400">Հոգնակի</td>
                <td className="p-4 text-2xl font-black text-blue-500">LOS</td>
                <td className="p-4 text-2xl font-black text-pink-500">LAS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <p className="font-bold text-slate-800">Օրինակներ՝</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-medium"><b>el</b> libro</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-medium"><b>la</b> casa</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-medium"><b>los</b> coches</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-medium"><b>las</b> flores</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'indefinite',
    title: 'Անորոշ Հոդեր (Artículos Indefinidos)',
    icon: <Sparkles className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-600 leading-relaxed">
          Օգտագործվում են, երբ խոսում ենք անհայտ կամ ցանկացած առարկայի մասին:
        </p>

        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 font-black uppercase text-xs text-slate-500">Թիվ / Սեռ</th>
                <th className="p-4 font-black uppercase text-xs text-blue-600">Արական</th>
                <th className="p-4 font-black uppercase text-xs text-pink-600">Իգական</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-bold text-slate-400">Եզակի</td>
                <td className="p-4 text-2xl font-black text-blue-500">UN</td>
                <td className="p-4 text-2xl font-black text-pink-500">UNA</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-bold text-slate-400">Հոգնակի</td>
                <td className="p-4 text-2xl font-black text-blue-500">UNOS</td>
                <td className="p-4 text-2xl font-black text-pink-500">UNAS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <p className="font-bold text-slate-800">Օրինակներ՝</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-medium"><b>un</b> libro (մի գիրք)</span>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-medium"><b>una</b> mesa (մի սեղան)</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'exceptions',
    title: 'Բացառություններ (Excepciones)',
    icon: <AlertCircle className="w-6 h-6" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          Որոշ բառեր չեն հետևում ընդհանուր կանոնին: Սրանք պետք է անգիր հիշել.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-50 p-6 rounded-[32px] border border-red-100 space-y-4">
            <h4 className="text-red-700 font-black uppercase text-xs tracking-widest">Արական (բայց վերջանում են -a)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-red-600">EL MAPA</span>
                <span className="text-slate-400 text-sm">քարտեզ</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-red-600">EL DÍA</span>
                <span className="text-slate-400 text-sm">օր</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-red-600">EL SOFÁ</span>
                <span className="text-slate-400 text-sm">բազմոց</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-red-600">EL PLANETA</span>
                <span className="text-slate-400 text-sm">մոլորակ</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-red-600">EL SISTEMA</span>
                <span className="text-slate-400 text-sm">համակարգ</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-red-600">EL PROBLEMA</span>
                <span className="text-slate-400 text-sm">խնդիր</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100 space-y-4">
            <h4 className="text-indigo-700 font-black uppercase text-xs tracking-widest">Իգական (բայց վերջանում են -o)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-indigo-600">LA MANO</span>
                <span className="text-slate-400 text-sm">ձեռք</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-indigo-600">LA FOTO</span>
                <span className="text-slate-400 text-sm">լուսանկար</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-indigo-600">LA RADIO</span>
                <span className="text-slate-400 text-sm">ռադիո</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm">
                <span className="font-black text-indigo-600">LA MOTO</span>
                <span className="text-slate-400 text-sm">մոտոցիկլետ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

// --- Components ---

export default function TheoryApp() {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx(prev => (prev + 1) % THEORY_SECTIONS.length);
  const prev = () => setActiveIdx(prev => (prev - 1 + THEORY_SECTIONS.length) % THEORY_SECTIONS.length);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 rotate-3">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-slate-800">Իսպաներենի Տեսություն</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">Grammar Rules & Theory</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <Book className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {activeIdx + 1} / {THEORY_SECTIONS.length}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          
          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {THEORY_SECTIONS.map((section, i) => (
              <button
                key={section.id}
                onClick={() => setActiveIdx(i)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                  activeIdx === i 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-100 -translate-y-1' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-400'
                }`}
              >
                {section.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Theory Card */}
          <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border-b-8 border-slate-200 relative overflow-hidden flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 h-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                    {THEORY_SECTIONS[activeIdx].icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-800 uppercase italic">
                    {THEORY_SECTIONS[activeIdx].title}
                  </h2>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                <div className="content-area">
                  {THEORY_SECTIONS[activeIdx].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={prev}
              className="p-6 bg-white rounded-full shadow-xl text-indigo-600 hover:scale-110 transition-transform border border-slate-100"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex-1 flex justify-center gap-2">
              {THEORY_SECTIONS.map((_, i) => (
                <div 
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeIdx === i ? 'w-12 bg-indigo-600' : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-6 bg-indigo-600 rounded-full shadow-xl text-white hover:scale-110 transition-transform shadow-indigo-200"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-8 text-center border-t border-slate-200">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Spanish Theory Guide • Armenian Edition
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
