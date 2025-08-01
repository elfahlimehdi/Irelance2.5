// ===================================================
// SCRIPT D'IMPORT AUTOMATIQUE - CATALOGUE IRELANCE
// ===================================================
// Ce script peut être exécuté depuis la console du navigateur
// ou depuis un composant React pour importer automatiquement
// tous les produits irelance vers Firebase Firestore

import { performFullImport, verifyImport, clearAllProducts } from '../services/importProducts';
import { IRELANCE_PRODUCTS } from '../constants/products';
import { isFirebaseAvailable, getFirebaseStatus } from '../lib/firebase';

/**
 * 🚀 IMPORT COMPLET - Tous les produits irelance
 * Nettoie la base et importe tous les 38+ produits
 */
export const runFullProductImport = async (): Promise<void> => {
  console.log('🎯 ===== IMPORT AUTOMATIQUE CATALOGUE IRELANCE =====');
  console.log(`📦 Produits à importer: ${IRELANCE_PRODUCTS.length}`);
  
  // Vérifier Firebase
  if (!isFirebaseAvailable()) {
    console.error('❌ Firebase non configuré. Veuillez configurer vos variables d\'environnement.');
    console.log('🔧 Consultez le fichier FIREBASE_SETUP_QUICK.md pour la configuration');
    return;
  }

  console.log('✅ Firebase configuré et disponible');
  console.log(`🏪 Statut Firebase:`, getFirebaseStatus());

  try {
    // 1. Statistiques avant import
    console.log('\n📊 === STATISTIQUES AVANT IMPORT ===');
    const beforeStats = await verifyImport();
    console.log(beforeStats.message);

    // 2. Import complet avec nettoyage
    console.log('\n🚀 === DÉBUT DE L\'IMPORT COMPLET ===');
    const result = await performFullImport({
      clearExisting: true,
      onProgress: (message) => console.log(`📢 ${message}`)
    });

    if (result.success) {
      console.log('\n🎉 === IMPORT RÉUSSI ===');
      console.log(result.message);
      console.log('📋 Détails:', result.details);
    } else {
      console.error('\n❌ === ÉCHEC DE L\'IMPORT ===');
      console.error(result.message);
    }

    // 3. Vérification finale
    console.log('\n🔍 === VÉRIFICATION FINALE ===');
    const finalStats = await verifyImport();
    if (finalStats.success) {
      console.log('✅ Base de données vérifiée avec succès');
      console.log('📊 Statistiques finales:', finalStats.stats);
      
      // Affichage détaillé par catégorie
      console.log('\n📈 === RÉPARTITION PAR CATÉGORIE ===');
      Object.entries(finalStats.stats.byCategory).forEach(([category, count]) => {
        console.log(`🏷️  ${category}: ${count} produits`);
      });

      // Affichage détaillé par marque
      console.log('\n🏢 === RÉPARTITION PAR MARQUE ===');
      Object.entries(finalStats.stats.byBrand).forEach(([brand, count]) => {
        console.log(`🔖 ${brand}: ${count} produits`);
      });
    }

  } catch (error) {
    console.error('💥 Erreur critique lors de l\'import:', error);
  }

  console.log('\n🏁 ===== FIN DE L\'IMPORT AUTOMATIQUE =====');
};

/**
 * 🎯 IMPORT PAR CATÉGORIE
 * Importe seulement une catégorie spécifique
 */
export const runCategoryImport = async (category: string): Promise<void> => {
  console.log(`🎯 Import de la catégorie: ${category}`);
  
  if (!isFirebaseAvailable()) {
    console.error('❌ Firebase non configuré');
    return;
  }

  try {
    const result = await performFullImport({
      category,
      clearExisting: false,
      onProgress: (message) => console.log(`📢 ${message}`)
    });

    if (result.success) {
      console.log(`✅ Import catégorie '${category}' réussi:`, result.message);
    } else {
      console.error(`❌ Échec import catégorie '${category}':`, result.message);
    }
  } catch (error) {
    console.error(`💥 Erreur import catégorie '${category}':`, error);
  }
};

/**
 * 🧪 TEST DE RÉCUPÉRATION
 * Teste la récupération des produits depuis Firebase
 */
export const testProductRetrieval = async (): Promise<void> => {
  console.log('🧪 === TEST DE RÉCUPÉRATION DES PRODUITS ===');
  
  if (!isFirebaseAvailable()) {
    console.error('❌ Firebase non configuré');
    return;
  }

  try {
    const { collection, getDocs, query, where, limit } = await import('firebase/firestore');
    const { db } = await import('../lib/firebase');

    // Test 1: Récupérer tous les produits
    console.log('🔍 Test 1: Récupération de tous les produits...');
    const allProductsSnapshot = await getDocs(collection(db!, 'products'));
    console.log(`📦 Total produits trouvés: ${allProductsSnapshot.size}`);

    // Test 2: Récupérer produits par catégorie
    console.log('\n🔍 Test 2: Produits par catégorie...');
    const categories = ['cameras', 'climatisation', 'pc', 'ordinateurs'];
    
    for (const cat of categories) {
      const categoryQuery = query(
        collection(db!, 'products'), 
        where('category', '==', cat),
        limit(5)
      );
      const categorySnapshot = await getDocs(categoryQuery);
      console.log(`🏷️  ${cat}: ${categorySnapshot.size} produits`);
      
      categorySnapshot.docs.forEach(doc => {
        const product = doc.data();
        console.log(`   📱 ${product.name} (${product.brand}) - ${product.price}€`);
      });
    }

    // Test 3: Produits en promotion
    console.log('\n🔍 Test 3: Produits en promotion...');
    const promoQuery = query(
      collection(db!, 'products'),
      where('promotionPercentage', '>', 0),
      limit(5)
    );
    const promoSnapshot = await getDocs(promoQuery);
    console.log(`🏷️ Produits en promo trouvés: ${promoSnapshot.size}`);
    
    promoSnapshot.docs.forEach(doc => {
      const product = doc.data();
      console.log(`   💸 ${product.name} - ${product.promotionPercentage}% de réduction`);
    });

    console.log('\n✅ Test de récupération terminé avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors du test de récupération:', error);
  }
};

/**
 * 📋 AFFICHAGE DES INSTRUCTIONS
 * Guide d'utilisation du script d'import
 */
export const showInstructions = (): void => {
  console.log(`
🎯 ===== GUIDE D'UTILISATION - IMPORT AUTOMATIQUE IRELANCE =====

📦 CATALOGUE DISPONIBLE:
   • ${IRELANCE_PRODUCTS.length} produits authentiques des marques partenaires
   • 8 catégories complètes (Caméras, Climatisation, PC, etc.)
   • Marques: Hikvision, LG, Samsung, Dell, Asus, Acer, Hager, Simon, Ingelec

🚀 COMMANDES DISPONIBLES:

1️⃣  IMPORT COMPLET (Recommandé pour la première fois):
   > runFullProductImport()
   
   ✅ Nettoie la base existante
   ✅ Importe tous les ${IRELANCE_PRODUCTS.length} produits
   ✅ Vérifie l'intégrité des données

2️⃣  IMPORT PAR CATÉGORIE:
   > runCategoryImport('cameras')
   > runCategoryImport('climatisation')
   > runCategoryImport('pc')
   
   Catégories disponibles:
   • cameras, climatisation, securite, solaire
   • pc, ordinateurs, incendie, electronique

3️⃣  TEST DE RÉCUPÉRATION:
   > testProductRetrieval()
   
   ✅ Vérifie que les produits sont bien stockés
   ✅ Teste la récupération par catégorie
   ✅ Affiche les produits en promotion

🔧 PRÉREQUIS:
   • Fichier .env.local configuré avec les clés Firebase
   • Règles Firestore configurées pour permettre l'écriture
   • Voir: FIREBASE_SETUP_QUICK.md

⚡ UTILISATION RAPIDE:
   Copiez-collez dans la console du navigateur:
   
   import { runFullProductImport } from './src/scripts/runImport';
   runFullProductImport();

🆘 SUPPORT:
   En cas de problème, vérifiez:
   1. Configuration Firebase (.env.local)
   2. Règles Firestore (lecture/écriture autorisées)
   3. Console du navigateur pour les erreurs détaillées

===== BONNE UTILISATION ! =====
  `);
};

// Auto-exécution si appelé directement
if (typeof window !== 'undefined') {
  // Exposer les fonctions globalement pour utilisation depuis la console
  (window as any).irelanceImport = {
    runFullProductImport,
    runCategoryImport,
    testProductRetrieval,
    showInstructions,
    getProductCount: () => IRELANCE_PRODUCTS.length,
    getCategories: () => [...new Set(IRELANCE_PRODUCTS.map(p => p.category))],
    getBrands: () => [...new Set(IRELANCE_PRODUCTS.map(p => p.brand))]
  };
  
  console.log('🎯 Script d\'import irelance chargé!');
  console.log('💡 Tapez "irelanceImport.showInstructions()" pour voir le guide');
  console.log(`📦 ${IRELANCE_PRODUCTS.length} produits prêts à importer`);
} 