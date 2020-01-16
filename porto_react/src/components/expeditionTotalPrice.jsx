import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css'
import { withRouter, Link} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios';

import logo from '../images/logo.png';

class CartDetailTotalPrice extends React.Component {
    // Function for finalize cart
    doPay = async () => {
        await this.props.FinalTransactionPayment()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/payment");
        }
    }
    // Function to get total price in cart
    componentDidMount = () => {
        const req = {
            method: "get",
            url: "http://0.0.0.0:1250/cart/total",
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
            }
          };
          const self = this
          axios(req)
              .then(function(response) {
                store.setState({
                  "total_price": response.data,
                  'isLoading':false
                })
                return response
              })
              .catch(error => {
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
    };
    render() {
        console.log('nomor telepon', store.getState().nomor_telepon)
        const { total_price, ongkos_kirim } = this.props
        const total_payment = total_price + ongkos_kirim
        if (store.getState().nama_jalan =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Nama Jalan Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        } 
        else if (store.getState().rt_rw =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan No RT/RW Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        }
        else if (store.getState().kelurahan =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Kelurahan Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        }
        else if (store.getState().kecamatan =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Kecamatan Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        } 
        else if (store.getState().kota_kabupaten =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Kota/Kabupaten Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        }   
        else if (store.getState().provinsi =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Provinsi Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        }  
        else if (store.getState().kode_pos =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Kode Pos Tempat Tinggal Anda
                        </div>
                        </div>
                    </div>
                    </div>
                )
        } 
        else if (store.getState().nomor_telepon =='' && store.getState().address == false){
            return (
                <div className="fadeInDown" style={{paddingTop:'180px'}}>
                    <div id="formContent">
                        <div className="fadeIn first">
                        <div style={{fontWeight:'bold', padding:'70px'}}>
                            Masukkan Nomor Telepon Penerima
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
                <div className='container' style={{paddingTop:'175px'}}>
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
                                    <button type="button" class="btn btn-success"onClick={this.doPay} disabled={store.getState().address}>Bayar</button>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect("carts, total_price, ongkos_kirim, token, is_login, isLoading",actions)(withRouter(CartDetailTotalPrice));