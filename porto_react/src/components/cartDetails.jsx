import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import photo from '../images/book.jpg';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

const perulangan = ['1','2','3','4']

class CartDetail extends React.Component {

    componentDidMount = () => {
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
                store.setState({ carts: response.data, isLoading:false})
                console.log(response.data)
                return response
            })
            .catch(function (error){
                store.setState({ isLoading: false})
            })
    };

    render() {
        const { carts } = this.props
        const listInCart = carts.filter(item => {
            if (item.email == localStorage.getItem('email') && item.foto_buku !== null && item.judul !== null && item.harga !== null && item.status_cart == false && item.berat !== null) {
                return item;
            }
            return false
        })
        console.log('isi CART', listInCart)
        return (
            <div>
                <div className='container' style={{paddingTop:'120px'}}>
                    <div className='row'>
                        {listInCart.map((content,i)=>
                        <div>
                            <div className='col-md-12 cart-book-detail'>
                                <div className='col-sm-3'>
                                    <img style={{width:'100%'}} src={content.foto_buku}></img>
                                </div>
                                <div className='col-sm-5'>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart1'>
                                            {content.judul}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart2'>
                                            {content.penulis}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart3'>
                                            {content.jenis_cover}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart4'>
                                            Rp {content.harga}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className='col-sm-12' style={{fontSize: '11px', marginBottom: '10px'}}>Tuliskan Jumlah Buku</div>
                                    <div>
                                    <textarea name="jumlah" pattern="[1-9]{1,30}" id="jumlah"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-1'>
                            </div>
                        </div>
                        )}
                        <div>
                            <div className='col-md-12' style={{ paddingTop:'25px', marginBottom: '25px'}}>
                                <label>
                                    <button type="button" class="btn btn-success">Finalisasi Jumlah Beli</button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default CartDetail;
export default connect("carts, book_id, token, is_login, judul, penulis, status, harga, foto_buku",actions)(withRouter(CartDetail));