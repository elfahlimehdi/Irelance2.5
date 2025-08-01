import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Snowflake, Shield, Sun, Star, Laptop, Flame, Cpu, Monitor } from 'lucide-react';
import { CATEGORIES } from '../constants/products';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  cameras: <Camera className="w-10 h-10 text-blue-500 mb-4" />,
  climatisation: <Snowflake className="w-10 h-10 text-cyan-500 mb-4" />,
  securite: <Shield className="w-10 h-10 text-emerald-500 mb-4" />,
  solaire: <Sun className="w-10 h-10 text-yellow-400 mb-4" />,
  pc: <Laptop className="w-10 h-10 text-indigo-500 mb-4" />,
  ordinateurs: <Monitor className="w-10 h-10 text-slate-600 mb-4" />,
  incendie: <Flame className="w-10 h-10 text-red-500 mb-4" />,
  electronique: <Cpu className="w-10 h-10 text-purple-500 mb-4" />,
};

const Products: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Page Header */}
      <div className="backdrop-blur bg-white/70 shadow-lg sticky top-0 z-30 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow-sm">
            Nos Produits
          </h1>
          <p className="text-lg text-blue-700/80">
            Choisissez une catégorie pour explorer nos produits professionnels
          </p>
        </div>
      </div>

      {/* Grille de catégories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                    <button
              key={category.id}
              onClick={() => navigate(`/produits/${category.id}`)}
              className="group bg-white/90 rounded-2xl shadow-xl border border-blue-100 hover:shadow-blue-200 hover:scale-105 transition-all flex flex-col items-center p-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={`Explorer la catégorie : ${category.name}`}
            >
              {CATEGORY_ICONS[category.id] || <Star className="w-10 h-10 text-gray-400 mb-4" />}
              <span className="text-xl font-bold text-blue-900 group-hover:text-blue-600 mb-2 transition-colors">
                {category.name}
              </span>
              <span className="text-sm text-blue-700/80">Voir les produits</span>
                    </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;