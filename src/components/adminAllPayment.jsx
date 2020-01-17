import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllPayments extends React.Component {
    // Fungsi untuk mengambil semua list payment dari database
    getAllPayment = () => {
        const req = {
            method: "get",
            url: "http://0.0.0.0:1250/payment_confirm/all",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    store.setState({ adminAllPayment: response.data, isLoading:false})
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
                            self.props.history.push('/422')
                            break
                        case 500 :
                            self.props.history.push('/500')
                            break
                        default :
                            break
                    }
                })
    }

    // Untuk menjalankan Fungsi getListPayment
    componentDidMount = () => {
        this.getAllPayment()
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

export default connect("adminAllPayment, isLoading",actions)(withRouter(AccessAllPayments));