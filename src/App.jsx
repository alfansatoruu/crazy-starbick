import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import GaleriUtama from './components/GaleriUtama';
import Loading from './components/Loading_screen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<GaleriUtama />} />
          </Routes>
        </HashRouter>
      )}
    </>
  );
};

export default App;
