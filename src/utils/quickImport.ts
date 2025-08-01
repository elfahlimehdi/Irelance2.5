// =====================================================
// UTILITAIRE D'IMPORT RAPIDE - CATALOGUE IRELANCE
// =====================================================
// Fonctions simplifiées pour import rapide des produits

import { testProductRetrieval, showInstructions } from '../scripts/runImport';
import { performFullImport, verifyImport } from '../services/importProducts';
import { IRELANCE_PRODUCTS } from '../constants/products';
import { isFirebaseAvailable } from '../lib/firebase';

/**
 * 🚀 IMPORT EXPRESS - Un clic, tout est importé
 * Fonction principale recommandée pour le premier import
 */
export const importAllProducts = async (): Promise<{
  success: boolean;
  message: string;
  stats?: any;
}> => {
  console.log('🎯 Début de l\'import express du catalogue irelance...');
  
  if (!isFirebaseAvailable()) {
    const message = '❌ Firebase non configuré. Configurez .env.local avec vos clés Firebase.';
    console.error(message);
    return { success: false, message };
  }

  try {
    console.log(`📦 Prêt à importer ${IRELANCE_PRODUCTS.length} produits...`);
    
    const result = await performFullImport({
      clearExisting: true,
      onProgress: (msg) => console.log(`📢 ${msg}`)
    });

    if (result.success) {
      console.log('🎉 Import express terminé avec succès!');
      const verification = await verifyImport();
      
      return {
        success: true,
        message: `✅ ${IRELANCE_PRODUCTS.length} produits importés avec succès`,
        stats: verification.stats
      };
    } else {
      return {
        success: false,
        message: `❌ Échec de l'import: ${result.message}`
      };
    }
  } catch (error) {
    const message = `💥 Erreur lors de l'import: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    console.error(message);
    return { success: false, message };
  }
};

/**
 * 📊 STATUT DU CATALOGUE
 * Affiche l'état actuel du catalogue et de Firebase
 */
export const getCatalogueStatus = () => {
  const firebaseStatus = isFirebaseAvailable();
  
  console.log(`
🏪 ===== STATUT CATALOGUE IRELANCE =====

📦 CATALOGUE LOCAL:
   • Total produits: ${IRELANCE_PRODUCTS.length}
   • Catégories: ${[...new Set(IRELANCE_PRODUCTS.map(p => p.category))].length}
   • Marques: ${[...new Set(IRELANCE_PRODUCTS.map(p => p.brand))].length}
   • Produits vedettes: ${IRELANCE_PRODUCTS.filter(p => p.isFeatured).length}
   • Promotions actives: ${IRELANCE_PRODUCTS.filter(p => p.promotionPercentage && p.promotionPercentage > 0).length}

🔥 FIREBASE:
   • Statut: ${firebaseStatus ? '✅ Connecté' : '❌ Non configuré'}
   • Base de données: ${firebaseStatus ? 'Prête' : 'Non disponible'}

⚡ ACTIONS RAPIDES:
   • importAllProducts() - Import complet
   • testProductRetrieval() - Test de récupération
   • showInstructions() - Guide complet

=======================================
  `);

  return {
    local: {
      total: IRELANCE_PRODUCTS.length,
      categories: [...new Set(IRELANCE_PRODUCTS.map(p => p.category))].length,
      brands: [...new Set(IRELANCE_PRODUCTS.map(p => p.brand))].length,
      featured: IRELANCE_PRODUCTS.filter(p => p.isFeatured).length
    },
    firebase: {
      available: firebaseStatus,
      ready: firebaseStatus
    }
  };
};

/**
 * 🎯 IMPORT PAR CATÉGORIE RAPIDE
 * Import simplifié d'une catégorie spécifique
 */
export const importCategory = async (category: string) => {
  if (!isFirebaseAvailable()) {
    console.error('❌ Firebase non configuré');
    return { success: false, message: 'Firebase non configuré' };
  }

  const categoryProducts = IRELANCE_PRODUCTS.filter(p => p.category === category);
  
  if (categoryProducts.length === 0) {
    const message = `❌ Aucun produit trouvé pour la catégorie: ${category}`;
    console.error(message);
    return { success: false, message };
  }

  console.log(`🎯 Import de ${categoryProducts.length} produits de la catégorie: ${category}`);
  
  try {
    const result = await performFullImport({
      category,
      clearExisting: false,
      onProgress: (msg) => console.log(`📢 ${msg}`)
    });

    return {
      success: result.success,
      message: result.message,
      count: categoryProducts.length
    };
  } catch (error) {
    const message = `❌ Erreur import catégorie ${category}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    console.error(message);
    return { success: false, message };
  }
};

/**
 * 🔍 LISTE DES CATÉGORIES DISPONIBLES
 */
export const getAvailableCategories = () => {
  const categories = [...new Set(IRELANCE_PRODUCTS.map(p => p.category))];
  console.log('📂 Catégories disponibles:', categories);
  return categories;
};

/**
 * 🏢 LISTE DES MARQUES DISPONIBLES
 */
export const getAvailableBrands = () => {
  const brands = [...new Set(IRELANCE_PRODUCTS.map(p => p.brand))];
  console.log('🏢 Marques disponibles:', brands);
  return brands;
};

/**
 * 📈 ANALYSE DÉTAILLÉE DU CATALOGUE
 */
export const analyzeCatalogueDetails = () => {
  const byCategory = IRELANCE_PRODUCTS.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byBrand = IRELANCE_PRODUCTS.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priceRanges = {
    '0-100': IRELANCE_PRODUCTS.filter(p => p.price <= 100).length,
    '100-500': IRELANCE_PRODUCTS.filter(p => p.price > 100 && p.price <= 500).length,
    '500-1000': IRELANCE_PRODUCTS.filter(p => p.price > 500 && p.price <= 1000).length,
    '1000-5000': IRELANCE_PRODUCTS.filter(p => p.price > 1000 && p.price <= 5000).length,
    '5000+': IRELANCE_PRODUCTS.filter(p => p.price > 5000).length
  };

  console.log(`
📊 ===== ANALYSE DÉTAILLÉE DU CATALOGUE =====

📦 PAR CATÉGORIE:
${Object.entries(byCategory).map(([cat, count]) => `   • ${cat}: ${count} produits`).join('\n')}

🏢 PAR MARQUE:
${Object.entries(byBrand).map(([brand, count]) => `   • ${brand}: ${count} produits`).join('\n')}

💰 PAR GAMME DE PRIX:
${Object.entries(priceRanges).map(([range, count]) => `   • ${range}€: ${count} produits`).join('\n')}

⭐ QUALITÉ:
   • Note moyenne: ${(IRELANCE_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / IRELANCE_PRODUCTS.length).toFixed(1)}/5
   • Produits 4⭐+: ${IRELANCE_PRODUCTS.filter(p => p.rating >= 4).length}
   • Produits 4.5⭐+: ${IRELANCE_PRODUCTS.filter(p => p.rating >= 4.5).length}

=============================================
  `);

  return {
    byCategory,
    byBrand,
    priceRanges,
    quality: {
      avgRating: (IRELANCE_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / IRELANCE_PRODUCTS.length).toFixed(1),
      highRated: IRELANCE_PRODUCTS.filter(p => p.rating >= 4).length,
      premiumRated: IRELANCE_PRODUCTS.filter(p => p.rating >= 4.5).length
    }
  };
};

// Export des fonctions principales pour utilisation globale
export const irelanceQuickImport = {
  import: importAllProducts,
  status: getCatalogueStatus,
  categories: getAvailableCategories,
  brands: getAvailableBrands,
  analyze: analyzeCatalogueDetails,
  importCategory,
  test: testProductRetrieval,
  help: showInstructions
};

// Exposition globale pour la console
if (typeof window !== 'undefined') {
  (window as any).irelance = irelanceQuickImport;
  console.log('🎯 irelance QuickImport chargé! Utilisez "irelance.help()" pour les instructions');
}

export default irelanceQuickImport; 