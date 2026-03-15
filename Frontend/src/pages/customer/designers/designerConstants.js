//Static config
export const ALL_SPECIALTIES = [
  "Architectural","Parametric","Organic","Mechanical","Prototyping",
  "Enclosures","Jewellery","Wearables","Character","Figurines","Artistic","Medical",
];

export const ALL_SOFTWARE = [
  "Blender","ZBrush","Rhino","Grasshopper","SolidWorks","Fusion 360","AutoCAD",
];

export const BADGE_CONFIG = {
  "TOP RATED":     { color: "#f5c842", bg: "rgba(245,200,66,0.15)",  icon: "★" },
  "FAST DELIVERY": { color: "#10b981", bg: "rgba(16,185,129,0.15)",  icon: "⚡" },
  "CERTIFIED":     { color: "#8b5cf6", bg: "rgba(139,92,246,0.15)",  icon: "✓" },
  "EXCLUSIVE":     { color: "#ec4899", bg: "rgba(236,72,153,0.15)",  icon: "◆" },
};

export const MODAL_TABS = [
  { id: "profile",   icon: "👤", label: "Profile"   },
  { id: "customize", icon: "✏️", label: "Customize"  },
  { id: "messages",  icon: "💬", label: "Messages"  },
  { id: "quote",     icon: "📋", label: "Quote"     },
];

export const MODEL_TYPES = [
  "Vase / Decorative","Mechanical Part","Character / Figurine","Jewellery",
  "Architectural Model","Prosthetic / Medical","Game Asset","Other",
];

export const PRINT_METHODS = ["FDM","SLA / Resin","SLS","MJF","No preference"];
export const FINISH_OPTS   = ["Raw print","Sanded & smooth","Painted","Polished","Designer's choice"];

//Mock data (replace with Firestore calls later)
export const MOCK_DESIGNERS = [
  {
    id: 1, name: "Aria Chen", title: "Parametric & Architectural Designer",
    location: "San Francisco, CA", rating: 4.9, reviews: 138, startingPrice: 80,
    turnaround: "3–5 Days", specialties: ["Architectural", "Parametric", "Organic"],
    software: ["Rhino", "Grasshopper", "Blender"], badges: ["TOP RATED", "FAST DELIVERY"],
    verified: true, available: true, completedProjects: 214, avatar: "AC",
    accentColor: "#00f5ff",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    bio: "Specialising in complex parametric and organic forms that push the boundaries of what's 3D-printable. Every model is optimised for FDM and SLA printing.",
    portfolio: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=70",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=70",
    ],
  },
  {
    id: 2, name: "Marcus Webb", title: "Mechanical & Functional Parts",
    location: "Austin, TX", rating: 4.8, reviews: 97, startingPrice: 60,
    turnaround: "2–4 Days", specialties: ["Mechanical", "Prototyping", "Enclosures"],
    software: ["SolidWorks", "Fusion 360", "AutoCAD"], badges: ["CERTIFIED"],
    verified: true, available: true, completedProjects: 183, avatar: "MW",
    accentColor: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Mechanical engineer turned 3D design specialist. I build functional, print-ready parts that work first time — brackets, enclosures, gears, and more.",
    portfolio: [
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=300&q=70",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300&q=70",
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&q=70",
    ],
  },
  {
    id: 3, name: "Sofia Reyes", title: "Jewellery & Wearable Designer",
    location: "New York, NY", rating: 5.0, reviews: 221, startingPrice: 95,
    turnaround: "4–6 Days", specialties: ["Jewellery", "Wearables", "Artistic"],
    software: ["ZBrush", "Blender", "Rhino"], badges: ["TOP RATED", "EXCLUSIVE"],
    verified: true, available: false, completedProjects: 309, avatar: "SR",
    accentColor: "#f59e0b",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    bio: "Award-winning jewellery and wearable designer. My high-detail resin-ready models are trusted by boutique jewellers across the US and Europe.",
    portfolio: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&q=70",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&q=70",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=70",
    ],
  },
  {
    id: 4, name: "Liam Park", title: "Character & Figurine Sculptor",
    location: "Los Angeles, CA", rating: 4.7, reviews: 64, startingPrice: 70,
    turnaround: "5–8 Days", specialties: ["Character", "Figurines", "Organic"],
    software: ["ZBrush", "Blender"], badges: [],
    verified: false, available: true, completedProjects: 91, avatar: "LP",
    accentColor: "#10b981",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Digital sculptor focused on high-resolution character models and collectible figurines. SLA-optimised with sub-millimetre surface detail.",
    portfolio: [
      "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=300&q=70",
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=300&q=70",
      "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=300&q=70",
    ],
  },
  {
    id: 5, name: "Priya Nair", title: "Medical & Anatomical Models",
    location: "Boston, MA", rating: 4.9, reviews: 152, startingPrice: 120,
    turnaround: "3–5 Days", specialties: ["Medical", "Prototyping", "Architectural"],
    software: ["SolidWorks", "Fusion 360", "Rhino"], badges: ["CERTIFIED", "TOP RATED"],
    verified: true, available: true, completedProjects: 176, avatar: "PN",
    accentColor: "#3b82f6",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80",
    bio: "Biomedical-background designer specialising in anatomical models, prosthetics, and surgical guides. ISO-compliant workflows, watertight every time.",
    portfolio: [
      "https://images.unsplash.com/photo-1559757175-7cb0566ebb22?w=300&q=70",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=70",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=70",
    ],
  },
  {
    id: 6, name: "Tom Eriksen", title: "Product & Consumer Design",
    location: "Seattle, WA", rating: 4.6, reviews: 43, startingPrice: 55,
    turnaround: "2–3 Days", specialties: ["Prototyping", "Enclosures", "Mechanical"],
    software: ["Fusion 360", "AutoCAD", "SolidWorks"], badges: ["FAST DELIVERY"],
    verified: false, available: true, completedProjects: 58, avatar: "TE",
    accentColor: "#ec4899",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "Consumer product designer with 8 years of experience. Rapid-iteration specialist — I turn your sketch into a print-ready prototype fast.",
    portfolio: [
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&q=70",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&q=70",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&q=70",
    ],
  },
  {
    id: 7, name: "Yuki Tanaka", title: "Miniature & Game Asset Designer",
    location: "Portland, OR", rating: 4.8, reviews: 189, startingPrice: 45,
    turnaround: "3–4 Days", specialties: ["Figurines", "Character", "Artistic"],
    software: ["Blender", "ZBrush"], badges: ["TOP RATED"],
    verified: true, available: true, completedProjects: 267, avatar: "YT",
    accentColor: "#f59e0b",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    bio: "Tabletop miniature designer and game asset creator. Ultra-detailed, hollow-optimised models ready for resin printers, delivered on time every time.",
    portfolio: [
      "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?w=300&q=70",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=70",
      "https://images.unsplash.com/photo-1558098329-a11cff621064?w=300&q=70",
    ],
  },
  {
    id: 8, name: "Diego Vasquez", title: "Architectural Visualisation",
    location: "Miami, FL", rating: 4.5, reviews: 38, startingPrice: 90,
    turnaround: "5–7 Days", specialties: ["Architectural", "Parametric", "Organic"],
    software: ["Rhino", "Grasshopper", "AutoCAD"], badges: [],
    verified: false, available: true, completedProjects: 47, avatar: "DV",
    accentColor: "#00f5ff",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    bio: "Architecture graduate specialising in scaled physical models and concept visualisation. Every build matches the exact tolerances of your specs.",
    portfolio: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=70",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&q=70",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=70",
    ],
  },
];

export const MOCK_CHAT = {
  1: [
    { id: 1, from: "designer", text: "Hi! I saw your interest in parametric design. What kind of model are you looking to create?", time: "2d ago" },
    { id: 2, from: "user",     text: "I need a custom vase with a lattice shell, around 30cm tall.", time: "2d ago" },
    { id: 3, from: "designer", text: "Love that concept! I can do a Voronoi lattice or a hexagonal grid — any preference? I'll send a quote once you confirm the spec.", time: "1d ago" },
  ],
  2: [],
};

export const MOCK_QUOTES = {
  1: {
    status: "received",
    items: [
      { label: "Base modelling fee",        amount: 80 },
      { label: "Lattice complexity add-on", amount: 35 },
      { label: "Revision rounds (x2)",      amount: 20 },
    ],
    total: 135,
    note: "Price includes 2 revision rounds and the final STL + STEP files. Delivery in 4 days.",
    sentAt: "1 day ago",
  },
  2: { status: "none" },
};
