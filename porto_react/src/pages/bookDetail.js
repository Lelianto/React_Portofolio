import React, { Component } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import BookDetails from '../components/bookDetails'

class BookDetail extends Component {
  render() {
    return (
      <div>
        <Header/>
        <BookDetails/>
      <p></p>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default BookDetail;
