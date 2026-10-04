type ProductCardIdentity = {
  slug?: string;
  name?: string;
};

const hiddenProductSlugs = new Set([
  'axa-cloth-bag-vending-machine-eco-dispenser',
  'axa-swi-3kw-solid-waste-incinerator',
  'axa-ecoburn-100-sanitary-napkin-disposal-machine',
  'sanitary-napkin-incinerator-machine-ecoburn-100',
  'sanitary-napkin-disposal-machine',
  'biomedical-hazardous-waste-incinerator',
  'axa-thermal-destroyer-100-solid-waste-incinerator',
  'axa-sense-10-1-touch-feedback-machine-kiosk'
]);

const hiddenProductNames =
  /\b(?:bio[- ]?thermal\s*50|bio[- ]?medical waste incinerator|swi\s*3kw|sanitary napkin (?:disposal|incinerator)|eco.?vend.*cloth bag|cloth bag vending machine|thermal[- ]?destroyer\s*100|sense\s*10\.1.*feedback)\b/i;

export function isVisibleInProductCatalog(product: ProductCardIdentity): boolean {
  if (product.slug && hiddenProductSlugs.has(product.slug)) return false;
  return !product.name || !hiddenProductNames.test(product.name);
}
