import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import CartDetails from '../components/cartDetails';
import CartDetailTotalPrice from '../components/cartDetailTotalPrice';
import { store } from '../store';

class CartDetail extends Component {
  render() {
    if(store.getState().length_cart>=0){
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
  }
}

export default CartDetail;
