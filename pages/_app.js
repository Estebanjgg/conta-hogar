import "@/styles/globals.css";

import Background from "@/components/Background";
import { AuthProvider } from '../components/AuthContext';



function App({ Component, pageProps }) {


  return (
    <AuthProvider>
     <div style={{ width: '100%', height: '100%' }}>
   < Background />
                  
          <Component {...pageProps} />            
     
      </div>
    </AuthProvider>
  );
}

export default App;
