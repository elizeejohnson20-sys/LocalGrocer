const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
})

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

async function sendOrderConfirmationEmail({
  to,
  customerName,
  order,
}) {
  const safeCustomerName = escapeHtml(customerName)

  const orderNumber = order._id
    .toString()
    .slice(-8)
    .toUpperCase()

  const safeStatus = escapeHtml(order.status)

  const itemRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            ${escapeHtml(item.name)}
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
            ${escapeHtml(item.quantity)}
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
            ₹${escapeHtml(item.price * item.quantity)}
          </td>
        </tr>
      `
    )
    .join('')

  const safeFullName = escapeHtml(
    order.deliveryAddress.fullName
  )

  const safePhone = escapeHtml(
    order.deliveryAddress.phone
  )

  const safeAddress = escapeHtml(
    order.deliveryAddress.address
  )

  const safeCity = escapeHtml(
    order.deliveryAddress.city
  )

  const safePincode = escapeHtml(
    order.deliveryAddress.pincode
  )

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: `LocalGrocer Order Confirmed #${orderNumber}`,

    text: `
Hello ${customerName},

Thank you for ordering from LocalGrocer.

Order ID: #${orderNumber}
Order Total: ₹${order.totalAmount}
Order Status: ${order.status}

Delivery Address:
${order.deliveryAddress.fullName}
${order.deliveryAddress.address}
${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}

Your order has been successfully placed.

Thank you,
LocalGrocer
    `,

    html: `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#183d30;">
        <div style="padding:24px;background:#16834b;color:white;border-radius:12px 12px 0 0;">
          <h1 style="margin:0;font-size:24px;">LocalGrocer</h1>
          <p style="margin:6px 0 0;">Order Confirmation</p>
        </div>

        <div style="padding:28px;background:#ffffff;border:1px solid #e5ebe6;">
          <h2 style="margin-top:0;">
            Thank you, ${safeCustomerName}!
          </h2>

          <p>
            Your grocery order has been successfully placed.
          </p>

          <div style="margin:22px 0;padding:16px;background:#f3f9f1;border-radius:10px;">
            <strong>Order ID:</strong>
            #${orderNumber}
            <br />
            <strong>Status:</strong>
            ${safeStatus}
          </div>

          <h3>Order Summary</h3>

          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr>
                <th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">
                  Product
                </th>

                <th style="padding:10px;text-align:center;border-bottom:2px solid #ddd;">
                  Qty
                </th>

                <th style="padding:10px;text-align:right;border-bottom:2px solid #ddd;">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              ${itemRows}
            </tbody>
          </table>

          <div style="margin-top:20px;text-align:right;font-size:20px;">
            <strong>
              Total: ₹${escapeHtml(order.totalAmount)}
            </strong>
          </div>

          <h3 style="margin-top:28px;">
            Delivery Details
          </h3>

          <p style="line-height:1.6;">
            <strong>${safeFullName}</strong><br />
            ${safePhone}<br />
            ${safeAddress}<br />
            ${safeCity} - ${safePincode}
          </p>

          <p style="margin-top:30px;color:#718078;">
            Thank you for choosing LocalGrocer.
          </p>
        </div>
      </div>
    `,
  })
}

module.exports = {
  sendOrderConfirmationEmail,
}