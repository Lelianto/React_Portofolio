import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

class CartDetail extends React.Component {
    // Function to get expedetion price
    doExpeditionPrice = async () => {
        store.setState({
            'address':false
        })
        await this.props.CalculateExpeditionPrice()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/expedition");
        }
    }

    render() {
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
                <div className='container top-body-cart1' >
                    <div className='row'>
                        <div className='col-md-12'>
                            <form onSubmit={e => e.preventDefault()}>
                                <h3 style={{textAlign:"left", fontWeight:'bold', marginBottom:'20px', paddingLeft:'52px'}}>
                                    Alamat Pengiriman
                                </h3>
                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition1" 
                                className="" 
                                name="streetName" 
                                placeholder="Masukkan Nama Jalan"
                                onChange={e => this.props.changeInput(e)} />
                                
                                <input
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition2" 
                                className="" 
                                name="rtRw" 
                                placeholder="Masukkan RT/RW"
                                onChange={e => this.props.changeInput(e)} />

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition3" 
                                className="" 
                                name="village" 
                                placeholder="Masukkan Nama Kelurahan"
                                onChange={e => this.props.changeInput(e)} />

                                <input
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition4" 
                                className="" 
                                name="region" 
                                placeholder="Masukkan Nama Kecamatan"
                                onChange={e => this.props.changeInput(e)} />

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition5" 
                                className="" 
                                name="cityState" 
                                placeholder="Masukkan Nama Kota atau Kabupaten"
                                onChange={e => this.props.changeInput(e)} required/>

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition6" 
                                className="" 
                                name="province" 
                                placeholder="Masukkan Nama Provinsi"
                                onChange={e => this.props.changeInput(e)} />

                                <input
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition7" 
                                className="" 
                                name="postalCode" 
                                placeholder="Masukkan Kode Pos"
                                onChange={e => this.props.changeInput(e)} />

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition8" 
                                className="" 
                                name="phoneNumber" 
                                placeholder="Masukkan Nomor Telepon"
                                onChange={e => this.props.changeInput(e)} />

                                <div>
                                    <div style={{ paddingTop:'25px', marginBottom: '25px'}}>
                                        <label>
                                            <button type="button" class="btn btn-success" onClick={this.doExpeditionPrice}>Hitung Ongkir</button>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("carts, token, isLoading",actions)(withRouter(CartDetail));