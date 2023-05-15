import "@/styles/globals.css";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Background from "@/components/Background";




function App({ Component, pageProps }) {


  return (
    <>
     <div style={{ width: '100%', height: '100%' }}>
   < Background />
      <NavBar />             
          <Component {...pageProps} />            
      <Footer />
      </div>
    </>
  );
}

export default App;
