import { makeHTMLEmail } from '@/utils/makeHTMLEmail'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  userDetails: any,
  items: IProductWithQuantity[],
  cost: number
) => {
  // this will create the email to send
  const message = makeHTMLEmail(userDetails, items, cost)

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: userDetails?.email,
      subject: 'Purchase Successful',
      html: message,
    })
  } catch (error) {
    throw error
  }
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.BASE_URL}/en/new-password?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your LWSKart Password',
    html: `<p> Click <a href="${resetLink}">here</a> to reset your password</p>`,
  })
}

export const sendPasswordResetSuccessEmail = async (email: string) => {
  const loginLink = `${process.env.BASE_URL}/login`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'LWSKart password changed',
    html: `<p>Password Changed. Click <a href="${loginLink}">here</a> to login now!</p>`,
  })
}
