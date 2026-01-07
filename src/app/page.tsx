"use client";

import React, { useEffect, useState } from 'react';
import { 
  Sun, Code, Sprout, Zap, Wind, Cloud, 
  Brain, Coins, Heart, Moon, Droplets, Terminal, AlertTriangle, BookOpen
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { getNainitalWeather } from '@/lib/weather';

export default function ChakaluwaDashboard() {
  const { 
    credits, creativity, vitality, connection, gardenHealth, organicProduce,
    codingWisdom, farmingWisdom, digitalFog, isYogaActive, isSleeping, isWatering,
    completeCodingTask, logGrowthContent, logUselessDistraction, performYoga, 
    spendFamilyTime, waterPlants, tendFarm, startSleep, stopSleep 
  } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading...' });
  const [currentCode, setCurrentCode] = useState("// Mindful Practice\nfunction dailyRitual() {\n  balanceLife();\n}");
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function initWeather() {
      try {
        const data = await getNainitalWeather();
        setWeather({ temp: Math.round(data.main.temp), condition: data.weather[0].main });
      } catch (err) { console.error(err); }
    }
    initWeather();
  }, []);

  const handleDeploy = () => {
    if (digitalFog > 70) return alert("Fog too high. Clear your mind in the garden.");
    setIsDeploying(true);
    setTimeout(() => {
      completeCodingTask(100);
      setIsDeploying(false);
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 transition-all duration-1000 flex flex-col items-center ${digitalFog > 50 ? 'grayscale-[0.3]' : ''}`}>
      
      {/* REST OVERLAY */}
      {isSleeping && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center">
          <Moon size={60} className="text-indigo-500 animate-pulse mb-4" />
          <h2 className="text-xl tracking-[0.4em] uppercase font-light">Valley Rest</h2>
          <button onClick={stopSleep} className="mt-8 text-slate-600 hover:text-white uppercase text-[10px] tracking-widest">Wake up for a new day</button>
        </div>
      )}

      <main className="max-w-7xl w-full flex flex-col flex-grow">
        
        {/* ROW 1: LEGACY & STATUS */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-center">
            <h1 className="text-3xl font-black text-emerald-500 italic tracking-tighter uppercase">Chakaluwa</h1>
            <p className="text-slate-600 font-mono text-[10px]">NAINITAL_NODE // {weather.condition} {weather.temp}°C</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBadge icon={<Coins size={14}/>} label="Wealth" value={`₹${credits}`} color="text-emerald-400" />
            <StatBadge icon={<Sprout size={14}/>} label="Pantry" value={`${organicProduce} 🧺`} color="text-orange-400" />
            <StatBadge icon={<Code size={14}/>} label="Code XP" value={codingWisdom.toLocaleString()} color="text-blue-400" />
            <StatBadge icon={<Sprout size={14}/>} label="Farm XP" value={farmingWisdom.toLocaleString()} color="text-amber-400" />
          </div>
        </header>

        {/* ROW 2: HARMONY & RITUALS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* DAILY PILLARS */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HarmonyMetric label="Mind" value={creativity} color="bg-purple-500" icon={<Brain size={14}/>} />
            <HarmonyMetric label="Body" value={vitality} color="bg-orange-500" icon={<Zap size={14}/>} />
            <HarmonyMetric label="Soul" value={connection} color="bg-pink-500" icon={<Heart size={14}/>} />
            <HarmonyMetric label="Digital Fog" value={digitalFog} color="bg-red-500" icon={<AlertTriangle size={14}/>} inverse />
          </div>

          {/* QUICK ACTIONS */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] grid grid-cols-2 gap-3">
              <button onClick={logGrowthContent} className="py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl text-[10px] font-bold uppercase flex flex-col items-center gap-2 border border-emerald-500/20">
                <BookOpen size={16}/> Learning
              </button>
              <button onClick={logUselessDistraction} className="py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-[10px] font-bold uppercase flex flex-col items-center gap-2 border border-red-500/20">
                <AlertTriangle size={16}/> Scrolling
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <ActionButton onClick={waterPlants} label="Water" icon={<Droplets size={12}/>} disabled={isWatering}/>
              <ActionButton onClick={performYoga} label="Yoga" icon={<Wind size={12}/>} disabled={isYogaActive}/>
              <ActionButton onClick={startSleep} label="Sleep" icon={<Moon size={12}/>} />
            </div>
          </div>
        </div>

        {/* ROW 3: THE MINDFUL TERMINAL (AT BOTTOM) */}
        <section className="mt-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative">
            {digitalFog > 60 && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center text-red-400 text-xs font-mono uppercase tracking-widest">
                <AlertTriangle className="mb-2" size={32}/>
                <span>Attention Fragmented: Clear Fog to Code</span>
              </div>
            )}
            <div className="bg-slate-800/30 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-500"/>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Execution Engine // Main.ts</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <textarea 
                className="flex-grow min-h-[180px] bg-transparent font-mono text-emerald-400/90 focus:outline-none resize-none leading-relaxed text-sm" 
                value={currentCode} 
                onChange={(e) => setCurrentCode(e.target.value)} 
              />
              <div className="md:w-64 flex flex-col gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/50">
                  <p className="text-[9px] text-slate-600 uppercase font-bold mb-2 tracking-widest">System Status</p>
                  <p className="text-[10px] font-mono text-slate-400 italic">Ready for mindful deployment...</p>
                </div>
                <button 
                  onClick={handleDeploy} 
                  disabled={isDeploying || digitalFog > 70} 
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 disabled:opacity-20"
                >
                  {isDeploying ? "Deploying..." : "Push Code"}
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function ActionButton({ onClick, label, icon, disabled = false }: any) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="flex flex-col items-center justify-center py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-bold uppercase text-slate-500 hover:text-white transition-all hover:bg-slate-800 disabled:opacity-30"
    >
      {icon}
      <span className="mt-1">{label}</span>
    </button>
  );
}

function StatBadge({ icon, label, value, color }: any) {
  return (
    <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3">
      <div className={`${color} bg-slate-950 p-2 rounded-xl border border-slate-800`}>{icon}</div>
      <div>
        <p className="text-[9px] uppercase font-bold text-slate-600 leading-none mb-1">{label}</p>
        <p className="text-xs font-bold leading-none">{value}</p>
      </div>
    </div>
  );
}

function HarmonyMetric({ label, value, color, icon, inverse = false }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800/50 p-4 rounded-[1.5rem]">
      <div className="flex justify-between items-center mb-2.5 text-[9px] font-bold uppercase">
        <span className="text-slate-500 flex items-center gap-2">{icon} {label}</span>
        <span className="text-slate-400 font-mono">{value}%</span>
      </div>
      <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
        <div className={`${color} h-full transition-all duration-1000 ${inverse ? 'opacity-60' : ''}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}