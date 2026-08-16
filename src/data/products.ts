export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  franchise: 'marvel' | 'anime';
  category: 
    | 'figurines'
    | 'posters'
    | 'keychains-metal'
    | 'keychains-rubber'
    | 'car-accessories'
    | 'pins'
    | 'pocket-pops'
    | 'spinners'
    | 'stickers'
    | 'phone-pins';
  tag?: 'HOT' | 'NEW' | 'LIMITED' | 'BESTSELLER' | 'POP-UP FAV';
  description: string;
  details: string[];
  inStock: boolean;
  image: string;
  highlightCategory?: string;
  isFeatured?: boolean;
}

export const CATEGORIES = [
  { id: 'all', label: 'ALL PRODUCTS' },
  { id: 'figurines', label: 'ACTION FIGURES & STATUES' },
  { id: 'keychains-metal', label: 'METAL KEYCHAINS' },
  { id: 'keychains-rubber', label: '3D SILICONE KEYCHAINS' },
  { id: 'stickers', label: 'STICKER PACKS' },
];

export const INSTAGRAM_HIGHLIGHTS = [
  { id: 'figurines', label: 'figurines', color: 'bg-[#ff2244] text-white' },
  { id: 'keychains-metal', label: 'keychains', color: 'bg-[#ffee00] text-black' },
  { id: 'rubber', label: 'Rubber', color: 'bg-[#ff007f] text-white' },
  { id: 'stickers', label: 'Stickers', color: 'bg-[#00cc66] text-black' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- MARVEL PRODUCTS ---
  {
    id: 'marvel-fig-01',
    name: 'Iron Man Mark 46 Poseable Action Figure',
    subtitle: 'Includes Swappable Tony Stark Head & Repulsor Blast FX',
    price: 49.99,
    originalPrice: 65.00,
    rating: 5.0,
    reviewsCount: 184,
    franchise: 'marvel',
    category: 'figurines',
    tag: 'HOT',
    description: 'High-articulation Iron Man Mark 46 action figure with interchangeable Tony Stark head sculpt, alternative fists, and dual blue repulsor blast effect parts.',
    details: [
      'Authentic MCU Paint Details',
      'Swap-on Tony Stark Portrait Head',
      '2x Repulsor Blast FX Accessories',
      'Alternative Fists Included',
      'Official Hasbro Marvel Legends Series'
    ],
    inStock: true,
    image: '/products/ironman_figure.png',
    highlightCategory: 'figurines',
    isFeatured: true,
  },
  {
    id: 'marvel-rub-01',
    name: 'Deadpool & Wolverine 3D Rubber Keychain Pair',
    subtitle: '3D Soft Silicone Characters with Marvel Wrist Straps',
    price: 14.99,
    originalPrice: 20.00,
    rating: 5.0,
    reviewsCount: 290,
    franchise: 'marvel',
    category: 'keychains-rubber',
    tag: 'BESTSELLER',
    description: '3D molded flexible silicone keychains featuring Deadpool with dual katanas and Wolverine in classic yellow suit with claws.',
    details: [
      'Includes Both Deadpool & Wolverine Keychains',
      'Flexible Soft-Touch Silicone Material',
      'Includes Red & Yellow Marvel Wrist Straps',
      'Unbreakable Gold Alloy Ring & Clasp'
    ],
    inStock: true,
    image: '/products/deadpool_wolverine_keychains.png',
    highlightCategory: 'rubber',
    isFeatured: true,
  },
  {
    id: 'marvel-fig-02',
    name: 'Captain America Endgame Action Figure',
    subtitle: 'Dynamic Combat Pose with Vibranium Shield',
    price: 44.99,
    originalPrice: 55.00,
    rating: 4.9,
    reviewsCount: 142,
    franchise: 'marvel',
    category: 'figurines',
    tag: 'BESTSELLER',
    description: 'Highly detailed Captain America action figure featuring suit texture detailing and iconic circular Vibranium shield.',
    details: [
      'Movie-Accurate Avengers Suit',
      'Signature Vibranium Shield',
      'Multiple Points of Articulation',
      'Lebanon Stock Available'
    ],
    inStock: true,
    image: '/products/captain_america.png',
    highlightCategory: 'figurines',
  },
  {
    id: 'marvel-fig-03',
    name: 'Ms. Marvel Kamala Khan Suit Figure',
    subtitle: 'The Marvels / MCU Costume Collectible',
    price: 39.99,
    rating: 4.8,
    reviewsCount: 96,
    franchise: 'marvel',
    category: 'figurines',
    tag: 'NEW',
    description: 'Official Ms. Marvel Kamala Khan action figure featuring her vibrant hero suit, scarf, and wrist bangle accents.',
    details: [
      'Detailed MCU Hero Costume',
      'Kamala Bangle Accent Details',
      'Display Ready Box'
    ],
    inStock: true,
    image: '/products/ms_marvel.png',
    highlightCategory: 'figurines',
  },
  {
    id: 'marvel-key-01',
    name: 'Avengers Logo Heavy Metal Keychain',
    subtitle: 'Die-cast Polished Chrome Finish',
    price: 12.99,
    originalPrice: 16.00,
    rating: 5.0,
    reviewsCount: 310,
    franchise: 'marvel',
    category: 'keychains-metal',
    tag: 'POP-UP FAV',
    description: 'Solid metal Avengers "A" logo keychain with heavy-duty keyring and mirror chrome finish.',
    details: [
      '100% Solid Metal Alloy',
      'Polished Chrome Finish',
      'Unbreakable Heavy Keyring',
      'Popular Pop-Up Vendor Item'
    ],
    inStock: true,
    image: '/products/avengers_keychain.png',
    highlightCategory: 'keychains-metal',
  },
  {
    id: 'marvel-key-02',
    name: 'Classic Marvel Logo Red Enamel Keychain',
    subtitle: 'Heavy Metal Rectangular Badge Keyring',
    price: 11.99,
    rating: 4.9,
    reviewsCount: 275,
    franchise: 'marvel',
    category: 'keychains-metal',
    tag: 'HOT',
    description: 'Iconic red enamel Marvel logo keyring with embossed metallic silver lettering.',
    details: [
      'Classic Red Enamel Inlay',
      'Embossed Metal Border & Text',
      'Durable Pocket Size'
    ],
    inStock: true,
    image: '/products/marvel_keychain.png',
    highlightCategory: 'keychains-metal',
  },
  {
    id: 'marvel-stk-01',
    name: 'Marvel Avengers Classic Die-Cut Sticker Pack (50 Pcs)',
    subtitle: 'Waterproof Laptop & Helmet Vinyl Stickers',
    price: 8.99,
    rating: 5.0,
    reviewsCount: 420,
    franchise: 'marvel',
    category: 'stickers',
    tag: 'HOT',
    description: '50 unique waterproof vinyl stickers featuring classic Avengers, Hulk, Iron Man, Thor, Loki, Doctor Strange & Red Skull.',
    details: [
      '50 Unique No-Duplicate Stickers',
      'Waterproof PVC Vinyl Material',
      'Sun-Proof Vivid Color Print',
      'Perfect for Laptops, Flasks & Cases'
    ],
    inStock: true,
    image: '/products/avengers_stickers.png',
    highlightCategory: 'stickers',
  },
  {
    id: 'marvel-stk-02',
    name: 'Marvel Heroes Minimalist Art Sticker Pack (50 Pcs)',
    subtitle: 'Clean Minimalist Vector Art Stickers',
    price: 8.99,
    rating: 4.9,
    reviewsCount: 350,
    franchise: 'marvel',
    category: 'stickers',
    tag: 'NEW',
    description: '50 minimalist vector art stickers featuring Wolverine cowl, Iron Man mask, Deadpool head, Cyclops, and Gauntlet.',
    details: [
      '50 Minimalist Art Designs',
      'Matte Finish Vinyl Material',
      'Scratch-Resistant Coating'
    ],
    inStock: true,
    image: '/products/minimalist_stickers.jpg',
    highlightCategory: 'stickers',
  },

  // --- ANIME PRODUCTS ---
  {
    id: 'anime-fig-01',
    name: 'Monkey D. Luffy Wano Captain Resin Statue',
    subtitle: 'One Piece / Includes Swappable Head & Straw Hat',
    price: 89.99,
    originalPrice: 110.00,
    rating: 5.0,
    reviewsCount: 240,
    franchise: 'anime',
    category: 'figurines',
    tag: 'HOT',
    description: 'Masterpiece Wano arc Monkey D. Luffy captain statue with removable straw hat, flame aura base, and swappable portrait head.',
    details: [
      'Hand-Painted Premium PVC/Resin',
      'Swappable Portrait Head Bust',
      'Removable Straw Hat Accessory',
      'Translucent Flame Effect Base'
    ],
    inStock: true,
    image: '/products/luffy_wano_statue.png',
    highlightCategory: 'figurines',
    isFeatured: true,
  },
  {
    id: 'anime-fig-02',
    name: 'Roronoa Zoro Enma Purple Haki 3-Sword Statue',
    subtitle: 'One Piece / Wano Country 3-Sword Slash Pose',
    price: 84.99,
    originalPrice: 105.00,
    rating: 5.0,
    reviewsCount: 310,
    franchise: 'anime',
    category: 'figurines',
    tag: 'BESTSELLER',
    description: 'Dynamic Roronoa Zoro statue unleashing 3-sword style with purple Enma Haki aura FX around Katana blades.',
    details: [
      '3x Detailed Katana Blades',
      'Translucent Purple Haki Aura FX',
      'Stone Kanji Battle Base',
      'Heavyweight Display Box'
    ],
    inStock: true,
    image: '/products/zoro_haki_statue.png',
    highlightCategory: 'figurines',
    isFeatured: true,
  },
  {
    id: 'anime-rub-01',
    name: 'One Piece Straw Hat Crew 3D Rubber Keychain Collection',
    subtitle: '3D Silicone Luffy, Zoro, Law, Sabo & Chopper Keyrings',
    price: 14.99,
    originalPrice: 18.00,
    rating: 5.0,
    reviewsCount: 380,
    franchise: 'anime',
    category: 'keychains-rubber',
    tag: 'BESTSELLER',
    description: '3D molded flexible silicone keychains featuring Luffy, Zoro, Law, Sabo, Ace, Usopp and Chopper with braided wrist straps.',
    details: [
      '3D Molded Character Sculpt',
      'Soft-Touch Flexible Silicone',
      'Includes Braided Color Wrist Straps',
      'Gold Clasp & Ring'
    ],
    inStock: true,
    image: '/products/onepiece_crew_keychains.png',
    highlightCategory: 'rubber',
    isFeatured: true,
  },
  {
    id: 'anime-fig-03',
    name: 'Itachi Uchiha Crow Flame Masterpiece Statue',
    subtitle: 'Naruto Shippuden / Mangekyo Sharingan Akatsuki Cloak',
    price: 79.99,
    rating: 4.9,
    reviewsCount: 195,
    franchise: 'anime',
    category: 'figurines',
    tag: 'POP-UP FAV',
    description: 'Itachi Uchiha with glowing Mangekyo Sharingan eyes, Akatsuki cloud cloak, and surrounding dark crow flame base.',
    details: [
      'Multiple Swirling Crow Effect Parts',
      'Akatsuki Red Cloud Fabric Detail',
      'Collector Display Base'
    ],
    inStock: true,
    image: '/products/itachi_statue.png',
    highlightCategory: 'figurines',
  },
  {
    id: 'anime-rub-02',
    name: 'Madara Uchiha Reanimation 3D Silicone Rubber Keychain',
    subtitle: 'Naruto Shippuden / Sharingan Eye & Red Armor',
    price: 11.99,
    rating: 4.9,
    reviewsCount: 210,
    franchise: 'anime',
    category: 'keychains-rubber',
    tag: 'NEW',
    description: '3D silicone Madara Uchiha keychain with Sharingan eye detail, red samurai armor, and Leaf Village wrist strap.',
    details: [
      '3D Molded Madara Character',
      'Naruto Leaf Village Wrist Strap',
      'Durable Soft Silicone'
    ],
    inStock: true,
    image: '/products/madara_keychain.png',
    highlightCategory: 'rubber',
  },
  {
    id: 'anime-key-01',
    name: 'Vocaloid Hatsune Miku Chibi Acrylic Keychain Collection',
    subtitle: 'Chibi Hatsune Miku, Kagamine Rin & Len Acrylic Keyrings',
    price: 9.99,
    rating: 4.8,
    reviewsCount: 175,
    franchise: 'anime',
    category: 'keychains-metal',
    tag: 'POP-UP FAV',
    description: 'Ultra-clear acrylic chibi keychains of Hatsune Miku, Rin, Len, Luka and MEIKO with musical note accents.',
    details: [
      'High Quality Double-Sided Acrylic',
      'Scratchproof Protective Film',
      'Silver Lobster Swivel Clasp'
    ],
    inStock: true,
    image: '/products/miku_acrylic_keychains.jpg',
    highlightCategory: 'keychains-metal',
  },
  {
    id: 'anime-stk-03',
    name: 'Anime Mega Character Die-Cut Sticker Pack (50 Pcs)',
    subtitle: 'Kakashi, Luffy, Naruto, Sasuke, Death Note & Demon Slayer',
    price: 8.99,
    rating: 5.0,
    reviewsCount: 490,
    franchise: 'anime',
    category: 'stickers',
    tag: 'HOT',
    description: '50 mega anime stickers featuring Kakashi, Luffy, Naruto, Sasuke, Sharingan, Death Note Ryuk, Demon Slayer, and Itachi.',
    details: [
      '50 Unique High-Quality Vinyl Stickers',
      'Waterproof & Sunproof Material',
      'Great for Laptops & Cases'
    ],
    inStock: true,
    image: '/products/anime_mega_stickers.jpg',
    highlightCategory: 'stickers',
  },
  {
    id: 'anime-stk-01',
    name: 'Naruto Shippuden Chibi Die-Cut Sticker Pack (50 Pcs)',
    subtitle: 'Waterproof Naruto, Kakashi, Sasuke & Akatsuki Stickers',
    price: 8.99,
    rating: 5.0,
    reviewsCount: 520,
    franchise: 'anime',
    category: 'stickers',
    tag: 'HOT',
    description: '50 unique chibi anime stickers featuring Naruto eating ramen, Kakashi, Sasuke, Sakura, Hinata, Pain, and Itachi.',
    details: [
      '50 Unique Chibi Naruto Designs',
      '100% Vinyl PVC Waterproof',
      'Vivid High Resolution Print'
    ],
    inStock: true,
    image: '/products/naruto_stickers.jpg',
    highlightCategory: 'stickers',
  },
  {
    id: 'anime-stk-02',
    name: 'Anime Mix Universe Vinyl Sticker Pack (50 Pcs)',
    subtitle: 'Jujutsu Kaisen, Death Note, Tokyo Ghoul & AOT',
    price: 8.99,
    rating: 4.9,
    reviewsCount: 410,
    franchise: 'anime',
    category: 'stickers',
    tag: 'NEW',
    description: '50 black & red anime aesthetic stickers featuring Gojo, Death Note L, Kaneki Tokyo Ghoul, Demon Slayer, and Attack on Titan.',
    details: [
      '50 Anime Multi-Universe Stickers',
      'Black & Red Manga Art Style',
      'Scratch & Sun Protection Finish'
    ],
    inStock: true,
    image: '/products/animemix_stickers.png',
    highlightCategory: 'stickers',
  },
];
