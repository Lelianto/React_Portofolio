import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import photo from '../images/book.jpg';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

// const perulangan = ['1','2','3','4','5','6','7','8','9','10']

class CartDetail extends React.Component {
    // doTotalPrice = async () => {
    //     await this.props.Calculate()
    //     if (localStorage.getItem('token') !== null){
    //         this.props.history.push("/cart");
    //     }
    // }

    // componentDidMount = () => {
    //     const req = {
    //     method: "get",
    //     url: "http://0.0.0.0:1250/cart/allcart",
    //     headers: {
    //         Authorization: "Bearer " + localStorage.getItem('token')
    //     },
    //     params: {
            
    //     }
    //     }; 
    //     console.log(req)
    //     axios(req)
    //         .then(function (response) {
    //             store.setState({ carts: response.data, isLoading:false})
    //             console.log(response.data)
    //             return response
    //         })
    //         .catch(function (error){
    //             store.setState({ isLoading: false})
    //         })
    // };

    render() {
        // console.log('isi CART', listInCart)
        return (
            <div>
                <div className='container' style={{paddingTop:'120px'}}>
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
                                name="nama_jalan" 
                                placeholder="Masukkan Nama Jalan"
                                onChange={e => this.props.changeInput(e)} />
                                
                                <input
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition2" 
                                className="" 
                                name="rt_rw" 
                                placeholder="Masukkan RT/RW"
                                onChange={e => this.props.changeInput(e)} />

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition3" 
                                className="" 
                                name="kelurahan" 
                                placeholder="Masukkan Nama Kelurahan"
                                onChange={e => this.props.changeInput(e)} />

                                <input
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition4" 
                                className="" 
                                name="kecamatan" 
                                placeholder="Masukkan Nama Kecamatan"
                                onChange={e => this.props.changeInput(e)} />

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition5" 
                                className="" 
                                name="kota_kabupaten" 
                                placeholder="Masukkan Nama Kota atau Kabupaten"
                                onChange={e => this.props.changeInput(e)} required/>

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition6" 
                                className="" 
                                name="provinsi" 
                                placeholder="Masukkan Nama Provinsi"
                                onChange={e => this.props.changeInput(e)} />

                                <input
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition7" 
                                className="" 
                                name="kode_pos" 
                                placeholder="Masukkan Kode Pos"
                                onChange={e => this.props.changeInput(e)} />

                                <input 
                                style={{textAlign:'left'}}
                                type="text" 
                                id="expedition8" 
                                className="" 
                                name="provinsi" 
                                placeholder="Masukkan Nomor Telepon"
                                onChange={e => this.props.changeInput(e)} />

                                <div>
                                    <div style={{ paddingTop:'25px', marginBottom: '25px'}}>
                                        <label>
                                            <button type="button" class="btn btn-success" onClick={this.doTotalPrice}>Hitung Ongkir</button>
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

// export default CartDetail;
export default connect("carts, token, is_login",actions)(withRouter(CartDetail));