import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import photo1 from '../images/employee.png';
import photo2 from '../images/books.png';
import photo3 from '../images/supermarket.png';
import photo4 from '../images/buy.png';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../store';
import swal from 'sweetalert';

class ProfileUser extends React.Component {
    // Function for Admin sign out
    handleSignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('is_login');
        await localStorage.removeItem('email');
        swal("Terima Kasih!", "Silakan login kembali untuk mengakses data!", "success");
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
                            <div className='col-md-1'>
                            </div>
                            <div className='col-md-6'>
                                <h3 className='border-user1'>Hai, ADMIN</h3>
                            </div>
                            <div className='col-md-4 button-logout'>
                                <label>
                                    <button type="button" class="btn btn-danger" onClick={this.handleSignOut}>Log Out</button>
                                </label>
                            </div>
                        </div>
                    </div>
 
                    <div className='container' style={{marginTop:'20px', marginLeft:'105px'}}>
                        <div className='row'>
                            <div className='btn btn-secondary col-md-2'><Link to='/users' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>User <img style={{width:'30px'}} src={photo1} alt='' ></img> </p></Link>
                            </div>
                            <div className='col-md-1'></div>
                            <div className='btn btn-light col-md-2'><Link to='/books' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Produk <img style={{width:'30px'}} src={photo2} alt=''></img> </p></Link>
                            </div>
                            <div className='col-md-1'></div>
                            <div className='btn btn-warning col-md-2'><Link to='/carts' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Cart <img style={{width:'30px'}} src={photo3} alt=''></img> </p></Link>
                            </div>
                            <div className='col-md-1'></div>
                            <div className='btn btn-dark col-md-2' ><Link to='/payments' style={{textDecoration:'none', color:'white'}}>
                                <p style={{paddingTop:'15px'}}>Transaksi <img style={{width:'30px'}} src={photo4} alt=''></img> </p></Link>
                            </div>
                            <div className='col-md-1'></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect("Bearer, userById, email",actions)(withRouter(ProfileUser));