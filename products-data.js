/**
 * Centralized Product Data for Bhagyalakshmi Home Needs
 * 
 * Categories: 
 * - mixers-preethi, mixers-prestige, grinders-ultra, cookers-prestige, 
 *   cookers-ganga, gas-stove-preethi, gas-stove-prestige
 */

const PRODUCTS_DATA = [
    // --- Premium Collection (Featured on Shop Page) ---
    {
        id: "premium-gas-stove",
        title: "3-Burner Gas Stove",
        price: "4,500",
        desc: "Toughened glass top with high-efficiency brass burners.",
        image: "preethi_gas_stove.jpg",
        category: "gas-stove-preethi",
        featured: true
    },
    {
        id: "premium-grinder",
        title: "Table Top Wet Grinder",
        price: "3,800",
        desc: "2-Litre capacity with cylindrical stones for smooth grinding.",
        image: "grinder.png",
        category: "grinders-ultra",
        featured: true
    },
    {
        id: "premium-mixer",
        title: "Powerful Mixer Grinder",
        price: "3,200",
        desc: "750W motor with 3 stainless steel jars for all kitchen needs.",
        image: "mixer.png",
        category: "mixers-preethi",
        featured: true
    },
    {
        id: "premium-cooker",
        title: "Prestige Cooker",
        price: "1,999",
        desc: "Durable and safe pressure cooker for your daily fast cooking needs.",
        image: "cooker-5l.png",
        category: "cookers-prestige",
        featured: true
    },
    {
        id: "premium-cooktop",
        title: "Prestige Cooktop",
        price: "2,450",
        desc: "Digital display with multiple preset cooking menus and auto-off.",
        image: "induction-cooktop.jpg",
        category: "induction-cooktops",
        featured: true
    },

    // --- All Products: Mixers ---
    {
        id: "preethi-zodiac",
        title: "Preethi Zodiac Mixer Grinder",
        price: "8,499",
        desc: "Powerful 750W motor with 5 jars, including a Master Chef Plus jar for slicing, grating, and dough kneading.",
        image: "preethi.jpg",
        category: "mixers-preethi"
    },
    {
        id: "preethi-xpro-duo",
        title: "Preethi x pro duo",
        price: "5,000",
        origPrice: "6,000",
        desc: "The Preethi Xpro Duo (MG-198) is a high-performance 1300-watt commercial mixer grinder designed for heavy-duty, continuous grinding.",
        image: "preethi-x-pro-duo.png",
        category: "mixers-preethi"
    },
    {
        id: "prestige-endura-pro",
        title: "Prestige Endura PRO Mixer Grinder",
        price: "6,250",
        desc: "1000W Heavy Duty Motor with 6 jars including a juicer extractor. Perfect for tough grinding tasks.",
        image: "prestige-mixer.webp",
        category: "mixers-prestige"
    },

    // --- All Products: Grinders ---
    {
        id: "ultra-perfect-plus",
        title: "Ultra Perfect+ Wet Grinder",
        price: "8,990",
        desc: "2-Litre capacity with precise conical stones for soft idli batters and ABS body.",
        image: "grinder.png",
        category: "grinders-ultra"
    },

    // --- All Products: Cookers ---
    {
        id: "prestige-ss-cooker",
        title: "Prestige Stainless Steel Cooker",
        price: "1,000",
        origPrice: "1,999",
        desc: "Durable and safe pressure cooker for your daily fast cooking needs. High quality stainless steel body.",
        image: "cooker-5l.png",
        category: "cookers-prestige"
    },
    {
        id: "ganga-cooker",
        title: "Ganga Cooker",
        price: "1,000",
        desc: "Reliable and affordable Ganga pressure cooker for your everyday cooking needs.",
        image: "ganga_cooker.jpg",
        category: "cookers-ganga"
    },

    // --- All Products: Gas Stoves ---
    {
        id: "preethi-3-burner",
        title: "Preethi 3-Burner Glass Top Gas Stove",
        price: "4,500",
        desc: "Toughened glass top with high-efficiency brass burners. Elegant black design for modern kitchens.",
        image: "preethi_gas_stove.jpg",
        category: "gas-stove-preethi"
    },
    {
        id: "prestige-2-burner",
        title: "Prestige 2-Burner Gas Stove",
        price: "2,000",
        desc: "Sleek and compact Prestige gas stove perfect for smart modular kitchens.",
        image: "prestige_gas_stove.jpg",
        category: "gas-stove-prestige"
    }
];
