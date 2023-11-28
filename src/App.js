import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import MainContent from './components/main-conent-components/main-content';
import Footer from './components/footer-components/Footer.component';
import MyNavbar from './components/header-components/navbar-components/Navbar.component';
import About from './components/about-components/About.component';
import Assistent from './components/assistent-components/Assistent.component';
import ChatbotComponent from './components/assistent-components/Chatbot.component';
import "./App.scss"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "English",
    }
  }

  handleLanguageChange = (newLanguage) => {
    this.setState({ language: newLanguage });
  }




  render() {
    return (
      <Router>
        <div className='bg-light App'>
          <MyNavbar
            language={this.state.language}
            handleLanguageChange={this.handleLanguageChange}
          />
          <Routes>
            <Route path="/" element={<MainContent language={this.state.language} />} />
            <Route path="/link2" element={<About language={this.state.language} />} />
            <Route path="/link3" element={<Assistent language={this.state.language} />} />
            <Route path="/service/:title" element={<ChatbotComponent />} />
          </Routes>
          <Footer language={this.state.language} />
        </div>
      </Router>
    );
  }
}

export default App;