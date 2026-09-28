export interface GymConfig {
  name: string;
  tagline: string;
  subtagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: {
    line1: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    short: string;
  };
  mapsUrl: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    instagram: string;
    whatsapp: string;
    youtube: string;
    facebook: string;
  };
  disciplines: Array<{
    number: string;
    name: string;
    category: string;
    description: string;
    tagline: string;
    icon: string;
  }>;
  ethos: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  zones: Array<{
    id: string;
    number: string;
    name: string;
    description: string;
    imageUrl: string;
    icon: string;
    colSpan: string;
  }>;
  plans: Array<{
    id: string;
    tier: string;
    name: string;
    duration: string;
    price: string;
    period: string;
    tagline: string;
    featured?: boolean;
    features: string[];
    ctaText: string;
  }>;
  amenities: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  schedule: Array<{
    day: string;
    morningSlots: string[];
    eveningSlots: string[];
    focus: string;
  }>;
  mapEmbedUrl: string;
}

export const gymConfig: GymConfig = {
  name: "ARMOR FIT",
  tagline: "Transform Sweat into Strength",
  subtagline: "STRENGTH & CONDITIONING • GORAKHPUR",
  phone: "+91 81888 41144",
  phoneRaw: "+918188841144",
  email: "contact@armorfitgym.com",
  address: {
    line1: "Savitri Complex, Green City Road",
    landmark: "Near MP Polytechnic",
    area: "Nathmalpur / Gorakhnath",
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    pincode: "273015",
    full: "Savitri Complex, Green City Road, Near MP Polytechnic, Nathmalpur / Gorakhnath, Gorakhpur, UP 273015",
    short: "Green City Rd, Gorakhpur",
  },
  mapsUrl: "https://maps.google.com/?q=Armor+Fit+Savitri+Complex+Green+City+Road+Gorakhpur",
  hours: {
    weekdays: "5:30 AM – 10:00 PM",
    saturday: "5:30 AM – 9:30 PM",
    sunday: "7:00 AM – 1:00 PM",
  },
  social: {
    instagram: "https://instagram.com/armorfitgorakhpur",
    whatsapp: "https://wa.me/918188841144",
    youtube: "https://youtube.com/@armorfitgym",
    facebook: "https://facebook.com/armorfitgym",
  },
  disciplines: [
    {
      number: "01",
      name: "STRENGTH",
      category: "Barbell",
      description: "Build foundational power and skeletal resilience through progressive barbell resistance and compound lifts: deadlifts, squats, strict pressing, and heavy carries.",
      tagline: "Heavy Resistance Matrix",
      icon: "weight",
    },
    {
      number: "02",
      name: "CONDITIONING",
      category: "Metabolic",
      description: "High-capacity aerobic and anaerobic systems engineered to expand your physical work threshold, cardiac efficiency, and mental toughness under fatigue.",
      tagline: "Aerobic Threshold Engine",
      icon: "vital_signs",
    },
    {
      number: "03",
      name: "MOBILITY & RECOVERY",
      category: "Durability",
      description: "Joint integrity, end-range strength, and tissue compliance protocols to prevent injury, accelerate tissue restoration, and preserve long-term movement longevity.",
      tagline: "Structural Restoration",
      icon: "self_improvement",
    },
    {
      number: "04",
      name: "FUNCTIONAL PERFORMANCE",
      category: "Athletic",
      description: "Multi-planar resistance, plyometrics, and rotational power transfer designed to forge athletic capacity that translates beyond the barbell platform.",
      tagline: "Dynamic Output & Power",
      icon: "sprint",
    },
  ],
  ethos: [
    {
      number: "01",
      title: "PROGRESSIVE OVERLOAD",
      description: "Systematic resistance escalation. We track tangible reps, load, and mechanical efficiency rather than guessing workout intensity.",
    },
    {
      number: "02",
      title: "TECHNIQUE BEFORE LOAD",
      description: "Movement purity precedes weight increases. Uncompromising structural positioning ensures joint longevity and maximal force expression.",
    },
    {
      number: "03",
      title: "RELENTLESS CONSISTENCY",
      description: "Elite physical capability is not forged in occasional heroic sessions, but through disciplined adherence to compound movement week after week.",
    },
    {
      number: "04",
      title: "MENTAL RESILIENCE",
      description: "We view resistance training as a laboratory for mental grit. When you learn to remain calm under heavy iron, you master pressure in life.",
    },
  ],
  zones: [
    {
      id: "zone-01",
      number: "ZONE 01",
      name: "Free Weight & Heavy Racks",
      description: "Custom calibrated steel, power cages, and competition deadlift platforms.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2q4UBQKW635Z02frbNMI_wPFPBkXalDwzQJixvOVCoh8wFkzTteRIb42hDnL9OhqG34j3CGn8xy2r9X415ANWRDBNdlbgc182VzCoYHIN4oSG50cLf0z-Q_X-XALVugGPFCsPI1zNrEMwIr0NPsU2mHoQo76aKd9eHkRYnTtWvh-WtqMoVoG-0QPG4X1SkaDPeqKVWvsxvlyXv593b01P-wyd7WZau72bE6az4fk4IOViL8hvx3GANg",
      icon: "fitness_center",
      colSpan: "md:col-span-8",
    },
    {
      id: "zone-chalk",
      number: "TACTILE CHALK",
      name: "Precision Knurling",
      description: "Calibrated Olympic bars designed for optimal grip, hook grip, and clean turnover.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnTVZMqaF47pfwKuVa71ji2_wQC9gOB_LIBgi0vCiBhn_6izQuvkJVeJ3V5oKl6S6FYXa7jMk7RVISrKr26Vy6m5QLs_y4m3prnSmE1xg5kLr653aXYgwyYCnhZflZuY7xSbGPHMXEAuAMdfhvNVZHjxI_McUk_rci02lmQnqe21C3idTnOh8bi7WYkfr0aY2ijmii1mOyTwt7vHJs1OfBhFP6qy8RbkTD-2BT6wMG2DCFM3nvx6u26A",
      icon: "pan_tool",
      colSpan: "md:col-span-4",
    },
    {
      id: "zone-02",
      number: "ZONE 02",
      name: "Turf & Functional Rig",
      description: "Heavy sled push lane, gymnastics pull-up stations, and battle rope anchors.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEuW0JtAOmBGubEfPLxemVokfiXA-41dAicp5v_vALkPJ1eof_ZjGNeZcKl06e4cVqZbqf2SD4kKXLJJdpGsJvlfF8qz0TT_Hew5Z_rJ6DU2-hscPCKxA6F88v7LFl0h3MUObPNZF9N_scFWtxP-HNx4sPCz71gmNSCiK5uqrrbM4wc4zaMvAP3XaKod_kGwTvOYI1ahqroFpTmbCuqpLbgxTE5gntXsPNT7JlYwkxpDaFC8f73Ax5ig",
      icon: "sports_gymnastics",
      colSpan: "md:col-span-5",
    },
    {
      id: "zone-03",
      number: "ZONE 03",
      name: "Conditioning & Cardio Array",
      description: "Assault bikes, concept ergometers, and ski ergs built for high lactic output.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQuSuBOFV9ilUGZreyWacW6SQ6xJdARx5vU7DSOdB4kxEyr2pQ7Fp_P7W1kVnicREc3IJquAsnFtODm9TCR2f2GjPwM8NOZykoaRsKfjmCUB4Xdk2S8xSCqNugNqEFCa9JVdRV-wIsARqIoCR_TJGoMZrc-Mlu7kxXbfHipvZ6SKSnGpeJuD00opg4l-1ducJRcukhLGQylJ-Gh29xg8V19MXjgqAsCNx6v_TEk74QdAemfghEP_n-Ew",
      icon: "speed",
      colSpan: "md:col-span-7",
    },
  ],
  plans: [
    {
      id: "plan-monthly",
      tier: "MONTHLY PASS",
      name: "Iron Starter",
      duration: "1 Month",
      price: "₹1,500",
      period: "/ month",
      tagline: "Unrestricted barbell & open floor access",
      features: [
        "Full access to Heavy Racks & Free Weights",
        "Olympic Deadlift Platforms & Bumper Plates",
        "Assault Bikes & Cardio Conditioning Array",
        "Locker & Hydration Access",
        "Initial Movement Assessment",
      ],
      ctaText: "SELECT 1-MONTH",
    },
    {
      id: "plan-quarterly",
      tier: "QUARTERLY ATHLETE",
      name: "Progressive Load",
      duration: "3 Months",
      price: "₹3,800",
      period: "for 3 months",
      tagline: "Most popular choice for steady adaptation",
      featured: true,
      features: [
        "Everything in Monthly Pass",
        "Priority access during peak training hours",
        "CrossFit & Functional Rig session access",
        "Monthly 1-on-1 technique & form audit",
        "Nutrition & macro consultation blueprint",
      ],
      ctaText: "SELECT QUARTERLY",
    },
    {
      id: "plan-annual",
      tier: "ANNUAL IRON",
      name: "Uncompromising Elite",
      duration: "12 Months",
      price: "₹12,000",
      period: "/ year (₹1,000/mo)",
      tagline: "Maximum value for committed athletes",
      features: [
        "Unrestricted 365-day full facility access",
        "All CrossFit, HIIT & Strength daily classes",
        "Quarterly physical performance benchmarking",
        "Permanent personal locker allotment",
        "Complimentary guest passes (2 per quarter)",
      ],
      ctaText: "SELECT ANNUAL",
    },
  ],
  amenities: [
    {
      icon: "fitness_center",
      title: "Olympic Barbell Racks",
      description: "Competition-spec power cages, deadlift platforms, and calibrated bumper plates.",
    },
    {
      icon: "air",
      title: "Ventilation & Cooling",
      description: "High-airflow environmental ventilation designed for heavy physical output.",
    },
    {
      icon: "lockers",
      title: "Secure Lockers",
      description: "Individual heavy-duty storage lockers with dedicated changing areas.",
    },
    {
      icon: "water_drop",
      title: "Hydration Station",
      description: "Triple-stage filtered chilled hydration dispensers throughout the floor.",
    },
    {
      icon: "timer",
      title: "Extended Hours",
      description: "Operational from 5:30 AM to 10:00 PM for before-work and late-evening training.",
    },
    {
      icon: "sports_martial_arts",
      title: "Certified Coaches",
      description: "Experienced strength specialists present on the floor for technique checks.",
    },
  ],
  schedule: [
    {
      day: "Monday – Friday",
      morningSlots: ["06:00 AM – Barbell Strength", "07:30 AM – CrossFit WOD", "09:00 AM – Open Gym Floor"],
      eveningSlots: ["05:00 PM – Functional Rig", "06:30 PM – CrossFit WOD", "08:00 PM – Strength & Hypertrophy"],
      focus: "Compound movements, barbell deadlifts, squats, metabolic intervals",
    },
    {
      day: "Saturday",
      morningSlots: ["06:30 AM – Olympic Technique", "08:00 AM – Team Conditioning"],
      eveningSlots: ["05:00 PM – Mobility & Recovery", "07:00 PM – Open Heavy Floor"],
      focus: "Form refinement, team workouts, structural tissue recovery",
    },
    {
      day: "Sunday",
      morningSlots: ["07:00 AM to 01:00 PM – Open Iron Floor"],
      eveningSlots: ["Rest & Facility Sanitization"],
      focus: "Deload recovery, active movement, optional auxiliary lifts",
    },
  ],
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.336181165243!2d83.3582451!3d26.7974378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399144415849ecb1%3A0xb304e28df5fe0bb4!2sSavitri%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

