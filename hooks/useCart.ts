import { useState, useEffect } from 'react'
import { getCartItems, updateCartItem, removeFromCart } from '@/lib/supabase'
import { Database } from '@/types/database'

type CartItem = Database['public']['Tables']['cart_items']['Row'] & {
  product: Database['public']['Tables']['products']['Row'] & {
    category: Database['public']['Tables']['categories']['Row']
    brand: Database['public']['Tables']['brands']['Row']
  }
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCartItems = async () => {
    try {
      const { data, error } = await getCartItems()
      if (error) throw error
      setCartItems(data || [])
    } catch (error) {
      console.error('Error fetching cart items:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const { error } = await updateCartItem(itemId, quantity)
      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error('Error updating cart item:', error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await removeFromCart(itemId)
      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error('Error removing cart item:', error)
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  return {
    cartItems,
    loading,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    refetch: fetchCartItems
  }
}