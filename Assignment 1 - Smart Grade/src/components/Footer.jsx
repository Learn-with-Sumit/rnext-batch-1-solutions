export default function Footer() {
  const date = new Date();
  return (
    <>
      <footer className="py-6 md:py-8">
        <div className="container m-auto">
          <p className="text-center text-base text-gray-400">
            Copyright ©{date.getFullYear()} | All rights reserved by Learn with
            Sumit
          </p>
        </div>
      </footer>
    </>
  );
}
