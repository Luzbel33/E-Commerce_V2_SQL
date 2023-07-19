import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes/routes';

function App() {

  return (
    <BrowserRouter>
      <RoutesConfig />
    </BrowserRouter>
  );
}

export default App;
