import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Admin from '../components/profileAdmin';
import BookSearch from '../components/adminBookSearch';

class AdminSearchBook extends Component {
  render() {
    if (localStorage.getItem('email')=='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <Admin/>
          <BookSearch/>
        <p></p>
          <div>
            <Footer/>
          </div>
        </div>
      );
    }
  }
}

export default AdminSearchBook;
