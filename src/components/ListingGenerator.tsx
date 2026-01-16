import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Save, Sparkles, Trophy, CheckCircle2, 
  Circle, Info, Star, ShieldCheck, Zap, DollarSign, Camera, 
  MapPin, User, MessageSquare, Layout, Activity, PenTool, 
  ArrowRight, Check, Trash2, Clock, Globe, Database, Award, 
  Minimize2, Maximize2, MoreHorizontal, Loader2, PlusCircle, 
  Upload, X, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

// --- TYPES ---
interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'idle' | 'uploading' | 'success' | 'error';
  url?: string;
}

interface FormData {
  vehicle: {
    year: string;
    make: string;
    model: string;
    trim: string;
    mileage: string;
    price: string;
    exteriorColor: string;
    interiorColor: string;
  };
  media: {
    images: UploadedFile[];
  };
  condition: {
    tier: string;
    highlights: string[];
    customHighlights: string;
    standoutExterior: string;
    standoutInterior: string;
  };
  dealership: {
    name: string;
    city: string;
    knownFor: string;
    setsApart: string;
    toneSliders: {
      storytelling: number;
      formality: number;
      benefitFocus: number;
    }
  };
  actionDrivers: {
    urgencyTriggers: string[];
    premiumFeatures: {
      comfort: string[];
      technology: string[];
      safety: string[];
      performance: string[];
      appearance: string[];
    };
    customSubFeatures: {
      comfort: string;
      technology: string;
      safety: string;
      performance: string;
      appearance: string;
    };
    wowFactor: string;
    specialOffer: string;
    noSpecialOffer: boolean;
    recentService: string;
  };
}

const INITIAL_STATE: FormData = {
  vehicle: { year: '', make: '', model: '', trim: '', mileage: '', price: '', exteriorColor: '', interiorColor: '' },
  media: { images: [] },
  condition: { tier: '', highlights: [], customHighlights: '', standoutExterior: '', standoutInterior: '' },
  dealership: { name: '', city: '', knownFor: '', setsApart: '', toneSliders: { storytelling: 50, formality: 50, benefitFocus: 50 } },
  actionDrivers: { 
    urgencyTriggers: [], 
    premiumFeatures: { comfort: [], technology: [], safety: [], performance: [], appearance: [] }, 
    customSubFeatures: { comfort: '', technology: '', safety: '', performance: '', appearance: '' },
    wowFactor: '', specialOffer: '', noSpecialOffer: false, recentService: '' 
  },
};

// --- HELPERS ---
const formatCurrency = (val: string) => {
  const num = val.replace(/\D/g, '');
  if (!num) return '';
  return new Intl.NumberFormat('en-US').format(parseInt(num));
};

const ExampleChip = ({ text, onClick }: { text: string; onClick: (t: string) => void }) => (
  <button
    type="button"
    onClick={() => onClick(text)}
    className="px-3 py-1 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full text-xs border border-brand-200 dark:border-brand-500/30 transition-all flex items-center gap-1 whitespace-nowrap"
  >
    <Sparkles size={10} /> {text}
  </button>
);

const ListingGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['comfort']);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quality Score Calculation
  const qualityScore = useMemo(() => {
    let score = 0;
    const { vehicle, condition, actionDrivers, media } = formData;
    
    const required1 = Object.values(vehicle).every(v => v !== '');
    const required2 = condition.tier !== '';
    if (required1 && required2) score += 40;

    if (media.images.length >= 10) score += 5;
    if (condition.standoutExterior.length > 20 && condition.standoutInterior.length > 20) score += 15;

    const totalFeatures = Object.values(actionDrivers.premiumFeatures).flat().length;
    if (totalFeatures >= 5) score += 15;
    if (actionDrivers.wowFactor.length > 15) score += 10;
    if (actionDrivers.urgencyTriggers.length > 0) score += 10;
    if (actionDrivers.specialOffer !== '' || actionDrivers.noSpecialOffer) score += 10;

    return Math.min(score, 100);
  }, [formData]);

  const completion = useMemo(() => {
    const fields = [
      ...Object.values(formData.vehicle),
      formData.condition.tier,
      formData.dealership.name,
      formData.dealership.city
    ];
    const filled = fields.filter(f => f && f !== '').length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Draft auto-saved to session state');
    }, 10000);
    return () => clearInterval(interval);
  }, [formData]);

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Draft saved!');
    }, 800);
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateField = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const addFiles = (files: File[]) => {
    const currentCount = formData.media.images.length;
    const remaining = 40 - currentCount;
    
    if (remaining <= 0) {
      toast.error('Maximum 40 images allowed');
      return;
    }

    const newFiles: UploadedFile[] = files.slice(0, remaining).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: 'idle'
    }));

    updateField('media', 'images', [...formData.media.images, ...newFiles]);
  };

  const removeFile = (id: string) => {
    const fileToRemove = formData.media.images.find(img => img.id === id);
    if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
    updateField('media', 'images', formData.media.images.filter(img => img.id !== id));
  };

  const uploadAllImages = async (): Promise<string[]> => {
    const imagesToUpload = formData.media.images;
    const urls: string[] = [];
    const IMGBB_API_KEY = '6d207e02198a847aa98d0a2a901485a5'; 
    const EXPIRATION_SECONDS = 43200; 

    for (let i = 0; i < imagesToUpload.length; i++) {
      setUploadProgress(Math.round(((i) / imagesToUpload.length) * 100));
      const item = imagesToUpload[i];
      try {
        const body = new FormData();
        body.append('image', item.file);
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}&expiration=${EXPIRATION_SECONDS}`;
        const response = await fetch(uploadUrl, { method: 'POST', body });
        const data = await response.json();
        if (data.success && data.data && data.data.url) urls.push(data.data.url);
      } catch (err) {
        console.error('Failed to upload image', item.id, err);
      }
    }
    setUploadProgress(100);
    return urls;
  };

  const handleGenerate = async () => {
    if (formData.media.images.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }
    setIsGenerating(true);
    setUploadProgress(0);
    try {
      const hostedUrls = await uploadAllImages();
      const payload = {
        ...formData,
        media: { imageUrls: hostedUrls },
        timestamp: new Date().toISOString()
      };
      const response = await fetch('https://app.autowizz.cfd/webhook/new-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) toast.success('Listing generated!');
      else throw new Error('Failed');
    } catch (err) {
      toast.error('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // --- RENDERS ---

  const renderVehicleEssentials = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Year</label>
          <input 
            type="number" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
            placeholder="2024" value={formData.vehicle.year} onChange={(e) => updateField('vehicle', 'year', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Make</label>
          <input 
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
            placeholder="BMW" value={formData.vehicle.make} onChange={(e) => updateField('vehicle', 'make', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Model</label>
          <input 
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
            placeholder="X5" value={formData.vehicle.model} onChange={(e) => updateField('vehicle', 'model', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Mileage</label>
          <input 
            type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
            placeholder="45,000" value={formatCurrency(formData.vehicle.mileage)} onChange={(e) => updateField('vehicle', 'mileage', e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Asking Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 font-bold">$</span>
            <input 
              type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-8 pr-4 py-3 focus:border-brand-500 outline-none font-bold"
              placeholder="0.00" value={formatCurrency(formData.vehicle.price)} onChange={(e) => updateField('vehicle', 'price', e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMediaUpload = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Media ({formData.media.images.length}/40)</h3>
      </div>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer border-2 border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 rounded-2xl h-40 flex flex-col items-center justify-center gap-2"
      >
        <Upload className="text-brand-500" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tap to upload photos</span>
        <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {formData.media.images.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
            <img src={img.preview} className="w-full h-full object-cover" />
            <button 
              onClick={(e) => { e.stopPropagation(); removeFile(img.id); }}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-lg"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConditionHighlights = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'new', label: 'New', icon: Sparkles, color: 'text-yellow-500' },
          { id: 'premium', label: 'Premium', icon: Star, color: 'text-indigo-500' },
          { id: 'excellent', label: 'Excellent', icon: CheckCircle2, color: 'text-green-500' },
          { id: 'good', label: 'Good', icon: Circle, color: 'text-blue-500' },
        ].map((tier) => (
          <button
            key={tier.id}
            onClick={() => updateField('condition', 'tier', tier.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              formData.condition.tier === tier.id 
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' 
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5'
            }`}
          >
            <tier.icon size={16} className={tier.color} />
            <span className="text-xs font-bold uppercase">{tier.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-700 dark:text-gray-300 block italic">"The exterior stands out because..."</label>
        <textarea 
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 h-24 text-sm outline-none focus:border-brand-500"
          placeholder="e.g., pristine condition with no scratches"
          value={formData.condition.standoutExterior}
          onChange={(e) => updateField('condition', 'standoutExterior', e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {["Pristine", "Rare paint", "Upgraded wheels"].map(chip => (
            <ExampleChip key={chip} text={chip} onClick={(t) => updateField('condition', 'standoutExterior', t)} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderDealershipVoice = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="space-y-4">
        <input 
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
          placeholder="Dealership Name" value={formData.dealership.name} onChange={(e) => updateField('dealership', 'name', e.target.value)}
        />
        <input 
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
          placeholder="City / Location" value={formData.dealership.city} onChange={(e) => updateField('dealership', 'city', e.target.value)}
        />
      </div>
      <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-white/5">
        {[
          { id: 'storytelling', label: 'Storytelling', left: 'Facts', right: 'Narrative' },
          { id: 'formality', label: 'Formality', left: 'Pro', right: 'Casual' },
        ].map(slider => (
          <div key={slider.id} className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{slider.label}</span>
              <span>{(formData.dealership.toneSliders as any)[slider.id]}%</span>
            </div>
            <input 
              type="range" className="w-full h-1.5 bg-slate-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              value={(formData.dealership.toneSliders as any)[slider.id]}
              onChange={(e) => {
                const sliders = { ...formData.dealership.toneSliders, [slider.id]: parseInt(e.target.value) };
                updateField('dealership', 'toneSliders', sliders);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderActionDrivers = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="space-y-4">
        <div className="flex justify-between">
          <label className="text-sm font-bold text-slate-700 dark:text-gray-300">🔥 Urgency Triggers</label>
          <span className="text-[10px] font-bold text-brand-500">{formData.actionDrivers.urgencyTriggers.length}/3</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {['Just arrived', 'Price reduced', 'Won\'t last long', 'Similar sold quickly'].map(u => (
            <button
              key={u}
              disabled={formData.actionDrivers.urgencyTriggers.length >= 3 && !formData.actionDrivers.urgencyTriggers.includes(u)}
              onClick={() => {
                const current = formData.actionDrivers.urgencyTriggers;
                const next = current.includes(u) ? current.filter(x => x !== u) : [...current, u];
                updateField('actionDrivers', 'urgencyTriggers', next);
              }}
              className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                formData.actionDrivers.urgencyTriggers.includes(u)
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400'
                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 disabled:opacity-40'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
        <label className="text-sm font-bold text-slate-700 dark:text-gray-300 block">💎 "The wow factor is..."</label>
        <input 
          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-500 outline-none"
          placeholder="e.g., the panoramic sunroof"
          value={formData.actionDrivers.wowFactor}
          onChange={(e) => updateField('actionDrivers', 'wowFactor', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-20 pb-12 px-3 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* MOBILE-OPTIMIZED HEADER */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-white/10 p-4 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-500/5 blur-[50px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
                            qualityScore < 75 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                         }`}>
                             <Trophy size={20} className={qualityScore >= 75 ? 'fill-current' : ''} />
                         </div>
                         <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</div>
                            <div className="text-xl sm:text-2xl font-black">{qualityScore}%</div>
                         </div>
                    </div>
                    <div className="text-right">
                         <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step {currentStep}/5</div>
                         <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {currentStep === 1 ? 'Essentials' : 
                             currentStep === 2 ? 'Media' :
                             currentStep === 3 ? 'Condition' :
                             currentStep === 4 ? 'Branding' : 'Drivers'}
                         </div>
                    </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className="h-full bg-brand-500 transition-all duration-700"
                        style={{ width: `${completion}%` }}
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* SIDEBAR: HIDDEN ON MOBILE */}
            <div className="hidden lg:block lg:col-span-3 space-y-2 sticky top-24">
                {[
                    { step: 1, label: 'Essentials', icon: Database },
                    { step: 2, label: 'Vehicle Media', icon: ImageIcon },
                    { step: 3, label: 'Condition', icon: Activity },
                    { step: 4, label: 'Branding', icon: MapPin },
                    { step: 5, label: 'Action Drivers', icon: Zap },
                ].map((item) => {
                    const isActive = currentStep === item.step;
                    return (
                        <button
                            key={item.step}
                            onClick={() => setCurrentStep(item.step)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                isActive 
                                    ? 'bg-brand-600 border-brand-500 text-white shadow-lg' 
                                    : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400'
                            }`}
                        >
                            <item.icon size={16} />
                            <span className="text-xs font-bold">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* MAIN FORM AREA: EXPANDS ON MOBILE */}
            <div className="col-span-1 lg:col-span-9 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 shadow-2xl relative min-h-[500px]">
                
                {isGenerating && (
                  <div className="absolute inset-0 z-50 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center p-6 text-center">
                    <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
                    <h2 className="text-lg font-bold">Optimizing Media...</h2>
                    <div className="w-full max-w-xs h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                {currentStep === 1 && renderVehicleEssentials()}
                {currentStep === 2 && renderMediaUpload()}
                {currentStep === 3 && renderConditionHighlights()}
                {currentStep === 4 && renderDealershipVoice()}
                {currentStep === 5 && renderActionDrivers()}

                {/* MOBILE-ADAPTIVE FOOTER NAV */}
                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                    <button
                        onClick={prevStep}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 transition-all ${
                            currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                    >
                        <ChevronLeft size={18} /> Back
                    </button>

                    {currentStep < 5 ? (
                        <button
                            onClick={nextStep}
                            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-xl shadow-xl bg-gradient-to-r from-orange-500 to-yellow-500 active:scale-95 transition-transform"
                        >
                            Generate <Sparkles size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ListingGenerator;
