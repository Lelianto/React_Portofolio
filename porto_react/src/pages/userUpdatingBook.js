import React, { Component } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import UserUpdate from '../components/userUpdateBook'

class UserUpdateBookPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <UserUpdate/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default UserUpdateBookPage;
