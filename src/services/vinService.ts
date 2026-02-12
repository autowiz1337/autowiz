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
 * Real-time VIN decoding service.
 * Connects to NHTSA API for VINs.
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
      const make = result?.Make || '';
      const model = result?.Model || '';
      const year = result?.ModelYear || '';

      if (!make && !model) {
        // Descriptive error for when a VIN exists but the specific vehicle data is missing from NHTSA
        throw new Error('Vehicle record not found in global database. Please provide a direct listing URL or enter the details manually below.');
      }

      // Tesla specific logic: Tesla listings often have blank Trim but populated Series or DriveType
      let trim = result.Trim || '';
      const series = result.Series || '';
      const driveType = result.DriveType || '';

      if (!trim) {
        if (series && series !== model) {
          trim = series;
        } else if (driveType) {
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
        exteriorColor: '',
        interiorColor: '',
        mileage: '',
        price: ''
      };

      console.log('[VIN Service] Successfully decoded:', vehicleData);
      return vehicleData;

    } catch (error: any) {
      console.error('[VIN Service] NHTSA Decoding failed:', error);
      // Re-throw the specific error or a generalized manual instruction error
      throw new Error(error.message || 'VIN Decoding failed. Please try a direct URL or fill the form manually.');
    }
  }

  // If the input is not a 17-character VIN, we no longer provide mock fallbacks.
  // Instead, we instruct the user as requested.
  console.warn('[VIN Service] Input is not a valid 17-character VIN.');
  throw new Error('Identifier not recognized as a standard VIN. Please provide a valid 17-character VIN, a direct Autovit URL, or enter vehicle details manually.');
};
