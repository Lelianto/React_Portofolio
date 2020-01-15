import React, { Component } from 'react';
import ContactUs from '../components/contactUs';
import Header from '../components/header';
import Footer from '../components/footer';


class ContactPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <ContactUs/>
        <Footer/>
      </div>
    );
  }
}

export default ContactPage;
