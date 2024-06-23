import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function OrderCard({ product }: { product: IProductWithQuantity }) {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{product.product_name}</CardTitle>
        <CardDescription>Units purchased: {product.quantity}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Brand</Label>
              <p>{product.brand}</p>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>Price</Label>
              <p>{(product.price * product.quantity).toFixed(2)}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <p>Category: {product.category}</p>
      </CardFooter>
    </Card>
  )
}
