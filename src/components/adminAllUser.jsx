import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllUser extends React.Component {
    // Fungsi untuk mengambil semua list user dari database
    getAllUser = () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    store.setState({ allUser: response.data, isLoading:false})
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
                        case 422 :
                            self.props.history.push('/422')
                            break
                        case 500 :
                            self.props.history.push('/500')
                            break
                        default :
                            break
                    }
                })
    }

    // Fungsi untuk menghapus user dari database sesuai ID
    doDelete = async (e) => {
        store.setState({
            'userId': e
        })
        await this.props.deleteUser()
        if (localStorage.getItem('token') !== null){
            this.getAllUser()
            this.props.history.push("/users");
        }
    }

    // Untuk menjalankan Fungsi getAllUser
    componentDidMount = () => {
        this.getAllUser()
    };

    render() {
        const { allUser } = this.props
        return (
            <div className='container' style={{paddingTop:'50px'}}>
                <div className='row'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID User</th>
                                <th>Nama Lengkap</th>
                                <th>Email User</th>
                                <th>Hapus Akun</th>				
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((user,i) =>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.nama_lengkap}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className='btn btn-danger' style={{fontSize:'10px'}} onClick={()=>this.doDelete(user.id)}>
                                Delete
                                    </button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect("allUser, isLoading",actions)(withRouter(AccessAllUser));