import React, { Component } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import BookDetail from '../components/bookDetail'


class ProfileUser extends Component {
  render() {
    return (
      <div>
        <Header/>
        <BookDetail/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default ProfileUser;
