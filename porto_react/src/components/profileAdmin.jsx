import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions } from '../store'

class ProfileUser extends React.Component {
    // Function for Admin sign out
    handleSignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('is_login');
        await localStorage.removeItem('email');
        this.props.history.push("/");
    };
    render() {
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
                            <div className='col-md-4 button-logout'>
                                <label>
                                    <button type="button" class="btn btn-success" onClick={this.handleSignOut}>Log Out</button>
                                </label>
                            </div>
                        </div>
                    </div>
 
                    <div className='container' style={{marginTop:'20px', marginLeft:'105px'}}>
                        <div className='row'>
                            <div className='btn btn-success col-md-2'><Link to='/users' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Semua User</p></Link>
                            </div>
                            <div className='col-md-1'></div>
                            <div className='btn btn-success col-md-2'><Link to='/books' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Semua Produk</p></Link>
                            </div>
                            <div className='col-md-1'></div>
                            <div className='btn btn-success col-md-2'><Link to='/carts' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Semua Cart</p></Link>
                            </div>
                            <div className='col-md-1'></div>
                            <div className='btn btn-success col-md-2' ><Link to='/payments' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Semua Transaksi</p></Link>
                            </div>
                            <div className='col-md-1'></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect("Bearer, userById, email, kata_sandi, is_login",actions)(withRouter(ProfileUser));