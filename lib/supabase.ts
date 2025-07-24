import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers
export const getProducts = async (filters?: {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*)
    `)
    .eq('availability', true)

  if (filters?.category) {
    query = query.eq('category_id', filters.category)
  }

  if (filters?.brand) {
    query = query.eq('brand_id', filters.brand)
  }

  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }

  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const getProduct = async (slug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*)
    `)
    .eq('slug', slug)
    .single()

  return { data, error }
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return { data, error }
}

export const getBrands = async () => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name')

  return { data, error }
}

export const addToCart = async (productId: string, quantity: number = 1) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: user.id,
      product_id: productId,
      quantity
    }, {
      onConflict: 'user_id,product_id'
    })

  return { data, error }
}

export const getCartItems = async () => {
  const user = await getCurrentUser()
  if (!user) return { data: [], error: null }

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products(
        *,
        category:categories(*),
        brand:brands(*)
      )
    `)
    .eq('user_id', user.id)

  return { data, error }
}

export const updateCartItem = async (itemId: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)

  return { data, error }
}

export const removeFromCart = async (itemId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)

  return { data, error }
}

export const createOrder = async (orderData: any) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  // Generate order number
  const orderNumber = `IRE-${Date.now()}`

  const { data, error } = await supabase
    .from('orders')
    .insert({
      ...orderData,
      user_id: user.id,
      order_number: orderNumber
    })
    .select()
    .single()

  return { data, error }
}

export const logUserAction = async (action: string, productId?: string, orderId?: string, details?: any) => {
  const user = await getCurrentUser()
  if (!user) return

  await supabase
    .from('user_actions')
    .insert({
      user_id: user.id,
      action,
      product_id: productId,
      order_id: orderId,
      details
    })
}