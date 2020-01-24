import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class SearchAllPayments extends React.Component {
    // Function for searching payment based on payment code
    doSearchPayment = async () => {
        await this.props.searchPayment()
        this.props.history.push("/payments/search");
    }

    render() {
        const { listResults } = this.props
        const searchResult = listResults.filter(item => {
            if (item.nomor_pemesanan !== null) {
                return item;
            }
            return false
        });
        return (
            <div className='container' style={{paddingTop:'50px'}}>
                <div className='row'>
                    <div className="col-md-12 search">
                        <form onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-md-3'>
                            </div>
                            <div className='col-md-6'>
                                <div className="active-cyan-4 mb-4">
                                    <input class="form-control mr-sm-2" 
                                    style={{ width:"90%"}} 
                                    type="search" 
                                    placeholder="Cari Nomor atau Tanggal Pemesanan" 
                                    aria-label="Search"
                                    id="keyword"
                                    name="keyword"
                                    onChange={(e) => this.props.changeInput(e)}/>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="active-cyan-4 mb-4" style={{marginLeft:'-135px'}}>
                                    <button class="btn btn-info my-sm-0" 
                                    type="submit" style={{marginLeft:'-190px'}}
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
                            {searchResult.map((payment,i) =>
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

export default connect("listResults ,adminAllPayment, adminKeyword, isLoading",actions)(withRouter(SearchAllPayments));