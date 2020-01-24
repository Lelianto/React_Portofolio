import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ResultBooks from '../components/displayCategoryResult';
import NoMatch from '../components/noMatch';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react'
import { actions } from '../store'


class CategoryPage extends Component {
  render() {
    const { listCategory } = this.props
    if( listCategory.length === 0) {
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

export default connect("listCategory, email, is_login",actions)(withRouter(CategoryPage));
