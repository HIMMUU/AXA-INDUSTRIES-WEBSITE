export interface CategoryTemplateSpec {
  key: string;
  value: string;
  sortOrder: number;
}

export interface ProductCategoryTemplate {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  description: string;
  suggestedPrice: number;
  metaTitle: string;
  metaDescription: string;
  defaultSpecifications: CategoryTemplateSpec[];
  sampleImages: { url: string; publicId: string; order: number }[];
}

export const PRODUCT_CATEGORY_TEMPLATES: ProductCategoryTemplate[] = [
  {
    id: 'sanitary-napkin-vending-machine',
    name: 'Automatic Sanitary Napkin Vending Machine (AVND50H)',
    slug: 'sanitary-napkin-vending-machine',
    tagline: 'Automated, coin & UPI operated sanitary pad dispensing solutions',
    shortDescription: 'IoT-based fully automatic sanitary napkin dispenser (Model AVND50H) with 50-pad capacity, interactive LCD display, battery backup, and automatic coin rejection.',
    description: `Sanitary Napkin Vending Machine is an essential technology product that should become a norm at all commercial and public places. Our unique IoT-based fully automatic sanitary napkin dispenser allows women to avail hygienic sanitary napkins without any human contact. A simple coin-operated sanitary napkins dispenser machine is designed to help women anytime during menstrual emergencies.

Key Technical Specifications (Model: AVND50H):
- Size: 420 x 480 x 145 mm
- Storage Capacity: 50 Pads
- Body Material: Heavy-duty MS Powder Coated Body
- LCD Display: Guides buyer step-by-step & displays message to collect napkin after dispensing
- Live Inventory & Price: LCD displays current stock count along with napkin price
- Intelligent Coin Rejection: Machine automatically rejects coins if out of stock
- Dual Power System: Operates on 230V AC Electricity + Battery Backup
- Multi-Coin Acceptor: Supports multiple coin denominations
- Official Models: Manual VND Series (from ₹3,500 + GST), Auto Push-Button (from ₹4,500 + GST), Auto Coin AVND Series (from ₹5,500 + GST).`,
    suggestedPrice: 6600.00,
    metaTitle: 'Automatic Sanitary Napkin Vending Machine AVND50H - AXA Industries',
    metaDescription: 'Buy AXA AVND50H Automatic Sanitary Napkin Vending Machine. 50-pad capacity, MS powder-coated body, LCD step-by-step guide, battery backup & coin rejection.',
    defaultSpecifications: [
      { key: 'Model Number', value: 'AVND50H', sortOrder: 1 },
      { key: 'Dimensions (H x W x D)', value: '420 x 480 x 145 mm', sortOrder: 2 },
      { key: 'Storage Capacity', value: '50 Pads', sortOrder: 3 },
      { key: 'Body Material', value: 'MS Powder Coated Body', sortOrder: 4 },
      { key: 'Display System', value: 'LCD display guides buyer step-by-step and displays napkin collection message', sortOrder: 5 },
      { key: 'Inventory & Pricing Display', value: 'LCD display shows live stock with napkin price', sortOrder: 6 },
      { key: 'Smart Coin Rejection', value: 'Machine automatically rejects coin if out of stock', sortOrder: 7 },
      { key: 'Power Backup', value: 'Integrated Battery Backup System', sortOrder: 8 },
      { key: 'Payment Acceptor', value: 'Multi-Coin Acceptor (Programmable)', sortOrder: 9 },
      { key: 'Operating Voltage', value: '230V AC, 50Hz Electricity', sortOrder: 10 }
    ],

    sampleImages: [
      {
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
        publicId: 'sample-vending-machine-1',
        order: 0
      }
    ]
  },

  {
    id: 'sanitary-napkin-disposal-machine',
    name: 'Sanitary Napkin Disposal Machine (SND Series)',
    slug: 'sanitary-napkin-disposal-machine',
    tagline: 'Smokeless thermal incinerators for eco-friendly hygiene disposal',
    shortDescription: 'High-temperature smokeless electric incinerator for instant, hygienic, and eco-friendly destruction of used sanitary napkins. Models from SND 100 to SND 600.',
    description: `The AXA Eco-Burn Sanitary Napkin Disposal Machine provides a hygienic, odor-free, and safe solution for disposing of used sanitary pads. Designed with ceramic insulation and automatic microprocessor temperature control, it reduces waste to sterile ash in seconds.

Available Factory Models:
- SND 100: ₹3,800 + GST
- SND 120 Without Display: ₹4,000 + GST
- SND 120 Display: ₹4,200 + GST
- SND 150 Display: ₹4,500 + GST
- SND 200 Display: ₹5,500 + GST
- SND 300 Display: ₹6,600 + GST
- SND 400 Display: ₹10,200 + GST
- SND 600 Display: ₹15,000 + GST

Key Features:
- Fully automated heating cycle with auto cut-off timer (3 to 5 minutes)
- High-density ceramic fiber insulation prevents exterior heating
- Smoke-free emission technology with flexible aluminum exhaust flange
- Removable bottom ash collection tray for hassle-free cleaning
- Compact wall-mountable body suitable for modern restrooms`,
    suggestedPrice: 3800.00,
    metaTitle: 'Sanitary Napkin Disposal Machine - Smokeless Eco Incinerator',
    metaDescription: 'Automatic smokeless sanitary napkin incinerators for hygienic disposal in restrooms, hostels, and offices. Fast burn cycle & low power consumption.',
    defaultSpecifications: [
      { key: 'Daily Disposal Capacity', value: '100 to 200 Napkins per day', sortOrder: 1 },
      { key: 'Single Cycle Capacity', value: '2 to 3 Napkins per cycle', sortOrder: 2 },
      { key: 'Burn Cycle Duration', value: '15 – 30 Seconds per napkin', sortOrder: 3 },
      { key: 'Heating Element', value: 'High-Grade Ceramic / Kanthal Heating Element', sortOrder: 4 },
      { key: 'Operating Temperature', value: '350°C – 450°C', sortOrder: 5 },
      { key: 'Auto Cut-Off', value: 'Microprocessor Timer Controller (Auto Shut-Off)', sortOrder: 6 },
      { key: 'Exhaust System', value: 'Flexible Aluminum Duct Hose (2 Meters included)', sortOrder: 7 },
      { key: 'Power Supply', value: '230V AC, 50Hz, 800W Single Phase', sortOrder: 8 },
      { key: 'Body Construction', value: 'Thermal Double-Wall Steel Enclosure', sortOrder: 9 },
      { key: 'Ash Collection', value: 'Pull-Out Stainless Steel Ash Tray', sortOrder: 10 }
    ],
    sampleImages: [
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786458267/mainsnd_mle9pt.jpg',
        publicId: 'mainsnd_mle9pt',
        order: 0
      },
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786458267/frrontsnd_qypbta.jpg',
        publicId: 'frrontsnd_qypbta',
        order: 1
      },
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786458267/left_snd_ozcmjm.jpg',
        publicId: 'left_snd_ozcmjm',
        order: 2
      },
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786458268/installsnd_ifajcr.png',
        publicId: 'installsnd_ifajcr',
        order: 3
      }
    ]
  },

  {
    id: 'feedback-machine',
    name: 'Feedback Machine',
    slug: 'feedback-machine',
    tagline: 'Smart customer satisfaction kiosk & feedback terminals',
    shortDescription: 'Interactive digital feedback kiosks with physical smiley keys or HD touchscreens and real-time cloud dashboard analytics.',
    description: `AXA Sense Digital Feedback Machines empower organizations to capture instant, real-time customer and visitor feedback at service points, retail checkouts, hospital counters, and public offices. 

Key Features:
- 4-Smiley physical keys or 10.1"/15.6" IPS HD Capacitive Touchscreen options
- Built-in 4G SIM slot and Wi-Fi connectivity for instant cloud syncing
- Real-time Email & SMS notifications triggered on negative ratings
- Cloud Analytics Dashboard with CSAT calculation, trends, and Excel/PDF export
- Long-lasting internal rechargeable lithium battery backup
- Tamper-proof aluminum pedestal / wall mount hardware`,
    suggestedPrice: 18999.00,
    metaTitle: 'Smart Feedback Machine & Customer Survey Kiosks - AXA',
    metaDescription: 'Capture customer feedback in real-time with AXA Feedback Machines. Feature smiley keypads, HD touchscreens, 4G cloud reporting, and instant alerts.',
    defaultSpecifications: [
      { key: 'Input Mechanism', value: '4-Smiley Physical Keypad / 10.1" IPS Touchscreen', sortOrder: 1 },
      { key: 'Display Screen', value: '10.1" Full HD IPS Display (1280x800 resolution)', sortOrder: 2 },
      { key: 'Wireless Connectivity', value: '4G LTE SIM Slot, Wi-Fi 802.11 b/g/n, Bluetooth 4.2', sortOrder: 3 },
      { key: 'Cloud Software', value: 'AXA Analytics Cloud (1-Year Subscription Included)', sortOrder: 4 },
      { key: 'Alert System', value: 'Instant SMS & Email Alerts for Low Satisfaction Ratings', sortOrder: 5 },
      { key: 'Mounting Hardware', value: 'Desktop Stand / Wall Mount Bracket / Floor Pedestal', sortOrder: 6 },
      { key: 'Power Input', value: '12V DC Adapter / 100-240V AC 50/60Hz', sortOrder: 7 },
      { key: 'Battery Backup', value: 'Built-in 5000mAh Rechargeable Li-ion Battery (8 Hours)', sortOrder: 8 },
      { key: 'Housing Material', value: 'Brushed Aluminum Alloy & ABS Plastic', sortOrder: 9 },
      { key: 'Operating System', value: 'AXA Secure Embedded Kiosk OS', sortOrder: 10 }
    ],
    sampleImages: [
      {
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
        publicId: 'sample-feedback-machine-1',
        order: 0
      }
    ]
  },

  {
    id: 'solid-waste-incinerator',
    name: 'Solid Waste Incinerator',
    slug: 'solid-waste-incinerator',
    tagline: 'Heavy-duty thermal combustion systems for municipal & industrial waste',
    shortDescription: 'Industrial dual-chamber solid waste incinerator designed for efficient, pollution-compliant destruction of municipal, commercial, and dry industrial waste.',
    description: `AXA Thermal-Destroyer Solid Waste Incinerators deliver high-efficiency combustion for bulk waste management. Featuring dual combustion chambers and wet scrubber flue gas purification systems, they meet stringent environmental emission standards.

Key Features:
- Primary chamber (800°C - 900°C) and Secondary chamber (1050°C - 1100°C)
- Refractory brick lining with ceramic fiber insulation rated up to 1400°C
- Automated PLC control panel with digital temperature monitoring
- Integrated wet scrubber & cyclonic spark arrestor for clean stack emissions
- Compatible with Light Diesel Oil (LDO), Natural Gas, LPG, or Electric heating`,
    suggestedPrice: 245000.00,
    metaTitle: 'Solid Waste Incinerator - Industrial Dual-Chamber Combustion Systems',
    metaDescription: 'High capacity solid waste incinerators for industrial plants, municipalities, and commercial complexes. Dual combustion chambers & pollution control scrubber.',
    defaultSpecifications: [
      { key: 'Waste Processing Capacity', value: '50 kg/hr to 500 kg/hr', sortOrder: 1 },
      { key: 'Compatible Waste Types', value: 'Paper, Cardboard, Packaging, Dry Organic & General Waste', sortOrder: 2 },
      { key: 'Primary Chamber Temp', value: '800°C – 900°C', sortOrder: 3 },
      { key: 'Secondary Chamber Temp', value: '1050°C – 1100°C (Residence time >2 sec)', sortOrder: 4 },
      { key: 'Fuel / Burner Options', value: 'Diesel Oil / LPG / Natural Gas / Electric Burners', sortOrder: 5 },
      { key: 'Pollution Control', value: 'Wet Venturi Scrubber with Water Recirculation Tank', sortOrder: 6 },
      { key: 'Chamber Lining', value: 'High-Alumina Refractory Brick & Ceramic Fiber Blanket', sortOrder: 7 },
      { key: 'Control Automation', value: 'PLC-Based Automatic Control Panel with Touch HMI', sortOrder: 8 },
      { key: 'Chimney Structure', value: '12-Meter Self-Supporting MS/SS Stack with Rain Hood', sortOrder: 9 },
      { key: 'Compliance', value: 'Central Pollution Control Board (CPCB) Norms Compliant', sortOrder: 10 }
    ],
    sampleImages: [
      {
        url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
        publicId: 'sample-solid-waste-1',
        order: 0
      }
    ]
  },

  {
    id: 'biomedical-hazardous-waste-incinerator',
    name: 'Bio-Medical & Hazardous Waste Incinerator',
    slug: 'biomedical-hazardous-waste-incinerator',
    tagline: 'High-temperature bio-hazard waste destruction for healthcare facilities',
    shortDescription: 'Sterile high-temperature dual-chamber incinerator engineered for pathological, infectious hospital waste, laboratory waste, and bio-hazardous materials.',
    description: `The AXA Bio-Thermal Series is engineered specifically for hospitals, medical research facilities, diagnostic laboratories, and pharmaceutical companies requiring safe, certified disposal of bio-medical waste.

Key Features:
- Fully compliant with International Bio-Medical Waste Management Rules
- Primary chamber gasification + Secondary chamber high-temp thermal oxidation (>1100°C)
- Automated hydraulic door charger for contactless waste loading
- Multi-stage Air Pollution Control System (APCS) with alkaline scrubber
- Emergency temperature interlock system to prevent incomplete combustion`,
    suggestedPrice: 320000.00,
    metaTitle: 'Bio-Medical & Hazardous Waste Incinerator - Hospital Waste Systems',
    metaDescription: 'Certified Bio-Medical & Hazardous Waste Incinerators for hospitals and diagnostic labs. Features dual combustion chambers, hydraulic charger, and wet scrubber.',
    defaultSpecifications: [
      { key: 'Processing Capacity', value: '25 kg/hr to 250 kg/hr', sortOrder: 1 },
      { key: 'Waste Categories', value: 'Infectious Bio-Medical Waste, Anatomical, Sharps & Lab Waste', sortOrder: 2 },
      { key: 'Primary Chamber Temp', value: '850°C – 950°C', sortOrder: 3 },
      { key: 'Secondary Chamber Temp', value: '1050°C – 1200°C (Residence time >2 sec)', sortOrder: 4 },
      { key: 'Waste Feeding System', value: 'Hydraulic / Pneumatic Automatic Door Loader', sortOrder: 5 },
      { key: 'APCS System', value: 'Multi-Stage Wet Scrubber, Venturi & Droplet Separator', sortOrder: 6 },
      { key: 'Fuel Source', value: 'Light Diesel Oil (LDO) / Natural Gas', sortOrder: 7 },
      { key: 'Safety Mechanisms', value: 'Automatic Burner Interlock, Flame Sensor & Temp Alarms', sortOrder: 8 },
      { key: 'Chimney Height', value: '30 Meters Heavy-Duty Stainless Steel Stack', sortOrder: 9 },
      { key: 'Certifications', value: 'ISO 9001:2015, ISO 14001, CPCB Compliant', sortOrder: 10 }
    ],
    sampleImages: [
      {
        url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
        publicId: 'sample-biomedical-1',
        order: 0
      }
    ]
  }
];

export function getCategoryTemplateBySlug(slug: string): ProductCategoryTemplate | undefined {
  return PRODUCT_CATEGORY_TEMPLATES.find((cat) => cat.slug === slug);
}

export function getCategoryTemplateById(id: string): ProductCategoryTemplate | undefined {
  return PRODUCT_CATEGORY_TEMPLATES.find((cat) => cat.id === id);
}
