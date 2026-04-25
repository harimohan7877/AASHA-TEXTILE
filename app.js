/* ============================================
   AASHA TEXTILE — Main Website Logic
   Google Sheet Integration, Particles, Timeline,
   YouTube, 3D Effects, Animations
   ============================================ */

// ========================
// GOOGLE SHEET CONFIG
// ========================
const SHEET_ID = '1pgfaOmB_ViznJNkWn3eJa_YXNE5H3r8n_ue6mngChSc';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

// ========================
// FALLBACK PRODUCT DATA
// ========================
const DEFAULT_PRODUCTS = [
  {
    id: 1, date: "2026-03-31", name: "कैमरिक कॉटन", nameEn: "Cambric Cotton",
    variety: "प्रिंटेड (40-40/60-60)", rate: "₹430/KG", cut: "4 से 20 मीटर",
    panna: '44"', info: "गर्मी में सबसे ज्यादा बिकने वाला माल।",
    category: "Cotton", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", icon: "🌿"
  },
  {
    id: 2, date: "2026-03-31", name: "चिकन वर्क", nameEn: "Chikan Work",
    variety: "कैमरिक कॉटन पर", rate: "₹350/KG", cut: "10 मीटर+",
    panna: '44"', info: "रमज़ान के लिए हैवी डिमांड।",
    category: "Cotton", gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)", icon: "🪡"
  },
  {
    id: 3, date: "2026-03-31", name: "अस्तर (Lining)", nameEn: "Lining Fabric",
    variety: "विमल/एक्टिवा कॉटन", rate: "₹320/KG", cut: "4 से 20 मीटर",
    panna: '36"', info: "1kg में ~18 मीटर चढ़त।",
    category: "Cotton", gradient: "linear-gradient(135deg, #fccb90, #d57eeb)", icon: "📏"
  },
  {
    id: 4, date: "2026-03-31", name: "रेयॉन", nameEn: "Rayon",
    variety: "फॉयल प्रिंट", rate: "₹380/KG", cut: "20 मीटर",
    panna: '44"', info: "₹44/मीटर की औसत कोस्टिंग।",
    category: "Rayon", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", icon: "🎨"
  },
  {
    id: 5, date: "2026-03-29", name: "लखनवी कुर्ती", nameEn: "Lakhnavi Kurti",
    variety: "रेडीमेड (White/Coloured)", rate: "₹100/Piece", cut: "Single Piece",
    panna: "Standard", info: "यह 'लॉट' में आया हुआ लिमिटेड माल है।",
    category: "Readymade", gradient: "linear-gradient(135deg, #667eea, #764ba2)", icon: "👗"
  },
  {
    id: 6, date: "2026-03-29", name: "विस्कोस कुर्ती", nameEn: "Viscose Kurti",
    variety: "विस्कोस फैब्रिक", rate: "₹400/KG", cut: "4 पीस/KG",
    panna: '44"', info: "पाकिस्तानी स्टाइल कुर्तियाँ।",
    category: "Readymade", gradient: "linear-gradient(135deg, #fa709a, #fee140)", icon: "👘"
  },
  {
    id: 7, date: "2026-02-10", name: "ब्रासो", nameEn: "Brasso",
    variety: "डिजिटल प्रिंट", rate: "₹450/KG", cut: "2 से 10 मीटर",
    panna: '44"', info: "₹45/मीटर कोस्टिंग; फ्रेश रेट ₹600/m है।",
    category: "Other", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", icon: "💎"
  },
  {
    id: 8, date: "2026-02-10", name: "जापान साटन", nameEn: "Japan Satin",
    variety: "प्लेन (एक्सपोर्ट क्वालिटी)", rate: "₹130/KG", cut: "2 से 10 मीटर",
    panna: '44"', info: "काफी शाइनिंग वाला कपड़ा।",
    category: "Satin", gradient: "linear-gradient(135deg, #e0c3fc, #8ec5fc)", icon: "✨"
  },
  {
    id: 9, date: "2026-02-10", name: "चांदी सोना", nameEn: "Chandi Sona",
    variety: "जोर्जेट/साटन गोटा वर्क", rate: "₹200/KG", cut: "2 से 4+ मीटर",
    panna: '44"', info: "'चांदी-सोना' मतलब जरी का काम।",
    category: "Satin", gradient: "linear-gradient(135deg, #f5af19, #f12711)", icon: "🌟"
  },
  {
    id: 10, date: "2026-02-08", name: "मखमल (Velvet)", nameEn: "Velvet",
    variety: "9000/सेलीन क्वालिटी", rate: "₹160/KG", cut: "2 से 5 मीटर",
    panna: '44"', info: "स्टॉक बहुत कम (सिर्फ 2-3 पार्सल)।",
    category: "Other", gradient: "linear-gradient(135deg, #8b0000, #dc143c)", icon: "🧣"
  },
  {
    id: 11, date: "2026-02-08", name: "पर्दा (Curtain)", nameEn: "Curtain Fabric",
    variety: "डिजिटल/प्लेन मिक्स", rate: "₹100-150/KG", cut: "1 से 10 मीटर",
    panna: '60"', info: "विंडो और बेडशीट के लिए इस्तेमाल।",
    category: "Curtain", gradient: "linear-gradient(135deg, #667eea, #43e97b)", icon: "🪟"
  },
  // ── YouTube वीडियो से अतिरिक्त वैराइटी ──
  {
    id: 13, date: "2026-01-25", name: "मसलिन", nameEn: "Muslin",
    variety: "प्रिंटेड / प्लेन", rate: "₹300-400/KG", cut: "4 से 20 मीटर",
    panna: '44"', info: "बहुत हल्का और सॉफ्ट — बुटीक क्वालिटी। गर्मी के लिए बेस्ट।",
    category: "Cotton", gradient: "linear-gradient(135deg, #c9d6ff, #e2e2e2)", icon: "🌬️"
  },
  {
    id: 14, date: "2026-01-20", name: "कॉटन दुपट्टा", nameEn: "Cotton Dupatta",
    variety: "प्रिंटेड / ब्लॉक प्रिंट", rate: "₹200-300/KG", cut: "2.5 मीटर पीस",
    panna: '44"', info: "रेडीमेड कट में दुपट्टा — बहुत डिमांड वाला आइटम।",
    category: "Cotton", gradient: "linear-gradient(135deg, #fbc2eb, #a6c1ee)", icon: "🧣"
  },
  {
    id: 15, date: "2026-01-18", name: "लॉन कॉटन", nameEn: "Lawn Cotton",
    variety: "डिजिटल प्रिंट", rate: "₹350-450/KG", cut: "4 से 20 मीटर",
    panna: '44"', info: "पाकिस्तानी स्टाइल लॉन — बहुत प्रीमियम क्वालिटी।",
    category: "Cotton", gradient: "linear-gradient(135deg, #a8edea, #fed6e3)", icon: "🌸"
  },
  {
    id: 16, date: "2026-01-15", name: "जोर्जेट", nameEn: "Georgette",
    variety: "प्लेन / प्रिंटेड", rate: "₹250-380/KG", cut: "2 से 10 मीटर",
    panna: '44"', info: "साड़ी और दुपट्टा के लिए best। हल्का और फ्लोइंग फैब्रिक।",
    category: "Silk", gradient: "linear-gradient(135deg, #d299c2, #fef9d7)", icon: "✨"
  },
  {
    id: 17, date: "2026-01-12", name: "शिफॉन", nameEn: "Chiffon",
    variety: "प्लेन / प्रिंटेड", rate: "₹200-350/KG", cut: "2 से 10 मीटर",
    panna: '44"', info: "ट्रांसपेरेंट और हल्का — पार्टी वियर के लिए। बहुत सॉफ्ट।",
    category: "Silk", gradient: "linear-gradient(135deg, #eea2a2, #bbc3e8)", icon: "💫"
  },
  {
    id: 18, date: "2026-01-10", name: "नेट फैब्रिक", nameEn: "Net Fabric",
    variety: "एम्ब्रॉइडरी / प्लेन", rate: "₹300-500/KG", cut: "2 से 5 मीटर",
    panna: '44"', info: "लहंगा और ड्रेस में इस्तेमाल। शादी के सीज़न में हैवी डिमांड।",
    category: "Other", gradient: "linear-gradient(135deg, #f6d365, #fda085)", icon: "💎"
  },
  {
    id: 19, date: "2026-01-08", name: "क्रेप", nameEn: "Crepe",
    variety: "प्लेन / प्रिंटेड", rate: "₹280-400/KG", cut: "4 से 20 मीटर",
    panna: '44"', info: "टेक्सचर वाला फैब्रिक — कुर्ता और ड्रेस के लिए परफेक्ट।",
    category: "Other", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)", icon: "🎨"
  },
  {
    id: 20, date: "2026-01-05", name: "सिल्क दुपट्टा", nameEn: "Silk Dupatta",
    variety: "बनारसी / जरी वर्क", rate: "₹400-600/KG", cut: "2.5 मीटर पीस",
    panna: '44"', info: "शादी और फंक्शन स्पेशल — भारी ज़री वर्क वाला सिल्क दुपट्टा।",
    category: "Silk", gradient: "linear-gradient(135deg, #f8b500, #e65c00)", icon: "👑"
  }
];

// ========================
// STORAGE KEYS
// ========================
const STORAGE_KEYS = {
  products: 'aasha_products',
  media: 'aasha_media',
  whatsapp: 'aasha_whatsapp',
  sheetCache: 'aasha_sheet_cache',
  sheetCacheTime: 'aasha_sheet_cache_time',
  productImages: 'aasha_product_images'
};
const SHEET_CACHE_MS = 60 * 1000; // 1 minute cache for near-live updates
const DEFAULT_CHANNEL_URL = 'https://youtube.com/@aasarextile';

// ========================
// CATEGORY DETECTION & CONFIG
// ========================
const CATEGORY_MAP = {
  'कॉटन': 'Cotton', 'cotton': 'Cotton', 'कैमरिक': 'Cotton', 'cambric': 'Cotton',
  'चिकन': 'Cotton', 'chikan': 'Cotton', 'अस्तर': 'Cotton', 'lining': 'Cotton',
  'मसलिन': 'Cotton', 'muslin': 'Cotton', 'लॉन': 'Cotton', 'lawn': 'Cotton',
  'दुपट्टा': 'Cotton',
  'सिल्क': 'Silk', 'silk': 'Silk', 'जोर्जेट': 'Silk', 'georgette': 'Silk',
  'शिफॉन': 'Silk', 'chiffon': 'Silk',
  'रेयॉन': 'Rayon', 'rayon': 'Rayon',
  'साटन': 'Satin', 'satin': 'Satin', 'जापान': 'Satin', 'चांदी': 'Satin',
  'कुर्ती': 'Readymade', 'kurti': 'Readymade', 'रेडीमेड': 'Readymade', 'विस्कोस': 'Readymade',
  'पर्दा': 'Curtain', 'curtain': 'Curtain', 'बेडशीट': 'Curtain',
  'मखमल': 'Other', 'velvet': 'Other', 'ब्रासो': 'Other', 'brasso': 'Other',
  'bsy': 'Other', 'फिओना': 'Other', 'नेट': 'Other', 'net': 'Other',
  'क्रेप': 'Other', 'crepe': 'Other'
};

const CATEGORY_STYLES = {
  Cotton:    { icon: '🌿', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  Silk:      { icon: '✨', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  Rayon:     { icon: '🎨', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  Satin:     { icon: '💎', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' },
  Readymade: { icon: '👗', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  Curtain:   { icon: '🪟', gradient: 'linear-gradient(135deg, #667eea, #43e97b)' },
  Other:     { icon: '🧶', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' }
};

function detectCategory(name, variety) {
  const text = (name + ' ' + variety).toLowerCase();
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (text.includes(keyword.toLowerCase())) {
      return category;
    }
  }
  return 'Other';
}

// ========================
// HINDI DATE PARSING
// ========================
const HINDI_MONTHS = {
  0: 'जनवरी', 1: 'फ़रवरी', 2: 'मार्च', 3: 'अप्रैल',
  4: 'मई', 5: 'जून', 6: 'जुलाई', 7: 'अगस्त',
  8: 'सितंबर', 9: 'अक्टूबर', 10: 'नवंबर', 11: 'दिसंबर'
};

const HINDI_MONTH_TO_NUM = {
  'जनवरी': 0, 'फरवरी': 1, 'फ़रवरी': 1, 'मार्च': 2, 'अप्रैल': 3,
  'मई': 4, 'जून': 5, 'जुलाई': 6, 'अगस्त': 7,
  'सितंबर': 8, 'अक्टूबर': 9, 'नवंबर': 10, 'दिसंबर': 11
};

function parseHindiDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return null;
  // Format: "31 मार्च 2026" or "08 फरवरी 2026"
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0]);
    const monthStr = parts[1];
    const year = parseInt(parts[2]);
    const month = HINDI_MONTH_TO_NUM[monthStr];
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      const m = (month + 1).toString().padStart(2, '0');
      const d = day.toString().padStart(2, '0');
      return `${year}-${m}-${d}`;
    }
  }
  return null;
}

function parseFlexibleDate(dateStr) {
  const hindi = parseHindiDate(dateStr);
  if (hindi) return hindi;

  if (!dateStr) return null;
  const slash = dateStr.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slash) {
    const day = slash[1].padStart(2, '0');
    const month = slash[2].padStart(2, '0');
    return `${slash[3]}-${month}-${day}`;
  }
  return null;
}

function formatDateHindi(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${HINDI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function getMonthYear(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'Other';
  return `${HINDI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// ========================
// GOOGLE SHEET CSV PARSER
// ========================
function parseCSV(csvText) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  const lines = csvText.split('\n');

  for (const line of lines) {
    if (!line.trim()) continue;

    const fields = [];
    let field = '';
    inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const next = line[i + 1];

      if (inQuotes) {
        if (char === '"' && next === '"') {
          field += '"';
          i++; // skip next quote
        } else if (char === '"') {
          inQuotes = false;
        } else {
          field += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          fields.push(field.trim());
          field = '';
        } else if (char !== '\r') {
          field += char;
        }
      }
    }
    fields.push(field.trim());
    rows.push(fields);
  }

  return rows;
}

function csvToProducts(csvText) {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return []; // Need header + at least 1 data row

  // Skip header row
  const products = [];
  let lastDate = '';

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2) continue;

    // Columns:
    // A वीडियो डेट, B कपड़े का नाम, C वैरायटी, D रेट, E कट, F पन्ना,
    // G मुख्य जानकारी, H Image URL (optional), I (Empty), J YT Link (optional)
    const rawDate = row[0] || '';
    const name = row[1] || '';
    const variety = row[2] || '';
    const rate = row[3] || '';
    const cut = row[4] || '';
    const panna = row[5] || '';
    const info = row[6] || '';
    const image = row[7] || '';
    const ytLink = row[9] || row[8] || '';

    if (!name.trim()) continue;

    // Parse date (use last known date if current is empty)
    const parsedDate = parseFlexibleDate(rawDate);
    if (parsedDate) lastDate = parsedDate;
    const date = parsedDate || lastDate || '2026-01-01';

    // Auto-detect category
    const category = detectCategory(name, variety);
    const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;

    // Generate English name from Hindi
    const nameEn = generateEnglishName(name);

    let normalizedInfo = info.trim();
    let normalizedImage = image.trim();
    if (!normalizedImage && normalizedInfo.toLowerCase().includes('urlhttp')) {
      const matchUrl = normalizedInfo.match(/https?:\/\/\S+/);
      if (matchUrl) {
        normalizedImage = matchUrl[0];
        normalizedInfo = normalizedInfo.replace(matchUrl[0], '').replace(/url/ig, '').trim();
      }
    }

    const normalizedYtLink = ytLink.trim();

    products.push({
      id: i,
      date: date,
      name: name.trim(),
      nameEn: nameEn,
      variety: variety.trim(),
      rate: rate.trim() ? (rate.includes('/') ? rate.trim() : rate.trim() + '/KG') : 'Call for price',
      cut: cut.trim() || 'N/A',
      panna: panna.trim() ? panna.trim().replace(/"+/g, '"') : 'N/A',
      info: normalizedInfo,
      image: normalizedImage,
      category: category,
      gradient: style.gradient,
      icon: style.icon,
      ytLink: normalizedYtLink
    });
  }

  return products;
}

function generateEnglishName(hindiName) {
  const map = {
    'कैमरिक कॉटन': 'Cambric Cotton', 'चिकन वर्क': 'Chikan Work',
    'अस्तर': 'Lining Fabric', 'रेयॉन': 'Rayon', 'लखनवी कुर्ती': 'Lakhnavi Kurti',
    'विस्कोस कुर्ती': 'Viscose Kurti', 'ब्रासो': 'Brasso', 'जापान साटन': 'Japan Satin',
    'चांदी सोना': 'Chandi Sona', 'मखमल': 'Velvet', 'पर्दा': 'Curtain Fabric',
    'BSY फिओना': 'BSY Fiona',
    'मसलिन': 'Muslin', 'लॉन कॉटन': 'Lawn Cotton', 'लॉन': 'Lawn Cotton',
    'कॉटन दुपट्टा': 'Cotton Dupatta', 'दुपट्टा': 'Dupatta',
    'जोर्जेट': 'Georgette', 'शिफॉन': 'Chiffon',
    'नेट': 'Net Fabric', 'क्रेप': 'Crepe',
    'सिल्क दुपट्टा': 'Silk Dupatta', 'सिल्क': 'Silk'
  };

  for (const [hindi, english] of Object.entries(map)) {
    if (hindiName.includes(hindi)) return english;
  }

  // Fallback: return original with bracket content
  const bracketMatch = hindiName.match(/\(([^)]+)\)/);
  return bracketMatch ? bracketMatch[1] : hindiName;
}

// ========================
// FETCH FROM GOOGLE SHEET
// ========================
async function fetchFromGoogleSheet() {
  try {
    // Check cache (5 minute cache)
    const cacheTime = localStorage.getItem(STORAGE_KEYS.sheetCacheTime);
    const cached = localStorage.getItem(STORAGE_KEYS.sheetCache);
    const now = Date.now();

    if (cached && cacheTime && (now - parseInt(cacheTime)) < SHEET_CACHE_MS) {
      console.log('📊 Using cached Google Sheet data');
      return JSON.parse(cached);
    }

    console.log('📊 Fetching fresh data from Google Sheet...');
    const response = await fetch(SHEET_CSV_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const csvText = await response.text();
    const products = csvToProducts(csvText);

    if (products.length > 0) {
      // Cache the data
      localStorage.setItem(STORAGE_KEYS.sheetCache, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.sheetCacheTime, now.toString());
      console.log(`✅ Loaded ${products.length} products from Google Sheet`);
      return products;
    }

    throw new Error('No products parsed from sheet');
  } catch (error) {
    console.warn('⚠️ Google Sheet fetch failed:', error.message);
    console.log('📦 Using fallback/local data');

    // Try cached data even if expired
    const cached = localStorage.getItem(STORAGE_KEYS.sheetCache);
    if (cached) return JSON.parse(cached);

    // Final fallback: hardcoded data
    return DEFAULT_PRODUCTS;
  }
}

// ========================
// DATA HELPERS
// ========================
function getWhatsAppNumber() {
  return localStorage.getItem(STORAGE_KEYS.whatsapp) || '917043830602';
}

function getProductImages() {
  const stored = localStorage.getItem(STORAGE_KEYS.productImages);
  return stored ? JSON.parse(stored) : {};
}

function getYtThumbnail(ytLink) {
  if (!ytLink) return null;
  const match = ytLink.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

// Merge Google Sheet products with admin-added products
const FIREBASE_DB_URL = "https://aasha-textail-default-rtdb.firebaseio.com";

async function fetchAdminProductsFromFirebase() {
  if (FIREBASE_DB_URL && !FIREBASE_DB_URL.includes("your-firebase-rtdb")) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/products.json`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const productArray = Array.isArray(data) ? data : Object.values(data);
          localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(productArray));
          return productArray.filter(p => p.source === 'admin');
        }
      }
    } catch(e) { console.warn("Firebase fetch error", e); }
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || '[]').filter(p => p.source === 'admin');
}

async function mergeProducts(sheetProducts) {
  const adminOnly = await fetchAdminProductsFromFirebase();
  const directUpdates = (window.DIRECT_SITE_UPDATES && Array.isArray(window.DIRECT_SITE_UPDATES.products))
    ? window.DIRECT_SITE_UPDATES.products
    : [];
  
  // Combine: sheet products + admin-only products
  const merged = [...sheetProducts];
  directUpdates.forEach(dp => {
    if (!dp || !dp.name) return;
    const category = dp.category || detectCategory(dp.name || '', dp.variety || '');
    const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
    const normalized = {
      id: dp.id || Date.now() + Math.floor(Math.random() * 1000),
      date: dp.date || '2026-01-01',
      name: dp.name,
      nameEn: dp.nameEn || generateEnglishName(dp.name),
      variety: dp.variety || 'N/A',
      rate: dp.rate ? (dp.rate.includes('/KG') ? dp.rate : `${dp.rate}/KG`) : 'Call for price',
      cut: dp.cut || 'N/A',
      panna: dp.panna || 'N/A',
      info: dp.info || '',
      image: dp.image || '',
      category,
      gradient: dp.gradient || style.gradient,
      icon: dp.icon || style.icon,
      ytLink: dp.ytLink || ''
    };
    const exists = merged.some(sp => sp.name === normalized.name && sp.date === normalized.date);
    if (!exists) merged.push(normalized);
  });
  adminOnly.forEach(ap => {
    // Don't add if already exists by name match
    const exists = merged.some(sp => sp.name === ap.name && sp.date === ap.date);
    if (!exists) merged.push(ap);
  });
  
  return merged;
}

// ========================
// PARTICLE SYSTEM (Canvas)
// ========================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    if (window.innerWidth < 768) {
      this.particles = [];
      return;
    }
    const count = 60;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        hue: 35 + Math.random() * 20
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => { this.resize(); this.init(); });
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) { p.x += dx * 0.01; p.y += dy * 0.01; }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 60%, 65%, ${p.opacity})`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
        if (d < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `hsla(40, 50%, 55%, ${0.08 * (1 - d / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ========================
// PRELOADER
// ========================
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => { preloader.classList.add('hidden'); }, 800);
}

// ========================
// NAVIGATION
// ========================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  });
}

// ========================
// PRODUCT RENDERING
// ========================
let currentView = 'grid';
let currentCategory = 'all';
let allProducts = [];
let searchDebounceTimer = null;

async function loadAndRenderProducts() {
  const container = document.getElementById('productContainer');
  container.innerHTML = `
    <div class="product-empty">
      <div class="empty-icon" style="animation: spin 1s linear infinite;">⏳</div>
      <p>Data load हो रहा है...</p>
    </div>
  `;

  // Fetch from Google Sheet + merge with admin products
  const sheetProducts = await fetchFromGoogleSheet();
  allProducts = await mergeProducts(sheetProducts);
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('productContainer');
  let products = [...allProducts];

  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value.trim() !== '') {
    const q = searchInput.value.trim().toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.nameEn.toLowerCase().includes(q) || 
      p.variety.toLowerCase().includes(q) ||
      (p.info && p.info.toLowerCase().includes(q))
    );
  }

  if (currentCategory !== 'all') {
    products = products.filter(p => p.category === currentCategory);
  }

  products.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (products.length === 0) {
    container.innerHTML = `
      <div class="product-empty">
        <div class="empty-icon">📦</div>
        <p>इस कैटेगरी में कोई प्रोडक्ट नहीं मिला</p>
        <p style="font-size:0.85rem;margin-top:10px;">माल की list load नहीं हो रही? <a href="https://wa.me/917043830602" target="_blank" style="color:var(--gold);">WhatsApp करें: 7043830602</a></p>
      </div>
    `;
    return;
  }

  if (currentView === 'timeline') {
    renderTimeline(container, products);
  } else {
    renderGrid(container, products);
  }

  setTimeout(() => initScrollReveal(), 100);
}

function renderGrid(container, products) {
  const isMobile = window.innerWidth < 768;
  const initialCount = 6;
  const showViewAll = products.length > initialCount;
  const visibleProducts = showViewAll ? products.slice(0, initialCount) : products;

  container.innerHTML = `
    <div class="product-grid" id="productGridInner">
      ${visibleProducts.map(p => createProductCard(p, true)).join('')}
    </div>
    ${showViewAll ? `
      <div class="view-all-wrapper" id="viewAllProducts">
        <button class="btn btn-gold view-all-btn" onclick="loadMoreProducts()">
          और 6 देखें (${products.length - initialCount} और) →
        </button>
      </div>
    ` : ''}
  `;

  // Store full list for expand
  window._allFilteredProducts = products;
  window._loadedCount = initialCount;
}

function loadMoreProducts() {
  const products = window._allFilteredProducts || [];
  const grid = document.getElementById('productGridInner');
  const viewAllBtn = document.getElementById('viewAllProducts');
  if (!grid) return;

  const loaded = window._loadedCount || 6;
  const nextBatch = products.slice(loaded, loaded + 6);
  const newLoaded = loaded + nextBatch.length;
  window._loadedCount = newLoaded;

  // Append new cards
  nextBatch.forEach(p => {
    grid.insertAdjacentHTML('beforeend', createProductCard(p, false));
  });

  // Update or remove button
  if (newLoaded >= products.length) {
    if (viewAllBtn) viewAllBtn.remove();
  } else {
    viewAllBtn.innerHTML = `
      <button class="btn btn-gold view-all-btn" onclick="loadMoreProducts()">
        और 6 देखें (${products.length - newLoaded} और) →
      </button>
    `;
  }
  setTimeout(() => initScrollReveal(), 100);
}

function showAllProducts() {
  const products = window._allFilteredProducts || [];
  const grid = document.getElementById('productGridInner');
  const viewAllBtn = document.getElementById('viewAllProducts');
  if (!grid) return;

  grid.innerHTML = products.map(p => createProductCard(p, false)).join('');
  if (viewAllBtn) viewAllBtn.remove();
  setTimeout(() => initScrollReveal(), 100);
}

function renderTimeline(container, products) {
  const grouped = {};
  products.forEach(p => {
    const monthKey = getMonthYear(p.date);
    if (!grouped[monthKey]) grouped[monthKey] = {};
    const dateKey = formatDateHindi(p.date);
    if (!grouped[monthKey][dateKey]) grouped[monthKey][dateKey] = [];
    grouped[monthKey][dateKey].push(p);
  });

  let html = '<div class="timeline">';
  let itemIndex = 0;

  Object.entries(grouped).forEach(([month, dates]) => {
    html += `<div class="timeline-month-header"><h3>📅 ${month}</h3></div>`;

    Object.entries(dates).forEach(([date, prods]) => {
      html += `<div class="timeline-date-marker"><span class="date-badge">${date}</span></div>`;

      prods.forEach(p => {
        html += `
          <div class="timeline-item" style="transition-delay: ${itemIndex * 0.1}s">
            ${createProductCard(p)}
          </div>
        `;
        itemIndex++;
      });
    });
  });

  html += '</div>';
  container.innerHTML = html;

  setTimeout(() => {
    document.querySelectorAll('.timeline-item').forEach(item => {
      timelineObserver.observe(item);
    });
  }, 100);
}

function createProductCard(product) {
  const whatsappNum = getWhatsAppNumber();
  const orderMsg = encodeURIComponent(
    `नमस्ते! मुझे ${product.name} (${product.category}, ${product.rate}) के बारे में bulk enquiry करनी है।`
  );

  // Image priority: Manual upload > YT thumbnail > Gradient
  const images = getProductImages();
  const manualImg = images[product.id];
  const ytThumb = getYtThumbnail(product.ytLink);
  const hasRealImage = manualImg || (product.image && product.image.startsWith('http')) || ytThumb;
  const altText = `${product.name} - ${product.category} fabric wholesale Surat`;

  let visualHtml = '';
  if (manualImg) {
    visualHtml = `<img src="${manualImg}" alt="${altText}" loading="lazy" decoding="async">`;
  } else if (product.image && product.image.startsWith('http')) {
    visualHtml = `<img src="${product.image}" alt="${altText}" loading="lazy" decoding="async">`;
  } else if (ytThumb) {
    visualHtml = `<img src="${ytThumb}" alt="${altText}" loading="lazy" decoding="async">`;
  } else {
    visualHtml = `<div class="product-card-gradient" style="background: ${product.gradient}">${product.icon || '🧵'}</div>`;
  }

  const daysDiff = Math.floor((Date.now() - new Date(product.date).getTime()) / (1000 * 60 * 60 * 24));
  const isFresh = Number.isFinite(daysDiff) && daysDiff >= 0 && daysDiff <= 7;

  // Stock status badges
  const stockStatus = product.stock_status || 'available';
  const isFeatured = product.is_featured === true || product.is_featured === 'TRUE';
  let stockBadgeHtml = '';
  if (stockStatus === 'out_of_stock') {
    stockBadgeHtml = '<span class="stock-badge out-of-stock">Out of Stock</span>';
  } else if (stockStatus === 'limited') {
    stockBadgeHtml = '<span class="stock-badge limited">⚡ Limited Stock</span>';
  }
  let featuredBadgeHtml = isFeatured ? '<span class="stock-badge featured">⭐ Featured</span>' : '';
  // If both featured and stock, show stock badge (takes priority position)
  if (stockBadgeHtml && featuredBadgeHtml) featuredBadgeHtml = '';

  const isOutOfStock = stockStatus === 'out_of_stock';

  return `
    <div class="product-card-3d">
      <div class="product-card-inner" data-product-id="${product.id}">
        <div class="product-card-visual">
          ${visualHtml}
          <span class="product-card-category">${product.category}</span>
          <span class="product-card-date-tag">${formatDateHindi(product.date)}</span>
          ${isFresh ? '<span class="product-card-new">🆕 New</span>' : ''}
          ${stockBadgeHtml || featuredBadgeHtml}
        </div>
        <div class="product-card-body">
          <div class="product-card-name">${product.name}</div>
          <div class="product-card-name-en">${product.nameEn} — ${product.variety}</div>
          <div class="product-card-meta">
            ${product.cut && product.cut !== 'N/A' ? `<span class="meta-tag">Cut: ${product.cut}</span>` : ''}
            ${product.panna && product.panna !== 'N/A' ? `<span class="meta-tag">Panna: ${product.panna}</span>` : ''}
          </div>
          <div class="product-card-price">${product.rate}</div>
          ${product.info ? `<div class="product-card-info">${product.info}</div>` : ''}
          <div class="product-card-actions">
            ${isOutOfStock ? `
              <button class="btn btn-sm" disabled style="background:#555; color:#fff; cursor:not-allowed; opacity: 0.8; width: 100%;">Out of Stock</button>
            ` : `
            <a href="https://wa.me/${whatsappNum}?text=${orderMsg}" target="_blank" class="btn btn-whatsapp btn-sm">
              Bulk Enquiry
            </a>
            ${product.ytLink ? `
              <a href="${product.ytLink}" target="_blank" class="btn btn-yt btn-sm">▶ Video</a>
            ` : ''}
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========================
// CATEGORY FILTER
// ========================
function initCategoryFilter() {
  const filterContainer = document.getElementById('categoryFilter');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderProducts();
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => renderProducts(), 180);
    });
  }
}

// ========================
// VIEW TOGGLE
// ========================
function initViewToggle() {
  const gridBtn = document.getElementById('viewGrid');
  const timelineBtn = document.getElementById('viewTimeline');
  if (!gridBtn || !timelineBtn) return;

  gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridBtn.classList.add('active');
    timelineBtn.classList.remove('active');
    renderProducts();
  });

  timelineBtn.addEventListener('click', () => {
    currentView = 'timeline';
    timelineBtn.classList.add('active');
    gridBtn.classList.remove('active');
    renderProducts();
  });
}

// ========================
// 3D CARD TILT EFFECT
// ========================
function init3DCardTilt() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.product-card-inner').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const rotateX = (y - rect.height / 2) / (rect.height / 2) * -5;
        const rotateY = (x - rect.width / 2) / (rect.width / 2) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

// ========================
// ABOUT CARD 3D EFFECT
// ========================
function initAboutCard3D() {
  const card = document.getElementById('aboutCard');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

// ========================
// YOUTUBE SECTION
// ========================

// Default channel videos (from @aasarextile)
const DEFAULT_YT_VIDEOS = [
  { id: 'ou6OC6VIrAg', title: 'Aasha Textile — Latest Arrival', date: '1 month ago' },
  { id: '9EuQ4jobSrI', title: 'Aasha Textile — New Collection', date: '1 month ago' },
  { id: 'UVoRe1_ayyo', title: 'Aasha Textile — Daily Update', date: '2 months ago' },
  { id: 'SwVrcFxJQZI', title: 'Aasha Textile — Fresh Stock', date: '2 months ago' },
  { id: 'cd9LLk4nKEc', title: 'Aasha Textile — New Varieties', date: '2 months ago' },
  { id: 'LeGsAjKM6aM', title: 'Aasha Textile — Fabric Collection', date: '2 months ago' },
  { id: '343vmMWMZps', title: '₹50/kg से भी कम! 😱 70kg parcel ₹3500', date: '3 months ago' },
  { id: 'c57xvk0NgjU', title: 'Muslin Bhi Fail! ₹3.../Kg Boutique Quality', date: '3 months ago' },
  { id: 'atURWwrWay4', title: 'GST Hum Bharenge! 450 Kg mall 😱 Limited Stock', date: '3 months ago' },
  { id: 'D_Ckmax1kFQ', title: 'Aasha Textile — Premium Fabrics', date: '2 months ago' },
  { id: 'splDVzNby58', title: 'Aasha Textile — Cut Piece Collection', date: '2 months ago' },
  { id: 'wubTg2Ql6jw', title: 'Aasha Textile — Wholesale Rates', date: '2 months ago' }
];

async function fetchMediaFromFirebase() {
  if (FIREBASE_DB_URL && !FIREBASE_DB_URL.includes("your-firebase-rtdb")) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/media.json`);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          localStorage.setItem(STORAGE_KEYS.media, JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {
      console.warn('Firebase media fetch error', e);
    }
  }
  const stored = localStorage.getItem(STORAGE_KEYS.media);
  return stored ? JSON.parse(stored) : { youtube: [], instagram: [], facebook: '' };
}

function extractHandleFromUrl(url) {
  const match = (url || '').match(/youtube\.com\/@([a-zA-Z0-9._-]+)/i);
  return match ? match[1] : '';
}

function extractChannelIdFromUrl(url) {
  const match = (url || '').match(/youtube\.com\/channel\/(UC[a-zA-Z0-9_-]+)/i);
  return match ? match[1] : '';
}

function formatRelativeFromPublished(isoDate) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return 'Recent';
  const diffDays = Math.max(0, Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)));
  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.floor(diffDays / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

function parseYouTubeFeedXml(xmlText, label) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, 'application/xml');
  const entries = Array.from(xml.querySelectorAll('entry'));
  return entries.slice(0, 12).map(entry => {
    const idEl = entry.querySelector('videoId') || entry.querySelector('yt\\:videoId');
    const titleEl = entry.querySelector('title');
    const publishedEl = entry.querySelector('published');
    const id = idEl ? idEl.textContent.trim() : '';
    if (!id) return null;
    const published = publishedEl ? publishedEl.textContent.trim() : '';
    return {
      id,
      title: titleEl ? titleEl.textContent.trim() : 'Aasha Textile — Video',
      date: published ? formatRelativeFromPublished(published) : label,
      url: `https://www.youtube.com/watch?v=${id}`
    };
  }).filter(Boolean);
}

async function fetchTextWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchChannelVideosAuto(channelUrl) {
  const channelId = extractChannelIdFromUrl(channelUrl);
  const handle = extractHandleFromUrl(channelUrl);
  const feedCandidates = [];

  if (channelId) {
    feedCandidates.push({ url: `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, label: 'Channel Feed' });
  }
  if (handle) {
    // RSSHub handle endpoint (API key free)
    feedCandidates.push({ url: `https://rsshub.app/youtube/user/@${handle}`, label: 'Channel Feed' });
  }

  for (const candidate of feedCandidates) {
    try {
      const xmlText = await fetchTextWithTimeout(candidate.url, 9000);
      const parsed = parseYouTubeFeedXml(xmlText, candidate.label);
      if (parsed.length > 0) return parsed;
    } catch (e) {
      console.warn('Channel auto fetch failed:', candidate.url, e.message);
    }
  }
  return [];
}

async function renderYouTubeSection() {
  const grid = document.getElementById('youtubeGrid');
  if (!grid) return;
  const existingViewAll = document.getElementById('viewAllVideos');
  if (existingViewAll) existingViewAll.remove();

  // Get admin-added videos
  const media = await fetchMediaFromFirebase();
  const adminVideos = media.youtube || [];
  const directVideos = (window.DIRECT_SITE_UPDATES && Array.isArray(window.DIRECT_SITE_UPDATES.youtube))
    ? window.DIRECT_SITE_UPDATES.youtube
    : [];
  const channelUrl = (window.DIRECT_SITE_UPDATES && window.DIRECT_SITE_UPDATES.youtubeChannelUrl)
    ? window.DIRECT_SITE_UPDATES.youtubeChannelUrl
    : DEFAULT_CHANNEL_URL;
  const autoChannelVideos = await fetchChannelVideosAuto(channelUrl);

  // Combine
  const allVideos = [...autoChannelVideos];
  adminVideos.forEach(item => {
    const url = typeof item === 'string' ? item : (item && item.url ? item.url : '');
    const title = typeof item === 'string' ? 'Aasha Textile — Video' : (item.title || 'Aasha Textile — Video');
    const date = typeof item === 'string' ? 'Admin Added' : (item.date || 'Admin Added');
    const videoId = extractYouTubeId(url);
    if (videoId) {
      allVideos.push({ id: videoId, title, date, url });
    }
  });
  directVideos.forEach(item => {
    const url = typeof item === 'string' ? item : (item && item.url ? item.url : '');
    const title = typeof item === 'string' ? 'Aasha Textile — Video' : (item.title || 'Aasha Textile — Video');
    const date = typeof item === 'string' ? 'Direct Update' : (item.date || 'Direct Update');
    const videoId = extractYouTubeId(url);
    if (videoId && !allVideos.some(v => v.id === videoId)) {
      allVideos.push({ id: videoId, title, date, url });
    }
  });
  DEFAULT_YT_VIDEOS.forEach(v => {
    if (allVideos.length < 4 && !allVideos.some(av => av.id === v.id)) {
      allVideos.push({ ...v, url: `https://www.youtube.com/watch?v=${v.id}` });
    }
  });

  // Show limited initially
  const isMobile = window.innerWidth < 768;
  const initialCount = isMobile ? 2 : 4;
  const showVideos = allVideos.slice(0, initialCount);

  grid.innerHTML = showVideos.map((video, i) => createYtCard(video, i)).join('');

  // View All button
  if (allVideos.length > initialCount) {
    grid.insertAdjacentHTML('afterend', `
      <div class="view-all-wrapper" id="viewAllVideos">
        <button class="btn btn-outline view-all-btn" onclick="showAllVideos()" style="border-color:#ff0000;color:#ff4444;">
          ▶ सभी ${allVideos.length} वीडियो देखें →
        </button>
      </div>
    `);
  }

  window._allYtVideos = allVideos;
}

function createYtCard(video, i) {
  return `
    <div class="yt-card reveal ${i > 0 ? 'reveal-delay-' + Math.min(i, 3) : ''}" onclick="window.open('${video.url}', '_blank')">
      <div class="yt-card-thumb">
        <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" loading="lazy" decoding="async">
        <div class="yt-play-overlay"><div class="yt-play-btn">▶</div></div>
      </div>
      <div class="yt-card-body">
        <div class="yt-card-title">${video.title}</div>
        <div class="yt-card-date">📺 ${video.date}</div>
      </div>
    </div>
  `;
}

function showAllVideos() {
  const grid = document.getElementById('youtubeGrid');
  const viewAllBtn = document.getElementById('viewAllVideos');
  const allVideos = window._allYtVideos || [];
  if (!grid) return;

  grid.innerHTML = allVideos.map((v, i) => createYtCard(v, i)).join('');
  if (viewAllBtn) viewAllBtn.remove();
  setTimeout(() => initScrollReveal(), 100);
}

function extractYouTubeId(url) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

// ========================
// WHATSAPP ORDER MODAL
// ========================
let selectedProduct = null;

function openOrderModal(productId) {
  selectedProduct = allProducts.find(p => p.id === productId);
  if (!selectedProduct) return;

  document.getElementById('modalProductInfo').innerHTML = `
    <div class="modal-product-name">${selectedProduct.icon} ${selectedProduct.name} (${selectedProduct.nameEn})</div>
    <div class="modal-product-price">${selectedProduct.rate} — ${selectedProduct.variety}</div>
    <div style="margin-top:8px;font-size:0.8rem;color:#d4a853;">⚖️ Supply Mode: Per KG / Bulk Parcel</div>
  `;
  document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
  selectedProduct = null;
}

function initOrderModal() {
  const modal = document.getElementById('orderModal');
  const closeBtn = document.getElementById('modalClose');
  const form = document.getElementById('orderForm');

  if (closeBtn) closeBtn.addEventListener('click', closeOrderModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeOrderModal(); });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!selectedProduct) return;

      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const address = document.getElementById('customerAddress').value.trim();
      const message = document.getElementById('customerMessage').value.trim();
      const whatsappNum = getWhatsAppNumber();
      const errorDiv = document.getElementById('formError');

      // Validation
      if (!name || !phone) {
        if (errorDiv) {
          errorDiv.textContent = 'नाम और फ़ोन नंबर ज़रूरी है';
          errorDiv.classList.add('show');
        }
        return;
      }
      if (phone.length < 10) {
        if (errorDiv) {
          errorDiv.textContent = 'सही फ़ोन नंबर डालें';
          errorDiv.classList.add('show');
        }
        return;
      }
      if (errorDiv) errorDiv.classList.remove('show');

      let msg = `🛍️ *नया Bulk Enquiry — Aasha Textile*\n\n`;
      msg += `📦 *प्रोडक्ट:* ${selectedProduct.name} (${selectedProduct.nameEn})\n`;
      msg += `📏 *वैराइटी:* ${selectedProduct.variety}\n`;
      msg += `💰 *रेट:* ${selectedProduct.rate}\n\n`;
      msg += `⚖️ *Mode:* Per KG / Parcel\n`;
      msg += `👤 *ग्राहक:* ${name}\n`;
      msg += `📞 *फ़ोन:* ${phone}\n`;
      if (address) msg += `📍 *पता:* ${address}\n`;
      if (message) msg += `💬 *मैसेज:* ${message}\n`;

      window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`, '_blank');
      closeOrderModal();
      form.reset();
    });
  }
}

// ========================
// SCROLL REVEAL
// ========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initScrollReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ========================
// COUNTER ANIMATION
// ========================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          entry.target.textContent = Math.floor(current) + '+';
        }, 16);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ========================
// IMAGE LIGHTBOX
// ========================
function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (!lightbox || !imgSrc) return;

  lightboxImg.src = imgSrc;
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('active');
  document.body.style.overflow = '';

  setTimeout(() => {
    document.getElementById('lightboxImg').src = '';
  }, 350);
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox) return;

  // Close button
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Click overlay to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Prevent close when clicking the image itself
  document.getElementById('lightboxImg').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Delegate click on product card images
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.product-card-visual img');
    if (img) {
      e.preventDefault();
      e.stopPropagation();
      // Get product name from parent card
      const card = img.closest('.product-card-inner');
      const nameEl = card ? card.querySelector('.product-card-name') : null;
      const caption = nameEl ? nameEl.textContent : '';
      openLightbox(img.src, caption);
    }
  });
}

// ========================
// KEYBOARD SHORTCUTS
// ========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeOrderModal();
  }
});

// ========================
// INITIALIZE EVERYTHING
// ========================
document.addEventListener('DOMContentLoaded', () => {
  hidePreloader();

  const canvas = document.getElementById('particleCanvas');
  if (canvas) new ParticleSystem(canvas);

  initNavigation();

  // Load products from Google Sheet (async)
  loadAndRenderProducts();

  initCategoryFilter();
  initViewToggle();
  init3DCardTilt();
  initAboutCard3D();
  renderYouTubeSection();
  initOrderModal();
  initLightbox();
  initScrollReveal();
  initCounters();

  // WhatsApp FAB tooltip auto-show after 3 seconds
  setTimeout(() => {
    const tooltip = document.querySelector('.whatsapp-fab-tooltip');
    if (tooltip) {
      tooltip.classList.add('auto-show');
      setTimeout(() => tooltip.classList.remove('auto-show'), 4000);
    }
  }, 3000);
});
