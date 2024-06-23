// validates the user input in login and register page

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateInput = (user) => {
  let errorObj = {
    errors: {},
  }

  // push the errors if there is any
  for (const [key, value] of Object.entries(user)) {
    if (value === '') {
      errorObj.errors[key] = `${
        key === 'fname' ? 'First name' : key === 'lname' ? 'Last name' : key
      } cannot be empty`
    }
    // check if email is valid
    if (key === 'email') {
      if (!emailRegex.test(value)) {
        errorObj = {
          ...errorObj,
          errors: {
            ...errorObj.errors,
            email: 'Invalid email',
            hasError: true,
          },
        }
      }
    }
  }

  return errorObj
}
