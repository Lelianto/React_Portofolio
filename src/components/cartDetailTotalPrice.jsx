import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { store, actions } from '../store';
import axios from 'axios';
class CartDetailTotalPrice extends React.Component {
  // Function to display total price inside the cart
  componentDidMount = () => {
      const req = {
          method: "get",
          url: "http://0.0.0.0:1250/cart/total",
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        };
        const self =this
        axios(req)
            .then(function(response) {
              store.setState({
                "total_price": response.data,
                'disable': true
              })
              return response
            })
            .catch(error => {
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
                    self.props.history.push('/login')
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
      if(store.getState().length_cart===0){
        return <Redirect to={{ pathname: "/cart" }} />;
      }
      if(this.props.isLoading){
          return (
          <div >
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
              <div className='container top-body-cart'>
                  <div className='col-md-12' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                      <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px'}} >
                          <div className='col-md-6'>Subtotal</div>
                          <div className='col-md-6'>Rp {this.props.total_price}</div>
                      </div>
                      <div className='row'>
                          <div className='col-md-12' style={{ paddingTop:'55px', marginBottom: '25px'}}>
                              <label><Link to='/expedition'>
                                  <button type="button" class="btn btn-success" disabled={this.props.disable}>Lanjutkan Pembelian</button></Link>
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}

export default connect("carts, total_price, token, is_login, isLoading, disable",actions)(withRouter(CartDetailTotalPrice));