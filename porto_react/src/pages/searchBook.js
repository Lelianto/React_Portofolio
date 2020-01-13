import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ResultBooks from '../components/displaySearchResult';


class SearchPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <ResultBooks/>
      <p></p>
        <Footer/>
      </div>
    );
  }
}

export default SearchPage;
