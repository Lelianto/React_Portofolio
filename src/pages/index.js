import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import AllBooks from '../components/displayAllBooks';
import AdminAllBooks from '../components/displayAllBooksAdmin';


class HomePage extends Component {
  render() {
    if(localStorage.getItem('email')==='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <AdminAllBooks/>
        <p></p>
          <Footer/>
        </div>
      );
    }
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
