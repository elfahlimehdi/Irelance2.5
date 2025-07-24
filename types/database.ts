export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone_number: string | null
          avatar_url: string | null
          address: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone_number?: string | null
          avatar_url?: string | null
          address?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone_number?: string | null
          avatar_url?: string | null
          address?: any
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          website: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          website?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          website?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          price: number
          compare_price: number | null
          brand_id: string | null
          category_id: string | null
          images: string[]
          specifications: any
          features: string[]
          availability: boolean
          stock_quantity: number
          sku: string | null
          weight: number | null
          dimensions: any
          warranty_period: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          price: number
          compare_price?: number | null
          brand_id?: string | null
          category_id?: string | null
          images?: string[]
          specifications?: any
          features?: string[]
          availability?: boolean
          stock_quantity?: number
          sku?: string | null
          weight?: number | null
          dimensions?: any
          warranty_period?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          price?: number
          compare_price?: number | null
          brand_id?: string | null
          category_id?: string | null
          images?: string[]
          specifications?: any
          features?: string[]
          availability?: boolean
          stock_quantity?: number
          sku?: string | null
          weight?: number | null
          dimensions?: any
          warranty_period?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          status: string
          total_amount: number
          shipping_address: any
          billing_address: any
          payment_status: string
          payment_method: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number: string
          status?: string
          total_amount: number
          shipping_address: any
          billing_address: any
          payment_status?: string
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string
          status?: string
          total_amount?: number
          shipping_address?: any
          billing_address?: any
          payment_status?: string
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          quantity?: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      administrators: {
        Row: {
          id: string
          name: string
          email: string
          phone_number: string | null
          role: string
          permissions: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone_number?: string | null
          role?: string
          permissions?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone_number?: string | null
          role?: string
          permissions?: any
          created_at?: string
          updated_at?: string
        }
      }
      user_actions: {
        Row: {
          id: string
          user_id: string | null
          action: string
          product_id: string | null
          order_id: string | null
          details: any
          ip_address: string | null
          user_agent: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          product_id?: string | null
          order_id?: string | null
          details?: any
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          product_id?: string | null
          order_id?: string | null
          details?: any
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}