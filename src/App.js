import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainContent from './components/main-conent-components/main-content';
import Header from './components/header-components/Header.component';
import Footer from './components/footer-components/Footer.component';
import MyNavbar from './components/header-components/navbar-components/Navbar.component';
import About from './components/about-components/About.component';
import Extras from './components/extras-components/Extras.component';
import ChatBotUI from './components/ChatBot.component';
import "./App.scss"

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className='bg-light App'>
          <MyNavbar />
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/link2" element={<About />} />
            <Route path="/link3" element={<Extras />} />
            
          </Routes>
          <ChatBotUI /> 
          <Footer />
        </div>
      </Router>
    );
  }

}

export default App;
