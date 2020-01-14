import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

const allGenres = ['Romantis','Sejarah','Teenlit','Drama','Fantasi','Chicklit','Komedi','Misteri','Songlit','Thriller','Fan-Fiction','Dewasa','Horor','Petualangan','Metropop']

class ProfileUser extends React.Component {

    handleSignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('is_login');
        await localStorage.removeItem('email');
        console.warn('cek log out', localStorage.getItem('token'))
        this.props.history.push("/");
    };

    componentDidMount = () => {

        const req = {
        method: "get",
        url: "http://0.0.0.0:1250/user/profile",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        params: {
            
        }
        }; 
        console.log(req)
        axios(req)
            .then(function (response) {
                store.setState({ userData: response.data, isLoading:false})
                console.log(response.data)
                return response
            })
            .catch(function (error){
                store.setState({ isLoading: false})
            })
    };

    render() {
        const { userData } = this.props
        if (localStorage.getItem('token') == null){
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (
                <div>
                    <div className='container user-full-name container-user'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h3 className='border-user'>Hai, {userData.nama_lengkap}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container alamat-email container-user'>
                        <div className='row'>
                            <div className='col-md-12'>
                                Alamat email : {userData.email}
                            </div>
                        </div>
                    </div>
                    <div className='container alamat-email container-user'>
                        <div className='row'>
                            <div className='col-md-12'>
                                Pilih Genre Favoritmu :
                            </div>
                        </div>
                    </div>
                    <div className='container container-user'>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className='row all-genres-checkbox'>
                                {allGenres.map((genre,index) =>
                                    <div className='col-md-4'>
                                        <label>
                                            <input type="checkbox" name="genre" className='list-genre' value={genre}/>{genre}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className='row space-under-button'>
                                <div className='col-md-4'>
                                    <label>
                                        <button type="button" class="btn btn-success">Success</button>
                                    </label>
                                </div>
                                <div className='col-md-4'>
                                    <label>
                                        <Link to='/sell'>
                                            <button type="button" class="btn btn-success">Jual Buku</button>
                                        </Link>
                                    </label>
                                </div>
                                <div className='col-md-4 button-logout'>
                                    <label>
                                        <button type="button" class="btn btn-success" onClick={this.handleSignOut}>Log Out</button>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default connect("userData, userById, email, kata_sandi, is_login",actions)(withRouter(ProfileUser));