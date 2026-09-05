import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient, AdminRole, AdminStatus, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Load .env manually if process.env.DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(__dirname, '../../../.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...valParts] = trimmed.split('=');
          const val = valParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key.trim()] = val.trim();
        }
      }
    }
  } catch (e) {
    // Ignore error
  }
}

const prisma = new PrismaClient();

const SAMPLE_CATEGORY_PRODUCTS = [
  {
    name: 'AXA AutoVend 50 Sanitary Napkin Vending Machine',
    slug: 'axa-autovend-50-sanitary-napkin-vending-machine',
    shortDescription: 'Coin & UPI QR operated 50-pad capacity sanitary napkin vending machine with low-stock LED alert.',
    description: 'The AXA AutoVend 50 is an automated sanitary napkin dispenser designed for high-footfall institutions such as colleges, offices, and hospitals. Enclosed in a heavy-duty powder-coated steel chassis with multi-coin and UPI payment option.',
    price: 6600.00,
    status: ProductStatus.PUBLISHED,
    featured: true,
    metaTitle: 'AXA AutoVend 50 - Sanitary Napkin Vending Machine',
    metaDescription: 'Automatic 50-napkin capacity vending machine with coin & UPI payments for public and commercial restrooms.',
    specifications: [
      { key: 'Napkin Capacity', value: '50 Napkins', sortOrder: 1 },
      { key: 'Payment Mode', value: 'Multi-Coin Acceptor / UPI QR Code', sortOrder: 2 },
      { key: 'Enclosure Material', value: '1.2mm Powder-Coated Mild Steel', sortOrder: 3 },
      { key: 'Mounting Type', value: 'Wall Mountable', sortOrder: 4 },
      { key: 'Display & Alerts', value: 'Digital LCD Display & Red Low-Stock LED', sortOrder: 5 },
      { key: 'Power Consumption', value: '10W (220V AC, 50Hz)', sortOrder: 6 }
    ],
    images: [
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786383062/ChatGPT_Image_Aug_10_2026_10_59_46_PM_1_kvcdy8.png',
        publicId: 'vending-machine-50',
        order: 0
      }
    ]
  },
  {
    name: 'AXA SND Sanitary Napkin & Mask Incinerator Machine',
    slug: 'axa-ecoburn-100-sanitary-napkin-disposal-machine',
    shortDescription: 'Compact Sanitary Napkin & Mask Incinerator with high-efficiency heater, LCD temp display, auto cutoff & ceramic insulation.',
    description: 'AXA SND Series is engineered for hygienic sanitary napkin & mask incineration. Consumes lowest power in its class with an inbuilt automatic thermosensor for efficient operation, long running, and overheat protection. Wall-mounted and table-top ready. CE approved and tested as per CPCB norms. Available from SND 100 to SND 600.',
    price: 3800.00,
    status: ProductStatus.PUBLISHED,
    featured: true,
    metaTitle: 'AXA SND 500 - Sanitary Napkin & Mask Incinerator Machine',
    metaDescription: 'Compact electric napkin & mask incinerator with 2500W heater, LCD display, auto cut-off timer, and ceramic fiber insulation.',
    specifications: [
      { key: 'Dimensions (LxWxH)', value: '710 x 320 x 320 mm', sortOrder: 1 },
      { key: 'Heater Power', value: '2500 Watt High-Efficiency Heater', sortOrder: 2 },
      { key: 'Weight', value: 'Approx 30 kg', sortOrder: 3 },
      { key: 'Display', value: 'LCD Display with Temperature & Timer', sortOrder: 4 },
      { key: 'Body Material', value: 'MS Powder Coated Body', sortOrder: 5 },
      { key: 'Auto Cutoff', value: '15 Min Auto Cutoff (25-30 Min Settable Cycle)', sortOrder: 6 },
      { key: 'Insulation', value: '25mm Ceramic Fiber Thermal Insulation', sortOrder: 7 },
      { key: 'Daily Capacity', value: '500-800 Napkins / 2000-2500 Masks per Day', sortOrder: 8 },
      { key: 'Single Batch Load', value: '25-30 Napkins or 40-50 Masks at once', sortOrder: 9 },
      { key: 'Residue Ash', value: 'Less than 1g Ash per Napkin', sortOrder: 10 },
      { key: 'Mounting Options', value: 'Wall Mounted / Table Top', sortOrder: 11 },
      { key: 'Compliance & Safety', value: 'CE Approved & CPCB Norm Compliant Test Report', sortOrder: 12 }
    ],
    images: [
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/mainsnd_mle9pt.jpg',
        publicId: 'mainsnd_mle9pt',
        order: 0
      },
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/frrontsnd_qypbta.jpg',
        publicId: 'frrontsnd_qypbta',
        order: 1
      },
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458267/left_snd_ozcmjm.jpg',
        publicId: 'left_snd_ozcmjm',
        order: 2
      },
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/f_auto,q_auto/v1786458268/installsnd_ifajcr.png',
        publicId: 'installsnd_ifajcr',
        order: 3
      }
    ]
  },
  {
    name: 'AXA Swachh Toilet Feedback Machine',
    slug: 'axa-sense-10-1-touch-feedback-machine-kiosk',
    shortDescription: 'App-based live monitoring washroom feedback machine with 3 feedback push buttons (Good, Average, Dirty).',
    description: 'The AXA Swachh Toilet Feedback Machine is a smart live monitoring system for public & institutional washrooms. Features 3 distinct feedback push buttons (Green for Good, Yellow for Average, Red for Dirty), app-based monitoring software for live CSAT feedback, and durable MS powder-coated body.',
    price: 8500.00,
    status: ProductStatus.PUBLISHED,
    featured: true,
    metaTitle: 'AXA Swachh Toilet Feedback Machine - Live App Monitoring',
    metaDescription: '3-button live toilet feedback machine (Good, Average, Dirty) with app-based monitoring software & MS powder coated body.',
    specifications: [
      { key: 'Dimensions (LxWxH)', value: '210 x 160 x 70 mm', sortOrder: 1 },
      { key: 'Body Material', value: 'MS Powder Coated Body', sortOrder: 2 },
      { key: 'Software & Monitoring', value: 'App-Based Software Live Monitoring', sortOrder: 3 },
      { key: 'Operating Voltage', value: 'Works on Electricity (220V AC)', sortOrder: 4 },
      { key: 'Feedback Buttons', value: '1. Good (Green), 2. Average (Yellow), 3. Dirty (Red)', sortOrder: 5 },
      { key: 'Compliance', value: 'Swachh Bharat Cleanliness Drive Compliant', sortOrder: 6 }
    ],
    images: [
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786303502/Studio_product_photography_creation_2K_202608100044_mcmwez.png',
        publicId: 'swachh-feedback-machine',
        order: 0
      }
    ]
  },
  {
    name: 'AXA Solid Waste Incinerator Machine (SWI 3kW / 5-8kg)',
    slug: 'axa-swi-3kw-solid-waste-incinerator',
    shortDescription: '3kW Solid Waste Incinerator Machine for dry waste, PPE kits, masks, cotton & paper waste (5-8kg capacity).',
    description: 'AXA SWI 3kW Solid Waste Incinerator Machine is engineered to dispose of general dry waste & medical waste such as used PPE kits, masks, cotton, dry leaves, papers & other dry waste. Features automatic digital temperature controller, 50mm thick insulation, 3kW heater, and 4 heavy-duty caster wheels.',
    price: 165000.00,
    status: ProductStatus.PUBLISHED,
    featured: true,
    metaTitle: 'AXA SWI 3kW - Solid Waste Incinerator Machine',
    metaDescription: 'Solid Waste Incinerator Machine for PPE kits, masks & dry waste with 3kW heater, digital controller & caster wheels.',
    specifications: [
      { key: 'Dimensions (LxWxH)', value: '1070 x 580 x 580 mm', sortOrder: 1 },
      { key: 'Batch Capacity', value: 'Burns 5 - 8 kgs per batch', sortOrder: 2 },
      { key: 'Burning Time', value: '45 Minutes per batch', sortOrder: 3 },
      { key: 'Temperature Controller', value: 'Automatic Digital Temperature Controller', sortOrder: 4 },
      { key: 'Heater Power', value: '3kW High-Performance Heater', sortOrder: 5 },
      { key: 'Power Supply', value: '220V AC Supply', sortOrder: 6 },
      { key: 'Thermal Insulation', value: '50mm Thick Insulation', sortOrder: 7 },
      { key: 'Enclosure & Mobility', value: 'MS Powder Coated Body with 4 Caster Wheels', sortOrder: 8 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
        publicId: 'swi-3kw-incinerator',
        order: 0
      }
    ]
  },
  {
    name: 'AXA Solid Waste Incinerator Machine (SWI 4.5kW / 8-10kg)',
    slug: 'axa-thermal-destroyer-100-solid-waste-incinerator',
    shortDescription: 'Heavy-duty 4.5kW Solid Waste Incinerator Machine for dry & medical waste disposal (8-10kg capacity).',
    description: 'Heavy-duty AXA SWI 4.5kW Solid Waste Incinerator Machine designed for larger institutional waste disposal. Burns 8-10 kg per batch of PPE kits, masks, cotton, paper, and dry organic waste in 45 minutes with automatic digital temperature control.',
    price: 215000.00,
    status: ProductStatus.PUBLISHED,
    featured: true,
    metaTitle: 'AXA SWI 4.5kW - Heavy Duty Solid Waste Incinerator',
    metaDescription: 'Heavy-duty 4.5kW solid waste incinerator machine with 8-10kg batch capacity, digital controller & caster wheels.',
    specifications: [
      { key: 'Dimensions (LxWxH)', value: '1200 x 600 x 600 mm', sortOrder: 1 },
      { key: 'Batch Capacity', value: 'Burns 8 - 10 kgs per batch', sortOrder: 2 },
      { key: 'Burning Time', value: '45 Minutes per batch', sortOrder: 3 },
      { key: 'Temperature Controller', value: 'Automatic Digital Temperature Controller', sortOrder: 4 },
      { key: 'Heater Power', value: '4.5kW High-Performance Heater', sortOrder: 5 },
      { key: 'Power Supply', value: '220V AC Supply', sortOrder: 6 },
      { key: 'Thermal Insulation', value: '50mm Thick Insulation', sortOrder: 7 },
      { key: 'Enclosure & Mobility', value: 'MS Powder Coated Body with 4 Caster Wheels', sortOrder: 8 }
    ],
    images: [
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304387/ChatGPT_Image_Aug_10_2026_01_09_31_AM_krrlsc.png',
        publicId: 'swi-4.5kw-incinerator',
        order: 0
      }
    ]
  },
  {
    name: 'AXA EcoVend Cloth Bag Vending Machine Dispenser',
    slug: 'axa-cloth-bag-vending-machine-eco-dispenser',
    shortDescription: 'Automatic cotton cloth bag vending dispenser with coin and UPI QR payment acceptor.',
    description: 'The AXA EcoVend Cloth Bag Vending Machine provides single-use plastic reduction solutions for retail centers, supermarkets, and municipal markets. Holds 100+ folded reusable cotton bags with automated coin/UPI QR code payment release.',
    price: 18500.00,
    status: ProductStatus.PUBLISHED,
    featured: true,
    metaTitle: 'AXA EcoVend - Automatic Cloth Bag Vending Machine',
    metaDescription: 'Eco-friendly automatic cloth bag dispenser with coin & UPI QR payment acceptor for plastic ban compliance.',
    specifications: [
      { key: 'Bag Capacity', value: '100+ Folded Cotton / Canvas Cloth Bags', sortOrder: 1 },
      { key: 'Payment Acceptor', value: 'Multi-Coin Acceptor + UPI QR Code Scanner', sortOrder: 2 },
      { key: 'Dispensing Mechanism', value: 'Motorized Spiral Reel Dispense System', sortOrder: 3 },
      { key: 'Enclosure Material', value: '1.5mm Heavy-Duty CRCA Steel with Powder Coating', sortOrder: 4 },
      { key: 'Display & Audio', value: '16x2 LCD Display + Voice Prompt Guidance', sortOrder: 5 },
      { key: 'Power Input', value: '230V AC, 50Hz (Low 25W Power Consumption)', sortOrder: 6 }
    ],
    images: [
      {
        url: 'https://res.cloudinary.com/j0f3i5re/image/upload/v1786304876/ChatGPT_Image_Aug_10_2026_01_16_20_AM_usvtak.png',
        publicId: 'cloth-bag-vending-101',
        order: 0
      }
    ]
  }
];

async function main() {
  const adminEmail = 'admin@axaindustries.com';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('AdminPass123!', 12);
    const admin = await prisma.admin.create({
      data: {
        email: adminEmail,
        name: 'AXA Business Owner',
        passwordHash,
        role: AdminRole.ADMIN,
        status: AdminStatus.ACTIVE
      }
    });
    console.log('✅ Default Admin created:', admin.email);
  } else {
    console.log('ℹ️ Admin already exists:', existingAdmin.email);
  }

  // Create default company settings if missing
  const settingsCount = await prisma.settings.count();
  if (settingsCount === 0) {
    await prisma.settings.create({
      data: {
        companyName: 'AXA Industries',
        email: 'axaclub1@gmail.com',
        phone: '+91 8076496709, +91 8595156873',
        address: 'E57/A, Gali No - 10, Harinagar EXTN Part - II, Jaitpur, Badarpur - 110044 New Delhi',
        gst: 'GSTIN998877665544',
        socialLinks: {
          linkedin: 'https://linkedin.com/company/axaindustries',
          twitter: 'https://twitter.com/axaindustries'
        },
        footerSettings: {
          copyright: '© 2026 AXA Industries (Flagship Brand AXA CLUB). All rights reserved.'
        }
      }
    });
    console.log('✅ Default Settings initialized');
  }

  // Seed core product categories
  for (const item of SAMPLE_CATEGORY_PRODUCTS) {
    const existing = await prisma.product.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      await prisma.product.create({
        data: {
          name: item.name,
          slug: item.slug,
          shortDescription: item.shortDescription,
          description: item.description,
          price: item.price,
          status: item.status,
          featured: item.featured,
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          images: {
            create: item.images
          },
          specifications: {
            create: item.specifications
          }
        }
      });
      console.log(`✅ Seeded Category Product: ${item.name}`);
    } else {
      console.log(`ℹ️ Product already exists: ${item.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
