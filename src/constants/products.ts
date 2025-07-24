import { Product } from '../types';

/**
 * Product category interface
 */
interface ProductCategory {
  id: string;
  name: string;
}

/**
 * Product categories for filtering
 */
export const CATEGORIES: ProductCategory[] = [
  { id: 'all', name: 'Tous les Produits' },
  { id: 'cameras', name: 'Caméras de Surveillance' },
  { id: 'climatisation', name: 'Climatisation' },
  { id: 'securite', name: 'Systèmes de Sécurité' },
  { id: 'solaire', name: 'Panneaux Solaires' },
  { id: 'pc', name: 'PC Portables' },
  { id: 'incendie', name: "Système d'incendie" },
  { id: 'electronique', name: 'Matériels électroniques' },
];

/**
 * Mock products data for development and demonstration
 * In production, this would be replaced with API calls to a database
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Caméra IP 4K Ultra HD',
    description: 'Caméra de surveillance IP 4K avec vision nocturne et détection de mouvement',
    price: 2500,
    category: 'cameras',
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: ['4K Ultra HD', 'Vision nocturne', 'Détection mouvement', 'Étanche IP67'],
    inStock: true,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    name: 'Climatiseur Inverter 18000 BTU',
    description: 'Climatiseur inverter économique avec télécommande et minuterie',
    price: 8500,
    category: 'climatisation',
    image: '/climatisation-vrv.png',
    features: ['Inverter', '18000 BTU', 'Économique', 'Télécommande'],
    inStock: true,
    created_at: '2024-01-02',
  },
  {
    id: '3',
    name: 'Panneau Solaire 300W Monocristallin',
    description: 'Panneau solaire haute efficacité pour installations résidentielles',
    price: 1200,
    category: 'solaire',
    image: 'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: ['300W', 'Monocristallin', 'Haute efficacité', '25 ans garantie'],
    inStock: true,
    created_at: '2024-01-03',
  },
  {
    id: '4',
    name: "Système d'Alarme Sans Fil",
    description: "Kit d'alarme complet avec détecteurs et sirène",
    price: 3200,
    category: 'securite',
    image: '/kerui-alarm.png',
    features: ['Sans fil', 'Kit complet', 'Application mobile', 'Sirène 120dB'],
    inStock: true,
    created_at: '2024-01-04',
  },
  {
    id: '5',
    name: 'Caméra Dôme PTZ',
    description: 'Caméra dôme motorisée avec zoom optique 20x',
    price: 4500,
    category: 'cameras',
    image: '/camera-ptz.png',
    features: ['PTZ motorisé', 'Zoom 20x', 'Suivi automatique', 'Résistant aux intempéries'],
    inStock: false,
    created_at: '2024-01-05',
  },
  {
    id: '6',
    name: 'Climatiseur Central VRV',
    description: 'Système de climatisation central pour grands espaces',
    price: 25000,
    category: 'climatisation',
    image: '/climatisation-vrv.png',
    features: ['VRV', 'Multi-zones', 'Haute capacité', 'Contrôle centralisé'],
    inStock: true,
    created_at: '2024-01-06',
  },
];
