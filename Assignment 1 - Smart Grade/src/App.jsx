import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StudentTable from "./components/StudentTable";

export default function App() {
  return (
    <>
      <body className="bg-[#172227] font-[Inter] text-white">
        <Header />
        <Hero />
        <StudentTable />
        <Footer />
      </body>
    </>
  );
}
