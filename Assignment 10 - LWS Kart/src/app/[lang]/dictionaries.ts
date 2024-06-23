import 'server-only'

export type Locale = keyof typeof dictionaries

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  bn: () => import('./dictionaries/bn.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  locale === 'en' ? dictionaries.en() : dictionaries.bn()
