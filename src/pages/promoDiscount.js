import React, { Component } from 'react';
import PromoPage from '../components/promoDiscount';
import Header from '../components/header';
import Footer from '../components/footer';


class DiscountPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <PromoPage/>
        <Footer/>
      </div>
    );
  }
}

export default DiscountPage;
