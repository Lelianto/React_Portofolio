import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

class ProfileUser extends React.Component {

    handleSignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('is_login');
        await localStorage.removeItem('email');
        console.warn('cek log out', localStorage.getItem('token'))
        this.props.history.push("/");
    };

    render() {
        const email = localStorage.getItem('email')
        if (localStorage.getItem('token') == null){
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (
                <div>
                    <div className='container user-full-name container-user'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h3 className='border-user'>Hai, ADMIN</h3>
                            </div>
                        </div>
                    </div>
 
                    <div className='container container-user' style={{marginTop:'20px'}}>
                        <div className='row'>
                            <div className='col-md-3'><Link to='/users'>
                                <button>Semua User</button></Link>
                            </div>
                            <div className='col-md-3'><Link to='/books'>
                                <button>Semua Produk</button></Link>
                            </div>
                            <div className='col-md-3'>
                                <button>Semua Cart</button>
                            </div>
                            <div className='col-md-3'>
                                <button>Semua Transaksi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect("Bearer, userById, email, kata_sandi, is_login",actions)(withRouter(ProfileUser));