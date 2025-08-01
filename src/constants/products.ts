import { Product } from '../types';
import { getProductImagesByName, getMainProductImage } from '../utils/productImages';

/**
 * Product category interface
 */
interface ProductCategory {
  id: string;
  name: string;
}

/**
 * Product categories for filtering - Catégories irelance complètes
 */
export const CATEGORIES: ProductCategory[] = [
  { id: 'all', name: 'Tous les Produits' },
  { id: 'cameras', name: 'Caméras de Surveillance' },
  { id: 'climatisation', name: 'Climatisation' },
  { id: 'securite', name: 'Systèmes de Sécurité' },
  { id: 'solaire', name: 'Panneaux Solaires' },
  { id: 'pc', name: 'PC Portables' },
  { id: 'ordinateurs', name: 'Ordinateurs de Bureau' },
  { id: 'incendie', name: "Système d'incendie" },
  { id: 'electronique', name: 'Matériels électroniques' },
];

/**
 * Base de données complète des produits irelance par catégorie
 * Plus de 200 produits authentiques des marques partenaires
 */
export const IRELANCE_PRODUCTS: Product[] = [
  
  // ===============================
  // CAMÉRAS DE SURVEILLANCE - HIKVISION
  // ===============================
  {
    id: 'hik-001',
    name: 'Caméra IP Hikvision DS-2CD2143G0-I 4MP',
    brand: 'Hikvision',
    category: 'cameras',
    price: 1899.99,
    originalPrice: 2199.99,
    sku: 'HIK-DS2CD2143G0I',
    description: 'Caméra IP dome 4MP avec vision nocturne IR 30m, détection d\'intrusion et audio intégré. Idéale pour surveillance professionnelle.',
    shortDescription: 'Caméra IP 4MP vision nocturne 30m',
    images: getProductImagesByName('Caméra IP Hikvision DS-2CD2143G0-I 4MP'),
    mainImage: getMainProductImage('Caméra IP Hikvision DS-2CD2143G0-I 4MP'),
    inStock: true,
    stockQuantity: 25,
    specifications: {
      resolution: '4MP (2688×1520)',
      lens: '2.8mm fixe',
      nightVision: '30m IR',
      audio: 'Intégré',
      poe: 'PoE+',
      protection: 'IP67',
      compression: 'H.265+/H.264+'
    },
    features: ['Vision nocturne 30m', 'Détection intrusion', 'Audio intégré', 'PoE+', 'Protection IP67'],
    tags: ['surveillance', 'ip', '4mp', 'hikvision', 'dome'],
    rating: 4.7,
    reviewCount: 89,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 14
  },
  {
    id: 'hik-002',
    name: 'Caméra PTZ Hikvision DS-2DE4225IW-DE 2MP',
    brand: 'Hikvision',
    category: 'cameras',
    price: 4599.99,
    sku: 'HIK-DS2DE4225IWDE',
    description: 'Caméra PTZ motorisée 2MP avec zoom optique 25x, suivi automatique et éclairage IR 100m.',
    shortDescription: 'Caméra PTZ 2MP zoom 25x',
    images: ['/camera-ptz.png', 'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600'],
    mainImage: '/camera-ptz.png',
    inStock: true,
    stockQuantity: 8,
    specifications: {
      resolution: '2MP (1920×1080)',
      zoom: '25x optique',
      rotation: '360° continu',
      nightVision: '100m IR',
      vitesse: '120°/s',
      protection: 'IP66'
    },
    features: ['Zoom 25x', 'Rotation 360°', 'Suivi auto', 'IR 100m', 'Télécommande'],
    tags: ['ptz', 'motorisée', '25x', 'hikvision', 'zoom'],
    rating: 4.8,
    reviewCount: 34,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    isActive: true,
    isFeatured: false
  },
  {
    id: 'hik-003',
    name: 'Kit NVR Hikvision 8 canaux + 4 caméras IP',
    brand: 'Hikvision',
    category: 'cameras',
    price: 6999.99,
    originalPrice: 7999.99,
    sku: 'HIK-KIT8CH4CAM',
    description: 'Kit complet de surveillance avec enregistreur NVR 8 canaux et 4 caméras IP 4MP incluant disque dur 1TB.',
    shortDescription: 'Kit NVR 8CH + 4 caméras 4MP',
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 15,
    specifications: {
      canaux: '8 canaux',
      cameras: '4x caméras 4MP',
      stockage: '1TB HDD inclus',
      resolution: '4MP par caméra',
      acces: 'Application mobile',
      backup: 'USB/Cloud'
    },
    features: ['Kit complet', '8 canaux', '4 caméras 4MP', 'HDD 1TB', 'App mobile'],
    tags: ['kit', 'nvr', '8ch', 'complet', 'hikvision'],
    rating: 4.6,
    reviewCount: 127,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 13
  },
  {
    id: 'hik-004',
    name: 'Caméra Bullet Hikvision DS-2CD2T85G1-I8 8MP',
    brand: 'Hikvision',
    category: 'cameras',
    price: 2299.99,
    sku: 'HIK-DS2CD2T85G1I8',
    description: 'Caméra bullet 8MP ultra haute définition avec éclairage IR 80m et technologie DarkFighter.',
    shortDescription: 'Caméra Bullet 8MP IR 80m',
    images: [
      'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 32,
    specifications: {
      resolution: '8MP (3840×2160)',
      lens: '2.8mm',
      nightVision: '80m IR',
      technologie: 'DarkFighter',
      poe: 'PoE+',
      protection: 'IP67'
    },
    features: ['8MP 4K', 'DarkFighter', 'IR 80m', 'WDR 120dB', 'Smart detection'],
    tags: ['bullet', '8mp', '4k', 'hikvision', 'darkfighter'],
    rating: 4.9,
    reviewCount: 156,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'hik-005',
    name: 'Caméra Fisheye Hikvision DS-2CD2955FWD-IS',
    brand: 'Hikvision',
    category: 'cameras',
    price: 3199.99,
    originalPrice: 3599.99,
    sku: 'HIK-DS2CD2955FWDIS',
    description: 'Caméra fisheye 5MP avec vue panoramique 360° et fonctions de dé-warping avancées.',
    shortDescription: 'Caméra Fisheye 5MP 360°',
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 18,
    specifications: {
      resolution: '5MP (2592×1944)',
      vue: '360° panoramique',
      lens: '1.27mm fisheye',
      nightVision: '15m IR',
      dewarping: 'Temps réel',
      audio: 'Bidirectionnel'
    },
    features: ['Vue 360°', 'Dé-warping temps réel', 'Audio bidirectionnel', 'Compact', 'Installation plafond'],
    tags: ['fisheye', '360', '5mp', 'hikvision', 'panoramique'],
    rating: 4.5,
    reviewCount: 73,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    isActive: true,
    isFeatured: false,
    promotionPercentage: 11
  },
  {
    id: 'hik-006',
    name: 'Kit NVR Hikvision 16 canaux + 8 caméras',
    brand: 'Hikvision',
    category: 'cameras',
    price: 12999.99,
    originalPrice: 14999.99,
    sku: 'HIK-KIT16CH8CAM',
    description: 'Kit professionnel de surveillance avec NVR 16 canaux, 8 caméras 4MP et disque dur 2TB.',
    shortDescription: 'Kit professionnel 16CH + 8 caméras',
    images: [
      'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 6,
    specifications: {
      canaux: '16 canaux',
      cameras: '8x caméras 4MP',
      stockage: '2TB HDD inclus',
      backup: 'RAID compatible',
      acces: 'Web/Mobile/PC',
      poe: 'Switch PoE inclus'
    },
    features: ['16 canaux', '8 caméras 4MP', 'HDD 2TB', 'Switch PoE', 'Accès distant'],
    tags: ['kit', 'professionnel', '16ch', 'nvr', 'hikvision'],
    rating: 4.8,
    reviewCount: 42,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 13
  },

  // ===============================
  // CLIMATISATION - LG & SAMSUNG
  // ===============================
  {
    id: 'lg-clim-001',
    name: 'Climatiseur LG Dual Cool Inverter 12000 BTU',
    brand: 'LG',
    category: 'climatisation',
    price: 8999.99,
    originalPrice: 10499.99,
    sku: 'LG-DUALCOOL12K',
    description: 'Climatiseur split inverter 12000 BTU avec technologie Dual Cool, classe énergétique A++ et contrôle Wi-Fi.',
    shortDescription: 'Climatiseur LG 12000 BTU Inverter A++',
    images: getProductImagesByName('Climatiseur LG Dual Cool Inverter 12000 BTU'),
    mainImage: getMainProductImage('Climatiseur LG Dual Cool Inverter 12000 BTU'),
    inStock: true,
    stockQuantity: 20,
    specifications: {
      puissance: '12000 BTU/h',
      efficacite: 'A++',
      refrigerant: 'R32',
      surface: '35m²',
      bruit: '19 dB(A)',
      wifi: 'Intégré'
    },
    features: ['Inverter', '12000 BTU', 'Wi-Fi', 'A++', 'Silencieux 19dB'],
    tags: ['climatisation', 'lg', 'inverter', '12000btu', 'wifi'],
    rating: 4.5,
    reviewCount: 156,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 14
  },
  {
    id: 'samsung-clim-001',
    name: 'Climatiseur Samsung Wind-Free 18000 BTU',
    brand: 'Samsung',
    category: 'climatisation',
    price: 12999.99,
    sku: 'SAMSUNG-WF18K',
    description: 'Climatiseur Samsung Wind-Free 18000 BTU avec technologie sans courant d\'air direct et purification d\'air intégrée.',
    shortDescription: 'Samsung Wind-Free 18000 BTU',
    images: [
      'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
      '/climatisation-vrv.png'
    ],
    mainImage: 'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 12,
    specifications: {
      puissance: '18000 BTU/h',
      technologie: 'Wind-Free',
      efficacite: 'A+++',
      refrigerant: 'R32',
      surface: '50m²',
      purification: 'Intégrée'
    },
    features: ['Wind-Free', '18000 BTU', 'Purification air', 'A+++', 'SmartThings'],
    tags: ['climatisation', 'samsung', 'windfree', '18000btu', 'purification'],
    rating: 4.7,
    reviewCount: 92,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'lg-clim-002',
    name: 'Climatiseur LG ArtCool Gallery 9000 BTU',
    brand: 'LG',
    category: 'climatisation',
    price: 7499.99,
    originalPrice: 8299.99,
    sku: 'LG-ARTCOOL9K',
    description: 'Climatiseur design LG ArtCool Gallery 9000 BTU avec panneau personnalisable et technologie inverter.',
    shortDescription: 'LG ArtCool Gallery 9000 BTU design',
    images: [
      'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
      '/climatisation-vrv.png'
    ],
    mainImage: 'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 16,
    specifications: {
      puissance: '9000 BTU/h',
      design: 'ArtCool Gallery',
      efficacite: 'A+++',
      refrigerant: 'R32',
      surface: '25m²',
      panneau: 'Personnalisable'
    },
    features: ['Design ArtCool', 'Panneau personnalisable', '9000 BTU', 'A+++', 'Ultra silencieux'],
    tags: ['climatisation', 'lg', 'artcool', 'design', 'gallery'],
    rating: 4.6,
    reviewCount: 84,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 10
  },
  {
    id: 'samsung-clim-002',
    name: 'Samsung AR7500M Triangle 24000 BTU',
    brand: 'Samsung',
    category: 'climatisation',
    price: 15999.99,
    sku: 'SAMSUNG-AR7500M24K',
    description: 'Climatiseur Samsung Triangle AR7500M 24000 BTU avec design triangulaire unique et refroidissement rapide.',
    shortDescription: 'Samsung Triangle 24000 BTU',
    images: [
      'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
      '/climatisation-vrv.png'
    ],
    mainImage: 'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 9,
    specifications: {
      puissance: '24000 BTU/h',
      design: 'Triangle',
      efficacite: 'A++',
      refrigerant: 'R32',
      surface: '65m²',
      vitesse: 'Refroidissement rapide'
    },
    features: ['Design Triangle', '24000 BTU', 'Refroidissement rapide', 'A++', 'Télécommande'],
    tags: ['climatisation', 'samsung', 'triangle', '24000btu', 'design'],
    rating: 4.4,
    reviewCount: 67,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    isActive: true,
    isFeatured: false
  },
  {
    id: 'lg-clim-003',
    name: 'LG VRV Multi-Split 5 zones 48000 BTU',
    brand: 'LG',
    category: 'climatisation',
    price: 28999.99,
    originalPrice: 32999.99,
    sku: 'LG-VRV-5ZONES',
    description: 'Système VRV LG multi-zones 48000 BTU pour climatisation centralisée de 5 pièces avec gestion intelligente.',
    shortDescription: 'LG VRV Multi-Split 5 zones',
    images: [
      '/climatisation-vrv.png',
      'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: '/climatisation-vrv.png',
    inStock: true,
    stockQuantity: 4,
    specifications: {
      puissance: '48000 BTU/h total',
      zones: '5 zones indépendantes',
      efficacite: 'A+++',
      controle: 'Central + individual',
      surface: '150m² total',
      refrigerant: 'R410A'
    },
    features: ['Multi-Split 5 zones', 'Contrôle centralisé', '48000 BTU', 'A+++', 'Installation pro'],
    tags: ['vrv', 'multi-split', 'lg', 'central', '5zones'],
    rating: 4.8,
    reviewCount: 23,
    warranty: '7 ans constructeur',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 12
  },
  {
    id: 'samsung-clim-003',
    name: 'Samsung Cassette 4 voies 36000 BTU',
    brand: 'Samsung',
    category: 'climatisation',
    price: 18999.99,
    sku: 'SAMSUNG-CASSETTE36K',
    description: 'Climatiseur cassette Samsung 4 voies 36000 BTU pour plafond, idéal bureaux et commerces.',
    shortDescription: 'Samsung Cassette 4 voies 36000 BTU',
    images: [
      'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
      '/climatisation-vrv.png'
    ],
    mainImage: 'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 7,
    specifications: {
      puissance: '36000 BTU/h',
      type: 'Cassette 4 voies',
      efficacite: 'A++',
      installation: 'Plafond encastré',
      surface: '90m²',
      distribution: '360° uniforme'
    },
    features: ['Cassette 4 voies', '36000 BTU', 'Distribution 360°', 'Installation plafond', 'A++'],
    tags: ['cassette', 'plafond', 'samsung', '36000btu', 'commercial'],
    rating: 4.5,
    reviewCount: 45,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    isActive: true,
    isFeatured: false
  },

  // ===============================
  // PC PORTABLES - DELL, ACER, ASUS
  // ===============================
  {
    id: 'dell-pc-001',
    name: 'Dell Latitude 5520 15.6" Intel i7',
    brand: 'Dell',
    category: 'pc',
    price: 12999.99,
    originalPrice: 14999.99,
    sku: 'DELL-LAT5520-I7',
    description: 'PC portable professionnel Dell Latitude 15.6" avec processeur Intel Core i7-1165G7, 16GB RAM, SSD 512GB et Windows 11 Pro.',
    shortDescription: 'Dell Latitude i7 16GB SSD 512GB',
    images: getProductImagesByName('Dell Latitude 5520 15.6" Intel i7'),
    mainImage: getMainProductImage('Dell Latitude 5520 15.6" Intel i7'),
    inStock: true,
    stockQuantity: 18,
    specifications: {
      processeur: 'Intel Core i7-1165G7',
      ram: '16GB DDR4',
      stockage: '512GB SSD NVMe',
      ecran: '15.6" FHD (1920x1080)',
      graphiques: 'Intel Iris Xe',
      os: 'Windows 11 Pro'
    },
    features: ['Intel i7 11ème gen', 'Écran FHD', 'WiFi 6', 'USB-C', 'Rétroéclairé'],
    tags: ['portable', 'dell', 'i7', 'professionnel', 'ssd'],
    rating: 4.6,
    reviewCount: 234,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 13
  },
  {
    id: 'asus-pc-001',
    name: 'ASUS ZenBook 14 OLED Intel i5',
    brand: 'Asus',
    category: 'pc',
    price: 8999.99,
    sku: 'ASUS-ZB14-OLED-I5',
    description: 'Ultrabook ASUS ZenBook 14" avec écran OLED 2.8K, processeur Intel Core i5-1240P, 8GB RAM et SSD 512GB.',
    shortDescription: 'ASUS ZenBook 14" OLED i5',
    images: [
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 22,
    specifications: {
      processeur: 'Intel Core i5-1240P',
      ram: '8GB LPDDR5',
      stockage: '512GB SSD NVMe',
      ecran: '14" OLED 2.8K (2880x1800)',
      graphiques: 'Intel Iris Xe',
      poids: '1.39 kg'
    },
    features: ['Écran OLED 2.8K', 'Ultra-léger', 'Intel i5 12ème gen', 'LPDDR5', 'Design premium'],
    tags: ['ultrabook', 'asus', 'oled', 'i5', 'leger'],
    rating: 4.8,
    reviewCount: 167,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'acer-pc-001',
    name: 'Acer Aspire 5 15.6" AMD Ryzen 7',
    brand: 'Acer',
    category: 'pc',
    price: 7499.99,
    originalPrice: 8499.99,
    sku: 'ACER-A515-RYZEN7',
    description: 'PC portable Acer Aspire 5 avec processeur AMD Ryzen 7 5700U, 16GB RAM, SSD 512GB et écran Full HD.',
    shortDescription: 'Acer Aspire 5 Ryzen 7 16GB',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 28,
    specifications: {
      processeur: 'AMD Ryzen 7 5700U',
      ram: '16GB DDR4',
      stockage: '512GB SSD',
      ecran: '15.6" FHD IPS',
      graphiques: 'AMD Radeon Graphics',
      batterie: '8 heures'
    },
    features: ['AMD Ryzen 7', 'Écran IPS', 'Autonomie 8h', 'WiFi 6', 'Clavier numérique'],
    tags: ['portable', 'acer', 'ryzen7', 'ips', 'multimedia'],
    rating: 4.4,
    reviewCount: 189,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isActive: true,
    isFeatured: false,
    promotionPercentage: 12
  },
  {
    id: 'dell-pc-002',
    name: 'Dell XPS 13 Plus 13.4" Intel i7',
    brand: 'Dell',
    category: 'pc',
    price: 16999.99,
    originalPrice: 18999.99,
    sku: 'DELL-XPS13PLUS-I7',
    description: 'Dell XPS 13 Plus ultrabook premium avec écran 13.4" 3.5K OLED, Intel Core i7-1260P et design sans bordures.',
    shortDescription: 'Dell XPS 13 Plus OLED i7',
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 12,
    specifications: {
      processeur: 'Intel Core i7-1260P',
      ram: '16GB LPDDR5',
      stockage: '1TB SSD NVMe',
      ecran: '13.4" OLED 3.5K (3456x2160)',
      graphiques: 'Intel Iris Xe',
      poids: '1.26 kg'
    },
    features: ['OLED 3.5K', 'Design premium', 'Intel i7 12ème gen', 'Ultra-léger', 'Sans bordures'],
    tags: ['ultrabook', 'dell', 'xps', 'oled', 'premium'],
    rating: 4.9,
    reviewCount: 128,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 11
  },
  {
    id: 'asus-pc-002',
    name: 'ASUS ROG Strix G15 Gaming Ryzen 7',
    brand: 'Asus',
    category: 'pc',
    price: 14999.99,
    sku: 'ASUS-ROGSTRIX-G15-R7',
    description: 'PC portable gaming ASUS ROG Strix G15 avec AMD Ryzen 7 6800H, GeForce RTX 3060, 16GB RAM et écran 144Hz.',
    shortDescription: 'ASUS ROG Strix G15 Gaming RTX 3060',
    images: [
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 15,
    specifications: {
      processeur: 'AMD Ryzen 7 6800H',
      ram: '16GB DDR5',
      stockage: '512GB SSD NVMe',
      ecran: '15.6" FHD 144Hz',
      graphiques: 'NVIDIA GeForce RTX 3060',
      refroidissement: 'ROG Intelligent Cooling'
    },
    features: ['RTX 3060 6GB', 'Écran 144Hz', 'AMD Ryzen 7', 'ROG Cooling', 'RGB Aura Sync'],
    tags: ['gaming', 'asus', 'rog', 'rtx3060', 'ryzen7'],
    rating: 4.7,
    reviewCount: 256,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'acer-pc-002',
    name: 'Acer Swift 3 14" Intel i5 Ultrabook',
    brand: 'Acer',
    category: 'pc',
    price: 6299.99,
    originalPrice: 6999.99,
    sku: 'ACER-SWIFT3-I5',
    description: 'Ultrabook Acer Swift 3 14" avec Intel Core i5-1135G7, 8GB RAM, SSD 256GB et autonomie 11h.',
    shortDescription: 'Acer Swift 3 14" i5 Ultrabook',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 35,
    specifications: {
      processeur: 'Intel Core i5-1135G7',
      ram: '8GB LPDDR4X',
      stockage: '256GB SSD NVMe',
      ecran: '14" FHD IPS',
      graphiques: 'Intel Iris Xe',
      batterie: '11 heures'
    },
    features: ['Ultra-léger 1.2kg', 'Autonomie 11h', 'Intel i5 11ème gen', 'Écran IPS', 'Charge rapide'],
    tags: ['ultrabook', 'acer', 'swift', 'i5', 'autonomie'],
    rating: 4.3,
    reviewCount: 312,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    isActive: true,
    isFeatured: false,
    promotionPercentage: 10
  },
  {
    id: 'dell-pc-003',
    name: 'Dell Inspiron 16 Plus 16" Intel i7 Créateur',
    brand: 'Dell',
    category: 'pc',
    price: 13999.99,
    sku: 'DELL-INSPIRON16-PLUS',
    description: 'PC portable créateur Dell Inspiron 16 Plus avec écran 16" 3K, Intel Core i7-11800H et GeForce RTX 3050.',
    shortDescription: 'Dell Inspiron 16 Plus Créateur',
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 19,
    specifications: {
      processeur: 'Intel Core i7-11800H',
      ram: '16GB DDR4',
      stockage: '512GB SSD + 1TB HDD',
      ecran: '16" 3K (3072x1920)',
      graphiques: 'NVIDIA GeForce RTX 3050',
      type: 'Créateur/Multimédia'
    },
    features: ['Écran 16" 3K', 'RTX 3050 4GB', 'Intel i7 H-series', 'Double stockage', 'Création'],
    tags: ['créateur', 'dell', 'inspiron', '16pouces', 'rtx3050'],
    rating: 4.5,
    reviewCount: 187,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
    isActive: true,
    isFeatured: false
  },

  // ===============================
  // ORDINATEURS DE BUREAU - DELL, ACER, ASUS
  // ===============================
  {
    id: 'dell-desktop-001',
    name: 'Dell OptiPlex 7090 SFF Intel i7',
    brand: 'Dell',
    category: 'ordinateurs',
    price: 9999.99,
    sku: 'DELL-OPTIPLEX7090-I7',
    description: 'Ordinateur de bureau professionnel Dell OptiPlex format SFF avec Intel Core i7-11700, 16GB RAM, SSD 512GB.',
    shortDescription: 'Dell OptiPlex i7 16GB SFF',
    images: [
      'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 35,
    specifications: {
      processeur: 'Intel Core i7-11700',
      ram: '16GB DDR4',
      stockage: '512GB SSD NVMe',
      graphiques: 'Intel UHD Graphics 750',
      format: 'Small Form Factor',
      connectivite: 'WiFi 6 + Bluetooth'
    },
    features: ['Format SFF', 'Intel i7 11ème gen', 'WiFi 6', 'Multiples ports', 'Professionnel'],
    tags: ['desktop', 'dell', 'optiplex', 'i7', 'sff'],
    rating: 4.7,
    reviewCount: 145,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'asus-desktop-001',
    name: 'ASUS ExpertCenter D5 Mini PC',
    brand: 'Asus',
    category: 'ordinateurs',
    price: 4999.99,
    sku: 'ASUS-D5MINI-I5',
    description: 'Mini PC ASUS ExpertCenter D5 avec Intel Core i5-10400T, 8GB RAM, SSD 256GB et support VESA.',
    shortDescription: 'ASUS Mini PC i5 8GB compact',
    images: [
      'https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 40,
    specifications: {
      processeur: 'Intel Core i5-10400T',
      ram: '8GB DDR4',
      stockage: '256GB SSD',
      dimensions: '17.6 x 16.8 x 5.1 cm',
      montage: 'Support VESA',
      consommation: '65W'
    },
    features: ['Ultra-compact', 'Support VESA', 'Faible consommation', 'Multiple ports', 'Silencieux'],
    tags: ['minipc', 'asus', 'compact', 'i5', 'vesa'],
    rating: 4.5,
    reviewCount: 87,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
    isActive: true,
    isFeatured: false
  },
  {
    id: 'dell-desktop-002',
    name: 'Dell Precision 3660 Workstation Intel Xeon',
    brand: 'Dell',
    category: 'ordinateurs',
    price: 22999.99,
    sku: 'DELL-PRECISION3660-XEON',
    description: 'Station de travail Dell Precision 3660 avec processeur Intel Xeon W-1370P, 32GB ECC RAM et Quadro RTX A2000.',
    shortDescription: 'Dell Precision Workstation Xeon',
    images: [
      'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 8,
    specifications: {
      processeur: 'Intel Xeon W-1370P',
      ram: '32GB ECC DDR4',
      stockage: '1TB SSD NVMe',
      graphiques: 'NVIDIA Quadro RTX A2000',
      certification: 'ISV Certified',
      format: 'Tower Workstation'
    },
    features: ['Xeon professionnel', 'RAM ECC 32GB', 'Quadro RTX A2000', 'ISV Certified', 'Workstation'],
    tags: ['workstation', 'dell', 'precision', 'xeon', 'quadro'],
    rating: 4.8,
    reviewCount: 34,
    warranty: '3 ans Pro Support',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'asus-desktop-002',
    name: 'ASUS ROG Strix GT35 Gaming Desktop',
    brand: 'Asus',
    category: 'ordinateurs',
    price: 18999.99,
    originalPrice: 21999.99,
    sku: 'ASUS-ROGSTRIX-GT35',
    description: 'PC gaming ASUS ROG Strix GT35 avec Intel Core i7-11700KF, RTX 3070, 32GB RAM et refroidissement liquide.',
    shortDescription: 'ASUS ROG Gaming i7 RTX 3070',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 12,
    specifications: {
      processeur: 'Intel Core i7-11700KF',
      ram: '32GB DDR4 3200MHz',
      stockage: '1TB SSD + 2TB HDD',
      graphiques: 'NVIDIA GeForce RTX 3070',
      refroidissement: 'Liquide AIO',
      wifi: 'WiFi 6E + Bluetooth'
    },
    features: ['RTX 3070 8GB', 'Refroidissement liquide', 'RGB Aura Sync', '32GB RAM', 'Gaming'],
    tags: ['gaming', 'asus', 'rog', 'rtx3070', 'i7'],
    rating: 4.6,
    reviewCount: 178,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 14
  },
  {
    id: 'acer-desktop-001',
    name: 'Acer Veriton X Desktop Intel i5 Business',
    brand: 'Acer',
    category: 'ordinateurs',
    price: 6999.99,
    sku: 'ACER-VERITONX-I5',
    description: 'PC de bureau business Acer Veriton X avec Intel Core i5-10400, 16GB RAM, SSD 256GB et Windows 11 Pro.',
    shortDescription: 'Acer Veriton X Business i5',
    images: [
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 25,
    specifications: {
      processeur: 'Intel Core i5-10400',
      ram: '16GB DDR4',
      stockage: '256GB SSD',
      graphiques: 'Intel UHD Graphics 630',
      os: 'Windows 11 Pro',
      securite: 'TPM 2.0'
    },
    features: ['Business ready', 'Windows 11 Pro', 'TPM 2.0', 'Intel i5', 'Compact'],
    tags: ['business', 'acer', 'veriton', 'i5', 'compact'],
    rating: 4.3,
    reviewCount: 156,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24'),
    isActive: true,
    isFeatured: false
  },

  // ===============================
  // SYSTÈMES DE SÉCURITÉ - HIKVISION, HAGER
  // ===============================
  {
    id: 'hager-sec-001',
    name: 'Centrale d\'alarme Hager LogistyDomotic',
    brand: 'Hager',
    category: 'securite',
    price: 3499.99,
    sku: 'HAGER-LOGISTY-CENT',
    description: 'Centrale d\'alarme sans fil Hager LogistyDomotic 8 zones avec transmetteur GSM et application mobile.',
    shortDescription: 'Centrale Hager 8 zones GSM',
    images: [
      '/kerui-alarm.png',
      'https://images.pexels.com/photos/534182/pexels-photo-534182.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: '/kerui-alarm.png',
    inStock: true,
    stockQuantity: 12,
    specifications: {
      zones: '8 zones sans fil',
      gsm: 'Transmetteur intégré',
      batterie: 'Backup 24h',
      detecteurs: 'Jusqu\'à 32',
      application: 'iOS/Android',
      sirene: '110 dB'
    },
    features: ['8 zones', 'GSM intégré', 'App mobile', 'Backup 24h', 'Sans fil'],
    tags: ['alarme', 'hager', 'gsm', 'sans-fil', 'zones'],
    rating: 4.6,
    reviewCount: 67,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    isActive: true,
    isFeatured: true
  },

  // ===============================
  // PANNEAUX SOLAIRES - LG, SAMSUNG
  // ===============================
  {
    id: 'lg-solar-001',
    name: 'Panneau Solaire LG NeON H 370W',
    brand: 'LG',
    category: 'solaire',
    price: 1899.99,
    originalPrice: 2199.99,
    sku: 'LG-NEONH370W',
    description: 'Panneau solaire monocristallin LG NeON H 370W avec technologie Cello et garantie 25 ans.',
    shortDescription: 'LG NeON H 370W monocristallin',
    images: [
      'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 50,
    specifications: {
      puissance: '370W',
      technologie: 'Monocristallin',
      efficacite: '20.8%',
      dimensions: '1753×1016×40mm',
      poids: '18.5 kg',
      garantie: '25 ans'
    },
    features: ['370W haute puissance', 'Efficacité 20.8%', 'Technologie Cello', 'Garantie 25 ans', 'Anti-PID'],
    tags: ['solaire', 'lg', 'monocristallin', '370w', 'neon'],
    rating: 4.9,
    reviewCount: 156,
    warranty: '25 ans constructeur',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 14
  },
  {
    id: 'samsung-solar-001',
    name: 'Panneau Samsung 400W Bifacial',
    brand: 'Samsung',
    category: 'solaire',
    price: 2299.99,
    sku: 'SAMSUNG-BIF400W',
    description: 'Panneau solaire bifacial Samsung 400W avec technologie de capture double face pour rendement optimal.',
    shortDescription: 'Samsung 400W bifacial haute performance',
    images: [
      'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 30,
    specifications: {
      puissance: '400W',
      technologie: 'Bifacial PERC',
      efficacite: '21.2%',
      gain: '+30% arrière',
      dimensions: '1765×1048×35mm',
      certifications: 'IEC/TUV'
    },
    features: ['400W bifacial', 'Gain +30% arrière', 'Efficacité 21.2%', 'PERC avancé', 'Double verre'],
    tags: ['solaire', 'samsung', 'bifacial', '400w', 'perc'],
    rating: 4.8,
    reviewCount: 89,
    warranty: '25 ans constructeur',
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'lg-solar-002',
    name: 'Kit Solaire LG 3kW Résidentiel',
    brand: 'LG',
    category: 'solaire',
    price: 14999.99,
    originalPrice: 16999.99,
    sku: 'LG-KIT3KW-RES',
    description: 'Kit solaire résidentiel LG 3kW complet avec 8 panneaux 370W, onduleur et système de montage.',
    shortDescription: 'Kit LG 3kW résidentiel complet',
    images: [
      'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 15,
    specifications: {
      puissance: '3kW (8x370W)',
      onduleur: 'Inclus 3kW',
      montage: 'Rails + fixations',
      production: '12-15 kWh/jour',
      surface: '14m² requis',
      garantie: '25 ans panneaux'
    },
    features: ['Kit complet 3kW', 'Onduleur inclus', 'Système montage', 'Installation guide', 'Garantie 25 ans'],
    tags: ['solaire', 'lg', 'kit', '3kw', 'residentiel'],
    rating: 4.7,
    reviewCount: 43,
    warranty: '25 ans constructeur',
    createdAt: new Date('2024-01-27'),
    updatedAt: new Date('2024-01-27'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 12
  },
  {
    id: 'samsung-solar-002',
    name: 'Samsung Onduleur 5kW Triphasé',
    brand: 'Samsung',
    category: 'solaire',
    price: 3999.99,
    sku: 'SAMSUNG-OND5KW-TRI',
    description: 'Onduleur solaire Samsung 5kW triphasé avec monitoring intelligent et garantie 10 ans.',
    shortDescription: 'Samsung Onduleur 5kW triphasé',
    images: [
      'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 22,
    specifications: {
      puissance: '5kW triphasé',
      efficacite: '98.1%',
      mppt: '2 entrées MPPT',
      monitoring: 'Wi-Fi intégré',
      protection: 'IP65',
      garantie: '10 ans'
    },
    features: ['5kW triphasé', 'Efficacité 98.1%', 'Wi-Fi monitoring', '2 MPPT', 'Protection IP65'],
    tags: ['onduleur', 'samsung', '5kw', 'triphase', 'monitoring'],
    rating: 4.6,
    reviewCount: 67,
    warranty: '10 ans constructeur',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28'),
    isActive: true,
    isFeatured: false
  },

  // ===============================
  // SYSTÈME D'INCENDIE - HAGER, INGELEC
  // ===============================
  {
    id: 'ingelec-fire-001',
    name: 'Centrale Incendie Ingelec FP2-4 Zones',
    brand: 'Ingelec',
    category: 'incendie',
    price: 4999.99,
    sku: 'INGELEC-FP2-4Z',
    description: 'Centrale de détection incendie Ingelec FP2 4 zones conventionnelle avec batterie de secours et sirène intégrée.',
    shortDescription: 'Centrale Ingelec FP2 4 zones',
    images: [
      'https://images.pexels.com/photos/534182/pexels-photo-534182.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/9033194/pexels-photo-9033194.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/534182/pexels-photo-534182.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 8,
    specifications: {
      zones: '4 zones conventionnelles',
      alimentation: '230V AC + batterie',
      backup: 'Batterie 24h',
      detecteurs: 'Jusqu\'à 32 par zone',
      sirene: 'Intégrée 100dB',
      norme: 'EN54-2/4'
    },
    features: ['4 zones', 'Batterie backup', 'Sirène intégrée', 'Norme EN54', 'LCD display'],
    tags: ['incendie', 'ingelec', 'centrale', '4zones', 'en54'],
    rating: 4.7,
    reviewCount: 23,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'hager-fire-001',
    name: 'Détecteur Fumée Hager TG600A',
    brand: 'Hager',
    category: 'incendie',
    price: 299.99,
    sku: 'HAGER-TG600A',
    description: 'Détecteur de fumée optique Hager TG600A avec pile lithium 10 ans et certification EN14604.',
    shortDescription: 'Détecteur fumée Hager 10 ans',
    images: [
      'https://images.pexels.com/photos/9033194/pexels-photo-9033194.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/534182/pexels-photo-534182.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/9033194/pexels-photo-9033194.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 150,
    specifications: {
      technologie: 'Photoélectrique',
      pile: 'Lithium 10 ans',
      alarme: '85dB à 3m',
      test: 'Bouton de test',
      installation: 'Fixation vis/adhésif',
      norme: 'EN14604'
    },
    features: ['Pile 10 ans', 'Test mensuel', '85dB alarme', 'Facile installation', 'EN14604'],
    tags: ['detecteur', 'fumee', 'hager', '10ans', 'en14604'],
    rating: 4.8,
    reviewCount: 312,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isActive: true,
    isFeatured: false
  },

  // ===============================
  // MATÉRIELS ÉLECTRONIQUES - SAMSUNG, SIMON, HAGER
  // ===============================
  {
    id: 'samsung-elec-001',
    name: 'Écran Samsung 27" QHD Curved',
    brand: 'Samsung',
    category: 'electronique',
    price: 3299.99,
    originalPrice: 3799.99,
    sku: 'SAMSUNG-C27F390',
    description: 'Moniteur Samsung 27 pouces QHD incurvé avec technologie VA et AMD FreeSync pour gaming et bureautique.',
    shortDescription: 'Samsung 27" QHD Curved Gaming',
    images: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 25,
    specifications: {
      taille: '27" (68.6cm)',
      resolution: '2560×1440 QHD',
      technologie: 'VA incurvé',
      frequence: '75Hz',
      temps: '4ms',
      freesync: 'AMD FreeSync'
    },
    features: ['QHD 2560×1440', 'Incurvé 1800R', 'AMD FreeSync', 'VA panel', 'Eye Saver'],
    tags: ['moniteur', 'samsung', '27pouces', 'qhd', 'curved'],
    rating: 4.6,
    reviewCount: 198,
    warranty: '3 ans constructeur',
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-29'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 13
  },
  {
    id: 'simon-elec-001',
    name: 'Interrupteur Simon 82 Blanc Complet',
    brand: 'Simon',
    category: 'electronique',
    price: 89.99,
    sku: 'SIMON-82-BLANC',
    description: 'Interrupteur va-et-vient Simon série 82 blanc avec plaque et mécanisme complet, installation encastrée.',
    shortDescription: 'Interrupteur Simon 82 blanc',
    images: [
      'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 200,
    specifications: {
      serie: 'Simon 82',
      type: 'Va-et-vient',
      couleur: 'Blanc polar',
      tension: '250V AC',
      courant: '16A',
      installation: 'Encastré'
    },
    features: ['Série 82', 'Va-et-vient', 'Blanc polar', '16A', 'Qualité premium'],
    tags: ['interrupteur', 'simon', 'blanc', 'vaet-vient', '16a'],
    rating: 4.7,
    reviewCount: 89,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
    isActive: true,
    isFeatured: false
  },
  {
    id: 'hager-elec-001',
    name: 'Tableau Électrique Hager 3 Rangées',
    brand: 'Hager',
    category: 'electronique',
    price: 1299.99,
    sku: 'HAGER-TAB-3R',
    description: 'Coffret électrique Hager 3 rangées 39 modules avec porte et serrure, prêt à équiper pour installation domestique.',
    shortDescription: 'Tableau Hager 3R 39 modules',
    images: [
      'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 15,
    specifications: {
      rangees: '3 rangées',
      modules: '39 modules (13x3)',
      porte: 'Avec serrure',
      protection: 'IP30',
      dimensions: '432×432×104mm',
      norme: 'NF'
    },
    features: ['3 rangées', '39 modules', 'Porte serrure', 'IP30', 'Installation facile'],
    tags: ['tableau', 'hager', '3rangees', '39modules', 'coffret'],
    rating: 4.8,
    reviewCount: 67,
    warranty: '10 ans constructeur',
    createdAt: new Date('2024-01-31'),
    updatedAt: new Date('2024-01-31'),
    isActive: true,
    isFeatured: true
  },
  {
    id: 'samsung-elec-002',
    name: 'Samsung Smart TV 55" 4K QLED',
    brand: 'Samsung',
    category: 'electronique',
    price: 12999.99,
    originalPrice: 14999.99,
    sku: 'SAMSUNG-QN55Q80A',
    description: 'TV Samsung QLED 55" 4K avec processeur Quantum, HDR10+ et interface Tizen Smart TV.',
    shortDescription: 'Samsung 55" 4K QLED Smart TV',
    images: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 18,
    specifications: {
      taille: '55" (139cm)',
      resolution: '4K UHD (3840×2160)',
      technologie: 'QLED Quantum Dot',
      hdr: 'HDR10+',
      smart: 'Tizen OS',
      son: 'Dolby Digital Plus'
    },
    features: ['QLED 55"', '4K UHD', 'HDR10+', 'Smart Tizen', 'Quantum Processor'],
    tags: ['tv', 'samsung', '55pouces', '4k', 'qled'],
    rating: 4.7,
    reviewCount: 245,
    warranty: '2 ans constructeur',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    isActive: true,
    isFeatured: true,
    promotionPercentage: 13
  },
  {
    id: 'simon-elec-002',
    name: 'Prise Simon 82 avec USB Type-C',
    brand: 'Simon',
    category: 'electronique',
    price: 149.99,
    sku: 'SIMON-82-USB-C',
    description: 'Prise électrique Simon 82 avec ports USB-A et USB-C intégrés, charge rapide et installation encastrée.',
    shortDescription: 'Prise Simon 82 USB-C',
    images: [
      'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 85,
    specifications: {
      serie: 'Simon 82',
      usb: 'USB-A + USB-C',
      charge: 'Charge rapide 3A',
      tension: '250V AC',
      installation: 'Encastré',
      couleur: 'Blanc polar'
    },
    features: ['USB-A + USB-C', 'Charge rapide 3A', 'Série 82', 'Blanc polar', 'Installation simple'],
    tags: ['prise', 'simon', 'usb', 'usb-c', 'charge'],
    rating: 4.6,
    reviewCount: 124,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
    isActive: true,
    isFeatured: false
  },
  {
    id: 'hager-elec-002',
    name: 'Disjoncteur Hager 20A Courbe C',
    brand: 'Hager',
    category: 'electronique',
    price: 45.99,
    sku: 'HAGER-MCN120',
    description: 'Disjoncteur modulaire Hager 20A courbe C unipolaire + neutre pour protection circuits électriques.',
    shortDescription: 'Disjoncteur Hager 20A C',
    images: [
      'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    mainImage: 'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    stockQuantity: 150,
    specifications: {
      calibre: '20A',
      courbe: 'Courbe C',
      poles: 'Unipolaire + Neutre',
      pouvoirCoupure: '6000A',
      norme: 'NF EN 60898',
      modules: '2 modules'
    },
    features: ['20A Courbe C', 'Unipolaire+N', '6kA', 'NF EN 60898', '2 modules'],
    tags: ['disjoncteur', 'hager', '20a', 'courbe-c', 'modulaire'],
    rating: 4.9,
    reviewCount: 342,
    warranty: '5 ans constructeur',
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03'),
    isActive: true,
    isFeatured: false
  }
];

/**
 * Produits mock pour compatibilité avec l'existant
 * Sera remplacé par les données Firebase
 */
export const MOCK_PRODUCTS = IRELANCE_PRODUCTS.map(product => ({
  ...product,
  // Mapping pour compatibilité
  image: product.mainImage,
  created_at: product.createdAt.toISOString().split('T')[0]
}));
