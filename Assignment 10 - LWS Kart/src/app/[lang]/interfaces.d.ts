interface WrapperChild {
  children: ReactNode
}

interface IProduct {
  _id: string
  product_name: string
  stock_count: number
  brand: string
  category: string
  SKU: string
  price: number
  discount_price: number
  description: string
  new_arrival: boolean
  trending: boolean
  reviewCount: number
  size: string
  color: string
  addedAt?: Date
  image: string
  reviews?: IReviews['reviews']
  otherImages?: string[]
}

interface IAdminProduct {
  product: IProduct
  index: number
}

interface IReviewsButton {
  productReviews: IReviews['reviews']
  role?: 'user' | 'admin'
  productId?: string
}

interface IHeaderButtons {
  wishlists?: IProduct[]
  cartItems?: IProductWithQuantity[]
  headerButtonTexts: IHeaderButtonText
  user: SessionWith_Id['user']
}

interface IThemeContext {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
}

interface ICategory {
  [category: string]: number
}

interface IFormRowProp {
  form: any
  name: string
  label?: string
  placeholder?: string
  setFocusedField: Dispatch<SetStateAction<string>>
  focusedField?: string
}

interface IWishListButtonProp {
  userId: string
  product: IProductWith
  wishlistLocale?: string
  setQuantity?: Dispatch<SetStateAction<number>>
}

interface SessionWith_Id extends Session {
  user: User & { _id: string; role?: string }
}

interface IWishlistContextValue {
  userWishlist: {
    loading: boolean
    data: IProduct[]
    error: boolean
    offlineWishlist: IProduct[]
  }
  setUserWishlist: Dispatch<
    SetStateAction<{
      loading: boolean
      data: IProduct[]
      error: boolean
      offlineWishlist: IProduct[]
    }>
  >
}

interface IProductWithQuantity extends IProduct {
  quantity: 0
  expiresAt?: string
}

interface ICartContextValue {
  userCart: {
    loading: boolean
    data: IProductWithQuantity[]
    error: boolean
    offlineCart: IProductWithQuantity[]
    quantity: {
      productId: string
      quantity: number
    }
  }
  setUserCart: Dispatch<
    SetStateAction<{
      loading: boolean
      data: IProduct[]
      error: boolean
      offlineCart: IProductWithQuantity[]
      quantity: {
        productId: string
        quantity: number
      }
    }>
  >
}

interface IFilterContext {
  minPrice: string
  maxPrice: string
  selectedSize: string
  color: string
  setMinPrice: React.Dispatch<React.SetStateAction<string>>
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  stockStatus: boolean
  setStockStatus: React.Dispatch<React.SetStateAction<boolean>>
}

interface IMotionButtonProp {
  className: string
  icon: string
  text: string
  href?: string
  clickFunction?: () => void
  disabled?: boolean
}

interface IProductFilter {
  query: string
  min: number
  max: number
  size: string
  categories: string[]
  color: string[]
  limit?: number
  skip?: number
  sort?: string
  inStock?: boolean
}

interface IShopSearchParams {
  query: string
  min: number
  max: number
  size: string
  category: string
  color: string[]
  limit: number
  skip?: number
  sort?: string
  stock_status?: string
}

interface IProfileUpdateParam {
  name?: string
  email?: string
  phoneNumber?: number
  billingAddress?: {
    postCode?: string
    address?: string
    phoneNumber?: string
  }
  shippingAddress?: {
    postCode?: string
    address?: string
    phoneNumber?: string
  }
}

interface IProfilePasswordTabProp {
  personalProfileForm: ReactNode
  passwordForm: ReactNode
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  dictionary: IAccountPageDict['accountPage']
  isAccountTypeFacebookOrGoogle: boolean
}

interface ISignOutProp {
  text: string
  loggingOutText: string
  isAdmin: boolean
}

interface ILang {
  lang: 'en' | 'bn'
}

interface IHeaderButtonText {
  search: string
  wishlist: string
  cart: string
  account: string
}

interface IFormRowProps {
  form: UseFormReturn<any>
  label: string
  name: string
  placeholder?: string
}

interface IOrderDetails {
  showOrderDetails: {
    orderDetails: {
      orders: IProductWithQuantity[]
      user: z.infer<typeof checkoutFormSchema>
    }
    status: boolean
  }
  total: number
  setShowOrderDetails: Dispatch<
    SetStateAction<{
      orderDetails: z.infer<typeof checkoutFormSchema>
      status: boolean
    }>
  >
}

interface IAddToCartHoverMenu {
  product: IProduct
  hasStock: boolean
  userId: string
  isLocaleBengali?: boolean
}

interface IInvoiceDocument {
  user: SessionWith_Id['user']
  orders: IProductWithQuantity[]
  total: number
}

interface IUseQuantityButtonProps {
  product: IProductWithQuantity
  userId?: string
}

interface IStarReview {
  rating: number | null
  setRating: Dispatch<SetStateAction<number | null>>
  hover: number | null
  setHover: Dispatch<SetStateAction<number | null>>
}
interface IReviewProduct {
  userId: string
  productId: string
}

interface IReviews {
  reviews: [
    {
      userId: string
      review: string
      rating: number
      username: string
      productId: string
      date: Date
      _id?: string
      badReasonReview?: string
    }
  ]
}

interface IAccountPageDict {
  accountPage: {
    personal_profile: string
    edit: string
    account: string
    add_shipping_address: string
    shipping_address: string
    add_billing_address: string
    my_orders: string
    user_details: string
    order_details: string
    first_name: string
    last_name: string
    region: string
    name: string
    billing_address: string
    address: string
    city: string
    phone: string
    email: string
    ordered_items: string
    product_name: string
    size: string
    submit: string
    color: string
    price: string
    quantity: string
    old_pass: string
    new_pass: string
    total_cost: string
    password: string
    change_pass: string
    upload_text: string
    invoice: string
    your_rating: string
    upload_text_2: string
    no_more_orders: string
    no_number_added: string
    cancel: string
    post_code: string
    same_as_shipping: string
    please_add_shipping: string
  }
}

interface ICheckoutPageDict {
  checkoutPage: {
    checkout: string
    nothing_to_checkout: string
    order_summary: string
    cart_is_empty: string
    go_to_shop: string
    add_something: string
    first_name: string
    last_name: string
    country_region: string
    street_address: string
    city: string
    phone_number: string
    email_address: string
    card_number: string
    cvv: string
    item_name: string
    size: string
    in_stock: string
    subtotal: string
    vat: string
    shipping: string
    free_shipping: string
    total: string
    agree_to_terms: string
    place_order: string
    subtotal_label: string
    vat_label: string
    shipping_label: string
    free_shipping_message: string
    free_label: string
    standard_rate_message: string
    total_label: string
    agree_to_the: string
    terms_conditions_label: string
    email: string
  }
}

interface ILoginLocale {
  dictionary?: {
    emailLabel: string
    passwordLabel: string
    rememberMe: string
    forgotPassword: string
    title: string
    loggingIn: string
  }
}
