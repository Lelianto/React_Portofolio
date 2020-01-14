import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ResultBooks from '../components/displayCategoryResult';
import NoMatch from '../components/noMatch';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react'
import { store, actions } from '../store'


class CategoryPage extends Component {
  render() {
    const { listResults } = this.props
    if( listResults.length == 0) {
      return (
        <div>
          <Header/>
          <NoMatch/>
        <p></p>
          <Footer/>
        </div>
      );
    } else {
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
}

export default connect("listResults, email, is_login",actions)(withRouter(CategoryPage));
