import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Profile from '../components/profileUser';
import Admin from '../components/profileAdmin';
import AllCart from '../components/adminAllCart';

class AdminAllCart extends Component {
  render() {
    if (localStorage.getItem('email')=='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <Admin/>
          <AllCart/>
        <p></p>
          <div>
            <Footer/>
          </div>
        </div>
      );
    }
  }
}

export default AdminAllCart;
