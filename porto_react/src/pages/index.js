import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import AllBooks from '../components/displayAllBooks';


class HomePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Carousel/>
        <AllBooks/>
      <p></p>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;
