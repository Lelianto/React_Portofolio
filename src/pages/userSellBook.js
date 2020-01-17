import React, { Component } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import UserSell from '../components/userUploadBook'

class UserSellBookPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserSell/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default UserSellBookPage;
