/**
 * Sample catalogue used to demonstrate the store. Everything here can be
 * edited or deleted from the admin panel; it is only inserted when the
 * database has no products yet. Prices are in minor units (paise).
 */

export const seedCategories = [
  {
    slug: "vitamins-supplements",
    name: "Vitamins & Supplements",
    description: "Daily vitamins, minerals and nutritional support for every routine.",
    image: "/images/categories/vitamins-supplements.jpg",
  },
  {
    slug: "skincare",
    name: "Skincare",
    description: "Gentle cleansers, serums and sun protection for healthy-looking skin.",
    image: "/images/categories/skincare.jpg",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    description: "Everyday essentials for hair, body and oral care.",
    image: "/images/categories/personal-care.jpg",
  },
  {
    slug: "health-devices",
    name: "Health Devices",
    description: "Reliable monitors and measuring devices for home health checks.",
    image: "/images/categories/health-devices.jpg",
  },
  {
    slug: "first-aid",
    name: "First Aid",
    description: "Kits and supplies to handle minor injuries at home or on the go.",
    image: "/images/categories/first-aid.jpg",
  },
];

type SeedProduct = {
  name: string;
  sku: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  images: string[];
  description: string;
  specs: Array<[string, string]>;
};

export const seedProducts: SeedProduct[] = [
  {
    name: "Vitamin D3 2000 IU Softgels",
    sku: "ZY-VIT-001",
    category: "vitamins-supplements",
    price: 44900,
    salePrice: 39900,
    stock: 64,
    featured: true,
    images: ["vitamin-d3-1"],
    description:
      "Easy-to-swallow softgels providing 2000 IU of vitamin D3 (cholecalciferol) in a light olive-oil base.\n\nVitamin D contributes to the maintenance of normal bones, teeth and immune function. One softgel a day with a meal is all it takes to keep your routine simple.",
    specs: [
      ["Pack size", "60 softgels"],
      ["Strength", "2000 IU per softgel"],
      ["Suggested use", "1 softgel daily with food"],
      ["Suitable for", "Adults"],
      ["Storage", "Store below 25°C, away from direct sunlight"],
    ],
  },
  {
    name: "Omega-3 Fish Oil 1000 mg",
    sku: "ZY-VIT-002",
    category: "vitamins-supplements",
    price: 89900,
    stock: 38,
    featured: true,
    images: ["omega-3-1", "omega-3-2"],
    description:
      "Purified fish oil softgels delivering EPA and DHA omega-3 fatty acids. Each batch is molecularly distilled and lemon-flavoured to minimise aftertaste.\n\nEPA and DHA contribute to the normal function of the heart as part of a balanced diet.",
    specs: [
      ["Pack size", "90 softgels"],
      ["Fish oil", "1000 mg per softgel"],
      ["Suggested use", "1–2 softgels daily with meals"],
      ["Flavour", "Natural lemon"],
      ["Storage", "Store in a cool, dry place"],
    ],
  },
  {
    name: "Complete Daily Multivitamin",
    sku: "ZY-VIT-003",
    category: "vitamins-supplements",
    price: 64900,
    stock: 52,
    images: ["multivitamin-1", "multivitamin-2"],
    description:
      "A once-daily tablet combining 24 essential vitamins and minerals to help fill everyday nutritional gaps.\n\nFormulated for adults with busy lifestyles, with B-vitamins that contribute to the reduction of tiredness and fatigue.",
    specs: [
      ["Pack size", "60 tablets"],
      ["Nutrients", "24 vitamins and minerals"],
      ["Suggested use", "1 tablet daily after breakfast"],
      ["Dietary", "Vegetarian"],
    ],
  },
  {
    name: "Vitamin C 1000 mg Tablets",
    sku: "ZY-VIT-004",
    category: "vitamins-supplements",
    price: 34900,
    salePrice: 29900,
    stock: 4,
    isNew: true,
    images: ["vitamin-c-1", "vitamin-c-2"],
    description:
      "High-strength vitamin C with citrus bioflavonoids in a convenient daily tablet.\n\nVitamin C contributes to the normal function of the immune system and to the protection of cells from oxidative stress.",
    specs: [
      ["Pack size", "60 tablets"],
      ["Strength", "1000 mg per tablet"],
      ["Suggested use", "1 tablet daily"],
      ["Dietary", "Vegan"],
    ],
  },
  {
    name: "Magnesium Glycinate Capsules",
    sku: "ZY-VIT-005",
    category: "vitamins-supplements",
    price: 79900,
    stock: 27,
    isNew: true,
    images: ["magnesium-1", "magnesium-2"],
    description:
      "A gentle, well-absorbed form of magnesium bound to the amino acid glycine.\n\nMagnesium contributes to normal muscle function and the reduction of tiredness and fatigue. A popular choice for an evening routine.",
    specs: [
      ["Pack size", "90 capsules"],
      ["Elemental magnesium", "200 mg per 2 capsules"],
      ["Suggested use", "2 capsules daily, preferably in the evening"],
      ["Dietary", "Vegan"],
    ],
  },
  {
    name: "Marine Collagen Peptides Powder",
    sku: "ZY-VIT-006",
    category: "vitamins-supplements",
    price: 149900,
    salePrice: 129900,
    stock: 19,
    featured: true,
    images: ["collagen-1", "collagen-2"],
    description:
      "Unflavoured hydrolysed marine collagen that dissolves easily into coffee, smoothies or water.\n\nEach serving provides 10 g of collagen peptides. No added sugar, colours or sweeteners.",
    specs: [
      ["Net weight", "300 g (30 servings)"],
      ["Per serving", "10 g collagen peptides"],
      ["Flavour", "Unflavoured"],
      ["Suggested use", "Mix 1 scoop into 200 ml of liquid daily"],
    ],
  },
  {
    name: "Hydrating Hyaluronic Face Serum",
    sku: "ZY-SKN-001",
    category: "skincare",
    price: 89900,
    stock: 45,
    featured: true,
    images: ["serum-1"],
    description:
      "A lightweight, fragrance-free serum with multi-weight hyaluronic acid and panthenol to draw moisture into the skin and keep it feeling plump and comfortable.\n\nApply 2–3 drops to clean skin morning and evening, before moisturiser.",
    specs: [
      ["Volume", "30 ml"],
      ["Key ingredients", "Hyaluronic acid, panthenol (vitamin B5)"],
      ["Skin type", "All skin types"],
      ["Fragrance", "Fragrance-free"],
    ],
  },
  {
    name: "Gentle Foaming Face Cleanser",
    sku: "ZY-SKN-002",
    category: "skincare",
    price: 49900,
    stock: 70,
    isNew: true,
    images: ["cleanser-1"],
    description:
      "A soft, pH-balanced gel that lifts away dirt, oil and make-up without leaving skin tight or dry.\n\nSuitable for daily use, morning and night.",
    specs: [
      ["Volume", "150 ml"],
      ["Skin type", "Normal to oily, sensitive"],
      ["Format", "Pump dispenser"],
    ],
  },
  {
    name: "Daily Moisturiser SPF 30",
    sku: "ZY-SKN-003",
    category: "skincare",
    price: 64900,
    stock: 33,
    images: ["moisturiser-1"],
    description:
      "A fast-absorbing daily moisturiser with broad-spectrum SPF 30 protection. Ceramides help support the skin barrier while leaving a natural, non-greasy finish.",
    specs: [
      ["Volume", "50 ml"],
      ["Sun protection", "SPF 30, broad spectrum"],
      ["Finish", "Natural, non-greasy"],
      ["Skin type", "All skin types"],
    ],
  },
  {
    name: "Mineral Sunscreen SPF 50",
    sku: "ZY-SKN-004",
    category: "skincare",
    price: 59900,
    salePrice: 49900,
    stock: 58,
    featured: true,
    images: [],
    description:
      "A zinc-oxide mineral sunscreen that sits comfortably under make-up and does not leave a heavy white cast.\n\nReapply every two hours when outdoors and after swimming or sweating.",
    specs: [
      ["Volume", "50 ml"],
      ["Sun protection", "SPF 50, PA++++"],
      ["Filter type", "Mineral (zinc oxide)"],
      ["Water resistance", "Up to 40 minutes"],
    ],
  },
  {
    name: "Nourishing Lip Balm",
    sku: "ZY-SKN-005",
    category: "skincare",
    price: 19900,
    stock: 120,
    images: ["lip-balm-1"],
    description:
      "A rich balm with shea butter and vitamin E that softens and protects dry or chapped lips. Unscented and suitable for everyday use.",
    specs: [
      ["Net weight", "10 g"],
      ["Key ingredients", "Shea butter, vitamin E"],
      ["Fragrance", "Unscented"],
    ],
  },
  {
    name: "Sonic Electric Toothbrush",
    sku: "ZY-PC-001",
    category: "personal-care",
    price: 249900,
    salePrice: 199900,
    stock: 14,
    featured: true,
    isNew: true,
    images: ["toothbrush-1", "toothbrush-2"],
    description:
      "A rechargeable sonic toothbrush with three cleaning modes and a two-minute smart timer that pauses every 30 seconds to guide you around your mouth.\n\nOne full charge lasts up to 30 days of twice-daily brushing.",
    specs: [
      ["Cleaning modes", "Clean, Sensitive, Whitening"],
      ["Battery life", "Up to 30 days per charge"],
      ["Charging", "USB-C, charger included"],
      ["In the box", "Handle, 2 brush heads, charging cable"],
      ["Warranty", "1 year (placeholder — confirm with supplier)"],
    ],
  },
  {
    name: "Hand Sanitiser Gel",
    sku: "ZY-PC-002",
    category: "personal-care",
    price: 14900,
    stock: 200,
    images: ["sanitiser-1"],
    description:
      "A quick-drying alcohol-based hand sanitiser enriched with aloe vera so hands feel clean without feeling dry.",
    specs: [
      ["Volume", "250 ml"],
      ["Alcohol content", "70% v/v"],
      ["Format", "Pump bottle"],
    ],
  },
  {
    name: "Everyday Body Lotion",
    sku: "ZY-PC-003",
    category: "personal-care",
    price: 44900,
    stock: 41,
    images: ["body-lotion-1"],
    description:
      "A light, fast-absorbing body lotion with glycerin and oat extract for all-day moisture. Gentle enough for the whole family.",
    specs: [
      ["Volume", "400 ml"],
      ["Key ingredients", "Glycerin, oat extract"],
      ["Skin type", "Normal to dry"],
    ],
  },
  {
    name: "Balancing Daily Shampoo",
    sku: "ZY-PC-004",
    category: "personal-care",
    price: 39900,
    stock: 36,
    images: [],
    description:
      "A sulphate-free shampoo that cleans gently while respecting the scalp's natural balance. Suitable for frequent washing and colour-treated hair.",
    specs: [
      ["Volume", "300 ml"],
      ["Hair type", "All hair types"],
      ["Free from", "Sulphates, parabens"],
    ],
  },
  {
    name: "Digital Thermometer",
    sku: "ZY-HD-001",
    category: "health-devices",
    price: 34900,
    stock: 80,
    images: ["thermometer-1", "thermometer-2"],
    description:
      "A fast, easy-to-read digital thermometer with a flexible tip and fever alarm. Gives a reading in about 10 seconds and remembers the last measurement.",
    specs: [
      ["Reading time", "Approx. 10 seconds"],
      ["Measurement", "Oral, underarm"],
      ["Display", "LCD, °C / °F"],
      ["Battery", "LR41 button cell (included)"],
    ],
  },
  {
    name: "Upper Arm Blood Pressure Monitor",
    sku: "ZY-HD-002",
    category: "health-devices",
    price: 219900,
    salePrice: 189900,
    stock: 12,
    featured: true,
    images: ["bp-monitor-2"],
    description:
      "An automatic upper-arm monitor with a large backlit display, irregular heartbeat indicator and memory for two users.\n\nThe wide-range cuff fits most adult arms. Designed for home monitoring — always discuss your readings with a healthcare professional.",
    specs: [
      ["Cuff size", "22–42 cm"],
      ["Memory", "2 users × 60 readings"],
      ["Power", "4 × AA batteries or USB"],
      ["In the box", "Monitor, cuff, storage pouch, batteries"],
      ["Warranty", "2 years (placeholder — confirm with supplier)"],
    ],
  },
  {
    name: "Fingertip Pulse Oximeter",
    sku: "ZY-HD-003",
    category: "health-devices",
    price: 129900,
    stock: 0,
    images: ["oximeter-1"],
    description:
      "A compact fingertip device that displays blood oxygen saturation (SpO₂) and pulse rate on a bright OLED screen. Switches off automatically to save battery.",
    specs: [
      ["Measures", "SpO₂ and pulse rate"],
      ["Display", "Dual-colour OLED"],
      ["Battery", "2 × AAA (included)"],
      ["In the box", "Oximeter, lanyard, batteries"],
    ],
  },
  {
    name: "Digital Body Weight Scale",
    sku: "ZY-HD-004",
    category: "health-devices",
    price: 119900,
    stock: 22,
    images: ["scale-1"],
    description:
      "A slim tempered-glass bathroom scale with high-precision sensors and an easy-to-read display. Turns on with a step and switches off automatically.",
    specs: [
      ["Capacity", "Up to 180 kg"],
      ["Increments", "100 g"],
      ["Platform", "6 mm tempered glass"],
      ["Battery", "2 × AAA (included)"],
    ],
  },
  {
    name: "Home First Aid Kit",
    sku: "ZY-FA-001",
    category: "first-aid",
    price: 99900,
    stock: 30,
    isNew: true,
    images: ["first-aid-kit-1", "first-aid-kit-2"],
    description:
      "A well-organised kit with the essentials for treating minor cuts, scrapes, burns and sprains at home, in the car or while travelling.\n\nClearly labelled compartments make it easy to find what you need quickly.",
    specs: [
      ["Contents", "96 pieces incl. plasters, gauze, bandages, tape, scissors, gloves"],
      ["Case", "Durable carry case with handle"],
      ["Dimensions", "26 × 18 × 8 cm"],
    ],
  },
];
