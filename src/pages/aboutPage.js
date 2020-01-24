import React, { Component } from 'react';
import AboutKutubuku from '../components/aboutKutubuku';
import Header from '../components/header';
import Footer from '../components/footer';


class AboutPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <AboutKutubuku/>
        <Footer/>
      </div>
    );
  }
}

export default AboutPage;
