/**
 * Product category types
 */
export type ProductCategory = 'cameras' | 'climatisation' | 'securite' | 'solaire';

/**
 * User role types
 */
export type UserRole = 'user' | 'admin';

/**
 * Order status types
 */
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

/**
 * Product interface - represents a product in the catalog
 */
export interface Product {
  /** Unique product identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product description */
  description: string;
  /** Product price in MAD */
  price: number;
  /** Product category */
  category: ProductCategory;
  /** Product image URL */
  image: string;
  /** Product features list */
  features: string[];
  /** Product availability status */
  inStock: boolean;
  /** Product creation date */
  created_at: string;
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