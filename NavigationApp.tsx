import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  Target, 
  MapPin, 
  Navigation, 
  Compass, 
  Zap, 
  LayoutGrid, 
  ChevronRight,
  Globe,
  BookOpen
} from 'lucide-react';

// --- Types ---
interface DirectionItem {
  id: string;
  spanish: string;
  armenian: string;
  icon: React.ReactNode;
  example: string;
  exampleAm: string;
  color: string;
}

// --- Data ---
const DIRECTIONS: DirectionItem[] = [
  {
    id: 'left',
    spanish: 'A la izquierda',
    armenian: 'Ձախ',
    icon: <ArrowLeft className="w-8 h-8" />,
    example: 'Gira a la izquierda en el semáforo.',
    exampleAm: 'Թեքվիր ձախ լուսացույցի մոտ:',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 'right',
    spanish: 'A la derecha',
    armenian: 'Աջ',
    icon: <ArrowRight className="w-8 h-8" />,
    example: 'El museo está a la derecha de la plaza.',
    exampleAm: 'Թանգարանը գտնվում է հրապարակից աջ:',
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 'straight',
    spanish: 'Todo recto',
    armenian: 'Ուղիղ',
    icon: <ArrowUp className="w-8 h-8" />,
    example: 'Sigue todo recto por esta calle.',
    exampleAm: 'Գնա ուղիղ այս փողոցով:',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'center',
    spanish: 'En el centro',
    armenian: 'Կենտրոնում',
    icon: <Target className="w-8 h-8" />,
    example: 'La fuente está en el centro del parque.',
    exampleAm: 'Շատրվանը գտնվում է այգու կենտրոնում:',
    color: 'from-yellow-400 to-orange-500'
  }
];

const EXTRA_VOCAB = [
  { sp: 'Girar', am: 'Թեքվել' },
  { sp: 'Seguir', am: 'Շարունակել' },
  { sp: 'Cruzar', am: 'Անցնել' },
  { sp: 'La esquina', am: 'Անկյուն' },
  { sp: 'El semáforo', am: 'Լուսացույց' },
  { sp: 'La calle', am: 'Փողոց' }
];

// --- Components ---

const NavCard = ({ item, isActive, onClick }: { item: DirectionItem, isActive: boolean, onClick: () => void, key?: any }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      relative overflow-hidden p-6 rounded-[2rem] text-left transition-all duration-500
      ${isActive 
        ? 'bg-white shadow-[0_20px_40px_rgba(255,140,0,0.15)] border-2 border-orange-200' 
        : 'bg-white/40 border border-orange-100 hover:bg-white/60'}
    `}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 blur-3xl`} />
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} w-fit shadow-lg mb-6 text-white`}>
        {item.icon}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-1 text-slate-800">{item.spanish}</h3>
        <div className="text-sm font-mono text-orange-600/60 uppercase tracking-widest font-semibold">
          {item.armenian}
        </div>
      </div>
    </div>
  </motion.button>
);

const DetailView = ({ item }: { item: DirectionItem, key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-8 md:p-12 rounded-[3rem] relative overflow-hidden"
  >
    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${item.color} opacity-10 blur-[100px]`} />
    
    <div className="relative z-10 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-orange-600/40 font-mono text-sm uppercase tracking-[0.3em]">
            <Navigation className="w-4 h-4" />
            <span>Ուղղությունների Ուղեցույց</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter orange-gradient-text">{item.spanish}</h2>
        </div>
        <div className={`p-6 rounded-[2rem] bg-gradient-to-br ${item.color} shadow-xl text-white`}>
          {React.cloneElement(item.icon as React.ReactElement, { className: "w-12 h-12" })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white/60 rounded-[2.5rem] border border-orange-100 flex flex-col justify-center">
          <p className="text-orange-600/40 text-xs font-mono uppercase tracking-widest mb-2">Հայերեն</p>
          <p className="text-4xl font-bold text-slate-800">{item.armenian}</p>
        </div>

        <div className="p-8 bg-white/60 rounded-[2.5rem] border border-orange-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-orange-500 mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest">Օգտագործման օրինակ</span>
          </div>
          <p className="text-2xl font-medium italic leading-relaxed mb-4 text-slate-700">"{item.example}"</p>
          <p className="text-orange-600/60 text-lg font-medium">{item.exampleAm}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function NavigationApp() {
  const [activeId, setActiveId] = useState('left');
  const activeItem = DIRECTIONS.find(d => d.id === activeId)!;

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-slate-800 font-sans p-6 md:p-12 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-300/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-300/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-orange-100">
                <Compass className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-xs font-mono text-orange-600/40 uppercase tracking-[0.4em]">Իսպաներենի Դասընթաց</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              ՈՒՂՂՈՒԹՅՈՒՆՆԵՐԻ <br/> <span className="orange-gradient-text">ՈՒՂԵՑՈՒՅՑ</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border border-orange-100 backdrop-blur-sm">
            <div className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-mono uppercase tracking-widest shadow-md">Տեսություն</div>
            <div className="px-4 py-2 text-xs font-mono text-orange-600/40 uppercase tracking-widest">Պրակտիկա</div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {DIRECTIONS.map((item) => (
              <NavCard 
                key={item.id} 
                item={item} 
                isActive={activeId === item.id} 
                onClick={() => setActiveId(item.id)} 
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <DetailView key={activeId} item={activeItem} />
            </AnimatePresence>
          </div>
        </div>

        {/* Extra Vocab Section */}
        <section className="space-y-8 pt-12">
          <div className="flex items-center gap-4">
            <BookOpen className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold tracking-tight uppercase tracking-widest text-slate-700">Լրացուցիչ Բառապաշար</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXTRA_VOCAB.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white/60 rounded-3xl border border-orange-50 border-b-2 border-b-orange-100 hover:border-orange-200 transition-all group shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xl font-bold text-orange-600 group-hover:translate-x-1 transition-transform">{v.sp}</span>
                  <ChevronRight className="w-4 h-4 text-orange-200" />
                </div>
                <p className="text-slate-600 font-medium">{v.am}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6 text-orange-600/30 text-xs font-mono uppercase tracking-widest pb-12">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Իսպաներեն - Հայերեն Ուղեցույց</span>
          </div>
          <p>© 2026 Ուղղությունների Ուղեցույց</p>
        </footer>
      </div>
    </div>
  );
}
