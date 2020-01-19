import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

class AccessAllCarts extends React.Component {
    // Fungsi untuk mengambil semua list cart dari database
    getAllCart = () => {
        const req = {
            method: "get",
            url: "http://0.0.0.0:1250/cart/allcart",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    store.setState({ adminAllCart: response.data, isLoading:false})
                    return response
                })
                .catch((error)=>{
                    store.setState({ isLoading: false})
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

    // Fungsi untuk menghapus cart dari database sesuai ID
    doDelete = async (e) => {
        store.setState({
            'id_cart': e
        })
        await this.props.deleteCart()
        if (localStorage.getItem('token') !== null){
            this.getAllCart()
            this.props.history.push("/carts");
        }
    }

    // Untuk menjalankan Fungsi getListCart
    componentDidMount = () => {
        this.getAllCart()
    };

    render() {
        const { adminAllCart } = this.props
        return (
            <div className='container' style={{paddingTop:'50px'}}>
                <div className='row'>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Keranjang</th>
                                <th>ID Pembeli</th>
                                <th>ID Buku</th>
                                <th>Judul Buku</th>
                                <th>Harga</th>
                                <th>Banyak Pembelian</th>
                                <th>Status Jual</th>
                                <th>Hapus Akun</th>				
                            </tr>
                        </thead>
                        <tbody>
                            {adminAllCart.map((cart,i) =>
                            <tr>
                                <td>{cart.id}</td>
                                <td>{cart.user_id}</td>
                                <td>{cart.book_id}</td>
                                <td>{cart.judul}</td>
                                <td>{cart.harga}</td>
                                <td>{cart.stok}</td>
                                <td>{cart.status_jual}</td>
                                <td>
                                    <button style={{fontSize:'10px'}} onClick={()=>this.doDelete(cart.id)}>
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

export default connect("adminAllCart, isLoading , id_cart",actions)(withRouter(AccessAllCarts));