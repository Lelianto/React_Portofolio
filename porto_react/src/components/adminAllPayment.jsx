import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllPayments extends React.Component {
    
    componentDidMount = () => {
        const req = {
        method: "get",
        url: "http://0.0.0.0:1250/payment_confirm/all",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        params: {
            
        }
        }; 
        console.log('',req)
        axios(req)
            .then(function (response) {
                store.setState({ adminAllPayment: response.data, isLoading:false})
                console.log('isi',response.data)
                return response
            })
            .catch(function (error){
                store.setState({ isLoading: false})
            })
    };

    render() {
        const { adminAllPayment } = this.props
        console.log('ISI ALL PAYMENTS', adminAllPayment)
        return (
            <div className='container' style={{paddingTop:'110px', fontSize:'12px'}}>
                <div className='row'>
                    <div className='col-md-2' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>ID Payment</div>
                        {adminAllPayment.map((payment,i) =>
                            <div className='col-md-12' style={{marginTop:'15px'}}>
                                {payment.id}
                            </div>
                        )}
                    </div>
                    <div className='col-md-2' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Total Biaya</div>
                        {adminAllPayment.map((payment,i) =>
                            <div className='col-md-12' style={{marginTop:'15px', textAlign:'end'}}>
                                Rp. {payment.total_biaya}
                            </div>
                        )}
                    </div>
                    <div className='col-md-4' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Nomor Pemesanan</div>
                        {adminAllPayment.map((payment,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {payment.nomor_pemesanan}
                        </div>
                        )}
                    </div>
                    <div className='col-md-4' style={{border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Tanggal Pemesanan</div>
                        {adminAllPayment.map((payment,i) =>
                        <div className='col-md-12' style={{marginTop:'15px'}}>
                            {payment.tanggal_pemesanan}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("adminAllPayment, token, is_login",actions)(withRouter(AccessAllPayments));