import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import '../styles/loading.css';
import photo from '../images/books.png';
import photo1 from '../images/exit.png';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { store, actions } from '../store';
import axios from 'axios';
import swal from 'sweetalert';

class ProfileUser extends React.Component {
    // Function for user sign out
    handleSignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('is_login');
        await localStorage.removeItem('email');
        swal("Terima Kasih!", "Silakan login kembali untuk berburu buku!", "success");
        this.props.history.push("/");
    };

    // Function to get user data for profile
    componentDidMount = () => {
        const req = {
        method: "get",
        url: store.getState().baseUrl+"/user/profile",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
        }; 
        const self = this
        axios(req)
            .then(function (response) {
                store.setState({ 
                    userData: response.data, 
                    isLoading:false, 
                    validasiPostBuku: false, 
                    validasiUpdateBuku: false
                })
                return response
            })
            .catch((error)=>{
                store.setState({ 
                    isLoading: false
                })
                switch (error.response.status) {
                    case 401 :
                        self.props.history.push('/401')
                        break
                    case 403 :
                        self.props.history.push('/403')
                        break
                    case 404 :
                        self.props.history.push('/404')
                        break
                    case 500 :
                        self.props.history.push('/500')
                        break
                    default :
                        break
                }
            })
    };

    render() {
        const { userData, isLoading } = this.props
        if(isLoading){
            return (
            <div>
              <body style={{paddingTop:'200px'}}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-5'>
                  </div>
                  <div className='col-md-2'>
                    <div class="loader"></div>
                  </div>
                  <div className='col-md-5'>
                  </div>
                </div>
               
              </div>
            </body>
            </div>
            )
          }
        if (localStorage.getItem('token') == null){
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (
                <div>
                    <div className='container top-body-user user-full-name'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h3 style={{textAlign:'left'}} className='border-user1'>Hai, {userData.nama_lengkap}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container alamat-email'>
                        <div className='row'>
                            <div style={{textAlign:'left'}} className='col-md-11 col-sm-12'>
                                {userData.email}
                            </div>
                        </div>
                    </div>   
                    <div className='container'>
                        <div className='row space-under-button'>
                            <div className='col-md-2 col-sm-12 button-sell'>
                                <label>
                                    <Link to='/sell'>
                                        <button type="button" class="btn btn-info">Jual Buku <img style={{width:'25px'}} src={photo} alt=''></img> </button>
                                    </Link>
                                </label>
                            </div>

                            <div className='col-md-2 col-sm-12 button-logout'>
                                <label>
                                    <button type="button" class="btn btn-danger" onClick={this.handleSignOut}>Log Out <img style={{width:'25px'}} src={photo1} alt=''></img></button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect("userData, userById, email, isLoading",actions)(withRouter(ProfileUser));