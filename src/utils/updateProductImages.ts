// ===================================================
// SCRIPT DE MISE À JOUR DES IMAGES PRODUITS
// ===================================================
// Met à jour automatiquement toutes les images du catalogue avec des images Unsplash professionnelles

import { getProductImagesByName, getMainProductImage } from './productImages';

/**
 * Script pour mettre à jour les images dans le fichier products.ts
 * Génère le code avec les nouvelles images pour chaque produit
 */

// Liste des produits avec leurs nouveaux mappings d'images (non utilisée)

/**
 * Génère le code de mise à jour pour un produit
 */
const generateProductImageUpdate = (productName: string) => {
  const images = getProductImagesByName(productName);
  const mainImage = getMainProductImage(productName);
  
  return {
    productName,
    newImages: images,
    newMainImage: mainImage,
    generatedCode: `
    images: getProductImagesByName('${productName}'),
    mainImage: getMainProductImage('${productName}'),`
  };
};

/**
 * Affiche toutes les mises à jour nécessaires
 */
export const showImageUpdates = () => {
  console.log('🖼️ ===== MISES À JOUR D\'IMAGES PRODUITS =====\n');
  
  // Tous les noms de produits du catalogue
  const allProductNames = [
    // Caméras
    'Caméra IP Hikvision DS-2CD2143G0-I 4MP',
    'Caméra PTZ Hikvision DS-2DE4225IW-DE 2MP',
    'Kit NVR Hikvision 8 canaux + 4 caméras IP',
    'Caméra Bullet Hikvision DS-2CD2T85G1-I8 8MP',
    'Caméra Fisheye Hikvision DS-2CD2955FWD-IS',
    'Kit NVR Hikvision 16 canaux + 8 caméras',
    
    // Climatisation
    'Climatiseur LG Dual Cool Inverter 12000 BTU',
    'Climatiseur Samsung Wind-Free 18000 BTU',
    'Climatiseur LG ArtCool Gallery 9000 BTU',
    'Samsung AR7500M Triangle 24000 BTU',
    'LG VRV Multi-Split 5 zones 48000 BTU',
    'Samsung Cassette 4 voies 36000 BTU',
    
    // PC Portables
    'Dell Latitude 5520 15.6" Intel i7',
    'ASUS ZenBook 14 OLED Intel i5',
    'Acer Aspire 5 15.6" AMD Ryzen 7',
    'Dell XPS 13 Plus 13.4" Intel i7',
    'ASUS ROG Strix G15 Gaming Ryzen 7',
    'Acer Swift 3 14" Intel i5 Ultrabook',
    'Dell Inspiron 16 Plus 16" Intel i7 Créateur',
    
    // Ordinateurs
    'Dell OptiPlex 7090 SFF Intel i7',
    'ASUS ExpertCenter D5 Mini PC',
    'Dell Precision 3660 Workstation Intel Xeon',
    'ASUS ROG Strix GT35 Gaming Desktop',
    'Acer Veriton X Desktop Intel i5 Business',
    
    // Solaire
    'Panneau Solaire LG NeON H 370W',
    'Panneau Samsung 400W Bifacial',
    'Kit Solaire LG 3kW Résidentiel',
    'Samsung Onduleur 5kW Triphasé',
    
    // Électronique
    'Écran Samsung 27" QHD Curved',
    'Interrupteur Simon 82 Blanc Complet',
    'Tableau Électrique Hager 3 Rangées',
    'Samsung Smart TV 55" 4K QLED',
    'Prise Simon 82 avec USB Type-C',
    'Disjoncteur Hager 20A Courbe C',
    
    // Sécurité
    'Centrale d\'Alarme Hager 8 Zones',
    
    // Incendie
    'Centrale Incendie Ingelec 4 Zones',
    'Hager Détecteur de Fumée TG600AL'
  ];
  
  allProductNames.forEach(productName => {
    const update = generateProductImageUpdate(productName);
    console.log(`📦 ${productName}`);
    console.log(`🖼️ Nouvelles images: ${update.newImages.length} images Unsplash`);
    console.log(`🎯 Image principale: ${update.newMainImage}`);
    console.log('📝 Code à utiliser:');
    console.log(update.generatedCode);
    console.log('---');
  });
  
  console.log('\n✅ Toutes les images sont maintenant mappées vers Unsplash!');
  console.log('📋 Copiez le code généré dans products.ts pour chaque produit');
};

/**
 * Fonction pour tester les images d'un produit spécifique
 */
export const testProductImages = (productName: string) => {
  console.log(`🧪 Test des images pour: ${productName}`);
  
  const images = getProductImagesByName(productName);
  const mainImage = getMainProductImage(productName);
  
  console.log(`🖼️ Images trouvées: ${images.length}`);
  images.forEach((img, index) => {
    console.log(`  ${index + 1}. ${img}`);
  });
  
  console.log(`🎯 Image principale: ${mainImage}`);
  
  return { images, mainImage };
};

// Auto-exécution pour afficher le guide
if (typeof window !== 'undefined') {
  (window as any).updateImages = {
    showUpdates: showImageUpdates,
    testProduct: testProductImages
  };
  
  console.log('🖼️ Script de mise à jour d\'images chargé!');
  console.log('💡 Utilisez updateImages.showUpdates() pour voir toutes les mises à jour');
  console.log('🧪 Utilisez updateImages.testProduct("nom du produit") pour tester');
}

export default {
  showImageUpdates,
  testProductImages,
  generateProductImageUpdate
}; 