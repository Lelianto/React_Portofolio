import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import photo from '../images/book.jpg';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

const perulangan = ['1','2','3','4','5','6','7','8','9','10']

class CartDetail extends React.Component {

    getAllCart = ()=> {
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
    }
    doTotalPrice = async () => {
        await this.props.Calculate()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/cart");
        }
    }

    componentDidMount = () => {
        this.getAllCart()
    };

    render() {
        const { carts } = this.props
        const listInCart = carts.filter(item => {
            if (item.email == localStorage.getItem('email') && item.foto_buku !== null && item.judul !== null && item.harga !== null && item.status_cart == false && item.berat !== null) {
                return item;
            }
            return false
        })
        // console.log('isi CART', listInCart)
        return (
            <div>
                <div className='container' style={{paddingTop:'120px'}}>
                    <div className='row'>
                        <form onSubmit={e => e.preventDefault()}>
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
                                    <div>
                                        <label for="exampleFormControlSelect1">Banyak Pembelian</label>
                                        <select class="form-control" id="exampleFormControlSelect1" name='stok' onChange={e => this.props.changeInput(e)}required>
                                            {perulangan.map((total,i) =>
                                            <option value={total}>{total}</option>
                                            )}
                                        </select>
                                    </div>
                                    <button style={{fontSize:'12px', marginTop:'30px'}}>
                                        Hapus dari Keranjang
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-1'>
                            </div>
                        </div>
                        )}
                        <div>
                            <div className='col-md-12' style={{ paddingTop:'25px', marginBottom: '25px'}}>
                                <label>
                                    <button type="button" class="btn btn-success" onClick={this.doTotalPrice}>Finalisasi Jumlah Beli</button>
                                </label>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

// export default CartDetail;
export default connect("carts, token, is_login",actions)(withRouter(CartDetail));