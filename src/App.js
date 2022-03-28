import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar/index';
import Footer from './components/layout/Footer'; 
import Projects from './components/pages/Projects';
import Container from './components/layout/Container';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/projetos' element={<Projects />} />
            <Route path='/novo-projeto' element={<NewProject />} />
            <Route path='/projeto/:id' element={<Project />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
