import { createContext } from 'react'

export const WishlistContext = createContext<IWishlistContextValue>(
  {} as IWishlistContextValue
)

export const CartContext = createContext<ICartContextValue>(
  {} as ICartContextValue
)

export const FilterContext = createContext<IFilterContext>({} as IFilterContext)

export const CheckoutContext = createContext<any>({})

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)
