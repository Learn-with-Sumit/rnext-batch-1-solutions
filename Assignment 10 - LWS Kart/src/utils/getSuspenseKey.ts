export const getSuspenseKey = (searchParams: IShopSearchParams) =>
  Object.values(searchParams).join(', ')
