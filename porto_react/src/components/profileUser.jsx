import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

const allGenres = ['Romantis','Sejarah','Teenlit','Drama','Fantasi','Chicklit','Komedi','Misteri','Songlit','Thriller','Fan-Fiction','Dewasa','Horor','Petualangan','Metropop']

class ProfileUser extends React.Component {
    render() {
        if (localStorage.getItem('token') == null){
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (
                <div>
                    <div className='container user-full-name container-user'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h3 className='border-user'>Hai, USER FULL NAME</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container alamat-email container-user'>
                        <div className='row'>
                            <div className='col-md-12'>
                                Alamat Email : User@email.com
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
                                        <button type="button" class="btn btn-success">Log Out</button>
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

export default connect("Bearer, email, kata_sandi, is_login",actions)(withRouter(ProfileUser));