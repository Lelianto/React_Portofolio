import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css';
import emptylogo from '../images/empty.jpg'
import { withRouter, Link} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

class CartDetail extends React.Component {
    // Function to go to book detail information
    goToBook = async (book_id) => {
        store.setState({ 
            'bookId': book_id
        })
        this.props.history.push("/bookdetail/"+store.getState().bookId);
        }

    // Function to get all cart's content from database
    getAllCart = ()=> {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/cart/allcart",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    console.log(response.data)
                    store.setState({ 
                        carts: response.data, 
                        isLoading:false,
                        'cartContent':true 
                    })
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
        store.setState({
            'userCartId': e,
            "disable" : true
        })
        await this.props.deleteCartItem()
        if (store.getState().lengthCart>0){
            this.getAllCart()
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
            if (item.email === localStorage.getItem('email') && item.foto_buku !== null && item.judul !== null && item.harga !== null && item.status_cart === false) {
                return item;
            }
            return false
        })
        store.setState({
            'lengthCart':listInCart.length,
        })
        if(listInCart.length<1){
            return (
                <div>
                    <div className='container top-body-cart4'>
                        <div className='row' style={{ paddingBottom:'80px', textAlign:'center'}}>
                            <div className='col-md-6'>
                            </div>
                            <div className='col-md-6'>
                                <img style={{width:'70%'}} src={emptylogo} alt=""/>
                                <h3>
                                    Aku kosong...
                                </h3>
                                <h6>
                                    Isi aku dengan buku-buku favoritmu...
                                </h6> 
                            </div>
                            {/* <div className='col-md-2'>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.props.isLoading){
            return (
            <div>
              <body className='top-body-cart3'>
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
          else{
              return (
                  <div>
                      <div className='container top-body-cart'>
                          <div className='row'>
                              <form onSubmit={e => e.preventDefault()}>
                              {listInCart.map((content,i)=>
                              <div className='cart-body'>
                                  <div className='col-12 cart-book-detail'>
                                      <div className='col-sm-3'>
                                          <img style={{width:'100%'}} src={content.foto_buku} alt=''/>
                                      </div>
                                      <div className='col-sm-5 col-8'>
                                          <div className='row'><Link style={{textDecoration:'none', color:'black'}} onClick={event => this.goToBook(content.book_id)}>
                                              <div className='col-sm-12  col-4 detail-book-cart1'>
                                                  {content.judul}
                                              </div></Link>
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
                                              <label for="exampleFormControlSelect1" >Banyak Beli</label>
                                              <input class="form-control" pattern="^[0-9]*$" id={content.id} name='stok' onChange={e => this.props.changeInputCart(e, i, content.harga)}required>
                                              </input>
                                          </div>
                                          <button className='btn' onClick={()=>this.doDeleteCart(content.id)} style={{fontSize:'11px', marginTop:'20px'}}>
                                              Hapus dari Keranjang
                                          </button>
                                      </div>
                                  </div>
                                  <div className='col-md-1'>
                                  </div>
                              </div>
                              )}
                          </form>
                          </div>
                      </div>
                  </div>
              )
          }
    }
}

export default connect("carts, token, isLoading, bookEmptyStock",actions)(withRouter(CartDetail));