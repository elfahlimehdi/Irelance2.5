import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit as limitQuery, 
  DocumentData,
  QuerySnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, ProductCategory } from '../types';
import { MOCK_PRODUCTS } from '../constants/products';

/**
 * Hook pour récupérer les produits depuis Firebase Firestore
 * Compatible avec le système existant + fallback vers données locales
 */
export const useProducts = (
  category: ProductCategory | 'all' | null = null, 
  limit: number | null = null
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        // Vérifier si Firebase est disponible
        if (!db) {
          throw new Error('Firebase non configuré');
        }

        // Construire la requête Firestore
        let q = collection(db, 'products');
        const constraints = [];

        // Filtrer par catégorie si spécifiée (sauf 'all')
        if (category && category !== 'all') {
          constraints.push(where('category', '==', category));
        }

        // Filtrer seulement les produits actifs
        constraints.push(where('isActive', '==', true));

        // Ordonner par date de création (les plus récents en premier)
        constraints.push(orderBy('createdAt', 'desc'));

        // Limiter le nombre de résultats si spécifié
        if (limit) {
          constraints.push(limitQuery(limit));
        }

        // Appliquer les contraintes
        q = query(q, ...constraints);

        // Exécuter la requête
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        
        // Transformer les données Firestore en objets Product
        const productsData: Product[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Convertir les timestamps Firestore en Date si nécessaire
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
            // Assurer la compatibilité avec l'existant
            image: data.mainImage || data.image,
            created_at: data.createdAt?.toDate ? 
              data.createdAt.toDate().toISOString().split('T')[0] : 
              new Date(data.createdAt).toISOString().split('T')[0]
          } as Product;
        });

        setProducts(productsData);
        console.log(`✅ Produits Firebase récupérés: ${productsData.length} dans la catégorie ${category || 'toutes'}`);
      } catch (err) {
        console.warn('⚠️ Erreur Firebase, utilisation des données locales:', err);
        
        // Fallback vers les données locales (MOCK_PRODUCTS)
        let fallbackProducts = MOCK_PRODUCTS;
        
        // Filtrer par catégorie si nécessaire
        if (category && category !== 'all') {
          fallbackProducts = MOCK_PRODUCTS.filter(product => product.category === category);
        }
        
        // Limiter si nécessaire
        if (limit) {
          fallbackProducts = fallbackProducts.slice(0, limit);
        }
        
        setProducts(fallbackProducts);
        setUsingFallback(true);
        setError(null); // Ne pas afficher l'erreur à l'utilisateur, utiliser fallback
        console.log(`📦 Fallback activé: ${fallbackProducts.length} produits locaux chargés`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, limit]);

  return { 
    products, 
    loading, 
    error,
    usingFallback,
    refetch: () => {
      setLoading(true);
      // Re-déclencher l'effet
    }
  };
};

/**
 * Hook pour récupérer les produits en vedette
 */
export const useFeaturedProducts = (limit: number = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeaturedProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        if (!db) {
          throw new Error('Firebase non configuré');
        }

        const q = query(
          collection(db, 'products'),
          where('isActive', '==', true),
          where('isFeatured', '==', true),
          orderBy('createdAt', 'desc'),
          limitQuery(limit)
        );

        const querySnapshot = await getDocs(q);
        const productsData: Product[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
            image: data.mainImage || data.image,
            created_at: data.createdAt?.toDate ? 
              data.createdAt.toDate().toISOString().split('T')[0] : 
              new Date(data.createdAt).toISOString().split('T')[0]
          } as Product;
        });

        setProducts(productsData);
        console.log(`✅ Produits en vedette Firebase récupérés: ${productsData.length}`);
      } catch (err) {
        console.warn('⚠️ Erreur Firebase pour vedettes, utilisation des données locales:', err);
        
        // Fallback vers les données locales
        const fallbackProducts = MOCK_PRODUCTS
          .filter(product => product.isFeatured || MOCK_PRODUCTS.indexOf(product) < 6) // Prendre les 6 premiers comme vedettes
          .slice(0, limit);
        
        setProducts(fallbackProducts);
        setUsingFallback(true);
        setError(null);
        console.log(`📦 Fallback vedettes activé: ${fallbackProducts.length} produits locaux`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit]);

  return { products, loading, error, usingFallback };
};

/**
 * Hook pour rechercher des produits par nom ou description
 */
export const useProductSearch = (searchTerm: string, limit: number = 20) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    const searchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        if (!db) {
          throw new Error('Firebase non configuré');
        }

        // Récupérer tous les produits actifs et filtrer côté client
        // (Firestore ne supporte pas la recherche de texte native)
        const q = query(
          collection(db, 'products'),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const allProducts: Product[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
            image: data.mainImage || data.image,
            created_at: data.createdAt?.toDate ? 
              data.createdAt.toDate().toISOString().split('T')[0] : 
              new Date(data.createdAt).toISOString().split('T')[0]
          } as Product;
        });

        // Filtrer localement par nom, description ou tags
        const filteredProducts = allProducts
          .filter(product => {
            const searchLower = searchTerm.toLowerCase();
            return (
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower) ||
              product.brand.toLowerCase().includes(searchLower) ||
              product.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
              product.features.some(feature => feature.toLowerCase().includes(searchLower))
            );
          })
          .slice(0, limit);

        setProducts(filteredProducts);
        console.log(`🔍 Recherche Firebase "${searchTerm}": ${filteredProducts.length} résultats`);
      } catch (err) {
        console.warn('⚠️ Erreur recherche Firebase, utilisation des données locales:', err);
        
        // Fallback vers recherche locale
        const searchLower = searchTerm.toLowerCase();
        const filteredProducts = MOCK_PRODUCTS
          .filter(product => {
            return (
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower) ||
              (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
              (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
              product.features.some(feature => feature.toLowerCase().includes(searchLower))
            );
          })
          .slice(0, limit);
        
        setProducts(filteredProducts);
        setUsingFallback(true);
        setError(null);
        console.log(`🔍 Recherche locale "${searchTerm}": ${filteredProducts.length} résultats`);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, limit]);

  return { products, loading, error, usingFallback };
};

export default useProducts; 