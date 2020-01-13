import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllUser extends React.Component {
    
    componentDidMount = () => {
        const req = {
        method: "get",
        url: "http://0.0.0.0:1250/user",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        params: {
            
        }
        }; 
        console.log(req)
        axios(req)
            .then(function (response) {
                store.setState({ allUser: response.data, isLoading:false})
                console.log(response.data)
                return response
            })
            .catch(function (error){
                store.setState({ isLoading: false})
            })
    };

    render() {
        const { allUser } = this.props
        console.log('ISI ALL USER', allUser)
        return (
            <div className='container' style={{paddingTop:'110px'}}>
                <div className='row'>
                    {allUser.map((user,i) =>
                    <div>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {user.id}
                        </div>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {user.nama_lengkap}
                        </div>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {user.email}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}

// export default AccessAllUser;
export default connect("allUser, token, is_login",actions)(withRouter(AccessAllUser));