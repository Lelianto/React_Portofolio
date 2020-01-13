import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import foto from '../images/fotobank.jpg'

class PaymentConfirm extends React.Component {

    handleSignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('is_login');
        await localStorage.removeItem('email');
        console.warn('cek log out', localStorage.getItem('token'))
        this.props.history.push("/");
    };

    render() {
        const { kode_pemesanan, tanggal_pemesanan, total_pembayaran } = this.props

        if (localStorage.getItem('token') == null){
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (
                <div>
                    <div className='container user-full-name container-user'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h3 className='border-user'>Informasi Pemesanan</h3>
                            </div>
                        </div>
                    </div>
                    <div className='container alamat-email container-user'>
                        <div className='row'>
                            <div className='col-md-6' style={{marginTop:'10px'}}>
                                Kode Pemesanan
                            </div>
                            <div className='col-md-6' style={{marginTop:'10px'}}>
                                {kode_pemesanan}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6' style={{marginTop:'30px'}}>
                                Tanggal Pemesanan
                            </div>
                            <div className='col-md-6' style={{marginTop:'30px'}}>
                                {tanggal_pemesanan}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6' style={{marginTop:'30px'}}>
                                Total Pembayaran
                            </div>
                            <div className='col-md-6' style={{marginTop:'30px'}}>
                                {total_pembayaran}
                            </div>
                        </div>
                        <div className='row' style={{marginTop:'30px'}}>
                            <img style={{width:'80%'}} src={foto}></img>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect("kode_pemesanan, tanggal_pemesanan, total_pembayaran, kata_sandi, is_login",actions)(withRouter(PaymentConfirm));