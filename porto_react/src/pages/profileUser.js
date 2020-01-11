import React, { Component } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import Profile from '../components/profileUser'


class ProfileUser extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Profile/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default ProfileUser;
