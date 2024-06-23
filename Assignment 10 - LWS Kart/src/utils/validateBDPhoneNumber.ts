const validateBDPhoneNumber = (num: string) => {
  return String(num).match(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
}
export default validateBDPhoneNumber
