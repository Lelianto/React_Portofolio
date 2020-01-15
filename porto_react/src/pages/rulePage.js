import React, { Component } from 'react';
import RuleInUs from '../components/ruleInUs';
import Header from '../components/header';
import Footer from '../components/footer';


class RulePage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <RuleInUs/>
        <Footer/>
      </div>
    );
  }
}

export default RulePage;
