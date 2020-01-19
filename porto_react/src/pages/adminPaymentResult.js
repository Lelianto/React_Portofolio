import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Admin from '../components/profileAdmin';
import PaySearch from '../components/adminPaymentSearch';

class AdminAllPayment extends Component {
  render() {
    if (localStorage.getItem('email')=='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <Admin/>
          <PaySearch/>
        <p></p>
          <div>
            <Footer/>
          </div>
        </div>
      );
    }
  }
}

export default AdminAllPayment;
