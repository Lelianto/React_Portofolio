import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css';
import emptylogo from '../images/empty.jpg'
import { withRouter, Link} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

const perulangan = ['1','2','3','4','5','6','7','8','9','10']

class CartDetail extends React.Component {
    // Function to get all cart's content from database
    getAllCart = ()=> {
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
                    store.setState({ carts: response.data, isLoading:false})
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
                            self.props.history.push('/login')
                            break
                        case 500 :
                            self.props.history.push('/500')
                            break
                        default :
                            break
                    }
                })
    }

    // Function to delete product in cart by ID (from database)
    doDeleteCart = async (e) => {
        console.log('isi target e', e)
        store.setState({
            'cart_id': e
        })
        await this.props.deleteCartItem()
        if (localStorage.getItem('token') !== null){
            this.getAllCart()
            this.props.history.push("/cart");
        }
    }

    // Function to get total price and display it into cart price
    doTotalPrice = async () => {
        await this.props.updateBuy()
        await this.props.Calculate()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/cart");
        }
    }

    // Function to execute getAllCart
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
        if(listInCart.length<1){
            localStorage.setItem("cart_content", false)
            return (
                <div>
                    <div className='container'>
                        <div className='row' style={{paddingTop:'120px'}}>
                            <div className='col-md-4'>
                            </div>
                            <div className='col-md-4'>
                                <img style={{width:'100%'}} src={emptylogo} alt=""/>
                            </div>
                            <div className='col-md-4'>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if(this.props.isLoading){
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
                                <div className='col-sm-3' style={{fontSize:'15px'}}>
                                    <div>
                                        Telah Ditambahkan
                                    </div>
                                    <div style={{fontWeight:'bold'}}>
                                        {content.stok} Buku
                                    </div>
                                    <div>
                                        <label for="exampleFormControlSelect1" style={{paddingTop:'50px'}}>Pembarui Jumlah</label>
                                        <select class="form-control" id={content.id} name='stok' onChange={e => this.props.changeInputCart(e)}required>
                                            {perulangan.map((total,i) =>
                                            <option id={content.id}  value={total}>{total}</option>
                                            )}
                                        </select>
                                    </div>
                                    <button className='btn' onClick={()=>this.doDeleteCart(content.id)} style={{fontSize:'12px', marginTop:'20px'}}>
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

export default connect("carts, token, is_login, isLoading",actions)(withRouter(CartDetail));