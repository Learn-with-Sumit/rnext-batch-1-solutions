function layout({ children }) {
  return (
    <>
      {children}
      <section className="bg-[#ced3ca] py-5 lg:py-16">
        <div className="w-10/12 mx-auto lg:w-4/12">
          <h1 className="my-5 font-serif text-xl italic text-center lg:text-3xl">
            Get the inside scoop
          </h1>
          <p className="text-sm text-center lg:text-base">
            Sign up for new product drops, behind-the-scenes content, and
            monthly `&quot;`5 Things I`&apos;`m Digging`&quot;` emails
          </p>
          <form action="#" className="mb-5">
            <input
              type="text"
              className="w-full p-3 mt-10 border border-black focus:outline-none"
              placeholder="Enter your email"
            />
            <button className="w-full bg-[#1a1a1a] hover:bg-[#3a3a3a] text-center py-2 mt-2 text-white">
              See what we`&apos;`re doing
            </button>
          </form>
        </div>
      </section>
      <footer className="flex flex-wrap items-center justify-between w-11/12 py-10 mx-auto lg:w-10/12 max-w-7xl lg:py-16">
        <div className="w-6/12 lg:w-3/12">
          <p>Customer Service</p>
          <button className="block mt-2">Help/FAQ</button>
          <button className="block mt-2">Returns & Exchanges</button>
          <button className="block mt-2">Sizing</button>
          <button className="block mt-2">Gift Cards</button>
          <button className="block mt-2">Contact Us</button>
        </div>
        <div className="w-6/12 lg:w-3/12">
          <p>Customer Service</p>
          <button className="block mt-2">Help/FAQ</button>
          <button className="block mt-2">Returns & Exchanges</button>
          <button className="block mt-2">Sizing</button>
          <button className="block mt-2">Gift Cards</button>
          <button className="block mt-2">Contact Us</button>
        </div>
        <div className="w-full mt-10 lg:w-6/12 lg:mt-1">
          <div className="flex items-center justify-end gap-5">
            <div className="lg:w-[250px]">
              <span className="block text-center lg:text-right">
                © LWS Shop Center 2024
              </span>
              <p className="mt-2 text-center lg:text-right">
                All images and content may not be used without permission
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default layout;
