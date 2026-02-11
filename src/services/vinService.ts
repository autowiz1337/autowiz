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
 * Validates if the normalized string is a standard 17-character VIN.
 * Excludes I, O, Q which are not used in modern VINs.
 */
const isVIN = (id: string): boolean => {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return vinRegex.test(id);
};

/**
 * Real-time VIN/URL decoding service.
 * Connects to NHTSA API for VINs and uses pattern matching for URLs.
 */
export const decodeVehicleIdentifier = async (id: string): Promise<DecodedVehicle> => {
  // Normalize input: Remove all non-alphanumeric characters and convert to uppercase
  const cleanId = id.trim().replace(/[^A-Z0-9]/gi, '').toUpperCase();
  
  console.log(`[VIN Service] Decoding identifier: "${id}" -> Cleaned: "${cleanId}"`);

  // Handle standard VIN via NHTSA API
  if (isVIN(cleanId)) {
    try {
      console.log(`[VIN Service] Attempting NHTSA decode for VIN: ${cleanId}`);
      
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${cleanId}?format=json`
      );
      
      if (!response.ok) {
        throw new Error(`NHTSA API Communication Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = data.Results?.[0];

      console.log('[VIN Service] API Response Result:', result);

      // Check for presence of core data. 
      // Note: ErrorCode "0" means success, but we check for data presence as DOT DB is sometimes incomplete.
      const make = result?.Make || '';
      const model = result?.Model || '';
      const year = result?.ModelYear || '';

      if (!make && !model) {
        const errorText = result?.ErrorText || 'Vehicle not found in global database';
        console.warn(`[VIN Service] API returned success but empty data: ${errorText}`);
        throw new Error(errorText);
      }

      // Tesla specific logic: Tesla listings often have blank Trim but populated Series or DriveType
      // For 5YJ... VINs, the trim is often found in Series or simply summarized as the DriveType (e.g. AWD)
      let trim = result.Trim || '';
      const series = result.Series || '';
      const driveType = result.DriveType || '';

      if (!trim) {
        if (series && series !== model) {
          trim = series;
        } else if (driveType) {
          // Clean up drive type (e.g. "4x2" -> "2WD", "Rear-Wheel Drive" -> "RWD")
          trim = driveType.replace('Rear-Wheel Drive', 'RWD').replace('All-Wheel Drive', 'AWD');
        } else {
          trim = 'Standard';
        }
      }

      const vehicleData: DecodedVehicle = {
        year: year.toString(),
        make: make.charAt(0).toUpperCase() + make.slice(1).toLowerCase(),
        model: model,
        trim: trim,
        // API does not provide color/mileage/price per individual listing
        exteriorColor: '',
        interiorColor: '',
        mileage: '',
        price: ''
      };

      console.log('[VIN Service] Successfully decoded:', vehicleData);
      return vehicleData;

    } catch (error) {
      console.error('[VIN Service] NHTSA Decoding failed:', error);
      // We throw to let the UI handle the error state
      throw error;
    }
  }

  // Fallback / URL Pattern Matching logic (Mocked for Demo)
  // Used when the input is a URL or a keyword instead of a valid 17-char VIN
  console.log('[VIN Service] Input is not a VIN. Running fallback pattern matcher.');
  await new Promise(resolve => setTimeout(resolve, 1000));
  const lowerId = id.toLowerCase();
  
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

  // If no match found and was a failed VIN attempt, we don't return random data
  // But if it's a "Magic Start" marketing flow, we provide a generic template
  return {
    year: '2022',
    make: 'Ford',
    model: 'F-150',
    trim: 'Lariat',
    exteriorColor: '',
    interiorColor: '',
    mileage: '',
    price: ''
  };
};
