export const makeHTMLEmail = (
  userDetails: any,
  items: IProductWithQuantity[],
  cost: number
) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Thank you for your purchase!</h2>
      <p>Dear ${userDetails.firstName} ${userDetails.lastName},</p>
      <p>Thank you for your order. Here are the details of your purchase:</p>
      <h3>Shipping Information</h3>
      <p>
        <strong>City:</strong> ${userDetails.city} <br />
        <strong>Address:</strong> ${userDetails.address} <br />
        <strong>Phone:</strong> ${userDetails.phone}
      </p>
      <h3>Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Category</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.product_name
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.quantity
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${(
                item.price * item.quantity
              ).toFixed(2)}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.category
              }</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <h3>Total Cost</h3>
      <p style="font-size: 18px; font-weight: bold;">$${cost}</p>
      <p>We hope to see you again soon!</p>
      <p>Best regards,</p>
      <p>Your Company Name</p>
    </div>
  `
}
