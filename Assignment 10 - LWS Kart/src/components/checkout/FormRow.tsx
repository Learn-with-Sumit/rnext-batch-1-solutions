import { useController } from 'react-hook-form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const FormRow = ({ form, label, name, placeholder }: IFormRowProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: form.control,
  })

  return (
    <div>
      <Label htmlFor={name} className='text-gray-600'>
        {label} {<span className='text-primary'>*</span>}
      </Label>
      <Input
        {...field}
        type={
          ['phone', 'payment', 'cvv'].indexOf(name) >= 0 ? 'number' : 'text' // for phone, payment, cvv -> type will be number
        }
        placeholder={placeholder}
        className='input-box'
      />
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  )
}

export default FormRow
