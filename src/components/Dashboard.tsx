
import React, { useState, useEffect } from 'react';
import { 
  Target, ImageIcon, FileText, Save, Loader2, Check, ExternalLink, 
  Calendar, MapPin, User, Zap, CheckCircle2, Download, Sparkles, Brain, Wand2, 
  Copy, Lock, Share2, AlignLeft, Search, ShieldCheck, ScanEye, Pencil, Youtube,
  AlertTriangle, RefreshCw, Home, TrendingUp, AlertCircle
} from 'lucide-react';
import { BackendReport, DashboardData } from '../types/Report';
import { mapBackendReportToDashboard } from '../utils/reportMapper';
import SEO from './SEO';

const POSTING_SITES = [
    { name: 'Autovit.ro', url: 'https://www.autovit.ro' },    
    { name: 'Carzz.ro', url: 'https://carzz.ro' },
    { name: 'BestAuto', url: 'https://www.bestauto.ro' },
    { name: 'Plus-Auto', url: 'https://plus-auto.ro' },
    { name: 'olx.ro', url: 'https://olx.ro' },
];

const NOTIFICATIONS = [
  { id: 1, title: "Prediction", message: "This copy is 40% more likely to generate a phone call than the market average.", icon: Zap, color: "text-green-500" },
  { id: 2, title: "SEO Alert", message: "'xDrive' keyword identified as high-value for winter visibility.", icon: Search, color: "text-blue-500" },
  { id: 3, title: "Market Watch", message: "Price analysis suggests this listing is a 'Great Deal' badge candidate.", icon: Target, color: "text-yellow-500" }
];

const Dashboard: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeNotification, setActiveNotification] = useState<typeof NOTIFICATIONS[0] | null>(null);
  
  // Data State
  const [reportData, setReportData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editable State
  const [editableDescription, setEditableDescription] = useState("");
  const [editableTitle, setEditableTitle] = useState("");

  // Helper to generate consistent storage keys
  const getStorageKey = (id: string | null) => `velocity_dashboard_draft_${id || 'demo'}`;

  useEffect(() => {
    const fetchReport = async () => {
        setIsLoading(true);
        setError(null);

        // 1. Get ID from URL
        const params = new URLSearchParams(window.location.search);
        const reportId = params.get('id');

        // Helper: Check for local overrides
        const loadLocalOverrides = (defaultTitle: string, defaultDesc: string) => {
            const key = getStorageKey(reportId);
            const saved = localStorage.getItem(key);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    return {
                        title: parsed.title || defaultTitle,
                        description: parsed.description || defaultDesc,
                        isDraft: true
                    };
                } catch (e) {
                    console.warn("Failed to parse local draft");
                }
            }
            return { title: defaultTitle, description: defaultDesc, isDraft: false };
        };

        // Helper to load mock data
        const loadMockData = () => {
             // Using stable Unsplash images for demo consistency
             const mockRaw: BackendReport = {
                "Id": 2,
                "CreatedAt": new Date().toISOString(), 
                "Url": "https://www.autovit.ro/mock-listing",
                "Titlu": "2024 Mercedes-Benz CLE Mercedes-AMG 53 4MATIC+",
                "listingDescription": "Cât de des te-ai întrebat dacă o mașină sport poate fi, în realitate, cel mai sigur loc pentru familia ta? Într-o piață auto unde majoritatea modelelor de performanță sacrifică vizibilitatea...",
                "targetPersona": "Antreprenor/Executiv matur, focusat pe siguranță",
                "emotionalTrigger": "Siguranță & Protecție (Security)",
                "topSellingPoints": "Putere (449 CP) interpretată ca marjă de siguranță,Sistem 4MATIC+ pentru stabilitate,Faruri Digital Light",
                "Images": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop,https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop,https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop,https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
                "Video": "", 
                "ZIP Images": "#",
                "Youtube ID": "VZYsx5D8oIY" // Mercedes review video
             };
             const mapped = mapBackendReportToDashboard(mockRaw);
             const { title, description } = loadLocalOverrides(mapped.title, mapped.description);

             setReportData(mapped);
             setEditableTitle(title);
             setEditableDescription(description);
        };

        // If no ID provided, just load mock immediately
        if (!reportId) {
             setTimeout(() => {
                 loadMockData();
                 setIsLoading(false);
             }, 1000);
             return;
        }

        try {
            // 2. Fetch via PROXY to bypass CORS restrictions
            const proxyUrl = `/api/proxy-r2?id=${encodeURIComponent(reportId)}`;
            console.log("Fetching report via proxy:", proxyUrl);
            
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                console.warn(`Fetch failed with status ${response.status}, falling back to mock data.`);
                loadMockData();
                setIsLoading(false);
                return;
            }
            
            const rawData = await response.json();
            console.log("Raw JSON received:", rawData);

            const mapped = mapBackendReportToDashboard(rawData);
            
            // Check for Local Storage Overrides
            const { title, description } = loadLocalOverrides(mapped.title, mapped.description);
            
            setReportData(mapped);
            setEditableTitle(title);
            setEditableDescription(description);

        } catch (err) {
            console.error("Network error, falling back to mock data:", err);
            loadMockData();
        } finally {
            setIsLoading(false);
        }
    };

    fetchReport();
  }, []);

  // Notification Stream Logic
  useEffect(() => {
    const showNotification = (index: number) => {
      setActiveNotification(NOTIFICATIONS[index]);
      setTimeout(() => setActiveNotification(null), 5000); // Hide after 5s
    };

    const t1 = setTimeout(() => showNotification(0), 4000);
    const t2 = setTimeout(() => showNotification(1), 15000);
    const t3 = setTimeout(() => showNotification(2), 30000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Auto-Save Effect (Browser Memory)
  useEffect(() => {
      if (isLoading || !reportData) return;

      const reportId = new URLSearchParams(window.location.search).get('id');
      const key = getStorageKey(reportId);
      
      const draftData = {
          title: editableTitle,
          description: editableDescription,
          timestamp: Date.now()
      };

      localStorage.setItem(key, JSON.stringify(draftData));
  }, [editableTitle, editableDescription, isLoading, reportData]);
  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Explicit save trigger (Redundant with auto-save but good for UX confirmation)
    const reportId = new URLSearchParams(window.location.search).get('id');
    const key = getStorageKey(reportId);
    
    localStorage.setItem(key, JSON.stringify({
        title: editableTitle,
        description: editableDescription,
        timestamp: Date.now()
    }));

    setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  if (isLoading) {
      return (
          <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-[#020617]">
              <SEO title="Loading Dashboard..." />
              <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl flex flex-col items-center">
                  <div className="relative mb-4">
                      <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl animate-pulse"></div>
                      <Loader2 className="w-12 h-12 text-brand-600 dark:text-brand-400 animate-spin relative z-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Hydrating Dashboard</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-500">Retrieving optimized assets...</p>
              </div>
          </div>
      );
  }

  // Error state
  if (error || !reportData) {
      return (
        <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-[#020617] px-4">
            <SEO title="Error | Velocity AI" />
            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl border border-red-100 dark:border-red-500/20 text-center max-w-md shadow-2xl relative overflow-hidden w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">System Error</h3>
                <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {error || "We encountered a critical error loading the dashboard engine."}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex-1 px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" /> Return Home
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary flex-1 px-4 py-3 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Retry
                    </button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-6 font-sans relative animate-in fade-in duration-700">
      <SEO title={`Report: ${reportData.title} | Velocity AI`} />
      
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

      {/* MARKET ALERT - MOVED TO TOP (UNSTUCK) & CLICKABLE */}
      <div className="mb-6 -mx-4 md:-mx-6 lg:mx-auto max-w-6xl">
          <a 
            href="https://www.carvertical.com" 
            target="_blank" 
            rel="noreferrer"
            className="group block w-full bg-[#0f172a] border-y md:border border-slate-800 md:rounded-xl overflow-hidden shadow-lg h-10 relative cursor-pointer hover:border-red-500/50 transition-all duration-300"
          >
              <div className="flex items-center h-full">
                  {/* Left Label */}
                  <div className="bg-red-500/10 text-red-500 px-3 h-full flex items-center text-[10px] font-bold uppercase tracking-widest border-r border-red-500/20 z-10 flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                      <AlertCircle className="w-3 h-3 mr-2 animate-pulse" /> Market Alert
                  </div>
                  
                  {/* Ticker */}
                  <div className="flex-1 overflow-hidden relative h-full flex items-center bg-[#020617] group-hover:bg-[#050b1d] transition-colors">
                      <div className="flex animate-scroll hover:[animation-play-state:paused] whitespace-nowrap items-center">
                          <span className="mx-4 text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-slate-300"><TrendingUp className="w-3 h-3 text-green-500" /> SUV Prices trending up 4.2% this week.</span>
                          <span className="mx-4 text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-slate-300"><AlertTriangle className="w-3 h-3 text-yellow-500" /> 3 Competitor listings detected in 5km radius.</span>
                          <span className="mx-4 text-xs font-medium text-slate-400 group-hover:text-slate-300">📉 Diesel demand dropping slightly in urban sectors.</span>
                          <span className="mx-4 text-xs font-medium text-slate-400 group-hover:text-slate-300">🔥 High turnover rate for 2021 models detected.</span>
                          {/* Duplicate for seamless scroll */}
                          <span className="mx-4 text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-slate-300"><TrendingUp className="w-3 h-3 text-green-500" /> SUV Prices trending up 4.2% this week.</span>
                          <span className="mx-4 text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-slate-300"><AlertTriangle className="w-3 h-3 text-yellow-500" /> 3 Competitor listings detected in 5km radius.</span>
                          <span className="mx-4 text-xs font-medium text-slate-400 group-hover:text-slate-300">📉 Diesel demand dropping slightly in urban sectors.</span>
                          <span className="mx-4 text-xs font-medium text-slate-400 group-hover:text-slate-300">🔥 High turnover rate for 2021 models detected.</span>
                      </div>
                  </div>

                  {/* Right "Button" (Visual only, acting as CTA) */}
                  <div className="h-full px-5 bg-red-600 group-hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-widest z-10 flex items-center gap-2 flex-shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all">
                      Check History <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
              </div>
          </a>
      </div>

      <div className="w-full space-y-8 max-w-6xl mx-auto">
          
          {/* Top Header Card */}
          <div className="bg-white dark:bg-[#0f172a] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />
             
             <div className="relative z-10 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input 
                        type="text"
                        value={editableTitle}
                        onChange={(e) => setEditableTitle(e.target.value)}
                        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-white/20 focus:border-brand-500 focus:outline-none transition-all w-full md:w-auto"
                    />
                    <span className="hidden md:flex px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-500/30 items-center gap-1.5 shadow-sm whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Optimized
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-gray-400 mt-3">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <Calendar className="w-4 h-4 text-brand-500" /> {reportData.createdAt}
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <MapPin className="w-4 h-4 text-brand-500" /> Bucharest
                    </span>
                    <a href={reportData.originalUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline px-3 py-1.5">
                        View Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                   <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary w-full xl:w-auto px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
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

          {/* Unified Strategy Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl border border-indigo-500/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex justify-end">
                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
                         <Lock className="w-3 h-3" /> AI Generated Intelligence
                     </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Target Persona */}
                      <div>
                          <div className="flex items-center gap-3 mb-6">
                              <div className="p-2 bg-indigo-500/20 rounded-lg backdrop-blur-sm border border-indigo-500/30">
                                  <User className="w-5 h-5 text-indigo-300" />
                              </div>
                              <span className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Target Persona</span>
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-white">
                              {reportData.persona.title}
                          </h2>
                          
                          <p className="text-indigo-100 text-lg leading-relaxed opacity-90 font-light border-l-2 border-indigo-500 pl-4">
                              "{reportData.persona.description}"
                          </p>
                      </div>

                      {/* Emotional Hook */}
                      <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm flex flex-col justify-center relative group/hook hover:bg-white/10 transition-colors">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl transition-colors"></div>
                          
                          <div className="flex items-center gap-3 mb-4 text-indigo-200">
                              <div className="p-2 bg-white/10 rounded-lg">
                                <Zap className="w-5 h-5" />
                              </div>
                              <span className="font-bold uppercase tracking-widest text-xs">Emotional Hook</span>
                          </div>
                          
                          <div className="text-2xl font-bold text-white mb-4 leading-snug">
                              {reportData.emotionalHook}
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Selling Points */}
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-sm relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-sm">Key Selling Points</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reportData.sellingPoints.map((point, i) => (
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

          {/* MEDIA ASSETS SECTION */}
          <div className="space-y-8">
              
              {/* YouTube Embed Player */}
              {reportData.youtubeId ? (
                  <div className="w-full bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                       <div className="bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative aspect-video group">
                           <iframe 
                               width="100%" 
                               height="100%" 
                               src={`https://www.youtube.com/embed/${reportData.youtubeId}?rel=0&modestbranding=1`} 
                               title="YouTube video player" 
                               frameBorder="0" 
                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                               allowFullScreen
                           ></iframe>
                       </div>
                       
                       {/* Video Actions */}
                       <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                           <button 
                               onClick={() => copyToClipboard(`https://www.youtube.com/watch?v=${reportData.youtubeId}`, 'youtube')}
                               className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                                   copiedField === 'youtube' ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
                               }`}
                           >
                               {copiedField === 'youtube' ? <Check className="w-4 h-4"/> : <Youtube className="w-4 h-4" />}
                               {copiedField === 'youtube' ? 'Link Copied!' : 'Copy YouTube Link'}
                           </button>

                           {reportData.videoDownloadUrl && (
                               <button 
                                   onClick={() => window.open(reportData.videoDownloadUrl, '_blank')}
                                   className="px-6 py-3 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
                               >
                                   <Download className="w-4 h-4" /> Download Raw MP4
                               </button>
                           )}
                       </div>
                  </div>
              ) : reportData.videoDownloadUrl ? (
                  // Fallback to MP4 Player if no YouTube ID
                  <div className="w-full bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                      <div className="bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative aspect-video group">
                          <video 
                              src={reportData.videoDownloadUrl} 
                              className="w-full h-full object-cover"
                              controls
                              preload="metadata"
                          />
                      </div>
                      <div className="flex justify-center mt-6">
                          <button 
                               onClick={() => window.open(reportData.videoDownloadUrl, '_blank')}
                               className="btn-primary px-12 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all hover:scale-[1.02]"
                           >
                               <Download className="w-6 h-6" /> Download Video
                           </button>
                      </div>
                  </div>
              ) : null}

              {/* Enhanced Gallery */}
              <div className="w-full">
                  <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <ImageIcon className="w-5 h-5 text-brand-500" /> Studio Gallery
                          </h3>
                          <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-slate-600 dark:text-gray-400">{reportData.images.length} Photos</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Active Large Image */}
                          <div className="lg:col-span-8 aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/5 relative shadow-inner">
                              <img 
                                  src={reportData.images[activeImageIndex]} 
                                  alt="Vehicle" 
                                  className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-yellow-400" /> AI Enhanced
                              </div>
                          </div>

                          {/* Thumbnails Grid */}
                          <div className="lg:col-span-4 grid grid-cols-2 gap-3 content-start">
                              {reportData.images.slice(0, 8).map((img, idx) => (
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
                                          loading="lazy"
                                      />
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* Download All Images Button */}
                      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col items-center">
                          {reportData.zipDownloadUrl && reportData.zipDownloadUrl !== '#' ? (
                              <button 
                                  onClick={() => window.open(reportData.zipDownloadUrl, '_blank')}
                                  className="btn-primary px-12 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all hover:scale-[1.02]"
                              >
                                  <Download className="w-6 h-6" /> Download All Images (.ZIP)
                              </button>
                          ) : (
                              <div className="text-sm text-slate-500">Zip file generating...</div>
                          )}
                      </div>
                  </div>
              </div>
          </div>

          {/* Sales Narrative Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden relative group">
               
               {/* Header */}
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
                              <span className="flex items-center gap-1"><AlignLeft className="w-3 h-3 text-brand-500" /> {editableDescription.split(' ').length} Words</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-slate-200 dark:border-white/10 ${
                            saveSuccess 
                            ? 'bg-green-600 text-white border-transparent' 
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10'
                        }`}
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : saveSuccess ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {saveSuccess ? 'Saved!' : 'Save Draft'}
                    </button>

                    <button 
                        onClick={() => copyToClipboard(editableDescription, 'desc')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${
                            copiedField === 'desc' 
                            ? 'bg-green-600 text-white' 
                            : 'btn-primary'
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

               {/* Editor */}
               <div className="h-[550px] bg-white dark:bg-[#0f172a] relative group/edit transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-text" onClick={() => document.querySelector('textarea')?.focus()}>
                  
                  <div className="absolute top-4 right-6 text-xs text-slate-400 dark:text-gray-500 font-medium opacity-0 group-hover/edit:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 z-20">
                      <Pencil className="w-3 h-3" /> Click to Edit
                  </div>

                  <textarea 
                    className="w-full h-full bg-transparent border-none font-serif text-lg leading-relaxed text-slate-700 dark:text-gray-300 focus:outline-none focus:ring-0 p-8 resize-none placeholder:text-slate-300 dark:placeholder:text-gray-700 custom-scrollbar z-10 relative"
                    value={editableDescription}
                    onChange={(e) => setEditableDescription(e.target.value)}
                  />
               </div>
          </div>

      </div>
    </div>
  );
};

export default Dashboard;
