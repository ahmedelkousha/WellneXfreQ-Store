export interface Product {
  id: string;
  slug: string;
  name: string;
  name_pl?: string;
  tagline: string;
  tagline_pl?: string;
  description: string;
  description_pl?: string;
  benefits: string[];
  benefits_pl?: string[];
  howItWorks: string;
  howItWorks_pl?: string;
  whoItsFor: string;
  whoItsFor_pl?: string;
  science: string;
  science_pl?: string;
  image: string;
  gallery?: string[];
  price?: string;
}

import vitalityWandImg from "@assets/vitality_wand_1775039147403.png";
import thzTeraP90PlusImg from "@assets/thz_tera-p90+_1775039147402.png";
import teraP90Img from "@assets/tera-p90_1775039147404.png";
import shakenMassagerImg from "@assets/shaken_massager_1775039147402.png";
import galaxyGOneImg from "@assets/galaxy_g-one_1775039147403.png";
import skylineSL6Img from "@assets/skyline_sl6.png";
import a9BamaAirImg from "@assets/a9_bamaair.png";
import hPlusBarImg from "@assets/h+_bar_1775039147403.png";

export const products: Product[] = [
  {
    id: "1",
    slug: "vitality-wand",
    name: "OlyLife Vitality Wand",
    name_pl: "Witalna Różdżka OlyLife",
    tagline: "VITALITY WAND CHAMPION'S CHOICE | OlyNation",
    tagline_pl: "VITALity WAND WYBÓR MISTRZÓW | OlyNation",
    description: "The Vitality Wand is designed to provide a relaxing and comfortable wellness experience through frequency-based technology and controlled airflow. Featuring ultra-long wave frequency technology, gentle warmth, and air pressure massage, the device is engineered to support comfort and relaxation as part of a self-care routine.",
    description_pl: "Vitality Wand został zaprojektowany, aby zapewnić relaksujące i komfortowe doświadczenie wellness dzięki technologii opartej na częstotliwościach i kontrolowanym przepływie powietrza. Wyposażone w technologię fal o ultradługiej częstotliwości, delikatne ciepło i masaż ciśnieniowy powietrzem, urządzenie wspiera komfort i relaks.",
    benefits: [
      "Support healthy microcirculation",
      "Detoxification",
      "Removal of cold and dampness",
      "Dredge meridians"
    ],
    benefits_pl: [
      "Wsparcie zdrowego mikrokrążenia",
      "Detoksykacja organizmu",
      "Usuwanie zimna i wilgoci",
      "Udrażnianie meridianów"
    ],
    howItWorks: "Terahertz Waves (1 THz) resonate with human cells while PEMF Ultra-long Waves penetrate deeply. Controlled airflow and air pressure massage offer standardized, hygienic application.",
    howItWorks_pl: "Fale Terahertzowe (1 THz) rezonują z ludzkimi komórkami, podczas gdy fale PEMF Ultra-long wnikają głęboko. Kontrolowany przepływ powietrza i masaż ciśnieniowy zapewniają higieniczną aplikację.",
    whoItsFor: "Individuals seeking a personalized and convenient wellness session experience with intuitive one-click operation and adjustable temperature settings.",
    whoItsFor_pl: "Osoby szukające spersonalizowanego i wygodnego doświadczenia wellness z intuicyjną obsługą jednym kliknięciem i regulowanymi ustawieniami temperatury.",
    science: "Thermal Energy Transfer helps to relieve pain, relax muscle, alleviate inflammation and increase tissue flexibility. PEMF technology penetrates deeply into the body.",
    science_pl: "Transfer Energii Termicznej pomaga łagodzić ból, rozluźniać mięśnie, łagodzić stany zapalne i zwiększać elastyczność tkanek. Technologia PEMF wnika głęboko w ciało.",
    image: vitalityWandImg,
    price: "$600",
  },
  {
    id: "2",
    slug: "tera-p90-plus",
    name: "OlyLife THz Tera-P90+",
    name_pl: "OlyLife THz Tera-P90+",
    tagline: "OlyNation | Comprehensive Multi-Technology Wellness System",
    tagline_pl: "OlyNation | Kompleksowy System Wellness Wielotechnologiczny",
    description: "OlyLife THz Tera-P90+ is a multi-technology wellness system that integrates PEMF and frequency-based technology with specialized attachments like the Frost Age Beauty Device and Revitaluxe Massager for a complete self-care experience.",
    description_pl: "OlyLife THz Tera-P90+ to zaawansowany system wellness integrujący PEMF i technologię częstotliwościową ze specjalistycznymi przystawkami dla pełnej regeneracji i samopoczucia.",
    benefits: [
      "Multi-Technology Wellness Integration",
      "20-Level Intensity Control",
      "Upgraded foot pedal design",
      "Infrared remote control",
      "Includes Frost Age & Revitaluxe attachments"
    ],
    benefits_pl: [
      "Integracja wielu technologii wellness",
      "20 poziomów intensywności dla personalizacji",
      "Ulepszona konstrukcja pedałów",
      "Pilot na podczerwień",
      "Zawiera przystawki Frost Age i Revitaluxe"
    ],
    howItWorks: "Integrates PEMF and frequency-based tech with specialized attachments: Frost Age (RF & EMS) for smoother skin, and Revitaluxe (Magnetic, EMS & Light) for scalp and muscle relaxation.",
    howItWorks_pl: "Integruje PEMF i technologię częstotliwościową z przystawkami: Frost Age (RF i EMS) dla gładszej skóry oraz Revitaluxe (magnetyzm, EMS i światło) dla relaksu skóry głowy i mięśni.",
    whoItsFor: "Those seeking a professional-grade, complete self-care system designed to complement daily wellness routines and support total body balance.",
    whoItsFor_pl: "Osoby szukające profesjonalnego, kompletnego systemu dbania o siebie, zaprojektowanego w celu uzupełnienia codziennych rutyn wellness i wsparcia równowagi organizmu.",
    science: "Synergistic application of PEMF for cellular voltage, RF/EMS for skin rejuvenation, and magnetic/light therapy for deep muscle recovery.",
    science_pl: "Synergiczne zastosowanie PEMF dla napięcia komórkowego, RF/EMS dla odmłodzenia skóry oraz terapii magnetycznej i świetlnej dla głębokiej regeneracji mięśni.",
    image: thzTeraP90PlusImg,
    price: "$1,500",
  },
  {
    id: "3",
    slug: "tera-p90",
    name: "OlyLife THz Tera-P90",
    name_pl: "OlyLife THz Tera-P90",
    tagline: "OlyNation | Focus on Frequency-Based Balance",
    tagline_pl: "OlyNation | Koncentracja na Równowadze Częstotliwościowej",
    description: "OlyLife THz Tera-P90 is a wellness device designed to support relaxation and overall well-being through frequency-based technology. It combines PEMF with terahertz-based frequency patterns to support the body's natural balance.",
    description_pl: "OlyLife THz Tera-P90 to urządzenie wellness wspierające relaks i ogólne samopoczucie dzięki technologii częstotliwościowej. Łączy PEMF z wzorcami terahertzowymi.",
    benefits: [
      "Supports overall wellness",
      "Encourages relaxation",
      "Supports physical comfort",
      "Promotes a sense of vitality",
      "Non-invasive experience"
    ],
    benefits_pl: [
      "Wspiera ogólne samopoczucie",
      "Sprzyja relaksacji",
      "Wspiera komfort fizyczny",
      "Promuje poczucie witalności",
      "Doświadczenie nieinwazyjne"
    ],
    howItWorks: "Utilizing a focused band of 3-3000 μm (the 'light of life'), terahertz energy penetrates 4-5 cm deep to enhance cellular interaction while PEMF supports general wellness.",
    howItWorks_pl: "Wykorzystując pasmo 3-3000 μm ('światło życia'), energia terahertzowa wnika na 4-5 cm głębokości, aby wzmocnić interakcje komórkowe, podczas gdy PEMF wspiera wellness.",
    whoItsFor: "Individuals committed to a healthy lifestyle seeking a gentle and supportive wellness session that complements the body's natural processes.",
    whoItsFor_pl: "Osoby prowadzące zdrowy tryb życia, szukające delikatnej i wspierającej sesji wellness, która uzupełnia naturalne procesy organizmu.",
    science: "Terahertz energy resonates synergistically with body molecules to improve microcirculation. PEMF utilizes low-frequency signals for relaxation.",
    science_pl: "Energia terahertzowa rezonuje synergicznie z cząsteczkami ciała, poprawiając mikrokrążenie. PEMF wykorzystuje sygnały niskiej częstotliwości do relaksu.",
    image: teraP90Img,
    price: "$1,000",
  },
  {
    id: "4",
    slug: "shaken-massager",
    name: "Shaken Massager",
    name_pl: "Masażer Shaken",
    tagline: "OlyNation | Shaken Massager PEMF Smart Wellness Device",
    tagline_pl: "OlyNation | Inteligentne Urządzenie Wellness PEMF Shaken Massager",
    description: "The Shaken Massager is a wearable wellness device designed to support comfort and relaxation. This waist-worn device combines ultrasonic vibration, gentle heat, radio frequency, red light, massage, and PEMF technology.",
    description_pl: "Shaken Massager to ubieralne urządzenie wellness wspierające komfort i relaks. Noszone w talii, łączy wibracje ultradźwiękowe, ciepło, fale radiowe RF, światło czerwone i PEMF.",
    benefits: [
      "Ultrasonic comfort technology",
      "RF (Radio Frequency) warming energy",
      "7-zone air pressure massage",
      "Red light revitalization",
      "Wearable for active lifestyle"
    ],
    benefits_pl: [
      "Ultradźwiękowa technologia komfortu",
      "Energia grzewcza RF (fale radiowe)",
      "7-strefowy masaż ciśnieniowy",
      "Rewitalizacja światłem czerwonym",
      "Ubieralność dla aktywnego stylu życia"
    ],
    howItWorks: "Combines multi-airbag compression with rhythmic vibration and low-frequency PEMF. Features specific modes: Body Comfort, Massage, and Heat Therapy.",
    howItWorks_pl: "Łączy kompresję wielopoduszkową z rytmicznymi wibracjami i niskoczęstotliwościowym PEMF. Posiada tryby: Komfort Ciała, Masaż i Terapia Ciepłem.",
    whoItsFor: "Active individuals seeking a streamlined way to promote relaxation while fitting seamlessly into everyday wear, whether at home or on the move.",
    whoItsFor_pl: "Osoby aktywne szukające uproszczonego sposobu na relaks, który idealnie pasuje do codziennego stroju, w domu lub w podróży.",
    science: "Ultrasonic waves provide gentle stimulation, while RF delivers warming energy. PEMF supports relaxation and overall core wellness.",
    science_pl: "Fale ultradźwiękowe zapewniają delikatną stymulację, podczas gdy RF dostarcza energię cieplną. PEMF wspiera relaks i ogólne dobre samopoczucie.",
    image: shakenMassagerImg,
    price: "$1,000",
  },
  {
    id: "5",
    slug: "galaxy-g-one",
    name: "OlyLife Galaxy G-One",
    name_pl: "OlyLife Galaxy G-One",
    tagline: "OlyNation | Smart Eye Wellness Experience",
    tagline_pl: "OlyNation | Inteligentne Doświadczenie Wellness dla Oczu",
    description: "The GALAXY G-one is a smart eye wellness device featuring low-frequency PEMF technology combined with multi-mode massage functions to provide a soothing experience after screen time or long days.",
    description_pl: "GALAXY G-one to inteligentne urządzenie do pielęgnacji oczu, wykorzystujące PEMF o niskiej częstotliwości z wieloma funkcjami masażu dla ukojenia po pracy przy ekranie.",
    benefits: [
      "Encourages eye-area relaxation",
      "Seven customizable care modes",
      "Six-zone airbag massage",
      "Foldable lightweight design",
      "Gentle warm compress"
    ],
    benefits_pl: [
      "Sprzyja relaksacji okolic oczu",
      "Siedem konfigurowalnych trybów",
      "Sześcio-strefowy masaż powietrzny",
      "Składana, lekka konstrukcja",
      "Delikatny ciepły kompres"
    ],
    howItWorks: "Combines pneumatic compression, intermittent vibration, and constant-temperature warmth with PEMF to soothe visual strain.",
    howItWorks_pl: "Łączy kompresję pneumatyczną, przerywane wibracje i ciepło o stałej temperaturze z PEMF, aby koić zmęczenie wzroku.",
    whoItsFor: "Students, office workers, and travelers who experience eye fatigue and seek a portable, one-button solution for daily visual comfort.",
    whoItsFor_pl: "Studenci, pracownicy biurowi i podróżni, którzy odczuwają zmęczenie oczu i szukają przenośnego rozwiązania dla codziennego komfortu.",
    science: "Low-frequency PEMF targets eye-area relaxation while pneumatic interaction supports local tissue relief and refreshing revitalization.",
    science_pl: "Niskoczęstotliwościowy PEMF koncentruje się na relaksie okolic oczu, podczas gdy interakcja pneumatyczna wspiera ulgę w tkankach.",
    image: galaxyGOneImg,
    price: "$500",
  },
  {
    id: "6",
    slug: "skyline-sl-6",
    name: "OlyLife Skyline SL-6",
    name_pl: "OlyLife Skyline SL-6",
    tagline: "SKYLINE | OlyNation | One Touch for All-Day Comfort",
    tagline_pl: "SKYLINE | OlyNation | Jeden Dotyk dla Całodziennego Komfortu",
    description: "Skyline Smart Cloud-Sense Sanitary Napkin integrates advanced breathable layers with magnetic components and far-infrared ceramic materials to promote dryness, airflow, and comfort.",
    description_pl: "Skyline Smart Cloud-Sense to inteligentne podpaski integrujące zaawansowane warstwy oddychające z komponentami magnetycznymi dla suchości i komfortu.",
    benefits: [
      "Ultra-thin absorbent core",
      "Breathable bamboo fiber surface",
      "Far-infrared & Graphene tech",
      "Magnetic induction layer",
      "Suspension fit structure"
    ],
    benefits_pl: [
      "Ultratanki rdzeń chłonny",
      "Oddychająca powierzchnia z włókna bambusowego",
      "Technologia dalekiej podczerwieni i grafenu",
      "Warstwa indukcji magnetycznej",
      "Struktura Suspension Fit"
    ],
    howItWorks: "Microporous base layers support airflow while graphene conductive framework and ceramic materials maintain material-based thermal properties for consistent comfort.",
    howItWorks_pl: "Warstwy mikroporowate wspierają przepływ powietrza, podczas gdy grafen i materiały ceramiczne utrzymują właściwości termiczne dla stałego komfortu.",
    whoItsFor: "Women seeking a technologically advanced, skin-friendly solution that prioritizes dryness, airflow, and confident support throughout the day.",
    whoItsFor_pl: "Kobiety szukające zaawansowanego technologicznie, przyjaznego dla skóry rozwiązania, które stawia na suchość i pewne wsparcie przez cały dzień.",
    science: "Magnetic induction and far-infrared technologies support local microcirculation at a material engineering level to ensure softness and adaptability.",
    science_pl: "Technologie indukcji magnetycznej i dalekiej podczerwieni wspierają lokalne mikrokrążenie na poziomie inżynierii materiałowej.",
    image: skylineSL6Img,
    price: "$500",
  },
  {
    id: "7",
    slug: "a9-bamaair",
    name: "OlyLife A9 Smart Anion BamaAir",
    name_pl: "OlyLife A9 Smart Anion BamaAir",
    tagline: "OlyNation | The Forest Like Experience",
    tagline_pl: "OlyNation | Doświadczenie Leśnej Świeżości",
    description: "A9 Smart Anion BamaAir supports a clean indoor environment through high-concentration negative ion generation and HEPA filtration to reduce common airborne particles.",
    description_pl: "A9 Smart Anion BamaAir wspiera czyste środowisko wewnętrzne dzięki wysokiemu stężeniu jonów ujemnych i filtracji HEPA.",
    benefits: [
      "High Concentration Anions (200M/cm3)",
      "HEPA Air Purification system",
      "7 Natural Light modes",
      "14 Soothing Music tracks",
      "Smart App control"
    ],
    benefits_pl: [
      "Wysokie stężenie anionów (200M/cm3)",
      "System oczyszczania powietrza HEPA",
      "7 trybów naturalnego światła",
      "14 kojących ścieżek muzycznych",
      "Inteligentne sterowanie aplikacją"
    ],
    howItWorks: "Generates high concentrations of negative ions to neutralize allergens while HEPA filtration traps dust. Features Auto, Sleep, and Anti-mosquito modes.",
    howItWorks_pl: "Generuje wysokie stężenia jonów ujemnych do neutralizacji alergenów, podczas gdy HEPA zatrzymuje kurz. Posiada tryby Auto, Sen i Anty-komar.",
    whoItsFor: "Families and professionals looking to create a forest-like atmosphere and improve air quality in homes or offices with real-time feedback.",
    whoItsFor_pl: "Rodziny i profesjonaliści chcący stworzyć leśną atmosferę i poprawić jakość powietrza z informacją o parametrach w czasie rzeczywistym.",
    science: "Anion enrichment (200M/cm3) helps clear dust and microbes, while HEPA filters remove 99.9% of particles down to 0.3 microns.",
    science_pl: "Wzbogacenie anionami pomaga oczyścić kurz, podczas gdy HEPA usuwa 99,9% cząsteczek o wielkości do 0,3 mikrona.",
    image: a9BamaAirImg,
    price: "$500",
  },
  {
    id: "8",
    slug: "h-plus-bar",
    name: "OlyLife H+ Bar",
    name_pl: "OlyLife H+ Bar",
    tagline: "OlyNation | Portable Hydrogen & MRET Hydration",
    tagline_pl: "OlyNation | Przenośne Nawodnienie Wodorem i MRET",
    description: "The H+ Bar is a portable water bottle combining hydrogen infusion technology with MRET low-frequency resonance to support a refreshing hydration experience anytime, anywhere.",
    description_pl: "H+ Bar to przenośna butelka łącząca nasycanie wodorem z rezonansem MRET dla wyjątkowego nawodnienia w dowolnym miejscu i czasie.",
    benefits: [
      "Molecular hydrogen infusion",
      "MRET Resonance Tech",
      "Dual-Chamber design",
      "Durable Waterproof design",
      "Pressure Injection Dissolution"
    ],
    benefits_pl: [
      "Nasycanie wodorem cząsteczkowym",
      "Technologia rezonansu MRET",
      "Dwu-komorowa konstrukcja",
      "Trwała, wodoodporna budowa",
      "Technologia rozpuszczania ciśnieniowego"
    ],
    howItWorks: "Uses a proton exchange membrane for stable hydrogen production and MRET low-frequency resonance technology structure molecules for better absorption.",
    howItWorks_pl: "Wykorzystuje membranę wymiany protonów dla produkcji wodoru oraz technologię MRET do strukturyzacji cząsteczek dla lepszej absorpcji.",
    whoItsFor: "Hydration-conscious individuals seeking a portable way to enjoy hydrogen-enriched water that complements a balanced, active lifestyle.",
    whoItsFor_pl: "Osoby dbające o nawodnienie, szukające przenośnego sposobu na wodę wzbogaconą wodorem, pasującą do aktywnego stylu życia.",
    science: "Molecular hydrogen acts as a selective antioxidant. MRET low-frequency resonance induces vibrations that mimic natural electromagnetic signals.",
    science_pl: "Wodór cząsteczkowy działa jako selektywny antyoksydant. Rezonans MRET indukuje wibracje naśladujące naturalne sygnały elektromagnetyczne.",
    image: hPlusBarImg,
    price: "$600",
  }
];
