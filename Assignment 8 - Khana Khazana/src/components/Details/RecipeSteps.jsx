const RecipeSteps = ({ recipe }) => {
  const { steps } = recipe

  return (
    <section>
      <div className='container py-12'>
        <h3 className='font-semibold text-xl py-6'>How to Make it</h3>
        <div>
          <div className='step'>
            {steps.map((step, index) => (
              <div
                key={step}
                className={`${
                  index % 2 === 0 ? 'animate-slide-in' : 'animate-slide-in-back'
                }`}
              >
                <h3>Step {index + 1}</h3>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default RecipeSteps
