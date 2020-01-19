import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Profile from '../components/profileUser';
import Transaction from '../components/transactionHistory';
import Admin from '../components/profileAdmin';
import OwnBooks from '../components/displayOwnBook';
import '../styles/loading.css'

class ProfileUser extends Component {
  render() {
    if (localStorage.getItem('email')==='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <Admin/>
        <p></p>
          <div style={{marginTop:'250px'}}>
            <Footer/>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header/>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <Profile/>
              <OwnBooks/>
            </div>
            <div className='col-md-6'>
              <Transaction/>
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

export default ProfileUser;