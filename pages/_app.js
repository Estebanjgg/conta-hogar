import "@/styles/globals.css";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';


function Background() {
  const [index, setIndex] = useState(0);
  const images = ['https://images4.alphacoders.com/104/1049330.jpg', 'https://images6.alphacoders.com/121/1216721.jpg', 'https://images2.alphacoders.com/100/1007550.jpg', 'https://images.alphacoders.com/101/1011679.jpg', 'https://images4.alphacoders.com/107/1079551.png', 'https://images3.alphacoders.com/726/72695.png', 'https://images3.alphacoders.com/144/144565.jpg', 'https://images3.alphacoders.com/820/82029.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index => (index + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  function handleClick() {
    setIndex(index => (index + 1) % images.length);
  }

  return (
    <div className="background" style={{ backgroundImage: `url(${images[index]})` }} onClick={handleClick}>
      {/* el resto de tu contenido */}
    </div>
  );
}

function App({ Component, pageProps }) {


  return (
    <>
    <Background />
      <NavBar />
             
          <Component {...pageProps} />
            
      <Footer />
    </>
  );
}

export default App;
