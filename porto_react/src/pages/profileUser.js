import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Profile from '../components/profileUser';
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
        <Profile/>
        <OwnBooks/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default ProfileUser;