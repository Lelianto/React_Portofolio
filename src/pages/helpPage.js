import React, { Component } from 'react';
import HelpPart from '../components/helpPart';
import Header from '../components/header';
import Footer from '../components/footer';


class HelpPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <HelpPart/>
        <Footer/>
      </div>
    );
  }
}

export default HelpPage;
