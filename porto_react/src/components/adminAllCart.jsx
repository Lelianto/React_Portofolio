import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllCarts extends React.Component {
    
    getAllCart = () => {
        const req = {
            method: "get",
            url: "http://0.0.0.0:1250/cart/allcart",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            params: {
                
            }
            }; 
            console.log(req)
            axios(req)
                .then(function (response) {
                    store.setState({ adminAllCart: response.data, isLoading:false})
                    console.log(response.data)
                    return response
                })
                .catch(function (error){
                    store.setState({ isLoading: false})
                })
    }
    doDelete = async (e) => {
        console.log('isi ID Cart', e)
        store.setState({
            'id_cart': e
        })
        await this.props.deleteCart()
        if (localStorage.getItem('token') !== null){
            this.getAllCart()
            this.props.history.push("/carts");
        }
    }

    componentDidMount = () => {
        this.getAllCart()
    };

    render() {
        const { adminAllCart } = this.props
        console.log('ISI ALL CART', adminAllCart)
        return (
            <div className='container' style={{paddingTop:'110px', fontSize:'12px'}}>
                <div className='row'>
                    <div className='col-md-1' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>ID Cart</div>
                        {adminAllCart.map((cart,i) =>
                            <div className='col-md-12' style={{marginTop:'15px'}}>
                                {cart.id}
                            </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Jumlah Beli</div>
                        {adminAllCart.map((cart,i) =>
                            <div className='col-md-12' style={{marginTop:'15px'}}>
                                {cart.stok}
                            </div>
                        )}
                    </div>
                    <div className='col-md-4' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Judul Buku</div>
                        {adminAllCart.map((cart,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {cart.judul}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>ID Pembeli</div>
                        {adminAllCart.map((cart,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {cart.user_id}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>ID Buku</div>
                        {adminAllCart.map((cart,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {cart.book_id}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Harga</div>
                        {adminAllCart.map((cart,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {cart.harga}
                        </div>
                        )}
                    </div>
                    <div className='col-md-2' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Status</div>
                        {adminAllCart.map((cart,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {cart.status_jual}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Delete</div>
                        {adminAllCart.map((cart,i) =>
                        <button style={{fontSize:'10px',marginTop:'12px'}} onClick={()=>this.doDelete(cart.id)}>
                            Delete
                        </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("adminAllCart, id_cart, token, is_login",actions)(withRouter(AccessAllCarts));