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
 * Simulates a real-time VIN/URL decoding service.
 * In production, this would hit an API like NHTSA or a vehicle data provider.
 */
export const decodeVehicleIdentifier = async (id: string): Promise<DecodedVehicle> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 2200));
  
  const lowerId = id.toLowerCase();
  
  // Intelligence logic: Match keywords to return highly specific mock data
  if (lowerId.includes('bmw') || lowerId.includes('x5') || lowerId.includes('5ux')) {
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

  if (lowerId.includes('tesla') || lowerId.includes('model') || lowerId.includes('5yj')) {
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

  if (lowerId.includes('porsche') || lowerId.includes('911') || lowerId.includes('wp0')) {
    return {
      year: '2022',
      make: 'Porsche',
      model: '911 Carrera',
      trim: 'S',
      exteriorColor: 'Guards Red',
      interiorColor: 'Black Leather',
      mileage: '4200',
      price: '128500'
    };
  }

  // Default sophisticated fallback
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