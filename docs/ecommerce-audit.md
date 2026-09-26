# AXA Industries E-commerce Performance & Growth Audit

**Audit date:** 27 September 2026  
**Website:** [axaindustries.com](https://axaindustries.com/)  
**Business model observed:** B2B equipment catalogue with quote, contact, phone, and WhatsApp conversion paths. No consumer cart or online checkout was found.  
**Repository reviewed:** storefront, product pages, enquiry API and data-related code in this repository.

## Executive summary

AXA has a clear institutional product range and several strong buying aids: product-specific detail pages, model specifications, some transparent pricing, category/search/sort controls, downloadable brochures, phone and WhatsApp contact, and a visible request-a-quote path. This is a credible basis for a B2B procurement funnel.

The highest-risk issue is lead capture reliability. Both enquiry paths can show a success state when the API request fails; the product quote modal can even show a randomly generated reference that does not come from a saved enquiry. I did **not** submit a test enquiry because that could create a real sales lead. This is a code-proven failure mode, not a claim that a particular live enquiry was lost.

Other directly observed issues include a homepage brochure link that returns **404**, a feedback-machine price that varies across the homepage, catalogue, and product page, conflicting warranty statements, and arbitrary product URLs that return a generic made-up product page with HTTP 200. SEO metadata and structured data are incomplete on the sampled product pages, and the static sitemap omits product detail URLs.

The live site should be treated as a **quote-generation system**, not a retail shop. Measure product discovery, qualified enquiries, quote issuance, and offline wins—not add-to-cart or checkout rates—until an actual checkout exists.

### What is working

- Clear B2B/institutional positioning across schools, hospitals, airports, workplaces, public facilities, and commercial sites.
- The catalogue offers product search, sorting, categories, indicative prices, and brochure downloads.
- Product pages include substantial technical material. The cloth-bag page, for example, includes model comparisons, payment modes, dimensions, deployment contexts, a calculator, FAQs, and quote actions.
- The product detail path provides quote, telephone, and WhatsApp routes; the contact page publishes a Delhi address, two phone numbers, an email address, and business hours.
- The homepage presents product benefits, a procurement process, institutional proof claims, FAQs, testimonials, and a final quote CTA.
- A 390px-wide browser check of a product page found no horizontal overflow; the floating call/WhatsApp controls remained visible.

### What to address first

1. Ensure an enquiry is confirmed only after the API has successfully persisted it; show a real reference only when returned by the API.
2. Repair the broken brochure link and validate every downloadable document URL.
3. Establish one authoritative, model-specific price/GST/warranty source and align every card, hero, detail page, brochure, and legal page to it.
4. Make unknown product slugs return a real 404; provide unique product metadata and include canonical product URLs in the sitemap.
5. Add measurement for the B2B funnel and connect lead outcomes to quote/order records before scaling paid traffic.

## Evidence, limitations, and confidence

### Evidence gathered

- Public browser review of the homepage, product catalogue, cloth-bag product page, feedback-machine product page, contact page, about page, privacy policy, and terms page.
- Browser spot checks included the product catalogue and one product page at a 390 × 844 viewport, an unknown product URL, and the brochure URL.
- Relevant storefront and enquiry API source was inspected. The API was **not** exercised by submitting a form.
- `robots.txt` and the live XML sitemap were fetched.
- Public search/documentation sources were consulted for SEO, product structured data, Merchant Center product data, GA4 event design, and Web Vitals.

### Important limitations

- No GA4, Search Console, Google Ads, Meta Ads, Merchant Center, CRM, sales/order, or revenue account access was available. No actual impressions, rankings, sessions, conversion rates, ROAS, CAC, AOV, margins, or retention rates can be reported.
- Google PageSpeed Insights returned HTTP 429 during the audit. There are no reliable Lighthouse scores, CrUX field data, LCP/INP/CLS values, or mobile/desktop 75th-percentile Core Web Vitals in this report.
- Browser navigation timings below are isolated, uncontrolled observations, not Core Web Vitals and not a representative performance sample. They should trigger repeat testing rather than be treated as a site-wide average.
- Public search providers returned rate limits or incomplete results. The competitor section therefore distinguishes observed search results from comparisons that could not be verified.
- No live form was submitted, so the real deployment API URL, email delivery, spam handling, and persistence were not end-to-end tested. The source shows a deployment configuration risk if `NEXT_PUBLIC_API_URL` is unset.
- Certification, warranty, delivery, customer-count, reliability, and environmental claims are reproduced as site claims, not independently verified facts.

## 1. Business and buyer understanding

**Who the site is for:** procurement teams, facilities managers, institutional administrators, CSR/sustainability teams, and commercial operators buying equipment for schools, universities, hospitals, airports, workplaces, malls, public washrooms, and waste-management settings.

**What it sells:** sanitary napkin vending equipment; sanitary napkin/mask disposal incinerators; cloth-bag vending dispensers; washroom feedback/CSAT terminals; and solid-waste incinerators. Some product lines have multiple capacities, payment modes, or models.

**Why a buyer might choose AXA:** the site presents direct factory supply, model choices, coin/UPI or other payment options, technical specifications, pan-India delivery/installation, institutional procurement support, and quote assistance.

**What could stop a buyer:** inconsistent prices and warranty terms; uncertainty about GST, shipping, installation, delivery time, stock, and service coverage; certification and testimonial claims without linked substantiation; and uncertainty about whether a submitted quote request has actually reached sales.

**Observed buyer journey:** homepage or catalogue → product detail/model comparison → product quote modal, contact form, phone, or WhatsApp → sales review and formal quote → offline purchase/order. The website does not present a cart, payment, or checkout flow. The API contains back-office enquiry/order concepts, but no public retail checkout was found.

## 2. Technical SEO and indexability

| Check | Finding | Action |
|---|---|---|
| Crawl access | Live `robots.txt` allows all crawlers except `/api/` and references the sitemap. | Keep API/private operational endpoints excluded; verify public product pages remain crawlable. |
| Sitemap | The live sitemap contains six URLs (home, catalogue, about, contact, privacy, terms), all with `lastmod` `2026-07-30`. It omits product detail URLs even though the catalogue links to products. | Generate the sitemap from the canonical active product set; update `lastmod` only when page content materially changes. Remove unsupported static `changefreq`/priority assumptions if they are not maintained. |
| Product URL handling | A tested nonexistent slug, `/products/not-a-real-product-audit-test`, returned HTTP 200 and rendered a generic product titled from the slug, priced at ₹1,250, with unrelated valves/pressure-sensor copy and generic assurance claims. | Validate slugs against a real product record or known route and return HTTP 404/`notFound()` for unknown products. Do not render fallback catalogue content as an indexable product. |
| Titles and descriptions | Sampled product and contact pages inherit the generic root title, “AXA Industries \| Official B2B E-Commerce & Institutional Portal,” and generic catalogue description. `/products` has no route-specific metadata in source. | Add unique, model-specific titles and descriptions for contact, catalogue, categories, and each real product, reflecting B2B intent and accurate model names. |
| Canonical and social metadata | No canonical, Open Graph, or Product JSON-LD was found in the sampled live homepage/product/contact document heads. | Add a canonical URL for every indexable page and social metadata with an appropriate image. Check trailing-slash/host normalization and query variants in Search Console. |
| Heading structure | The homepage visually masks its carousel heading using two `h1` elements with the same changing label (for example, “VENDING”); the product detail sample had one descriptive H1. | Keep one semantic H1 per page. Make the duplicate mask layer decorative/hidden from assistive technology, and use a stable value proposition as the homepage H1. |
| Images | Sampled rendered images had alt attributes, but the homepage hero image alt is only the category word “VENDING.” | Use concise, meaningful product-specific alt text for informative product images; use empty alt for purely decorative layers. |
| Broken resource | The homepage’s “Download Brochure” points to `/documents/AXA-INDUSTRIES-CATALOG.pdf`; a live HEAD check returned 404. | Point to an existing, versioned brochure file and run a link check across every brochure/download CTA. |
| Duplicate/thin pages | The arbitrary-slug behavior makes thin, duplicate, and irrelevant product pages possible. Historical/alternate slugs also appear in the route’s static parameter list. | Maintain an explicit active-slug map, redirect genuine legacy slugs to their canonical product, and 404 all other slugs. Check GSC for indexed legacy/parameter URLs. |
| Product schema | No `Product`, `Offer`, `Organization`, `BreadcrumbList`, or review JSON-LD was found on sampled pages. Visible product pages do contain some model/pricing information, but price and variant alignment must be fixed first. | Add valid Organization and breadcrumb markup; add Product/Offer only for claims that match the visible model, price, tax basis, and availability. Add review markup only for genuine, attributable reviews meeting Google’s rules. Validate with Rich Results Test. |
| Indexing evidence | `robots.txt` and page rendering are observable; actual index coverage, crawl errors, canonical selection, and ranking cannot be confirmed without Search Console. | Inspect GSC Page indexing, URL Inspection, sitemap processing, and duplicate/canonical reports before declaring indexability complete. |

The root page and selected routes rendered successfully in browser checks. That does not establish that every route is indexed or error-free. No redirect-chain crawl or full URL inventory was available.

## 3. Qualified keyword and intent opportunities

These are **candidate query themes derived from the products and audience on the site**, not measured keywords. Search volume, ranking, and cannibalization require GSC/keyword data.

| Candidate keyword theme | Intent | Best page | Current gap / action |
|---|---|---|---|
| sanitary napkin vending machine for schools / colleges | Transactional B2B | Sanitary vending model/category page | Build out model-specific use cases, capacities, payment options, landed-cost inputs, warranty, and installation details. |
| automatic sanitary napkin vending machine price India / coin UPI | Transactional | Model comparison and quote page | Explain “starting at” versus each model’s indicative/ex-factory price and GST. Give a direct quote CTA beside each model. |
| sanitary napkin incinerator machine for schools / hospitals | Transactional | SND product/category page | Present capacity, operating cost, safe-use limits, maintenance, emissions/certification documents, and a model-based quote. Substantiate compliance language. |
| cloth bag vending machine for supermarket / mall | Transactional | CBV product page | Keep CBV-100/CBV-300 pricing and specs aligned; add validated installation examples and transparent calculator assumptions. |
| washroom feedback machine / toilet cleanliness monitoring system | Commercial investigation | Feedback machine page | Distinguish the Sense 3B and screen-based variants, including hardware, cloud/software, connectivity, price, and service plan. |
| solid waste incinerator 5–8 kg / 8–10 kg institutional | Transactional | SWI capacity-specific pages | Make capacity and permitted waste types explicit; link technical and regulatory documentation and clarify quote/shipping scope. |
| hygiene equipment GeM vendor / institutional procurement | Procurement/commercial | Procurement page or verified profile | Publish verifiable vendor identifiers and tender-ready documents only if current; do not use “registered” claims without a traceable proof point. |
| sanitary vending machine maintenance / total cost of ownership | Informational/commercial | Buying guide and product FAQ | Explain servicing, consumables, power, spares, and lifecycle cost with actual assumptions. |
| institutional menstrual hygiene / waste management equipment | Informational/commercial | Sector landing pages and case studies | Create pages for schools, hospitals, transit, and workplaces with documented deployments and linked products. |

Do not create near-duplicate city pages or repeat phrases mechanically. Delhi/New Delhi is the only clearly evidenced company location; local targeting should match actual service/deployment coverage.

## 4. Speed and Core Web Vitals

### What was measured

| Browser navigation | TTFB | DOMContentLoaded | Load event | Interpretation |
|---|---:|---:|---:|---|
| Homepage | ~71 ms | ~163 ms | ~341 ms | One fast navigation sample only. |
| `/products` | ~67 ms | ~571 ms | ~849 ms | One catalogue sample. |
| Cloth-bag product page | ~3,774 ms | ~4,301 ms | ~4,648 ms | High server response time in this sample; investigate before attributing cause. |
| `/contact` first navigation | ~14,423 ms | ~14,720 ms | ~14,818 ms | Navigation exceeded the browser tool’s initial 10-second wait; a reload later measured ~1,938 ms TTFB. Large variation requires repeat testing and server/deployment logs. |

These are browser navigation timings from this audit profile. They do **not** supply LCP, INP, CLS, FCP, transfer size, or real-user p75 values. The Google PSI request was rate-limited (429), so no PSI score is claimed. Google’s current Web Vitals guidance recommends evaluating Core Web Vitals at the 75th percentile, segmented by mobile and desktop; collect that field data before setting a site-specific baseline.

### Bottlenecks to validate and fixes

| Problem / evidence | Why it matters | Exact fix | Expected impact | Priority |
|---|---|---|---|---|
| Product/contact TTFB was much higher than homepage/catalogue in the observed browser traces, and contact navigation varied sharply between first load and reload. | Slow first response delays every subsequent visual and interaction milestone, especially for paid/mobile visits. Cause is not yet proven. | Repeat mobile/desktop Lighthouse and field measurements; compare cold/warm route behavior; inspect hosting/server logs, Next.js rendering and API dependencies. Set route-level budgets after measuring. | Could materially reduce wait on the highest-intent contact/product pages; size of gain is unmeasured. | P1 investigation |
| The hero’s recursive `requestAnimationFrame` layout/mask loop has been removed in source; mask geometry now updates on image load, transition completion, and observed size changes. Pointer parallax uses CSS variables instead of React state, touch-swipe tracking uses refs, and autoplay pauses for reduced-motion and hidden tabs. | The former loop could consume mobile CPU/battery and compete with interactions. This was a code-level risk, not a measured INP defect. | Deploy and confirm the carousel/mask on supported browsers; collect mobile/desktop Lighthouse and field Web Vitals before quantifying impact. | Eliminates continuous layout polling and reduces unnecessary hero renders; actual LCP/INP gain is unmeasured. | P0 implementation; measurement P1 |
| The hero image now uses Cloudinary automatic format/quality delivery and is eagerly/high-priority fetched on the initial slide. Gallery, testimonial, featured-product, and catalogue images are lazy-loaded with async decoding. | Below-the-fold media can compete with the hero and inflate bytes on mobile. Exact bytes were not captured. | Measure transfer sizes and rendered image dimensions; add responsive sizing where useful; validate LCP, CLS, and transfer savings after deployment. | Reduces eager offscreen image requests and asks Cloudinary for automatic format/quality; actual byte and Web Vitals gains are unmeasured. | P1 |
| No reliable LCP/INP/CLS baseline is available. | Optimizing based on a single load timing can miss real-user issues. | Add privacy-compliant field Web Vitals reporting or use CrUX/GSC/PSI when available; capture page templates and mobile vs desktop separately. | Provides an evidence-based backlog and regression guardrail. | P1 measurement |

**General reference, not an AXA result:** the current “good” Core Web Vitals targets are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile. Recheck the linked Web Vitals guidance when implementing, because metric definitions can evolve.

## 5. Mobile-first and accessibility spot check

### Positive observations

- At 390 × 844, the sampled product page had no horizontal page overflow.
- The product page and contact widget expose accessible text for key quote, call, and WhatsApp actions.
- The fixed call/WhatsApp controls were 48 × 48 px in the sampled mobile view.
- Product pages are long but have headings, technical specifications, FAQs, and multiple conversion paths.

### Friction and fixes

- The mobile hamburger in `Navbar` is icon-only and lacks an accessible name, `aria-expanded`, and `aria-controls`. Add a “Open menu”/“Close menu” label, state, and controlled panel relationship; verify keyboard operation and focus order.
- Product-enquiry modal labels are not programmatically associated with their inputs. Add stable input IDs and matching `htmlFor`; use `type="tel"`, `autoComplete`, and suitable numeric/phone validation for phone fields.
- The product quote modal uses a two-column form grid even on narrow screens and 11–12 px text. Test at 320–390 px and allow fields to stack on small screens; improve readable field/CTA text sizes and error visibility.
- The contact form uses `type="text"` for phone and its fields have small text. Use semantic input types, preserve labels, and show field/API errors inline.
- The carousel advances automatically every 4.5 seconds. Hover pauses it on desktop, but there is no visible pause control; keyboard focus/reduced-motion behavior needs explicit handling.
- Keep the sticky contacts, but test them across short screens, form errors, and modals so they do not cover the active field or submit CTA.
- This was a focused browser spot check, not a full WCAG audit; contrast, keyboard-only completion, screen-reader output, and zoom behavior still need systematic testing.

## 6. Customer journey and conversion

| Step | What works | Friction / risk | Recommended change |
|---|---|---|---|
| Landing | Rotating product hero shows product, indicative price, detail, brochure, and quote links; institutional proof and procurement steps follow. | Hero’s first headline is the category word “VENDING,” not a stable company-level value proposition. Several stats and certification claims lack visible supporting sources. Hero brochure is broken. | Use a stable institutional-equipment H1; keep a product carousel as supporting content. Put “Compare products” and “Request an institutional quote” first. Fix and test brochure link. |
| Browse | `/products` has search, category buttons, sorting, six visible product cards, prices, and a download center. | Price basis/model mapping is not consistent across entry points; filters are useful but do not create dedicated search landing pages. API fallback content is duplicated in source. | Use one product/variant catalogue source for every card and page. Keep filters, expose model/capacity/payment facets where useful, and make category pages indexable only when they have distinct value. |
| Product | The sampled cloth-bag detail page includes useful model comparison/specs, applications, FAQs, and quote actions. | Some model/price and warranty claims conflict with other pages. Tax/shipping/install terms and documentary proof need to be clearer. | Put model selector, model ID, accurate price/GST label, availability basis, quote CTA, warranty, delivery, and datasheet together above/near the primary CTA. |
| Enquiry | Contact form and product quote modal support B2B requirements; phone and WhatsApp are available. | Both forms can show success after network/API failure; product modal can display a fabricated reference. | Confirm only on a successful persisted API response; return actionable error/retry state otherwise. Add a real success/reference and confirmation email. |
| Quote/order | Site copy promises a technical review and formal quote; the API has enquiry/customer/order concepts. | No customer-visible lead-status tracking or public purchase/checkout was found; real sales outcomes are not connected to website analytics in inspected source. | Measure actual response SLA, quote sent/accepted, and order won in the CRM/API. Import permitted offline conversions to ad platforms. |

**Within five seconds, a buyer should understand:** “AXA supplies institutional hygiene, waste-treatment, and washroom-feedback equipment across India; compare model/capacity and request a GST-itemized quote with installation/service details.” The current first hero slide conveys one product and price quickly, but not that complete positioning.

## 7. Homepage conversion audit

Current section sequence: hero → institutional trust claims → featured products → why choose AXA → statistics → procurement steps → testimonials → gallery → FAQs → final quote CTA. The broad sequence is sensible and already contains many of the right section types.

**Keep:** featured products near the top; procurement steps; FAQs; direct call/WhatsApp; and the final quote CTA.

**Improve/rewrite:**

- Change the top-level message from a carousel-only product label to a stable proposition, e.g. **“Institutional hygiene and waste-management equipment, engineered for deployment across India.”**
- Supporting copy: **“Compare capacities, payment options and installation needs. Request a model-specific, GST-itemized quote from AXA’s technical sales team.”**
- Primary CTA: **“Compare equipment”**; secondary CTA: **“Request an institutional quote.”** Keep a product-specific quote CTA on the active slide.
- Add substantiated customer logos/case studies or explain the basis of “1,200+ institutions,” “15,000+ machines,” “500,000+ daily hygiene cycles,” “99.9% reliability,” and two-hour response claims.
- Link certifications to current certificate number, issuer, validity, and applicable product scope. A text badge is not proof.
- Replace unverified testimonials with permissioned, attributable case studies (organization, deployment, date, product/model, measurable result, and an approvable contact/reference where permitted).
- Move support/delivery/warranty details into a compact “Buying with AXA” block above or near the first product grid.
- Fix the broken hero brochure CTA. The header and catalogue link to different existing PDFs, so name/version them clearly and track downloads.

## 8. Product-page CRO and merchandising

### Strong elements

- The sampled cloth-bag page displays CBV-100/CBV-300, capacities, dimensions, payment modes, power, telemetry, delivery/warranty messages, use cases, FAQs, and quote actions.
- The feedback-machine page visibly identifies the Sense 3B model, gives a price, lists dimensions/features, and offers quote/WhatsApp actions.
- Catalogue search, category selection, and price sorting support product discovery.

### Highest-friction product issues

1. **Price/variant reconciliation:** the feedback-machine category appears at ₹8,500 as a catalogue indicative price, ₹4,999 + GST for the live Sense 3B detail model, and ₹14,999 without a tax label on the homepage’s Sense 3B/10.1 slide. These may represent different configurations, but the website does not make the mapping obvious. Use model/SKU-specific cards and show exactly what each includes; label “starting from,” GST, software, screen, installation, and other included items.
2. **Warranty conflict:** product FAQs describe one-year cover; the homepage claims a three-year factory warranty on core modules; terms state a five-year corporate warranty. Publish one model-specific matrix that explains term, covered parts, exclusions, response/repair process, and start date.
3. **Commercial details:** “Pan-India”/“direct shipping” is present, but full delivery estimate, freight/installation scope, taxes, quote validity, commissioning, consumables, and service terms are not consistently shown. Provide them before the enquiry CTA or state that they are confirmed in the quote.
4. **Claims and proof:** exact reliability, payment-validation, emissions, compliance, carbon, and payback claims should link to current test reports or show their methodology. The cloth-bag page’s default calculator displays 36,500 bags and 2,190 kg CO₂ per year at 100 bags/day; show the emission factor, bag lifetime/displacement assumptions, and whether the result is an estimate.
5. **Unknown product routes:** arbitrary slugs render generic valve/pressure-sensor copy and price rather than a not-found page. This can mislead buyers and create thin indexable URLs; fix before expanding SEO.
6. **Spam-control wiring:** the product quote modal has a honeypot field in the UI/state, and the API accepts/checks a honeypot property, but the modal’s JSON request does not include it. The current honeypot check therefore cannot be activated by that form; send the field and test both real-user and bot-like submissions.

### Recommended product detail template

1. Breadcrumb and unique model/product H1.
2. Model/variant selector with availability basis and accurate ex-GST/inclusive price.
3. One primary **Request model-specific quote** CTA; secondary WhatsApp/call; brochure/datasheet as supporting action.
4. Capacity, dimensions, power, payment/connectivity, installation, and compatible consumables in a scannable specification table.
5. Clear “what’s included,” freight, installation, lead time, commissioning, maintenance, and model-specific warranty.
6. Verified certificates/test reports and genuine deployment evidence.
7. FAQs and cross-sells by procurement need.

For AOV/units per order, offer quote bundles rather than arbitrary web discounts: e.g., campus vending + disposal plan, multi-location deployment, spare/maintenance package, or multiple-capacity quote. Show bundle savings only when backed by real pricing.

## 9. Cart and checkout

**Not applicable to the current observed public flow:** there is no add-to-cart, cart, payment step, UPI checkout, COD, guest checkout, or purchase confirmation path. Do not label missing retail checkout events as defects or build a retail checkout just to satisfy a generic audit checklist.

The minimum-friction current flow should be:

**Product/variant → model-specific quote form with product prefilled → real API confirmation/reference → promised human response → itemized GST quote with shipping/installation/warranty → accept quote/order through the actual sales process.**

Only if AXA chooses direct online purchase later should payment, checkout, refunds, order confirmations, and Merchant Center destination readiness be added.

## 10. Trust, policies, and credibility

### Visible trust positives

- The contact page and footer publish a street address, phone numbers, email, and business hours.
- Product pages show technical details and some named certifications/vendor claims.
- Terms and privacy pages are linked from the footer.

### Gaps that can undermine confidence

- The privacy page is very short and does not clearly describe retention periods, contact/marketing consent, data-subject requests, cookie/analytics handling, or operational security/contact route. It says data may be used by logistics partners; explain when and why.
- Terms contain only short quotation/specification and warranty statements. A B2B quote journey still needs clear quote validity, payment/order acceptance, delivery/freight, installation, warranty, service, cancellation/return rules where applicable, and dispute/contact process.
- No shipping, return/refund, or detailed warranty-policy page was found. If those policies are quote-specific rather than general, say that clearly and attach them to quotations.
- Warranty statements conflict (one, three, and five years); this is a direct trust and contract risk.
- “ISO 9001:2015,” CPCB/CE, GeM/MSME, and other assurance claims are not consistently linked to evidence or a clearly stated scope. Have the business owner verify each certificate, registration, claim wording, and expiry before continuing to advertise it.
- The public contact email is a Gmail address rather than a company-domain mailbox. A verified domain mailbox and clickable `mailto:` contact could strengthen procurement confidence.
- Testimonials and avatars are hard-coded in source and use Unsplash profile images; no review platform, customer approval, case-study link, or source is shown. This does not establish that the testimonials are false; it means their provenance is not verifiable from the site. Replace or substantiate them.
- No GSTIN/CIN/other legal-entity identifier was found in inspected public pages. Publish only the correct legal entity and identifiers after business/legal verification.

## 11. Analytics and measurement audit

No GA4, GTM, Meta Pixel, Google Ads tag, ecommerce/lead event call, or Merchant Center feed implementation was found in the inspected storefront/API source. The sampled live contact page loaded same-origin scripts/resources only. This cannot rule out DNS/account-side configuration, server-side tagging, or tags injected outside this repository.

### Recommended B2B events

| Event | Trigger and useful parameters |
|---|---|
| `page_view` | Normal page view, page type, referrer/UTM. |
| `view_item_list` | Catalogue/list view; list ID/name and product IDs/models visible. |
| `view_item` | Product detail view; stable item ID, model, category, price basis/currency. |
| `search` | Catalogue search submitted; use privacy-safe search term handling. |
| `generate_lead` | A persisted enquiry, only after successful API response; lead/reference ID, product/model, quantity, source. |
| `form_start` / `form_submit` | Form started and valid submission; do not send personal data as event parameters. |
| `click_to_call` / `click_whatsapp` | CTA location, product/model, page type. |
| `file_download` | Product brochure/datasheet ID and page. |
| CRM milestones | Qualified lead, quote sent, quote accepted, order won/lost, value/margin where lawful and available; use a consented/hashed offline conversion process. |

`add_to_cart`, `begin_checkout`, `add_payment_info`, `purchase`, and `refund` do not correspond to the currently observed site journey. Do not emit synthetic events. If online ordering is introduced, implement those events with item IDs, currency, value, tax/shipping rules, deduplication, and refunds.

### Data needed to finish the measurement audit

- Redacted GA4 event/debug exports and traffic/acquisition/conversion reports by device and landing page.
- Search Console performance and indexing exports (queries, pages, clicks, impressions, CTR, average position, coverage/canonical issues).
- GTM container/tag inventory and consent configuration; Google Ads/Meta event diagnostics and conversion settings.
- CRM export with source, qualification, product/model, lead timestamps, response times, quote value, result, and order revenue—remove names, emails, phones, and other personal data.
- Order and contribution-margin data to calculate CAC, ROAS, MER, AOV, repeat revenue, cancellations, and refunds.

## 12. Paid-ad readiness

**Not ready for scaled paid acquisition until the lead path is reliable and measurable.** This is not a recommendation to buy more ads.

- A failed request can still show enquiry success; repair and verify in staging/with an approved test lead first.
- Reconcile model price/tax/warranty so the ad, landing page, brochure, and sales quote match.
- Add product-specific campaign landing pages with the exact advertised model, one primary CTA, proof documents, lead-time/service details, and consistent UTM capture.
- Track persisted enquiries plus downstream qualified-lead/quote/order outcomes. A button click alone is not a sale.
- Use campaign-specific CRM attribution and only use remarketing/WhatsApp follow-up with the required user permission and applicable policy compliance.
- Keep Google Shopping decisions separate: the current quote-driven model and absence of a verified feed/checkout mean eligibility and destination requirements must be checked before investing in a feed.

## 13. Google Shopping / Merchant Center readiness

No product-feed file or feed route was found in the inspected public assets/routes. No Merchant Center account or diagnostics were available.

Before creating a feed:

- Decide whether each item is eligible for the intended Merchant Center destination given that the website currently asks for a quote rather than offering online purchase.
- Create one canonical item ID per real model/variant; use accurate title, description, landing URL, image, currency, tax basis, price, availability, brand, MPN/SKU, condition, and category.
- Supply GTIN only where the manufacturer has a valid assigned GTIN; do not invent one. Where applicable, accurately supply brand/MPN and variant grouping.
- Ensure the landing page and feed agree on which model is shown, price, GST treatment, and availability. Label ex-GST clearly and confirm current country/destination requirements.
- Provide delivery/service terms and return/warranty information in a clear, accessible place; validate against current Merchant Center rules and account diagnostics.
- Use current high-quality product images and validate each landing URL and image fetch.

Google’s current product-data documentation warns that inaccurate/missing product data and conflicts between feed and website can lead to disapprovals or limited eligibility. Exact required attributes depend on product and destination; check live Merchant Center diagnostics rather than assuming a feed is approved.

## 14. Competitor and market comparison

The accessible search evidence is limited; no competitor rankings, prices, review volume, or conversion performance are claimed.

| Public result observed | Relevance | What could be verified / could not |
|---|---|---|
| [NEVEX Enterprises product listing](https://www.nevex.in/all-Products/1) | Search-visible adjacent competitor for sanitary napkin vending machines. Search result copy emphasizes password-protected access and use in schools, colleges, offices, and public restrooms. | Direct page fetch returned 403, so price, warranty, evidence, and page UX were not independently reviewed. |
| [Saral Designs article on special-purpose machines](https://www.saraldesigns.in/blog/how-saral-designs-makes-the-special-purpose-machines-for-innovators/) | Adjacent menstrual-hygiene/special-purpose vending and content benchmark. The article frames affordability, access, and maintenance as buyer problems. | This article alone does not establish identical products, prices, or service coverage. Use as a content/positioning reference, not a like-for-like product comparison. |
| [Ontrack Enterprises result](https://www.ontrackenterprises.in/sanitary-napkin-incinerator.html) | Search result title suggests a sanitary-napkin incinerator listing. | The fetched page body described generic self-service kiosk specifications, not the titled incinerator. Do not treat it as a verified product comparison until the listing is corrected/confirmed. |

Google Search and several search endpoints were rate-limited; other category results were directories or generic kiosk listings. No defensible side-by-side comparison of solid-waste incinerators, feedback machines, or cloth-bag dispensers could be completed from the accessible evidence. Before making competitive claims, manually verify current direct manufacturer pages, target search geography, model scope, price/GST basis, shipping, service/warranty, product evidence, and date.

**Differentiation opportunity:** compete on verified deployment evidence, clear model-by-model total-cost/installation quotes, response/service commitments that can be met, technical documentation, and transparent product/warranty claims—not unverified “lowest price” or compliance comparisons.

## 15. Content and SEO plan

The site already has a useful set of product detail pages and downloadable PDFs but no visible resource/blog section in the inspected storefront routes. Prioritize content that helps institutional buyers make a decision:

### Commercial pages

- Focused category pages for sanitary vending, sanitary disposal, cloth-bag dispensers, washroom feedback, and solid-waste treatment.
- One page per materially distinct capacity/payment/software variant, with a comparison table and accurate quote price basis.
- Sector pages for schools/colleges, hospitals, transit, public facilities, and supermarkets, each linking to relevant models and verified case studies.
- A “how to specify/request a quote” page for procurement/tender buyers, with downloadable technical schedules.

### Informational/supporting content

- Buying guides for model/capacity selection, installation/site requirements, power, consumables, maintenance, and total cost of ownership.
- A documented service/warranty process and FAQ that matches actual terms.
- Technical/environmental content on waste types and regulatory requirements reviewed by qualified personnel; distinguish product test certificates from general legal compliance.
- Case studies with customer permission, installation context, units, date, support model, and measurable outcome.
- HTML summaries for brochure specifications so critical product facts are crawlable and accessible, while keeping PDFs as optional downloads.

Use internal links from each guide/sector page to the exact product/model and quote action. Choose topics based on GSC queries and qualified-lead outcomes once available, not search volume alone.

## 16. Email, WhatsApp, and retention

The API source contains customer confirmation and admin-notification email logic for enquiries, but this audit did not verify deployment credentials or actual delivery. No public-site evidence of browse abandonment, post-quote nurture, post-installation, review, or win-back automation was found.

Recommended B2B flows:

1. **Immediate enquiry confirmation:** send only after persistence, include genuine reference, selected model/quantity, expected response time, and contact options.
2. **Sales SLA workflow:** alert the correct salesperson; measure time to first response and escalate overdue leads. The current site promises two business hours, so route and report against that commitment.
3. **Quote follow-up:** after a quote is issued, a permission-compliant reminder with the same model/specification and a way to request revision; stop on acceptance, decline, or opt-out.
4. **Technical nurture:** only for opted-in leads who requested more information; send relevant datasheet/case study, not generic repeated sales messages.
5. **Post-installation:** commissioning confirmation, usage/maintenance guidance, spares/service check, and a consented review/case-study request.
6. **WhatsApp:** keep the visible click-to-chat path; record click source without collecting message contents, and use outbound promotional follow-up only with appropriate consent.

## 17. Funnel and dashboard framework

### Correct funnel for the current site

**Sessions → relevant catalogue/product views → quote/contact/phone/WhatsApp intent → enquiry form start → persisted enquiry → qualified lead → quote sent → quote accepted/order won → collected revenue and contribution margin**

Potential leak points identified in source/observations:

- search/landing-to-product discovery (no traffic/GSC data);
- product-to-enquiry trust and price clarity (variant/GST/warranty conflict);
- form submission to saved lead (false success logic);
- lead-to-sales response and quote-to-order (no CRM outcomes supplied);
- attribution of phone, WhatsApp, and downloads (no event implementation found).

### Metrics and definitions

| Metric | Useful definition/source |
|---|---|
| Sessions/users/new vs returning | GA4 by channel, landing page, device, geography; validate consent and tagging. |
| Product discovery rate | Unique product detail viewers ÷ sessions or catalogue viewers; define denominator consistently. |
| Product-to-enquiry rate | Persisted product-attributed leads ÷ unique product detail viewers. |
| Form completion | Persisted submissions ÷ form starts; exclude failed/rejected requests and bot traffic. |
| Contact intent | Phone/WhatsApp clicks and brochure downloads by page/source; intent, not revenue. |
| Lead qualification rate | Qualified leads ÷ persisted enquiries from CRM. |
| Sales response time | First human response timestamp minus persisted lead timestamp; track median and SLA attainment. |
| Quote rate / quote win rate | Quotes sent ÷ qualified leads; won orders ÷ quotes sent. |
| Revenue per session / CAC / ROAS / MER | Require attributed collected revenue and marketing spend; do not use quote value as realized revenue. |
| AOV, gross margin, contribution margin | Require order lines, tax/shipping treatment, cost, returns/cancellations. |
| Repeat rate / CLV | Requires buyer/account matching, repeat orders, margin, and a defined time window. |
| Cancellation/refund/abandonment | Track only if the offline/online order system has reliable status and reason data; cart abandonment is not currently applicable. |

No AXA conversion benchmark is asserted. Generic retail conversion ranges would be misleading for this institutional quote funnel. Use actual baseline and cohort results; the Core Web Vitals thresholds above are general technical references only.

## 18. Priority scorecard

| Priority | Problem and evidence | Fix | Expected business impact | Effort |
|---|---|---|---|---|
| **P0 — Critical** | Contact handler always sets submitted state in `finally`; product modal fabricates `AXA-######` on API failure or unsuccessful JSON. A real quote can appear accepted without a persisted lead. Live form was not submitted. | Check HTTP and API success explicitly; only show confirmation/reference from the persisted API response. Show actionable inline error/retry and log failures. Add staging tests for 2xx, 4xx, 5xx, timeout, malformed response, and retry/deduplication. | Prevents silent loss of high-intent leads and false confirmations. | Medium |
| **P1 — High** | Live homepage brochure URL returned 404. | Point to a real existing PDF, use a root-absolute path, validate all document links in CI or a release checklist. | Removes a broken procurement asset and restores a common research action. | Low |
| **P1 — High** | Feedback-machine category displays ₹8,500 in catalogue, ₹4,999 + GST for the live Sense 3B detail model, and ₹14,999 on the homepage’s Sense 3B/10.1 slide. May be variants, but mapping is unclear. | Create canonical model/variant records and align price, tax, included software/display, and naming across all surfaces/PDFs. | Reduces quote distrust and mismatched ad/sales conversations. | Medium |
| **P1 — High** | Warranty copy varies: product FAQ one year, homepage three years on core modules, terms five years. | Publish one verified model-specific warranty matrix and update all page, brochure, and quote templates. | Reduces procurement/legal uncertainty and sales rework. | Medium |
| **P1 — High** | Unknown product slug returns HTTP 200 with generic unrelated product text and ₹1,250. | Return 404 for unknown slugs; redirect only verified legacy slugs; eliminate invented fallback products. | Protects buyer trust and prevents indexable thin/false pages. | Low–medium |
| **P1 — High** | Product/contact navigation traces showed TTFB of ~3.8s and ~14.4s respectively in individual samples; contact reload later measured ~1.9s. PSI was rate-limited. | Re-measure with controlled mobile/desktop Lighthouse/field data; investigate cold/warm server/render behavior and hosting/API logs; then optimize the measured bottleneck. | Could improve high-intent page completion; impact needs validation. | Medium |
| **P1 — High (verify)** | Contact, product modal, and catalogue source use `http://localhost:4000/api` when `NEXT_PUBLIC_API_URL` is unset. The production build-time value was not available to this audit. | Verify the deployed client bundle targets the production API; fail deployment checks if the public API URL is missing or local. Test CORS and API errors without creating a live lead. | Prevents all client-side catalogue/enquiry requests from being directed to each visitor’s own localhost if misconfigured. | Low |
| **P1 — High** | No GA4/GTM/Meta/Google Ads event implementation was found in inspected source; no private account access. | Establish consent-aware analytics, reliable lead event after API persistence, CRM/offline lead stages, and test diagnostics. | Enables attribution, funnel diagnosis, and responsible ad scaling. | Medium |
| **P1 — High** | Product page metadata inherits generic site metadata; sampled heads lack canonical/OG/Product schema; sitemap omits product detail URLs and has stale lastmod values. | Add route/model metadata, canonicals, valid Organization/Product/Breadcrumb markup where supported, and generate a sitemap from active products. | Improves crawl clarity and eligibility for richer search presentation; no ranking guarantee. | Medium |
| **P2 — Medium** | Marketing claims (1,200+, 15,000+, 99.9%, CPCB/ISO/GeM, environmental savings, payback) and hard-coded testimonial sources are not linked to evidence. | Verify, document methodology/scope, link certificates and approved references; remove or qualify claims that cannot be substantiated. | Improves buyer confidence and reduces credibility risk. | Medium |
| **P2 — Medium** | Mobile menu toggle has no accessible name/state; quote modal labels are not linked to fields, phone fields are text inputs, and modal fields use a two-column layout on narrow screens. | Fix semantics, mobile field layout, validation/error states, and keyboard/focus behavior; test WCAG basics. | Reduces form/navigation friction and improves assistive-technology access. | Low–medium |
| **P2 — Medium** | Product quote modal does not send its honeypot field even though the API checks for one. | Include the field in the request and verify API-side spam controls; do not rely on a client-only hidden field as the sole abuse control. | Improves the intended spam filter and protects lead quality. | Low |
| **P2 — Medium** | Public policy content is brief; shipping/return/service terms and legal entity details are hard to verify. | Publish accurate B2B terms, privacy handling, delivery/service details, and verified business/certification identifiers. | Supports procurement review and reduces pre-sale hesitation. | Medium |
| **P0 — Critical (implementation; verify live)** | Hero previously polled layout and rewrote mask styles on every animation frame; below-fold images loaded without consistent deferral. This is a code-level loading/CPU risk; no field Core Web Vitals failure has been measured. | Source fix removes the perpetual frame loop, uses resize/load/transition observations, avoids React updates for pointer/touch movement, respects reduced-motion/hidden-tab behavior, prioritizes the initial hero image, and lazy-loads below-fold images. Deploy, then validate mask/carousel behavior and capture mobile/desktop Lighthouse and field Web Vitals. | Removes continuous layout work and reduces unnecessary image fetches; revenue and Core Web Vitals impact remain unmeasured. | Medium |
| **P3 — Optimization** | The catalogue uses duplicated fallback product data; remaining responsive image sizing and route-level performance budgets are not yet verified. | Consolidate product/variant source data, measure transfer sizes, and set budgets against a field baseline. | Fewer future content mismatches and a measurable performance regression guardrail. | Medium |

## 19. 30-day implementation roadmap

| Period | Work | Where | Why / dependency | Priority and effort |
|---|---|---|---|---|
| **Week 1: technical, tracking, critical UX** | Repair both enquiry handlers; use only genuine API reference; add explicit failed/timeout/retry states. Verify deployed `NEXT_PUBLIC_API_URL` is not defaulting to visitor-localhost. Test with approved staging data. | `apps/web/src/app/contact/page.tsx`, `apps/web/src/components/shared/product-enquiry-modal.tsx`, deployment env, enquiry API | Protects the core conversion and verifies API reachability. Do not test with a real customer lead. | P0, medium |
| **Week 1** | Fix the hero PDF target and validate all brochure links. | `apps/web/src/components/sections/hero.tsx`, `apps/web/public/documents/` | The current URL returns 404; existing brochure assets are available under different names. | P1, low |
| **Week 1** | Obtain baseline PSI/Lighthouse runs on homepage, catalogue, one product template, contact, plus GSC/GA4/CRM exports; document mobile/desktop and field/lab distinctions. | Production URL, Search Console, Analytics, CRM/hosting logs | Needed before speed, SEO, and revenue claims can be measured; private access/data is a dependency. | P1, medium |
| **Week 2: SEO and product truth** | Make unknown slugs 404; define active/legacy product slug map; add unique title/description/canonical/Open Graph and validated structured data. | `apps/web/src/app/products/[slug]/page.tsx`, layout and product components | Correct product identity and SEO before expanding pages or ads. Requires canonical product/variant records. | P1, medium |
| **Week 2** | Generate the sitemap from active pages/products and replace stale static lastmod values. | `apps/web/public/sitemap.xml` or generated sitemap route | Ensures all real product URLs are discoverable and false/legacy pages are omitted. | P1, low–medium |
| **Week 2** | Reconcile feedback-machine price/variant display and all GST labels; reconcile warranty statements across detail pages, homepage, PDFs, and terms with business owner. | Catalogue, hero, product pages, brochures, terms | Requires approved price list, model variants, and warranty policy. | P1, medium |
| **Week 3: CRO, trust, mobile** | Improve menu/form semantics, mobile quote layout, semantic phone fields, privacy notice placement, and inline error messages. | Navbar, quote modal, contact page | Builds on Week 1 error behavior; test keyboard and 320/390px widths. | P2, medium |
| **Week 3** | Publish verified shipping/installation/service/warranty and legal-entity/certificate evidence; substantiate stats and testimonials. | Product pages, About, policies, footer | Business/legal verification and approved customer permission are dependencies. | P1/P2, medium |
| **Week 3** | Standardize product schema/source data and downloadable file names; add model comparison facets. | Product data, catalogue, product pages | Prevents price and variant drift between page templates. | P2, medium |
| **Week 4: content, retention, paid readiness** | Create 2–3 high-intent category/sector pages and one buyer guide from GSC/lead-query data; add one approved deployment case study. | Content routes, product internal links | Use actual query/qualification data; avoid thin city pages. | P2, medium |
| **Week 4** | Set CRM lead stages and SLA reporting; create immediate confirmation plus quote follow-up/post-installation flows with consent. | API/email/CRM/WhatsApp process | Depends on reliable persistence, data permissions, and an owner for response SLA. | P1/P2, medium |
| **Week 4** | Reassess campaign landing pages and Merchant Center eligibility only after feed/landing consistency and conversion events pass QA. | Ad accounts, feed, relevant landing pages | Do not scale traffic into unmeasurable or misleading quote paths. | P2, medium |

## 20. Ten quick wins

1. Replace the broken homepage PDF URL with the real master brochure and verify its HTTP response.
2. Stop fake quote references; show a success state only after confirmed persistence.
3. Add an API-failure message and retry path to the contact form.
4. Label every visible price as a specific model and state GST included/excluded.
5. Resolve the one-/three-/five-year warranty conflict in one approved source.
6. Make unknown `/products/*` slugs return a 404 instead of a generic product.
7. Add model-specific title/description and canonical URL to product pages.
8. Add active product URLs to a generated sitemap and update truthful lastmod values.
9. Give the mobile menu button a name and expanded state; associate quote form labels with fields.
10. Publish a verified support/warranty/shipping summary near the quote CTA, with the real certificate/policy links.

**Follow-up (27 September 2026):** Quick win #2 has been implemented in the repository for the contact form and product quote modal: the success state now requires a successful API response, and failed/unconfirmed submissions show a retryable error instead of a fabricated reference. Quick win #4 now labels catalogue/featured/hero and generic product prices as indicative or GST-extra, displays the hero model label, and identifies the model alongside featured prices; the featured fallback cloth-bag listing now matches the CBV-100 model and ₹18,500 shown on the product page. The specific Sense 3B/10.1 price discrepancy remains unresolved pending an approved model price list. For quick win #5, the unsupported site-wide three-/five-year warranty promises have been removed in favor of product/model-specific written warranty terms; the business must verify the actual warranty schedule before deployment. These source changes still need deployment and live/staging verification.

**Performance follow-up:** The hero’s continuous animation-frame layout polling has been replaced with image-load, transition, and resize-triggered mask measurement. Pointer parallax now updates CSS variables without rerendering the hero; touch tracking no longer updates React state on every move. Autoplay pauses for reduced-motion preferences and hidden tabs. The initial Cloudinary hero image requests automatic format/quality and receives high fetch priority; gallery, testimonial, featured-product, and catalogue images are lazy-loaded. These are source-level changes only: no controlled Lighthouse run, field Core Web Vitals, transfer-size comparison, or production deployment has yet verified a numerical improvement.

## 21. Ten growth opportunities

| Opportunity | Potential business impact | Effort / dependency |
|---|---|---|
| Reliable persisted quote conversion and response SLA | Recovers and makes measurable the primary revenue path. | Medium; API/deployment and sales-process verification. |
| Model/price/GST/warranty consistency | Reduces uncertainty, unqualified enquiries, and sales rework. | Medium; approved product master and policy. |
| Product-specific metadata, schema, sitemap, 404 handling | Improves crawl understanding and qualified product discovery; rich results are not guaranteed. | Medium; accurate canonical model data. |
| Mobile quote accessibility and layout | Lowers friction for phone-based institutional buyers and assistive-technology users. | Low–medium. |
| Proof-led trust pages and genuine deployment cases | Improves credibility for institutional procurement and paid landing pages. | Medium; certificate/customer permission and verification. |
| Technical buyer guides and sector landing pages | Captures commercial and informational intent with relevant lead paths. | Medium; expertise review and Search Console inputs. |
| Product image/performance measurement and optimization | Reduces mobile loading cost where large/late assets are confirmed. | Medium; baseline and responsive asset workflow. |
| Qualified-lead/offline conversion integration | Connects campaign spend to quotes/orders, rather than superficial button clicks. | Medium; CRM fields, consent, and clean order outcomes. |
| Quote bundles and multi-site procurement schedules | Can lift units per opportunity and quote value while matching B2B buying behavior. | Medium; actual bundle/cost/service configuration. |
| Consent-based post-quote and post-installation follow-up | Can improve quote completion, service experience, repeat orders, and referrals. | Medium; CRM ownership and permissioned contact rules. |

## 22. Final health report

| Area | Current assessment |
|---|---|
| **Technical health** | Public pages render, but observed route latency varied substantially; arbitrary product URLs render a generic 200 page; a prominent PDF link is broken. No full crawl or field performance dataset was available. |
| **SEO health** | Product-focused content and a sitemap exist, but the sitemap omits product details and is stale; sampled product/contact metadata is generic; canonical, structured data, and social metadata were not found; unknown slugs risk thin indexing. |
| **Conversion health** | Strong B2B quote/call/WhatsApp intent paths and rich product detail content. False-success form logic, inconsistent product price/warranty presentation, and the broken brochure are material conversion risks. No conversion-rate or sales outcome data was available. |
| **UX health** | Catalogue filters, model information, product FAQs, and procurement steps are useful. Homepage message is carousel-led; mobile menu and product quote form need accessibility/layout work; sales terms need clarity. |
| **Mobile health** | One 390px product-page check showed no horizontal overflow and usable floating call/WhatsApp controls. This is a spot check, not a full device/WCAG/performance audit. Small form typography, menu semantics, and modal field layout should be improved. |
| **Marketing readiness** | Product-specific ad paths are possible, but do not scale paid traffic until enquiry persistence, price/model consistency, and attributed qualified-lead outcomes are validated. |
| **Analytics health** | No client-side GA4/GTM/Meta/Ads event integration was found in inspected source. Private accounts and server-side tagging remain unverified. Instrument the lead funnel and CRM milestones before judging revenue performance. |
| **Revenue opportunities** | Fix lead capture first; then clarify model economics and proof, improve product discovery/SEO, connect qualified leads to orders, package multi-unit institutional solutions, and follow up with permissioned post-quote/post-installation communication. |

## Sources and references

### Site and repository evidence

- [Live homepage](https://axaindustries.com/)
- [Live product catalogue](https://axaindustries.com/products)
- [Live contact page](https://axaindustries.com/contact)
- [Live robots.txt](https://axaindustries.com/robots.txt)
- [Live sitemap.xml](https://axaindustries.com/sitemap.xml)
- [Home page composition](../apps/web/src/app/page.tsx)
- [Root metadata](../apps/web/src/app/layout.tsx)
- [Product route and fallback behavior](../apps/web/src/app/products/%5Bslug%5D/page.tsx)
- [Product catalogue implementation](../apps/web/src/app/products/page.tsx)
- [Contact form implementation](../apps/web/src/app/contact/page.tsx)
- [Product quote modal](../apps/web/src/components/shared/product-enquiry-modal.tsx)
- [Enquiry API controller](../apps/api/src/modules/enquiries/enquiries.controller.ts)
- [Homepage hero and brochure CTA](../apps/web/src/components/sections/hero.tsx)
- [Warranty terms](../apps/web/src/app/terms-and-conditions/page.tsx)
- [Privacy policy](../apps/web/src/app/privacy-policy/page.tsx)
- [Testimonials implementation](../apps/web/src/components/sections/testimonials.tsx)
- [Mobile navigation](../apps/web/src/components/layout/navbar.tsx)

### Current guidance consulted

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google Search Central: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google Merchant Center: Product data specification](https://support.google.com/merchants/answer/7052112)
- [Google Analytics: GA4 ecommerce events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
