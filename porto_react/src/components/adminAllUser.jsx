import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllUser extends React.Component {
    getAllUser = () => {
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
                .catch((error)=>{
                    store.setState({ isLoading: false})
                    switch (error.response.status) {
                        case 401 :
                            this.props.history.push('/401')
                            break
                        case 403 :
                            this.props.history.push('/403')
                            break
                        case 404 :
                            this.props.history.push('/404')
                            break
                        case 422 :
                            this.props.history.push('/422')
                            break
                        case 500 :
                            this.props.history.push('/500')
                            break
                        default :
                            break
                    }
                })
    }
    doDelete = async (e) => {
        console.log('isi ID USER', e)
        store.setState({
            'id_user': e
        })
        await this.props.deleteUser()
        if (localStorage.getItem('token') !== null){
            this.getAllUser()
            this.props.history.push("/users");
        }
    }

    componentDidMount = () => {
        this.getAllUser()
    };

    render() {
        const { allUser } = this.props
        console.log('ISI ALL USER', allUser)
        return (
            <div className='container' style={{fontSize:'12px', paddingTop:'110px'}}>
                <div className='row'>
                    <div className='col-md-2'>
                    </div>
                    <div className='col-md-2' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>ID User</div>
                        {allUser.map((user,i) =>
                            <div className='col-md-12' style={{marginTop:'15px'}}>
                                {user.id}
                            </div>
                        )}
                    </div>
                    <div className='col-md-3' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Nama Lengkap</div>
                        {allUser.map((user,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {user.nama_lengkap}
                        </div>
                        )}
                    </div>
                    <div className='col-md-3' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Alamat Email</div>
                        {allUser.map((user,i) =>
                        <div className='col-md-12' style={{ marginTop:'15px'}}>
                            {user.email}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Delete</div>
                        {allUser.map((user,i) =>
                        <button style={{fontSize:'10px',marginTop:'13px'}} onClick={()=>this.doDelete(user.id)}>
                            Delete
                        </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

// export default AccessAllUser;
export default connect("allUser, token, is_login",actions)(withRouter(AccessAllUser));