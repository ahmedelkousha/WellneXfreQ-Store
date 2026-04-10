export interface Product {
  id: string;
  slug: string;
  name: string;
  name_pl?: string;
  shortDescription?: string;
  shortDescription_pl?: string;
  features: string[];
  features_pl?: string[];
  image: string;
  gallery?: string[];
  price?: string;
  isFeatured?: boolean;
}

import vitalityWandImg from "@assets/vitality_wand.png";
import thzTeraP90PlusImg from "@assets/thz_tera-p90+.png";
import teraP90Img from "@assets/tera-p90.png";
import shakenMassagerImg from "@assets/shaken_massager.png";
import galaxyGOneImg from "@assets/galaxy_g-one.png";
import hPlusBarImg from "@assets/h+_bar.png";

export const products: Product[] = [
  {
    id: "1",
    slug: "tera-p90-plus",
    name: "OlyLife THz Tera-P90+",
    name_pl: "OlyLife THz Tera-P90+",
    isFeatured: true,
    shortDescription: "The OlyLife THz Tera-P90+ is an all-in-one wellness device combining PEMF technology with beauty and massage tools for comprehensive relaxation and rejuvenation.",
    shortDescription_pl: "OlyLife THz Tera-P90+ to wszechstronne urządzenie wellness łączące technologię PEMF z narzędziami upiększającymi i masującymi dla kompleksowego relaksu i regeneracji.",
    features: [
      "All-in-One Wellness Ecosystem: An integrated platform combining Pulsed Electromagnetic Field (PEMF), Terahertz (THz) waves, Radio Frequency (RF), and EMS for total body health.",
      "Dual-Frequency Core: Features the world’s first integrated PEMF and Terahertz technology to charge cells, activate dormant energy, and improve microcirculation.",
      "Frost Age Beauty Device: A dedicated attachment using RF and EMS to stimulate collagen, firm skin, and provide anti-aging benefits for a youthful complexion.",
      "Revitaluxe 3-in-1 Massager: Combines magnetic fusion, TENS/EMS, and Red Light Therapy to target muscle relaxation, pain relief, and scalp/hair health.",
      "Customized Intensity: Offers a 20-level intensity control system (from \"walking\" to \"sprinting\" modes) to suit individual energy perception and comfort.",
      "Deep Tissue Penetration: Delivers bio-resonance energy 3–5 cm deep to \"dredge\" meridians, remove internal \"cold and dampness,\" and support natural repair.",
      "Upgraded Ergonomics: Features an enlarged foot pedal design (up to shoe size 13/47 UK) and a wireless infrared remote for effortless operation.",
      "Comprehensive Health Support: Designed to assist with inflammation, metabolic waste removal, fat sculpting, and sleep quality improvements."
    ],
    features_pl: [
      "Ekosystem Wellness All-in-One: Zintegrowana platforma łącząca Promieniowanie Elektromagnetyczne (PEMF), fale Terahertz (THz), fale radiowe (RF) oraz EMS dla ogólnego zdrowia organizmu.",
      "Dwuczęstotliwościowy rdzeń: Pierwsza na świecie zintegrowana technologia PEMF i Terahertz ładująca komórki, aktywująca uśpioną energię i poprawiająca mikrokrążenie.",
      "Końcówka Frost Age: Przystawka wykorzystująca RF i EMS do stymulacji kolagenu, ujędrniania skóry i działania przeciwstarzeniowego dla młodego wyglądu.",
      "Masażer Revitaluxe 3-w-1: Łączy fuzję magnetyczną, TENS/EMS i Terapię Czerwonym Światłem w celu relaksacji mięśni, łagodzenia bólu oraz poprawy zdrowia skóry głowy i włosów.",
      "Dostosowana Intensywność: 20-poziomowy system kontroli intensywności (od \"spaceru\" do \"sprintu\") dostosowany do percepcji energetycznej.",
      "Głębokie Przenikanie Tkanek: Energia biorezonansowa sięgająca 3-5 cm w głąb poprawiająca naturalną regenerację organizmu.",
      "Ulepszona Ergonomia: Powiększone platformy na stopy (do rozmiaru 47) oraz bezprzewodowy pilot.",
      "Kompleksowe Wsparcie Zdrowia: Wspiera usuwanie stanów zapalnych, odpadów metabolicznych, kształtowanie sylwetki i poprawia jakość snu."
    ],
    image: thzTeraP90PlusImg,
    price: "$1,500 USD"
  },
  {
    id: "2",
    slug: "tera-p90",
    name: "OlyLife THz Tera-P90",
    name_pl: "OlyLife THz Tera-P90",
    shortDescription: "The OlyLife THz Tera-P90 boosts cellular health by combining bioelectromagnetic and terahertz energy.",
    shortDescription_pl: "OlyLife THz Tera-P90 wzmacnia zdrowie komórkowe łącząc energię bioelektromagnetyczną i terahercową.",
    features: [
      "Dual-Frequency Technology: Integrates Pulsed Electromagnetic Field (PEMF) and Terahertz-based frequency patterns for a comprehensive wellness experience.",
      "Terahertz \"Light of Life\": Utilizes a focused energy band (3−3000μm) that resonates with body molecules to improve microcirculation.",
      "Deep Penetration: Delivers energy 4–5 cm beneath the skin to enhance cellular interaction and improve tissue health.",
      "PEMF Support: Uses low-frequency signals to support relaxation, general wellness, and the body's natural balance.",
      "Revitalizing Benefits: Promotes a sense of vitality, physical comfort, and serves as a complement to daily self-care routines.",
      "User-Centric Design: Features a non-invasive, gentle, and easy-to-use interface engineered for comfort during sessions."
    ],
    features_pl: [
      "Technologia Dwuczęstotliwościowa: Integruje pulsujące pole elektromagnetyczne (PEMF) z wzorcami terahertzowymi dla kompleksowego środowiska wellness.",
      "Terahertz \"Światło Życia\": Wykorzystuje skoncentrowaną energię (3-3000μm) rezonującą z cząsteczkami w ciele poprawiającą mikrokrążenie.",
      "Głębokie Przenikanie: Dostarcza energię na 4-5 cm w głąb tkanek wspierając interakcję komórkową.",
      "Wsparcie PEMF: Niskie częstotliwości wspierają relaks oraz naturalny balans organizmu.",
      "Korzyści Ożywiające: Zwiększa poczucie witalności i ogólny komfort fizyczny w codziennych nawykach dbania o siebie.",
      "Projekt Oparty o Użytkownika: Nieinwazyjny, łagodny oraz prosty interfejs dla niesamowitego komfortu."
    ],
    image: teraP90Img,
    price: "$1,000 USD"
  },
  {
    id: "3",
    slug: "galaxy-g-one",
    name: "OlyLife Galaxy G-One",
    name_pl: "OlyLife Galaxy G-One",
    shortDescription: "The GALAXY G-one is a foldable smart eye massager with PEMF technology, offering 7 eye care modes, 4 technologies, and easy one-button control for on-the-go comfort.",
    shortDescription_pl: "GALAXY G-one to składany inteligentny masażer oczu z technologią PEMF, oferujący 7 trybów pielęgnacji oczu, 4 technologie i proste sterowanie jednym przyciskiem dla komfortu w podróży.",
    features: [
      "Smart Eye Wellness: A dedicated device designed to support relaxation and visual comfort around the eye area.",
      "Low-Frequency PEMF: Features core pulsed electromagnetic field technology to support general wellness and relaxation.",
      "Multi-Mode Massage: Includes six-zone airbag and intermittent vibration massage functions for a soothing experience.",
      "Warm Compress Technology: Provides a gentle, constant-temperature warm compress to enhance the calming effect.",
      "Customizable Care: Offers 7 care modes, allowing users to combine massage, vibration, and warmth for a tailored session.",
      "Portable & User-Friendly: Features a lightweight, foldable design with simple one-button operation for use anywhere.",
      "Restorative Benefits: Encourages a refreshed, well-rested appearance and provides relief after long periods of screen time."
    ],
    features_pl: [
      "Inteligentne Wellness Oczu: Dedykowane urządzenie do wsparcia relaksu i komfortu w okolicach oczu.",
      "Niskoczęstotliwościowy PEMF: Wbudowane pulsujące pole elektromagnetyczne dla ogólnego wsparcia zdrowia i relaksacji.",
      "Masaż Wielotrybowy: Posiada 6-strefowe poduszki powietrzne i pulsujące wibracje.",
      "Technologia Ciepłego Kompresu: Delikatny kompres ze stałą temperaturą poprawiającą efekt ukojenia.",
      "Indywidualna Troska: Oferuje 7 trybów pielęgnacji, aby umożliwić użytkownikom kombinację masażu, wibracji i ciepła.",
      "Przenośność & Funkcjonalność: Lekka i łatwo składana konstrukcja kontrolowana jednym guzikiem z dowolnego miejsca.",
      "Korzyści Odtwórcze: Zapewnia odświeżenie oraz rześki wygląd wraz z olbrzymią ulgą w zmęczeniu przy ekranie komputera."
    ],
    image: galaxyGOneImg,
    price: "$500 USD"
  },
  {
    id: "4",
    slug: "shaken-massager",
    name: "OlyLife Shaken Massager",
    name_pl: "Masażer Shaken",
    shortDescription: "The Shaken Massager targets stubborn belly fat using 7-in-1 technology including PEMF, ultrasound, and heat therapy to shape the waist and support core health.",
    shortDescription_pl: "Masażer Shaken celuje w uporczywą tkankę tłuszczową brzucha, wykorzystując technologię 7-w-1, w tym PEMF, ultradźwięki i terapię ciepłem, aby rzeźbić talię i wspierać zdrowie korpusu.",
    features: [
      "7-in-1 Advanced Technology: A powerhouse device combining PEMF, Ultrasound, RF (Radio Frequency), EMS, Vibration, Heat Therapy, and Red Light Therapy.",
      "Targeted Fat Reduction: Features CellBreak™ technology using ultrasound sound waves (acoustic cavitation) to help mobilize and break down stubborn fat cells.",
      "Deep Cellular Wellness: Utilizes ultra-low frequency PEMF to support microcirculation and healthy organ function up to 20cm deep.",
      "Skin Firming & Anti-Aging: Employs RF technology and Red Light Therapy to stimulate collagen, improve skin texture, and reduce the appearance of stretch marks.",
      "Effortless Core Engagement: Uses high-frequency vibration and dynamic massage to stimulate muscles, mimicking the effects of a core workout and enhancing lymphatic flow.",
      "AI Adaptive Control: Includes a smart AI system that tracks heart rate, SpO₂, and body temperature to auto-adjust intensity for a personalized session.",
      "Smartwatch Integration: Features a dedicated smartwatch to easily switch between modes and monitor real-time health data.",
      "Ergonomic Design: Crafted from soft, hypoallergenic silicone with an adjustable fit (24 to 55 inches) for comfortable use while sitting or moving."
    ],
    features_pl: [
      "Zaawansowana Technologia 7 w 1: Urządzenie łączące PEMF, Ultradźwięki, RF (fale radiowe), EMS, Wibracje, Ciepło i Terapie Czerwonym Światłem.",
      "Celowa Utrata Tkanki Tłuszczowej: Wykorzystuje kawitację akustyczną przy pomocy CellBreak™, aby pomóc rzezbić najcięższe warstwy tłuszczowe.",
      "Głębokie Wellness Komórkowe: Ultraniska częstotliwość wpływa zbawiennie do 20cm do najważniejszych organów.",
      "Ujędrnianie Skóry & Anti-Aging: Tworzy nowy kolagen i redukuje powstawanie rozstępów dzięki falom RF oraz czerwonym led.",
      "Wsparcie Środka Ciała: Imituje ćwiczenia wzmacniające przy pomocy wstrząsów o dużej częstotliwości oraz przyśpiesza odprowadzanie limfy.",
      "Wbudowany System AI: Automatycznie dobiera intensywność dzięki czytnikowi tętna, sprawdzając temperaturę i nasycenie tlenu w krwi.",
      "Integracja Ze Smartwatchem: Posiada dedykowany zegarek dla wygodniejszej modyfikacji zdrowia rzut oka od nadgarstka.",
      "Ergonomiczny Projekt: Wykonano go z delikatnego i antyalergicznego tworzywa potrafiącego objąć pas nawet do 140 centymetrów w obwodzie."
    ],
    image: shakenMassagerImg,
    price: "$1,000 USD"
  },
  {
    id: "5",
    slug: "vitality-wand",
    name: "OlyLife Vitality Wand",
    name_pl: "Witalna Różdżka OlyLife",
    shortDescription: "The Vitality Wand uses ultra-long and biological energy waves with adjustable heat and airflow for a hands-free, fatigue-relieving experience.",
    shortDescription_pl: "Witalna Różdżka wykorzystuje ultra-długie i biologiczne fale energii z regulowanym ciepłem i przepływem powietrza dla relaksującego doświadczenia bez użycia rąk.",
    features: [
      "Core Frequency Technology: Utilizes ultra-long wave frequency (PEMF) and Terahertz waves (1 THz) to provide a deep-penetrating wellness experience.",
      "Triple-Action Support: Combines frequency-based technology with gentle warmth and air pressure massage to enhance physical comfort.",
      "Circulation & Detox: Specifically designed to support healthy microcirculation, assist in detoxification, and help remove \"cold and dampness\" from the body.",
      "Meridian Care: Engineered to help \"dredge\" meridians, promoting a smoother flow of energy throughout the body's natural pathways.",
      "Thermal Relief: Features thermal energy transfer to help alleviate muscle tension, reduce inflammation, and increase tissue flexibility.",
      "Intuitive Air Massage: Employs controlled airflow to apply uniform and consistent pressure, ensuring a hygienic and flexible massage technique.",
      "Personalized Comfort: Offers adjustable temperature settings and a simple one-click operation for a customized and convenient user experience.",
      "Hands-Free Ease: Includes an intelligent stand that allows for hands-free use during self-care sessions."
    ],
    features_pl: [
      "Technologia Fal Głównych: Ultra-długie częstotliwości PEMF oraz 1 THz fali w celu głęboko przenikającej fali wsparcia organizmu.",
      "Trójakcyjne Wsparcie: Łączy fale rezonujące z delikatnym ciepłem, i uciskiem zwiększając relaksujące poczucie.",
      "Krążenie & Detoks: Powstała, aby pomagać przepływowi mikrokrążenia i usuwania toksyn a w głównej mierze wyciągać z organizmu zimno po chińsku zwanym stasis.",
      "Pielęgnacja Meridian: Pomaga rozpuścić zapchane pory organizmu na poziomie fizycznym jak i energetycznym.",
      "Termiczna Ulga: Transmisja energii cieplnej by odciążyć ból, zahamować powstawanie zapaleń i nadać mięśniom lepszej giętkości.",
      "Powietrzny Masaż: Osiąga wyjątkowy powiew dbając o najwyższe wymogi elastycznej a zarazem higienicznej aplikacji bez kontaktu bezpośredniego.",
      "Wygoda i Regulacja: Wykorzystaj proste ustawienie jednym ruchem w celu kontroli temperatury dla personalizacji doświadczeń.",
      "Obsługa Wolne Ręce: Nowoczesna inteligentna nóżka w komplecie umożliwi wsparcie na siebie samego."
    ],
    image: vitalityWandImg,
    price: "$600 USD"
  },
  {
    id: "6",
    slug: "h-plus-bar",
    name: "OlyLife H+ Bar",
    name_pl: "OlyLife H+ Bar",
    shortDescription: "The H+ Bar is a portable water bottle that produces antioxidant-rich hydrogen water and enhances absorption with MRET low-frequency resonance technology.",
    shortDescription_pl: "H+ Bar to przenośna butelka wytwarzająca bogatą w antyoksydanty wodę wodorową i zwiększająca wchłanianie dzięki technologii rezonansu niskiej częstotliwości MRET.",
    features: [
      "Dual-Function Wellness: Combines advanced molecular hydrogen infusion with MRET (Molecular Resonance Effect Technology) to transform ordinary water into a \"powerhouse\" for health.",
      "MRET Low-Frequency Resonance: Restructures water molecules from a clustered arrangement into a linear structure, significantly enhancing cellular absorption and bioavailability.",
      "Selective Antioxidant Power: Infuses water with dissolved molecular hydrogen (H₂) to neutralize harmful free radicals while protecting beneficial cellular processes.",
      "Deep Cellular Hydration: Small structured water clusters pass through aquaporins (cell gates) more efficiently, providing faster and deeper hydration than standard water.",
      "Energy & Recovery: Supports mitochondrial function to reduce cellular fatigue and helps athletes accelerate recovery by reducing lactic acid buildup.",
      "Anti-Aging & Skin Support: Promotes healthier-looking skin and protects DNA/proteins from oxidative stress linked to aging and chronic conditions.",
      "Dual-Chamber Design: Features a professional-grade proton exchange membrane (Dry Membrane) and pressure injection technology to ensure high-concentration hydrogen with zero pollution.",
      "Portable & Durable: Heat-resistant, non-slip, and waterproof design—safe for all types of beverages and easy to use anywhere."
    ],
    features_pl: [
      "Podwójna Funkcja Detoksykująca: Połączenie wodoru na poziomie molekularnym i rezonansu MRET dla transformacji tradycyjnego płynu w pełne zasilanie dla komórek.",
      "Rezonans Niskiej Częstotliwości MRET: Ujednolica molekuły wody i nadaje mu naturalną, unikalną jakość pomagając docierać i nawilżać ciało dogłębniej.",
      "Selektywna Siła Antyoksydantów: Rozpuszczony wodór w butelce chroni nasze środowisko wewnętrzne eliminując złe, trujące substancje i dbając by proces w nich był bez skazy.",
      "Głęboka Hydracja Komórek: Malutka woda przedostaje się niesłychanie prędko gwarantując pełniejsze ugaszenie pragnienia, ze względu że wodór bez trudu nasyca puste wejścia aquaporyny.",
      "Energia & Odpoczynek: Rozbudzone mitochondrium tworzy rzadszą przerwę wspierając odpoczynek dla osób sportu, zatrzymujące w rezultacie budowę nadciągłego kwasu mrówkowego.",
      "Redukacja Zmian Starzenia: Poprawiony stan ochrony skóry nie strasząc destruktywnej zmiany w postaci DNA/protein powodowanej ciągłym przewrażliwieniem powiązanym z objawieniem chronicznym.",
      "Konstrukcja Dwukomorowa: System wymiany bez strachu w wciągnięcie nieczystości podczas odpalenia procesów technologii wytwarzającej i cięgnącej niesłychanie skoncentrowane cząstki H2.",
      "Kompaktowa jakość OlyLife: Najwyższej próby i niezwykle gęste formy, bez ryzyka przepalenia oraz nieścieralna i gotowa by bez oporu być wszędzie wykorzystana w pełnym tego słowa znaczeniu."
    ],
    image: hPlusBarImg,
    price: "$600 USD"
  }
];
