import React from 'react';
import MainContent from './components/main-conent-components/main-content';
import Header from './components/header-components/Header.component';
import Footer from './components/footer-components/Footer.component';
import MyNavbar from './components/header-components/navbar-components/Navbar.component';

import "./App.scss"


class App extends React.Component {

  render() {
    return (
      <div className='bg-light App'>
        <MyNavbar />
        <Header />
        <MainContent />
        <Footer />
      </div>
    );
  }

}

export default App;