import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/profileUser.css';
import '../styles/loading.css';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { store, actions } from '../store';
import axios from 'axios';

class TransactionHistory extends React.Component {
    getAllCart = () => {
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/cart/allcart",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    store.setState({ 
                        userAllCart: response.data, 
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
                        case 500 :
                            self.props.history.push('/500')
                            break
                        default :
                            break
                    }
                })
    }
    // Function to get user data for profile
    componentDidMount = () => {
        this.getAllCart()
    };

    render() {
        const { userAllCart, isLoading } = this.props
        const displayUserAllCart = userAllCart.filter(item => {
            if (item.status_cart === true && item.email === localStorage.getItem('email')) {
                return item;
            }
            return false
        });
        if(isLoading){
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
        if (localStorage.getItem('token') == null){
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (

                <div className='container' style={{paddingTop:'110px', fontSize:'12px'}}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h3 style={{textAlign:'left',paddingTop:'20px', paddingBottom:'20px'}}>Riwayat Transaksi</h3>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Judul Buku</th>
                                <th>Harga Buku</th>
                                <th>Jumlah Pembelian</th>				
                            </tr>
                        </thead>
                        <tbody>
                            {displayUserAllCart.map((cart,i) =>
                            <tr>
                                <td>{cart.judul}</td>
                                <td>{cart.harga}</td>
                                <td>{cart.stok}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        
            )
        }
    }
}

export default connect("userAllCart, userData, userById, email, isLoading",actions)(withRouter(TransactionHistory));