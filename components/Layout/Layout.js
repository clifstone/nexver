import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <>
    <Header />
      <div className="sitewrapper">
        {children}
      </div>
    <Footer />
    </>
    
  );
};

export default Layout;