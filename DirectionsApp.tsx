import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sun, 
  Navigation, 
  Map as MapIcon, 
  ChevronRight, 
  Info, 
  Wind, 
  Star, 
  Mountain, 
  Home,
  Menu,
  X,
  Globe
} from 'lucide-react';

// --- Types ---
interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// --- Components ---

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200">
        <Compass className="w-6 h-6 text-white animate-pulse" />
      </div>
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">Puntos Cardinales (Իսպաներեն)</h1>
    </div>
    <button 
      onClick={onMenuClick}
      className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
    >
      <Menu className="w-6 h-6 text-slate-600" />
    </button>
  </header>
);

const Sidebar = ({ 
  sections, 
  activeSection, 
  setActiveSection, 
  isOpen, 
  onClose 
}: { 
  sections: Section[], 
  activeSection: string, 
  setActiveSection: (id: string) => void,
  isOpen: boolean,
  onClose: () => void
}) => (
  <>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
        />
      )}
    </AnimatePresence>

    <aside className={`
      fixed lg:sticky top-0 lg:top-[73px] left-0 h-full lg:h-[calc(100vh-73px)] 
      w-72 bg-white border-r border-slate-200 z-50 transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <span className="font-bold text-slate-800">Նավիգացիա</span>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <nav className="space-y-1 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                onClose();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${activeSection === section.id 
                  ? 'bg-orange-50 text-orange-700 shadow-sm shadow-orange-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className={activeSection === section.id ? 'text-orange-600' : 'text-slate-400'}>
                {section.icon}
              </span>
              {section.title}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Լեզու</p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>Հայերենից Իսպաներեն</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
);

const ContentCard = ({ title, amTitle, children, icon }: { title: string, amTitle: string, children: React.ReactNode, icon?: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow mb-8"
  >
    <div className="flex flex-col mb-6">
      <div className="flex items-center gap-4">
        {icon && <div className="p-3 bg-slate-50 rounded-2xl text-orange-600">{icon}</div>}
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <p className="text-sm text-slate-400 font-medium ml-14 uppercase tracking-widest">{amTitle}</p>
    </div>
    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

const ExampleBox = ({ title, amTitle, content, amContent }: { title: string, amTitle: string, content: string, amContent: string }) => (
  <div className="bg-orange-50/50 border-l-4 border-orange-500 p-6 rounded-r-2xl my-6">
    <h4 className="font-bold text-orange-900 mb-2 flex flex-col">
      <span className="flex items-center gap-2"><Info className="w-4 h-4" /> Ejemplo: {title}</span>
      <span className="text-xs text-orange-700/60 font-medium ml-6 italic">Օրինակ. {amTitle}</span>
    </h4>
    <p className="text-orange-800/80 italic">{content}</p>
    <p className="text-orange-700/60 text-sm mt-2">({amContent})</p>
  </div>
);

// --- Main App ---

export default function DirectionsSpanishArmenian() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections: Section[] = [
    {
      id: 'intro',
      title: 'Introducción (Ներածություն)',
      icon: <Home className="w-5 h-5" />,
      content: (
        <>
          <ContentCard title="¿Qué son los puntos cardinales?" amTitle="Որո՞նք են աշխարհի կողմերը:">
            <p>
              Los <strong>puntos cardinales</strong> son las cuatro direcciones principales que se utilizan para orientarse en la Tierra: Norte, Sur, Este y Oeste.
            </p>
            <p className="text-sm italic text-slate-500">
              Աշխարհի կողմերը չորս հիմնական ուղղություններն են, որոնք օգտագործվում են Երկրի վրա կողմնորոշվելու համար՝ Հյուսիս, Հարավ, Արևելք և Արևմուտք:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">¿Para qué sirven? (Ինչի՞ համար են:)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Navegación (Նավիգացիա)</li>
                  <li>Leer mapas (Քարտեզներ կարդալ)</li>
                  <li>Orientación (Կողմնորոշում)</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">Conceptos (Հասկացություններ)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Horizonte (Հորիզոն)</li>
                  <li>Brújula (Կողմնացույց)</li>
                  <li>Mapa (Քարտեզ)</li>
                </ul>
              </div>
            </div>
          </ContentCard>
        </>
      )
    },
    {
      id: 'main',
      title: 'Direcciones Principales (Հիմնական ուղղություններ)',
      icon: <Compass className="w-5 h-5" />,
      content: (
        <>
          <ContentCard title="Los Cuatro Puntos" amTitle="Չորս կողմերը" icon={<Navigation className="w-6 h-6" />}>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">N</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Norte (Հյուսիս)</h3>
                  <p className="text-sm text-slate-500 italic mb-2">Dirección al Polo Norte. (Ուղղություն դեպի Հյուսիսային բևեռ:)</p>
                  <ExampleBox 
                    title="Musgo" 
                    amTitle="Մամուռ"
                    content="El musgo suele crecer en el lado norte de los árboles." 
                    amContent="Մամուռը սովորաբար աճում է ծառերի հյուսիսային կողմում:"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">S</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Sur (Հարավ)</h3>
                  <p className="text-sm text-slate-500 italic mb-2">Dirección opuesta al norte. (Հյուսիսին հակառակ ուղղությունը:)</p>
                  <ExampleBox 
                    title="Aves" 
                    amTitle="Թռչուններ"
                    content="Las aves vuelan al sur en invierno." 
                    amContent="Ձմռանը թռչունները թռչում են հարավ:"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">E</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Este (Արևելք)</h3>
                  <p className="text-sm text-slate-500 italic mb-2">Donde sale el Sol. (Այնտեղ, որտեղ ծագում է Արևը:)</p>
                  <ExampleBox 
                    title="Amanecer" 
                    amTitle="Արշալույս"
                    content="El sol sale por el este." 
                    amContent="Արևը ծագում է արևելքից:"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">O</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Oeste (Արևմուտք)</h3>
                  <p className="text-sm text-slate-500 italic mb-2">Donde se pone el Sol. (Այնտեղ, որտեղ մայր է մտնում Արևը:)</p>
                  <ExampleBox 
                    title="Atardecer" 
                    amTitle="Մայրամուտ"
                    content="El sol se pone por el oeste." 
                    amContent="Արևը մայր է մտնում արևմուտքում:"
                  />
                </div>
              </div>
            </div>
          </ContentCard>
        </>
      )
    },
    {
      id: 'intermediate',
      title: 'Puntos Intermedios (Միջանկյալ կողմեր)',
      icon: <Wind className="w-5 h-5" />,
      content: (
        <>
          <ContentCard title="Direcciones Compuestas" amTitle="Բաղադրյալ ուղղություններ" icon={<Wind className="w-6 h-6" />}>
            <p>Se encuentran entre los puntos principales: (Գտնվում են հիմնական կողմերի միջև:)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                { name: 'Noreste (NE)', am: 'Հյուսիս-արևելք', desc: 'Entre Norte y Este' },
                { name: 'Sureste (SE)', am: 'Հարավ-արևելք', desc: 'Entre Sur y Este' },
                { name: 'Suroeste (SO)', am: 'Հարավ-արևմուտք', desc: 'Entre Sur y Oeste' },
                { name: 'Noroeste (NO)', am: 'Հյուսիս-արևմուտք', desc: 'Entre Norte y Oeste' },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                  <h4 className="font-bold text-slate-800 mb-1">{item.name}</h4>
                  <p className="text-xs text-orange-600 font-bold uppercase">{item.am}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </ContentCard>
        </>
      )
    },
    {
      id: 'methods',
      title: '¿Cómo orientarse? (Ինչպե՞ս կողմնորոշվել)',
      icon: <MapIcon className="w-5 h-5" />,
      content: (
        <>
          <ContentCard title="Por el Sol" amTitle="Արևով" icon={<Sun className="w-6 h-6 text-yellow-500" />}>
            <p>El Sol es el guía más antiguo. (Արևը ամենահին ուղեցույցն է:)</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 my-4">
              <h4 className="font-bold text-slate-800 mb-3">Método de la sombra (Ստվերի մեթոդը):</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Clava un palo en el suelo. (Փայտ խրեք հողի մեջ:)</li>
                <li>Marca el final de la sombra (Oeste). (Նշեք ստվերի վերջը՝ Արևմուտք:)</li>
                <li>Espera 15 minutos y marca de nuevo (Este). (Սպասեք 15 րոպե և նորից նշեք՝ Արևելք:)</li>
              </ol>
            </div>
          </ContentCard>

          <ContentCard title="Por las estrellas" amTitle="Աստղերով" icon={<Star className="w-6 h-6 text-blue-400" />}>
            <p>En el hemisferio norte, la <strong>Estrella Polar</strong> siempre indica el Norte.</p>
            <p className="text-sm italic text-slate-500">Հյուսիսային կիսագնդում Բևեռային աստղը միշտ ցույց է տալիս հյուսիսը:</p>
          </ContentCard>

          <ContentCard title="Naturaleza" amTitle="Բնություն" icon={<Mountain className="w-6 h-6 text-emerald-500" />}>
            <ul className="space-y-4 mt-4">
              <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Hormigueros (Մրջնաբնիկներ):</span> Suelen estar en el lado sur de los árboles. (Սովորաբար գտնվում են ծառերի հարավային կողմում:)
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Anillos de árboles (Ծառի օղակներ):</span> Son más anchos en el lado sur. (Հարավային կողմում դրանք ավելի լայն են:)
                </div>
              </li>
            </ul>
          </ContentCard>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="max-w-7xl mx-auto flex">
        <Sidebar 
          sections={sections} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-6 lg:p-12 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {sections.find(s => s.id === activeSection)?.content}
            </motion.div>
          </AnimatePresence>

          <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm pb-12">
            <p>© 2026 Guía Educativa: Puntos Cardinales (Հայերեն - Իսպաներեն)</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
