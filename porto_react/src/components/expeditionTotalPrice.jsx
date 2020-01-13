import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'
class CartDetailTotalPrice extends React.Component {
    componentDidMount = () => {
        const req = {
            method: "get",
            url: "http://0.0.0.0:1250/cart/total",
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
            }
          };
          console.log(req)
          axios(req)
              .then(function(response) {
                store.setState({
                  "total_price": response.data
                })
                console.log('isi', response.data)
                return response
              })
              .catch(error => {
                return false
          })
    };
    render() {
        const { total_price, ongkos_kirim } = this.props
        const total_payment = total_price + ongkos_kirim
        return (
            <div>
                <div className='container' style={{paddingTop:'120px'}}>
                    <div className='col-md-12' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px', textAlign:'left'}} >
                            <div className='col-md-6'>Subtotal</div>
                            <div className='col-md-6'>Rp {total_price}</div>
                        </div>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px', textAlign:'left'}} >
                            <div className='col-md-6'>Ongkos Kirim</div>
                            <div className='col-md-6'>Rp {ongkos_kirim}</div>
                        </div>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px', textAlign:'left'}} >
                            <div className='col-md-6'>Total Bayar</div>
                            <div className='col-md-6'>Rp {total_payment}</div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12' style={{ paddingTop:'55px', marginBottom: '25px'}}>
                                <label>
                                    <button type="button" class="btn btn-success">Bayar</button>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

// export default CartDetailTotalPrice;
export default connect("carts, total_price, ongkos_kirim, token, is_login",actions)(withRouter(CartDetailTotalPrice));