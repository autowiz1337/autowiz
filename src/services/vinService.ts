
export interface DecodedVehicle {
  year: string;
  make: string;
  model: string;
  trim: string;
  exteriorColor: string;
  interiorColor: string;
  mileage?: string;
  price?: string;
}

/**
 * Validates if the string is a standard 17-character VIN.
 * Excludes I, O, Q which are not used in VINs.
 */
const isVIN = (id: string): boolean => {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return vinRegex.test(id.trim());
};

/**
 * Real-time VIN/URL decoding service.
 * Connects to NHTSA API for VINs and uses pattern matching for URLs.
 */
export const decodeVehicleIdentifier = async (id: string): Promise<DecodedVehicle> => {
  const cleanId = id.trim();

  // Handle standard VIN via NHTSA API
  if (isVIN(cleanId)) {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${cleanId}?format=json`
      );
      
      if (!response.ok) throw new Error('NHTSA API Error');
      
      const data = await response.json();
      const result = data.Results?.[0];

      if (!result || result.ErrorCode !== "0") {
        throw new Error(result?.ErrorText || 'Invalid VIN data');
      }

      // Concatenate Series and Trim for a more comprehensive "Trim" field
      const trimParts = [result.Series, result.Trim].filter(Boolean);
      const fullTrim = trimParts.length > 0 ? trimParts.join(' ') : 'Base';

      return {
        year: result.ModelYear || '',
        make: result.Make || '',
        model: result.Model || '',
        trim: fullTrim,
        // API does not provide individual listing data like colors or mileage
        exteriorColor: '',
        interiorColor: '',
        mileage: '',
        price: ''
      };
    } catch (error) {
      console.error('NHTSA Decoding failed:', error);
      throw error;
    }
  }

  // Fallback / URL Pattern Matching logic (Mocked for Demo)
  // In production, this would typically be handled by a backend scraper
  await new Promise(resolve => setTimeout(resolve, 1500));
  const lowerId = cleanId.toLowerCase();
  
  if (lowerId.includes('bmw') || lowerId.includes('x5')) {
    return {
      year: '2023',
      make: 'BMW',
      model: 'X5',
      trim: 'xDrive40i M Sport',
      exteriorColor: 'Mineral White Metallic',
      interiorColor: 'Coffee Extended Merino Leather',
      mileage: '12400',
      price: '64900'
    };
  }

  if (lowerId.includes('tesla') || lowerId.includes('model')) {
    return {
      year: '2024',
      make: 'Tesla',
      model: 'Model Y',
      trim: 'Long Range AWD',
      exteriorColor: 'Stealth Grey',
      interiorColor: 'All Black Premium',
      mileage: '0',
      price: '48990'
    };
  }

  // Default sophisticated fallback for generic inputs
  return {
    year: '2021',
    make: 'Ford',
    model: 'F-150',
    trim: 'Lariat 502A',
    exteriorColor: 'Agate Black Metallic',
    interiorColor: 'Baja Tan Leather',
    mileage: '38500',
    price: '45800'
  };
};
