import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar/index';
import Footer from './components/layout/Footer'; 
import Projects from './components/pages/Project';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/projetos' element={<Projects />} />
            <Route path='/empresa' element={<Company />} />
            <Route path='/contato' element={<Contact />} />
            <Route path='/novo-projeto' element={<NewProject />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
