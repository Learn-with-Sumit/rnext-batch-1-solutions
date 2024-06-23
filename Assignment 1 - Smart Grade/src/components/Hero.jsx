import herog from "/images/hero-graphics.svg";

export default function Hero() {
  return (
    <>
      <section className="bg-[radial-gradient(50%_50%_at_50%_50%,#17956D_0%,#0F684C_100%)] pt-32 pb-20 -mt-[92px] md:-mt-[118px]">
        <div className="container m-auto">
          <div className="grid md:grid-cols-2 items-center w-10/12 mx-auto">
            <img
              className="md:order-2 object-cover ml-auto animate-[animate-updown_5s_ease-in-out_infinite]"
              src={herog}
              width="500px"
              height="500px"
              alt="Banner"
            />
            <div>
              <h1 className="text-4xl lg:text-[56px] font-bold leading-[1.1] mb-8">
                The Future of Learning starts with students at the center!
              </h1>
              <a
                className="px-5 py-2.5 bg-[#038C61] rounded-[44px] hover:bg-[#26634f] hover:font-bold"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
