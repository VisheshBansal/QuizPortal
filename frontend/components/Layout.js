import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout