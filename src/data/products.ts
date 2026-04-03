export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  howItWorks: string;
  whoItsFor: string;
  science: string;
  image: string;
  gallery?: string[];
  price?: string;
}

import shakenMassagerImg from "@assets/shaken_massager_1775039147402.png";
import thzTeraP90PlusImg from "@assets/thz_tera-p90+_1775039147402.png";
import vitalityWandImg from "@assets/vitality_wand_1775039147403.png";
import hPlusBarImg from "@assets/h+_bar_1775039147403.png";
import galaxyGOneImg from "@assets/galaxy_g-one_1775039147403.png";
import teraP90Img from "@assets/tera-p90_1775039147404.png";

export const products: Product[] = [
  {
    id: "1",
    slug: "shaken-massager",
    name: "SHAKEN MASSAGER",
    tagline: "Advanced frequency eye & head massager for deep periorbital recovery.",
    description: "Combines targeted frequency therapy with gentle vibration to relieve eye strain, reduce puffiness, and improve sleep quality. Built for the modern high-performer.",
    benefits: [
      "Eye strain relief",
      "Reduced puffiness",
      "Better sleep preparation",
      "Improved microcirculation"
    ],
    howItWorks: "Delivers targeted low-level frequencies and gentle vibration around the eyes to stimulate blood flow, relax ocular muscles, and reduce fluid retention in periorbital tissue.",
    whoItsFor: "Professionals who spend hours in front of screens, those struggling with sleep onset, and individuals looking for non-invasive recovery for eye fatigue.",
    science: "Increased microcirculation in the periorbital area helps remove metabolic waste, reduce inflammation, and deliver nutrients needed for tissue repair and rejuvenation.",
    image: shakenMassagerImg,
    price: "$1,000",
  },
  {
    id: "2",
    slug: "thz-tera-p90-plus",
    name: "THz TERA-P90+",
    tagline: "The premium PEMF mat and Terahertz wand combo system for full-body optimization.",
    description: "A professional-grade dual-therapy system combining a full-body PEMF mat with a targeted Terahertz wand. The most comprehensive frequency therapy setup available for home use.",
    benefits: [
      "Full-body cellular regeneration",
      "Targeted spot treatment",
      "Accelerated recovery",
      "Enhanced circulation"
    ],
    howItWorks: "The PEMF mat delivers Earth-mimicking electromagnetic fields throughout the entire body while the companion wand focuses terahertz frequencies on specific areas for precision therapy.",
    whoItsFor: "Serious biohackers, athletes requiring both systemic and localized treatment, and anyone committed to a comprehensive daily frequency wellness protocol.",
    science: "Combining PEMF and terahertz modalities creates a synergistic effect — PEMF recharges cellular voltage while terahertz activates dormant stem cells and clears meridian blockages simultaneously.",
    image: thzTeraP90PlusImg,
    price: "$500",
  },
  {
    id: "3",
    slug: "vitality-wand",
    name: "VITALITY WAND",
    tagline: "Handheld Terahertz frequency wand for targeted deep-tissue healing.",
    description: "The Champion's Choice. Activates dormant stem cells, removes unhealthy cells, improves microcirculation, and balances the autonomic nervous system. Precision healing in your hands.",
    benefits: [
      "Deep tissue healing",
      "Stem cell activation",
      "Inflammation reduction",
      "Meridian unblocking"
    ],
    howItWorks: "Emits terahertz frequencies that match the natural vibrational frequency of human cells, penetrating deep into tissues to stimulate healing and clear energy blockages throughout the body.",
    whoItsFor: "Those dealing with localized pain, inflammation, or looking to support their body's innate healing capabilities through targeted frequency application.",
    science: "Terahertz waves lie between microwave and infrared on the electromagnetic spectrum. Non-ionizing and safe, they resonate with healthy cells at 2-17 THz, strengthening them while unhealthy cells dissipate.",
    image: vitalityWandImg,
    price: "$600",
  },
  {
    id: "4",
    slug: "h-plus-bar",
    name: "H+ BAR",
    tagline: "Hydrogen-enriched water generator for advanced cellular hydration.",
    description: "Elevate your hydration. The H+ Bar infuses your water with molecular hydrogen — the smallest and most powerful antioxidant — delivering cellular hydration that regular water simply cannot provide.",
    benefits: [
      "Powerful antioxidant protection",
      "Cellular hydration",
      "Reduced oxidative stress",
      "Enhanced energy and mental clarity"
    ],
    howItWorks: "Uses electrolysis to infuse pure molecular hydrogen (H2) into your water. Hydrogen molecules are small enough to penetrate every cell membrane and neutralize free radicals at the source.",
    whoItsFor: "Athletes looking to reduce oxidative stress from training, anyone seeking anti-aging support, and those wanting to complement their frequency therapy protocol with optimal hydration.",
    science: "Molecular hydrogen (H2) selectively neutralizes cytotoxic reactive oxygen species (ROS), particularly the hydroxyl radical, without affecting beneficial cellular signaling molecules.",
    image: hPlusBarImg,
    price: "$1,000",
  },
  {
    id: "5",
    slug: "galaxy-g-one",
    name: "GALAXY G-ONE",
    tagline: "Premium eye therapy device with advanced frequency and compression technology.",
    description: "Experience next-generation eye recovery. The Galaxy G-One delivers precise frequency therapy with intelligent air compression and gentle heat to restore vitality around the eyes.",
    benefits: [
      "Intelligent air compression massage",
      "Frequency-enhanced recovery",
      "Dark circle reduction",
      "Stress and tension relief"
    ],
    howItWorks: "Combines frequency therapy with precisely calibrated air compression cycles and gentle warmth to stimulate lymphatic drainage, increase blood flow, and calm the nervous system.",
    whoItsFor: "High-performers who prioritize recovery from screen fatigue, frequent travelers, and those wanting a premium daily ritual for eye health and relaxation.",
    science: "The combination of frequency resonance and pneumatic compression creates a pumping effect in lymphatic tissue, accelerating removal of metabolic waste and reducing periorbital congestion.",
    image: galaxyGOneImg,
    price: "$500",
  },
  {
    id: "6",
    slug: "tera-p90",
    name: "TERA-P90",
    tagline: "Professional PEMF foot mat for standing full-body cellular recharge.",
    description: "Step into recovery. The Tera-P90 delivers powerful PEMF therapy through the feet — one of the body's richest reflex zones — to recharge your entire cellular network from the ground up.",
    benefits: [
      "Whole-body PEMF via reflex zones",
      "Improved circulation",
      "Pain and fatigue relief",
      "Daily cellular maintenance"
    ],
    howItWorks: "Delivers targeted pulsed electromagnetic fields through the soles of the feet, activating thousands of nerve endings and reflex points that correspond to every organ and system in the body.",
    whoItsFor: "Those who spend long hours on their feet, anyone seeking convenient daily PEMF without lying down, and individuals wanting to incorporate frequency therapy into their standing routine.",
    science: "The feet contain over 7,000 nerve endings. PEMF delivered through the plantar surface creates cascading electrical stimulation throughout the peripheral and central nervous system.",
    image: teraP90Img,
    price: "$800",
  }
];
