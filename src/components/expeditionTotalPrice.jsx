import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { store, actions } from '../store';
import axios from 'axios';
import swal from 'sweetalert';

class CartDetailTotalPrice extends React.Component {
    // Function for finalize cart
    doPay = async (totalPayment) => {
        store.setState({
            totalPayment:totalPayment
        })
        await this.props.FinalTransactionPayment()
        if (localStorage.getItem('token') !== null){
            swal("Terima Kasih Telah Berbelanja!", "Silakan lakukan pembayaran Anda!", "success");
            this.props.history.push("/payment");
        }
    }
    // Function to get total price in cart
    componentDidMount = () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/cart/total",
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
            }
          };
          const self = this
          axios(req)
              .then(function(response) {
                store.setState({
                  "totalPrice": response.data,
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
        const { totalPrice, shippingCost } = this.props
        const totalPayment = totalPrice + shippingCost
        if (store.getState().streetName =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().rtRw =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().village =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().region =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().cityState =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().province =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().postalCode =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
        else if (store.getState().phoneNumber =='' && store.getState().address == false){
            return (
                <div className="fadeInDown empty-form">
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
                <div className='container top-body-cart2'>
                    <div className='col-md-12' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px', textAlign:'left'}} >
                            <div className='col-md-6'>Subtotal</div>
                            <div className='col-md-6'>Rp {totalPrice}</div>
                        </div>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px', textAlign:'left'}} >
                            <div className='col-md-6'>Ongkos Kirim</div>
                            <div className='col-md-6'>Rp {shippingCost}</div>
                        </div>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px', textAlign:'left'}} >
                            <div className='col-md-6'>Total Bayar</div>
                            <div className='col-md-6'>Rp {totalPayment}</div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12' style={{ paddingTop:'55px', marginBottom: '25px'}}>
                                <label>
                                    <button type="button" class="btn btn-success"onClick={()=>this.doPay(totalPayment)} disabled={store.getState().address}>Bayar</button>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect("carts, discount, totalPrice, shippingCost, token, isLoading",actions)(withRouter(CartDetailTotalPrice));