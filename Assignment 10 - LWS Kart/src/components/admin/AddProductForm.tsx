'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import AddNewProduct from './AddNewProduct'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAdminProductForm from '@/hooks/admin-hooks/useAdminProductForm'
import { COLORS, SIZES } from '@/utils/constants'
import { UploadButton } from '@/utils/uploadthing'
import { Loader2 } from 'lucide-react'
import { Label } from '../ui/label'

export function AddProductDialog() {
  const {
    setOpen,
    isLocaleBengali,
    onSubmit,
    form,
    register,
    setValue,
    isSubmitting,
    open,
    hasImage,
  } = useAdminProductForm()

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <AddNewProduct onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            {isLocaleBengali ? 'নতুন পণ্য যোগ করুন' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {isLocaleBengali
              ? 'নতুন পণ্য যোগ করতে নিচের বিবরণগুলি পূরণ করুন।'
              : 'Fill in the details below to add a new product.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 max-h-[40rem] overflow-y-auto'
          >
            <FormField
              control={form.control}
              name='product_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isLocaleBengali ? 'পণ্যের নাম' : 'Product Name'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        isLocaleBengali ? 'পণ্যের নাম' : 'Product Name'
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock_count'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isLocaleBengali ? 'স্টক সংখ্যা' : 'Stock Count'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      {...register('stock_count', { valueAsNumber: true })}
                      placeholder={
                        isLocaleBengali ? 'স্টক সংখ্যা' : 'Stock Count'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isLocaleBengali ? 'ব্র্যান্ড' : 'Brand'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isLocaleBengali ? 'ব্র্যান্ড' : 'Brand'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isLocaleBengali ? 'বিভাগ' : 'Category'}
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          placeholder={
                            isLocaleBengali
                              ? 'একটি বিভাগ নির্বাচন করুন'
                              : 'Select a category'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {isLocaleBengali ? 'বিভাগ' : 'Categories'}
                          </SelectLabel>
                          <SelectItem value='Kitchen'>
                            {isLocaleBengali ? 'রান্নাঘর' : 'Kitchen'}
                          </SelectItem>
                          <SelectItem value='Living Room'>
                            {isLocaleBengali ? 'লিভিং রুম' : 'Living Room'}
                          </SelectItem>
                          <SelectItem value='Mattress'>
                            {isLocaleBengali ? 'ম্যাট্রেস' : 'Mattress'}
                          </SelectItem>
                          <SelectItem value='Outdoor'>
                            {isLocaleBengali ? 'বহিরঙ্গন' : 'Outdoor'}
                          </SelectItem>
                          <SelectItem value='Sofa'>
                            {isLocaleBengali ? 'সোফা' : 'Sofa'}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='SKU'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isLocaleBengali ? 'SKU' : 'SKU'}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isLocaleBengali ? 'SKU' : 'SKU'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isLocaleBengali ? 'মূল্য' : 'Price'}</FormLabel>
                  <FormControl>
                    <Input
                      step='0.01'
                      placeholder={isLocaleBengali ? 'মূল্য' : 'Price'}
                      {...field}
                      type='number'
                      {...register('price', { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discountPercentage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isLocaleBengali
                      ? 'ডিসকাউন্ট শতাংশ'
                      : 'Discount Percentage'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      step='0.01'
                      placeholder={
                        isLocaleBengali ? 'ডিসকাউন্ট শতাংশ' : 'Discount Percent'
                      }
                      type='number'
                      {...field}
                      {...register('discountPercentage', {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isLocaleBengali ? 'বিবরণ' : 'Description'}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isLocaleBengali ? 'বিবরণ' : 'Description'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='new_arrival'
              render={({ field }) => (
                <FormItem className='flex justify-between w-fit items-center gap-2'>
                  <FormLabel className='relative top-1'>
                    {isLocaleBengali ? 'নতুন আগমন' : 'New Arrival'}
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      onCheckedChange={(checked) => {
                        checked
                          ? setValue('new_arrival', true)
                          : setValue('new_arrival', false)
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='trending'
              render={({ field }) => (
                <FormItem className='flex justify-between w-fit items-center gap-2'>
                  <FormLabel className='relative top-1'>
                    {isLocaleBengali ? 'ট্রেন্ডিং' : 'Trending'}
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      onCheckedChange={(checked) => {
                        checked
                          ? setValue('trending', true)
                          : setValue('trending', false)
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='size'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isLocaleBengali ? 'আকার' : 'Size'}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          placeholder={
                            isLocaleBengali
                              ? 'একটি আকার নির্বাচন করুন'
                              : 'Select a size'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {isLocaleBengali ? 'আকার' : 'Size'}
                          </SelectLabel>
                          {SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isLocaleBengali ? 'রঙ' : 'Color'}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          placeholder={
                            isLocaleBengali
                              ? 'একটি রঙ নির্বাচন করুন'
                              : 'Select a color'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {COLORS.map((color) => (
                            <SelectItem
                              className='capitalize'
                              key={color}
                              value={color}
                            >
                              {isLocaleBengali ? color : color}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label>{isLocaleBengali ? 'পণ্যের ছবি' : 'Product Image'}</Label>
            <FormField
              control={form.control}
              name='image'
              render={() => (
                <FormItem>
                  <UploadButton
                    endpoint='productImageUploader'
                    onClientUploadComplete={(res) => {
                      setValue('image', res[0].url)
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`)
                    }}
                  />
                  {!hasImage && (
                    <p className='text-red-500 text-xs'>
                      {isLocaleBengali ? 'ছবি প্রয়োজন' : 'Image is required'}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isSubmitting} type='submit'>
                {isSubmitting ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <p>{isLocaleBengali ? 'পণ্য যোগ করুন' : 'Add Product'}</p>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
