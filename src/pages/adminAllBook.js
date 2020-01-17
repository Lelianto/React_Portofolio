import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Admin from '../components/profileAdmin';
import AllBook from '../components/adminAllBook';

class AdminAllBook extends Component {
  render() {
    if (localStorage.getItem('email')==='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <Admin/>
          <AllBook/>
        <p></p>
          <div>
            <Footer/>
          </div>
        </div>
      );
    }
  }
}

export default AdminAllBook;
