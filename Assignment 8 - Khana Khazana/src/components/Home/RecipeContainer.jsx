const RecipeContainer = ({ children }) => {
  return (
    <section className='container py-8'>
      <div className='grid grid-cols-12 py-4'>{children}</div>
    </section>
  )
}
export default RecipeContainer
