
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  ImageIcon, 
  FileText, 
  Save, 
  Loader2, 
  Check, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  User, 
  Zap, 
  CheckCircle2, 
  Film, 
  Download, 
  Sparkles, 
  Brain, 
  Wand2, 
  Gauge, 
  Copy, 
  Play, 
  Lock,
  Share2,
  AlignLeft,
  TrendingUp,
  Search,
  ShieldCheck,
  ScanEye,
  Pencil
} from 'lucide-react';

// --- MOCK DATA INTEGRATION ---
const DATA_SOURCE = {
  "record": {
    "Id": 1,
    "Name": "Misha Ionita",
    "Url": "https://www.autovit.ro/autoturisme/anunt/bmw-x1-ver-xdrive18d-aut-ID7HGU7H.html",
    // BMW X1 Images from User JSON
    "Images": [
      "https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6Imt5MDV3MmxrM2h5bTItQVVUT1ZJVFJPIiwidyI6W3siZm4iOiJxN216NTNiaWZwemstQVVUT1ZJVFJPIiwicyI6IjE2IiwiYSI6IjAiLCJwIjoiMTAsLTEwIn1dfQ.NGkVKhEF6m2Ix5FeP5g-0WEWVNk2IvFg1hSB6x428ho/image",
      "https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6IjYwdjQwOW5zeXN4YTMtQVVUT1ZJVFJPIiwidyI6W3siZm4iOiJxN216NTNiaWZwemstQVVUT1ZJVFJPIiwicyI6IjE2IiwiYSI6IjAiLCJwIjoiMTAsLTEwIn1dfQ.pAKoPStyEjuYfDLzGE-w8I7bTPhl5lqKXsQdeJG9cwA/image",
      "https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6Im42OGU3MnBmdmI0eDItQVVUT1ZJVFJPIiwidyI6W3siZm4iOiJxN216NTNiaWZwemstQVVUT1ZJVFJPIiwicyI6IjE2IiwiYSI6IjAiLCJwIjoiMTAsLTEwIn1dfQ.yUN_bFFDajn6Fj9skk4_07azpD8mwL5KHjXGS1jdO58/image",
      "https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6ImN5anU2NGJmZDQ5MjEtQVVUT1ZJVFJPIiwidyI6W3siZm4iOiJxN216NTNiaWZwemstQVVUT1ZJVFJPIiwicyI6IjE2IiwiYSI6IjAiLCJwIjoiMTAsLTEwIn1dfQ.pWbpfx_xq3YoW6kJwwvcNAM1YhPxCFtEQ7PJ2s15eoU/image",
      "https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6InJjamJnMzg0YmUxazItQVVUT1ZJVFJPIiwidyI6W3siZm4iOiJxN216NTNiaWZwemstQVVUT1ZJVFJPIiwicyI6IjE2IiwiYSI6IjAiLCJwIjoiMTAsLTEwIn1dfQ.v1xtShHpnVhGhHfodB_-gsRKtu8o_Sxv3fmK1T71Jmw/image"
    ],
    // "Raw" image for comparison toggle (simulating original bad photo)
    "RawImage": "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop", 
    "ZipImages": "https://example.com/download/images.zip",
    
    // High-quality text content from the prompt
    "targetPersonaTitle": "Pragmaticul Aspirant",
    "targetPersonaDesc": "Caută prestigiul și calitatea unei mărci premium, dar este atent la buget și valoarea pe termen lung. Apreciază tehnologia modernă, siguranța (xDrive) și costurile de rulare (consum redus).",
    "topSellingPoints": [
      "An de fabricație recent (2020) la un preț foarte competitiv.",
      "Sistem de tracțiune integrală BMW xDrive, ideal pentru orice condiții meteo.",
      "Echipare tehnologică completă: Apple CarPlay, Android Auto, navigație, Keyless Go.",
      "Motorizare diesel eficientă (150 CP) cu un consum mediu declarat redus.",
      "Cutie de viteze automată pentru un condus relaxat în oraș și la drum lung."
    ],
    "listingDescription": "Știi serile acelea de marți, când pleci de la birou și tot ce vrei e să ajungi acasă? Afară e aglomerație, poate un pic de ploaie, iar zgomotul orașului pare mai puternic ca niciodată. Apoi deschizi ușa acestui BMW X1 din 2020. Te așezi. Închizi ușa. Și pentru câteva momente, lumea de afară dispare. Asta e prima poveste pe care o spune mașina asta – povestea liniștii regăsite.\n\nNu e un simplu SUV. E un spațiu personal gândit pentru confort. Motorul diesel de 150 de cai putere, cuplat la cutia automată, nu este despre sprinturi agresive, ci despre o livrare de putere fluidă, constantă. Accelerezi lin, depășești fără efort, iar totul se întâmplă calm, fără dramă. Apoi ai sistemul xDrive. Mulți îl asociază cu iarna și zăpada, dar adevărata lui valoare o descoperi într-o zi oarecare de toamnă, pe un drum umed. Acel sentiment de siguranță totală, de aderență perfectă în viraje, valorează mai mult decât orice cifră de pe hârtie. Este încredere pură.\n\nLa interior, povestea continuă. Tehnologia este prezentă, dar nu intruzivă. Telefonul tău se conectează instant prin Apple CarPlay sau Android Auto. Playlist-ul preferat pornește, Waze e deja pe ecranul mare, tactil. Nu trebuie să cauți cabluri, nu trebuie să butonezi. Totul e intuitiv. E tehnologie care îți simplifică viața, nu o complică.\n\nKilometrajul de 189.000 km? Pentru un diesel BMW din 2020, asta înseamnă că motorul a funcționat exact în regimul pentru care a fost proiectat: drumuri lungi, constante. Este un motor rulat corect, nu unul obosit de traficul urban. Când pui totul cap la cap – anul, tracțiunea integrală, dotările tehnologice și starea generală impecabilă – realizezi că prețul de 17.800 EUR nu este doar corect, ci reprezintă o oportunitate inteligentă. Este decizia rațională care se simte extraordinar de bine. Hai să vezi dacă e pentru tine.",
    "descriptionWordCount": 402,
    "Video": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "emotionalTrigger": "Liniște Regăsită & Control Sigur"
  }
};

const POSTING_SITES = [
    { name: 'Autovit.ro', url: 'https://www.autovit.ro' },    
    { name: 'Carzz.ro', url: 'https://carzz.ro' },
    { name: 'BestAuto', url: 'https://www.bestauto.ro' },
    { name: 'Plus-Auto', url: 'https://plus-auto.ro' },
    { name: 'olx.ro', url: 'https://olx.ro' },
];

const NOTIFICATIONS = [
  { id: 1, title: "Prediction", message: "This copy is 40% more likely to generate a phone call than the market average.", icon: TrendingUp, color: "text-green-500" },
  { id: 2, title: "SEO Alert", message: "'xDrive' keyword identified as high-value for winter visibility.", icon: Search, color: "text-blue-500" },
  { id: 3, title: "Market Watch", message: "Price analysis suggests this listing is a 'Great Deal' badge candidate.", icon: Zap, color: "text-yellow-500" }
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'all' | 'strategy' | 'media' | 'narrative'>('all');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Feature States
  const [activeNotification, setActiveNotification] = useState<typeof NOTIFICATIONS[0] | null>(null);

  // Initialize State from Data Source
  const record = DATA_SOURCE.record;
  
  // EDITABLE FIELDS STATE
  const [editableData, setEditableData] = useState({
    title: "2020 BMW X1 xDrive18d",
    description: record.listingDescription,
  });
  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  // Notification Stream Logic
  useEffect(() => {
    const showNotification = (index: number) => {
      setActiveNotification(NOTIFICATIONS[index]);
      setTimeout(() => setActiveNotification(null), 5000); // Hide after 5s
    };

    const t1 = setTimeout(() => showNotification(0), 2000);
    const t2 = setTimeout(() => showNotification(1), 12000);
    const t3 = setTimeout(() => showNotification(2), 24000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-6 max-w-[1600px] mx-auto font-sans relative">
      
      {/* LEAD SIMULATOR NOTIFICATION STREAM */}
      <div className="fixed top-24 right-6 z-50 pointer-events-none">
        {activeNotification && (
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-2xl flex items-start gap-3 w-80 animate-in slide-in-from-right fade-in duration-500 pointer-events-auto">
             <div className={`p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 ${activeNotification.color}`}>
                <activeNotification.icon className="w-5 h-5" />
             </div>
             <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   {activeNotification.title}
                   <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                    </span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 leading-relaxed">
                   {activeNotification.message}
                </p>
             </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-2 hidden lg:block">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-white/10 p-4 sticky top-24">
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'strategy', label: 'AI Strategy', icon: Target },
                { id: 'media', label: 'Media Assets', icon: ImageIcon },
                { id: 'narrative', label: 'Narrative & Copy', icon: FileText },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setViewMode(item.id === 'overview' ? 'all' : item.id as any);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.id 
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' 
                      : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* NEW OPTIMIZE BUTTON */}
            <div className="mt-6">
               <button 
                  onClick={() => window.open('?page=checkout', '_blank')}
                  className="w-full relative rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/30 overflow-hidden transition-all duration-1000 ease-hypnotic hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500 bg-[length:200%_auto] animate-gradient-x flex items-center justify-center gap-2 whitespace-nowrap"
               >
                  <Sparkles className="w-4 h-4" />
                  Optimize New Listing
               </button>
            </div>

            {/* LISTING HEALTH / GAMIFICATION WIDGET */}
            <div className="mt-8">
               <div className="bg-gradient-to-br from-slate-900 to-[#0f172a] rounded-xl p-4 border border-white/10 relative group overflow-hidden cursor-default">
                  {/* Pulsing Glow Background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl animate-pulse"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Listing Health</div>
                      
                      {/* Shield Icon Replacement */}
                      <div className="relative flex flex-col items-center justify-center mb-2">
                         <div className="relative">
                             <ShieldCheck className="w-12 h-12 text-brand-500 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                             <div className="absolute inset-0 bg-brand-500/20 blur-md rounded-full -z-10 animate-pulse"></div>
                         </div>
                         <span className="text-3xl font-bold text-white leading-none mt-2">94</span>
                      </div>

                      <div className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Excellent
                      </div>
                  </div>

                  {/* HOVER TOOLTIP BREAKDOWN */}
                  <div className="absolute inset-0 bg-slate-900 z-20 p-5 flex flex-col justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                      {/* Item 1 */}
                      <div>
                          <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-400 font-medium whitespace-nowrap">Visual Appeal</span>
                              <span className="text-green-400 font-bold">98/100</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-green-500 w-[98%] h-full rounded-full"></div>
                          </div>
                      </div>
                      
                      {/* Item 2 */}
                      <div>
                          <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-400 font-medium whitespace-nowrap">Copy Sentiment</span>
                              <span className="text-brand-400 font-bold">95/100</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-brand-500 w-[95%] h-full rounded-full"></div>
                          </div>
                      </div>
                      
                      {/* Item 3 */}
                      <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                          <span className="text-slate-400 font-medium whitespace-nowrap">SEO Keywords</span>
                          <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">12/12 Found</span>
                      </div>
                  </div>
               </div>
            </div>

            {/* NEW: Visual Intelligence Widget */}
            <div className="mt-4">
                <div className="bg-gradient-to-br from-[#0f172a] to-slate-900 rounded-xl p-4 border border-white/10 relative group overflow-hidden cursor-default">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl animate-pulse"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Visual IQ</div>
                         
                         {/* Prominent Visual Icon & Score */}
                         <div className="relative flex flex-col items-center justify-center mb-2">
                             <div className="relative">
                                 <ScanEye className="w-12 h-12 text-accent-purple drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                                 <div className="absolute inset-0 bg-accent-purple/20 blur-md rounded-full -z-10 animate-pulse"></div>
                             </div>
                             <span className="text-3xl font-bold text-white leading-none mt-2">96</span>
                         </div>

                         <div className="text-[10px] text-accent-pink font-bold flex items-center gap-1">
                             <Sparkles className="w-3 h-3" /> Top 1% Quality
                         </div>
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute inset-0 bg-slate-900 z-20 p-4 flex flex-col justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto border border-white/10">
                        <div>
                            <div className="flex justify-between text-[10px] mb-1">
                                <span className="text-slate-400">Studio Lighting</span>
                                <span className="text-accent-purple font-bold">Perfect</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-accent-purple w-full h-full rounded-full"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] mb-1">
                                <span className="text-slate-400">Composition</span>
                                <span className="text-accent-pink font-bold">Golden Ratio</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-accent-pink w-[95%] h-full rounded-full"></div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW: Video Engagement Widget */}
            <div className="mt-4">
                <div className="bg-gradient-to-br from-[#0f172a] to-slate-900 rounded-xl p-4 border border-white/10 relative group overflow-hidden cursor-default">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>

                    <div className="relative z-10 flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Viral Score</span>
                        </div>
                        <span className="text-sm font-bold text-white">High</span>
                    </div>

                    {/* Visual Line Graph Representation (SVG) */}
                    <div className="relative h-8 w-full">
                        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                            <path d="M0,30 Q20,28 30,15 T100,5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="100" cy="5" r="3" fill="#3b82f6" className="animate-ping" />
                            <circle cx="100" cy="5" r="3" fill="#3b82f6" />
                        </svg>
                    </div>

                    <div className="text-[10px] text-blue-400 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" /> +4.2x Retention Predicted
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute inset-0 bg-slate-900 z-20 p-4 flex flex-col justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto border border-white/10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="text-[10px] text-slate-400">Hook Strength</span>
                            <span className="text-[10px] text-blue-400 font-bold">9.8/10</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="text-[10px] text-slate-400">Pacing</span>
                            <span className="text-[10px] text-blue-400 font-bold">Fast/Engaging</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400">Est. Shares</span>
                            <span className="text-[10px] text-white font-bold">15-20</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-10 space-y-6">
          
          {/* Top Header Card */}
          <div className="bg-white dark:bg-[#0f172a] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />
             
             <div className="relative z-10 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input 
                        type="text"
                        value={editableData.title}
                        onChange={(e) => setEditableData({...editableData, title: e.target.value})}
                        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-white/20 focus:border-brand-500 focus:outline-none transition-all w-full md:w-auto"
                    />
                    <span className="hidden md:flex px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-500/30 items-center gap-1.5 shadow-sm whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Optimized
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-gray-400 mt-3">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <Calendar className="w-4 h-4 text-brand-500" /> Added Today
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <MapPin className="w-4 h-4 text-brand-500" /> Bucharest
                    </span>
                    <a href={record.Url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline px-3 py-1.5">
                        View Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                   <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full xl:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                     ) : saveSuccess ? (
                        <Check className="w-4 h-4" />
                     ) : (
                        <Save className="w-4 h-4" /> 
                     )}
                     {saveSuccess ? 'Saved!' : 'Save Changes'}
                   </button>
                </div>
             </div>

             {/* Distribution Toolbar */}
             <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Distribute Listing:</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {POSTING_SITES.map((site) => (
                        <button
                            key={site.name}
                            onClick={() => window.open(site.url, '_blank')}
                            className="group relative overflow-hidden rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x"
                        >
                            <div className="relative z-10 flex items-center gap-2">
                               {site.name}
                               <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    ))}
                </div>
             </div>
          </div>

          {/* VIEW: STRATEGY & INSIGHTS */}
          {(viewMode === 'all' || viewMode === 'strategy') && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Unified Strategy Card - Non-Editable "Intelligence" */}
                  <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl border border-indigo-500/20">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
                      
                      {/* FIX: Move badge to flex container to prevent overlap */}
                      <div className="relative z-10 flex flex-col gap-8">
                          <div className="flex justify-end">
                             <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
                                 <Lock className="w-3 h-3" /> AI Generated Intelligence
                             </span>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                              
                              {/* Left Column: Target Persona */}
                              <div>
                                  <div className="flex items-center gap-3 mb-6">
                                      <div className="p-2 bg-indigo-500/20 rounded-lg backdrop-blur-sm border border-indigo-500/30">
                                          <User className="w-5 h-5 text-indigo-300" />
                                      </div>
                                      <span className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Target Persona</span>
                                  </div>
                                  
                                  <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
                                      {record.targetPersonaTitle}
                                  </h2>
                                  
                                  <p className="text-indigo-100 text-lg leading-relaxed opacity-90 font-light border-l-2 border-indigo-500 pl-4">
                                      "{record.targetPersonaDesc}"
                                  </p>
                              </div>

                              {/* Right Column: Emotional Hook */}
                              <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm flex flex-col justify-center relative group/hook hover:bg-white/10 transition-colors">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl transition-colors"></div>
                                  
                                  <div className="flex items-center gap-3 mb-4 text-indigo-200">
                                      <div className="p-2 bg-white/10 rounded-lg">
                                        <Zap className="w-5 h-5" />
                                      </div>
                                      <span className="font-bold uppercase tracking-widest text-xs">Emotional Hook</span>
                                  </div>
                                  
                                  <div className="text-2xl font-bold text-white mb-4 leading-snug">
                                      {record.emotionalTrigger}
                                  </div>
                                  
                                  <p className="text-sm text-indigo-200/80 leading-relaxed">
                                      This vehicle isn't sold on specs; it's sold on the feeling of <span className="font-semibold text-white">safety and quiet confidence</span> amidst urban chaos.
                                  </p>
                              </div>

                          </div>
                      </div>
                  </div>

                  {/* Selling Points List - Non-Editable */}
                  <div className="bg-white dark:bg-[#0f172a] rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-sm relative">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
                            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-sm">Key Selling Points</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {record.topSellingPoints.map((point, i) => (
                              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-brand-200 dark:hover:border-brand-500/30 transition-colors group">
                                  <div className="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                      <Check className="w-3.5 h-3.5" />
                                  </div>
                                  <p className="text-sm text-slate-700 dark:text-gray-300 font-medium leading-relaxed">
                                      {point}
                                  </p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {/* VIEW: MEDIA ASSETS */}
          {(viewMode === 'all' || viewMode === 'media') && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Video Player - Cinema Mode */}
                  <div className="w-full bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                      <div className="bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative aspect-video group">
                          <video 
                              src={record.Video} 
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                              controls
                              poster={record.Images[0]}
                              preload="metadata"
                          />
                          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-white pointer-events-none shadow-lg">
                              <Film className="w-3.5 h-3.5 text-brand-400" />
                              AI Director Mode
                          </div>
                      </div>
                      
                      {/* Video Footer - Centered */}
                      <div className="flex flex-col items-center mt-6 px-2 text-center">
                          <button 
                              onClick={() => window.open(record.Video, '_blank')}
                              className="px-12 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02]"
                          >
                              <Download className="w-6 h-6" /> Download Video
                          </button>
                          <p className="text-xs text-slate-500 dark:text-gray-400 mt-3 font-medium">1080p • 60fps • Captioned</p>
                      </div>
                  </div>

                  {/* Enhanced Gallery */}
                  <div className="w-full">
                      <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-6">
                              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                  <ImageIcon className="w-5 h-5 text-brand-500" /> Studio Gallery
                              </h3>
                              <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-slate-600 dark:text-gray-400">{record.Images.length} Photos</span>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                              {/* Active Large Image - NO TOGGLE */}
                              <div className="lg:col-span-8 aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/5 relative shadow-inner">
                                  <img 
                                      src={record.Images[activeImageIndex]} 
                                      alt="Vehicle" 
                                      className="w-full h-full object-cover"
                                  />
                                  
                                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                                      <Sparkles className="w-3 h-3 text-yellow-400" /> AI Enhanced
                                  </div>
                              </div>

                              {/* Thumbnails Grid */}
                              <div className="lg:col-span-4 grid grid-cols-2 gap-3 content-start">
                                  {record.Images.map((img, idx) => (
                                      <button 
                                          key={idx}
                                          onClick={() => setActiveImageIndex(idx)}
                                          className={`aspect-video rounded-lg overflow-hidden border-2 transition-all relative ${
                                              activeImageIndex === idx 
                                              ? 'border-brand-500 ring-2 ring-brand-500/20 z-10' 
                                              : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                                          }`}
                                      >
                                          <img 
                                              src={img} 
                                              alt={`Thumb ${idx}`} 
                                              className="w-full h-full object-cover" 
                                          />
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {/* Download All Images Button - Centered below gallery */}
                          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col items-center">
                              <button 
                                  onClick={() => window.open(record.ZipImages, '_blank')}
                                  className="px-12 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02]"
                              >
                                  <Download className="w-6 h-6" /> Download All Images
                              </button>
                              <p className="text-xs text-slate-500 dark:text-gray-400 mt-3 font-medium">High Res • {record.Images.length} Images • Optimized (.zip)</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* VIEW: NARRATIVE & COPY - RESTRUCTURED & PACKAGED */}
          {(viewMode === 'all' || viewMode === 'narrative') && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Sales Narrative - Full Width "Conversion Command Center" */}
                  <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden relative group">
                       
                       {/* Header with CRO elements */}
                       <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                                  <Brain className="w-6 h-6" />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2">
                                       <h3 className="font-bold text-slate-900 dark:text-white text-xl">Psychological Sales Narrative</h3>
                                       <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-200 dark:border-green-500/30 flex items-center gap-1">
                                          <Sparkles className="w-3 h-3" /> High Conversion
                                       </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-gray-400 mt-2">
                                      <span className="flex items-center gap-1"><Wand2 className="w-3 h-3 text-brand-500" /> NLP Optimized</span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-brand-500" /> Flesch-Kincaid Grade: 6.2</span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-brand-500" /> {record.emotionalTrigger}</span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1"><AlignLeft className="w-3 h-3 text-brand-500" /> {record.descriptionWordCount} Words</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10"
                            >
                                <Save className="w-4 h-4" /> Save Draft
                            </button>

                            <button 
                                onClick={() => copyToClipboard(editableData.description, 'desc')}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${
                                    copiedField === 'desc' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/20'
                                }`}
                            >
                                {copiedField === 'desc' ? (
                                    <>
                                        <Check className="w-4 h-4" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" /> Copy for Listing
                                    </>
                                )}
                            </button>
                          </div>
                       </div>

                       {/* Content Area - Full Width Single Block - REFACTORED FOR EDIT UX */}
                       <div className="h-[550px] bg-white dark:bg-[#0f172a] relative group/edit transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-text" onClick={() => document.querySelector('textarea')?.focus()}>
                          
                          {/* Edit Hint Overlay */}
                          <div className="absolute top-4 right-6 text-xs text-slate-400 dark:text-gray-500 font-medium opacity-0 group-hover/edit:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 z-20">
                              <Pencil className="w-3 h-3" /> Click to Edit
                          </div>

                          <textarea 
                            className="w-full h-full bg-transparent border-none font-serif text-lg leading-relaxed text-slate-700 dark:text-gray-300 focus:outline-none focus:ring-0 p-8 resize-none placeholder:text-slate-300 dark:placeholder:text-gray-700 custom-scrollbar z-10 relative"
                            value={editableData.description}
                            onChange={(e) => setEditableData({...editableData, description: e.target.value})}
                          />
                       </div>
                  </div>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
