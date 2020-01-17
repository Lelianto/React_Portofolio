import React, { Component } from 'react';
import Header from '../components/headerFix'
import Footer from '../components/footer'
import PaymentConfirm from '../components/paymentConfirm'


class PaymentConfirmation extends Component {
  render() {
    return (
      <div>
        <Header/>
        <PaymentConfirm/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default PaymentConfirmation;
