import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import CartDetails from '../components/cartDetails';
import CartDetailTotalPrice from '../components/cartDetailTotalPrice';

class CartDetail extends Component {
  render() {
    localStorage.setItem("cart_content", true)
    if(localStorage.getItem('cart_content')){
      return (
        <div>
          <Header/>
          <div className='container'>
              <div className='row'>
                  <div className='col-md-8'>
                      <CartDetails/>
                  </div>
                  <div className='col-md-4'>
                      <CartDetailTotalPrice />
                  </div>
              </div>
          </div>
        <p></p>
          <div>
            <Footer/>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header/>
        <div style={{paddingBottom:'100px'}}>
          <CartDetails/>
        </div>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default CartDetail;
