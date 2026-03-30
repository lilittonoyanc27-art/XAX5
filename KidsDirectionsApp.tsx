import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sun, 
  Navigation, 
  Map as MapIcon, 
  Star, 
  Mountain, 
  Home,
  CloudSun,
  Bird,
  Trees,
  Waves
} from 'lucide-react';

// --- Types ---
interface Tab {
  id: string;
  label: string;
  amLabel: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactNode;
}

// --- Components ---

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
  key?: string | number;
}

const TabButton = ({ tab, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 gap-2
      ${isActive 
        ? `${tab.color} text-white shadow-lg scale-105` 
        : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
    `}
  >
    <div className={`p-2 rounded-2xl ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
      {tab.icon}
    </div>
    <div className="text-center">
      <p className="text-xs font-black uppercase tracking-tighter leading-none">{tab.label}</p>
      <p className="text-[10px] font-bold opacity-80">{tab.amLabel}</p>
    </div>
  </button>
);

const InfoBox = ({ title, amTitle, children, colorClass }: { title: string, amTitle: string, children: React.ReactNode, colorClass: string }) => (
  <div className={`rounded-[40px] p-8 border-4 ${colorClass} bg-white shadow-xl space-y-4`}>
    <div className="space-y-1">
      <h3 className="text-3xl font-black text-slate-800 tracking-tight uppercase">{title}</h3>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{amTitle}</p>
    </div>
    <div className="prose prose-slate max-w-none text-lg text-slate-600 font-medium leading-relaxed">
      {children}
    </div>
  </div>
);

// --- Main App ---

export default function KidsDirectionsApp() {
  const [activeTab, setActiveTab] = useState('inicio');

  const tabs: Tab[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      amLabel: 'Սկիզբ',
      icon: <Home className="w-6 h-6" />,
      color: 'bg-red-500',
      content: (
        <div className="space-y-8">
          <InfoBox 
            title="¡Hola Pequeño Explorador!" 
            amTitle="Ողջույն, փոքրիկ հետախույզ"
            colorClass="border-red-500"
          >
            <p>¿Sabes cómo encontrar el camino a casa o a un tesoro escondido? ¡Necesitas conocer los <b>Puntos Cardinales</b>!</p>
            <p className="text-sm italic text-red-500">Գիտե՞ս ինչպես գտնել տան ճանապարհը կամ թաքնված գանձը: Քեզ պետք է իմանալ <b>աշխարհի կողմերը</b>:</p>
            <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-6 flex items-center gap-4">
              <Compass className="w-12 h-12 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">Son 4 direcciones mágicas que nos dicen dónde estamos. ¡Vamos a conocerlas!</p>
            </div>
          </InfoBox>
        </div>
      )
    },
    {
      id: 'norte',
      label: 'Norte',
      amLabel: 'Հյուսիս',
      icon: <Navigation className="w-6 h-6" />,
      color: 'bg-orange-500',
      content: (
        <div className="space-y-8">
          <InfoBox 
            title="El Norte (N)" 
            amTitle="Հյուսիս"
            colorClass="border-orange-500"
          >
            <p>El <b>Norte</b> siempre está arriba en los mapas. ¡Es donde vive el frío y los osos polares!</p>
            <p className="text-sm italic text-orange-500"><b>Հյուսիսը</b> քարտեզների վրա միշտ վերևում է: Այնտեղ է ապրում ցուրտը և սպիտակ արջերը:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100">
                <h4 className="font-black text-orange-700 mb-2 uppercase">🌳 El Musgo</h4>
                <p className="text-sm">En el bosque, el musgo crece en el lado norte de los árboles porque hay más sombrita.</p>
                <p className="text-xs italic text-orange-600 mt-2">Անտառում մամուռն աճում է ծառերի հյուսիսային կողմում:</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100">
                <h4 className="font-black text-orange-700 mb-2 uppercase">⭐ Estrella Polar</h4>
                <p className="text-sm">Por la noche, hay una estrella muy brillante que siempre señala el Norte.</p>
                <p className="text-xs italic text-orange-600 mt-2">Գիշերը կա մի շատ պայծառ աստղ, որը միշտ ցույց է տալիս Հյուսիսը:</p>
              </div>
            </div>
          </InfoBox>
        </div>
      )
    },
    {
      id: 'sur',
      label: 'Sur',
      amLabel: 'Հարավ',
      icon: <Bird className="w-6 h-6" />,
      color: 'bg-yellow-500',
      content: (
        <div className="space-y-8">
          <InfoBox 
            title="El Sur (S)" 
            amTitle="Հարավ"
            colorClass="border-yellow-500"
          >
            <p>El <b>Sur</b> es lo opuesto al Norte. ¡Está abajo en los mapas! Es donde las aves van cuando tienen frío.</p>
            <p className="text-sm italic text-yellow-600"><b>Հարավը</b> Հյուսիսի հակառակ կողմն է: Քարտեզների վրա այն ներքևում է: Այնտեղ են թռչում թռչունները, երբ մրսում են:</p>
            
            <div className="bg-yellow-50 p-6 rounded-3xl border-2 border-yellow-100 mt-6">
              <h4 className="font-black text-yellow-700 mb-2 uppercase">🐜 Hormiguitas</h4>
              <p className="text-sm">A las hormigas les encanta el calor, por eso hacen sus casitas en el lado Sur de las rocas.</p>
              <p className="text-xs italic text-yellow-600 mt-2">Մրջյունները սիրում են ջերմություն, դրա համար իրենց տնակները շինում են քարերի Հարավային կողմում:</p>
            </div>
          </InfoBox>
        </div>
      )
    },
    {
      id: 'este',
      label: 'Este',
      amLabel: 'Արևելք',
      icon: <Sun className="w-6 h-6" />,
      color: 'bg-orange-600',
      content: (
        <div className="space-y-8">
          <InfoBox 
            title="El Este (E)" 
            amTitle="Արևելք"
            colorClass="border-orange-600"
          >
            <p>El <b>Este</b> es muy especial porque es por donde sale el Sol cada mañana para despertarnos.</p>
            <p className="text-sm italic text-orange-700"><b>Արևելքը</b> շատ հատուկ է, որովհետև հենց այդտեղից է ամեն առավոտ ծագում Արևը՝ մեզ արթնացնելու համար:</p>
            
            <div className="bg-orange-50 p-8 rounded-[40px] border-4 border-dashed border-orange-200 text-center">
              <Sun className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin-slow" />
              <p className="text-xl font-black text-orange-800 uppercase">¡Buenos Días!</p>
              <p className="text-sm text-orange-600">El Sol nace en el Este.</p>
              <p className="text-xs italic text-orange-500 mt-1">Արևը ծագում է Արևելքում:</p>
            </div>
          </InfoBox>
        </div>
      )
    },
    {
      id: 'oeste',
      label: 'Oeste',
      amLabel: 'Արևմուտք',
      icon: <CloudSun className="w-6 h-6" />,
      color: 'bg-red-600',
      content: (
        <div className="space-y-8">
          <InfoBox 
            title="El Oeste (O)" 
            amTitle="Արևմուտք"
            colorClass="border-red-600"
          >
            <p>El <b>Oeste</b> es por donde el Sol se va a dormir. ¡Es el lugar de los atardeceres hermosos!</p>
            <p className="text-sm italic text-red-700"><b>Արևմուտքն</b> այնտեղ է, որտեղ Արևը գնում է քնելու: Գեղեցիկ մայրամուտների վայրն է:</p>
            
            <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-6">
              <h4 className="font-black text-red-700 mb-2 uppercase">🌅 El Atardecer</h4>
              <p className="text-sm">Cuando veas el cielo naranja y rojo por la tarde, ¡estás mirando al Oeste!</p>
              <p className="text-xs italic text-red-600 mt-2">Երբ երեկոյան տեսնես նարնջագույն ու կարմիր երկինքը, դու նայում ես դեպի Արևմուտք:</p>
            </div>
          </InfoBox>
        </div>
      )
    },
    {
      id: 'brujula',
      label: 'Brújula',
      amLabel: 'Կողմնացույց',
      icon: <Compass className="w-6 h-6" />,
      color: 'bg-orange-400',
      content: (
        <div className="space-y-8">
          <InfoBox 
            title="¿Cómo orientarse?" 
            amTitle="Ինչպե՞ս կողմնորոշվել"
            colorClass="border-orange-400"
          >
            <p>¡Usa tu cuerpo como una brújula! Es muy fácil:</p>
            <p className="text-sm italic text-orange-600">Օգտագործիր մարմինդ որպես կողմնացույց: Շատ հեշտ է.</p>
            
            <ul className="space-y-4 mt-6">
              <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black">1</div>
                <p className="text-sm">Apunta con tu mano derecha a donde sale el Sol (<b>Este</b>).</p>
              </li>
              <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black">2</div>
                <p className="text-sm">Tu mano izquierda señalará el <b>Oeste</b>.</p>
              </li>
              <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black">3</div>
                <p className="text-sm">Frente a ti estará el <b>Norte</b>.</p>
              </li>
              <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black">4</div>
                <p className="text-sm">Y a tu espalda estará el <b>Sur</b>.</p>
              </li>
            </ul>
          </InfoBox>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50 font-sans selection:bg-orange-200">
      {/* Header */}
      <header className="bg-white border-b-4 border-orange-200 p-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200 rotate-3">
              <Compass className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none">Mis Primeras Direcciones</h1>
              <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Իմ առաջին ուղղությունները</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Tabs Navigation */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-12">
          {tabs.map((tab) => (
            <TabButton 
              key={tab.id} 
              tab={tab} 
              isActive={activeTab === tab.id} 
              onClick={() => setActiveTab(tab.id)} 
            />
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {tabs.find(t => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>

        {/* Footer Fun Fact */}
        <div className="mt-16 p-8 bg-slate-800 rounded-[40px] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star className="w-32 h-32" />
          </div>
          <h4 className="text-xl font-black mb-2 uppercase tracking-tight">¿Sabías qué? (Գիտեի՞ր)</h4>
          <p className="text-slate-300 font-medium leading-relaxed">
            ¡Los pingüinos viven en el Sur y los osos polares en el Norte! Nunca se encuentran en la naturaleza.
          </p>
          <p className="text-xs italic text-slate-400 mt-2">
            Պինգվինները ապրում են Հարավում, իսկ սպիտակ արջերը՝ Հյուսիսում: Նրանք երբեք չեն հանդիպում բնության մեջ:
          </p>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
        <p>© 2026 Exploradores de Direcciones</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
}
