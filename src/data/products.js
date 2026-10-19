/* ==========================================================================
   ELYRIQ SIGNATURE - CENTRAL PRODUCT & BRAND DATA
   ========================================================================== */

/**
 * Global Contact & Brand Configuration
 * Replace the placeholder values below with your verified business details.
 */
export const brandConfig = {
  brandName: "Elyriq Signature",
  tagline: "Thoughtful Skincare & Everyday Glow",
  announcement: "Your daily ritual, elevated.",
  whatsappNumber: "2349079782731",
  instagramHandle: "@elyriqsignature",
  instagramUrl: "https://www.instagram.com/elyriqsignature?cplk=MW55eTNrZmdkbmVqZw%3D%3D&utm_source=qr",
  email: "elyriqsignature@gmail.com",
  currencySymbol: "₦",
};

/**
 * Skincare Ritual Set Configuration
 * Business rule: The 4 skincare items are sold strictly as a complete set.
 */
export const skincareSetConfig = {
  name: "The Signature Skincare Ritual",
  subtitle: "Four essentials. One considered routine. Your moment to glow.",
  price: 30000,
  formattedPrice: "₦30,000",
  availabilityNotice: "Available exclusively as a complete four-piece set — ₦30,000",
  includedItemsSummary:
    "Face & Body Wash (500 g), Glow Me Face Cream (100 g), Buttered Body (250 g), and Elyriq Polish (250 g)",
};

/**
 * The 4 Skincare Ritual Products
 * Media paths point to the public/ folder directly.
 */
export const skincareProducts = [
  {
    id: "face-body-wash",
    name: "Elyriq Face & Body Wash",
    category: "Step 01 - Cleanse",
    size: "500 g",
    shortDescription:
      "A gentle, conditioning wash designed to lift impurities while respecting your skin's natural moisture barrier.",
    fullDescription:
      "Formulated for both daily facial care and whole-body cleansing, this refreshing wash forms a silky lather that purifies without leaving skin feeling tight or dry. It sets the foundational tone for your glow ritual morning and night.",
    primaryImage: "/images/face-body-wash.jpg",
    gallery: [
      "/images/face-body-wash.jpg",
      "/images/face-body-wash-model.jpg",
      "/images/face-body-wash-detail.jpg",
    ],
    video: "/videos/face-body-wash.mp4",
    altText: "Elyriq Face & Body Wash bottle 500g",
  },
  {
    id: "glow-me-face-cream",
    name: "Glow Me Face Cream",
    category: "Step 02 - Radiance",
    size: "100 g",
    shortDescription:
      "A velvety facial hydrator that locks in dewiness and nurtures a supple, lit-from-within complexion.",
    fullDescription:
      "Lightweight yet deeply nourishing, Glow Me Face Cream absorbs smoothly without greasy residue. Designed to make morning and evening hydration feel like a quiet luxury, it leaves skin feeling cushioned, smooth, and visibly radiant.",
    primaryImage: "/images/glow-me-face-cream.jpg",
    gallery: [
      "/images/glow-me-face-cream.jpg",
      "/images/glow-me-model.jpg",
      "/images/glow-me-detail.jpg",
    ],
    video: "/videos/glow-me-face-cream.mp4",
    altText: "Glow Me Face Cream jar 100g",
  },
  {
    id: "elyriq-polish",
    name: "Elyriq Polish",
    category: "Step 03 - Exfoliate",
    size: "250 g",
    shortDescription:
      "A refined exfoliating body polish that buffs away dullness to reveal silky, renewed texture.",
    fullDescription:
      "This gentle body polish provides an elevated sensory exfoliation ritual. Gliding across the skin to buff away rough patches, it leaves your body soft, primed for hydration, and touchably smooth.",
    primaryImage: "/images/elyriq-polish.jpg",
    gallery: [
      "/images/elyriq-polish.jpg",
      "/images/elyriq-polish-model.jpg",
      "/images/elyriq-polish-detail.jpg",
    ],
    video: "/videos/elyriq-polish.mp4",
    altText: "Elyriq Polish body scrub jar 250g",
  },
  {
    id: "buttered-body",
    name: "Buttered Body",
    category: "Step 04 - Nourish",
    size: "250 g",
    shortDescription:
      "A rich, comforting body butter that melts upon contact to envelop skin in lasting softness.",
    fullDescription:
      "Indulgent and intensely replenishing, Buttered Body seals moisture into every inch of your skin. It melts with body heat to cushion dry areas, imparting a healthy, natural sheen that lasts throughout your day.",
    primaryImage: "/images/buttered-body.jpg",
    gallery: [
      "/images/buttered-body.jpg",
      "/images/buttered-body-model.jpg",
      "/images/buttered-body-detail.jpg",
    ],
    video: "/videos/buttered-body.mp4",
    altText: "Buttered Body rich moisturizer jar 250g",
  },
];

/**
 * Lip Care Collection Configuration
 * Sold as a complete set with complimentary lip liner.
 */
export const lipCareConfig = {
  heading: "A softer touch. A signature finish.",
  subheading:
    "Give your lip-care ritual its own little moment with our curated gloss and lip-cream collection.",
  giftNotice: "Complimentary lip liner with every complete set.",
  priceDisplay: "Ask for the Complete Set Price",
  whatsappEnquiryText:
    "Hello Elyriq Signature. Please share the current price and availability of your complete lip-care set, including the red gloss, clear gloss, chocolate-brown gloss, pink lip cream, and complimentary lip liner.",
  variants: [
    {
      id: "lip-red-gloss",
      name: "Signature Red Lip Gloss",
      description: "A sheer, buildable berry-red wash for high-shine dimension.",
      image: "/images/lip-red-gloss.jpg",
    },
    {
      id: "lip-clear-gloss",
      name: "Crystal Clear Lip Gloss",
      description: "Pure, glass-like shine that cushions lips without stickiness.",
      image: "/images/lip-clear-gloss.jpg",
    },
    {
      id: "lip-chocolate-gloss",
      name: "Chocolate Rich Lip Gloss",
      description: "A warm, deep cocoa-toned gloss celebrating rich skin undertones.",
      image: "/images/lip-chocolate-gloss.jpg",
    },
    {
      id: "lip-pink-cream",
      name: "Soft Pink Lip Cream",
      description: "A silky, pigmented cream finish for everyday nourishment.",
      image: "/images/lip-pink-cream.jpg",
    },
  ],
};

/**
 * Upcoming Body Shimmer Teaser
 */
export const upcomingShimmerConfig = {
  heading: "A little more radiance is on the way.",
  subheading:
    "Something luminous is taking shape. Stay close for our upcoming body shimmer collection.",
  badge: "Coming Soon",
  placeholderImage: "/images/body-shimmer-coming-soon.jpg",
};

/**
 * Brand Pillars & FAQ Data
 */
export const brandPillars = [
  {
    title: "A Considered Routine",
    description:
      "Four essential steps designed to complement one another, removing the clutter from daily skincare.",
  },
  {
    title: "A Complete-Set Approach",
    description:
      "Curated as a cohesive system so every formula works in harmony for consistent, noticeable dewiness.",
  },
  {
    title: "Beauty That Feels Personal",
    description:
      "Formulations created with an appreciation for diverse African skin tones, celebrating natural radiance.",
  },
];

export const faqItems = [
  {
    question: "How much is the skincare set?",
    answer: "The complete Elyriq Signature four-piece skincare set is ₦30,000.",
  },
  {
    question: "Can I buy the skincare products individually?",
    answer:
      "No. To ensure your skin receives the balanced benefits of the full ritual, our skincare essentials are sold exclusively as a complete four-piece set.",
  },
  {
    question: "What comes in the skincare set?",
    answer:
      "Each complete set includes: Elyriq Face & Body Wash (500 g), Glow Me Face Cream (100 g), Buttered Body (250 g), and Elyriq Polish (250 g).",
  },
  {
    question: "How do I order?",
    answer:
      "Simply click any 'Order on WhatsApp' button on the website. You will be connected directly with our team with your requested set details pre-filled.",
  },
  {
    question: "How much is the lip-care set?",
    answer:
      "Please message us via WhatsApp to receive the current pricing and availability for the complete lip-care set.",
  },
  {
    question: "Does the lip-care set include a free gift?",
    answer:
      "Yes. Every complete lip-care set includes a complimentary matching lip liner.",
  },
  {
    question: "How can I ask about ingredients or product suitability?",
    answer:
      "We are delighted to chat! Contact us directly on WhatsApp and we will gladly answer any specific questions about our formulations.",
  },
  {
    question: "How do I contact Elyriq Signature?",
    answer:
      "You can connect with us instantly on WhatsApp, reach out via email, or follow our journey on Instagram.",
  },
];