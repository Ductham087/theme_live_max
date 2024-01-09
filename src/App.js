import React from'react';
//rotas
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
//componentes
import NotFound from './components/NotFound';
import LiveComponent from './components/Live';
import FormComponent from './components/FormComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />

          <Route path='/live' element={<LiveComponent />} />
          <Route path='/form' element={<FormComponent />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;