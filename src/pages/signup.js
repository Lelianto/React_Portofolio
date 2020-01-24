import React, { Component } from 'react';
import SignUp from '../components/signup';
import '../styles/index.css';

class SignUpPage extends Component {
  render() {
    return (
      <div className='bodylogin'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
            <SignUp/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
