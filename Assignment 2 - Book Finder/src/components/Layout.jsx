import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="my-10 lg:my-14">{children}</main>
      <Footer />
    </>
  );
}
