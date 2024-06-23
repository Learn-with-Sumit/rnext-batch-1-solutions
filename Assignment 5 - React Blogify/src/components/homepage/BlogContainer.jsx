const BlogContainer = ({ children }) => {
  return (
    <main>
      {/* Begin Blogs */}
      <section>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}
export default BlogContainer
