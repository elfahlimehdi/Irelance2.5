/**
 * Product category types - Mise à jour avec toutes les catégories irelance
 */
export type ProductCategory = 
  | 'cameras' 
  | 'climatisation' 
  | 'securite' 
  | 'solaire'
  | 'pc'
  | 'ordinateurs'
  | 'incendie'
  | 'electronique';

/**
 * User role types
 */
export type UserRole = 'user' | 'admin';

/**
 * Order status types
 */
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

/**
 * Product specifications interface - Spécifications techniques du produit
 */
export interface ProductSpecifications {
  [key: string]: string | number | boolean;
}

/**
 * Enhanced Product interface - Structure complète pour Firebase
 */
export interface Product {
  /** Unique product identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product brand */
  brand: string;
  /** Product category */
  category: ProductCategory;
  /** Product price in MAD */
  price: number;
  /** Original price (if on promotion) */
  originalPrice?: number;
  /** Product SKU */
  sku: string;
  /** Product description */
  description: string;
  /** Short description for cards */
  shortDescription: string;
  /** Product images array */
  images: string[];
  /** Main product image */
  mainImage: string;
  /** Product availability status */
  inStock: boolean;
  /** Stock quantity */
  stockQuantity: number;
  /** Product specifications */
  specifications: ProductSpecifications;
  /** Product features list */
  features: string[];
  /** Product tags for search */
  tags: string[];
  /** Product rating (1-5) */
  rating: number;
  /** Number of reviews */
  reviewCount: number;
  /** Warranty information */
  warranty: string;
  /** Product creation date */
  createdAt: Date;
  /** Product last update date */
  updatedAt: Date;
  /** Product active status */
  isActive: boolean;
  /** Featured product status */
  isFeatured: boolean;
  /** Promotion percentage if applicable */
  promotionPercentage?: number;
  /** Legacy field for compatibility */
  created_at?: string;
  /** Legacy field for compatibility */
  image?: string;
}

/**
 * User interface - represents a user in the system
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User email address */
  email: string;
  /** User full name */
  full_name: string;
  /** User role in the system */
  role: UserRole;
  /** User account creation date */
  created_at: string;
}

/**
 * Contact form interface - represents contact form data
 */
export interface ContactForm {
  /** Contact person's name */
  name: string;
  /** Contact person's email */
  email: string;
  /** Contact person's phone number */
  phone: string;
  /** Contact subject/topic */
  subject: string;
  /** Contact message content */
  message: string;
}

/**
 * Order item interface - represents a product in an order
 */
export interface OrderItem {
  /** Product identifier */
  product_id: string;
  /** Quantity ordered */
  quantity: number;
  /** Unit price at time of order */
  price: number;
}

/**
 * Order interface - represents a customer order
 */
export interface Order {
  /** Unique order identifier */
  id: string;
  /** Customer user identifier */
  user_id: string;
  /** Products in the order */
  products: OrderItem[];
  /** Total order amount */
  total: number;
  /** Current order status */
  status: OrderStatus;
  /** Order creation date */
  created_at: string;
}