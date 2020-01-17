import React, { Component } from 'react';
import Login from '../components/signin';
import SignUp from '../components/signup';
import '../styles/index.css';

class LoginPage extends Component {
  render() {
    return (
      <div className='bodylogin'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
            <SignUp/>
            </div>
            <div className='col-md-6'>
            <Login/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
