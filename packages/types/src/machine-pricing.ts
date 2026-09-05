export interface MachinePriceItem {
  model: string;
  name: string;
  price: number;
  capacity?: string;
  features: string[];
  type?: string;
  orientation?: 'Horizontal' | 'Vertical';
  operation?: 'Coin / Multi-Coin' | 'Push Button' | 'Manual / Mechanical';
  hasDisplay?: boolean;
  popular?: boolean;
}

export interface MachineCategoryPricing {
  title: string;
  category: string;
  gstNote: string;
  models: MachinePriceItem[];
}

export const MACHINE_PRICING = {
  disposal_machine: {
    title: 'Sanitary Napkin Incinerator / Disposal Machine',
    category: 'disposal_machine',
    gstNote: '+ GST Extra (18%)',
    models: [
      {
        model: 'SND 100',
        name: 'AXA SND 100 Incinerator',
        price: 3800,
        capacity: 'Up to 100 Napkins / Day',
        hasDisplay: false,
        features: ['Smokeless Ash Core', 'Auto Cut-Off Timer', 'Wall Mounted Compact Design', '1-Year Warranty']
      },
      {
        model: 'SND 120 Without Display',
        name: 'AXA SND 120 (Without Display)',
        price: 4000,
        capacity: '100 - 120 Napkins / Day',
        hasDisplay: false,
        features: ['Ceramic Thermal Core', 'Double-Wall Insulation', 'Auto Cut-Off Protection', '1-Year Warranty']
      },
      {
        model: 'SND 120 Display',
        name: 'AXA SND 120 (With Display)',
        price: 4200,
        capacity: '100 - 120 Napkins / Day',
        hasDisplay: true,
        features: ['Digital Temperature Display', 'Burn Cycle Timer Indicator', 'Ceramic Heater', '1-Year Warranty']
      },
      {
        model: 'SND 150 Display',
        name: 'AXA SND 150 (With Display)',
        price: 4500,
        capacity: '150 Napkins / Day',
        hasDisplay: true,
        popular: true,
        features: ['Digital Temperature Display', 'High Efficiency Ceramic Core', 'Removable Ash Tray', '1-Year Warranty']
      },
      {
        model: 'SND 200 Display',
        name: 'AXA SND 200 (With Display)',
        price: 5500,
        capacity: '200 Napkins / Day',
        hasDisplay: true,
        features: ['Digital Display & Control', 'Reinforced Thermal Chamber', 'Fast 15-min Burn Cycle', '1-Year Warranty']
      },
      {
        model: 'SND 300 Display',
        name: 'AXA SND 300 (With Display)',
        price: 6600,
        capacity: '300 Napkins / Day',
        hasDisplay: true,
        features: ['Heavy-Duty Ceramic Heater', 'Digital Control Dashboard', 'High Heat Overheat Cut-Off', '1-Year Warranty']
      },
      {
        model: 'SND 400 Display',
        name: 'AXA SND 400 (With Display)',
        price: 10200,
        capacity: '400 Napkins / Day',
        hasDisplay: true,
        features: ['Commercial High-Capacity', 'Microprocessor Display Control', 'Continuous Batch Disposal', '1-Year Warranty']
      },
      {
        model: 'SND 600 Display',
        name: 'AXA SND 600 (With Display)',
        price: 15000,
        capacity: '600 Napkins / Day',
        hasDisplay: true,
        features: ['Flagship Institutional Grade', 'Multi-Load High Heat Core', 'Full Digital Dashboard', '1-Year Warranty']
      }
    ]
  },

  vending_manual: {
    title: 'Manual Sanitary Napkin Vending Machine',
    category: 'vending_manual',
    gstNote: '+ GST Extra (18%)',
    models: [
      {
        model: 'VND 25',
        name: 'AXA VND 25 Manual Vending Machine',
        price: 3500,
        capacity: '25 Pads Capacity',
        operation: 'Manual / Mechanical',
        features: ['Zero Electricity Required', 'Mechanical Coin Acceptor', 'Wall-Mounted Robust Steel Body', 'Inspection Window']
      },
      {
        model: 'VND 50',
        name: 'AXA VND 50 Manual Vending Machine',
        price: 4200,
        capacity: '50 Pads Capacity',
        operation: 'Manual / Mechanical',
        popular: true,
        features: ['Zero Electricity Required', 'Mechanical Coin Acceptor', 'Double Lock Enclosure', 'Easy Manual Drop Knob']
      },
      {
        model: 'VND 100',
        name: 'AXA VND 100 Manual Vending Machine',
        price: 6600,
        capacity: '100 Pads Capacity',
        operation: 'Manual / Mechanical',
        features: ['Zero Electricity Required', 'High Storage 100 Pads', 'Heavy-Duty 1.2mm MS Powder Coated', 'Anti-Theft Lock']
      },
      {
        model: 'VND 200',
        name: 'AXA VND 200 Manual Vending Machine',
        price: 10200,
        capacity: '200 Pads Capacity',
        operation: 'Manual / Mechanical',
        features: ['High Footfall Institutional', 'Dual Column Mechanical Drop', 'Tamper-Proof Steel Body', 'Inspection Windows']
      }
    ]
  },

  vending_automatic: {
    title: 'Automatic Sanitary Napkin Vending Machine',
    category: 'vending_automatic',
    gstNote: '+ GST Extra (18%)',
    models: [
      // Standard / Coin Operated (Horizontal)
      {
        model: 'AVND 25 H',
        name: 'AXA AVND 25 Horizontal (Coin/Auto)',
        price: 5500,
        capacity: '25 Pads',
        orientation: 'Horizontal',
        operation: 'Coin / Multi-Coin',
        features: ['Multi-Coin Acceptor', 'LCD Instructions', 'Battery Backup Included', 'MS Steel Chassis']
      },
      {
        model: 'AVND 50 H',
        name: 'AXA AVND 50 Horizontal (Coin/Auto)',
        price: 6600,
        capacity: '50 Pads',
        orientation: 'Horizontal',
        operation: 'Coin / Multi-Coin',
        popular: true,
        features: ['LCD Display & Stock Indicator', 'Battery Backup System', 'Multi-Coin Acceptor', 'Smart Coin Rejection']
      },
      {
        model: 'AVND 100 H',
        name: 'AXA AVND 100 Horizontal (Coin/Auto)',
        price: 8400,
        capacity: '100 Pads',
        orientation: 'Horizontal',
        operation: 'Coin / Multi-Coin',
        features: ['High Capacity 100 Pads', 'LCD Digital Guidance', 'Battery Backup System', 'Heavy MS Powder Coated']
      },
      {
        model: 'AVND 200 H',
        name: 'AXA AVND 200 Horizontal (Coin/Auto)',
        price: 13200,
        capacity: '200 Pads',
        orientation: 'Horizontal',
        operation: 'Coin / Multi-Coin',
        features: ['Institutional Mega Capacity', 'Dual Dispensing Columns', 'LCD Display & Battery Backup', 'Vandal-Resistant']
      },

      // Standard / Coin Operated (Vertical)
      {
        model: 'AVND 50 V',
        name: 'AXA AVND 50 Vertical (Coin/Auto)',
        price: 6000,
        capacity: '50 Pads',
        orientation: 'Vertical',
        operation: 'Coin / Multi-Coin',
        features: ['Slim Vertical Space-Saver', 'LCD Step-by-Step Display', 'Battery Backup Included', 'Optical Coin Sensor']
      },
      {
        model: 'AVND 100 V',
        name: 'AXA AVND 100 Vertical (Coin/Auto)',
        price: 7200,
        capacity: '100 Pads',
        orientation: 'Vertical',
        operation: 'Coin / Multi-Coin',
        features: ['Slim Vertical 100 Pads', 'LCD Display & Stock Alerts', 'Battery Backup Included', 'Heavy MS Steel']
      },

      // Push Button (Free Dispense) - Horizontal
      {
        model: 'AVND 25 H Push Button',
        name: 'AXA AVND 25 Horizontal (Push Button)',
        price: 4500,
        capacity: '25 Pads',
        orientation: 'Horizontal',
        operation: 'Push Button',
        features: ['Free / Instant Dispense', 'Single Push Button Operation', 'Battery Backup Included', 'Compact Wall Mount']
      },
      {
        model: 'AVND 50 H Push Button',
        name: 'AXA AVND 50 Horizontal (Push Button)',
        price: 5500,
        capacity: '50 Pads',
        orientation: 'Horizontal',
        operation: 'Push Button',
        popular: true,
        features: ['Free / Instant Dispense Push Button', 'LED Indicator', 'Battery Backup Included', 'MS Steel Chassis']
      },
      {
        model: 'AVND 100 H Push Button',
        name: 'AXA AVND 100 Horizontal (Push Button)',
        price: 7200,
        capacity: '100 Pads',
        orientation: 'Horizontal',
        operation: 'Push Button',
        features: ['Large 100 Pad Storage', 'Direct Push Button Release', 'Battery Backup System', 'Heavy-Duty Build']
      },

      // Push Button (Free Dispense) - Vertical
      {
        model: 'AVND 50 V Push Button',
        name: 'AXA AVND 50 Vertical (Push Button)',
        price: 5000,
        capacity: '50 Pads',
        orientation: 'Vertical',
        operation: 'Push Button',
        features: ['Slim Vertical Space-Saver', 'Instant Push Button Drop', 'Battery Backup Included', 'Wall Mountable']
      },
      {
        model: 'AVND 100 V Push Button',
        name: 'AXA AVND 100 Vertical (Push Button)',
        price: 5760,
        capacity: '100 Pads',
        orientation: 'Vertical',
        operation: 'Push Button',
        features: ['Slim Vertical 100 Pads', 'Push Button Instant Drop', 'Battery Backup Included', 'Powder Coated Steel']
      }
    ]
  },

  gst: 'extra'
} as const;

export type MachinePricingData = typeof MACHINE_PRICING;
