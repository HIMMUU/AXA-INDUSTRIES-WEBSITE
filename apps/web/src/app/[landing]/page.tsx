import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect, notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MACHINE_PRICING } from '@axa/types';

const siteUrl = 'https://axaindustries.com';

const pages = {
  'sanitary-napkin-vending-machine': {
    title: 'Sanitary Napkin Vending Machine for Institutions in India',
    description:
      'Compare manual and automatic sanitary napkin vending machines for schools, colleges, hostels, offices and hospitals. Review capacity and request an itemized AXA quote.',
    heading: 'Sanitary Napkin Vending Machines for Institutions',
    intro:
      'AXA Industries lists manual VND and automatic AVND sanitary napkin vending machines for institutional washrooms in India. Buyers comparing sanitary pad vending machine manufacturers or suppliers can select a model by expected daily use, refill frequency, available power and preferred dispensing method—not by capacity alone.',
    sections: [
      {
        heading: 'Manual or automatic: how to choose',
        body: 'Manual and mechanical models can suit locations that prefer a simple, power-free dispenser. Automatic models are available in coin-operated or multi-coin and push-button configurations; check each model’s power, payment and backup details before specifying it. A sanitary pad vending machine and a sanitary napkin dispenser machine are commonly used names for this equipment.',
        bullets: [
          'Estimate daily users and the number of pads to be stocked between refills.',
          'Confirm whether dispensing is free, coin-operated or another supported configuration.',
          'Check wall space and whether wall-mounted installation is suitable, as well as power availability and who will refill the unit.',
          'For schools, colleges and hostels, plan placement, privacy, refill ownership and a disposal route together.'
        ]
      },
      {
        heading: 'Capacity and model selection',
        body: 'The model selector on AXA’s product page lists manual VND and automatic AVND models with different storage capacities and operating methods. The AVND 50 H is listed with 50-pad capacity; use the selector for the current model specifications and ask sales to confirm the configuration in writing.',
        bullets: [
          'Lower-capacity models may fit washrooms with frequent refills and limited wall space.',
          'Higher-capacity options can reduce refill frequency where usage is heavier.',
          'Confirm the napkin dimensions and dispensing compatibility before ordering.'
        ]
      },
      {
        heading: 'Price and institutional procurement',
        body: 'The product page displays model-level indicative prices, with GST extra as stated there. Final quotations may depend on selected model, quantity, delivery, installation and procurement requirements. Request an itemized quote rather than relying on a generic price shown in a search result.',
        bullets: [
          'Specify model, quantity, delivery PIN code and installation needs.',
          'Ask for GST, freight, installation, warranty and delivery terms as separate quote details.',
          'For public or institutional purchasing, confirm current documentation and procurement eligibility directly with AXA.'
        ]
      }
    ],
    links: [
      { href: '/products/axa-autovend-50-sanitary-napkin-vending-machine', label: 'View AXA AutoVend 50 product details' },
      { href: '/sanitary-napkin-vending-machine-price', label: 'See the sanitary vending machine price guide' },
      { href: '/menstrual-waste-management', label: 'Plan a vending and disposal setup' },
      { href: '/sanitary-napkin-vending-machine-delhi-ncr', label: 'Enquire about Delhi NCR procurement' }
    ],
    faq: [
      {
        question: 'What is the difference between a sanitary napkin vending machine and a dispenser?',
        answer: 'The terms are often used for the same product category. AXA lists manual/mechanical dispensers as well as automatic models; check the selected model’s dispensing and payment method.'
      },
      {
        question: 'Which sanitary pad vending machine is suitable for a school or college?',
        answer: 'Choose based on expected use, refill schedule, payment policy, installation conditions and the users’ needs. Ask the supplier to confirm the model capacity and site requirements in the quotation.'
      },
      {
        question: 'What is the price of a sanitary napkin vending machine in India?',
        answer: 'AXA displays model-specific indicative prices on its product page. Prices and configurations should be reconfirmed in a written quote, including GST, delivery and installation if applicable.'
      },
      {
        question: 'Does AXA supply sanitary napkin vending machines in Delhi NCR?',
        answer: 'AXA publishes a New Delhi address and describes pan-India supply. Contact the company to confirm current stock, delivery, installation and service availability for your Delhi NCR site.'
      }
    ]
  },
  'sanitary-napkin-vending-machine-price': {
    title: 'Sanitary Napkin Vending Machine Price in India | AXA',
    description:
      'Understand what affects sanitary napkin vending machine prices in India. Compare AXA’s currently listed manual and automatic starting prices, GST basis and quote factors.',
    heading: 'Sanitary Napkin Vending Machine Price in India',
    intro:
      'Vending machine price depends on the model, storage capacity and dispensing method. AXA’s model selector currently lists manual VND options from ₹3,500 and automatic AVND options from ₹5,500, before GST. Treat these as indicative prices displayed in the product model data and reconfirm availability and the complete delivered cost in a written quotation.',
    sections: [
      {
        heading: 'Current listed starting prices',
        body: 'The figures below are the lowest model prices currently present in AXA’s product model selector. They are not a complete delivered quotation; confirm the chosen model, GST, freight, installation, quantity and any custom configuration with AXA before procurement.',
        bullets: [
          `Manual sanitary napkin vending machine: from ₹${Math.min(...MACHINE_PRICING.vending_manual.models.map((model) => model.price)).toLocaleString('en-IN')} + GST (${MACHINE_PRICING.vending_manual.models.find((model) => model.price === Math.min(...MACHINE_PRICING.vending_manual.models.map((item) => item.price)))?.model}).`,
          `Automatic sanitary napkin vending machine: from ₹${Math.min(...MACHINE_PRICING.vending_automatic.models.map((model) => model.price)).toLocaleString('en-IN')} + GST (${MACHINE_PRICING.vending_automatic.models.find((model) => model.price === Math.min(...MACHINE_PRICING.vending_automatic.models.map((item) => item.price)))?.model}).`
        ]
      },
      {
        heading: 'What changes the final price?',
        body: 'A sanitary pad vending machine price is not determined by the keyword or product category alone. Compare like-for-like specifications and ask for an itemized offer.',
        bullets: [
          'Manual/mechanical, coin or multi-coin, and push-button operation.',
          'Capacity, orientation, enclosure and any display or backup features.',
          'Number of machines, destination, freight and installation/site work.',
          'GST treatment, warranty coverage, delivery estimate and payment terms.'
        ]
      },
      {
        heading: 'Get a comparable quotation',
        body: 'Tell AXA the institution type, estimated daily use, preferred dispensing method, quantity and delivery PIN code. Request the model name, price basis, GST, delivery/installation scope and warranty in the same written quotation so supplier comparisons are meaningful.',
        bullets: [
          'Ask for the exact model and capacity—not only a generic “automatic machine” description.',
          'Confirm whether pads or consumables are included; do not assume they are.',
          'For a combined menstrual hygiene setup, request vending and disposal equipment as separate line items.'
        ]
      }
    ],
    links: [
      { href: '/sanitary-napkin-vending-machine', label: 'Compare manual and automatic vending machines' },
      { href: '/products/axa-autovend-50-sanitary-napkin-vending-machine', label: 'View AXA AutoVend 50 details' },
      { href: '/contact', label: 'Request a model-specific quotation' }
    ],
    faq: [
      {
        question: 'How much does an automatic sanitary pad vending machine cost?',
        answer: `AXA’s current model selector lists automatic models from ₹${Math.min(...MACHINE_PRICING.vending_automatic.models.map((model) => model.price)).toLocaleString('en-IN')} + GST. Confirm the model, stock, tax and delivered price directly in a current quotation.`
      },
      {
        question: 'Why do sanitary napkin vending machine prices vary?',
        answer: 'Capacity, dispensing method, payment configuration, enclosure, quantity, delivery and installation can affect the total. Compare exact model specifications and the same price basis.'
      },
      {
        question: 'Does the listed price include GST?',
        answer: 'The model prices referenced on this page are shown before GST. Ask AXA to state tax, delivery and installation separately in the final quotation.'
      },
      {
        question: 'Can I get a bulk or school/college quotation?',
        answer: 'Yes. Use the contact or product quote form to provide the institution, quantity, preferred model and delivery location; AXA can respond with a project-specific quotation.'
      }
    ]
  },
  'sanitary-napkin-incinerator-price': {
    title: 'Sanitary Napkin Incinerator Price in India | AXA SND Series',
    description:
      'Compare current listed AXA SND sanitary napkin incinerator prices by model and capacity. Prices are indicative and GST extra; request a written delivered quotation.',
    heading: 'Sanitary Napkin Incinerator Machine Price in India',
    intro:
      'Sanitary napkin incinerator prices vary by model and stated daily capacity. AXA’s current SND model data lists options from ₹3,800 + GST for SND 100; larger capacity and display models have separate listed prices. Confirm current availability and full delivered cost directly with AXA.',
    sections: [
      {
        heading: 'How to compare SND model prices',
        body: 'Compare the model name, stated napkins-per-day capacity, display/control features, installation requirements and warranty terms. The current figures are the site-listed model prices before GST—not a guarantee of stock, final tax, freight or site work.',
        bullets: MACHINE_PRICING.disposal_machine.models.map(
          (model) => `${model.model}: ₹${model.price.toLocaleString('en-IN')} + GST; stated capacity ${model.capacity}. Confirm configuration and current price in writing.`
        )
      },
      {
        heading: 'What the final quote should include',
        body: 'A price comparison is meaningful only when suppliers quote the same capacity and scope. Ask AXA to state all relevant charges and responsibilities explicitly.',
        bullets: [
          'Exact model and intended waste stream.',
          'GST, delivery/freight and any installation or site work.',
          'Lead time, warranty coverage, maintenance and service process.',
          'Operating instructions and any requirements for power, mounting, ventilation or residue handling.'
        ]
      },
      {
        heading: 'Request a current sanitary pad incinerator quotation',
        body: 'Share the facility type, expected daily usage, number of locations and delivery PIN code. AXA can confirm which SND model is appropriate to evaluate and provide a project-specific quote.',
        bullets: [
          'Do not select capacity solely from a product name; estimate actual site usage.',
          'Verify the selected equipment is suitable for the exact waste and location.',
          'Request current product documentation and written terms before procurement.'
        ]
      }
    ],
    links: [
      { href: '/sanitary-napkin-incinerator', label: 'Compare sanitary napkin incinerator options' },
      { href: '/sanitary-waste-disposal-machine', label: 'Understand disposal equipment by waste stream' },
      { href: '/products/axa-ecoburn-100-sanitary-napkin-disposal-machine', label: 'View AXA SND product information' },
      { href: '/contact', label: 'Request an itemized quotation' }
    ],
    faq: [
      {
        question: 'What is the starting price of a sanitary napkin incinerator?',
        answer: 'AXA’s current model data lists the SND 100 at ₹3,800 + GST. Confirm the current model price, tax, availability and delivery costs before ordering.'
      },
      {
        question: 'Why do sanitary pad incinerator prices vary by model?',
        answer: 'The SND selector lists models with different stated capacities and display/control configurations. Freight, installation, quantity and site requirements may also affect the final quote.'
      },
      {
        question: 'Does the price include GST and installation?',
        answer: 'The listed model prices are shown before GST. Installation and delivery scope should be confirmed separately in a written quotation.'
      }
    ]
  },
  'sanitary-napkin-incinerator': {
    title: 'Sanitary Napkin Incinerator & Disposal Machine for Institutions',
    description:
      'Explore sanitary napkin incinerator and pad disposal machine options for institutional washrooms. Compare AXA SND series capacities and request model-specific specifications.',
    heading: 'Sanitary Napkin Incinerator and Disposal Machines',
    intro:
    'A sanitary napkin incinerator is one option institutions consider for managing used menstrual products at the point of use. Buyers also search for a sanitary pad incinerator, menstrual waste incinerator or sanitary napkin disposal machine. AXA lists an SND series in multiple daily-capacity models; select equipment only after reviewing its operating instructions, site requirements and applicable waste-handling rules.',
    sections: [
      {
        heading: 'Select capacity from actual usage',
        body: 'AXA’s product model selector lists SND 100 through SND 600 options with different stated napkin-per-day capacities. Estimate actual daily volume, peak use and collection routines before selecting capacity; the label should not be treated as a guarantee of performance under every operating condition.',
        bullets: [
          'Estimate the quantity of used napkins generated at the intended site.',
          'Confirm power, installation, ventilation/clearance and operator requirements from the current manual.',
          'Ask which consumables, maintenance tasks and ash/waste handling steps apply to the selected model.',
          'Request the exact model data sheet and written warranty terms.'
        ]
      },
      {
        heading: 'Incinerator versus sanitary pad disposal machine',
        body: '“Sanitary pad disposal machine” is a broad search term. Buyers should verify whether a listing is an incinerator or another disposal approach, what waste it is designed for, and what operating and maintenance steps it requires. Do not use equipment outside its stated design or applicable local rules.',
        bullets: [
          'Keep sanitary napkin equipment distinct from general solid or biomedical waste incinerators.',
          'Confirm the supplier’s current instructions, test documentation and permitted use for your site.',
          'Plan user instructions, collection, cleaning, service and final residue handling before installation.'
        ]
      },
      {
        heading: 'Price and site requirements',
        body: 'AXA’s product page displays model-level indicative pricing, with GST extra as stated in the model selector. Ask for a written quote with the selected SND capacity, electrical and mounting requirements, delivery, installation, warranty and service scope.',
        bullets: [
          'The SND 100 model is listed from ₹3,800 + GST in the current model data; confirm the price before purchase.',
          'Higher-capacity models have different listed prices and configurations.',
          'Institutional procurement should include training, maintenance responsibilities and a safe handling procedure.'
        ]
      }
    ],
    links: [
      { href: '/products/axa-ecoburn-100-sanitary-napkin-disposal-machine', label: 'View AXA sanitary napkin disposal product details' },
      { href: '/sanitary-napkin-incinerator-price', label: 'Compare listed SND model prices' },
      { href: '/sanitary-waste-disposal-machine', label: 'Understand sanitary versus general waste equipment' },
      { href: '/menstrual-waste-management', label: 'Read the institutional planning guide' },
      { href: '/contact', label: 'Request a sanitary disposal quote' }
    ],
    faq: [
      {
        question: 'What is the price of a sanitary napkin incinerator in India?',
        answer: 'AXA’s model data lists the SND 100 from ₹3,800 + GST; other capacities have different listed prices. Confirm availability, tax, delivery and installation in a current quote.'
      },
      {
        question: 'What is the price of a sanitary napkin disposal machine?',
        answer: 'AXA lists the SND 100 sanitary napkin disposal/incinerator model from ₹3,800 + GST in its current product data. Confirm the model, intended use, availability and delivered price in writing.'
      },
      {
        question: 'What is the difference between a sanitary napkin incinerator and a disposal machine?',
        answer: '“Disposal machine” can describe different approaches. AXA’s SND product family is presented as an incinerator series; verify the exact process, intended waste and operating instructions before selecting equipment.'
      },
      {
        question: 'Which sanitary pad incinerator is suitable for a school?',
        answer: 'Estimate daily usage and choose a capacity with the supplier, while checking power, installation, operator training, maintenance and applicable waste rules for the specific site.'
      },
      {
        question: 'Can a sanitary napkin incinerator be used for all waste?',
        answer: 'No. Use equipment only for waste types explicitly listed by its manufacturer and permitted by applicable requirements. Sanitary napkin equipment should not be assumed to handle general or biomedical waste.'
      }
    ]
  },
  'sanitary-waste-disposal-machine': {
    title: 'Sanitary Waste Disposal Machine for Schools and Institutions',
    description:
      'Compare sanitary napkin disposal equipment with general solid-waste incinerators. Review site, capacity and operating questions before choosing a sanitary waste disposal machine.',
    heading: 'Sanitary Waste Disposal Machines: Choose by Waste Stream',
    intro:
      '“Sanitary waste disposal machine” can refer to equipment for used menstrual products or, in some searches, broader facility waste. Buyers comparing a sanitary waste disposal machine manufacturer or supplier in India should start by identifying the exact waste stream and process. A sanitary napkin incinerator and a general solid-waste incinerator are different product categories and should not be substituted without manufacturer and regulatory confirmation.',
    sections: [
      {
        heading: 'Identify what the machine must process',
        body: 'Write down the waste type, expected daily quantity, location and who will operate the equipment. For menstrual products, review the SND sanitary napkin disposal series. For other dry waste streams, review the separate solid-waste equipment information and confirm permitted materials with the supplier.',
        bullets: [
          'Used sanitary napkins and general dry waste are not interchangeable specifications.',
          'Do not assume equipment described for one material is approved for another.',
          'Ask for operating limits and the current model documentation before procurement.'
        ]
      },
      {
        heading: 'Questions to include in a supplier quote',
        body: 'A technically comparable quote should identify the equipment model, intended waste, stated capacity and the work the site must provide.',
        bullets: [
          'What exact waste types and daily/batch limits does the selected model support?',
          'What electrical, ventilation, mounting and operator-training requirements apply?',
          'How are residues handled, and what routine maintenance is required?',
          'What certifications or test reports apply to this exact model and use case?'
        ]
      },
      {
        heading: 'AXA equipment categories',
        body: 'AXA lists SND sanitary napkin incinerator models and separate SWI solid-waste incinerator products. Review the relevant product page and request written confirmation of suitability for the intended site before ordering.',
        bullets: [
          'SND series: sanitary napkin disposal/incinerator category.',
          'SWI series: solid-waste incinerator category; ask the supplier to confirm the permitted waste and installation conditions.'
        ]
      }
    ],
    links: [
      { href: '/sanitary-napkin-incinerator', label: 'Compare sanitary napkin incinerator options' },
      { href: '/sanitary-napkin-incinerator-price', label: 'Compare listed SND model prices' },
      { href: '/products/axa-swi-3kw-solid-waste-incinerator', label: 'View solid-waste incinerator product details' },
      { href: '/menstrual-waste-management', label: 'Plan menstrual waste handling at an institution' },
      { href: '/contact', label: 'Ask AXA to confirm model suitability' }
    ],
    faq: [
      {
        question: 'Is a sanitary waste disposal machine the same as a biomedical waste incinerator?',
        answer: 'Not necessarily. Equipment has specific intended waste streams and operating conditions. Confirm the exact model’s approved use with the manufacturer and check the requirements that apply to your facility.'
      },
      {
        question: 'Can sanitary napkins be put into a general solid-waste incinerator?',
        answer: 'Do not assume this is permitted. Follow the exact equipment manual and applicable waste-management requirements; get written confirmation from the supplier for the intended material.'
      },
      {
        question: 'What should a school or hospital check before buying disposal equipment?',
        answer: 'Confirm waste compatibility, capacity, power and installation requirements, operator training, maintenance, residue handling, service terms and model-specific documentation.'
      }
    ]
  },
  'menstrual-waste-management': {
    title: 'Menstrual Waste Management Plan for Schools and Colleges',
    description:
      'A practical menstrual waste management planning guide for schools, colleges, hostels and workplaces: estimate use, provide access, plan disposal and assign operations.',
    heading: 'Menstrual Waste Management for Schools, Colleges and Workplaces',
    intro:
      'A reliable menstrual hygiene programme connects product access with convenient disposal, clear user guidance and a named facilities owner. This planning guide helps institutions scope vending and disposal equipment without assuming one machine or process fits every site.',
    sections: [
      {
        heading: '1. Assess users, locations and demand',
        body: 'Map washrooms, operating hours and likely usage. Consult facilities staff and users respectfully; avoid collecting sensitive personal data. Estimate how often machines will need replenishment and how much waste each location may generate.',
        bullets: [
          'Count locations and identify accessible, private placement options.',
          'Estimate use by location and time period to plan stock and collection.',
          'Assign responsibility for replenishment, cleaning, inspection and incident reporting.'
        ]
      },
      {
        heading: '2. Pair access with a disposal plan',
        body: 'Where a vending machine is installed, ensure that users can also find clear disposal instructions and a suitable waste-handling route. If considering an incinerator, confirm the exact waste compatibility, site conditions, operator instructions, maintenance and local requirements before selection.',
        bullets: [
          'Choose manual or automatic vending based on the facility’s operating needs.',
          'Select disposal equipment only for the waste types its manufacturer specifies.',
          'Post simple instructions and provide a contact route for faults or empty stock.'
        ]
      },
      {
        heading: '3. Plan procurement and ongoing operations',
        body: 'Procurement should cover the complete operating arrangement—not only the unit price. Ask suppliers for model, capacity, tax, delivery, installation, warranty and service details, then document the institution’s refill, maintenance and waste-handling responsibilities.',
        bullets: [
          'Use an itemized quotation with the exact machine model and options.',
          'Train the responsible facilities team and maintain service records.',
          'Review stock availability, equipment faults and user feedback periodically.'
        ]
      }
    ],
    links: [
      { href: '/sanitary-napkin-vending-machine', label: 'Compare institutional vending machines' },
      { href: '/sanitary-napkin-incinerator', label: 'Review sanitary napkin disposal options' },
      { href: '/sanitary-napkin-vending-machine-price', label: 'Understand indicative machine pricing' },
      { href: '/contact', label: 'Discuss an institutional requirement' }
    ],
    faq: [
      {
        question: 'What machines are needed for menstrual waste management in a school?',
        answer: 'Needs differ by site. Institutions commonly assess product access, suitable disposal facilities, user instructions, stock replenishment and waste collection. Choose equipment only after reviewing capacity, site conditions and applicable requirements.'
      },
      {
        question: 'Should a school install a vending machine and an incinerator together?',
        answer: 'That depends on the facility’s waste process, site requirements, budget and applicable rules. Plan access and disposal together, but verify that any selected disposal equipment is appropriate for the intended waste and location.'
      },
      {
        question: 'How do institutions estimate machine capacity?',
        answer: 'Estimate the number of users, expected daily use, refill frequency and peak periods for each location. Confirm the selected model’s stated capacity and operating limits with its supplier.'
      }
    ]
  },
  'sanitary-napkin-vending-machine-delhi-ncr': {
    title: 'Sanitary Napkin Vending Machine Supplier in Delhi NCR | AXA',
    description:
      'Contact AXA Industries in New Delhi about sanitary napkin vending machines for Delhi NCR schools, colleges, hostels and workplaces. Confirm delivery and installation for your site.',
    heading: 'Sanitary Napkin Vending Machines for Delhi NCR Institutions',
    intro:
      'AXA Industries publishes a New Delhi address in Badarpur and lists sanitary napkin vending equipment for institutional washrooms. Schools, colleges, hostels, offices and hospitals in Delhi NCR can contact the team to confirm current model availability, delivery, installation and service for their specific location.',
    sections: [
      {
        heading: 'What to include in a Delhi NCR enquiry',
        body: 'Local delivery, installation and service scope can vary by site and order. Share your city/area and PIN code so AXA can confirm coverage rather than assuming the same schedule applies across Delhi, Noida, Gurugram, Ghaziabad and Faridabad.',
        bullets: [
          'Institution type, site address or PIN code and number of washrooms.',
          'Manual or automatic preference, expected users and machine quantity.',
          'Whether delivery, wall mounting, commissioning or staff orientation is requested.',
          'Any tender, GST invoice or technical-document requirements.'
        ]
      },
      {
        heading: 'Choose the model before comparing quotes',
        body: 'The product range includes manual/mechanical and automatic dispensing options with differing capacity and operation. Ask for a model-specific quote that states the GST basis, freight, installation, lead time, warranty and after-sales scope for your exact NCR location.',
        bullets: [
          'Compare the same dispensing method and capacity across suppliers.',
          'Confirm site power and mounting requirements for the selected model.',
          'Pair product access with a suitable disposal and refill plan.'
        ]
      },
      {
        heading: 'Contact AXA Industries',
        body: 'The company’s published address is E57/A, Gali No. 10, Harinagar Extension Part II, Jaitpur, Badarpur, New Delhi 110044. Contact the team directly to verify current office, delivery and service details before arranging a visit or procurement.',
        bullets: [
          'Call: +91 85951 56873 or +91 80764 96709.',
          'Email: axaclub1@gmail.com.',
          'Use the contact form to send site requirements and request a written quotation.'
        ]
      }
    ],
    links: [
      { href: '/sanitary-napkin-vending-machine', label: 'Compare sanitary napkin vending machine models' },
      { href: '/sanitary-napkin-vending-machine-price', label: 'Review price factors and listed starting prices' },
      { href: '/products/axa-autovend-50-sanitary-napkin-vending-machine', label: 'View AXA AutoVend 50 details' },
      { href: '/contact', label: 'Contact AXA about a Delhi NCR site' }
    ],
    faq: [
      {
        question: 'Does AXA supply sanitary napkin vending machines in Delhi NCR?',
        answer: 'AXA publishes a New Delhi address and describes pan-India supply. Contact AXA with your site PIN code to confirm current delivery, installation and service availability.'
      },
      {
        question: 'Can AXA install a machine in Noida or Gurugram?',
        answer: 'The website does not publish a city-specific installation SLA. Share the exact site location and requirements with AXA and obtain written confirmation of installation scope and timing.'
      },
      {
        question: 'What information is needed for a local quotation?',
        answer: 'Provide institution type, site PIN code, quantity, preferred dispensing method, capacity needs and whether installation or procurement documentation is required.'
      }
    ]
  }
} as const;

type LandingSlug = keyof typeof pages;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((landing) => ({ landing }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ landing: string }>;
}): Promise<Metadata> {
  const { landing } = await params;
  const page = pages[landing as LandingSlug];

  if (!page) notFound();

  const canonical = `${siteUrl}/${landing}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: 'AXA Industries',
      locale: 'en_IN',
      type: 'website'
    },
    robots: { index: true, follow: true }
  };
}

export default async function SeoLandingPage({
  params
}: {
  params: Promise<{ landing: string }>;
}) {
  const { landing } = await params;
  const page = pages[landing as LandingSlug];
  if (!page) notFound();

  const canonical = `${siteUrl}/${landing}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${siteUrl}/#website` }
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#0A0A0C] dark:text-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-neutral-700 dark:text-neutral-300">{page.heading}</li>
            </ol>
          </nav>

          <header className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              AXA Industries · Institutional Equipment
            </p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">{page.heading}</h1>
            <p className="max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-300">{page.intro}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 text-sm font-bold hover:border-blue-500 dark:border-white/15">
                Browse product catalogue
              </Link>
            </div>
          </header>

          <div className="grid gap-8">
            {page.sections.map((section) => (
              <section key={section.heading} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-xl font-extrabold sm:text-2xl">{section.heading}</h2>
                <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">{section.body}</p>
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-6 text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold">Frequently asked questions</h2>
            <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-white/10 dark:border-white/10">
              {page.faq.map((item) => (
                <details key={item.question} className="group p-5">
                  <summary className="cursor-pointer list-none pr-5 font-bold marker:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-blue-50 p-6 dark:bg-blue-950/30">
            <h2 className="text-xl font-extrabold">Related AXA resources</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {page.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:underline dark:text-blue-300">
                    {link.label} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-xs leading-5 text-neutral-500">
            Product configuration, availability, pricing, tax, delivery, installation, service and permitted use are subject to written confirmation by AXA Industries for the selected model and site.
          </p>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </div>
  );
}
