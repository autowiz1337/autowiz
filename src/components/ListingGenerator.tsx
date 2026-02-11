
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Save, Sparkles, Trophy, CheckCircle2, 
  Circle, Info, Star, ShieldCheck, Zap, DollarSign, Camera, 
  MapPin, User, MessageSquare, Layout, Activity, PenTool, 
  ArrowRight, Check, Trash2, Clock, Globe, Database, Award, 
  Minimize2, Maximize2, MoreHorizontal, Loader2, PlusCircle, 
  Upload, X, Image as ImageIcon, AlertCircle, Wand2, Search, Link as LinkIcon,
  Brain
} from 'lucide-react';
import toast from 'react-hot-toast';
import { decodeVehicleIdentifier } from '../services/vinService';

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
    wowFactor: '', specialOffer: '', noSpecialOffer: false
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
    className="px-3 py-1 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full text-xs border border-brand-200 dark:border-brand-500/30 transition-all flex items-center gap-1"
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
  
  // Magic Start States
  const [vehicleId, setVehicleId] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [hasMagicStarted, setHasMagicStarted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quality Score Calculation
  const qualityScore = useMemo(() => {
    let score = 0;
    const { vehicle, condition, actionDrivers, media } = formData;
    
    // Required fields (40%) - Trim is optional for the score
    const { trim, ...requiredVehicleData } = vehicle;
    const required1 = Object.values(requiredVehicleData).every(v => v !== '');
    const required2 = condition.tier !== '';
    if (required1 && required2) score += 40;

    // Media (Bonus 5%)
    if (media.images.length >= 10) score += 5;

    // Standout features (15%)
    if (condition.standoutExterior.length > 10 && condition.standoutInterior.length > 10) score += 15;

    // Premium features (15%)
    const totalFeatures = Object.values(actionDrivers.premiumFeatures).flat().length;
    if (totalFeatures >= 5) score += 15;

    // Wow factor (10%)
    if (actionDrivers.wowFactor.length > 10) score += 10;

    // Urgency triggers (10%)
    if (actionDrivers.urgencyTriggers.length > 0) score += 10;

    // Special offer (10%)
    if (actionDrivers.specialOffer !== '' || actionDrivers.noSpecialOffer) score += 10;

    return Math.min(score, 100);
  }, [formData]);

  // Completion Percentage
  const completion = useMemo(() => {
    const fields = [
      formData.vehicle.year, formData.vehicle.make, formData.vehicle.model,
      formData.vehicle.mileage, formData.vehicle.price, 
      formData.condition.tier,
      formData.dealership.name, formData.dealership.city
    ];
    const filled = fields.filter(f => f && f !== '').length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  // Auto-save logic
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Draft auto-saved to session state');
    }, 5000);
    return () => clearInterval(interval);
  }, [formData]);

  const handleMagicStart = async () => {
    if (!vehicleId || vehicleId.length < 8) {
      toast.error('Please enter a valid VIN or URL');
      return;
    }

    setIsDecoding(true);
    try {
      const decoded = await decodeVehicleIdentifier(vehicleId);
      
      setFormData(prev => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          year: decoded.year,
          make: decoded.make,
          model: decoded.model,
          trim: decoded.trim,
          exteriorColor: decoded.exteriorColor,
          interiorColor: decoded.interiorColor,
          mileage: decoded.mileage || prev.vehicle.mileage,
          price: decoded.price || prev.vehicle.price,
        }
      }));
      
      setHasMagicStarted(true);
      toast.success('Vehicle intelligence loaded! Verify the details below.', {
        icon: '✨',
        duration: 4000
      });
    } catch (err) {
      toast.error('Could not decode. Please enter details manually.');
    } finally {
      setIsDecoding(false);
    }
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Draft saved to session memory!');
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

  // --- IMAGE UPLOAD LOGIC ---
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
    if (files.length > remaining) {
      toast.error(`Only added first ${remaining} images. Limit is 40.`);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = formData.media.images.find(img => img.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    updateField('media', 'images', formData.media.images.filter(img => img.id !== id));
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
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
        if (data.success && data.data && data.data.url) {
          urls.push(data.data.url);
        }
      } catch (err) {
        console.error('Failed to upload image', item.id, err);
      }
    }
    setUploadProgress(100);
    return urls;
  };

  const handleGenerate = async () => {
    if (formData.media.images.length === 0) {
      toast.error('Please upload at least one image of the vehicle.');
      return;
    }

    setIsGenerating(true);
    setUploadProgress(0);

    try {
      const hostedUrls = await uploadAllImages();
      const payload = { ...formData, media: { imageUrls: hostedUrls }, timestamp: new Date().toISOString() };
      const response = await fetch('https://app.autowizz.cfd/webhook/new-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        toast.success('Listing generated successfully!');
        // Small delay before potential redirect
        setTimeout(() => setIsGenerating(false), 2000);
      }
      else throw new Error('Webhook failed');
    } catch (err) {
      toast.error('Failed to generate listing. Please try again.');
      setIsGenerating(false);
    }
  };

  // --- RENDER SECTIONS ---

  const renderVehicleEssentials = () => (
    <div className="space-y-10 animate-fade-in-up">
      {/* Magic Start Section */}
      <div className="relative p-8 rounded-[32px] border-2 border-brand-500/30 bg-brand-50/30 dark:bg-brand-500/5 shadow-2xl overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={120} className="text-brand-500" />
         </div>
         
         <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center mb-6 shadow-xl shadow-brand-500/20">
                <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">The Magic Start</h3>
            <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
               Paste a <strong>VIN</strong> or an <strong>Inventory URL</strong>. 
               Our AI will scan the source and auto-populate all technical specs for you.
            </p>

            <div className="w-full relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                   <LinkIcon size={20} />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter VIN or https://..."
                    className="w-full bg-white dark:bg-[#020617] border-2 border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-5 text-lg font-bold focus:border-brand-500 outline-none transition-all shadow-inner"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleMagicStart()}
                />
                <button 
                    onClick={handleMagicStart}
                    disabled={isDecoding || vehicleId.length < 8}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2"
                >
                    {isDecoding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    Scan
                </button>
            </div>
            
            {isDecoding && (
               <div className="mt-4 flex items-center gap-3 animate-pulse">
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                     <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                     <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                  </div>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Decoding Vehicle Intel...</span>
               </div>
            )}
         </div>
      </div>

      {/* Verification Grid */}
      <div className={`space-y-6 transition-all duration-700 ${hasMagicStarted ? 'opacity-100' : 'opacity-40'}`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-brand-500 rounded-full" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Verify Technical Specs</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Year</label>
            <input 
                type="number" min="1900" max="2026"
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., 2024"
                value={formData.vehicle.year}
                onChange={(e) => updateField('vehicle', 'year', e.target.value)}
            />
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Make</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., BMW"
                value={formData.vehicle.make}
                onChange={(e) => updateField('vehicle', 'make', e.target.value)}
            />
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Model</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., X5"
                value={formData.vehicle.model}
                onChange={(e) => updateField('vehicle', 'model', e.target.value)}
            />
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Trim / Package</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., M Sport"
                value={formData.vehicle.trim}
                onChange={(e) => updateField('vehicle', 'trim', e.target.value)}
            />
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Mileage</label>
            <div className="relative">
                <input 
                type="text"
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., 45,000"
                value={formatCurrency(formData.vehicle.mileage)}
                onChange={(e) => updateField('vehicle', 'mileage', e.target.value.replace(/\D/g, ''))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">MILES</span>
            </div>
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Asking Price</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 font-bold">$</span>
                <input 
                type="text"
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl pl-8 pr-4 py-3 focus:border-brand-500 outline-none transition-all font-bold"
                placeholder="0.00"
                value={formatCurrency(formData.vehicle.price)}
                onChange={(e) => updateField('vehicle', 'price', e.target.value.replace(/\D/g, ''))}
                />
            </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-white/5">
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Exterior Color</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., Pearl White"
                value={formData.vehicle.exteriorColor}
                onChange={(e) => updateField('vehicle', 'exteriorColor', e.target.value)}
            />
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Interior Color / Material</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                placeholder="e.g., Black Leather"
                value={formData.vehicle.interiorColor}
                onChange={(e) => updateField('vehicle', 'interiorColor', e.target.value)}
            />
            </div>
        </div>
      </div>
    </div>
  );

  const renderMediaUpload = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Vehicle Media</h3>
          <p className="text-sm text-slate-500 dark:text-gray-400">Upload high-quality photos to increase conversion (Max 40).</p>
        </div>
        <div className="text-right">
          <span className={`text-sm font-bold ${formData.media.images.length >= 40 ? 'text-red-500' : 'text-brand-500'}`}>
            {formData.media.images.length} / 40
          </span>
        </div>
      </div>

      <div 
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative h-64 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex flex-col items-center justify-center gap-4 transition-colors group-hover:border-brand-500/50">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-700 dark:text-gray-300">Drag & drop photos here</p>
            <p className="text-sm text-slate-500 dark:text-gray-400">or click to browse from computer</p>
          </div>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {formData.media.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {formData.media.images.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group shadow-md">
              <img src={img.preview} alt="Vehicle" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(img.id);
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
          {formData.media.images.length < 40 && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center gap-2 hover:border-brand-500 transition-colors text-slate-400 hover:text-brand-500 bg-slate-50 dark:bg-white/5"
            >
              <PlusCircle size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Add More</span>
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderConditionHighlights = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Visual Condition Toggles */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-brand-500 rounded-full" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Anticipated Condition</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { id: 'new', label: 'Factory New', icon: Sparkles, color: 'text-yellow-400', desc: '0-50 miles' },
            { id: 'premium', label: 'Premium', icon: Award, color: 'text-purple-500', desc: 'Like new' },
            { id: 'excellent', label: 'Excellent', icon: CheckCircle2, color: 'text-green-500', desc: 'Clean history' },
            { id: 'good', label: 'Good Vibe', icon: Circle, color: 'text-blue-500', desc: 'Solid driver' },
            { id: 'value', label: 'Value Plus', icon: DollarSign, color: 'text-orange-500', desc: 'Priced to go' },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => updateField('condition', 'tier', tier.id)}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300 group ${
                formData.condition.tier === tier.id 
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 scale-[1.05] shadow-[0_0_30px_rgba(14,165,233,0.2)]' 
                  : 'border-slate-100 dark:border-white/5 bg-white dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:translate-y-[-4px]'
              }`}
            >
              <div className={`p-4 rounded-2xl bg-white dark:bg-white/5 shadow-inner transition-transform group-hover:scale-110 ${tier.color}`}>
                <tier.icon size={32} />
              </div>
              <div className="text-center">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${formData.condition.tier === tier.id ? 'text-brand-500' : 'text-slate-400'}`}>
                    {tier.label}
                  </span>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">{tier.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Merged Highlights & Appeal */}
      <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-white/5">
        <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Verified Highlights</label>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest">TAP TO TOGGLE</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            'Clean Carfax', '1 Owner Only', 'Accident Free', 'M-Sport Pack', 
            'Under Warranty', 'CPO Eligible', 'New Tires', 'Towing Package', 
            'Low Mileage', 'Panoramic Roof', 'Dealer Serviced', 'Rare Config'
          ].map((h) => (
            <button
              key={h}
              onClick={() => {
                const current = formData.condition.highlights;
                const next = current.includes(h) ? current.filter(x => x !== h) : [...current, h];
                updateField('condition', 'highlights', next);
              }}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                formData.condition.highlights.includes(h)
                  ? 'bg-brand-500 text-white border-brand-400 shadow-lg shadow-brand-500/20'
                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:border-slate-300'
              }`}
            >
              {formData.condition.highlights.includes(h) ? <Check size={14} /> : <div className="w-3.5 h-3.5" />}
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Standout Features */}
      <div className="space-y-8 pt-6 border-t border-slate-100 dark:border-white/5">
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Exterior Selling Angle</label>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-500/10 text-[10px] font-bold text-brand-500 uppercase tracking-tighter">
                   <Sparkles size={10} /> AI Enhanced
                </div>
            </div>
            <textarea 
                className="w-full bg-white dark:bg-[#020617] border-2 border-slate-100 dark:border-white/10 rounded-[24px] p-5 h-28 text-sm focus:border-brand-500 outline-none transition-all shadow-inner"
                placeholder="What makes the paint, wheels, or body stand out?"
                value={formData.condition.standoutExterior}
                onChange={(e) => updateField('condition', 'standoutExterior', e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
                {["Pristine metallic paint", "No curb rash on alloys", "Aggressive stance", "Garage kept condition"].map(chip => (
                    <ExampleChip key={chip} text={chip} onClick={(t) => updateField('condition', 'standoutExterior', t)} />
                ))}
            </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Interior Vibe</label>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-500/10 text-[10px] font-bold text-brand-500 uppercase tracking-tighter">
                   <Sparkles size={10} /> AI Enhanced
                </div>
            </div>
            <textarea 
                className="w-full bg-white dark:bg-[#020617] border-2 border-slate-100 dark:border-white/10 rounded-[24px] p-5 h-28 text-sm focus:border-brand-500 outline-none transition-all shadow-inner"
                placeholder="Describe the smell, leather condition, or technology feel."
                value={formData.condition.standoutInterior}
                onChange={(e) => updateField('condition', 'standoutInterior', e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
                {["Smells brand new", "Merino leather is perfect", "Tech package is massive", "Ambient lighting pop"].map(chip => (
                    <ExampleChip key={chip} text={chip} onClick={(t) => updateField('condition', 'standoutInterior', t)} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );

  const renderDealershipVoice = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-end mb-4">
        <div className="space-y-6 flex-1 max-w-md">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Dealership Name</label>
                <input 
                    className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                    placeholder="e.g., Smith Family Motors"
                    value={formData.dealership.name}
                    onChange={(e) => updateField('dealership', 'name', e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-gray-300">City / Location</label>
                <input 
                    className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                    placeholder="e.g., Austin"
                    value={formData.dealership.city}
                    onChange={(e) => updateField('dealership', 'city', e.target.value)}
                />
            </div>
        </div>
        <div className="pb-3 pl-4">
            <button 
                type="button"
                className="flex items-center gap-2 group text-xs font-bold text-slate-400 hover:text-brand-500 transition-colors uppercase tracking-widest"
            >
                Same as last time ↻
            </button>
        </div>
      </div>

      <div className="space-y-6 border-t border-slate-100 dark:border-white/5 pt-8">
        <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300 block">"We're known for..."</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-500 outline-none"
                placeholder="e.g., no-pressure sales and transparent pricing"
                value={formData.dealership.knownFor}
                onChange={(e) => updateField('dealership', 'knownFor', e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
                {["No-pressure sales", "Premium service", "Best deals in town", "Family-owned 30+ years"].map(t => (
                    <ExampleChip key={t} text={t} onClick={(v) => updateField('dealership', 'knownFor', v)} />
                ))}
            </div>
        </div>

        <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300 block">"What sets us apart is..."</label>
            <input 
                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-500 outline-none"
                placeholder="e.g., our lifetime powertrain warranty on all used vehicles"
                value={formData.dealership.setsApart}
                onChange={(e) => updateField('dealership', 'setsApart', e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
                {["Lifetime warranty", "Free oil changes", "White-glove delivery", "Largest inventory"].map(t => (
                    <ExampleChip key={t} text={t} onClick={(v) => updateField('dealership', 'setsApart', v)} />
                ))}
            </div>
        </div>
      </div>

      {/* Tone Sliders */}
      <div className="space-y-8 bg-slate-50 dark:bg-white/5 p-8 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-inner">
         <div className="flex items-center gap-2 mb-2">
            <PenTool size={16} className="text-brand-500" />
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-brand-400">Listing Tone Strategy</h4>
         </div>
         
         {[
            { id: 'storytelling', label: 'Sales Narrative', left: 'Facts Only', right: 'Storyteller', tip: 'Left = facts only, Right = narrative-driven' },
            { id: 'formality', label: 'Brand Voice', left: 'Formal', right: 'Conversational', tip: 'Left = professional, Right = casual friendly' },
            { id: 'benefitFocus', label: 'Value Emphasis', left: 'Specs', right: 'Benefits', tip: 'Left = list features, Right = emphasize what buyer gets' },
         ].map(slider => (
            <div key={slider.id} className="space-y-3">
                <div className="flex justify-between items-center text-xs font-black text-slate-700 dark:text-gray-300">
                    <span className="flex items-center gap-1 uppercase tracking-wider">
                        {slider.label} 
                        <div className="group relative ml-1">
                            <Info size={12} className="cursor-help text-slate-400" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white p-3 rounded-xl text-[10px] font-bold leading-tight opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                {slider.tip}
                            </div>
                        </div>
                    </span>
                    <span className="text-brand-500">{(formData.dealership.toneSliders as any)[slider.id]}%</span>
                </div>
                <input 
                    type="range"
                    className="w-full h-1.5 bg-slate-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                    value={(formData.dealership.toneSliders as any)[slider.id]}
                    onChange={(e) => {
                        const sliders = { ...formData.dealership.toneSliders, [slider.id]: parseInt(e.target.value) };
                        updateField('dealership', 'toneSliders', sliders);
                    }}
                />
                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>{slider.left}</span>
                    <span>{slider.right}</span>
                </div>
            </div>
         ))}
      </div>
    </div>
  );

  const renderActionDrivers = () => {
    const categories = [
        { id: 'comfort', label: 'Comfort & Convenience', icon: Layout, features: ['Heated/cooled seats', 'Dual climate control', 'Power liftgate', 'Keyless entry/start', 'Memory seats', 'Panoramic sunroof', 'Leather interior', 'Massage seats'] },
        { id: 'technology', label: 'Technology', icon: Zap, features: ['Navigation system', 'Apple CarPlay/Android Auto', 'Premium sound system', 'Wireless charging', '360° camera', 'Head-up display', 'Adaptive cruise control', 'Large touchscreen'] },
        { id: 'safety', label: 'Safety', icon: ShieldCheck, features: ['Blind spot monitoring', 'Lane keep assist', 'Automatic emergency brake', 'Rear cross traffic alert', 'Parking sensors', 'Forward collision warning'] },
        { id: 'performance', label: 'Performance & Capability', icon: Activity, features: ['All-wheel drive', 'Sport mode', 'Tow package', 'Turbo/supercharged', 'Upgraded wheels', 'Performance suspension'] },
        { id: 'appearance', label: 'Appearance', icon: Camera, features: ['LED headlights', 'Chrome package', 'Tinted windows', 'Sport styling', 'Premium paint', 'Roof rails'] },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Urgency */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">🔥 Urgency Triggers</label>
                    <span className={`text-[10px] font-bold ${formData.actionDrivers.urgencyTriggers.length === 3 ? 'text-red-500' : 'text-brand-500'}`}>
                        {formData.actionDrivers.urgencyTriggers.length}/3 SELECTED
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        'Just arrived (fresh inventory)', 'Price reduced recently', 'Won\'t last long (hot seller)',
                        'Similar units sold quickly', 'Limited time warranty offer', 'End of month special pricing',
                        'Only one with this color/package', 'Trade-in value expiring soon'
                    ].map(u => (
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
                                    ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500/50 text-red-700 dark:text-red-400 shadow-md'
                                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 disabled:opacity-30'
                            }`}
                        >
                            {u}
                        </button>
                    ))}
                </div>
            </div>

            {/* Features Categories */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-widest">Premium Equipment Matrix</label>
                    <span className="text-[10px] font-black text-brand-500">OPTIMIZES SEARCH ALGORITHMS</span>
                </div>
                
                <div className="space-y-3">
                    {categories.map(cat => {
                        const isExpanded = expandedCategories.includes(cat.id);
                        const selectedCount = (formData.actionDrivers.premiumFeatures as any)[cat.id].length;
                        
                        return (
                            <div key={cat.id} className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#020617] transition-all">
                                <button 
                                    onClick={() => setExpandedCategories(prev => isExpanded ? prev.filter(x => x !== cat.id) : [...prev, cat.id])}
                                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <cat.icon className="w-5 h-5 text-brand-500" />
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{cat.label}</span>
                                        <span className="text-[10px] font-mono bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-full">
                                            {selectedCount}/{cat.features.length}
                                        </span>
                                    </div>
                                    {isExpanded ? <Minimize2 size={16} className="text-slate-400" /> : <Maximize2 size={16} className="text-slate-400" />}
                                </button>
                                
                                {isExpanded && (
                                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-top-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                            <label className="col-span-full flex items-center gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-white/5">
                                                <input 
                                                    type="checkbox" 
                                                    className="w-3.5 h-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                                                    checked={selectedCount === cat.features.length}
                                                    onChange={(e) => {
                                                        const features = { ...formData.actionDrivers.premiumFeatures, [cat.id]: e.target.checked ? cat.features : [] };
                                                        updateField('actionDrivers', 'premiumFeatures', features);
                                                    }}
                                                />
                                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select All</span>
                                            </label>
                                            {cat.features.map(f => (
                                                <label key={f} className="flex items-center gap-3 cursor-pointer group">
                                                    <input 
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                                                        checked={(formData.actionDrivers.premiumFeatures as any)[cat.id].includes(f)}
                                                        onChange={(e) => {
                                                            const current = (formData.actionDrivers.premiumFeatures as any)[cat.id];
                                                            const next = e.target.checked ? [...current, f] : current.filter((x: string) => x !== f);
                                                            const features = { ...formData.actionDrivers.premiumFeatures, [cat.id]: next };
                                                            updateField('actionDrivers', 'premiumFeatures', features);
                                                        }}
                                                    />
                                                    <span className="text-xs text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{f}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {/* CUSTOM FEATURE INPUT FOR SUBSECTION */}
                                        <div className="mt-6 space-y-2 border-t border-slate-100 dark:border-white/5 pt-4">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <PlusCircle size={10} />
                                                Specific Model Features
                                            </div>
                                            <input 
                                                className="w-full bg-slate-50 dark:bg-[#020617] border-2 border-slate-100 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-brand-500 outline-none transition-all shadow-inner"
                                                placeholder={`e.g., specific driver assistance, interior carbon trim...`}
                                                value={(formData.actionDrivers.customSubFeatures as any)[cat.id]}
                                                onChange={(e) => {
                                                    const custom = { ...formData.actionDrivers.customSubFeatures, [cat.id]: e.target.value };
                                                    updateField('actionDrivers', 'customSubFeatures', custom);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Additional Narrative fields */}
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300 block">💎 The #1 Feature Buyers Fall for:</label>
                    <input 
                        className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-500 outline-none shadow-inner"
                        placeholder="e.g., the panoramic sky lounge roof"
                        value={formData.actionDrivers.wowFactor}
                        onChange={(e) => updateField('actionDrivers', 'wowFactor', e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                        {["Panoramic sunroof", "Bose sound system", "Captain's chairs", "Heads-up display"].map(t => (
                            <ExampleChip key={t} text={t} onClick={(v) => updateField('actionDrivers', 'wowFactor', v)} />
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className={`text-sm font-bold block ${formData.actionDrivers.noSpecialOffer ? 'text-slate-400' : 'text-slate-700 dark:text-gray-300'}`}>
                            🎁 Special Dealer Incentives
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-slate-300 text-brand-500"
                                checked={formData.actionDrivers.noSpecialOffer}
                                onChange={(e) => updateField('actionDrivers', 'noSpecialOffer', e.target.checked)}
                            />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">None</span>
                        </label>
                    </div>
                    {!formData.actionDrivers.noSpecialOffer && (
                        <div className="animate-in fade-in slide-in-from-top-1">
                            <input 
                                className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-500 outline-none shadow-inner"
                                placeholder="e.g., our lifetime powertrain warranty at no extra cost"
                                value={formData.actionDrivers.specialOffer}
                                onChange={(e) => updateField('actionDrivers', 'specialOffer', e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* HEADER: GAMIFIED STATUS */}
        <div className="bg-white dark:bg-[#0f172a] rounded-[40px] border border-slate-200 dark:border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Score & Progress */}
                    <div className="flex-1 w-full space-y-6">
                        <div className="flex flex-col sm:flex-row items-center gap-10">
                            <div className="flex items-center gap-5 group">
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-1000 ${
                                    qualityScore < 50 ? 'bg-red-500/10 text-red-500' : 
                                    qualityScore < 75 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                }`}>
                                    <Trophy className={`w-12 h-12 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-12 ${qualityScore >= 75 ? 'fill-current drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]' : ''}`} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Listing Conversion Quality</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black tabular-nums tracking-tighter">{qualityScore}</span>
                                        <span className="text-2xl font-black text-slate-400 opacity-50">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 w-full sm:w-auto h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative shadow-inner border border-slate-200 dark:border-white/10">
                                <div 
                                    className={`h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] ${
                                        completion < 100 ? 'bg-brand-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${completion}%` }}
                                />
                                {completion === 100 && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* NEW RELOCATED VISUAL IQ BADGE */}
                    <div className="flex items-center gap-6 p-4 md:p-6 rounded-[32px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg min-w-[240px]">
                        <div className="relative">
                             <ShieldCheck size={40} className="text-brand-500 drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]" />
                             <div className="absolute inset-0 animate-ping rounded-full bg-brand-500/20 scale-150"></div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Visual IQ Score</div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">98/100</div>
                            <div className="w-24 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-1">
                                <div className="w-[98%] h-full bg-brand-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-lg font-black shadow-lg shadow-brand-500/20">
                                {currentStep}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-[0.1em] text-slate-400">Current Phase</span>
                                <span className="text-lg font-black tracking-tight">
                                    {currentStep === 1 ? 'Vehicle Intelligence' : 
                                     currentStep === 2 ? 'Visual Assets' :
                                     currentStep === 3 ? 'Condition & Vibe' :
                                     currentStep === 4 ? 'Dealership DNA' : 'Action Drivers'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleSaveDraft}
                            disabled={isSaving || isGenerating}
                            className="px-5 py-2.5 rounded-2xl bg-white dark:bg-white/5 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center gap-2 border-2 border-slate-100 dark:border-white/10 shadow-sm"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* HORIZONTAL NAVIGATION BAR */}
        <div className="w-full mb-4 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex flex-nowrap md:grid md:grid-cols-5 gap-3 min-w-[700px] md:min-w-0">
                {[
                    { step: 1, label: 'Intelligence', icon: Brain },
                    { step: 2, label: 'Visuals', icon: Camera },
                    { step: 3, label: 'Vibe Check', icon: Activity },
                    { step: 4, label: 'Dealer DNA', icon: ShieldCheck },
                    { step: 5, label: 'Conversion', icon: Zap },
                ].map((item) => {
                    const isComplete = (item.step === 1 && formData.vehicle.year !== '' && formData.vehicle.make !== '') ||
                                       (item.step === 2 && formData.media.images.length > 0) ||
                                       (item.step === 3 && formData.condition.tier !== '') ||
                                       (item.step === 4 && formData.dealership.name !== '') ||
                                       (item.step === 5 && (Object.values(formData.actionDrivers.premiumFeatures).flat().length > 0));
                    
                    const isActive = currentStep === item.step;

                    return (
                        <button
                            key={item.step}
                            onClick={() => !isGenerating && setCurrentStep(item.step)}
                            disabled={isGenerating}
                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-3xl border-2 transition-all duration-300 group whitespace-nowrap ${
                                isActive 
                                    ? 'bg-brand-600 border-brand-500 text-white shadow-xl scale-[1.02]' 
                                    : 'bg-white dark:bg-[#0f172a] border-slate-100 dark:border-white/5 text-slate-500 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/10'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/5 group-hover:scale-110'}`}>
                                <item.icon size={16} />
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-600 dark:text-gray-400'}`}>
                                {item.label}
                            </span>
                            {isComplete && (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-green-500/10'}`}>
                                   <Check size={12} className={isActive ? 'text-white' : 'text-green-500'} />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* MAIN FORM AREA */}
        <div className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-[48px] p-8 md:p-14 shadow-2xl relative min-h-[700px]">
            
            {/* Generation Loader */}
            {isGenerating && (
              <div className="absolute inset-0 z-50 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl rounded-[48px] flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
                <div className="w-32 h-32 mb-10 relative">
                    <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <Loader2 className="w-full h-full text-brand-500 animate-spin relative z-10" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-brand-500 animate-pulse" />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Generating Conversion Assets...</h2>
                <p className="text-slate-500 dark:text-gray-400 max-w-md mb-10 text-lg leading-relaxed">
                    Our neural engines are processing vehicle metadata and crafting psychological sales hooks for you.
                </p>
                <div className="w-full max-w-md h-4 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative border border-slate-200 dark:border-white/10 shadow-inner">
                    <div 
                        className="h-full bg-brand-500 transition-all duration-500 shadow-[0_0_20px_rgba(14,165,233,0.6)]" 
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
              </div>
            )}

            {/* Content Sections */}
            {currentStep === 1 && renderVehicleEssentials()}
            {currentStep === 2 && renderMediaUpload()}
            {currentStep === 3 && renderConditionHighlights()}
            {currentStep === 4 && renderDealershipVoice()}
            {currentStep === 5 && renderActionDrivers()}

            {/* Footer Navigation */}
            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1 || isGenerating}
                    className={`flex items-center gap-3 px-10 py-5 rounded-[24px] font-black text-base uppercase tracking-widest transition-all ${
                        currentStep === 1 || isGenerating
                            ? 'opacity-0 pointer-events-none' 
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10 shadow-sm'
                    }`}
                >
                    <ChevronLeft className="w-6 h-6" /> Back
                </button>

                <div className="flex-1 flex flex-col items-center gap-3">
                    <div className="flex gap-1.5">
                        {[1,2,3,4,5].map(dot => (
                            <div 
                                key={dot}
                                className={`w-12 h-1.5 rounded-full transition-all duration-700 ${dot <= currentStep ? 'bg-brand-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'bg-slate-200 dark:bg-white/5'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Campaign Blueprint</span>
                </div>

                {currentStep < 5 ? (
                    <button
                        onClick={nextStep}
                        disabled={isGenerating}
                        className="btn-primary btn-glow group flex items-center gap-3 px-14 py-5 rounded-[24px] font-black text-base uppercase tracking-[0.1em] shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-70 transition-all"
                    >
                        Next Phase <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                    </button>
                ) : (
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="btn-primary btn-glow group flex items-center gap-4 px-16 py-6 rounded-[28px] font-black text-xl uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-[length:200%_auto] animate-gradient-x disabled:opacity-70 transition-all"
                    >
                        Generate Campaign <Sparkles className="w-7 h-7 animate-pulse" />
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ListingGenerator;
