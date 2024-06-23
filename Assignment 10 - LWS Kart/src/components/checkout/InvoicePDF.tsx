import { INVOICE_STYLES } from '@/utils/constants'
import { Document, Font, Page, Text, View } from '@react-pdf/renderer'

Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2',
})

const InvoiceDocument = ({ user, orders, total }: IInvoiceDocument) => (
  <Document>
    <Page style={INVOICE_STYLES.page}>
      <View style={INVOICE_STYLES.section}>
        <Text style={INVOICE_STYLES.header}>LWS-Kart</Text>
      </View>
      <View style={INVOICE_STYLES.section}>
        <Text style={INVOICE_STYLES.sectionTitle}>Customer Details</Text>
        <Text style={INVOICE_STYLES.text}>
          Name: {`${user?.firstName} ${user?.lastName}`}
        </Text>
        <Text style={INVOICE_STYLES.text}>City: {user?.city}</Text>
        <Text style={INVOICE_STYLES.text}>Address: {user?.address}</Text>
        <Text style={INVOICE_STYLES.text}>Phone: {user?.phone}</Text>
      </View>
      <View style={INVOICE_STYLES.section}>
        <Text style={INVOICE_STYLES.sectionTitle}>Your Orders</Text>
        {orders?.map((order: IProductWithQuantity) => (
          <View key={order?._id} style={INVOICE_STYLES.orderItem}>
            <Text style={INVOICE_STYLES.text}>
              Product: {order?.product_name}
            </Text>
            <Text style={INVOICE_STYLES.text}>Quantity: {order?.quantity}</Text>
            <Text style={INVOICE_STYLES.text}>
              Price: {(order?.price * order?.quantity).toFixed(2)}
            </Text>
            <Text style={INVOICE_STYLES.text}>Category: {order?.category}</Text>
          </View>
        ))}
        <Text style={INVOICE_STYLES.total}>Total: {total ?? 0}</Text>
      </View>
    </Page>
  </Document>
)

export default InvoiceDocument
