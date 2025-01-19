import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GaleriUtama from './components/GaleriUtama';
import Loading from './components/Loading_screen'; // Impor komponen Loading

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  // Efek untuk mengatur durasi loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hentikan loading setelah 3 detik
    }, 5000);

    return () => clearTimeout(timer); // Membersihkan timer
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> // Tampilkan layar loading
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GaleriUtama />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
