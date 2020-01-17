import React, { Component } from 'react';
import Header from '../components/headerFix';
import Footer from '../components/footer';
import Address from '../components/expeditionAddress';
import ExpeditionPrice from '../components/expeditionTotalPrice';

class ExpeditionDetail extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <Address/>
                </div>
                <div className='col-md-4'>
                    <ExpeditionPrice />
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

export default ExpeditionDetail;
