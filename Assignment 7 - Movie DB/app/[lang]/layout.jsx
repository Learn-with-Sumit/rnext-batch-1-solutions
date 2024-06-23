import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

const Layout = ({ children, home, movie, params: { lang } }) => {
  return (
    <>
      <Header />
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar lang={lang} />
          {children}
          {home}
          {movie}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
