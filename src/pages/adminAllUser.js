import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Admin from '../components/profileAdmin';
import AllUser from '../components/adminAllUser';

class AdminAllUser extends Component {
  render() {
    if (localStorage.getItem('email')==='lian@alterra.id'){
      return (
        <div>
          <Header/>
          <Admin/>
          <AllUser/>
        <p></p>
          <div>
            <Footer/>
          </div>
        </div>
      );
    }
  }
}

export default AdminAllUser;
