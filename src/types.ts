export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface QuoteInput {
  roofArea: number; // in sq ft
  monthlyBill: number; // in INR
  state: string; // Indian state
  customerType: 'Residential' | 'Commercial' | 'Housing Society';
  connectionType: '1-Phase' | '3-Phase';
}

export interface QuoteResult {
  recommendedCapacityKw: number;
  panelsCount: number;
  totalCost: number;
  centralSubsidy: number; // PM Surya Ghar subsidy
  stateSubsidy: number;
  netCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  lifetimeSavings25Yrs: number;
  co2SavedTonsPerYear: number;
  equivalentTreesPlanted: number;
}

export interface SimulationState {
  sunPosition: number; // 0 to 180 (6 AM to 6 PM)
  roofAngle: number; // 0 to 45 degrees
  panelEfficiency: number; // 15 to 25 %
  cloudCover: number; // 0 to 100 %
  panelCount: number; // 4 to 40 panels
  shadingLevel: number; // 0 to 100 %
  hasBattery: boolean;
  batteryLevel: number; // 0 to 100 %
}
