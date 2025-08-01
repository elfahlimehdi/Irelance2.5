import { 
  collection, 
  writeBatch, 
  doc, 
  getDocs, 
  deleteDoc,
  query,
  where 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { IRELANCE_PRODUCTS } from '../constants/products';
import { Product } from '../types';

/**
 * Service d'import automatique des produits irelance vers Firebase Firestore
 * Utilise les batch writes pour optimiser les performances
 */

/**
 * Importe tous les produits irelance vers Firestore
 */
export const importProductsToFirebase = async (): Promise<{ success: boolean; message: string; count: number }> => {
  try {
    console.log('🚀 Début de l\'import des produits irelance vers Firebase...');
    
    const batch = writeBatch(db);
    const productsRef = collection(db, 'products');
    let importCount = 0;

    // Préparer les produits pour l'import
    for (const product of IRELANCE_PRODUCTS) {
      // Créer une référence de document avec l'ID du produit
      const docRef = doc(productsRef, product.id);
      
      // Préparer les données pour Firestore
      const productData = {
        ...product,
        // S'assurer que les dates sont des objets Date
        createdAt: product.createdAt instanceof Date ? product.createdAt : new Date(product.createdAt),
        updatedAt: product.updatedAt instanceof Date ? product.updatedAt : new Date(product.updatedAt),
        // Ajouter timestamp d'import
        importedAt: new Date(),
        dataSource: 'irelance_import_v1'
      };

      // Ajouter au batch
      batch.set(docRef, productData);
      importCount++;

      console.log(`📦 Préparé: ${product.name} (${product.brand})`);
    }

    // Exécuter le batch write
    await batch.commit();
    
    const successMessage = `✅ Import réussi: ${importCount} produits ajoutés à Firebase Firestore`;
    console.log(successMessage);
    
    return {
      success: true,
      message: successMessage,
      count: importCount
    };

  } catch (error) {
    const errorMessage = `❌ Erreur lors de l'import: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    console.error(errorMessage, error);
    
    return {
      success: false,
      message: errorMessage,
      count: 0
    };
  }
};

/**
 * Supprime tous les produits existants (attention: destructif!)
 */
export const clearAllProducts = async (): Promise<{ success: boolean; message: string; count: number }> => {
  try {
    console.log('🗑️ Suppression de tous les produits existants...');
    
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    if (snapshot.empty) {
      return {
        success: true,
        message: 'Aucun produit à supprimer',
        count: 0
      };
    }

    const batch = writeBatch(db);
    let deleteCount = 0;

    snapshot.docs.forEach((document) => {
      batch.delete(document.ref);
      deleteCount++;
    });

    await batch.commit();
    
    const message = `🗑️ Suppression réussie: ${deleteCount} produits supprimés`;
    console.log(message);
    
    return {
      success: true,
      message,
      count: deleteCount
    };

  } catch (error) {
    const errorMessage = `❌ Erreur lors de la suppression: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    console.error(errorMessage, error);
    
    return {
      success: false,
      message: errorMessage,
      count: 0
    };
  }
};

/**
 * Met à jour seulement les produits qui ont changé
 */
export const updateChangedProducts = async (): Promise<{ success: boolean; message: string; updated: number; added: number }> => {
  try {
    console.log('🔄 Mise à jour des produits modifiés...');
    
    const batch = writeBatch(db);
    const productsRef = collection(db, 'products');
    
    let updatedCount = 0;
    let addedCount = 0;

    for (const product of IRELANCE_PRODUCTS) {
      const docRef = doc(productsRef, product.id);
      
      // Vérifier si le produit existe déjà
      const existingDoc = await getDocs(query(productsRef, where('__name__', '==', product.id)));
      
      const productData = {
        ...product,
        createdAt: product.createdAt instanceof Date ? product.createdAt : new Date(product.createdAt),
        updatedAt: new Date(), // Toujours mettre à jour le timestamp
        lastModified: new Date(),
        dataSource: 'irelance_update_v1'
      };

      if (existingDoc.empty) {
        // Nouveau produit
        batch.set(docRef, { ...productData, createdAt: new Date() });
        addedCount++;
        console.log(`➕ Nouveau: ${product.name}`);
      } else {
        // Produit existant - mise à jour
        batch.update(docRef, productData);
        updatedCount++;
        console.log(`🔄 Mis à jour: ${product.name}`);
      }
    }

    await batch.commit();
    
    const message = `✅ Mise à jour terminée: ${addedCount} ajoutés, ${updatedCount} mis à jour`;
    console.log(message);
    
    return {
      success: true,
      message,
      updated: updatedCount,
      added: addedCount
    };

  } catch (error) {
    const errorMessage = `❌ Erreur lors de la mise à jour: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    console.error(errorMessage, error);
    
    return {
      success: false,
      message: errorMessage,
      updated: 0,
      added: 0
    };
  }
};

/**
 * Importe seulement les produits d'une catégorie spécifique
 */
export const importProductsByCategory = async (category: string): Promise<{ success: boolean; message: string; count: number }> => {
  try {
    console.log(`🎯 Import des produits de la catégorie: ${category}`);
    
    const categoryProducts = IRELANCE_PRODUCTS.filter(p => p.category === category);
    
    if (categoryProducts.length === 0) {
      return {
        success: false,
        message: `Aucun produit trouvé pour la catégorie: ${category}`,
        count: 0
      };
    }

    const batch = writeBatch(db);
    const productsRef = collection(db, 'products');
    
    for (const product of categoryProducts) {
      const docRef = doc(productsRef, product.id);
      
      const productData = {
        ...product,
        createdAt: product.createdAt instanceof Date ? product.createdAt : new Date(product.createdAt),
        updatedAt: new Date(),
        importedAt: new Date(),
        dataSource: `irelance_category_${category}`
      };

      batch.set(docRef, productData);
    }

    await batch.commit();
    
    const message = `✅ Import catégorie ${category}: ${categoryProducts.length} produits ajoutés`;
    console.log(message);
    
    return {
      success: true,
      message,
      count: categoryProducts.length
    };

  } catch (error) {
    const errorMessage = `❌ Erreur import catégorie ${category}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    console.error(errorMessage, error);
    
    return {
      success: false,
      message: errorMessage,
      count: 0
    };
  }
};

/**
 * Fonction utilitaire pour l'interface d'administration
 * Import complet avec confirmation
 */
export const performFullImport = async (options: {
  clearExisting?: boolean;
  category?: string;
  onProgress?: (message: string) => void;
} = {}): Promise<{ success: boolean; message: string; details: any }> => {
  
  const { clearExisting = false, category, onProgress } = options;
  
  try {
    let totalImported = 0;
    const results: any[] = [];

    // Étape 1: Nettoyer si demandé
    if (clearExisting) {
      onProgress?.('🗑️ Suppression des produits existants...');
      const clearResult = await clearAllProducts();
      results.push({ step: 'clear', ...clearResult });
      
      if (!clearResult.success) {
        throw new Error(`Échec du nettoyage: ${clearResult.message}`);
      }
    }

    // Étape 2: Import
    onProgress?.('📦 Import des produits...');
    
    let importResult;
    if (category) {
      importResult = await importProductsByCategory(category);
    } else {
      importResult = await importProductsToFirebase();
    }
    
    results.push({ step: 'import', ...importResult });
    totalImported = importResult.count;

    if (!importResult.success) {
      throw new Error(`Échec de l'import: ${importResult.message}`);
    }

    // Étape 3: Vérification
    onProgress?.('✅ Vérification de l\'import...');
    const verificationResult = await verifyImport();
    results.push({ step: 'verification', ...verificationResult });

    const finalMessage = `🎉 Import terminé avec succès: ${totalImported} produits importés`;
    onProgress?.(finalMessage);

    return {
      success: true,
      message: finalMessage,
      details: {
        totalImported,
        steps: results,
        verification: verificationResult
      }
    };

  } catch (error) {
    const errorMessage = `❌ Échec de l'import complet: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    onProgress?.(errorMessage);
    
    return {
      success: false,
      message: errorMessage,
      details: { error }
    };
  }
};

/**
 * Vérifie que l'import s'est bien déroulé
 */
export const verifyImport = async (): Promise<{ success: boolean; message: string; stats: any }> => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    const products = snapshot.docs.map(doc => doc.data());
    const stats = {
      total: products.length,
      byCategory: {} as Record<string, number>,
      byBrand: {} as Record<string, number>,
      active: products.filter(p => p.isActive).length,
      featured: products.filter(p => p.isFeatured).length,
      inStock: products.filter(p => p.inStock).length
    };

    // Statistiques par catégorie
    products.forEach(product => {
      stats.byCategory[product.category] = (stats.byCategory[product.category] || 0) + 1;
      stats.byBrand[product.brand] = (stats.byBrand[product.brand] || 0) + 1;
    });

    console.log('📊 Statistiques d\'import:', stats);

    return {
      success: true,
      message: `Vérification réussie: ${stats.total} produits en base`,
      stats
    };

  } catch (error) {
    return {
      success: false,
      message: `Erreur de vérification: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: {}
    };
  }
};

// Export par défaut pour usage simple
export default {
  importAll: importProductsToFirebase,
  updateChanged: updateChangedProducts,
  importByCategory: importProductsByCategory,
  clearAll: clearAllProducts,
  performFullImport,
  verify: verifyImport
}; 