import { StyleSheet } from '@react-pdf/renderer'
import { convertToBengali } from './convertNumsToBengali'

export const TRENDING = 'trending'
export const NEW_ARRIVAL = 'new_arrival'
export const INDEX_BEFORE_LINE_BREAK_SHOULD_OCCUR = 14
export const SIZES = ['XS', 'S', 'M', 'L', 'XL']
export const COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
]

export const PRODUCT_NAME = 'product_name'
export const PRODUCT_CATEGORY = 'category'
export const PRODUCT_STOCK = 'stock_count'

export const TOAST_OPTIONS = {
  autoClose: 1000,
  position: 'bottom-right',
}

export const LC_THEME_KEY = 'lws-kart-them'

export const INVOICE_STYLES = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E3A59',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2E3A59',
    borderBottom: '1px solid #EEE',
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4F4F4F',
  },
  orderItem: {
    borderBottom: '1px solid #EEE',
    paddingBottom: 5,
    marginBottom: 10,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    color: '#2E3A59',
  },
})

export const WishlistButtonTranslations = {
  en: {
    addToWishlist: 'Add to wishlist',
    removeFromWishlist: 'Remove from wishlist',
    logInFirst: 'Log in first',
  },
  bn: {
    addToWishlist: 'ইচ্ছেতালিকায় যোগ করুন',
    removeFromWishlist: 'ইচ্ছেতালিকা থেকে সরান',
    logInFirst: 'প্রথমে লগ ইন করুন',
  },
}

export const ReviewProductTranslations = {
  en: {
    reviewThisProduct: 'Review this product',
    yourRating: 'Your Rating',
    writeYourReview: 'Write your review here...',
    cancel: 'Cancel',
    submit: 'Submit',
    submitting: 'Submitting',
    errorSubmitting: 'Error submitting review',
    addRequiredInfo: 'Add the required info',
    ratedProduct: (rating: number) => `You rated this product ${rating} stars`,
  },
  bn: {
    reviewThisProduct: 'এই পণ্যটি পর্যালোচনা করুন',
    yourRating: 'আপনার রেটিং',
    writeYourReview: 'এখানে আপনার পর্যালোচনা লিখুন...',
    cancel: 'বাতিল করুন',
    submit: 'জমা দিন',
    submitting: 'জমা দিচ্ছি',
    errorSubmitting: 'পর্যালোচনা জমা দিতে ত্রুটি',
    addRequiredInfo: 'প্রয়োজনীয় তথ্য যোগ করুন',
    ratedProduct: (rating: number) =>
      `আপনি এই পণ্যটিকে ${convertToBengali(rating)} তারা রেট দিয়েছেন`,
  },
}

export const BreadCrumbTranslations = {
  en: {
    shop: 'Shop',
    productDetails: 'Product Details',
    account: 'Account',
    checkout: 'Checkout',
  },
  bn: {
    shop: 'দোকান',
    productDetails: 'পণ্যের বিবরণ',
    account: 'অ্যাকাউন্ট',
    checkout: 'চেকআউট',
  },
}

export const RegisterPageTranslations = {
  en: {
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Sumit Saha',
    emailLabel: 'Email address',
    emailPlaceholder: 'sumitsaha@gmail.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '******',
    confirmPasswordLabel: 'Confirm password',
    confirmPasswordPlaceholder: '******',
    passwordMatch: 'A perfect match',
    passwordMismatch: "Password doesn't match",
    userExistsError: 'User already exists',
    registering: 'Registering...',
    termsAndConditions: 'I have read and agree to the ',
    toc: 'terms & conditions',
    register: 'Register',
  },
  bn: {
    fullNameLabel: 'পুরো নাম',
    fullNamePlaceholder: 'সুমিত সাহা',
    emailLabel: 'ইমেল ঠিকানা',
    emailPlaceholder: 'sumitsaha@gmail.com',
    passwordLabel: 'পাসওয়ার্ড',
    passwordPlaceholder: '******',
    confirmPasswordLabel: 'পাসওয়ার্ড নিশ্চিত করুন',
    confirmPasswordPlaceholder: '******',
    passwordMatch: 'একটি নিখুঁত ম্যাচ',
    passwordMismatch: 'পাসওয়ার্ড মিলছে না',
    userExistsError: 'ব্যবহারকারী ইতিমধ্যে বিদ্যমান',
    registering: 'নিবন্ধন হচ্ছে...',
    termsAndConditions: 'আমি পড়েছি এবং ',
    toc: 'শর্তাবলীতে সম্মত হয়েছি',
    register: 'নিবন্ধন করুন',
  },
}

export const FURNITURE_TEXTS_BN = [
  'এই খাটটা খুব আরামদায়ক।',
  'আমাদের ডাইনিং টেবিলটা খুব বড়।',
  'নতুন সোফাটা দেখতে দারুণ।',
  'বইয়ের তাকটা বেশ মজবুত।',
  'এই আলমারিতে অনেক জামা রাখা যায়।',
  'চেয়ারগুলো খুব আরামদায়ক।',
  'আমার পড়ার টেবিলটা ছোট কিন্তু সুন্দর।',
  'রান্নাঘরের ক্যাবিনেটগুলো খুব সুবিধাজনক।',
  'বাড়ির বারান্দার জন্য এই দোলনা দারুণ।',
  'লিভিং রুমের টিভি ইউনিটটা আধুনিক ডিজাইনের।',
  'আমার বেডসাইড টেবিলটা খুব উপকারী।',
]
export const FURNITURE_TEXTS_EN = [
  'This bed is very comfortable.',
  'Our dining table is very large.',
  'The new sofa looks great.',
  'The bookshelf is quite sturdy.',
  'A lot of clothes can be stored in this wardrobe.',
  'The chairs are very comfortable.',
  'My study table is small but beautiful.',
  'The kitchen cabinets are very convenient.',
  'This swing is great for the house balcony.',
  'The TV unit in the living room is of modern design.',
  'My bedside table is very useful.',
]
