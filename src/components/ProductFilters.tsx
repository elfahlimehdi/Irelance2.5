import React, { useCallback } from 'react';

/**
 * Category interface for product filtering
 */
interface Category {
  id: string;
  name: string;
}

/**
 * Price range tuple type
 */
type PriceRange = [number, number];

/**
 * ProductFilters component props interface
 */
interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  priceRange: PriceRange;
  onPriceChange: (range: PriceRange) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

/**
 * ProductFilters component - sidebar filters for the products page
 * Features: search, category filtering, price range filtering
 */
const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  searchTerm,
  onSearchChange,
}) => {
  /**
   * Handle search term change
   */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  /**
   * Handle category selection
   */
  const handleCategoryChange = useCallback((categoryId: string): void => {
    onCategoryChange(categoryId);
  }, [onCategoryChange]);

  /**
   * Handle minimum price change
   */
  const handleMinPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const minPrice = parseInt(e.target.value) || 0;
    onPriceChange([minPrice, priceRange[1]]);
  }, [priceRange, onPriceChange]);

  /**
   * Handle maximum price change
   */
  const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const maxPrice = parseInt(e.target.value) || 50000;
    onPriceChange([priceRange[0], maxPrice]);
  }, [priceRange, onPriceChange]);

  return (
    <aside className="lg:w-64 space-y-6">
      {/* Search Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Rechercher
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            aria-label="Rechercher un produit"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Catégories
        </h3>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Filtrer par catégorie: ${category.name}`}
              aria-pressed={selectedCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Prix (MAD)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Prix minimum"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Prix maximum"
              min="0"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters; 