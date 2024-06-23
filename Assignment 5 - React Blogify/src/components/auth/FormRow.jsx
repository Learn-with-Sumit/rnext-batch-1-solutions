const FormRow = ({ label, children, htmlFor, error }) => {
  return (
    <div className='mb-6'>
      {label && (
        <label htmlFor={htmlFor} className='block mb-2'>
          {label}
        </label>
      )}
      {children}
      {Boolean(error) && (
        <div role='alert' className='text-red-600'>
          {error.message}
        </div>
      )}
    </div>
  )
}
export default FormRow
