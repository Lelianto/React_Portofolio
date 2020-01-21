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
            url: store.getState().baseUrl+"/payment_confirm/all",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    store.setState({ 
                        adminAllPayment: response.data, 
                        isLoading:false
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
    }

    doSearchPayment = async () => {
        await this.props.searchPayment()
        this.props.history.push("/payments/search");
    }

    render() {
        const { adminAllPayment } = this.props
        return (
            <div className='container' style={{paddingTop:'50px'}}>
                <div className='row'>
                    <div className="col-md-6 search">
                        <form onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-md-9'>
                                <div className="active-cyan-4 mb-4">
                                    <input class="form-control mr-sm-2" 
                                    style={{ width:"90%"}} 
                                    type="search" 
                                    placeholder="Cari Nomor Pemesanan" 
                                    aria-label="Search"
                                    id="keyword"
                                    name="keyword"
                                    onChange={(e) => this.props.changeInput(e)}/>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="active-cyan-4 mb-4" style={{marginLeft:'-135px'}}>
                                    <button class="btn btn-info my-sm-0" 
                                    type="submit"
                                    onClick={this.doSearchPayment}
                                    >Search</button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div className='row'>
                <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Pemesanan</th>
                                <th>Kode Pemesanan</th>
                                <th>Total Pembayaran</th>
                                <th>Tanggal Pemesanan</th>				
                            </tr>
                        </thead>
                        <tbody>
                            {adminAllPayment.map((payment,i) =>
                            <tr>
                                <td>{payment.id}</td>
                                <td>{payment.nomor_pemesanan}</td>
                                <td>{payment.total_biaya}</td>
                                <td>{payment.tanggal_pemesanan}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect("adminAllPayment, isLoading",actions)(withRouter(AccessAllPayments));