import lws from "/images/lws-logo-en.svg";

export default function Header() {
  return (
    <>
      <nav className="py-6 ">
        <div className="container mx-auto flex items-center justify-between gap-x-6">
          <a href="/">
            <img
              className=" ms-10 h-[40px] hover:scale-105"
              src={lws}
              alt="Lws"
            />
          </a>

          <a
            className=" me-10 flex px-5 py-2 bg-[#172227] rounded-[44px]  hover:bg-[#40835c]"
            href="#"
          >
            Get Admission
          </a>
        </div>
      </nav>
    </>
  );
}
